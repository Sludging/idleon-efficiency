import { Item, type Food, type StoneProps, type Tool } from './items';
import { EquipmentBonus, getEquipmentEffect } from './equipment-effects';
import type { EquipmentProperty, ItemProperty, PrimaryAttribute, SkillPowerFamily } from './equipment-effects';
import { initEquipmentMetadataRepo } from './data/EquipmentMetadataRepo';
import type { Player } from './player';
import type { Gallery } from './world-7/gallery';
import type { HatRack } from './world-7/hatRack';
import type { ObolsData, ObolStats } from './world-2/obols';
import type { Gaming } from './world-5/gaming';
import type { Menagerie } from './menagerie';
import { getStampBonusForKey, type Stamp } from './world-1/stamps';

const powerSuffixes = initEquipmentMetadataRepo()[0].data.powerSuffixes;
const toolSlots: Record<SkillPowerFamily, number> = {
 Mining: powerSuffixes.indexOf('Mining'),
 Choppin: powerSuffixes.indexOf('Choppin'),
 Fishing: powerSuffixes.indexOf('Fishing'),
 Catching: powerSuffixes.indexOf('Catching'),
 Trapping: powerSuffixes.indexOf('Trapping'),
 Worship: powerSuffixes.indexOf('Worship'),
};
const properties: readonly EquipmentProperty[] = [
 'STR', 'AGI', 'WIS', 'LUK', 'Defence', 'Accuracy', 'Weapon_Power',
 'Mining_Power', 'Choppin_Power', 'Fishing_Power', 'Catching_Power', 'Trapping_Power', 'Worship_Power',
];
const bonuses = Object.values(EquipmentBonus)
 .filter((bonus): bonus is EquipmentBonus => typeof bonus === 'number')
 // Some effect IDs share a label. Add each prepared replacement and Obol effect only once.
 .filter((bonus, index, values) => values.findIndex(candidate => getEquipmentEffect(candidate) === getEquipmentEffect(bonus)) === index);

export interface AttributeEquipmentModifier {
 talentPercent: number;
 stampPercent: number;
}

export interface EquipmentUniqueEffectModifiers {
 pendantChip: number;
 upperKeychainChip: number;
 trophyChip: number;
 finalSlotResearchPercent: number;
}

export interface EquipmentSources {
 gallery: Gallery;
 hatRack: HatRack;
 obols: ObolStats;
}

/**
 * Owns saved gear and its prepared normal-character contributions, not final character stats.
 * Gallery, Hat Rack, and Obols own their replacement and secondary contributions.
 * Prepare unique effects after those owners; prepare properties after final talent contexts.
 * Dungeon equipment, temporary forms, and map overrides are excluded.
 */
export class PlayerEquipment {
 equipment: (Item | undefined)[] = [];
 tools: (Tool | undefined)[] = [];
 food: (Food | undefined)[] = [];
 private effects: Map<string, number> | undefined;
 private propertyResults: Record<EquipmentProperty, number> | undefined;

 static parse(
  equipment: Array<Record<number, string>>,
  equipCount: Array<Record<number, number>>,
  equipStones: Record<number, StoneProps>,
  toolStones: Record<number, StoneProps>,
  allItems: Item[],
 ): PlayerEquipment {
  const gear = new PlayerEquipment();
  equipment?.forEach((row, rowIndex) => {
   if (rowIndex > 2) return;
   for (const [location, name] of Object.entries(row)) {
    if (location === 'length') continue;
    const slot = Number(location);
    const item = allItems.find(item => item.internalName === name)?.duplicate();
    if (!item && name !== 'Blank') {
     console.log(rowIndex === 0 ? 'Armor not found' : rowIndex === 1 ? 'Tool not found' : 'Food not found', name, location);
    }
    // Keep saved slots aligned with their upgrade maps, including sparse rows.
    if (rowIndex === 0) {
     if (item) item.addStone(equipStones[slot]);
     gear.equipment[slot] = item;
    } else if (rowIndex === 1) {
     if (item) item.addStone(toolStones[slot]);
     gear.tools[slot] = item as Tool | undefined;
    } else {
     const food = item as Food | undefined;
     if (food) food.count = equipCount[rowIndex][slot];
     gear.food[slot] = food;
    }
   }
  });
  return gear;
 }

