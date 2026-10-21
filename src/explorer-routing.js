const aliases={
 'main-gate':'gate','student-center':'gym',admin:'academic',multifunction:'library',
 technology:'tech-building',art:'art-building',special:'new-grade7',basketball:'court-bb',
 parking:'bike-shed',breezeway:'breezeway',track:'track',
};
export function explorerUrl(base,search){
 const input=new URLSearchParams(search),output=new URLSearchParams();
 const destination=input.get('to');
 if(destination)output.set('to',Object.hasOwn(aliases,destination)?aliases[destination]:destination);
 if(['bird','plan'].includes(input.get('view')))output.set('view',input.get('view'));
 if(input.get('profile')==='1')output.set('profile','1');
 const query=output.toString();
 return `${base}campus-explorer/index.html${query?'?'+query:''}`;
}
