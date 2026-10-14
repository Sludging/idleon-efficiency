import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// The paired save covers one normal character. Other characters and excluded contexts have no native numeric oracle here.
describe('Player persistent attributes — retained normal character', () => {
  let player: Player;
  let results: ExtractionResults;

  beforeAll(() => {
    results = loadExtractionResults('player-attributes-data.json');
    validateExtractionHealth(results);
    const gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  const attributes = [
    { field: 'strength', name: 'Strength' },
    { field: 'agility', name: 'Agility' },
    { field: 'wisdom', name: 'Wisdom' },
    { field: 'luck', name: 'Luck' },
  ] as const;

  attributes.forEach(({ field, name }) => {
    it(`matches calculated ${name} from the normal loadout and persistent bonuses`, () => {
      const replay = results.extractions.attributes.result;
      // Cached final totals explain stale game snapshots; only independent source replay supplies expected attributes.
      expect(player.stats[field]).toMatchLiveGameWithDetails(replay[field], {
        tolerance: 0,
        context: `${name} for player ${player.playerID} ${player.playerName}; native replay diagnostics: ${JSON.stringify({
          context: replay.context,
          sharedFlat: replay.sharedFlat,
          sharedPercent: replay.sharedPercent,
          will: replay.will,
          gear: replay.gear,
          cachedTotals: replay.cachedTotals,
        })}`,
      });
    });
  });
});
