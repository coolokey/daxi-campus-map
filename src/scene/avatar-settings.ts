export const movementSpeed=(percent:number)=>Math.max(.07,Math.min(.28,percent*.0014));
export const turnSensitivity=(percent:number)=>Math.max(.0004,Math.min(.006,percent*.00002));
