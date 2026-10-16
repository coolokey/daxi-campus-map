import {it,expect,vi} from 'vitest';
import {JSDOM} from 'jsdom';
import React,{act} from 'react';
import {createRoot} from 'react-dom/client';
import ViewerHud from '../src/components/ViewerHud';
it('toggles the legacy movement mode once for one click',async()=>{
 const dom=new JSDOM('<div id="app"></div>');vi.stubGlobal('window',dom.window);vi.stubGlobal('document',dom.window.document);vi.stubGlobal('Event',dom.window.Event);vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT',true);
 const listener=vi.fn();dom.window.addEventListener('campus-toggle-walk',listener);const root=createRoot(dom.window.document.getElementById('app')!);
 try{await act(async()=>root.render(<ViewerHud query="" onQueryChange={()=>{}} onDestination={()=>{}} onMode={()=>dom.window.dispatchEvent(new dom.window.Event('campus-toggle-walk'))} onMap={()=>{}}/>));
  const button=[...dom.window.document.querySelectorAll('button')].find(b=>b.textContent==='人物漫遊')!;await act(async()=>button.click());expect(listener).toHaveBeenCalledTimes(1);
 }finally{await act(async()=>root.unmount());vi.unstubAllGlobals();dom.window.close();}
});
