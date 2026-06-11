fetch('https://identifyyou.in/')
  .then(r => r.text())
  .then(t => {
    const links = [...t.matchAll(/href=[\"'](https:\/\/identifyyou\.in\/[^\"]*)[\"']/g)].map(m => m[1]);
    const unique = [...new Set(links)];
    unique.forEach(l => console.log(l));
  });
