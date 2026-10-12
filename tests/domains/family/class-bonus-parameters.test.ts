/**
 * The Family Guy talent (144) boosts the winning character's Family Class
 * Bonus; this comparison isolates that player-specific website input.
 */
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from "../../utils/live-game-data-loader";
import { loadGameDataFromSave } from "../../utils/cloudsave-loader";
import { ParameterTestSpec } from "../../utils/parameter-test-config";
import { getTargetPlayer } from '../../utils/target-player';
import { Player } from "../../../data/domain/player";


const saveName = "latest";
const extractionResultsName = "family-class-bonus-data.json";


const parameterSpecs: ParameterTestSpec = {
  description:
    "The Family Guy talent bonus used by the winning owner's Family class bonus",
  extractionKey: "family_guy_talent_144",
  domainExtractor: (gameData) => getTargetPlayer(gameData.get("players") as Player[]).getTalentBonus(144),
};

describe("Family Domain - Class Bonus - Parameters", () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });
  it(`validates ${parameterSpecs.description}`, () => {
    const liveValue = getExtractedValue(extractionResults, parameterSpecs.extractionKey);
    const domainValue = parameterSpecs.domainExtractor(gameData);
    expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
});
