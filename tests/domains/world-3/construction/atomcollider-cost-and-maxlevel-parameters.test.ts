import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../../utils/cloudsave-loader';
import { AtomCollider } from '../../../../data/domain/world-3/construction/atomCollider';
import { Compass } from '../../../../data/domain/compass';
import { EventShop } from '../../../../data/domain/eventShop';
import { getStampBonusForKey, Stamp } from '../../../../data/domain/world-1/stamps';
import { Grimoire } from '../../../../data/domain/grimoire';
import { Alchemy } from '../../../../data/domain/world-2/alchemy/alchemy';
import { Construction } from '../../../../data/domain/world-3/construction/construction';
import { TaskBoard } from '../../../../data/domain/tasks';
import { Bubba } from '../../../../data/domain/world-3/bubba';
import { Gaming } from '../../../../data/domain/world-5/gaming';

const saveName = 'latest';
const extractionResultsName = 'atomcollider-cost-and-maxlevel-data.json';

const parameterSpecs = {
  // Max Level Parameters
  superbit_23_bonus: {
    description: 'Super bit 23 bonus (max level boost)',
    extractionKey: 'superbit_23_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const gaming = gameData.get("gaming") as Gaming;
      return gaming.superbits[23].unlocked ? 1 : 0;
    }
  },

  compass_bonus_53: {
    description: 'Compass bonus 53 (max level boost)',
    extractionKey: 'compass_bonus_53',
    domainExtractor: (gameData: Map<string, any>) => {
      const compass = gameData.get("compass") as Compass;
      return compass.getUpgradeBonus(53);
    }
  },

  event_shop_28_owned: {
    description: 'Event shop 28 owned (max level boost)',
    extractionKey: 'event_shop_28_owned',
    domainExtractor: (gameData: Map<string, any>) => {
      const eventShop = gameData.get("eventShop") as EventShop;
      return eventShop.isBonusOwned(28) ? 1 : 0;
    }
  },

  // Cost Parameters
  palette_bonus_35: {
    description: 'Palette bonus 35 (atom cost reduction)',
    extractionKey: 'palette_bonus_35',
    domainExtractor: (_gameData: Map<string, any>) => {
      // TODO: This feature is not yet implemented in the domain
      // Game function: GamingStatType("PaletteBonus", 35, 0)
      // This test will fail until gaming palette is added to the domain
      throw new Error("palette_bonus_35: NOT IMPLEMENTED - gaming palette feature missing from domain");
    }
  },

  stamp_atom_cost: {
    description: 'Stamp bonus for atom cost reduction',
    extractionKey: 'stamp_atom_cost',
    domainExtractor: (gameData: Map<string, any>) => {
      const stamps = gameData.get("stamps") as Stamp[][];
      return getStampBonusForKey(stamps, "AtomCost");
    }
  },

  atom_bonus_9: {
    description: 'Atom bonus 9 (Neon - cost reduction)',
    extractionKey: 'atom_bonus_9',
    domainExtractor: (gameData: Map<string, any>) => {
      const collider = gameData.get("collider") as AtomCollider;
      return collider.atoms[9].getBonus();
    }
  },

  superbit_21_bonus: {
    description: 'Super bit 21 bonus (cost reduction)',
    extractionKey: 'superbit_21_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const gaming = gameData.get("gaming") as Gaming;
      return gaming.superbits[21].unlocked ? 1 : 0;
    }
  },

  grimoire_bonus_51: {
    description: 'Grimoire upgrade bonus 51 (cost reduction)',
    extractionKey: 'grimoire_bonus_51',
    domainExtractor: (gameData: Map<string, any>) => {
      const grimoire = gameData.get("grimoire") as Grimoire;
      return grimoire.getUpgradeBonus(51);
    }
  },

  compass_bonus_50: {
    description: 'Compass bonus 50 (cost reduction)',
    extractionKey: 'compass_bonus_50',
    domainExtractor: (gameData: Map<string, any>) => {
      const compass = gameData.get("compass") as Compass;
      return compass.getUpgradeBonus(50);
    }
  },

  bubble_y5: {
    description: 'Alchemy bubble Y5 (cost reduction)',
    extractionKey: 'bubble_y5',
    domainExtractor: (gameData: Map<string, any>) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getBubbleBonusForKey("Y5");
    }
  },

  collider_building_level: {
    description: 'Atom Collider building level',
    extractionKey: 'collider_building_level',
    domainExtractor: (gameData: Map<string, any>) => {
      const construction = gameData.get("construction") as Construction;
      return construction.buildings.find(building => building.name === "Atom Collider")?.level ?? 0;
    }
  },

  merit_atom_cost: {
    description: 'Merit level for atom cost reduction',
    extractionKey: 'merit_atom_cost',
    domainExtractor: (gameData: Map<string, any>) => {
      const taskBoard = gameData.get("taskboard") as TaskBoard;
      return taskBoard.merits.find(merit => merit.descLine1.includes("reduction in Atom Upgrade Costs"))?.level ?? 0;
    }
  },

  bubba_bonus_7: {
    description: 'Bubba bonus 7 (cost reduction)',
    extractionKey: 'bubba_bonus_7',
    domainExtractor: (gameData: Map<string, any>) => {
      const bubba = gameData.get("bubba") as Bubba;
      return bubba.getGlobalBonus(7);
    }
  }
};

describe('AtomCollider Domain - Cost and Max Level - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(parameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
