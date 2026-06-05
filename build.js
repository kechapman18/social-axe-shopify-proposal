const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node build.js <password>');
  process.exit(1);
}

const root = __dirname;
const content = fs.readFileSync(path.join(root, 'src/content.html'), 'utf8');
const template = fs.readFileSync(path.join(root, 'src/template.html'), 'utf8');

const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const iterations = 250000;

const key = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const ciphertext = Buffer.concat([cipher.update(content, 'utf8'), cipher.final()]);
const tag = cipher.getAuthTag();

const packed = Buffer.concat([salt, iv, ciphertext, tag]).toString('base64');

const html = template
  .replace('{{CIPHERTEXT}}', packed)
  .replace('{{ITERATIONS}}', String(iterations));

fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/index.html'), html);
fs.copyFileSync(path.join(root, 'src/style.css'), path.join(root, 'docs/style.css'));

console.log('Built docs/index.html (' + html.length + ' bytes)');
