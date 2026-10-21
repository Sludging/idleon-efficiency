import { Card } from '../../../data/domain/cards';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { Player } from '../../../data/domain/player';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { KillRoy } from '../../../data/domain/world-2/killroy';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { getTargetPlayer } from '../../utils/target-player';


const parameterSpecs: Record<string, ParameterTestSpec> = {
  trophy_chip: {
    description: 'target player trophy chip contribution to Gallery scaling',
    extractionKey: 'gallery_chip_troph',
    domainExtractor: gameData => getTargetPlayer(gameData.get('players') as Player[]).getChipBonus('troph'),
  },
  killroy: {
    description: 'Killroy bonus 3 before Gallery podium and multiplier caps',
    extractionKey: 'gallery_killroy_3',
    domainExtractor: gameData => (gameData.get('killroy') as KillRoy).podiumsOwnedLv2,
  },
  alchemy: {
    description: 'Codfrey Rulz Ok bubble Gallery Bonus Multi contribution before the cap',
    extractionKey: 'gallery_alchemy_y13',
    domainExtractor: gameData => (gameData.get('alchemy') as Alchemy).getBubbleBonusForKey('Y13'),
  },
  card: {
    description: 'J11 Shimmerfin Deep card level for its Gallery Bonus effect',
    extractionKey: 'gallery_card_w7a11',
    domainExtractor: gameData => {
      const card = (gameData.get('cards') as Card[]).find(card => card.id === 'w7a11');
      if (!card) throw new Error('Missing w7a11 card definition for Gallery dependency RunCodeOfTypeXforThingY("CardLv", "w7a11")');
      // Native progression includes level one for an owned zero-star card.
      return card.count > 0 ? card.getLevels() : 0;
    },
  },
  companion_28: {
    description: 'Worldclass Showcase companion bonus adds a Grade 4 Gallery slot',
    extractionKey: 'gallery_companion_28',
    // The game's companion bonus map chooses the evolved bonus when available.
    domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 28),
  },
  companion_42: {
    description: 'Gallery Showcase companion bonus improves the grade of two showcases',
    extractionKey: 'gallery_companion_42',
    domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 42),
  },
  companion_49: {
    description: 'Bubba companion bonus increases the Gallery Bonus Multi',
    extractionKey: 'gallery_companion_49',
    domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 49),
  },
  sushi: {
    description: 'Sushi contribution to the Gallery Bonus Multi',
    extractionKey: 'gallery_sushi_54',
    domainExtractor: gameData => (gameData.get('sushi') as SushiStation).getBonusFromIndex(54),
  },
  legend: {
    description: 'Superb Gallerium raises the grade of first normal Gallery showcase slots',
    extractionKey: 'gallery_legend_9',
    domainExtractor: gameData => (gameData.get('legendTalents') as LegendTalents).getBonusFromIndex(9),
  },
};

describe('Gallery Domain - Equipment Contributions - Parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('gallery-equipment-contributions-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  Object.values(parameterSpecs).forEach(spec => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
