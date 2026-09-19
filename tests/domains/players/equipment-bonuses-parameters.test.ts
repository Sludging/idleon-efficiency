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

const getPlayer0 = (gameData: Map<string, any>): Player => {
  const player = (gameData.get('players') as Player[]).find(candidate => candidate.playerID === 0);
  if (!player) throw new Error('Player 0 not found in save data');
  return player;
};

const parameterSpecs: Record<string, ParameterTestSpec> = {
  pendant_chip: {
    description: 'pendant chip contribution controlling slot doubling',
    extractionKey: 'equipment_chip_pend',
    domainExtractor: gameData => getPlayer0(gameData).getChipBonus('pend'),
  },
  upper_keychain_chip: {
    description: 'upper keychain chip contribution controlling slot doubling',
    extractionKey: 'equipment_chip_key1',
    domainExtractor: gameData => getPlayer0(gameData).getChipBonus('key1'),
  },
  trophy_chip: {
    description: 'trophy chip contribution controlling slot doubling',
    extractionKey: 'equipment_chip_troph',
    domainExtractor: gameData => getPlayer0(gameData).getChipBonus('troph'),
  },
  equipment_research: {
    description: 'Research bonus multiplying the final equipment slot',
    extractionKey: 'equipment_research_172',
    domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(172),
  },
  gallery_trophy_skill_efficiency: {
    description: 'Gallery trophy Skill Efficiency contribution',
    extractionKey: 'gallery_trophy_skill_efficiency',
    domainExtractor: gameData => (gameData.get('gallery') as Gallery).getTrophyBonus('% SKILL EFFICIENCY', getPlayer0(gameData)),
  },
  gallery_nametag_drop_rate: {
    description: 'Gallery nametag Drop Rate contribution',
    extractionKey: 'gallery_nametag_drop_rate',
    domainExtractor: gameData => (gameData.get('gallery') as Gallery).getNametagBonus('% DROP RATE', getPlayer0(gameData)),
  },
  hat_rack_skill_efficiency: {
    description: 'Hat Rack Skill Efficiency contribution',
    extractionKey: 'hat_rack_skill_efficiency',
    domainExtractor: gameData => (gameData.get('hatRack') as HatRack).getBonus('% SKILL EFFICIENCY', getPlayer0(gameData)),
  },
  player_obol_drop_rate: {
    description: 'player 0 personal and family obol Drop Rate',
    extractionKey: 'player_obol_drop_rate',
    // Read the existing calculated total, not the individual obols or save rows.
    domainExtractor: gameData => getPlayer0(gameData).obolStats.flatMap(group => group.stats)
      .filter(stat => stat.extra === '% Drop Rate').reduce((total, stat) => total + stat.getValue(), 0),
  },
  player_obol_total_damage: {
    description: 'player 0 personal and family obol Total Damage',
    extractionKey: 'player_obol_total_damage',
    domainExtractor: gameData => getPlayer0(gameData).obolStats.flatMap(group => group.stats)
      .filter(stat => stat.extra === '% Total Damage').reduce((total, stat) => total + stat.getValue(), 0),
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
