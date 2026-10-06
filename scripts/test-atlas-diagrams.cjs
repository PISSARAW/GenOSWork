const assert = require("node:assert/strict");
const { mkdirSync, writeFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseUrl = process.env.ATLAS_URL || "http://localhost:3000";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const output = resolve("artifacts/concept-atlas");
  mkdirSync(output, { recursive: true });
  try {
    const page = await browser.newPage();
    for (const slug of ["maladies", "memoire", "cortex", "ontogenese", "ontologie"]) {
      await page.goto(`${baseUrl}/en/concepts/${slug}`);
      const figure = page.locator(".concept-diagram");
      for (const width of [1440, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 844 });
        const metrics = await figure.evaluate((element) => {
          const labels = [...element.querySelectorAll("svg text")];
          const boxes = labels.map((label) => label.getBoundingClientRect());
          return {
            minTextSize: Math.min(...labels.map((label) => parseFloat(getComputedStyle(label).fontSize) * label.getScreenCTM().a)),
            overlap: boxes.some((a, i) => boxes.slice(i + 1).some((b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)),
            pageOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
            scrollable: element.scrollWidth > element.clientWidth,
          };
        });
        assert.ok(metrics.minTextSize >= 10, `${slug} at ${width}: unreadable labels`);
        assert.equal(metrics.overlap, false, `${slug} at ${width}: overlapping labels`);
        assert.equal(metrics.pageOverflow, false, `${slug} at ${width}: page overflow`);
        if (width <= 390) {
          assert.ok(metrics.scrollable);
          await figure.evaluate((element) => { element.scrollLeft = 0; });
          await figure.focus();
          await page.keyboard.press("ArrowRight");
          await page.waitForFunction(() => document.querySelector(".concept-diagram").scrollLeft > 0);
          await figure.screenshot({ path: resolve(output, `${slug}-diagram-${width}.png`) });
        }
        results.push({ slug, width, ...metrics });
      }
    }
    writeFileSync(resolve(output, "diagram-audit.json"), JSON.stringify({ checks: results.length, results }, null, 2));
    console.log(`${results.length} diagram layouts passed: readable text, no overlapping labels, confined keyboard scrolling`);
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
