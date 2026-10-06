import data from './campus-data.json';
export type Place = { id:string; name:string; category:string; map:[number,number]; world:[number,number]; entrance:[number,number] };
export const campus = data as {school:string; year:string; places:Place[]};
export const getCampusPlaces = () => campus.places;
export const findPlaceById = (id:string|null|undefined) => campus.places.find(p=>p.id===id);
export const searchPlaces = (query:string) => { const q=query.trim().toLowerCase(); return q ? campus.places.filter(p=>`${p.name} ${p.category}`.toLowerCase().includes(q)) : campus.places; };
export const getInitialPlaceFromUrl = (search=window.location.search) => findPlaceById(new URLSearchParams(search).get('to'));
