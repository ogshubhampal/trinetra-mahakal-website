import https from 'https';

https.get('https://beneficiary.nha.gov.in/main.6dadc2022c659f7625c4.js', { 
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, 
  rejectUnauthorized: false 
}, (res) => {
  let js = '';
  res.on('data', c => js += c);
  res.on('end', () => {
    console.log('NHA JS bundle size in bytes:', js.length);
    const hexes = js.match(/#[0-9a-fA-F]{6}\b/g) || [];
    const counts = {};
    hexes.forEach(h => {
      const lower = h.toLowerCase();
      counts[lower] = (counts[lower] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    console.log('Top 25 NHA Hex colors:', sorted.slice(0, 25));

    // Look for Material UI or AntD or custom CSS variables
    const mui = js.includes('@mui') || js.includes('MuiButton');
    const antd = js.includes('ant-btn') || js.includes('antd');
    const tailwind = js.includes('tailwind');
    console.log('Framework detections:', { mui, antd, tailwind });

    // Look for key UI strings
    const features = [
      'Beneficiary',
      'Operator',
      'Aadhaar OTP',
      'PMJAY ID',
      'Family ID',
      'State Scheme',
      'Download Ayushman Card'
    ];
    const presentFeatures = features.filter(f => js.includes(f));
    console.log('Present Key Features:', presentFeatures);
  });
});
