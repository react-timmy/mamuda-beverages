const fs = require('fs');
let file = fs.readFileSync('src/components/sections/Products.jsx', 'utf8');

// 1. Add fixed height to the pill cards
file = file.replace('className={`reveal relative group rounded-2xl p-5 border text-left transition-all duration-300 cursor-pointer ${', 'className={`reveal relative flex flex-col justify-between h-44 lg:h-48 group rounded-2xl p-5 border text-left transition-all duration-300 cursor-pointer ${');

// 2. Add fixed minimum height to the detail panel
file = file.replace('className="reveal lg:sticky lg:top-28 rounded-3xl border border-white/10 overflow-hidden"', 'className="reveal lg:sticky lg:top-28 rounded-3xl border border-white/10 overflow-hidden min-h-[600px] flex items-center"');

fs.writeFileSync('src/components/sections/Products.jsx', file);
