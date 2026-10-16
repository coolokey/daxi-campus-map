import {it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {JSDOM} from 'jsdom';
it('provides readable sharing information in initial HTML without executing the 3D viewer',()=>{
 const dom=new JSDOM(readFileSync('index.html','utf8')),d=dom.window.document;
 const value=(selector:string)=>d.querySelector(selector)?.getAttribute('content');
 expect(d.title).toContain('大溪國中');expect(d.title).toContain('3D');
 const description=value('meta[name="description"]');expect(description).toContain('教室');expect(description).toContain('處室');
 expect(value('meta[property="og:title"]')).toBe(d.title);expect(value('meta[property="og:description"]')).toBe(description);
 expect(value('meta[name="twitter:card"]')).toBe('summary_large_image');
 const image=value('meta[property="og:image"]')!;expect(image).toMatch(/^https:\/\/coolokey\.github\.io\/daxi-campus-map\//);
 expect(value('meta[name="twitter:image"]')).toBe(image);
 expect(existsSync('public/'+new URL(image).pathname.replace('/daxi-campus-map/',''))).toBe(true);
 expect(value('meta[property="og:image:alt"]')).toContain('校園');
 // Query-based classroom links must keep their own URL when shared.
 expect(d.querySelector('meta[http-equiv="refresh"]')).toBeNull();
 dom.window.close();
});
