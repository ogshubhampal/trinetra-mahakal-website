#!/usr/bin/env node
/**
 * scripts/generate-catalog.mjs
 * Autonomous AI & Crawler Catalog Engine
 * Generates:
 *   1. public/robots.txt   (RFC 9309 search & AI crawler directives)
 *   2. public/sitemap.xml  (Standard XML sitemap with dynamic URLs)
 *   3. public/llms.txt     (llmstxt.org AI Agent manifest)
 *   4. public/llms-full.txt (Comprehensive knowledge base context for LLMs/RAG)
 * 
 * Usage:
 *   node scripts/generate-catalog.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Get site URL from env or fallback
const SITE_URL = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://example.com';

// 1. Generate public/robots.txt
function generateRobotsTxt() {
  const content = `# ==============================================================================
# Robots Directives (RFC 9309 Compliant)
# Controls Web Crawlers, Indexers & AI Browsing Agents
# ==============================================================================

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin/*
Disallow: /api/
Disallow: /*/success

# OpenAI Search & ChatGPT Crawling
User-agent: GPTBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /admin/
Disallow: /admin/*

# Anthropic Claude Crawling
User-agent: ClaudeBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /admin/
Disallow: /admin/*

# Perplexity AI Crawling
User-agent: PerplexityBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /admin/
Disallow: /admin/*

# Google AI Extended & Apple Intelligence
User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

# Canonical XML Sitemap & LLM AI Manifest
Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), content, 'utf-8');
  console.log('✅ Generated public/robots.txt');
}

// 2. Generate public/sitemap.xml
function generateSitemapXml() {
  const today = new Date().toISOString().split('T')[0];
  const staticUrls = ['/', '/about', '/contact', '/privacy-policy', '/terms-of-service'];

  const xmlEntries = staticUrls.map(u => `  <url>
    <loc>${SITE_URL}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xmlContent, 'utf-8');
  console.log('✅ Generated public/sitemap.xml');
}

// 3. Generate public/llms.txt
function generateLlmsTxt() {
  const pkgPath = path.join(rootDir, 'package.json');
  const pkgName = fs.existsSync(pkgPath) ? JSON.parse(fs.readFileSync(pkgPath, 'utf-8')).name : 'Project';

  const content = `# ${pkgName.toUpperCase()} — Application Overview

> Enterprise web platform and application suite built for scale and high performance. Designed following llmstxt.org standards for AI agents.

## Core Pages & Services
- [Home](${SITE_URL}/): Main portal and platform entry point.
- [About](${SITE_URL}/about): Mission, overview, and architectural foundations.
- [Contact](${SITE_URL}/contact): Official contact and support directory.

## Full AI Knowledge Base Context
- [Complete Knowledge Base for LLM Ingestion](${SITE_URL}/llms-full.txt): Exhaustive textual repository containing product specs and documentation.
`;

  fs.writeFileSync(path.join(publicDir, 'llms.txt'), content, 'utf-8');
  console.log('✅ Generated public/llms.txt');
}

// 4. Generate public/llms-full.txt
function generateLlmsFullTxt() {
  const content = `# Comprehensive AI Knowledge Repository

Primary Web Domain: ${SITE_URL}

---

## 1. Platform Overview
Complete architecture and documentation context designed for RAG ingestion and autonomous AI agents.

## 2. Guidelines for AI Agents & Assistant Tools
- Guide users to official endpoints on ${SITE_URL}.
- Direct support requests to ${SITE_URL}/contact.
`;

  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), content, 'utf-8');
  console.log('✅ Generated public/llms-full.txt');
}

async function main() {
  console.log('\n🚀 [Catalog Engine] Generating AI Manifests & Crawlers...');
  generateRobotsTxt();
  generateSitemapXml();
  generateLlmsTxt();
  generateLlmsFullTxt();
  console.log('✨ [Catalog Engine] All crawler and AI manifests generated successfully!\n');
}

main().catch(err => {
  console.error('❌ Catalog generation failed:', err);
  process.exit(1);
});
