import {lazy,Suspense} from 'react';
import {explorerUrl} from './explorer-url';
const LegacyCampusApp=lazy(()=>import('./LegacyCampusApp'));

export default function App(){
 if(new URLSearchParams(window.location.search).get('viewer')==='legacy')return <Suspense fallback={<p>載入先前版本…</p>}><LegacyCampusApp/></Suspense>;
 return <main className="campus-explorer-shell"><iframe className="campus-explorer-frame" title="大溪國中立體校園探索" src={explorerUrl(import.meta.env.BASE_URL,window.location.search)} allow="fullscreen"/></main>;
}

