const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  const langs = [
    { id: 'language-pt', expected: 'Desenvolvido e administrado por xDouglas' },
    { id: 'language-en', expected: 'Desenvolvido e administrado por xDouglas' },
    { id: 'language-es', expected: 'Desenvolvido e administrado por xDouglas' }
  ];
  for (const l of langs) {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.click('[data-testid="' + l.id + '"]');
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    const text = await page.locator('[data-testid="footer-credit-link"]').innerText();
    console.log(l.id + ': ' + text + ' | Match: ' + (text.trim() === l.expected));
  }
  await browser.close();
})();