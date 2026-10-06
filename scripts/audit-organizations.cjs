const assert = require('node:assert/strict');
const { mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const baseUrl = process.env.ORGANIZATIONS_URL || 'http://localhost:3001';
const outputDir = resolve('artifacts/organizations');

(async () => {
  mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const errors = [], calculations = [], layout = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.setDefaultNavigationTimeout(120000);
    page.on('pageerror', (error) => errors.push({ url: page.url(), message: error.message }));
    for (const locale of ['en', 'fr']) {
      const fr = locale === 'fr';
      const response = await page.goto(`${baseUrl}/${locale}/organizations`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      const selector = page.getByRole('combobox', { name: fr ? 'Organisation' : 'Organization', exact: true });
      const ids = await selector.locator('option').evaluateAll((options) => options.map((option) => option.value));
      assert.equal(ids.length, 19);
      const lab = page.locator('section[aria-labelledby="organization-lab-heading"]');
      const sourceColor = await lab.locator('a').first().evaluate((link) => getComputedStyle(link).color);
      assert.equal(sourceColor, 'rgb(209, 196, 236)', `${locale}: source links remain readable on the dark laboratory`);
      const run = lab.getByRole('button', { name: fr ? /Exécuter un pas/ : /Run one step/ });
      const exact = fr ? 'Inspecter la sortie exacte' : 'Inspect exact output';
      for (const id of ids) {
        await selector.selectOption(id);
        for (const scenario of ['example', 'boundary', 'empty']) {
          await lab.getByRole('combobox').first().selectOption(scenario);
          await run.click();
          await lab.getByText(fr ? 'Pas 1' : 'Step 1', { exact: true }).waitFor();
          assert.equal(await lab.getByRole('alert').count(), 0, `${locale}/${id}/${scenario}`);
          await lab.getByText(exact, { exact: true }).click();
          const computed = JSON.parse(await lab.getByText(exact, { exact: true }).locator('..').locator('pre').innerText());
          assert.equal(computed.organization, id);
          calculations.push({ locale, id, scenario, output: computed });
        }
      }
      // Export is a concrete local calculation receipt, including the exact input.
      const downloadEvent = page.waitForEvent('download');
      await lab.getByRole('button', { name: fr ? 'Exporter le résultat' : 'Export result', exact: true }).click();
      const download = await downloadEvent;
      const receiptPath = resolve(outputDir, `${locale}-receipt.json`);
      await download.saveAs(receiptPath);
      const receipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
      assert.equal(receipt.mode, 'local-guidance');
      assert.equal(receipt.output.organization, 'memory_compilation');
      assert.match(receipt.sourceRevision, /^[0-9a-f]{40}$/);

      // Search, family filters and catalogue selection all address the same registry.
      const cards = page.locator('article[data-selected]');
      assert.equal(await cards.count(), 19);
      await page.getByRole('button', { name: fr ? 'Recherche en essaim' : 'Swarm search', exact: true }).click();
      assert.equal(await cards.count(), 4);
      await page.getByRole('button', { name: fr ? 'Toutes · 19' : 'All · 19', exact: true }).click();
      const search = page.locator('#organization-lab').getByRole('searchbox');
      await search.fill('brier');
      assert.equal(await cards.count(), 1);
      await cards.getByRole('button').click();
      assert.equal(await selector.inputValue(), 'brier_weighted_consensus');
      await search.fill('no-organization-matches-this');
      assert.equal(await cards.count(), 0);
      await search.fill('');

      // Invalid JSON reports an error, and a subsequent valid edit can execute.
      await selector.selectOption('quorum_with_abstention');
      const editor = lab.getByText(fr ? 'Modifier toutes les données d’entrée (JSON)' : 'Edit all input data (JSON)', { exact: true });
      await editor.click();
      const textarea = lab.getByRole('textbox');
      await textarea.fill('{');
      await lab.getByRole('button', { name: fr ? 'Appliquer et exécuter' : 'Apply and run', exact: true }).click();
      await lab.getByRole('alert').waitFor();
      await textarea.fill(JSON.stringify({ state: { votes: [{ support: true }, { abstain: true, weight: 100 }] }, options: { quorumRatio: 0.7 } }));
      await lab.getByRole('button', { name: fr ? 'Appliquer et exécuter' : 'Apply and run', exact: true }).click();
      assert.equal(await lab.getByRole('alert').count(), 0);
      await lab.getByText(exact, { exact: true }).click();
      const edited = JSON.parse(await lab.getByText(exact, { exact: true }).locator('..').locator('pre').innerText());
      assert.equal(edited.reached, true);
      assert.equal(edited.abstentions, 1);
      await lab.getByRole('button', { name: fr ? 'Réinitialiser' : 'Reset', exact: true }).click();
      assert.equal(await lab.getByRole('button', { name: fr ? 'Exporter le résultat' : 'Export result', exact: true }).isDisabled(), true);

      await selector.selectOption('flocking_boids');
      await run.click();
      for (const width of [1440, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        const geometry = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
        assert.ok(geometry.scrollWidth <= geometry.width + 1, `${locale}: horizontal overflow at ${width}`);
        layout.push({ locale, ...geometry });
        if ([1440, 390].includes(width)) await lab.screenshot({ path: resolve(outputDir, `${locale}-boids-${width}.png`) });
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}/${locale}/organizations#mycelial_routing`, { waitUntil: 'networkidle' });
      assert.equal(await selector.inputValue(), 'mycelial_routing');
      await page.screenshot({ path: resolve(outputDir, `${locale}-page.png`), fullPage: true });
    }
    assert.deepEqual(errors, []);
    writeFileSync(resolve(outputDir, 'audit.json'), JSON.stringify({ success: true, calculations: calculations.length, results: calculations, layout, errors }, null, 2));
    console.log(`PASS: ${calculations.length} browser calculations, EN/FR, filters, editor, reset, export, deep links, four viewport widths.`);
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
