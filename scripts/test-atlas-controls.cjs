const assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseUrl = process.env.ATLAS_URL || "http://localhost:3000";

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    for (const locale of ["en", "fr"]) {
      await page.goto(`${baseUrl}/${locale}/concepts`);
      const cards = page.locator(".atlas-concept-card");
      const total = await cards.count();
      assert.equal(total, 116);
      const search = page.locator(".atlas-search input");
      await search.fill("mémoire");
      await page.waitForFunction(() => document.querySelectorAll(".atlas-concept-card").length < 116);
      const accented = await cards.count();
      await search.fill("memoire");
      assert.equal(await cards.count(), accented);
      assert.ok(accented > 0);
      await search.fill("");
      const selects = page.locator(".atlas-filters select");
      await selects.nth(0).selectOption("orchestration");
      assert.equal(await cards.count(), 8);
      await selects.nth(0).selectOption("all");
      await selects.nth(2).selectOption("hasSimulation");
      assert.equal(await cards.count(), 10);
      await search.fill("does-not-exist-xyz");
      assert.equal(await cards.count(), 0);
      await page.locator(".atlas-empty button").click();
      assert.equal(await cards.count(), total);
      await search.fill("does-not-exist-xyz");
      await page.locator('.atlas-system-rail a[href="#orchestration"]').click();
      assert.equal(await cards.count(), total);
      await page.waitForFunction(() => Math.abs(document.querySelector("#orchestration").getBoundingClientRect().top) < 100, null, { timeout: 8000 });
      await page.goto(`${baseUrl}/${locale}/concepts/agow`);
      const model = page.locator(".concept-mechanism");
      const play = model.getByRole("button", { name: locale === "fr" ? /Lancer/ : /Play/ });
      const playWidth = (await play.boundingBox()).width;
      await play.click();
      await page.waitForFunction(() => document.querySelector(".concept-mechanism-index").textContent.includes("02"));
      const pause = model.getByRole("button", { name: /Pause/ });
      assert.equal((await pause.boundingBox()).width, playWidth);
      await pause.click();
      await model.getByRole("checkbox").uncheck();
      await model.locator(".concept-mechanism-node.is-blocked").waitFor();
      const previous = model.getByRole("button", { name: locale === "fr" ? "Précédent" : "Previous", exact: true });
      await previous.click();
      await page.waitForFunction(() => document.querySelector(".concept-mechanism-index").textContent.includes("01"));
      await previous.click();
      assert.match(await model.locator(".concept-mechanism-index").textContent(), /01/);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(() => document.querySelector(".concept-mechanism-controls button").disabled);
      await page.emulateMedia({ reducedMotion: "no-preference" });
      console.log(`${locale}: search, accents, filters, reset, navigation, playback, blocked transitions and reduced motion passed`);
    }
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
