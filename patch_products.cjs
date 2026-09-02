const fs = require('fs');
let file = fs.readFileSync('src/components/sections/Products.jsx', 'utf8');

// 1. Remove the useEffect block
file = file.replace(/\/\/ Hover animation on cards \(float up\)\n  useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);\n\n/, '');

// 2. Remove group-hover:scale-110
file = file.replace('mb-3 transition-transform duration-300 group-hover:scale-110 flex items-center', 'mb-3 flex items-center');

// 3. Change detail panel layout
file = file.replace('flex flex-col md:flex-row gap-8 items-center', 'flex flex-col-reverse md:flex-row gap-8 items-center');

// 4. Update the floating image div margins and image sizes
file = file.replace('mt-8 md:mt-0 animate-float', 'mb-8 md:mb-0 md:mt-0 animate-float');
file = file.replace('className="h-64 md:h-80 object-contain drop-shadow-2xl"', 'className="h-56 sm:h-64 md:h-80 object-contain drop-shadow-2xl"');

fs.writeFileSync('src/components/sections/Products.jsx', file);
