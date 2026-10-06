export type TourState='opening'|'explore';
export const getInitialTourState=(search:string):TourState=>new URLSearchParams(search).has('to')?'explore':'opening';
export const advanceTour=(state:TourState):TourState=>state==='opening'?'explore':state;
