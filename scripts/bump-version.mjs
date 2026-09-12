#!/usr/bin/env node
/**
 * scripts/bump-version.mjs
 * Atomic SemVer synchronizer for package.json, version.ts, AGENTS.md, and CHANGELOG.md.
 * 
 * Usage:
 *   node scripts/bump-version.mjs patch "Bug fixes and minor improvements"
 *   node scripts/bump-version.mjs minor "New Course Catalog & Auth Flow"
 *   node scripts/bump-version.mjs major "Next.js 15 & Supabase SSR Migration"
 *   node scripts/bump-version.mjs 2.1.0 "Explicit Version Bump"
 */

import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const typeOrVersion = process.argv[2] || 'patch';
const releaseTitle = process.argv[3] || 'General Updates & Enhancements';
const today = new Date().toISOString().split('T')[0];

console.log('\n⚡ [SemVer Bumper] Synchronizing Project Version Targets...');
console.log('===========================================================');

const pkgPath = path.join(rootDir, 'package.json');
if (!fs.existsSync(pkgPath)) {
  console.error('❌ package.json not found in current directory!');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const currentVersion = pkg.version || '1.0.0';
let newVersion = '';

if (typeOrVersion === 'patch' || typeOrVersion === 'minor' || typeOrVersion === 'major') {
  const parts = currentVersion.split('.').map(n => parseInt(n, 10) || 0);
  while (parts.length < 3) parts.push(0);

  if (typeOrVersion === 'patch') {
    parts[2] += 1;
  } else if (typeOrVersion === 'minor') {
    parts[1] += 1;
    parts[2] = 0;
  } else if (typeOrVersion === 'major') {
    parts[0] += 1;
    parts[1] = 0;
    parts[2] = 0;
  }
  newVersion = parts.join('.');
} else if (/^\d+\.\d+\.\d+/.test(typeOrVersion)) {
  newVersion = typeOrVersion;
} else {
  console.error(`❌ Invalid bump type '${typeOrVersion}'. Use 'patch', 'minor', 'major', or a semver string like '1.2.3'.`);
  process.exit(1);
}

console.log(`🚀 Bumping Version: v${currentVersion} ➔ v${newVersion}`);
console.log(`📝 Release Title   : ${releaseTitle}`);
console.log(`📅 Release Date    : ${today}\n`);

// 1. Update package.json
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
console.log('  ✅ Updated package.json');

// 2. Update src/config/version.ts (if exists)
const versionTsPath = path.join(rootDir, 'src', 'config', 'version.ts');
if (fs.existsSync(versionTsPath)) {
  let content = fs.readFileSync(versionTsPath, 'utf-8');
  content = content.replace(/export const APP_VERSION = ['"][^'"]+['"];/, `export const APP_VERSION = '${newVersion}';`);
  content = content.replace(/export const APP_RELEASE_NAME = ['"][^'"]+['"];/, `export const APP_RELEASE_NAME = '${releaseTitle.replace(/'/g, "\\\'")}';`);
  content = content.replace(/export const APP_LAST_UPDATED = ['"][^'"]+['"];/, `export const APP_LAST_UPDATED = '${today}';`);
  fs.writeFileSync(versionTsPath, content, 'utf-8');
  console.log('  ✅ Updated src/config/version.ts');
}

const agentsPath = path.join(rootDir, 'AGENTS.md');
if (fs.existsSync(agentsPath)) {
  let content = fs.readFileSync(agentsPath, 'utf-8');
  content = content.replace(/> \*\*Current Version:\*\*[^\n]+/, `> **Current Version:** \`v${newVersion}\` (${releaseTitle})  `);
  content = content.replace(/> \*\*Last Updated:\*\*[^\n]+/, `> **Last Updated:** \`${today}\``);
  fs.writeFileSync(agentsPath, content, 'utf-8');
  console.log('  ✅ Updated AGENTS.md header badge');
}

// 4. Prepend / Format CHANGELOG.md
const changelogPath = path.join(rootDir, 'CHANGELOG.md');
if (fs.existsSync(changelogPath)) {
  let changelog = fs.readFileSync(changelogPath, 'utf-8');
  if (!changelog.includes(`[${newVersion}]`)) {
    const newEntry = `## [${newVersion}] - ${today}\n### ${releaseTitle}\n- Feature updates, enhancements, and stability improvements.\n\n---\n\n`;
    
    // Find first ## [ header or append below title
    const firstHeaderIdx = changelog.indexOf('## [');
    if (firstHeaderIdx !== -1) {
      changelog = changelog.slice(0, firstHeaderIdx) + newEntry + changelog.slice(firstHeaderIdx);
    } else {
      changelog += '\n\n' + newEntry;
    }
    fs.writeFileSync(changelogPath, changelog, 'utf-8');
    console.log(`  ✅ Added v${newVersion} section to CHANGELOG.md`);
  }
}

console.log('===========================================================');
console.log(`✨ Successfully synchronized all 4 version targets to v${newVersion}!\n`);
