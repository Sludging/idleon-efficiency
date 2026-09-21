/**
 * Representative Hat Rack contributions for the target player from the paired save.
 * These samples cover populated unique/base effects and an absent effect, not
 * locked characters, empty collections, new deposits or dungeon transitions.
 * @testCovers HatRack.getBonus
 */
import { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

const samples = [
  { key: 'hat_rack_skill_efficiency', effect: '% SKILL EFFICIENCY', description: 'deposited hats Skill Efficiency' },
  { key: 'hat_rack_drop_rate', effect: '% DROP RATE', description: 'deposited hats Drop Rate including the second unique-effect channel' },
  { key: 'hat_rack_weapon_power', effect: 'Weapon Power', description: 'deposited hats base Weapon Power' },
  { key: 'hat_rack_strength', effect: 'STR', description: 'deposited hats Strength with per-hat accumulation precision' },
  { key: 'hat_rack_build_speed', effect: '% BUILD SPD', description: 'absent Build Speed contribution' },
];
interface HatRackHatForTest {
  internalName: string;
  stored: boolean;
}

interface HatRackForTest {
  hats?: HatRackHatForTest[];
}

const representativeStoredHats = ['EquipmentHats76', 'EquipmentHats108'];
const representativeMissingHats = ['EquipmentHats135', 'EquipmentHats139'];
const excludedSentinelHats = ['EquipmentHats136', 'EquipmentHats137', 'EquipmentHats138'];

const getHatRackHats = (gameData: Map<string, any>): HatRackHatForTest[] => {
  const hatRack = gameData.get('hatRack') as HatRackForTest | undefined;
  if (!hatRack) {
    throw new Error('Hat Rack domain not found in save data');
  }
  if (!Array.isArray(hatRack.hats)) {
    throw new Error('MISSING SELECTED CALCULATION - HatRack.hats must expose the complete eligible premium-hat catalog');
  }
  return hatRack.hats;
};

const getExtractedNames = (results: ExtractionResults, key: string): string[] => {
  const extraction = results.extractions[key];
  if (!extraction) {
    throw new Error(`Extraction '${key}' not found in results. Available: ${Object.keys(results.extractions).join(', ')}`);
  }
  if (results.errors[key]) {
    throw new Error(`Extraction '${key}' failed: ${results.errors[key].error}`);
  }
  if (!Array.isArray(extraction.result) || !extraction.result.every(name => typeof name === 'string')) {
    throw new Error(`Extraction '${key}' did not return a string[] of hat identities`);
  }
  return extraction.result;
};

const sortNames = (names: string[]): string[] => [...names].sort();


describe('Hat Rack Domain - Premium Hat Bonuses', () => {
  let extractionResults: ExtractionResults;
  let equipmentResults: ExtractionResults;
  let gameData: Map<string, any>;
  let player: Player;

  beforeAll(() => {
    extractionResults = loadExtractionResults('hat-rack-premium-hat-bonuses-data.json');
    equipmentResults = loadExtractionResults('player-equipment-bonuses-data.json');
    validateExtractionHealth(extractionResults);
    validateExtractionHealth(equipmentResults);
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  samples.forEach(({ key, effect, description }) => {
    it(`matches ${description}`, () => {
      const results = key === 'hat_rack_skill_efficiency' ? equipmentResults : extractionResults;
      const liveValue = getExtractedValue(results, key);
      const hatRack = gameData.get('hatRack') as { getBonus?: (effect: string, player: Player) => number } | undefined;
      if (typeof hatRack?.getBonus !== 'function') {
        throw new Error(`MISSING SELECTED CALCULATION - HatRack.getBonus("${effect}", player) must expose Gallery("InitializePremHatBonuses", 0, 0) contributions`);
      }
      expect(hatRack.getBonus(effect, player)).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Target player Hat Rack ${description}`,
      });
    });
  });
  it('matches the complete eligible premium-hat catalog', () => {
    const expectedNames = getExtractedNames(extractionResults, 'hat_rack_eligible_hats');
    const actualNames = getHatRackHats(gameData).map(hat => hat.internalName);

    expect(actualNames).toEqual(expect.arrayContaining([...representativeStoredHats, ...representativeMissingHats]));
    expect(actualNames.filter(name => excludedSentinelHats.includes(name))).toEqual([]);
    expect(sortNames(actualNames)).toEqual(sortNames(expectedNames));
  });

  it('matches eligible premium hats that are missing from the saved rack', () => {
    const expectedNames = getExtractedNames(extractionResults, 'hat_rack_missing_hats');
    const hats = getHatRackHats(gameData);
    const actualNames = hats.filter(hat => !hat.stored).map(hat => hat.internalName);

    expect(actualNames).toEqual(expect.arrayContaining(representativeMissingHats));
    expect(actualNames.filter(name => [...representativeStoredHats, ...excludedSentinelHats].includes(name))).toEqual([]);
    expect(sortNames(actualNames)).toEqual(sortNames(expectedNames));
  });
});
