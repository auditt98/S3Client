const AdmZip = require('adm-zip');
const fs = require('fs');
const dir = './test-deploy';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

let zip = new AdmZip();
zip.addLocalFolder('src');
zip.addLocalFile('package.json');
zip.addLocalFile('index.html');
zip.addLocalFile('postcss.config.js');
zip.addLocalFile('tailwind.config.js');
zip.addLocalFile('vite.config.js');
zip.writeZip(`${dir}/deploy.zip`);
