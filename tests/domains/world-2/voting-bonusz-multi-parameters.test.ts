import { Hole } from '../../../data/domain/world-5/hole/hole';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { Summoning } from '../../../data/domain/world-6/summoning';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { Meritocraty } from '../../../data/domain/world-7/meritocraty';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const saveName = 'latest';
const extractionResultsName = 'voting-bonusz-multi-data.json';

const calculatedDependencySpecs: Record<string, ParameterTestSpec> = {
  meritocracy_bonus_9: {
    description: 'Meritocracy bonus 9 used as a separate vote multiplier factor',
    extractionKey: 'meritocracy_bonus_9',
    domainExtractor: (gameData) => (gameData.get('meritocraty') as Meritocraty).getCurrentBonus(9),
  },
  hole_cosmo_bonus_2_3: {
    description: 'Hole Cosmo quantity bonus at game coordinates 2,3 (upgrade 24)',
    extractionKey: 'hole_cosmo_bonus_2_3',
    domainExtractor: (gameData) => {
      const hole = gameData.get('hole') as Hole;
      // Game coordinates (CosmoBonusQTY 2,3) resolve to website Hole upgrade 24.
      return hole.majiks.IdleonUpgrades.find(upgrade => upgrade.index === 24)?.getBonus() ?? 0;
    },
  },
  summoning_win_bonus_22: {
    description: 'Summoning Win bonus 22 added to Votes',
    extractionKey: 'summoning_win_bonus_22',
    domainExtractor: (gameData) => {
      const summoning = gameData.get('summoning') as Summoning;
      return summoning.summonBonuses.find(bonus => bonus.index === 22)?.getBonus() ?? 0;
    },
  },
  gaming_palette_bonus_32: {
    description: 'Gaming Palette bonus 32 added to Votes',
    extractionKey: 'gaming_palette_bonus_32',
    domainExtractor: (gameData) => (gameData.get('gaming') as Gaming).getPaletteBonus(32),
  },
  legend_talent_bonus_22: {
    description: 'Legend Talent bonus 22 added to Votes',
    extractionKey: 'legend_talent_bonus_22',
    domainExtractor: (gameData) => (gameData.get('legendTalents') as LegendTalents).getBonusFromIndex(22),
  },
  sushi_rog_bonus_50: {
    description: 'Sushi unlock bonus 50, gated until more than 50 Sushi are unlocked',
    extractionKey: 'sushi_rog_bonus_50',
    domainExtractor: (gameData) => {
      const sushi = gameData.get('sushi') as SushiStation;
      // The game's RoG_BonusQTY(50, 0) applies only after the unique-Sushi count exceeds 50.
      return sushi.getUniqueSushi() > 50 ? sushi.getBonusFromIndex(50) : 0;
    },
  },
};


describe('Votes calculated input parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(calculatedDependencySpecs).forEach(([, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });

});
