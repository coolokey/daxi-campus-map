import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {it,expect,vi} from 'vitest';
it('accepts visibility and destinations only from the same-origin parent',()=>{
 let listener;const parent={};const navigateToRoom=vi.fn();const resetManualInput=vi.fn();
 const window={parent,location:{origin:'https://school.test'},campusExplorer:{rooms:{academic:{}},navigateToRoom,resetManualInput,manualTakeover:vi.fn()},addEventListener:(_,fn)=>{listener=fn;}};
 const document={getElementById:()=>({open:true,close:vi.fn()})};
 vm.runInNewContext(readFileSync(new URL('../public/campus-explorer/proposal-bridge.js',import.meta.url),'utf8'),{window,document});
 const send=(data,origin='https://school.test',source=parent)=>listener({data,origin,source});
 send({type:'proposal:visibility',visible:false},'https://evil.test');expect(window.proposalHidden).not.toBe(true);
 send({type:'proposal:visibility',visible:false});expect(window.proposalHidden).toBe(true);expect(resetManualInput).toHaveBeenCalled();
 send({type:'proposal:visibility',visible:true});expect(window.proposalHidden).toBe(false);
 send({type:'proposal:destination',destination:'academic'});expect(navigateToRoom).toHaveBeenCalledWith('academic');
 send({type:'proposal:destination',destination:'missing'});expect(navigateToRoom).toHaveBeenCalledTimes(1);
});
