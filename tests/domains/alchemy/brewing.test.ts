import { Alchemy, Cauldron, CauldronBoost, CauldronBoostIndex, CauldronIndex } from '../../../data/domain/world-2/alchemy/alchemy';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import brewingConfig from '../../configs/alchemy-brewing.json';
import bestPreviewConfig from '../../configs/alchemy-brewing-best-preview.json';

interface NextBubbleOracle {
  bubbleNumber: number;
  worldNumber: number;
  brewRequirement: number;
  chancePercent: number;
}

interface BestBrewerPreviewOracle {
  playerId: number | undefined;
  chancePercent: number;
  estimatedUnlocks: number;
  nextBubbles: NextBubbleOracle[];
}

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

// Errors remain active when an independent oracle is unavailable. Do not use defaults.
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
  let bestPreviewResults: ExtractionResults;

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
    alchemy = gameData.get('alchemy') as Alchemy;
    const save = loadTestSave('latest');
    savedProgress = save.get('CauldronInfo')[5];
    savedBoostLevels = save.get('CauldUpgLVs');
    savedBoostProgress = save.get('CauldUpgXPs');
    results = loadExtractionResults('alchemy-brewing-data.json');
    bestPreviewResults = loadExtractionResults('alchemy-brewing-best-preview-data.json');
  });

  // All four brewing cauldrons form a small set with independent saved balances.
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

      ([
        { field: 'brewRequirement', label: 'brew_requirements', description: 'brew points required per attempt' },
        { field: 'brewSpeed', label: 'brew_speeds', description: 'assigned brewers total brew points per hour' },
      ] as const).forEach(({ field, label, description }) => {
        it(`matches ${description}`, () => {
          const expected = readOracle<number[]>(results, label)[index];
          const actual = cauldron[field];
          expect(actual).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: `${name} ${description}`,
          });
        });
      });

      (['readyAttempts', 'attemptProgress'] as const).forEach(field => {
        it(`matches saved ${field} without advancing stored brew points`, () => {
          const expected = readOracle<{ readyAttempts: number; attemptProgress: number }[]>(results, 'saved_attempt_state')[index];
          const actual = cauldron[field];
          expect(actual).toMatchLiveGameWithDetails(expected[field], {
            tolerance: 0,
            context: `${name} ${field} from retained save`,
          });
          if (field === 'readyAttempts') {
            expect(Number.isInteger(actual)).toBe(true);
          }
        });
      });

      it('matches the saved remainder fill percentage without counting complete attempts', () => {
        const expected = readOracle<number[]>(results, 'saved_brew_progress_percent')[index];
        expect(cauldron.brewProgressPercent)
          .toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: `${name} saved brewing fill percent`,
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
        (['level', 'progress', 'requirement', 'maxLevel', 'progressPercent'] as const).forEach(field => {
          it(`matches ${boostName} boost ${field}, including stored progress at maximum level`, () => {
            const boost: CauldronBoost = cauldron.boosts[boostIndex];
            const savedIndex = 4 * index + boostIndex;
            let expected: number;
            if (field === 'level') {
              expected = Number(savedBoostLevels[savedIndex]);
            } else if (field === 'progress') {
              expected = Number(savedBoostProgress[savedIndex]);
            } else if (field === 'requirement') {
              expected = readOracle<number[][]>(results, 'boost_requirements')[index][boostIndex];
            } else if (field === 'progressPercent') {
              expected = readOracle<number[][]>(results, 'saved_boost_progress_percent')[index][boostIndex];
            } else {
              // Idleon 1.24 ActorEvents_232._customEvent_decant caps each upgrade with Math.min(170, ...).
              expected = 170;
            }
            expect(boost[field])
              .toMatchLiveGameWithDetails(expected, {
                tolerance: 0,
                context: `${name} ${boostName} boost ${field}`,
              });
          });
        });
      });

      (['playerId', 'chancePercent', 'estimatedUnlocks'] as const).forEach(field => {
        it(`matches best-account Bubble Breakthrough preview ${field}`, () => {
          const expected = readOracle<BestBrewerPreviewOracle[]>(bestPreviewResults, 'best_brewer_previews')[index];
          if (expected.playerId !== bestPreviewConfig.requiredActivePlayerIndex) {
            throw new Error('Best-brewer projection recipient does not match the dedicated native capture config.');
          }
          const expectedValue = field === 'chancePercent'
            ? readOracle<number[]>(bestPreviewResults, 'best_brewer_chances')[index]
            : field === 'playerId' ? expected.playerId : expected.estimatedUnlocks;
          expect(cauldron.bestBrewerPreview[field])
            .toMatchLiveGameWithDetails(expectedValue, {
              tolerance: 0,
              context: `${name} best-account Bubble Breakthrough ${field}; not an unrelated active-player chance`,
            });
          if (field === 'playerId') {
            getTargetPlayer(gameData.get('players'), cauldron.bestBrewerPreview.playerId);
          }
        });
      });

      it('matches ten sequential next-bubble records for the independently verified best brewer', () => {
        const expected = readOracle<BestBrewerPreviewOracle[]>(bestPreviewResults, 'best_brewer_previews')[index];
        const actual = cauldron.bestBrewerPreview.nextBubbles;
        expect(actual.length).toMatchLiveGameWithDetails(10, {
          tolerance: 0,
          context: `${name} next-bubble preview record count`,
        });
        expected.nextBubbles.forEach((bubble, bubbleIndex) => {
          (['bubbleNumber', 'worldNumber', 'brewRequirement', 'chancePercent'] as const).forEach(field => {
            expect(actual[bubbleIndex][field])
              .toMatchLiveGameWithDetails(bubble[field], {
                tolerance: 0,
                context: `${name} next bubble ${bubbleIndex + 1}: ${field}`,
              });
          });
        });
      });
    });
  });
});
