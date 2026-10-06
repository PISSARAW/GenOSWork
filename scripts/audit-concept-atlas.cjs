const { mkdirSync, writeFileSync } = require("node:fs");
const { resolve } = require("node:path");

const playwrightPath = process.env.PLAYWRIGHT_MODULE || "playwright";
const { chromium } = require(playwrightPath);
const baseUrl = process.env.ATLAS_URL || "http://localhost:3000";
const output = resolve("artifacts/concept-atlas");

async function inspect(page) {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const outside = [...document.querySelectorAll("main *")].filter((element) => {
      if (element.closest("svg, .concept-diagram")) return false;
      for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
        if (["auto", "scroll"].includes(getComputedStyle(parent).overflowX) && parent.scrollWidth > parent.clientWidth) return false;
      }
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && style.visibility !== "hidden" && (rect.right > width + 1 || rect.left < -1);
    }).map((element) => ({ tag: element.tagName, class: element.className, text: element.textContent.trim().slice(0, 90) }));
    const anchors = [...document.querySelectorAll('main a[href^="#"]')].map((a) => a.getAttribute("href")).filter((href) => href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1))));
    const nodes = [...document.querySelectorAll(".concept-mechanism-node")].map((element) => {
      const r = element.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });
    const overlappingNodes = nodes.some((a, i) => nodes.slice(i + 1).some((b) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y));
    const diagram = document.querySelector(".concept-mechanism-diagram")?.getBoundingClientRect();
    const model = document.querySelector(".concept-mechanism")?.getBoundingClientRect();
    const misplacedDiagram = Boolean(diagram && model && (diagram.top < model.top || diagram.bottom > model.bottom));
    const darkLinks = [...document.querySelectorAll(".concept-scope a")].filter((element) => getComputedStyle(element).color === "rgb(37, 74, 59)").map((element) => element.textContent.trim().slice(0, 100));
    return { title: document.querySelector("h1")?.textContent, overflow: document.documentElement.scrollWidth > width + 1, outside, anchors, overlappingNodes, misplacedDiagram, darkLinks, modelNodes: nodes.length };
  });
}

(async () => {
  mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  const results = [];
  try {
    const page = await browser.newPage();
    page.on("pageerror", (error) => errors.push({ url: page.url(), message: error.message }));
    page.on("console", (message) => { if (message.type() === "error") errors.push({ url: page.url(), message: message.text() }); });
    await page.goto(`${baseUrl}/en/concepts`, { waitUntil: "networkidle" });
    const slugs = await page.locator(".atlas-concept-card").evaluateAll((cards) => cards.map((card) => card.getAttribute("href").split("/").pop()));
    if (slugs.length < 115) throw new Error(`Only ${slugs.length} concepts found`);
    for (const locale of ["en", "fr"]) {
        for (const slug of ["", ...slugs]) {
          const path = `/${locale}/concepts${slug ? `/${slug}` : ""}`;
          const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded", timeout: 120000 });
          if (slug) await page.locator(".concept-mechanism-controls input").waitFor();
          for (const viewport of [{ width: 1440, height: 1000 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
          await page.setViewportSize(viewport);
          const record = { path, width: viewport.width, status: response.status(), ...await inspect(page) };
          results.push(record);
          if (slug && viewport.width === 1440) {
            const controls = page.locator(".concept-mechanism-controls");
            await controls.getByRole("button", { name: locale === "fr" ? "Suivant" : "Next", exact: true }).click();
            await page.waitForFunction(() => document.querySelector(".concept-mechanism-index").textContent.includes("02"));
            await controls.getByRole("checkbox").uncheck();
            await page.locator(".concept-mechanism-node.is-blocked").waitFor();
            await controls.getByRole("button", { name: locale === "fr" ? "Précédent" : "Previous", exact: true }).click();
            await page.waitForFunction(() => document.querySelector(".concept-mechanism-index").textContent.includes("01"));
            await controls.getByRole("button", { name: locale === "fr" ? "Précédent" : "Previous", exact: true }).click();
            await page.waitForTimeout(100);
            if (!(await page.locator(".concept-mechanism-index").textContent()).trim().startsWith("01 /")) errors.push({ path, message: "Previous bypassed blocked outcome" });
          }
          if (["", "g-cir", "natural-search-control-plane", "agent-relationships", "maladies"].includes(slug) && viewport.width !== 320) {
            await page.screenshot({ path: resolve(output, `${locale}-${slug || "index"}-${viewport.width}.png`), fullPage: true });
          }
          }
          if (results.length % 30 === 0) {
            writeFileSync(resolve(output, "browser-audit-progress.json"), JSON.stringify({ errors, results }, null, 2));
            console.log(`Inspected ${results.length} layouts; latest ${path}`);
          }
        }
        console.log(`Inspected ${slugs.length + 1} ${locale} pages at four widths`);
    }
    const issues = results.filter((r) => r.status !== 200 || r.overflow || r.outside.length || r.anchors.length || r.overlappingNodes || r.misplacedDiagram || r.darkLinks.length || (!r.path.endsWith("concepts") && r.modelNodes !== 3));
    writeFileSync(resolve(output, "browser-audit.json"), JSON.stringify({ baseUrl, concepts: slugs.length, checks: results.length, errors, issues, results }, null, 2));
    console.log(JSON.stringify({ concepts: slugs.length, checks: results.length, errors, issueCount: issues.length, issues: issues.slice(0, 10).map(({ path, width, overflow, outside, anchors, darkLinks }) => ({ path, width, overflow, outside: outside.slice(0, 6), anchors, darkLinks })) }, null, 2));
    if (errors.length || issues.length) process.exitCode = 1;
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
