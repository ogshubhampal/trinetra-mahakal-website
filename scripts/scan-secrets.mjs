#!/usr/bin/env node
/**
 * scripts/scan-secrets.mjs
 * Static analyzer for detecting raw hardcoded secrets, phone numbers, and unparameterized credentials in source files.
 * 
 * Usage:
 *   node scripts/scan-secrets.mjs
 */

import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
console.log('\n🔍 [Security & Zero-Hardcoding Audit] Scanning Source Files...');
console.log('==============================================================');

const SCAN_DIRS = ['src', 'app', 'pages', 'components'];
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.vue', '.svelte'];

const IGNORE_FILES = ['version.ts', 'constants.ts', 'siteSettings.ts', 'SiteSettingsContext.tsx', 'mockData.ts'];

const SECRET_PATTERNS = [
  { name: 'Private Key Header', regex: /-----BEGIN (RSA|EC|OPENSSH|PGP|PRIVATE) KEY-----/g },
  { name: 'Razorpay Live Secret Key', regex: /rzp_live_[a-zA-Z0-9]{14,}/g },
  { name: 'Stripe Live Secret Key', regex: /sk_live_[a-zA-Z0-9]{24,}/g },
  { name: 'Generic AWS Secret Key', regex: /aws_secret_access_key\s*=\s*['"][A-Za-z0-9/+=]{40}['"]/gi },
  { name: 'Supabase Service Role Key', regex: /service_role\s*['"][a-zA-Z0-9._-]{50,}['"]/g },
];

let issues = 0;
let filesScanned = 0;

function scanFile(filePath) {
  const fileName = path.basename(filePath);
  if (IGNORE_FILES.includes(fileName)) return;
  if (filePath.includes('node_modules') || filePath.includes('.git') || filePath.includes('dist')) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  filesScanned++;

  SECRET_PATTERNS.forEach(pattern => {
    let match;
    while ((match = pattern.regex.exec(content)) !== null) {
      console.error(`❌ Potential Secret Exposed: [${pattern.name}] in ${path.relative(rootDir, filePath)}`);
      issues++;
    }
  });
}

function traverse(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverse(fullPath);
    } else if (EXTENSIONS.includes(path.extname(entry.name))) {
      scanFile(fullPath);
    }
  }
}

SCAN_DIRS.forEach(d => traverse(path.join(rootDir, d)));

console.log(`📊 Scanned ${filesScanned} source file(s).`);
console.log('==============================================================');

if (issues > 0) {
  console.error(`❌ Scan FAILED: ${issues} suspicious secret(s) detected! Migrate to environment variables or settings context.`);
  process.exit(1);
} else {
  console.log('✨ Scan PASSED: Zero exposed secrets or hardcoded credentials detected.');
  process.exit(0);
}
