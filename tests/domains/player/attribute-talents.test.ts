import type { Player } from '../../../data/domain/player';
import { Talent } from '../../../data/domain/talents';
import type { IslandExpeditions } from '../../../data/domain/world-2/islandExpedition';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

describe('Talent attribute contributions — retained target character', () => {
  let players: Player[];
  let player: Player;
  let islandExpeditions: IslandExpeditions;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    const gameData = loadGameDataFromSave('latest');
    players = gameData.get('players') as Player[];
    player = getTargetPlayer(players);
    islandExpeditions = gameData.get('islandExpeditions') as IslandExpeditions;
    extractionResults = loadExtractionResults('player-attribute-sources-data.json');
    validateExtractionHealth(extractionResults);
  });

  // Eternal talents select the account maximum, not the recipient's allocation or an account sum.
  const eternalTalents = [
    { id: 51, attribute: 'Strength', extractionKey: 'eternal_strength' },
    { id: 52, attribute: 'Agility', extractionKey: 'eternal_agility' },
    { id: 53, attribute: 'Wisdom', extractionKey: 'eternal_wisdom' },
    { id: 54, attribute: 'Luck', extractionKey: 'eternal_luck' },
  ];

  eternalTalents.forEach(({ id, attribute, extractionKey }) => {
    it(`matches the Eternal ${attribute} account contribution for the recipient`, () => {
      expect(Talent.getAccountTalentBonus(players, id, player.finalTalentInputs)).toMatchLiveGameWithDetails(
        getExtractedValue(extractionResults, extractionKey),
        {
          tolerance: 0,
          context: `Eternal ${attribute} flat attribute contribution`,
        },
      );
    });
  });

  it('matches Will Of The Eldest flat All Stat contribution after its character-level cap', () => {
    expect(Talent.getClassLevelAttributeBonus(player)).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'will_of_the_eldest_attributes'),
      {
        tolerance: 0,
        context: 'Will Of The Eldest flat All Stat contribution; highest character level includes all classes',
      },
    );
  });

  it('matches Dummy Thicc Stats All Stat percentage from the Shimmer Dummy Target record', () => {
    // The paired talent has no allocation; the ordinary effect makes this result zero despite the positive record.
    expect(Talent.getDummyTargetAllStatBonus(player, islandExpeditions.dummyTargetBestDPS)).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'dummy_target_all_stat_bonus'),
      {
        tolerance: 0,
        context: 'Dummy Thicc Stats All Stat percentage points from the IslandExpeditions record',
      },
    );
  });
});
