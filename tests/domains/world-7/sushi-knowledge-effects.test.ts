import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const saveName = 'latest';
const extractionResultsName = 'sushi-knowledge-effects-data.json';

// Native formula and caller references are recorded in tests/configs/sushi-knowledge-effects.json.
describe('Sushi Station - current Knowledge effects', () => {
  let extractionResults: ExtractionResults;
  let station: SushiStation;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    station = loadGameDataFromSave(saveName).get('sushi') as SushiStation;
  });

  it('matches the collection-only Knowledge XP factor', () => {
    const collectionPercent = getExtractedValue(extractionResults, 'sushi_effects_knowledge_experience_percent');
    // The collection percentage supplies one factor, not the full slot XP multiplier.
    const expected = 1 + collectionPercent / 100;

    expect(station.getKnowledgeExperienceCollectionMultiplier()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Knowledge XP factor from the Sushi collection, excluding upgrades and fireplaces',
      calculationDetails: { collectionPercent },
    });
  });

  it('matches guaranteed cooked tiers and the chance for one more tier', () => {
    const combinedPercent = getExtractedValue(extractionResults, 'sushi_effects_cooked_tier_percent');
    // Native cooking adds floor(combined bonus / 100 + a uniform random value in [0, 1)).
    const extraTiers = combinedPercent / 100;
    const guaranteedExtraTiers = Math.floor(extraTiers);
    const additionalTierChance = extraTiers - guaranteedExtraTiers;
    const outcome = station.getCookedTierOutcome();

    // The retained save has no guaranteed extra tier. Bonuses above 100% remain unobserved.
    expect(outcome.guaranteedExtraTiers).toMatchLiveGameWithDetails(guaranteedExtraTiers, {
      tolerance: 0,
      context: 'guaranteed extra cooked tiers from the combined upgrade and Knowledge bonus',
      calculationDetails: { combinedPercent },
    });
    expect(outcome.additionalTierChance).toMatchLiveGameWithDetails(additionalTierChance, {
      tolerance: 0,
      context: 'fractional chance for one tier above the guaranteed cooked-tier bonus',
      calculationDetails: { combinedPercent, guaranteedExtraTiers },
    });
  });

  it('matches the reciprocal Knowledge factor applied to upgrade costs', () => {
    const expected = getExtractedValue(extractionResults, 'sushi_effects_knowledge_upgrade_cost_factor');

    expect(station.getKnowledgeUpgradeCostFactor()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Knowledge upgrade-cost factor, excluding other discounts and individual upgrade prices',
    });
  });

  it('matches the three separate faster-Fuel Knowledge factors used by the game', () => {
    const expected = getExtractedValue(extractionResults, 'sushi_effects_faster_fuel_knowledge_factor');

    // Native Fuel generation uses King Beef Sashimi, Abalone Sashimi, and Imaginei Dragonroll only.
    // The retained save has no Leviathan Roll Knowledge bonus, so its omission has no numeric effect here.
    expect(station.getFasterFuelKnowledgeFactor()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'product of the faster-Fuel Knowledge factors that native Fuel generation applies',
    });
  });

  it('matches the collection Perfecto factor without treating it as a tier-specific chance', () => {
    const collectionPercent = getExtractedValue(extractionResults, 'sushi_effects_knowledge_perfecto_percent');
    const expected = 1 + collectionPercent / 100;

    // The retained save has a neutral collection factor. Positive Perfecto scaling remains unobserved.
    expect(station.getKnowledgePerfectoChanceMultiplier()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'collection factor for Perfecto chance, before tier-dependent odds',
      calculationDetails: { collectionPercent },
    });
  });
});
