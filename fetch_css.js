const https = require('https');

https.get('https://identifyyou.in/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Extract font families and colors from inline styles or link tags
    const links = data.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/gi);
    console.log('CSS Links found:', links ? links.length : 0);
    
    // Look for elementor styles which contain exact variables
    const inlineStyles = data.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    if(inlineStyles) {
      inlineStyles.forEach(s => {
        if(s.includes('--e-global-color')) {
          console.log('\n--- Elementor global colors ---');
          const vars = s.match(/--e-global-[^:]+:\s*[^;]+;/g);
          if(vars) console.log(vars.join('\n'));
        }
        if(s.includes('font-family')) {
          console.log('\n--- Font Families ---');
          const fonts = s.match(/font-family:\s*[^;\}]+/g);
          if(fonts) console.log(Array.from(new Set(fonts)).join('\n'));
        }
      });
    }
  });
}).on('error', (e) => {
  console.error(e);
});
