const fs = require('fs');
const path = require('path');

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, filesList);
    } else if (name.endsWith('.tsx')) {
      filesList.push(name);
    }
  }
  return filesList;
}

const files = [
  ...getFiles('src/app/blog'),
  ...getFiles('src/app/shop')
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/text-\[\#1c2e24\]/gi, 'text-[#0F3D2E]');
  content = content.replace(/text-\[\#111513\]/gi, 'text-[#0F3D2E]');
  content = content.replace(/<strong className="text-\[\#0F3D2E\]">/gi, '<strong className="text-[#dcae3d]">');
  content = content.replace(/<strong>/gi, '<strong className="text-[#dcae3d]">');
  fs.writeFileSync(file, content);
}
console.log('Fixed fonts and colors in ' + files.length + ' files');
