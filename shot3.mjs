import { chromium } from "playwright";
import { mkdirSync } from "fs";

const URL = process.env.NOVA_URL || "http://localhost:3000";
const OUT = process.env.NOVA_OUT || "/tmp/nova-shots3";
const TAG = process.env.NOVA_TAG || "v";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// ---- Desktop ----
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2800);
await page.screenshot({ path: `${OUT}/${TAG}-01-hero.png` });

const h = await page.evaluate(() => document.body.scrollHeight);
const stops = [0.07, 0.135, 0.20, 0.28, 0.37, 0.46, 0.55, 0.63, 0.71, 0.79, 0.87, 0.94, 0.99];
let i = 2;
for (const s of stops) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), Math.floor(h * s));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${TAG}-${String(i).padStart(2, "0")}-d-${Math.round(s*100)}.png` });
  i++;
}
await ctx.close();

// ---- Mobile ----
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
const mpage = await mctx.newPage();
await mpage.goto(URL, { waitUntil: "networkidle" });
await mpage.waitForTimeout(2400);
await mpage.screenshot({ path: `${OUT}/${TAG}-50-m-hero.png` });
const mh = await mpage.evaluate(() => document.body.scrollHeight);
for (const [j, s] of [0.12, 0.28, 0.5, 0.66, 0.82, 0.97].entries()) {
  await mpage.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), Math.floor(mh * s));
  await mpage.waitForTimeout(1200);
  await mpage.screenshot({ path: `${OUT}/${TAG}-5${j+1}-m-${Math.round(s*100)}.png` });
}
await mctx.close();

await browser.close();
console.log("shots done ->", OUT);
