import { Alchemy, Cauldron, CauldronBoost, CauldronBoostIndex, CauldronIndex } from '../../../data/domain/world-2/alchemy/alchemy';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import brewingConfig from '../../configs/alchemy-brewing.json';

const cauldrons = [
  { index: CauldronIndex.Power, name: 'Power' },
  { index: CauldronIndex.Quicc, name: 'Quicc' },
  { index: CauldronIndex.HighIQ, name: 'High-IQ' },
  { index: CauldronIndex.Kazam, name: 'Kazam' },
];
const boosts = [
  { index: CauldronBoostIndex.Speed, name: 'Speed' },
  { index: CauldronBoostIndex.Luck, name: 'Luck' },
  { index: CauldronBoostIndex.Cost, name: 'Cost' },
  { index: CauldronBoostIndex.Extra, name: 'Extra' },
];

// Missing independent results must fail the test, not fall back to default values.
const readOracle = <T,>(results: ExtractionResults, label: string): T => {
  const extraction = results.extractions[label];
  if (!extraction || results.errors[label]) {
    throw new Error(`Missing oracle prerequisite: ${results.errors[label]?.error ?? label}`);
  }
  if (extraction.result === null || extraction.result === undefined) {
    throw new Error(`Missing oracle prerequisite: ${label} returned no result.`);
  }
  return extraction.result as T;
};

describe('Alchemy brewing CORE results', () => {
  let alchemy: Alchemy;
  let gameData: Map<string, any>;
  let savedProgress: Record<number, number | string>;
  let savedBoostLevels: (number | string)[];
  let savedBoostProgress: (number | string)[];
  let results: ExtractionResults;

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
    alchemy = gameData.get('alchemy') as Alchemy;
    const save = loadTestSave('latest');
    savedProgress = save.get('CauldronInfo')[5];
    savedBoostLevels = save.get('CauldUpgLVs');
    savedBoostProgress = save.get('CauldUpgXPs');
    results = loadExtractionResults('alchemy-brewing-data.json');
  });

  cauldrons.forEach(({ index, name }) => {
    describe(`${name} cauldron`, () => {
      let cauldron: Cauldron;

      beforeAll(() => {
        cauldron = alchemy.cauldrons[index];
      });

      it('retains stored brew points before removing complete attempts', () => {
        expect(cauldron.brewProgress)
          .toMatchLiveGameWithDetails(Number(savedProgress[index]), {
            tolerance: 0,
            context: `${name} saved brew points`,
          });
      });

      it('matches brew points required per attempt', () => {
        const expected = readOracle<number[]>(results, 'brew_requirements')[index];
        expect(cauldron.brewRequirement).toMatchLiveGameWithDetails(expected, {
          tolerance: 0,
          context: `${name} brew points required per attempt`,
        });
      });

      it('preserves the native new-bubble chance for the captured acting player', () => {
        const player = getTargetPlayer(gameData.get('players'), brewingConfig.requiredActivePlayerIndex);
        const expected = readOracle<number[]>(results, 'actor_new_bubble_chances')[index];
        expect(cauldron.getNewBubbleChance(player)).toMatchLiveGameWithDetails(expected, {
          tolerance: 0,
          context: `${name} raw chance percent for captured acting player ${player.playerID}`,
        });
      });

      boosts.forEach(({ index: boostIndex, name: boostName }) => {
        (['level', 'progress', 'requirement'] as const).forEach(field => {
          it(`matches ${boostName} boost ${field}`, () => {
            const boost: CauldronBoost = cauldron.boosts[boostIndex];
            const savedIndex = 4 * index + boostIndex;
            let expected: number;
            if (field === 'level') {
              expected = Number(savedBoostLevels[savedIndex]);
            } else if (field === 'progress') {
              expected = Number(savedBoostProgress[savedIndex]);
            } else {
              expected = readOracle<number[][]>(results, 'boost_requirements')[index][boostIndex];
            }
            expect(boost[field])
              .toMatchLiveGameWithDetails(expected, {
                tolerance: 0,
                context: `${name} ${boostName} boost ${field}`,
              });
          });
        });
      });
    });
  });
});
