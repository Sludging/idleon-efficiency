import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getBoatArtifactFindMultiplier } from '../../../data/domain/world-5/sailing/artifactChance';
import type { Player } from '../../../data/domain/player';
 

const saveName = 'latest';
const extractionResultsName = 'sailing-artifact-chance-data.json';

describe('Sailing boat artifact find multiplier', () => {
  let gameData: Map<string, any>;
  let extractionResults: ExtractionResults;

  let player: Player;
  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    player = (gameData.get('players') as Player[]).find(candidate => candidate.playerID === 3)!;

  });

  it('matches native artifact find multiplier for boat 0', () => {
    expect(getBoatArtifactFindMultiplier(gameData, 0, player)).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'boat_0_artifact_find_multiplier'),
      { tolerance: 0, context: 'Artifact find multiplier for Sailing boat 0' },
    );
  });
 
  it('matches the multiplier for a second owned boat with different real inputs', () => {
    expect(getBoatArtifactFindMultiplier(gameData, 1, player)).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'boat_1_artifact_find_multiplier'),
      { tolerance: 0, context: 'Artifact find multiplier for Sailing boat 1' },
    );
  });
});
