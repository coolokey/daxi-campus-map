const aliases:Record<string,string>={
 'main-gate':'gate','student-center':'gym',admin:'academic',multifunction:'library',
 technology:'tech-building',art:'art-building',special:'new-grade7',basketball:'court-bb',
 parking:'bike-shed',breezeway:'breezeway',track:'track',
};
export function explorerUrl(base:string,search:string){
 const input=new URLSearchParams(search),output=new URLSearchParams();
 const destination=input.get('to');
 if(destination)output.set('to',aliases[destination]??destination);
 if(input.get('view')==='plan')output.set('view','plan');
 const query=output.toString();
 return `${base}campus-explorer/index.html${query?'?'+query:''}`;
}
