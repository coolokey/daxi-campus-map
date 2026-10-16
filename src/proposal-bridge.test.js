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
it('forwards building destinations through the shared resolver without trusting foreign messages',()=>{
 let listener;const parent={},openDestination=vi.fn();
 const window={parent,location:{origin:'https://school.test'},campusExplorer:{rooms:{},buildings:[{id:'tech-building'}],openDestination},addEventListener:(_,fn)=>listener=fn};
 vm.runInNewContext(readFileSync(new URL('../public/campus-explorer/proposal-bridge.js',import.meta.url),'utf8'),{window,document:{getElementById:()=>null}});
 listener({source:parent,origin:'https://evil.test',data:{type:'proposal:destination',destination:'tech-building'}});expect(openDestination).not.toHaveBeenCalled();
 listener({source:parent,origin:'https://school.test',data:{type:'proposal:destination',destination:'tech-building'}});expect(openDestination).toHaveBeenCalledWith('tech-building');
});
