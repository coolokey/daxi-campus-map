import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(path.join(dir, item.name)) : [path.join(dir, item.name)]); }
const files = walk(root);
const errors = [];
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:https?:|data:|#)/.test(value)) continue;
    const target = path.resolve(path.dirname(file), decodeURIComponent(value.split(/[?#]/)[0]));
    if (!existsSync(target)) errors.push(`Missing ${path.relative(root, target)} from ${path.relative(root, file)}`);
  }
}
if (files.some(file => file.includes(`${path.sep}teachers${path.sep}`))) errors.push('Teacher image assets must not be included.');
if (!readFileSync(path.join(root, 'rpg/index.html'), 'utf8').includes('presentation')) errors.push('RPG presentation guard is missing.');
for (const entry of ['index.html', 'rpg/index.html', 'campus/index.html', 'campus/campus-explorer/index.html', 'assets/campus-map.png', '展示說明.md']) {
  if (!existsSync(path.join(root, entry))) errors.push(`Missing entry ${entry}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(JSON.stringify({ files: files.length, sizeMB: Math.round(files.reduce((sum,file)=>sum+statSync(file).size,0)/1048576*100)/100, missingReferences:0, teacherImages:0, presentationGuard:true }));
