import { Companion } from '../../../data/domain/companions';
import { initCompanionRepo } from '../../../data/domain/data/CompanionRepo';
import { initItemRepo } from '../../../data/domain/data/ItemRepo';
import { EventShop } from '../../../data/domain/eventShop';
import { Item } from '../../../data/domain/items';
import { Player } from '../../../data/domain/player';
import { CapeVine, CapeVineCape } from '../../../data/domain/world-4/capeVine';
import { HatRack } from '../../../data/domain/world-7/hatRack';
import { Minehead } from '../../../data/domain/world-7/minehead';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const itemNames = [
  'EquipmentCape1',
  'EquipmentCape2',
  'EquipmentCape3',
  'EquipmentCape4',
  'EquipmentCape5',
  'EquipmentCape6',
  'EquipmentCape7',
  'EquipmentCape23',
  'EquipmentHatsBeg1',
];
const itemDefinitions = initItemRepo().filter(base => itemNames.includes(base.data.item.internalName));
const catherineDefinition = initCompanionRepo().find(base => base.index === 105)!;

export const makeItem = (name: string): Item => {
  const definition = itemDefinitions.find(base => base.data.item.internalName === name);
  if (!definition) throw new Error(`Missing controlled item definition: ${name}`);
  return new Item(definition.data);
};

export const makeCatherine = (
  level: 1 | 2,
  owned: boolean = true,
  bonusTokenActive: boolean = false,
): Companion => {
  const companion = new Companion(105, 'Catherine', catherineDefinition.data, {
    location: 'cathie', width: 67, height: 67,
  });
  companion.level = level;
  companion.owned = owned;
  companion.bonusTokenActive = bonusTokenActive;
  return companion;
};

type CapeAccountInputs = {
  deposits?: string[];
  claimedGoldenSlots?: number;
  premiumGoldenSlots?: boolean;
  players?: Player[];
  killsLeft?: (number | undefined)[];
  companions?: Companion[];
  depositedHats?: string[];
};

// Supply parsed save fields directly; this helper does not load a cloud save.
export const makeCapeAccount = (inputs: CapeAccountInputs = {}) => {
  const players = inputs.players ?? [new Player(0, 'Unlocked recipient')];
  const allItems = itemDefinitions.map(base => new Item(base.data));
  const capeVine = new CapeVine('capeVine').init(allItems, players.length);
  const hatRack = new HatRack('hatRack').init(allItems, players.length);
  const spelunk: string[][] = [];
  spelunk[46] = inputs.depositedHats ?? [];
  spelunk[54] = inputs.deposits ?? [];
  const options: number[] = [];
  options[669] = inputs.claimedGoldenSlots ?? 0;
  const data = new Map<string, unknown>([
    ['capeVine', capeVine],
    ['hatRack', hatRack],
    ['charCount', players.length],
    ['players', players],
    ['companions', inputs.companions ?? []],
    ['Spelunk', spelunk],
    ['OptLacc', options],
    ['BundlesReceived', { ban_o: Number(inputs.premiumGoldenSlots ?? false) }],
    ['eventShop', new EventShop('eventShop')],
    ['minehead', new Minehead('minehead')],
    ['sushi', new SushiStation('sushi')],
  ]);
  for (let index = 0; index < players.length; index++) {
    const kills: number[][] = [];
    kills[50] = [0];
    const remaining = inputs.killsLeft === undefined ? 0 : inputs.killsLeft[index];
    if (remaining !== undefined) kills[100] = [remaining];
    data.set(`KLA_${index}`, kills);
  }
  hatRack.parse(data);
  hatRack.updateContributions(data);
  capeVine.parse(data);
  capeVine.updateContributions(data);
  return { capeVine, hatRack, players, allItems, data };
};

export const getCape = (capeVine: CapeVine, name: string): CapeVineCape => {
  const cape = capeVine.capes.find(cape => cape.internalName === name);
  if (!cape) throw new Error(`Missing controlled cape: ${name}`);
  return cape;
};
