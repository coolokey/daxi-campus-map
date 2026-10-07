import {quickDestinations,resolveFloorState,type ViewerFloor} from '../data/viewer-destinations';
import {findPlaceById} from '../data/campus';

type Props={query:string;onQueryChange:(value:string)=>void;onDestination:(id:string)=>void;onMode:()=>void;onMap:()=>void};
export default function ViewerHud({query,onQueryChange,onDestination,onMode,onMap}:Props){const floors:ViewerFloor[]=['全','4F','3F','2F','1F'];return <>
 <header className="viewer-topbar"><button className="viewer-brand" aria-label="返回全校鳥瞰">溪 <span>桃園市立大溪國中<small>115 學年度 3D 智慧校園導覽</small></span></button><label className="viewer-search">⌕<input aria-label="搜尋地點" placeholder="搜尋建築、場地或入口" value={query} onChange={e=>onQueryChange(e.target.value)}/></label><button className="hud-action emphasis" onClick={()=>{window.dispatchEvent(new Event('campus-toggle-walk'));onMode()}}>人物漫遊</button><button className="hud-action" onClick={onMap}>總平面圖</button></header>
 <nav className="viewer-quickbar" aria-label="快速目的地">{quickDestinations.map(item=><button key={item.id} onClick={()=>{const place=findPlaceById(item.id);if(place)window.dispatchEvent(new CustomEvent('campus-focus',{detail:place}));onDestination(item.id)}}>{item.icon} {item.label}</button>)}</nav>
 <aside className="viewer-floors" aria-label="樓層選擇">{floors.map(floor=>{const state=resolveFloorState(floor);return <button key={floor} disabled={!state.available} title={state.label}>{floor}</button>})}</aside>
 <section className="viewer-minimap" aria-label="校園迷你地圖"><span>MINI MAP</span><i/><i/><i/></section>
 <section className="viewer-dpad" aria-label="行動控制"><button>▲</button><div><button>◀</button><span>MOVE</span><button>▶</button></div><button>▼</button></section>
 </>}
