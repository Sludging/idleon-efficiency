import {
  ExtractionResults,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const saveName = 'latest';
const extractionResultsName = 'sushi-station-unlock-bonuses-data.json';
const knowledgeCount = 64;
const upgradeCount = 46;

const getRawArray = (results: ExtractionResults, label: string): number[] => {
  const extraction = results.extractions[label];
  if (!extraction) {
    throw new Error(`Extraction '${label}' not found`);
  }
  return extraction.result as number[];
};

describe('Sushi Station - Player State and Bonuses', () => {
  let extractionResults: ExtractionResults;
  let sushiStation: SushiStation;
  let liveKnowledgeBonuses: number[];
  let liveUpgradeBonuses: number[];

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave(saveName);
    liveKnowledgeBonuses = getRawArray(extractionResults, 'sushi_knowledge_bonus_specific');
    liveUpgradeBonuses = getRawArray(extractionResults, 'sushi_station_upgrade_qty');
    sushiStation = gameData.get('sushi') as SushiStation;
    if (!sushiStation) {
      throw new Error('SushiStation domain not found in save data');
    }
  });

  it('maps all board tiers and source-backed slot effects exactly', () => {
    const tiers = getRawArray(extractionResults, 'sushi_board_tiers');
    const slotStates = getRawArray(extractionResults, 'sushi_slot_bonus_flags');

    expect(sushiStation.board).toHaveLength(120);
    expect(sushiStation.board.map(slot => slot.tierIndex)).toEqual(tiers);
    expect(sushiStation.board.map(slot => slot.slotState)).toEqual(slotStates);
    expect(sushiStation.board.map(slot => slot.hasCurrencyEffect)).toEqual(slotStates.map(state => state === 1));
    expect(sushiStation.occupiedSlotCount).toBe(tiers.filter(tier => tier >= 0).length);
    expect(sushiStation.board.every(slot => slot.occupied === (slot.tierIndex >= 0))).toBe(true);
    expect(sushiStation.board.every(slot => slot.sushi === null || slot.sushi.index === slot.tierIndex)).toBe(true);
    expect(sushiStation.board.every(slot => slot.fireplace === sushiStation.fireplaces[slot.index % 15])).toBe(true);
  });

  it('maps fireplace states without reinterpreting them', () => {
    const fireplaceStates = getRawArray(extractionResults, 'sushi_fireplace_types');

    expect(sushiStation.fireplaces).toHaveLength(15);
    expect(sushiStation.fireplaces.map(fireplace => fireplace.rawState)).toEqual(fireplaceStates);
    expect(sushiStation.fireplaces.map(fireplace => fireplace.hasCurrencyEffect)).toEqual(
      fireplaceStates.map(state => state === 1)
    );
  });

  it('exposes the highest occupied catalogued Sushi', () => {
    const highestOccupied = sushiStation.sushi
      .filter(sushi => sushiStation.board.some(slot => slot.occupied && slot.tierIndex === sushi.index))
      .reduce<SushiStation['highestOccupiedSushi']>(
        (highest, sushi) => highest === null || sushi.index > highest.index ? sushi : highest,
        null
      );

    expect(sushiStation.highestOccupiedSushi).toBe(highestOccupied);
  });

  it('defaults all Sushi state when the account-wide key is absent', () => {
    const station = new SushiStation('sushi').init([], 0) as SushiStation;
    station.parse(new Map([['sushi', station]]));

    expect(station.board).toHaveLength(120);
    expect(station.board.every(slot => slot.tierIndex === -1 && slot.slotState === 0 && !slot.occupied)).toBe(true);
    expect(station.board.every(slot => slot.sushi === null && !slot.hasCurrencyEffect)).toBe(true);
    expect(station.fireplaces).toHaveLength(15);
    expect(station.fireplaces.every(fireplace => fireplace.rawState === 0 && !fireplace.hasCurrencyEffect)).toBe(true);
    expect(station.occupiedSlotCount).toBe(0);
    expect(station.highestOccupiedSushi).toBeNull();
    expect(station.sushi.every(sushi => sushi.collectionState === -1 && sushi.knowledgeLevel === 0)).toBe(true);
    expect(station.sushi.every(sushi => !sushi.unlocked && sushi.getBonus() === 0 && sushi.getKnowledgeBonus() === 0)).toBe(true);
    expect(station.upgrades.every(upgrade => upgrade.level === 0 && upgrade.getBonus() === 0)).toBe(true);
  });

  it('maps every catalogued station upgrade level exactly', () => {
    const liveLevels = getRawArray(extractionResults, 'sushi_station_upgrade_levels');
    expect(sushiStation.upgrades).toHaveLength(upgradeCount);
    expect(sushiStation.upgrades.map(upgrade => upgrade.level)).toEqual(liveLevels);
  });

  it('maps every catalogued Sushi collection and Knowledge level exactly', () => {
    const liveCollectionStates = getRawArray(extractionResults, 'sushi_collection_states');
    const liveKnowledgeLevels = getRawArray(extractionResults, 'sushi_knowledge_levels');

    expect(sushiStation.sushi).toHaveLength(knowledgeCount);
    expect(sushiStation.sushi.map(sushi => sushi.collectionState)).toEqual(liveCollectionStates);
    expect(sushiStation.sushi.map(sushi => sushi.unlocked)).toEqual(
      liveCollectionStates.map(state => state >= 0)
    );
    expect(sushiStation.sushi.map(sushi => sushi.knowledgeLevel)).toEqual(liveKnowledgeLevels);
  });

  Array.from({ length: knowledgeCount }, (_, index) => {
    it(`matches KnowledgeBonusSpecific for Sushi ${index}`, () => {
      expect(sushiStation.sushi[index].getKnowledgeBonus()).toMatchLiveGame(liveKnowledgeBonuses[index], 0);
    });
  });

  Array.from({ length: upgradeCount }, (_, index) => {
    it(`matches UpgradeQTY for station upgrade ${index}`, () => {
      expect(sushiStation.upgrades[index].getBonus()).toMatchLiveGame(liveUpgradeBonuses[index], 0);
    });
  });
});
