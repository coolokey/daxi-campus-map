export type BuildingStyle='white-gray-red-roof'|'white-gray-dark-roof'|'concrete-special';
export const buildingStyleFor=(id:string):BuildingStyle=>id==='admin'||id==='student-center'?'white-gray-red-roof':id==='art'?'concrete-special':'white-gray-dark-roof';
