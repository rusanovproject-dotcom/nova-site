import { chromium } from "playwright";

const URL = "http://localhost:3210";
const OUT = "/tmp/nova-shots";
import { mkdirSync } from "fs";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// Desktop
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// hero
await page.screenshot({ path: `${OUT}/01-hero.png` });

// scroll through and capture key scenes by measured positions
const h = await page.evaluate(() => document.body.scrollHeight);
const stops = [0.06, 0.14, 0.30, 0.44, 0.56, 0.66, 0.78, 0.90, 0.97];
let i = 2;
for (const s of stops) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), Math.floor(h * s));
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/${String(i).padStart(2, "0")}-d-${Math.round(s*100)}.png` });
  i++;
}
await ctx.close();

// Mobile
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
const mpage = await mctx.newPage();
await mpage.goto(URL, { waitUntil: "networkidle" });
await mpage.waitForTimeout(2200);
await mpage.screenshot({ path: `${OUT}/50-m-hero.png` });
const mh = await mpage.evaluate(() => document.body.scrollHeight);
for (const [j, s] of [0.16, 0.5, 0.72, 0.97].entries()) {
  await mpage.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), Math.floor(mh * s));
  await mpage.waitForTimeout(1200);
  await mpage.screenshot({ path: `${OUT}/5${j+1}-m-${Math.round(s*100)}.png` });
}
await mctx.close();

await browser.close();
console.log("shots done");
