import { Player } from '../../../data/domain/player';
import type { Menagerie } from '../../../data/domain/menagerie';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { ObolsData, ObolStats } from '../../../data/domain/world-2/obols';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
const properties = ["STR", "AGI", "WIS", "LUK", "Defence", "Accuracy", "Weapon_Power", "Mining_Power", "Choppin_Power", "Fishing_Power", "Catching_Power", "Trapping_Power", "Worship_Power"] as const;
// Native TotalStats applies Silver to these supported MISC properties; Reach has no EquipmentProperty output.
const silverAffectedProperties: Record<string, true> = {
  Defence: true,
  Weapon_Power: true,
  Mining_Power: true,
  Choppin_Power: true,
  Fishing_Power: true,
  Catching_Power: true,
  Trapping_Power: true,
  Worship_Power: true,
};

describe('Obols - combined secondary contributions', () => {
  let results: ExtractionResults;
  let silverMultiplier: number;
  let data: Map<string, any>;
  let player: Player;
  beforeAll(() => {
    results = loadExtractionResults('player-equipment-properties-data.json');
    validateExtractionHealth(results);
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
    silverMultiplier = (data.get('menagerie') as Menagerie).silverJellyfish.miscMultiplier;
  });
  properties.forEach(property => {
    it(`matches the combined raw ${property} contribution`, () => {
      const obols = data.get('obols') as ObolsData;
      const stats: ObolStats = obols.getStats(player.playerID);
      // Public display rows retain the raw combined amount. Do not interpret collection columns as base and upgrades.
      const amount = stats.stats.filter(stat => stat.stoneName === property).reduce((sum, stat) => sum + stat.getValue(), 0);
      expect(amount).toMatchLiveGameWithDetails(getExtractedValue(results, `obol_raw_${property}`), {
        tolerance: 0, context: `Target player combined raw Obol ${property}`,
      });
    });
    it(`matches the adjusted ${property} contribution consumed by Equipment`, () => {
      const obols = data.get('obols') as ObolsData;
      const stats: ObolStats = obols.getStats(player.playerID);
      const isSilverAffected = silverAffectedProperties[property] === true;
      // The source rule applies the provided multiplier once to combined personal and family rows.
      const rawSubtotal = stats.stats.filter(stat => stat.stoneName === property).reduce((sum, stat) => sum + stat.getValue(), 0);
      const expected = isSilverAffected
        ? rawSubtotal * silverMultiplier
        : getExtractedValue(results, `obol_adjusted_${property}`);
      expect(stats.getProperty(property)).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: isSilverAffected
          ? `Source-backed Silver MISC rule for target player ${property} Obols`
          : `Target player adjusted Obol ${property}`,
      });
    });
  });
  for (const effect of ['DropRate', 'BuildSpeed'] as const) {
    it(`matches combined ${effect} without applying attribute modifiers`, () => {
      const obols = data.get('obols') as ObolsData;
      const stats: ObolStats = obols.getStats(player.playerID);
      expect(stats.getBonus(EquipmentBonus[effect])).toMatchLiveGameWithDetails(getExtractedValue(results, `obol_effect_${effect}`), {
        tolerance: 0, context: `Target player combined Obol ${effect}`,
      });
    });
  }
});
