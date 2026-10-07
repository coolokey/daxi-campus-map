import type {Place} from '../data/campus';

export type BirdseyeFocus={position:[number,number,number];target:[number,number,number]};

export const birdseyeFocusFor=({world}:Pick<Place,'world'>):BirdseyeFocus=>({
 position:[world[0]+28,30,world[1]+34],
 target:[world[0],0,world[1]],
});
