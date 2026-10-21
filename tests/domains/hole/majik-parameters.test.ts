import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Companion } from '../../../data/domain/companions';
import { getCompanionActiveBonus } from '../../../data/domain/companions';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { captured } from './part1-test-helpers';

describe('Majik and Pocket Divinity direct calculated parameters', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;

 beforeAll(() => {
  results = loadExtractionResults('hole-majik-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
 });

 


it('matches bonuses consumed by multi-effect Majiks', () => {
  const upgrades = captured<{ id: number; bonus: number }[]>(results, 'upgrades');
  const creator = hole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 10)!;
  expect(creator.getBonus()).toMatchLiveGame(upgrades.find(upgrade => upgrade.id === 10)!.bonus, 0);
  const spread = hole.majiks.VillageUpgrades.find(upgrade => upgrade.index === 14)!;
  expect(spread.getBonus()).toMatchLiveGame(upgrades.find(upgrade => upgrade.id === 14)!.bonus, 0);
  expect(hole.allocationEffects.leastUnlockedInvestment)
   .toMatchLiveGame(getExtractedValue(results, 'least_investment'), 0);
});

it('matches the whole calculated Doot companion bonus', () => {
  expect(getCompanionActiveBonus(data.get('companions') as Companion[], 0))
   .toMatchLiveGame(getExtractedValue(results, 'effective_doot'), 0);
});

});
