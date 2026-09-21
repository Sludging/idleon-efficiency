/**
 * Representative Gallery contributions from the paired target-player save.
 * These samples do not establish empty collections, podium transitions,
 * nametag stack caps, or different characters' chip effects.
 */
import { Player } from '../../../data/domain/player';
import { Gallery } from '../../../data/domain/world-7/gallery';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

const samples = [
  { key: 'gallery_trophy_skill_efficiency', description: 'collected trophy Skill Efficiency', method: 'getTrophyBonus' as const, effect: '% SKILL EFFICIENCY' },
  { key: 'gallery_trophy_agility_percent', description: 'trophy Agility at the artifact-expanded improved-podium boundary', method: 'getTrophyBonus' as const, effect: '% AGI' },
  { key: 'gallery_nametag_drop_rate', description: 'collected nametag Drop Rate', method: 'getNametagBonus' as const, effect: '% DROP RATE' },
  { key: 'gallery_nametag_skill_efficiency', description: 'absent nametag Skill Efficiency effect', method: 'getNametagBonus' as const, effect: '% SKILL EFFICIENCY' },
];

describe('Gallery Domain - Equipment Contributions', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;
  let player: Player;

  beforeAll(() => {
    extractionResults = loadExtractionResults('player-equipment-bonuses-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  samples.forEach(sample => {
    it(`matches ${sample.description}`, () => {
      const results = sample.key === 'gallery_trophy_skill_efficiency' || sample.key === 'gallery_nametag_drop_rate'
        ? extractionResults
        : loadExtractionResults('gallery-equipment-contributions-data.json');
      validateExtractionHealth(results);
      const liveValue = getExtractedValue(results, sample.key);
      const gallery = gameData.get('gallery') as Gallery;
      const domainValue = gallery[sample.method](sample.effect, player);
      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Target player Gallery ${sample.description}`,
      });
    });
  });
});