 updateUniqueEffects(player: Player, sources: EquipmentSources, modifiers: EquipmentUniqueEffectModifiers): void {
  const galleryUnlocked = sources.gallery.isUnlocked(player);
  const hatRackUnlocked = sources.hatRack.isUnlocked(player);
  const effects = new Map<string, number>();
  for (let row = 0; row < 2; row++) {
   const items = row === 0 ? this.equipment : this.tools;
   for (let slot = 0; slot < (row === 0 ? 16 : 8); slot++) {
    const item = items[slot];
    // Dungeon equipment does not contribute to normal-character gear results.
    if (!item || item.internalName === 'Blank' || item.internalName.includes('Dung')) continue;
    if (row === 0 && ((galleryUnlocked && (slot === 10 || slot === 14)) || (hatRackUnlocked && slot === 8))) continue;
    // Slot chips take precedence over the final-slot Research multiplier.
    const chipDoubles = row === 0 && (
     (slot === 3 && modifiers.pendantChip === 1) ||
     (slot === 9 && modifiers.upperKeychainChip === 1) ||
     (slot === 10 && modifiers.trophyChip === 1)
    );
    const multiplier = chipDoubles ? 2
     : row === 0 && slot === 15 && modifiers.finalSlotResearchPercent >= 1
      ? 1 + modifiers.finalSlotResearchPercent / 100 : 1;
    for (const stat of item.itemStats) {
     if ((stat.stoneName !== 'UQ1val' && stat.stoneName !== 'UQ2val' && stat.stoneName !== 'Nothing') || !stat.extra || stat.extra === '0') continue;
     // Preserve trailing spaces: dungeon-labelled effects are distinct normal-loadout effects.
     const effect = stat.extra.toUpperCase().replace(/_/g, ' ');
     effects.set(effect, (effects.get(effect) ?? 0) + stat.getValue() * multiplier);
    }
   }
  }
  for (const bonus of bonuses) {
   const effect = getEquipmentEffect(bonus)!;
   let value = effects.get(effect) ?? 0;
   // Replacements follow equipped items; combined Obols come last.
   if (galleryUnlocked) {
    value += sources.gallery.getTrophyBonus(effect, player);
    value += sources.gallery.getNametagBonus(effect, player);
   }
   if (hatRackUnlocked) value += sources.hatRack.getBonus(effect, player);
   value += sources.obols.getBonus(bonus);
   effects.set(effect, value);
  }
  this.effects = effects;
 }

