import { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { Gallery } from '../../../data/domain/world-7/gallery';
import { HatRack } from '../../../data/domain/world-7/hatRack';
import { ObolsData, ObolStats } from '../../../data/domain/world-2/obols';
import { Stamp, getStampBonusForKey } from '../../../data/domain/world-1/stamps';
const properties = ["STR", "AGI", "WIS", "LUK", "Defence", "Accuracy", "Weapon_Power", "Mining_Power", "Choppin_Power", "Fishing_Power", "Catching_Power", "Trapping_Power", "Worship_Power"] as const;
const replacementProperties = ["STR", "AGI", "WIS", "LUK", "Defence", "Weapon_Power"] as const;
const primaryTalents = {"STR": 96, "AGI": 276, "WIS": 456, "LUK": 21};

describe('Equipment - direct property producers', () => {
  let results: ExtractionResults;
  let data: Map<string, any>;
  let player: Player;
  beforeAll(() => {
    results = loadExtractionResults('player-equipment-properties-data.json');
    validateExtractionHealth(results);
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
  });
  Object.entries(primaryTalents).forEach(([property, talent]) => {
    it(`matches the primary ${property} equipment talent`, () => {
      expect(player.getTalentBonus(talent)).toMatchLiveGame(getExtractedValue(results, `primary_talent_${property}`), 0);
    });
    it(`matches the primary ${property} equipment stamp`, () => {
      expect(getStampBonusForKey(data.get('stamps') as Stamp[][], `Pct${property}`)).toMatchLiveGame(getExtractedValue(results, `stamp_${property}`), 0);
    });
  });
  replacementProperties.forEach(property => {
    for (const channel of ['trophy', 'nametag'] as const) {
      it(`matches Gallery ${channel} raw ${property}`, () => {
        const gallery = data.get('gallery') as Gallery;
        if (channel === 'trophy') {
          expect(gallery.getTrophyProperty(property, player)).toMatchLiveGame(getExtractedValue(results, `trophy_${property}`), 0);
        } else {
          expect(gallery.getNametagProperty(property, player)).toMatchLiveGame(getExtractedValue(results, `nametag_${property}`), 0);
        }
      });
    }
    it(`matches Hat Rack raw ${property}`, () => {
      const rack = data.get('hatRack') as HatRack;
      expect(rack.getProperty(property, player)).toMatchLiveGame(getExtractedValue(results, `hat_${property}`), 0);
    });
  });
  properties.forEach(property => {
    it(`matches the complete adjusted Obol ${property} input`, () => {
      const obols = data.get('obols') as ObolsData;
      const stats: ObolStats = obols.getStats(player.playerID);
      expect(stats.getProperty(property)).toMatchLiveGame(getExtractedValue(results, `obol_adjusted_${property}`), 0);
    });
  });
});
