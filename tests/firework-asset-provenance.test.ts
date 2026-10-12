import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root='public/campus-explorer/assets/sounds/';
it('公開音檔符合來源雜湊，戶外群眾取自三份 CC0 錄音而非室內掌聲',()=>{
 const manifest=JSON.parse(readFileSync(root+'manifest.json','utf8'));
 expect(manifest.revision).toBe('cc0-outdoor-20261012');
 for(const entries of Object.values(manifest.layers) as any[][]){
  expect(entries).toHaveLength(3);
  for(const entry of entries){
   const file=readFileSync(root+entry.file);
   expect(file.length).toBeGreaterThan(1000);
   expect(createHash('sha256').update(file).digest('hex')).toBe(entry.sha256);
  }
 }
 expect(new Set(manifest.layers.crowd.map((e:any)=>e.source)).size).toBe(3);
 for(const e of [...manifest.layers.crowd,...manifest.layers.launch]){
  const source=manifest.sources[e.source];
  expect(source.license).toBe('CC0 1.0');
  expect(source.licenseURL).toBe('https://creativecommons.org/publicdomain/zero/1.0/');
  expect(source.quality).toContain('HQ MP3 preview');
  expect(createHash('sha256').update(readFileSync(root+'sources/'+source.original)).digest('hex')).toBe(source.sha256);
  expect(createHash('sha256').update(readFileSync(root+'sources/'+source.licenseRecord)).digest('hex')).toBe(source.licenseRecordSHA256);
 }
 expect(manifest.layers.crowd.every((e:any)=>e.note.includes('Outdoor')&&!e.note.includes('Indoor'))).toBe(true);
});
