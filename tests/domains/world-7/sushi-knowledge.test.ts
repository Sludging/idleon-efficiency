import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const saveName = 'latest';
const extractionResultsName = 'sushi-knowledge-data.json';


describe('Sushi Station - Knowledge', () => {
  let extractionResults: ExtractionResults;
  let station: SushiStation;
  let sushiLevels: number[];
  let sushiExperience: number[];
  let passiveByTier: Array<{ tier: number; cold: number; milktoast: number; total: number }>;
  let etaByTier: Array<{ tier: number; secondsAfterNextRollover: number | null }>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    station = loadGameDataFromSave(saveName).get('sushi') as SushiStation;
    sushiLevels = extractionResults.extractions.sushi_knowledge_levels.result;
    sushiExperience = extractionResults.extractions.sushi_knowledge_experience.result;
    passiveByTier = extractionResults.extractions.sushi_knowledge_passive_daily_by_tier.result;
    etaByTier = extractionResults.extractions.sushi_knowledge_eta_by_tier.result;
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

  it('matches a source-derived next-level Knowledge bonus preview without changing the saved level', () => {
    const tier = sushiLevels.findIndex(level => level > 0);
    const selectedTier = tier >= 0 ? tier : 0;
    const knowledge = station.sushi[selectedTier];
    const currentLevel = knowledge.getKnowledgeLevel();
    const preview = knowledge.getKnowledgeBonus(currentLevel + 1);
    expect(preview).toMatchLiveGameWithDetails(
      extractionResults.extractions.sushi_knowledge_bonus_next_specific.result[selectedTier],
      {
        tolerance: 0,
        context: `next-level Knowledge bonus preview for Sushi tier ${selectedTier}`,
        calculationDetails: { currentLevel, previewLevel: currentLevel + 1 },
      },
    );
    expect(knowledge.getKnowledgeLevel()).toBe(currentLevel);
  });

  it('formats percentage and multiplier Knowledge bonuses with the correct units and magnitudes', () => {
    const expectPresentationPair = (
      name: string,
      unit: '%' | 'x',
      expectedCurrent: number,
      expectedNext: number,
      precision: number,
    ) => {
      const tier = station.sushi.findIndex(sushi => sushi.data.name === name);
      expect(tier).toBeGreaterThanOrEqual(0);
      const sushi = station.sushi[tier];
      const current = sushi.getKnowledgeBonusPresentation();
      const next = sushi.getKnowledgeBonusPresentation(sushi.getKnowledgeLevel() + 1);
      if (!current || !next) throw new Error(`Missing Knowledge bonus presentation for ${name}`);

      expect(current.value.endsWith(unit)).toBe(true);
      expect(next.value.endsWith(unit)).toBe(true);
      expect(Number.parseFloat(current.value)).toBeCloseTo(expectedCurrent, precision);
      expect(Number.parseFloat(next.value)).toBeCloseTo(expectedNext, precision);
    };

    expectPresentationPair('Fish Eggs', '%', 240, 280, 1);
    expectPresentationPair('Salmon Uramaki', 'x', 2.17, 2.4, 2);
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

  it('matches per-day Knowledge grants for the no-passive, Cold and Milktoast cases present in this save', () => {
    const cases = [
      { label: 'no applicable plate contribution', matches: (entry: typeof passiveByTier[number]) => entry.total === 0 },
      { label: 'Cold plate contribution to a lower tier', matches: (entry: typeof passiveByTier[number]) => entry.cold > 0 },
      { label: 'Milktoast contribution to its placed tier', matches: (entry: typeof passiveByTier[number]) => entry.milktoast > 0 },
    ];
    for (const candidate of cases) {
      const live = passiveByTier.find(candidate.matches);
      if (!live) continue;
      const knowledge = station.sushi[live.tier];
      expect(knowledge.getPassiveKnowledgeExperiencePerDay()).toMatchLiveGameWithDetails(live.total, {
        tolerance: 0,
        context: `daily passive Knowledge XP for tier ${live.tier}: ${candidate.label}`,
        calculationDetails: { cold: live.cold, milktoast: live.milktoast },
      });
    }
  });

  it('matches scheduled next-level ETA for an earning tier and the zero-gain null case when present', () => {
    const earningTier = etaByTier.find(entry => entry.secondsAfterNextRollover !== null);
    if (earningTier) {
      const knowledge = station.sushi[earningTier.tier];
      const eta = knowledge.getTimeToNextKnowledgeLevel();
      const fullDaysAfterNextRollover = eta === null ? null : eta - station.nextDailyResetSeconds;
      expect(fullDaysAfterNextRollover).toMatchLiveGameWithDetails(earningTier.secondsAfterNextRollover, {
        tolerance: 0,
        context: `full-day waits after the next daily rollover for Sushi tier ${earningTier.tier}`,
        calculationDetails: { dailyXp: passiveByTier[earningTier.tier]?.total },
      });
    }
    const noGainTier = etaByTier.find(entry => entry.secondsAfterNextRollover === null);
    if (noGainTier) {
      const knowledge = station.sushi[noGainTier.tier];
      expect(knowledge.getTimeToNextKnowledgeLevel()).toBeNull();
    }
    expect(earningTier || noGainTier).toBeDefined();
  });
});
