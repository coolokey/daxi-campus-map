import { cpSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.dirname(root);
const dist = path.join(root, 'dist');
mkdirSync(dist, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', '展示說明.md']) cpSync(path.join(root, file), path.join(dist, file));
mkdirSync(path.join(dist, 'assets'), { recursive: true });
cpSync(path.join(workspace, 'future-campus-rpg/public/assets/maps/daxi-future-campus-rpg-v1.png'), path.join(dist, 'assets/campus-map.png'));
for (const [project, target] of [['future-campus-rpg', 'rpg'], ['daxi-campus-map', 'campus']]) {
  const source = path.join(workspace, project, 'dist');
  if (!existsSync(path.join(source, 'index.html'))) throw new Error(`${project} 必須先完成建置`);
  const html = readFileSync(path.join(source, 'index.html'), 'utf8');
  if (/src="\/assets\//.test(html)) throw new Error(`${project} 必須使用 --base ./ 建置`);
  cpSync(source, path.join(dist, target), { recursive: true, filter: file => !file.includes(`${path.sep}rpg${path.sep}teachers`) });
}
// The registration build always uses fictional NPCs, even if opened directly.
const rpgIndex = path.join(dist, 'rpg/index.html');
const guard = '<script>if(new URLSearchParams(location.search).get("presentation")!=="1"){const u=new URL(location.href);u.searchParams.set("presentation","1");location.replace(u.href);}</script>';
writeFileSync(rpgIndex, readFileSync(rpgIndex, 'utf8').replace('<head>', `<head>${guard}`));
console.log(`報名展示已整合：${dist}`);