 updateProperties(
  player: Player,
  sources: EquipmentSources,
  modifiers: Readonly<Record<PrimaryAttribute, AttributeEquipmentModifier>>,
 ): void {
  const galleryUnlocked = sources.gallery.isUnlocked(player);
  const hatRackUnlocked = sources.hatRack.isUnlocked(player);
  const results = {} as Record<EquipmentProperty, number>;
  for (const property of properties) {
   const isPower = property.endsWith('_Power');
   const family = isPower ? property.substring(0, property.indexOf('_')) : undefined;
   const itemProperty: ItemProperty = isPower ? 'Weapon_Power' : property as ItemProperty;
   let primary = 0;
   for (let row = 0; row < 2; row++) {
    const items = row === 0 ? this.equipment : this.tools;
    for (let slot = 0; slot < (row === 0 ? 16 : 8); slot++) {
     const item = items[slot];
     // Dungeon equipment does not contribute to normal-character gear results.
     if (!item || item.internalName === 'Blank' || item.internalName.includes('Dung')) continue;
     if (row === 0 && ((galleryUnlocked && (slot === 10 || slot === 14)) || (hatRackUnlocked && slot === 8))) continue;
     if (isPower) {
      if (row === 0) {
       // Generated suffix order selects the first matching power family.
       let suffix: string | undefined;
       for (const candidate of powerSuffixes) {
        if (item.internalName.includes(candidate)) {
         suffix = candidate;
         break;
        }
       }
       if (suffix === undefined ? family !== 'Weapon' : suffix !== family) continue;
      } else if (family === 'Weapon' || toolSlots[family as SkillPowerFamily] !== slot) {
       continue;
      }
     }
     const stat = item.getProperty(itemProperty);
     // Add base plus upgrade per item, not two separately accumulated subtotals.
     if (stat) primary += stat.value + stat.stone;
    }
   }
   // Replacement maps contain ordinary properties, not skill-power family entries.
   if (!isPower || property === 'Weapon_Power') {
    if (galleryUnlocked) {
     primary += sources.gallery.getTrophyProperty(itemProperty, player);
     primary += sources.gallery.getNametagProperty(itemProperty, player);
    }
    if (hatRackUnlocked) primary += sources.hatRack.getProperty(itemProperty, player);
   }
   if (property === 'STR' || property === 'AGI' || property === 'WIS' || property === 'LUK') {
    const modifier = modifiers[property];
    // Equipment attributes use stamps; Obols applies its separate talent and Superbit modifier.
    primary *= 1 + (modifier.talentPercent + modifier.stampPercent) / 100;
   }
   results[property] = primary + sources.obols.getProperty(property);
  }
  this.propertyResults = results;
 }

 getBonus(bonus: EquipmentBonus): number {
  const effect = getEquipmentEffect(bonus);
  if (effect === undefined) return 0;
  if (!this.effects) throw new Error('Equipment unique effects have not been calculated');
  return this.effects.get(effect) ?? 0;
 }

 getProperty(property: EquipmentProperty): number {
  if (!this.propertyResults) throw new Error('Equipment properties have not been calculated');
  return this.propertyResults[property];
 }

}

export const updateEquipmentProperties = (data: Map<string, any>): void => {
 const players = data.get('players') as Player[];
 const gallery = data.get('gallery') as Gallery;
 const hatRack = data.get('hatRack') as HatRack;
 const obols = data.get('obols') as ObolsData;
 const gaming = data.get('gaming') as Gaming;
 const menagerie = data.get('menagerie') as Menagerie;
 const stamps = data.get('stamps') as Stamp[][];
 const stampPercent = {
  STR: getStampBonusForKey(stamps, 'PctSTR'),
  AGI: getStampBonusForKey(stamps, 'PctAGI'),
  WIS: getStampBonusForKey(stamps, 'PctWIS'),
  LUK: getStampBonusForKey(stamps, 'PctLUK'),
 };
 const superbitBonus = Number(gaming.isSuperbitPurchased(2));
 for (const player of players) {
  const combinedObols = obols.getStats(player.playerID);
  combinedObols.updateProperties({
   STR: { talentPercent: player.getTalentBonus(111), superbitBonus },
   AGI: { talentPercent: player.getTalentBonus(291), superbitBonus },
   WIS: { talentPercent: player.getTalentBonus(486), superbitBonus },
   LUK: { talentPercent: player.getTalentBonus(36), superbitBonus },
  }, menagerie.silverJellyfish.miscMultiplier);
  player.gear.updateProperties(player, { gallery, hatRack, obols: combinedObols }, {
   STR: { talentPercent: player.getTalentBonus(96), stampPercent: stampPercent.STR },
   AGI: { talentPercent: player.getTalentBonus(276), stampPercent: stampPercent.AGI },
   WIS: { talentPercent: player.getTalentBonus(456), stampPercent: stampPercent.WIS },
   LUK: { talentPercent: player.getTalentBonus(21), stampPercent: stampPercent.LUK },
  });
 }
};
