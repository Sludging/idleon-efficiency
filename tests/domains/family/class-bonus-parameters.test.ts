/**
 * Family Class Bonus parameter validation.
 *
 * TalentCalc(-3) reads The Family Guy talent (144) when a winning character
 * contribution is written to FamBonusQTYs. This parameter test keeps the
 * Player-owned talent calculation separate from Family's class-lineage and
 * bonus selection logic, using the explicit owner represented by player 0.
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
    "Target player The Family Guy talent bonus used by an owner-specific Family Bonus calculation",
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
