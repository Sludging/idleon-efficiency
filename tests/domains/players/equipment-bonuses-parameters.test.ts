/**
 * Direct calculated inputs to Player equipment bonuses from the paired save.
 * Hat Rack contributions use its owning domain; existing Player
 * obol totals are compared numerically rather than requiring a new API.
 */
import { Player } from '../../../data/domain/player';
import { Gallery } from '../../../data/domain/world-7/gallery';
import { HatRack } from '../../../data/domain/world-7/hatRack';
import { ResearchGrid } from '../../../data/domain/world-7/research';
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
});
