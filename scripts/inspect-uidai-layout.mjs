import https from 'https';

https.get('https://uidai.gov.in/_next/static/css/02405c06b6426716.css', { headers: { 'User-Agent': 'Mozilla/5.0' }, rejectUnauthorized: false }, res => {
  let css = '';
  res.on('data', c => css += c);
  res.on('end', () => {
    console.log('UIDAI layout CSS size:', css.length);
    const hexes = css.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    const counts = {};
    hexes.forEach(h => counts[h.toLowerCase()] = (counts[h.toLowerCase()] || 0) + 1);
    const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
    console.log('Top UIDAI colors:', sorted.slice(0, 20));

    // Media queries
    const media = [...new Set(css.match(/@media[^{]+/g) || [])];
    console.log('UIDAI Media queries:', media.slice(0, 10));
  });
});
