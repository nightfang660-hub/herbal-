const fs = require('fs');
const path = require('path');

const mappings = [
  { dir: 'src/app', name: 'HomeView' },
  { dir: 'src/app/blog', name: 'BlogView' },
  { dir: 'src/app/blog/[id]', name: 'BlogPostView' },
  { dir: 'src/app/shop', name: 'ShopView' },
  { dir: 'src/app/shop/[id]', name: 'ProductDetailsView' },
];

for (const map of mappings) {
  const pageFile = path.join(map.dir, 'page.tsx');
  const viewFile = path.join(map.dir, map.name + '.tsx');
  
  if (fs.existsSync(pageFile)) {
    // Rename the current page.tsx to the View file
    fs.renameSync(pageFile, viewFile);
    
    // Create a new simple wrapper page.tsx
    const newPageContent = `'use client';\nimport ${map.name} from './${map.name}';\n\nexport default function Page() {\n  return <${map.name} />;\n}\n`;
    fs.writeFileSync(pageFile, newPageContent);
    
    console.log(`Refactored ${pageFile} into ${map.name}.tsx`);
  }
}
