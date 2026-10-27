import { initArtifactRepo } from '../../../data/domain/data/ArtifactRepo';
import type { Player } from '../../../data/domain/player';
import {
  CrystalSteakArtifact,
  FunHippoeteArtifact,
  GoldRelicArtifact,
} from '../../../data/domain/world-5/sailing/artifacts';
import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

type ArtifactMainBonus = {
  index: number;
  bonus: number | null;
};

const extractionResultsName = 'sailing-artifact-bonuses-data.json';
const artifacts = initArtifactRepo().map(({ index, data }) => ({ index, name: data.name }));

// The genuine save covers transcendent and omnipotent artifacts, not lower tiers or Verisimilitude.
describe('Sailing artifact bonuses', () => {
  let gameData: Map<string, any>;
  let sailing: Sailing;
  let player: Player;
  let nativeBonuses: ArtifactMainBonus[];
  let nativeGoldRelicTierIncrement: number | null;

  beforeAll(() => {
    const extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    nativeBonuses = extractionResults.extractions['artifact_main_bonuses']?.result as ArtifactMainBonus[];
    nativeGoldRelicTierIncrement = extractionResults.extractions['gold_relic_tier_increment']?.result as number | null;
    gameData = loadGameDataFromSave('latest');
    sailing = gameData.get('sailing') as Sailing;
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  it.each(artifacts)('matches the current main bonus for $name (artifact $index)', ({ index, name }) => {
    const expected = nativeBonuses?.find(candidate => candidate.index === index);
    if (!expected || typeof expected.bonus !== 'number') {
      throw new Error(`Native main bonus for artifact ${index} (${name}) is unavailable`);
    }
    const artifact = sailing.artifacts.find(candidate => candidate.index === index);
    if (!artifact) throw new Error(`Sailing artifact ${index} (${name}) not found`);

    // Keep account projections unchanged. Only these two artifacts expose a player-aware public bonus.
    let actual: number;
    let publicMethod = 'getBonus()';
    if (artifact instanceof CrystalSteakArtifact) {
      actual = artifact.getBonusForPlayer(player);
      publicMethod = 'getBonusForPlayer(player)';
    } else if (artifact instanceof FunHippoeteArtifact) {
      actual = artifact.getBonusForPlayer(player, gameData);
      publicMethod = 'getBonusForPlayer(player, gameData)';
    } else {
      actual = artifact.getBonus();
    }

    expect(actual).toMatchLiveGameWithDetails(expected.bonus, {
      tolerance: 0,
      context: `${name} current main bonus`,
      debugInfo: {
        index,
        tier: artifact.status,
        playerIndex: player.playerID,
        publicMethod,
      },
    });
  });

  it('matches the Gold Relic tier increment used by Printer', () => {
    if (typeof nativeGoldRelicTierIncrement !== 'number') {
      throw new Error('Native Gold Relic tier increment is unavailable');
    }
    const artifact = sailing.artifacts.find(candidate => candidate.index === 4) as GoldRelicArtifact | undefined;
    if (!artifact) throw new Error('Gold Relic artifact record 4 not found');

    // Sailing's selector 1 returns the tier quantity without Printer's separate fixed 2.
    expect(artifact.getTierIncrement()).toMatchLiveGameWithDetails(nativeGoldRelicTierIncrement, {
      tolerance: 0,
      context: 'Gold Relic tier increment used by Printer',
      debugInfo: { index: artifact.index, tier: artifact.status },
    });
  });
});
