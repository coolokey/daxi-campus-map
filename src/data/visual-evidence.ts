import manifest from '../../assets/photo-manifest.json';
export type VisualEvidence={id:string;path:string;source:'generated'|'campus-photo';buildingIds?:string[];uses:string[];notes:string};
export const visualEvidence=manifest.assets as VisualEvidence[];
export const getEvidenceForBuilding=(buildingId:string)=>visualEvidence.filter(item=>item.buildingIds?.includes(buildingId)??false);
