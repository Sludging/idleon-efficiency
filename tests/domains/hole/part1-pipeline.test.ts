import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Tome } from '../../../data/domain/world-4/tome';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';
import { coreNumber } from './part1-test-helpers';

describe('Hole part 1 paired calculation results', () => {
 let results: ExtractionResults;

 beforeAll(() => {
  results = loadExtractionResults('hole-part1-pipeline-data.json');
  validateExtractionHealth(results);
 });

 it('matches captured villager growth and direct Hole parameters', () => {
  const data = loadGameDataFromSave('latest');
  const hole = data.get('hole') as Hole;
  hole.villagers.forEach(villager => {
   const rate = villager.characterRates.find(rate => rate.playerId === TARGET_PLAYER_INDEX)!;
   coreNumber(rate.expPerHour, results, `growth_${villager.index}`, `${villager.name} EXP per hour`);
  });
  coreNumber(hole.getSchematicBonus(14, 0), results,
   'pipeline_schematic_14', 'Early Study sediment schematic bonus');
  coreNumber(hole.gambit.gambitPointsMulti, results,
   'pipeline_gambit_multiplier', 'Study Gambit points multiplier');
  coreNumber(hole.gambit.getGambitTotalScore(), results,
   'pipeline_gambit_points', 'Study Gambit points');
  const tome = data.get('tome') as Tome;
  const line = tome.lines.find(line => line.index === 93)!;
  coreNumber(line.getPlayerScore(TARGET_PLAYER_INDEX), results,
   'pipeline_tome_93', 'Tome cavern-only Opal score');
 });
});
