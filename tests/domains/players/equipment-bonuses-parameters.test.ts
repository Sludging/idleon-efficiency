/**
 * Direct calculated inputs to Equipment unique effects from the paired save.
 * Replacement owners and combined Obols supply complete numerical contributions.
 */
import { Player } from '../../../data/domain/player';
import { Gallery } from '../../../data/domain/world-7/gallery';
import { HatRack } from '../../../data/domain/world-7/hatRack';
import { ResearchGrid } from '../../../data/domain/world-7/research';
import { ObolsData, ObolStats } from '../../../data/domain/world-2/obols';
import { EquipmentBonus, getEquipmentEffect } from '../../../data/domain/equipment-effects';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { getTargetPlayer, TARGET_PLAYER_INDEX } from '../../utils/target-player';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  pendant_chip: {
    description: 'pendant chip contribution controlling slot doubling',
    extractionKey: 'equipment_chip_pend',
    domainExtractor: gameData => getTargetPlayer(gameData.get('players') as Player[]).getChipBonus('pend'),
  },
  upper_keychain_chip: {
    description: 'upper keychain chip contribution controlling slot doubling',
    extractionKey: 'equipment_chip_key1',
    domainExtractor: gameData => getTargetPlayer(gameData.get('players') as Player[]).getChipBonus('key1'),
  },
  trophy_chip: {
    description: 'trophy chip contribution controlling slot doubling',
    extractionKey: 'equipment_chip_troph',
    domainExtractor: gameData => getTargetPlayer(gameData.get('players') as Player[]).getChipBonus('troph'),
  },
  equipment_research: {
    description: 'Research bonus multiplying the final equipment slot',
    extractionKey: 'equipment_research_172',
    domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(172),
  },
  gallery_trophy_skill_efficiency: {
    description: 'Gallery trophy Skill Efficiency contribution',
    extractionKey: 'gallery_trophy_skill_efficiency',
    domainExtractor: gameData => (gameData.get('gallery') as Gallery).getTrophyBonus('% SKILL EFFICIENCY', getTargetPlayer(gameData.get('players') as Player[])),
  },
  gallery_nametag_drop_rate: {
    description: 'Gallery nametag Drop Rate contribution',
    extractionKey: 'gallery_nametag_drop_rate',
    domainExtractor: gameData => (gameData.get('gallery') as Gallery).getNametagBonus('% DROP RATE', getTargetPlayer(gameData.get('players') as Player[])),
  },
  hat_rack_skill_efficiency: {
    description: 'Hat Rack Skill Efficiency contribution',
    extractionKey: 'hat_rack_skill_efficiency',
    domainExtractor: gameData => (gameData.get('hatRack') as HatRack).getBonus('% SKILL EFFICIENCY', getTargetPlayer(gameData.get('players') as Player[])),
  },
};

describe('Player Domain - Equipment Bonuses - Parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('player-equipment-bonuses-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  Object.entries(parameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
  it('matches every replacement and Obol input to the prepared unique effects', () => {
    const player = getTargetPlayer(gameData.get('players') as Player[]);
    const gallery = gameData.get('gallery') as Gallery;
    const rack = gameData.get('hatRack') as HatRack;
    const obols = gameData.get('obols') as ObolsData;
    const prepared = extractionResults.extractions.equipment_prepared_effects.result;
    const replacements = extractionResults.extractions.equipment_replacement_effects.result;
    const obolEffects = extractionResults.extractions.equipment_obol_effects.result;
    for (const bonus of Object.values(EquipmentBonus)) {
      if (typeof bonus !== 'number') continue;
      const effect = getEquipmentEffect(bonus)!;
      const key = effect.replace(/ /g, '_');
      if (!Object.prototype.hasOwnProperty.call(prepared, key)) continue;
      expect(gallery.getTrophyBonus(effect, player)).toMatchLiveGame(replacements.trophy[key] ?? 0, 0);
      expect(gallery.getNametagBonus(effect, player)).toMatchLiveGame(replacements.nametag[key] ?? 0, 0);
      expect(rack.getBonus(effect, player)).toMatchLiveGame(replacements.hat[key] ?? 0, 0);
      const stats: ObolStats = obols.getStats(player.playerID);
      // Replacement and Obol stages add only matching own keys. A missing key contributes zero.
      expect(stats.getBonus(bonus)).toMatchLiveGame(obolEffects[key] ?? 0, 0);
    }
  });
});
