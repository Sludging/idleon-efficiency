import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { ResearchGrid } from '../../../data/domain/world-7/research';

const saveName = 'latest';
const extractionResultsName = 'sushi-knowledge-data.json';


type PassiveSlot = { slot: number; tier: number; plate: number; effect: number; multiplier: number };

describe('Sushi Station - Knowledge - Parameters', () => {
  let extractionResults: ExtractionResults;
  let station: SushiStation;
  let researchGrid: ResearchGrid;
  let levels: number[];
  let experience: number[];
  let required: number[];
  let slotInputs: PassiveSlot[];

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave(saveName);
    station = gameData.get('sushi') as SushiStation;
    researchGrid = gameData.get('research') as ResearchGrid;
    levels = extractionResults.extractions.sushi_knowledge_levels.result;
    experience = extractionResults.extractions.sushi_knowledge_experience.result;
    required = extractionResults.extractions.sushi_knowledge_experience_required.result;
    // Extraction serialization represents an empty source-slot array as null.
    slotInputs = extractionResults.extractions.sushi_knowledge_passive_slot_inputs.result ?? [];
  });


  it('matches the source XP threshold parameter at the selected Sushi level', () => {
    const tier = levels.findIndex((level, index) => level > 0 || Number(experience[index]) > 0);
    const selectedTier = tier >= 0 ? tier : 0;
    expect(station.sushi[selectedTier].getKnowledgeExperienceRequired()).toMatchLiveGame(required[selectedTier], 0);
  });


  it('matches the plate effect and source-slot XP multiplier used by daily passive grants', () => {
    const selected = [2, 3]
      .map(plate => slotInputs.find(input => input.plate === plate))
      .filter((input): input is PassiveSlot => input !== undefined);
    expect(station.getKnowledgeBonusTotal(1)).toMatchLiveGame(
      extractionResults.extractions.sushi_knowledge_bonus_total_1.result,
    );
    expect(station.getUpgradeBonus(38)).toMatchLiveGame(
      extractionResults.extractions.sushi_knowledge_upgrade_qty_38.result,
    );
    for (const input of selected) {
      expect(station.getSlotEffect(input.plate)).toMatchLiveGame(input.effect, 0);
      expect(station.getKnowledgeExperienceMultiplier(input.slot)).toMatchLiveGame(input.multiplier, 0);
    }
  });

  it('matches the Research Grid 189 level gate consumed by the daily Knowledge grant', () => {
    expect(researchGrid.getBonusForId(189, 1)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'sushi_knowledge_research_grid_189'),
      0,
    );
  });
});
