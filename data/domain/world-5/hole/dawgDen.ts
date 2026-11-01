import { AmplifierStoneBase, initAmplifierStoneRepo } from '../../data/AmplifierStoneRepo';
import type { AmplifierStoneModel } from '../../model/amplifierStoneModel';
import type { ImageData } from '../../imageData';
import type { Hole } from './hole';

export class DawgDenModifier {
 level: number = 0;

 constructor(public index: number, public data: AmplifierStoneModel) { }

 static fromBase(records: AmplifierStoneBase[]): DawgDenModifier[] {
  return records.map(record => new DawgDenModifier(record.index, record.data));
 }

 getImageData(): ImageData {
  return { location: `HoleFightAmp${this.index}`, width: 44, height: 52 };
 }

 getEffect(): number {
  switch (this.index) {
   case 0:
    return (5000 + 800 * this.level) * Math.pow(1.25, this.level);
   case 1:
    return (6000 + 4000 * this.level) * Math.pow(1.3, this.level);
   case 2:
    return 5 * this.level;
   case 3:
    return (1 + this.level) * Math.pow(1.05, this.level);
   case 4:
    return (1 + this.level) * Math.pow(1.07, this.level);
   case 5:
    return 1 + this.level;
   case 6:
    return 4 * this.level;
   default:
    return this.level / 10;
  }
 }
}

export class DawgDen {
 bestScore: number = 0;
 nextOpalScore: number = 1800;
 scoreMultiplier: number = 1;
 modifiers: DawgDenModifier[] = DawgDenModifier.fromBase(initAmplifierStoneRepo());
 private opalsFound: number = 0;

 parse(holeData: number[][]): void {
  this.bestScore = Number(holeData[11]?.[8] ?? 0);
  this.opalsFound = Number(holeData[7]?.[2] ?? 0);
  this.modifiers.forEach(modifier => {
   modifier.level = Number(holeData[12]?.[modifier.index] ?? 0);
  });
 }

 prepare(hole: Hole): void {
  this.nextOpalScore = 12 * (150 + (30 + this.opalsFound) * this.opalsFound) * Math.pow(1.5, this.opalsFound);

  let totalCharge = 0;
  for (const modifier of this.modifiers) {
   totalCharge += modifier.level;
  }

  // The native calculation adds integer-weighted charges from the last amplifier to the first.
  let weightedCharge = 0;
  for (let index = this.modifiers.length - 1; index >= 0; index--) {
   const modifier = this.modifiers[index];
   weightedCharge = Math.round(100 * modifier.data.perLvl) * modifier.level + weightedCharge;
  }

  const stackingBonus = hole.schematics[23].getBonus(1);
  this.scoreMultiplier = 0.5 * stackingBonus * Math.floor(totalCharge / 10) + weightedCharge / 100 + 1;
 }
}
