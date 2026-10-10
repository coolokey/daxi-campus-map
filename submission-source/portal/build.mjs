import { cpSync, mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.dirname(root);
const dist = path.join(root, 'dist');
if (path.dirname(path.resolve(dist)) !== path.resolve(root) || path.basename(dist) !== 'dist') throw new Error('Invalid output directory');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', '展示說明.md']) cpSync(path.join(root, file), path.join(dist, file));
mkdirSync(path.join(dist, 'assets'), { recursive: true });
cpSync(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });
for (const [project, target] of [['future-campus-rpg', 'rpg'], ['daxi-campus-map', 'campus']]) {
  const source = path.join(workspace, project, 'dist');
  if (!existsSync(path.join(source, 'index.html'))) throw new Error(`${project} 必須先完成建置`);
  const html = readFileSync(path.join(source, 'index.html'), 'utf8');
  if (/src="\/assets\//.test(html)) throw new Error(`${project} 必須使用 --base ./ 建置`);
  cpSync(source, path.join(dist, target), { recursive: true, filter: file => {
    const relative = path.relative(source, file).split(path.sep);
    return !relative.includes('proposal') && !file.includes(`${path.sep}rpg${path.sep}teachers`);
  } });
}
// This entry always uses fictional NPCs and does not need a query redirect.
const rpgIndex = path.join(dist, 'rpg/index.html');
cpSync(path.join(dist, 'rpg/presentation.html'), rpgIndex);
console.log(`報名展示已整合：${dist}`);
