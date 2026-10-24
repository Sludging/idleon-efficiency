import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { getBoatArtifactFindMultiplier } from '../../../data/domain/world-5/sailing/artifactChance';
import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import type { Player } from '../../../data/domain/player';

type BoatArtifactFindMultiplier = {
  index: number;
  multiplier: number;
};

const extractionResults = loadExtractionResults('sailing-artifact-chance-data.json');
validateExtractionHealth(extractionResults);
const multipliers = extractionResults.extractions.boat_artifact_find_multipliers.result as BoatArtifactFindMultiplier[];

describe('Sailing boat artifact find multiplier', () => {
  let gameData: Map<string, any>;
  let sailing: Sailing;
  let player: Player;

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
    sailing = gameData.get('sailing') as Sailing;
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  it.each(multipliers)('matches artifact find multiplier for owned boat $index', ({ index, multiplier }) => {
    const boat = sailing.boats.find(candidate => candidate.index === index);
    if (!boat) throw new Error(`Owned Sailing boat ${index} not found`);
    if (typeof multiplier !== 'number') throw new Error(`Artifact find multiplier missing for boat ${index}`);

    expect(getBoatArtifactFindMultiplier(gameData, index, player)).toMatchLiveGameWithDetails(multiplier, {
      tolerance: 0,
      context: `Artifact find multiplier for Sailing boat ${index}`,
      debugInfo: { playerID: player.playerID, captainIndex: boat.captain?.index },
    });
  });
});
