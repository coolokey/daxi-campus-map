import {useMemo,useState} from 'react';
import {campus,getInitialPlaceFromUrl,searchPlaces,type Place} from './data/campus';
import {advanceTour,getInitialTourState} from './tour-state';
import CampusMap2D from './components/CampusMap2D';
import CampusScene3D from './components/CampusScene3D';
import PlaceCard from './components/PlaceCard';
import ViewerHud from './components/ViewerHud';

const asset=(name:string)=>`${import.meta.env.BASE_URL}${name}`;

export default function App(){
 const [mapOpen,setMapOpen]=useState(false);
 const [tour,setTour]=useState(()=>getInitialTourState(window.location.search));
 const [query,setQuery]=useState('');
 const [selected,setSelected]=useState<Place|undefined>(()=>getInitialPlaceFromUrl());
 const results=useMemo(()=>searchPlaces(query),[query]);
 const select=(place:Place)=>{setSelected(place);setTour('explore');history.pushState({},'',`?to=${encodeURIComponent(place.id)}`)};
 return <main className="viewer">
  {tour==='opening'&&<section className="tour-opening">
   <img className="tour-backdrop" src={asset('generated/daxi-campus-birdseye-v2.png')} alt="大溪國中校園導覽開場景"/>
   <div className="tour-shade"/>
   <div className="tour-copy"><span className="eyebrow">DAXI CAMPUS · 115</span><h2>從山坡、操場到校舍，<em>一眼認識大溪國中。</em></h2><p>以實景照片、空拍構圖與校園平面圖重建的互動導覽。</p><div><button className="primary" onClick={()=>setTour(advanceTour('opening'))}>開始探索</button><button className="ghost" onClick={()=>setTour('explore')}>跳過開場</button></div></div>
  </section>}
  <CampusScene3D places={campus.places} onSelect={select}/>
  <ViewerHud query={query} onQueryChange={setQuery} onDestination={id=>{const place=campus.places.find(item=>item.id===id);if(place)select(place)}} onMode={()=>window.dispatchEvent(new Event('campus-toggle-walk'))} onMap={()=>setMapOpen(value=>!value)}/>
  {mapOpen&&<section className="map-overlay"><CampusMap2D places={campus.places} selected={selected} onSelect={select}/></section>}
  {query&&<div className="search-results viewer-results">{results.map(place=><button key={place.id} onClick={()=>select(place)}>{place.name}<span>{place.category}</span></button>)}</div>}
  {selected&&<PlaceCard place={selected} onClose={()=>setSelected(undefined)}/>} 
 </main>;
}
