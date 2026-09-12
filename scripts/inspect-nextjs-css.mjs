import https from 'https';

function fetchCss(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, rejectUnauthorized: false }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function inspect() {
  console.log('Fetching UIDAI CSS...');
  const uidaiCss = await fetchCss('https://uidai.gov.in/_next/static/css/6354b6e612f4068d.css');
  const uidaiVars = uidaiCss.match(/--[a-zA-Z0-9_-]+:[^;]+/g) || [];
  console.log('UIDAI CSS Vars:', uidaiVars.slice(0, 20));

  console.log('Fetching India.gov.in CSS...');
  const indiaCss = await fetchCss('https://www.india.gov.in/_next/static/css/773d3d9c137ae05a.css');
  const indiaVars = indiaCss.match(/--[a-zA-Z0-9_-]+:[^;]+/g) || [];
  console.log('India.gov.in CSS Vars:', indiaVars.slice(0, 20));

  // Extract breakpoints from media queries
  const uidaiMedia = [...new Set(uidaiCss.match(/@media[^{]+/g) || [])];
  console.log('UIDAI Media queries count:', uidaiMedia.length);
  console.log('Sample UIDAI Media queries:', uidaiMedia.slice(0, 10));

  const indiaMedia = [...new Set(indiaCss.match(/@media[^{]+/g) || [])];
  console.log('India.gov.in Media queries count:', indiaMedia.length);
  console.log('Sample India.gov.in Media queries:', indiaMedia.slice(0, 10));
}

inspect();
