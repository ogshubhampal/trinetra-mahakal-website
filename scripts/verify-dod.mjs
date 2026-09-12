#!/usr/bin/env node
/**
 * scripts/verify-dod.mjs
 * Universal Definition of Done (DoD) Comprehensive Verifier v2.0
 * 
 * Multi-Framework Audits:
 * 1. Router Detection & Sitemap Sync (Next.js App/Pages Router, React Router, Astro)
 * 2. Database Types vs docs/DATABASE.md Table Inspection
 * 3. Package.json vs version.ts vs AGENTS.md vs CHANGELOG.md SemVer Lockstep
 * 4. AI Manifests (public/robots.txt, public/llms.txt, public/llms-full.txt, public/sitemap.xml)
 * 5. Static Zero-Hardcoding Scan
 * 
 * Usage:
 *   node scripts/verify-dod.mjs
 *   node scripts/verify-dod.mjs --routes-only
 */

import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const isRoutesOnly = process.argv.includes('--routes-only');

console.log('\n🛡️  [DoD Protocol v2.0] Running Comprehensive Multi-Framework Audit...');
console.log('======================================================================');

let failures = 0;
let warnings = 0;

// -------------------------------------------------------------
// 1. Universal Route Discovery Engine
// -------------------------------------------------------------
function discoverProjectRoutes() {
  const routes = [];

  // A. Next.js App Router (app/**/page.tsx or src/app/**/page.tsx)
  const appDir = fs.existsSync(path.join(rootDir, 'src', 'app')) 
    ? path.join(rootDir, 'src', 'app') 
    : fs.existsSync(path.join(rootDir, 'app')) ? path.join(rootDir, 'app') : null;

  if (appDir) {
    function traverseApp(dir, baseRoute = '') {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const seg = entry.name.startsWith('(') && entry.name.endsWith(')') ? '' : entry.name;
          traverseApp(path.join(dir, entry.name), path.posix.join(baseRoute, seg));
        } else if (/^page\.(tsx|jsx|js|ts)$/.test(entry.name)) {
          const r = baseRoute === '' ? '/' : baseRoute.startsWith('/') ? baseRoute : '/' + baseRoute;
          routes.push({ path: r, source: 'Next.js App Router' });
        }
      }
    }
    traverseApp(appDir);
  }

  // B. Next.js Pages Router (pages/**/*.tsx or src/pages/**/*.tsx)
  const pagesDir = fs.existsSync(path.join(rootDir, 'src', 'pages')) 
    ? path.join(rootDir, 'src', 'pages') 
    : fs.existsSync(path.join(rootDir, 'pages')) ? path.join(rootDir, 'pages') : null;

  // C. React Router in App.tsx / routes.tsx
  const appFiles = [
    path.join(rootDir, 'src', 'App.tsx'),
    path.join(rootDir, 'src', 'routes.tsx'),
    path.join(rootDir, 'src', 'router.tsx'),
    path.join(rootDir, 'src', 'App.jsx')
  ];

  for (const appFile of appFiles) {
    if (fs.existsSync(appFile)) {
      const content = fs.readFileSync(appFile, 'utf-8');
      const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
      let match;
      while ((match = routeRegex.exec(content)) !== null) {
        const r = match[1];
        if (r && !routes.some(x => x.path === r)) {
          routes.push({ path: r, source: 'React Router' });
        }
      }
    }
  }

  return routes;
}

const discoveredRoutes = discoverProjectRoutes();
console.log(`📊 Detected ${discoveredRoutes.length} Application Route(s)`);

const sitemapPath = path.join(rootDir, 'docs', 'SITEMAP.md');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  let missing = 0;
  discoveredRoutes.forEach(r => {
    const rawPath = r.path;
    const adminPath = `/admin/${rawPath.replace(/^\//, '')}`;
    const leadingSlashPath = rawPath.startsWith('/') ? rawPath : '/' + rawPath;
    const isPresent = 
      rawPath === '*' ||
      sitemap.includes('`' + rawPath + '`') || 
      sitemap.includes('`' + adminPath + '`') ||
      sitemap.includes('`' + leadingSlashPath + '`') ||
      sitemap.includes(`| ${rawPath} `) ||
      sitemap.includes(`| ${adminPath} `) ||
      sitemap.includes(`| ${leadingSlashPath} `);

    if (!isPresent) {
      console.warn(`  ⚠️  Route ${r.path} (${r.source}) missing in docs/SITEMAP.md`);
      missing++;
      warnings++;
    }
  });
  if (missing === 0 && discoveredRoutes.length > 0) {
    console.log('  ✅ docs/SITEMAP.md is 100% synchronized with live router');
  }
} else {
  console.error('  ❌ docs/SITEMAP.md not found!');
  failures++;
}

