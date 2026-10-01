import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Votes } from '../../../data/domain/world-2/votes';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { Hole } from '../../../data/domain/world-5/hole/hole';
import { Alchemy } from '../../../data/domain/alchemy';
import { Arcade } from '../../../data/domain/arcade';
import { Emperor } from '../../../data/domain/emperor';
import { Tesseract } from '../../../data/domain/tesseract';
import { Tome } from '../../../data/domain/tome';
import { ResearchGrid } from '../../../data/domain/world-7/research';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'latest';
const extractionResultsName = 'equinox-rate-data.json';


const equinoxRateParameterSpecs: Record<string, ParameterTestSpec> = {
  research_grid_bonus_86: {
    description: 'Equinox Nightmares Research Grid bonus that boosts bar fill rate',
    extractionKey: 'research_grid_bonus_86',
    domainExtractor: (gameData) => {
      const researchGrid = gameData.get("research") as ResearchGrid;
      return researchGrid.getBonusForId(86);
    }
  },
  voting_bonus_32: {
    description: 'Voting bonus that boosts Equinox Bar Fill Rate',
    extractionKey: 'voting_bonus_32',
    domainExtractor: (gameData) => {
      const votes = gameData.get("votes") as Votes;
      return votes.getCurrentBonus(32);
    }
  },
  lore_epic_bonus_8: {
    description: 'Tome Lore Epic 8 multiplier to Equinox bar rate',
    extractionKey: 'lore_epic_bonus_8',
    domainExtractor: (gameData) => {
      const tome = gameData.get("tome") as Tome;
      return tome.getEpilogueBonus(8);
    }
  },
  companion_15_bonus: {
    description: 'Companion 15 bonus: 3.5x faster Equinox Bar Fill Rate',
    extractionKey: 'companion_15_bonus',
    domainExtractor: (gameData) => {
      const companions = gameData.get("companions") as Companion[];
      return getCompanionActiveBonus(companions, 15);
    }
  },
  cosmo_bonus_2_5: {
    description: 'Equinox Maxim Cosmo upgrade multiplier to bar fill rate',
    extractionKey: 'cosmo_bonus_2_5',
    domainExtractor: (gameData) => {
      const hole = gameData.get("hole") as Hole;
      return hole.majiks.IdleonUpgrades.find(upgrade => upgrade.index == 26)?.getBonus() ?? 0;
    }
  },
  alch_vials_eq_bar_bonus: {
    description: 'Marble Mocha vial bonus to Equinox bar fill rate',
    extractionKey: 'alch_vials_eq_bar_bonus',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getVialBonusForKey("EqBar");
    }
  },
  arcade_bonus_41: {
    description: 'Arcade Equinox Fill Rate bonus',
    extractionKey: 'arcade_bonus_41',
    domainExtractor: (gameData) => {
      const arcade = gameData.get("arcade") as Arcade;
      return arcade.bonuses.find(bonus => bonus.index == 41)?.getBonus() ?? 0;
    }
  },
  emperor_bonus_5: {
    description: 'Emperor bonus to Equinox Bar Fill Rate',
    extractionKey: 'emperor_bonus_5',
    domainExtractor: (gameData) => {
      const emperor = gameData.get("emperor") as Emperor;
      return emperor.emperorBonuses.find(bonus => bonus.index == 5)?.getBonus() ?? 0;
    }
  },
  tesseract_bonus_37: {
    description: 'Eternal Stream Tesseract multiplier to Equinox Bar Fill Rate',
    extractionKey: 'tesseract_bonus_37',
    domainExtractor: (gameData) => {
      const tesseract = gameData.get("tesseract") as Tesseract;
      return tesseract.getUpgradeBonus(37) ?? 0;
    }
  },
  royal_armory_bonus_76: {
    description: 'Farmer Joe Royal Armory bonus to Equinox bar fill rate',
    extractionKey: 'royal_armory_bonus_76',
    domainExtractor: (gameData) => {
      const royalArmory = gameData.get("royalArmory") as RoyalArmory;
      return royalArmory.getUpgradeBonus(76);
    }
  }
};

describe('Equinox bar fill-rate input parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(equinoxRateParameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
