/**
 * The Family Guy talent (144) boosts the winning character's Family Class
 * Bonus. These comparisons isolate its player-specific value and the account-wide
 * highestFamilyGuy input used by Divine Knight and Siege Breaker.
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
import { Family } from "../../../data/domain/family";
import { ClassIndex } from "../../../data/domain/talents";

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
  it("validates account-wide highest Family Guy bonus used by Divine Knight and Siege Breaker", () => {
    const liveValue = getExtractedValue(extractionResults, "family_guy_special_144");
    const family = gameData.get("family") as Family;
    const domainValue = family.getClassBonus(ClassIndex.Divine_Knight)!.highestFamilyGuy;
    expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
});
