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
        expect(gaming.palette.bonusLuck).toMatchLiveGameWithDetails(getExtractedValue(results, 'PaletteLuck'), {
            tolerance: 0,
            context: 'Gaming Palette Luck after saved-state initialization',
        });
        expect(gaming.garden.growthCycleSeconds).toMatchLiveGameWithDetails(getExtractedValue(results, 'SproutGrowthTime'), {
            tolerance: 0,
            context: 'Gaming sprout growth cycle after saved-state initialization',
        });
        expect(gaming.garden.nonPlantBitsMultiplier).toMatchLiveGameWithDetails(getExtractedValue(results, 'SproutValueNonPlantMulti'), {
            tolerance: 0,
            context: 'Non-plant sprout Bits multiplier after saved-state initialization',
        });
        expect(gaming.logbook.bitsMultiplier).toMatchLiveGameWithDetails(getExtractedValue(results, 'logbook_bits_multiplier'), {
            tolerance: 0,
            context: 'Historical Gaming Logbook Bits multiplier after saved-state initialization',
        });
        expect((gaming.getImport(0) as SprinklerImport).waterCharges).toMatchLiveGameWithDetails(getExtractedValue(results, 'water_charges'), {
            tolerance: 0,
            context: 'Saved Sprinkler water charges after Gaming reprocessing',
        });
        expect((gaming.getImport(1) as ShovelImport).digs).toMatchLiveGameWithDetails(getExtractedValue(results, 'shovel_digs'), {
            tolerance: 0,
            context: 'Saved Shovel digs after Gaming reprocessing',
        });
        expect((data.get('construction') as Construction).library.gamingCheckoutBoost).toMatchLiveGameWithDetails(getExtractedValue(results, 'library_gaming_contribution'), {
            tolerance: 0,
            context: 'Library Gaming checkout contribution after Gaming reprocessing',
        });
        // Projected harvest income must never alter the saved Bits balance.
        expect(gaming.bits).toMatchLiveGameWithDetails(getExtractedValue(results, 'native_bits'), {
            tolerance: 0,
            context: 'Saved Gaming Bits balance after Gaming reprocessing',
        });
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

