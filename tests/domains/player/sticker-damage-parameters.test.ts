import type { Farming } from '../../../data/domain/world-6/farming';
import type { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Farming sticker damage multiplier parameter', () => {
  it('matches native StickerDMGmulti for the retained save', () => {
    const native = loadExtractionResults('player-sticker-damage-parameters-data.json');
    validateExtractionHealth(native);
    const data = loadGameDataFromSave('latest');
    const farming = data.get('farming') as Farming;
    const research = data.get('research') as ResearchGrid;

    expect(farming.getStickerDamageMultiplier(research)).toMatchLiveGame(
      getExtractedValue(native, 'sticker_damage_multiplier'),
      0,
    );
  });
});
