import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

type BoatTreasureValue = {
  index: number;
  current: number;
  next: number;
};

const extractionResults = loadExtractionResults('sailing-treasure-value-data.json');
validateExtractionHealth(extractionResults);
const treasureValues = extractionResults.extractions.boat_treasure_values.result as BoatTreasureValue[];

// Each real boat has its own captain and saved upgrade levels.
describe('Sailing boat treasure value', () => {
  let sailing: Sailing;

  beforeAll(() => {
    sailing = loadGameDataFromSave('latest').get('sailing') as Sailing;
  });

  describe.each(treasureValues)('boat $index', ({ index, current, next }) => {
    it('matches current treasure value', () => {
      const boat = sailing.boats.find(candidate => candidate.index === index);
      if (!boat) throw new Error(`Owned Sailing boat ${index} not found`);
      if (typeof current !== 'number') throw new Error(`Current treasure value missing for boat ${index}`);

      expect(boat.getLootValue()).toMatchLiveGameWithDetails(current, {
        tolerance: 0,
        context: `Sailing boat ${index} current treasure value`,
        debugInfo: { lootUpgrades: boat.lootUpgrades, captainIndex: boat.captain?.index },
      });
    });

    it('matches treasure value after the next loot upgrade', () => {
      const boat = sailing.boats.find(candidate => candidate.index === index);
      if (!boat) throw new Error(`Owned Sailing boat ${index} not found`);
      if (typeof next !== 'number') throw new Error(`Next treasure value missing for boat ${index}`);

      expect(boat.getLootValue({ lootUpgrades: boat.lootUpgrades + 1 })).toMatchLiveGameWithDetails(next, {
        tolerance: 0,
        context: `Sailing boat ${index} next-upgrade treasure value`,
        debugInfo: { lootUpgrades: boat.lootUpgrades + 1, captainIndex: boat.captain?.index },
      });
    });
  });
});
