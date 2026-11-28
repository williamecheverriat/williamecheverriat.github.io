// Full-page screenshots of the rendered site at desktop (1280px) and phone (390px) widths.
// No dependencies: drives an installed Edge/Chrome/Chromium in headless mode through the
// Chrome DevTools Protocol, using Node's built-in WebSocket (Node 22+).
//
// Usage (from the repo root, after `quarto render`):
//   node .claude/skills/design-tweak/screenshot.mjs --out <dir> [--site _site] [--pages index,research,...]
//
// Writes <out>/<page>-<width>.png and prints the page height for each shot. It also warns when a page
// is wider than the screen (horizontal scrolling, a sign of a broken mobile layout).
// Keep screenshots outside the repo (scratchpad or temp folder); they are never committed.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_PAGES = ["index", "research", "talks", "teaching", "cv", "blog"];
const WIDTHS = [
  { width: 1280, height: 800, mobile: false },
  { width: 390, height: 844, mobile: true },
];
const SETTLE_MS = 700;

function parseArgs(argv) {
  const args = { site: "_site", pages: DEFAULT_PAGES, out: null };
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    const val = argv[i + 1];
    if (key === "--out") { args.out = val; i++; }
    else if (key === "--site") { args.site = val; i++; }
    else if (key === "--pages") { args.pages = val.split(",").map((p) => p.trim()).filter(Boolean); i++; }
    else if (key === "--help" || key === "-h") { args.help = true; }
    else { throw new Error(`Unknown argument: ${key}`); }
  }
  return args;
}

function findBrowser() {
  const candidates = [
    process.env.BROWSER,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google\\Chrome\\Application\\chrome.exe"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/microsoft-edge",
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p)) ?? null;
}

function launchBrowser(exe, profileDir) {
  const proc = spawn(exe, [
    "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"] });

  const wsUrl = new Promise((res, rej) => {
    let buf = "";
    const timer = setTimeout(() => rej(new Error("Browser did not start within 20 s")), 20000);
    proc.stderr.on("data", (chunk) => {
      buf += chunk.toString();
      const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
      if (m) { clearTimeout(timer); res(m[1]); }
    });
    proc.on("exit", (code) => { clearTimeout(timer); rej(new Error(`Browser exited early (code ${code})`)); });
  });
  return { proc, wsUrl };
}

// Minimal CDP client over one browser-level WebSocket, with flattened page sessions.
function connect(url) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(url);
    let nextId = 1;
    const pending = new Map();
    const listeners = [];
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve: ok, reject: fail } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? fail(new Error(msg.error.message)) : ok(msg.result);
      } else if (msg.method) {
        listeners.forEach((fn) => fn(msg));
      }
    };
    ws.onerror = () => rej(new Error("Could not connect to the browser"));
    ws.onopen = () => res({
      send(method, params = {}, sessionId) {
        const id = nextId++;
        ws.send(JSON.stringify({ id, method, params, sessionId }));
        return new Promise((ok, fail) => pending.set(id, { resolve: ok, reject: fail }));
      },
      waitFor(method, sessionId, timeoutMs = 30000) {
        return new Promise((ok, fail) => {
          const timer = setTimeout(() => fail(new Error(`Timed out waiting for ${method}`)), timeoutMs);
          const fn = (msg) => {
            if (msg.method === method && msg.sessionId === sessionId) {
              clearTimeout(timer);
              listeners.splice(listeners.indexOf(fn), 1);
              ok(msg.params);
            }
          };
          listeners.push(fn);
        });
      },
      close() { ws.close(); },
    });
  });
}

async function shoot(cdp, sessionId, fileUrl, { width, height, mobile }, outFile) {
  await cdp.send("Emulation.setDeviceMetricsOverride",
    { width, height, deviceScaleFactor: 1, mobile }, sessionId);
  const loaded = cdp.waitFor("Page.loadEventFired", sessionId);
  await cdp.send("Page.navigate", { url: fileUrl }, sessionId);
  await loaded;
  await new Promise((r) => setTimeout(r, SETTLE_MS));

  const { result } = await cdp.send("Runtime.evaluate", {
    expression: "JSON.stringify({sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight})",
    returnByValue: true,
  }, sessionId);
  const { sw, sh } = JSON.parse(result.value);

  const shot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: Math.max(width, sw), height: Math.max(height, sh), scale: 1 },
  }, sessionId);
  writeFileSync(outFile, Buffer.from(shot.data, "base64"));
  return { scrollWidth: sw, scrollHeight: sh };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.out) {
    console.log("Usage: node .claude/skills/design-tweak/screenshot.mjs --out <dir> [--site _site] [--pages index,research,talks,teaching,cv,blog]");
    process.exit(args.help ? 0 : 1);
  }
  if (typeof WebSocket === "undefined") {
    console.error("This script needs Node 22 or newer (built-in WebSocket).");
    process.exit(1);
  }
  const site = resolve(args.site);
  if (!existsSync(join(site, "index.html"))) {
    console.error(`No rendered site at ${site}. Run \`quarto render\` first.`);
    process.exit(1);
  }
  const exe = findBrowser();
  if (!exe) {
    console.error("No Edge, Chrome or Chromium found. Set the BROWSER environment variable to its path.");
    process.exit(1);
  }
  const out = resolve(args.out);
  mkdirSync(out, { recursive: true });

  const profileDir = mkdtempSync(join(tmpdir(), "site-shots-profile-"));
  const { proc, wsUrl } = launchBrowser(exe, profileDir);
  let cdp;
  let failures = 0;
  try {
    cdp = await connect(await wsUrl);
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    await cdp.send("Page.enable", {}, sessionId);

    for (const page of args.pages) {
      const htmlPath = join(site, `${page}.html`);
      if (!existsSync(htmlPath)) {
        console.error(`MISSING  ${page}.html not found in ${site}`);
        failures++;
        continue;
      }
      const fileUrl = pathToFileURL(htmlPath).href;
      for (const vp of WIDTHS) {
        const outFile = join(out, `${page.replace(/[\\/]/g, "_")}-${vp.width}.png`);
        const { scrollWidth, scrollHeight } = await shoot(cdp, sessionId, fileUrl, vp, outFile);
        const overflow = scrollWidth > vp.width
          ? `  WARNING: horizontal overflow (page is ${scrollWidth}px wide)` : "";
        console.log(`${page.padEnd(10)} ${String(vp.width).padStart(4)}px  height ${scrollHeight}px  -> ${outFile}${overflow}`);
      }
    }
  } finally {
    if (cdp) {
      try { await cdp.send("Browser.close"); } catch { /* already closing */ }
      cdp.close();
    }
    await new Promise((r) => { if (proc.exitCode !== null) r(); else { proc.once("exit", r); setTimeout(() => { proc.kill(); r(); }, 3000); } });
    try { rmSync(profileDir, { recursive: true, force: true }); } catch { /* temp folder, safe to leave */ }
  }
  process.exit(failures ? 1 : 0);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
