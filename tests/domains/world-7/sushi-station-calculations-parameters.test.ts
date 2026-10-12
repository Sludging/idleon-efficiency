import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const saveName = 'latest';
const extractionResultsName = 'sushi-station-calculations-data.json';

const getStation = (data: Map<string, any>): SushiStation => data.get('sushi') as SushiStation;

const parameterCases = [
  { label: 'sushi_upgrade_qty_0', description: 'Sushi Slot upgrade quantity used by slot and fuel-capacity calculations', gameCall: 'UpgradeQTY', args: [0], extract: (data: Map<string, any>) => getStation(data).getUpgradeBonus(0) },
  { label: 'sushi_upgrade_qty_1', description: 'Fuel Capacity I upgrade quantity used by fuel capacity', gameCall: 'UpgradeQTY', args: [1], extract: (data: Map<string, any>) => getStation(data).getUpgradeBonus(1) },
  { label: 'sushi_upgrade_qty_20', description: "Shake N' Bake upgrade quantity used by shaker fuel grants", gameCall: 'UpgradeQTY', args: [20], extract: (data: Map<string, any>) => getStation(data).getUpgradeBonus(20) },
  { label: 'sushi_upgrade_qty_21', description: 'Bottomless Shakers upgrade quantity used by free-use chance', gameCall: 'UpgradeQTY', args: [21], extract: (data: Map<string, any>) => getStation(data).getUpgradeBonus(21) },
  { label: 'sushi_upgrade_qty_22', description: 'Sasaphrax Saffron upgrade quantity used by Bucks per use', gameCall: 'UpgradeQTY', args: [22], extract: (data: Map<string, any>) => getStation(data).getUpgradeBonus(22) },
  ...[2, 3, 4, 5, 8, 9, 10, 11, 12, 30, 31, 32, 33, 34, 36, 37, 38, 40, 41, 43].map(index => ({
    label: `sushi_upgrade_qty_${index}`,
    description: `Upgrade quantity for record ${index} used by current Sushi Station outputs`,
    gameCall: 'UpgradeQTY',
    args: [index],
    extract: data => getStation(data).getUpgradeBonus(index),
  })),
  ...[0, 1, 3, 4, 5, 6, 10].map(category => ({
    label: `sushi_knowledge_total_${category}`,
    description: `Knowledge bonus total category ${category} directly used by Sushi Station calculations`,
    gameCall: 'KnowledgeBonusTOT',
    args: [category],
    extract: data => getStation(data).getKnowledgeBonusTotal(category),
  })),
  ...[27, 36, 45].map(tier => ({
    label: `sushi_knowledge_specific_${tier}`,
    description: `Knowledge bonus for tier ${tier} directly used by fuel per hour`,
    gameCall: 'KnowledgeBonusSpecific',
    args: [tier],
    extract: data => getStation(data).sushi[tier].getKnowledgeBonus(),
  })),
  { label: 'sushi_unique_count', description: 'Contiguous unlocked Sushi count used by Bucks and Salt tier-up calculations', extract: data => getStation(data).getUniqueSushi() },
  ...[26, 44].map(index => ({
    label: `sushi_unlock_bonus_${index}`,
    description: `Sushi ${index} unlock bonus directly used by upgrade cost reductions`,
    extract: data => getStation(data).getBonusFromIndex(index),
  })),
  { label: 'sushi_knowledge_xp_base', description: 'Knowledge XP base used by daily passive Knowledge gains', gameCall: 'KnowledgeXP_base', args: [0], extract: data => getStation(data).getKnowledgeExperienceBase() },
  { label: 'sushi_knowledge_xp_multiplier_slot_0', description: 'Knowledge XP multiplier for occupied board slot 0', gameCall: 'KnowledgeXP_multi', args: [0], extract: data => getStation(data).getKnowledgeExperienceMultiplier(0) },
  ...[1, 2, 3].map(kind => ({
    label: `sushi_slot_effect_${kind}`,
    description: `Slot effect ${kind} directly used by Sushi Station outputs or daily Knowledge gains`,
    gameCall: 'SlotEffect',
    args: [kind],
    extract: data => getStation(data).getSlotEffect(kind),
  })),
  ...[0, 1, 3].map(kind => ({
    label: `sushi_fireplace_effect_${kind}`,
    description: `Fireplace effect ${kind} directly used by Sushi Station output or Knowledge XP`,
    gameCall: 'FireplaceEffect',
    args: [kind],
    extract: data => getStation(data).getFireplaceEffect(kind),
  })),
  { label: 'sushi_combo_multiplier', description: 'Current combo multiplier directly used by Bucks per hour', gameCall: 'ComboMulti', args: [0], extract: data => getStation(data).getComboMultiplier() },
  { label: 'sushi_orange_fire_sum', description: 'Current board orange-fire sum directly used by Fuel per hour', gameCall: 'OrangeFireSum', args: [0], extract: data => getStation(data).getOrangeFireSum() },
  { label: 'sushi_dependency_research_188', description: "Research Grid Shakin' It bonus used by free shaker chance", extract: (data: Map<string, any>) => data.get('research').getBonusForId(188) },
  { label: 'sushi_dependency_research_189', description: 'Research Grid daily Sushi / Bucks bonus', extract: (data: Map<string, any>) => data.get('research').getBonusForId(189) },
  { label: 'sushi_dependency_jelly_obstruction_18', description: 'Jelly obstruction 18 cost reduction used by Sushi upgrades', extract: (data: Map<string, any>) => data.get('jellyOperator').obstructions[18].getBonus() },
  { label: 'sushi_dependency_arcade_67', description: 'Arcade bonus 67 directly used by Sushi Bucks per hour', extract: (data: Map<string, any>) => data.get('arcade').bonuses.find((bonus: { index: number }) => bonus.index === 67)!.getBonus() },
  { label: 'sushi_dependency_button_2', description: 'Button bonus 2 directly used by Sushi Bucks per hour', extract: (data: Map<string, any>) => data.get('button').getBonusForIndex(2) },
  { label: 'sushi_dependency_minehead_11', description: 'Minehead bonus 11 directly used by Sushi Bucks per hour', extract: (data: Map<string, any>) => data.get('minehead').getBonusFromIndex(11) },
  { label: 'sushi_dependency_atom_14', description: 'Atom Collider bonus 14 directly used by Sushi Bucks per hour', extract: (data: Map<string, any>) => data.get('collider').atoms.find((atom: { index: number }) => atom.index === 14)!.getBonus() },
];

describe('Sushi Station - direct parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  for (const parameter of parameterCases) {
    it(`matches ${parameter.description}`, () => {
      const expected = getExtractedValue(extractionResults, parameter.label);
      expect(parameter.extract(gameData)).toMatchLiveGame(expected, 0);
    });
  }
});
