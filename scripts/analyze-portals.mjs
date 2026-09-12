import https from 'https';
import fs from 'fs';

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8'
      },
      rejectUnauthorized: false,
      timeout: 10000
    }, (res) => {
      // Follow redirect if 301/302
      if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
        const nextUrl = res.headers.location.startsWith('http') 
          ? res.headers.location 
          : new URL(res.headers.location, url).toString();
        return fetchUrl(nextUrl).then(resolve);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, html: data, headers: res.headers }));
    }).on('error', (e) => resolve({ statusCode: 0, html: '', error: e.message }));
  });
}

async function run() {
  const targets = {
    nha: 'https://beneficiary.nha.gov.in/',
    pmkisan: 'https://pmkisan.gov.in/',
    epfo: 'https://www.epfo.gov.in/',
    digilocker: 'https://www.digilocker.gov.in/',
    uidai: 'https://uidai.gov.in/en',
    indiagov: 'https://www.india.gov.in/'
  };

  const results = {};

  for (const [key, url] of Object.entries(targets)) {
    console.log(`Analyzing: ${key} (${url})...`);
    const resp = await fetchUrl(url);
    const html = resp.html;

    const cssLinks = [];
    const linkRegex = /<link[^>]+rel=["']stylesheet["'][^>]*>/gi;
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      const hrefMatch = match[0].match(/href=["']([^"']+)["']/i);
      if (hrefMatch) cssLinks.push(hrefMatch[1]);
    }

    const hexMatches = html.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    const rgbMatches = html.match(/rgba?\([^)]+\)/g) || [];

    const metaTags = [];
    const metaRegex = /<meta[^>]+>/gi;
    while ((match = metaRegex.exec(html)) !== null) {
      metaTags.push(match[0]);
    }

    const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || '';

    // Check key GovTech signatures
    const signatures = {
      ashokaEmblem: /emblem|ashok|lion-capital|national-emblem/i.test(html),
      nicMention: /national informatics centre|nic\.in|designed by nic/i.test(html),
      gigwMention: /gigw|guidelines for indian government websites|stqc/i.test(html),
      ux4g: /ux4g/i.test(html),
      accessibilityToolbar: /font.*size|skip to main|screen reader|text-resize|a\+|a-|dark-mode|high-contrast/i.test(html),
      languageSelector: /hindi|regional language|dropdown-menu.*lang|select language/i.test(html),
      marqueeUsed: /<marquee/i.test(html),
      tableLayout: (html.match(/<table/gi) || []).length,
      directBenefitAuth: /aadhaar|otp|beneficiary|login|pmkisan|uan/i.test(html)
    };

    results[key] = {
      title,
      statusCode: resp.statusCode,
      htmlBytes: html.length,
      cssCount: cssLinks.length,
      sampleCssLinks: cssLinks.slice(0, 5),
      uniqueHexColors: [...new Set(hexMatches)].slice(0, 20),
      uniqueRgbColors: [...new Set(rgbMatches)].slice(0, 10),
      signatures
    };
  }

  fs.writeFileSync('scripts/forensic_results.json', JSON.stringify(results, null, 2));
  console.log('Done! Results saved to scripts/forensic_results.json');
}

run();
