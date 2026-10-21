import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const saveName = 'latest';
const extractionResultsName = 'sushi-knowledge-data.json';


describe('Sushi Station - current Knowledge bonuses and XP threshold', () => {
  let extractionResults: ExtractionResults;
  let station: SushiStation;
  let sushiLevels: number[];
  let sushiExperience: number[];

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    station = loadGameDataFromSave(saveName).get('sushi') as SushiStation;
    sushiLevels = extractionResults.extractions.sushi_knowledge_levels.result;
    sushiExperience = extractionResults.extractions.sushi_knowledge_experience.result;
  });

  it('matches current Knowledge bonuses for a progressed Sushi and a locked/unleveled entry when present', () => {
    const progressed = sushiLevels.findIndex((level, index) => level > 0 && Number(sushiExperience[index]) > 0);
    const lockedOrUnleveled = sushiLevels.findIndex((level, index) => level === 0 && Number(sushiExperience[index]) === 0);
    const selected = [...new Set([progressed, lockedOrUnleveled].filter(index => index >= 0))];
    expect(selected.length).toBeGreaterThan(0);

    for (const tier of selected) {
      const knowledge = station.sushi[tier];
      const liveBonus = extractionResults.extractions.sushi_knowledge_bonus_specific.result[tier];
      expect(knowledge.getKnowledgeBonus()).toMatchLiveGameWithDetails(liveBonus, {
        tolerance: 0,
        context: `current Knowledge bonus for Sushi tier ${tier}`,
        calculationDetails: { tier, level: sushiLevels[tier] },
      });
    }
  });



  it('matches the XP threshold for a real Sushi level', () => {
    const tier = sushiLevels.findIndex((level, index) => level > 0 || Number(sushiExperience[index]) > 0);
    const selectedTier = tier >= 0 ? tier : 0;
    const knowledge = station.sushi[selectedTier];
    expect(knowledge.getKnowledgeExperienceRequired()).toMatchLiveGame(
      extractionResults.extractions.sushi_knowledge_experience_required.result[selectedTier],
      0,
    );
  });

});
