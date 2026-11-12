import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // We need a session cookie. The mint script prints COOKIE=... — grab it.
  const { execSync } = require("child_process");
  const out = execSync(
    'node "C:\\Users\\musarrat.sil\\AppData\\Local\\Temp\\opencode\\fb-mint-cookie.js"',
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
  const cookieLine = out.trim().match(/COOKIE=(.+)$/);
  if (!cookieLine) {
    console.error("could not get cookie", out);
    await browser.close();
    process.exit(1);
  }
  const cookieValue = cookieLine[1];

  const context2 = await browser.newContext({ baseURL: "http://localhost:3000" });
  await context2.addCookies([
    {
      name: "session",
      value: cookieValue,
      url: "http://localhost:3000",
    },
  ]);
  const page = await context2.newPage();

  const response = await page.goto("http://localhost:3000/admin", { waitUntil: "domcontentloaded" });
  console.log("GET /admin ->", response.status());
  await page.waitForTimeout(6000);

  const html = await page.content();
  console.log("contains admin shell:", html.includes("admin-shell"));
  console.log("contains sidebar:", html.includes("Content admin"));
  console.log("contains overview heading:", html.includes("What do you want to change?"));
  console.log("contains sign-in form (should be false):", html.includes("admin-email"));

  const response2 = await page.goto("http://localhost:3000/admin/site", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(6000);
  const html2 = await page.content();
  console.log("GET /admin/site ->", response2.status());
  console.log("contains theme editor (should be true):", html2.includes("Site &amp; theme") || html2.includes("Site & theme"));
  console.log("contains colour field (should be true):", html2.includes("Accent"));

  await browser.close();
})().catch((e) => {
  console.error("TEST ERROR:", e.message);
  process.exit(1);
});
