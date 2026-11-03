import { initArtifactRepo } from '../../../data/domain/data/ArtifactRepo';
import type { Player } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import {
  CrystalSteakArtifact,
  FauxoryTuskArtifact,
  FunHippoeteArtifact,
  GenieLampArtifact,
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
// True Lantern uses saved particles, which advance before the native runtime capture.
const comparableArtifacts = initArtifactRepo()
  .filter(({ index }) => index !== 29)
  .map(({ index, data }) => ({ index, name: data.name }));

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

  it.each(comparableArtifacts)('matches the current main bonus for $name (artifact $index)', ({ index, name }) => {
    const expected = nativeBonuses?.find(candidate => candidate.index === index);
    if (!expected || typeof expected.bonus !== 'number') {
      throw new Error(`Native main bonus for artifact ${index} (${name}) is unavailable`);
    }
    const artifact = sailing.artifacts.find(candidate => candidate.index === index);
    if (!artifact) throw new Error(`Sailing artifact ${index} (${name}) not found`);

    // Crystal Steak and Fun Hippoete use the captured recipient; other bonuses are account-shared.
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

  it('prepares Sailing-level artifact bonuses from a highest-Sailing character', () => {
    const players = gameData.get('players') as Player[];
    const highestSailingLevel = Math.max(...players.map(candidate => candidate.skills.get(SkillsIndex.Sailing)?.level ?? 0));
    const projectedPlayer = players.find(candidate => candidate.playerName === sailing.highestSailingPlayerName);
    if (!projectedPlayer) throw new Error('Highest-Sailing projection character not found');

    expect(sailing.highestSailingLevel).toBe(highestSailingLevel);
    expect(projectedPlayer.skills.get(SkillsIndex.Sailing)?.level ?? 0).toBe(highestSailingLevel);

    const tusk = sailing.artifacts[3] as FauxoryTuskArtifact;
    const lamp = sailing.artifacts[5] as GenieLampArtifact;
    expect(tusk.sailingLevel).toBe(highestSailingLevel);
    expect(lamp.sailingLevel).toBe(highestSailingLevel);
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
