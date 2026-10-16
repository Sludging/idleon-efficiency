import { Button } from '../../../data/domain/world-7/button';
import { Card } from '../../../data/domain/cards';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { Cooking } from '../../../data/domain/world-4/cooking';
import { DancingCoral } from '../../../data/domain/world-7/dancingCoral';
import { Farming, CropScientistBonusText } from '../../../data/domain/world-6/farming';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { Lab } from '../../../data/domain/world-4/lab';
import { Slab } from '../../../data/domain/world-5/slab';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { Spelunking } from '../../../data/domain/world-7/spelunking';
import { Summoning } from '../../../data/domain/world-6/summoning';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { TotalizerBonus, Worship } from '../../../data/domain/world-3/worship';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import type { ParameterTestSpec } from '../../utils/parameter-test-config';

const getNativeSpelunkingUpgradeBonus = (data: Map<string, any>, index: number): number =>
  (data.get('spelunking') as Spelunking).upgrades.find(upgrade => upgrade.index === index)!.sourceBonus;
const parameters: ParameterTestSpec[] = [
  { extractionKey: 'spelunk_power_summoning_27', description: 'Summoning winner bonus 27', domainExtractor: data => (data.get('summoning') as Summoning).getSummoningWinnerBonusFromIndex(27) },
  { extractionKey: 'spelunk_power_sushi_20', description: 'Sushi bonus 20', domainExtractor: data => (data.get('sushi') as SushiStation).getBonusFromIndex(20) },
  { extractionKey: 'spelunk_power_jelly_38', description: 'Jelly Operator bonus 38', domainExtractor: data => (data.get('jellyOperator') as JellyOperator).getObstructionBonus(38) },
  { extractionKey: 'spelunk_power_jelly_21', description: 'Jelly Operator bonus 21', domainExtractor: data => (data.get('jellyOperator') as JellyOperator).getObstructionBonus(21) },
  { extractionKey: 'spelunk_power_button_6', description: 'The Button bonus 6', domainExtractor: data => (data.get('button') as Button).getBonusForIndex(6) },
  { extractionKey: 'spelunk_power_chapter_1_2', description: 'Spelunking chapter 1 bonus 2', domainExtractor: data => (data.get('spelunking') as Spelunking).chapters.find(chapter => chapter.index === 1)!.bonuses[2].getBonus() },
  { extractionKey: 'spelunk_power_chapter_5_0', description: 'Spelunking chapter 5 bonus 0', domainExtractor: data => (data.get('spelunking') as Spelunking).chapters.find(chapter => chapter.index === 5)!.bonuses[0].getBonus() },
  { extractionKey: 'spelunk_power_chapter_4_2', description: 'Spelunking chapter 4 bonus 2', domainExtractor: data => (data.get('spelunking') as Spelunking).chapters.find(chapter => chapter.index === 4)!.bonuses[2].getBonus() },
  { extractionKey: 'spelunk_power_companion_143', description: 'Companion bonus 143', domainExtractor: data => getCompanionActiveBonus(data.get('companions') as Companion[], 143) },
  { extractionKey: 'spelunk_power_upgrade_0', description: 'Spelunking shop upgrade 0', domainExtractor: data => getNativeSpelunkingUpgradeBonus(data, 0) },
  { extractionKey: 'spelunk_power_upgrade_1', description: 'Spelunking shop upgrade 1', domainExtractor: data => getNativeSpelunkingUpgradeBonus(data, 1) },
  { extractionKey: 'spelunk_power_upgrade_2', description: 'Spelunking shop upgrade 2', domainExtractor: data => getNativeSpelunkingUpgradeBonus(data, 2) },
  { extractionKey: 'spelunk_power_upgrade_3', description: 'Spelunking shop upgrade 3', domainExtractor: data => getNativeSpelunkingUpgradeBonus(data, 3) },
  { extractionKey: 'spelunk_power_upgrade_14', description: 'Spelunking shop upgrade 14', domainExtractor: data => getNativeSpelunkingUpgradeBonus(data, 14) },
  { extractionKey: 'spelunk_power_upgrade_15', description: 'Spelunking shop upgrade 15', domainExtractor: data => getNativeSpelunkingUpgradeBonus(data, 15) },
  { extractionKey: 'spelunk_power_upgrade_16', description: 'Spelunking shop upgrade 16', domainExtractor: data => getNativeSpelunkingUpgradeBonus(data, 16) },
  { extractionKey: 'spelunk_power_upgrade_17', description: 'Spelunking shop upgrade 17', domainExtractor: data => getNativeSpelunkingUpgradeBonus(data, 17) },
  { extractionKey: 'spelunk_power_upgrade_46', description: 'Spelunking shop upgrade 46', domainExtractor: data => getNativeSpelunkingUpgradeBonus(data, 46) },
  { extractionKey: 'spelunk_power_upgrade_54', description: 'Spelunking shop upgrade 54', domainExtractor: data => getNativeSpelunkingUpgradeBonus(data, 54) },
  { extractionKey: 'spelunk_power_dancing_coral_1', description: 'Dancing Coral bonus 1', domainExtractor: data => (data.get('dancingCoral') as DancingCoral).getBonusFromIndex(1) },
  { extractionKey: 'spelunk_power_crop_scientist_8', description: 'Crop Scientist Spelunking bonus', domainExtractor: data => (data.get('farming') as Farming).cropScientist.getBonus(CropScientistBonusText.Spelunky) },
  { extractionKey: 'spelunk_power_msa_9', description: 'Worship Totalizer Spelunking POW bonus', domainExtractor: data => (data.get('worship') as Worship).totalizer.getBonus(TotalizerBonus.SpelunkingPow) },
  { extractionKey: 'spelunk_power_meal', description: 'Spelunking POW meal bonus', domainExtractor: data => (data.get('cooking') as Cooking).getMealBonusForKey('SplkPOW') },
  { extractionKey: 'spelunk_power_sticker_6', description: 'Farming sticker bonus 6', domainExtractor: data => (data.get('farming') as Farming).getStickerBonus(6) },
  { extractionKey: 'spelunk_power_palette_13', description: 'Gaming Palette bonus 13', domainExtractor: data => (data.get('gaming') as Gaming).getPaletteBonus(13) },
  { extractionKey: 'spelunk_power_exotic_42', description: 'Farming Exotic Market bonus 42', domainExtractor: data => (data.get('farming') as Farming).getExoticMarketBonusValue(42) },
  { extractionKey: 'spelunk_power_card_w7a5', description: 'Card w7a5 native progression level', domainExtractor: data => (data.get('cards') as Card[]).find(card => card.id === 'w7a5')!.getLevels() },
  {
    extractionKey: 'spelunk_power_slab_6',
    description: 'Sailing Slab Spelunking POW bonus 6',
    domainExtractor: data => {
      const slab = data.get('slab') as Slab;
      const mainframeBonusPercent = (data.get('lab') as Lab).bonuses[15].getBonus();
      const unlocked = (data.get('gaming') as Gaming).isSuperbitPurchased(25);
      return slab.getSpelunkingPowerBonus(mainframeBonusPercent, unlocked);
    },
  },
];

describe('Persistent Spelunking power direct parameters', () => {
  let data: Map<string, any>;
  let results: ExtractionResults;

  beforeAll(() => {
    results = loadExtractionResults('button-spelunking-power-parameters-data.json');
    validateExtractionHealth(results);
    data = loadGameDataFromSave('latest');
  });

  it.each(parameters)('$description', ({ extractionKey, domainExtractor }) => {
    expect(domainExtractor(data)).toMatchLiveGame(getExtractedValue(results, extractionKey), 0);
  });
});