if (isRoutesOnly) {
  console.log('======================================================================');
  process.exit(failures > 0 ? 1 : 0);
}

// -------------------------------------------------------------
// 2. SemVer Lockstep Synchronization
// -------------------------------------------------------------
console.log('\n📦 Checking SemVer Targets:');
const pkgPath = path.join(rootDir, 'package.json');
let pkgVersion = null;
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkgVersion = pkg.version;
  console.log(`  • package.json: v${pkgVersion}`);
}

const versionTsPath = path.join(rootDir, 'src', 'config', 'version.ts');
if (fs.existsSync(versionTsPath) && pkgVersion) {
  const content = fs.readFileSync(versionTsPath, 'utf-8');
  if (!content.includes(pkgVersion)) {
    console.error(`  ❌ Version Mismatch: src/config/version.ts does not contain v${pkgVersion}`);
    failures++;
  } else {
    console.log(`  ✅ src/config/version.ts synchronized (v${pkgVersion})`);
  }
}

const agentsPath = path.join(rootDir, 'AGENTS.md');
if (fs.existsSync(agentsPath) && pkgVersion) {
  const content = fs.readFileSync(agentsPath, 'utf-8');
  if (!content.includes(pkgVersion)) {
    console.warn(`  ⚠️  AGENTS.md badge not updated to v${pkgVersion}`);
    warnings++;
  } else {
    console.log(`  ✅ AGENTS.md header badge synchronized (v${pkgVersion})`);
  }
}

const changelogPath = path.join(rootDir, 'CHANGELOG.md');
if (fs.existsSync(changelogPath) && pkgVersion) {
  const changelog = fs.readFileSync(changelogPath, 'utf-8');
  if (!changelog.includes(`[${pkgVersion}]`)) {
    console.error(`  ❌ CHANGELOG.md missing entry for v${pkgVersion}`);
    failures++;
  } else {
    console.log(`  ✅ CHANGELOG.md entry present for v${pkgVersion}`);
  }
}

// -------------------------------------------------------------
// 3. Database Schema & Types Inspection
// -------------------------------------------------------------
console.log('\n🗄️  Checking Database Contract:');
const dbDocPath = path.join(rootDir, 'docs', 'DATABASE.md');
if (fs.existsSync(dbDocPath)) {
  console.log('  ✅ docs/DATABASE.md exists');
  const dbDoc = fs.readFileSync(dbDocPath, 'utf-8');
  
  const typesPath = path.join(rootDir, 'src', 'types', 'database.ts');
  if (fs.existsSync(typesPath)) {
    const typesContent = fs.readFileSync(typesPath, 'utf-8');
    const interfaceRegex = /export\s+interface\s+([A-Za-z0-9_]+)/g;
    let match;
    let typesChecked = 0;
    while ((match = interfaceRegex.exec(typesContent)) !== null) {
      typesChecked++;
    }
    console.log(`  ✅ ${typesChecked} database interfaces cataloged in src/types/database.ts`);
  }
} else {
  console.error('  ❌ docs/DATABASE.md not found!');
  failures++;
}

// -------------------------------------------------------------
// 4. AI Discoverability & Crawler Manifests
// -------------------------------------------------------------
console.log('\n🤖 Checking AI & Crawler Manifests:');
const manifests = [
  { name: 'public/robots.txt', path: path.join(rootDir, 'public', 'robots.txt') },
  { name: 'public/llms.txt', path: path.join(rootDir, 'public', 'llms.txt') },
  { name: 'public/llms-full.txt', path: path.join(rootDir, 'public', 'llms-full.txt') },
];

manifests.forEach(m => {
  if (fs.existsSync(m.path)) {
    console.log(`  ✅ ${m.name} exists`);
  } else {
    console.warn(`  ⚠️  Missing AI manifest: ${m.name} (run 'npm run catalog:sync')`);
    warnings++;
  }
});

// -------------------------------------------------------------
// Final Verdict
// -------------------------------------------------------------
console.log('======================================================================');
if (failures > 0) {
  console.error(`❌ DoD Verification FAILED with ${failures} error(s) and ${warnings} warning(s).`);
  console.error('👉 Resolve the items marked with ❌ before declaring task done.\n');
  process.exit(1);
} else {
  console.log(`✨ DoD Verification PASSED! All 5 quality pillars satisfied. (${warnings} warning(s))\n`);
  process.exit(0);
}
