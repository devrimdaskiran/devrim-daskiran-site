// CV sayfasından (dist/cv/index.html) A4 PDF üretir → dist/cv/devrim-daskiran-cv.pdf
// Çalıştırma: npm run pdf   (önce npm run build gerekir; npm run build:all ikisini birden yapar)
// Playwright + Chromium kullanır. İlk kurulumda: npx playwright install chromium

import path from "node:path";
import { promises as fs } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { profile } = await import(pathToFileURL(path.join(ROOT, "src/data/profile.js")).href);
const htmlFile = path.join(ROOT, "dist/cv/index.html");
const out = path.join(ROOT, "dist", profile.cvPdf);

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("✖ Playwright bulunamadı. Önce: npm install && npx playwright install chromium");
  process.exit(1);
}

await fs.access(htmlFile).catch(() => {
  console.error("✖ dist/cv/index.html yok. Önce: npm run build");
  process.exit(1);
});

const launchOpts = process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {};
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage();
await page.goto(pathToFileURL(htmlFile).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: "print" });
await fs.mkdir(path.dirname(out), { recursive: true });
await page.pdf({
  path: out,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  tagged: true,
  outline: true,
});
await browser.close();

// PDF meta verileri (başlık, yazar) — Playwright bunları <title>'dan alır
const size = (await fs.stat(out)).size;
console.log(`✔ CV PDF oluşturuldu → dist/${profile.cvPdf} (${Math.round(size / 1024)} KB)`);
