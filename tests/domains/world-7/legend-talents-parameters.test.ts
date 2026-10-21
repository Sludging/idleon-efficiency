import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ParameterTestSpec } from '../../utils/parameter-test-config';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { ZenithMarket } from '../../../data/domain/world-7/zenithShop';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { Sailing } from '../../../data/domain/sailing';
import type { ExtractionResults } from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'legend-talents-data.json';

const legendTalentsParameterSpecs: Record<string, ParameterTestSpec> = {
  companion_37_bonus: {
    description: 'Active bonus from companion 37 used for legend talent points',
    extractionKey: 'companion_37_bonus',
    domainExtractor: (gameData) => {
      const companions = gameData.get("companions") as Companion[];
      return getCompanionActiveBonus(companions, 37);
    }
  },
  sailing_artifact_34_bonus: {
    description: 'Whole calculated bonus from sailing artifact 34 used for legend talent points',
    extractionKey: 'sailing_artifact_34_bonus',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.artifacts.find(artifact => artifact.index == 34)?.getBonus() ?? 0;
    }
  },
  zenith_market_5: {
    description: 'Zenith Market bonus 5 used for super-talent bonus levels',
    extractionKey: 'zenith_market_5',
    domainExtractor: (gameData) => {
      const zenithMarket = gameData.get("zenithMarket") as ZenithMarket;
      return zenithMarket.getBonusForId(5);
    }
  },
  talent_7_bonus: {
    description: 'Legend Talent 7 bonus used for super-talent bonus levels',
    extractionKey: 'talent_7_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(7);
    }
  },
  talent_39_bonus: {
    description: 'Legend Talent 39 bonus used for super-talent unlock status',
    extractionKey: 'talent_39_bonus',
    domainExtractor: (gameData) => {
      const legendTalents = gameData.get("legendTalents") as LegendTalents;
      return legendTalents.getBonusFromIndex(39);
    }
  },
};

describe('Legend Talents Parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(legendTalentsParameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
