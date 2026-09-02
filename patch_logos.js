const fs = require('fs');

// Navigation.jsx
let nav = fs.readFileSync('src/components/layout/Navigation.jsx', 'utf8');
nav = nav.replace(
  /<span className="text-pop-red font-black text-2xl uppercase leading-none">M<\/span>\n            <div className="flex flex-col leading-none gap-\[2px\]">\n              <span className="text-white font-black text-sm uppercase tracking-widest">Mamuda<\/span>\n              <span className="text-pop-red font-bold text-\[11px\] uppercase tracking-\[0\.18em\]">Beverages<\/span>\n            <\/div>/,
  '<img src="/assets/mamuda-logo.png" alt="Mamuda Beverages" className="h-8 md:h-10 object-contain" />'
);
fs.writeFileSync('src/components/layout/Navigation.jsx', nav);

// App.jsx Footer
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(
  /<span className="text-pop-red font-black text-4xl uppercase leading-none">M<\/span>\n              <div>\n                <div className="text-white font-black text-lg uppercase tracking-widest leading-none">Mamuda<\/div>\n                <div className="text-pop-red font-bold text-sm uppercase tracking-\[0\.2em\]">Beverages<\/div>\n              <\/div>/,
  '<img src="/assets/mamuda-logo.png" alt="Mamuda Beverages" className="h-12 md:h-16 object-contain" />'
);
fs.writeFileSync('src/App.jsx', app);

