import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
it('keeps all existing fireworks defaults, cues, audio and controls unchanged across LF and CRLF checkouts',()=>{
 const baseline=JSON.parse(readFileSync('tests/fixtures/firework-defaults-20261019.json','utf8').replace(/^\uFEFF/,''));
 for(const [file,hash] of Object.entries(baseline))expect(createHash('sha256').update(readFileSync('public/campus-explorer/'+file,'utf8').replace(/\r\n/g,'\n')).digest('hex').toUpperCase(),file).toBe(hash);
});
