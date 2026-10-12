import { HandleRawDataKey } from '../../../data/domain/base/domain';
import { Gaming, updateGaming, updateGamingDisplay, updateSuperbitImpacts } from '../../../data/domain/world-5/gaming';
import { SprinklerImport, ShovelImport } from '../../../data/domain/world-5/gaming/imports';
import { Construction } from '../../../data/domain/world-3/construction/construction';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

// Reprocess the same genuine account, without inventing a save or changing input.
// This catches accumulated earned bonuses, duplicated progress and stale prepared
// leaf state while preserving the dependency results populated by the full pipeline.
it('reinitialization, reparsing and repeated Gaming updates preserve consumer-visible results', () => {
    const results = loadExtractionResults('gaming-mechanics-data.json');
    validateExtractionHealth(results);
    const save = loadTestSave('latest');
    const data = loadGameDataFromSave('latest');
    const gaming = data.get('gaming') as Gaming;
    const assertAccountResults = () => {
        expect(gaming.palette.bonusLuck).toMatchLiveGame(getExtractedValue(results, 'PaletteLuck'), 0);
        expect(gaming.garden.growthCycleSeconds).toMatchLiveGame(getExtractedValue(results, 'SproutGrowthTime'), 0);
        expect(gaming.garden.nonPlantBitsMultiplier).toMatchLiveGame(getExtractedValue(results, 'SproutValueNonPlantMulti'), 0);
        expect(gaming.logbook.bitsMultiplier).toMatchLiveGame(getExtractedValue(results, 'logbook_bits_multiplier'), 0);
        expect((gaming.getImport(0) as SprinklerImport).waterCharges).toMatchLiveGame(getExtractedValue(results, 'water_charges'), 0);
        expect((gaming.getImport(1) as ShovelImport).digs).toMatchLiveGame(getExtractedValue(results, 'shovel_digs'), 0);
        expect((data.get('construction') as Construction).library.gamingCheckoutBoost).toMatchLiveGame(getExtractedValue(results, 'library_gaming_contribution'), 0);
        // Projected harvest income must never alter the saved Bits balance.
        expect(gaming.bits).toMatchLiveGame(getExtractedValue(results, 'native_bits'), 0);
    };
    assertAccountResults();
    const parsed = new Map(data);
    gaming.getRawKeys().forEach(raw => HandleRawDataKey(raw, parsed, save, data.get('charCount')));
    gaming.init([], 0);
    gaming.parse(parsed);
    updateGaming(data);
    updateSuperbitImpacts(data);
    updateGamingDisplay(data);
    assertAccountResults();
    updateGaming(data);
    updateSuperbitImpacts(data);
    updateGamingDisplay(data);
    assertAccountResults();
});

