/**
 * Hole Domain - Schematic bonus parameters
 *
 * Validates every calculated call made directly by a B_UPG branch: the study
 * input used by B_UPG(14), and the nested B_UPG calls used by B_UPG(49).
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Hole } from '../../../data/domain/world-5/hole/hole';

const saveName = 'latest';
const extractionResultsName = 'hole-schematic-bonuses-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
 studyBolaiaBonuses0: {
  description: 'Bolaia research bonus used to calculate the sediment expansion effect',
  extractionKey: 'hole_study_bolaia_bonuses_0_0',
  domainExtractor: (gameData) => (gameData.get('hole') as Hole).getStudyBolaiaBonuses(0),
 },
 bUpg50: {
  description: 'Fractalfly Trickledown All Skill Efficiency and EXP input to Motherlode Trickledown',
  extractionKey: 'hole_b_upg_50_1',
  domainExtractor: (gameData) => (gameData.get('hole') as Hole).getSchematicBonus(50, 1),
 },
 bUpg79: {
  description: 'Evertree Trickledown All Skill Efficiency and EXP input to Motherlode Trickledown',
  extractionKey: 'hole_b_upg_79_1',
  domainExtractor: (gameData) => (gameData.get('hole') as Hole).getSchematicBonus(79, 1),
 },
 bUpg98: {
  description: 'Trench Trickledown All Skill Efficiency and EXP input to Motherlode Trickledown',
  extractionKey: 'hole_b_upg_98_1',
  domainExtractor: (gameData) => (gameData.get('hole') as Hole).getSchematicBonus(98, 1),
 },
};

describe('Hole Domain - Schematic bonuses - Parameters', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
 });

 Object.entries(parameterSpecs).forEach(([_, spec]) => {
  it(`validates ${spec.description}`, () => {
   const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
   const domainValue = spec.domainExtractor(gameData);
   expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
 });
});
