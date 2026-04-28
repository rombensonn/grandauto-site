import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(".");
const outDir = join(root, "out");
const generatedRootEntries = [
  "_next",
  "404.html",
  "404.txt",
  "index.html",
  "index.txt",
  "personal-data-consent",
  "personal-data-consent.html",
  "personal-data-consent.txt",
  "privacy",
  "privacy.html",
  "privacy.txt",
  "requisites",
  "requisites.html",
  "requisites.txt",
  "sitemap",
  "sitemap.html",
  "sitemap.txt",
  "terms",
  "terms.html",
  "terms.txt"
];

const nextBin = join(root, "node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: root,
  env: {
    ...process.env,
    NEXT_PUBLIC_GITHUB_PAGES_BASE_PATH: process.env.NEXT_PUBLIC_GITHUB_PAGES_BASE_PATH ?? "/grandauto-site",
    NEXT_PUBLIC_STATIC_FORM_FALLBACK: "true"
  },
  stdio: "inherit"
});

if (result.status !== 0) {
  if (result.error) {
    console.error(result.error);
  }
  process.exit(result.status ?? 1);
}

if (!existsSync(join(outDir, "index.html"))) {
  throw new Error("Static export did not create out/index.html");
}

for (const entry of generatedRootEntries) {
  rmSync(join(root, entry), { recursive: true, force: true });
}

for (const entry of readdirSync(outDir, { withFileTypes: true })) {
  const from = join(outDir, entry.name);
  const to = join(root, entry.name);

  if (entry.isDirectory()) {
    rmSync(to, { recursive: true, force: true });
    cpSync(from, to, { recursive: true });
  } else {
    copyFileSync(from, to);
  }
}

mkdirSync(root, { recursive: true });
writeFileSync(join(root, ".nojekyll"), "");

console.log("GitHub Pages static files copied to project root.");
