import https from 'https';

https.get('https://pmkisan.gov.in/new_css/style.css', { headers: { 'User-Agent': 'Mozilla/5.0' }, rejectUnauthorized: false }, res => {
  let css = '';
  res.on('data', c => css += c);
  res.on('end', () => {
    console.log('PM-Kisan style.css size:', css.length);
    const hexes = css.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    const counts = {};
    hexes.forEach(h => counts[h.toLowerCase()] = (counts[h.toLowerCase()] || 0) + 1);
    const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
    console.log('Top PM-Kisan colors:', sorted.slice(0, 20));

    const fonts = css.match(/font-family:[^;]+/gi) || [];
    console.log('PM-Kisan fonts:', [...new Set(fonts)].slice(0, 5));
  });
});
