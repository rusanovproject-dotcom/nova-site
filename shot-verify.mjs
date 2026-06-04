import { chromium } from "playwright";
import { mkdirSync } from "fs";
const URL = "http://localhost:3210";
const OUT = "/tmp/nova-verify";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push("CONSOLE: " + m.text()); });

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/00-top.png` });

// real wheel scrolling (Lenis intercepts wheel, not scrollTo)
for (let i = 1; i <= 16; i++) {
  await page.mouse.wheel(0, 950);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${String(i).padStart(2, "0")}.png` });
}

console.log("ERRORS:", errors.length ? errors.slice(0, 20).join("\n") : "none");
await browser.close();
console.log("done -> " + OUT);
