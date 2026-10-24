import { initIslandInfoRepo } from '../../../data/domain/data/IslandInfoRepo';
import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import {
  loadExtractionResults,
  validateExtractionHealth,
  type ExtractionResults,
} from '../../utils/live-game-data-loader';

type CaptainExpRequirement = {
  index: number;
  requirement: number;
};

type IslandCaptainExp = {
  index: number;
  expPerTrip: number;
};

const save = loadTestSave('latest');
const savedCaptains = JSON.parse(save.get('Captains')) as number[][];
const savedSailing = JSON.parse(save.get('Sailing')) as number[][];
const ownedCaptainCount = Math.round(savedSailing[2][0] + 1);
const captainCases = savedCaptains.map((record, index) => ({
  index,
  owned: index < ownedCaptainCount && record[0] !== -1,
})).filter(({ index, owned }) => owned || index >= savedCaptains.length - 4);

// The genuine save includes owned captains at levels 21/22 and four shop captains at level 1.
describe('Sailing captain EXP', () => {
  let sailing: Sailing;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults('sailing-captain-exp-data.json');
    validateExtractionHealth(extractionResults);
    sailing = loadGameDataFromSave('latest').get('sailing') as Sailing;
  });

  it.each(captainCases)('matches next-level EXP requirement for captain $index', ({ index, owned }) => {
    const captains = owned ? sailing.captains : sailing.shopCaptains;
    const captain = captains.find(candidate => candidate.index === index);
    if (!captain) throw new Error(`Sailing ${owned ? 'owned' : 'shop'} captain ${index} not found`);

    const expected = (extractionResults.extractions.captain_exp_requirements.result as CaptainExpRequirement[])
      .find(candidate => candidate.index === index);
    if (!expected || typeof expected.requirement !== 'number') {
      throw new Error(`Native next-level EXP requirement missing for Sailing captain ${index}`);
    }

    expect(captain.getExpForNextLevel()).toMatchLiveGameWithDetails(expected.requirement, {
      tolerance: 0,
      context: `Sailing ${owned ? 'owned' : 'shop'} captain ${index} next-level EXP requirement`,
      debugInfo: { index, level: captain.level },
    });
  });

  // Each destination has its own generated base EXP. Keep every island visible as a separate comparison.
  it.each(initIslandInfoRepo())('matches captain EXP per trip for $data.name', ({ index, data }) => {
    const island = sailing.islands.find(candidate => candidate.index === index);
    if (!island) throw new Error(`Sailing island ${index} (${data.name}) not found`);

    const expected = (extractionResults.extractions.island_captain_exp_per_trip.result as IslandCaptainExp[])
      .find(candidate => candidate.index === index);
    if (!expected || typeof expected.expPerTrip !== 'number') {
      throw new Error(`Native captain EXP per trip missing for Sailing island ${index} (${data.name})`);
    }

    expect(island.getCaptainExpPerTrip()).toMatchLiveGameWithDetails(expected.expPerTrip, {
      tolerance: 0,
      context: `${data.name} captain EXP per trip`,
      debugInfo: { index, baseExpPerTrip: island.data.expPerTrip },
    });
  });
});
