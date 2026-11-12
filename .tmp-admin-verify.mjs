// Verify admin renders with the session cookie (server-rendered HTML, no browser needed).
const { execSync } = require("child_process");

const out = execSync(
  'node "C:\\Users\\musarrat.sil\\AppData\\Local\\Temp\\opencode\\fb-mint-cookie.js"',
  { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
);
const cookieLine = out.trim().match(/COOKIE=(.+)$/);
if (!cookieLine) {
  console.error("could not get cookie");
  process.exit(1);
}
const cookie = cookieLine[1];

async function fetchAdmin(path) {
  const res = await fetch(`http://localhost:3000${path}`, {
    headers: { Cookie: cookie },
    redirect: "manual",
  });
  const html = await res.text();
  return { status: res.status, html, headers: Object.fromEntries(res.headers.entries()) };
}

(async () => {
  console.log("=== /admin ===");
  const r1 = await fetchAdmin("/admin");
  console.log("status:", r1.status);
  console.log("has admin-shell:", r1.html.includes("admin-shell"));
  console.log("has sidebar:", r1.html.includes("Content admin"));
  console.log("has overview:", r1.html.includes("What do you want to change?"));
  console.log("has login form:", r1.html.includes("admin-email"));

  console.log("\n=== /admin/site ===");
  const r2 = await fetchAdmin("/admin/site");
  console.log("status:", r2.status);
  console.log("has theme tab:", r2.html.includes("Site & theme") || r2.html.includes("Site & theme"));
  console.log("has colour field:", r2.html.includes("Accent"));
  console.log("has profile tab:", r2.html.includes("Profile"));
  console.log("has contact tab:", r2.html.includes("Contact"));

  console.log("\n=== /admin/experience ===");
  const r3 = await fetchAdmin("/admin/experience");
  console.log("status:", r3.status);
  console.log("has experience:", r3.html.includes("Experience"));
  console.log("has add role:", r3.html.includes("Add role"));

  console.log("\n=== /admin/projects ===");
  const r4 = await fetchAdmin("/admin/projects");
  console.log("status:", r4.status);
  console.log("has projects:", r4.html.includes("Projects"));
  console.log("has add project:", r4.html.includes("Add project"));

  console.log("\n=== /admin/reviews ===");
  const r5 = await fetchAdmin("/admin/reviews");
  console.log("status:", r5.status);
  console.log("has reviews:", r5.html.includes("Reviews"));
  console.log("has add review:", r5.html.includes("Add review"));

  console.log("\n=== /admin/education ===");
  const r6 = await fetchAdmin("/admin/education");
  console.log("status:", r6.status);
  console.log("has education:", r6.html.includes("Education"));
  console.log("has add degree:", r6.html.includes("Add degree"));

  console.log("\n=== /admin/skills ===");
  const r7 = await fetchAdmin("/admin/skills");
  console.log("status:", r7.status);
  console.log("has skills:", r7.html.includes("Skills"));
  console.log("has add group:", r7.html.includes("Add group"));

  console.log("\n=== / (home) with cookie ===");
  const r8 = await fetchAdmin("/");
  console.log("status:", r8.status);
  console.log("has home:", r8.html.includes("Musarrat"));
})().catch((e) => console.error(e));