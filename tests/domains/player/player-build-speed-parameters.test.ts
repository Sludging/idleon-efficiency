import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Player } from '../../../data/domain/player';
import type { Stamp } from '../../../data/domain/world-1/stamps';
import type { Guild } from '../../../data/domain/guild';
import type { Achievement } from '../../../data/domain/achievements';
import type { Rift } from '../../../data/domain/world-4/rift';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Votes } from '../../../data/domain/world-2/votes';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';
import type { Deathnote } from '../../../data/domain/world-3/construction/deathnote';
import type { Bubba } from '../../../data/domain/world-3/bubba';
import type { AtomCollider } from '../../../data/domain/world-3/construction/atomCollider';
import type { Storage } from '../../../data/domain/storage';
import type { Summoning } from '../../../data/domain/world-6/summoning';
import { lavaLog } from '../../../data/utility';

const saveName = 'latest';
const extractionResultsName = 'player-build-speed-data.json';

const parameterSpecs = {
  stamps_bonus_build_prod: {
    description: 'Stamps bonus for Build Prod',
    extractionKey: 'stamps_bonus_build_prod',
    domainExtractor: (gameData: Map<string, any>) => {
      const stamps = gameData.get("stamps") as Stamp[][];
      return stamps.flatMap(stamp => stamp).find(stamp => stamp.raw_name == "BuildProd")?.getBonus() || 0;
    }
  },
  guild_bonus_5: {
    description: 'Guild bonus 5',
    extractionKey: 'guild_bonus_5',
    domainExtractor: (gameData: Map<string, any>) => {
      const guild = gameData.get("guild") as Guild;
      return guild.guildBonuses.find(bonus => bonus.index == 5)?.getBonus() || 0;
    }
  },
  achievement_153: {
    description: 'Achievement 153 (5 if completed, 0 otherwise)',
    extractionKey: 'achievement_153',
    domainExtractor: (gameData: Map<string, any>) => {
      const achievements = gameData.get("achievements") as Achievement[];
      return achievements[153].completed ? 5 : 0;
    }
  },
  construction_mastery_bonus: {
    description: 'Construction mastery bonus from Rift',
    extractionKey: 'construction_mastery_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const rift = gameData.get("rift") as Rift;
      const skillMastery = rift.bonuses.find(bonus => bonus.name == "Construct Mastery") as any;
      return skillMastery.getBonusByIndex(4);
    }
  },
  vial_equinox_fish_bonus: {
    description: 'Vial bonus - Shinyfin Stew',
    extractionKey: 'vial_equinox_fish_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.vials.find(vial => vial.name == "Shinyfin Stew")?.getBonus() || 0;
    }
  },
  vial_turtle_bonus: {
    description: 'Vial bonus - Turtle Tisane',
    extractionKey: 'vial_turtle_bonus',
    domainExtractor: (gameData: Map<string, any>) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.vials.find(vial => vial.name == "Turtle Tisane")?.getBonus() || 0;
    }
  },
  arcade_bonus_44: {
    description: 'Arcade bonus 44',
    extractionKey: 'arcade_bonus_44',
    domainExtractor: (gameData: Map<string, any>) => {
      const arcade = gameData.get("arcade") as Arcade;
      return arcade.bonuses.find(bonus => bonus.index == 44)?.getBonus() || 0;
    }
  },
  voting_bonus_18: {
    description: 'Voting bonus 18',
    extractionKey: 'voting_bonus_18',
    domainExtractor: (gameData: Map<string, any>) => {
      const votes = gameData.get("votes") as Votes;
      return votes.getCurrentBonus(18);
    }
  },
  vault_upgrade_48: {
    description: 'Vault upgrade 48',
    extractionKey: 'vault_upgrade_48',
    domainExtractor: (gameData: Map<string, any>) => {
      const upgradeVault = gameData.get("upgradeVault") as UpgradeVault;
      return upgradeVault.getBonusForId(48);
    }
  },
  sheepies_killed: {
    description: 'Total sheepies killed',
    extractionKey: 'sheepies_killed',
    domainExtractor: (gameData: Map<string, any>) => {
      const deathnote = gameData.get("deathnote") as Deathnote;
      const totalSheepie = deathnote.mobKillCount.get("sheep")?.reduce((sum, killCount) => sum += Math.round(killCount), 0) ?? 0;
      return Math.floor(lavaLog(totalSheepie));
    }
  },
  bubba_bonus_1: {
    description: 'Bubba global bonus 1',
    extractionKey: 'bubba_bonus_1',
    domainExtractor: (gameData: Map<string, any>) => {
      const bubba = gameData.get("bubba") as Bubba;
      return bubba.getGlobalBonus(1);
    }
  },
  atom_collider_1: {
    description: 'Atom collider atom 1 bonus',
    extractionKey: 'atom_collider_1',
    domainExtractor: (gameData: Map<string, any>) => {
      const atomCollider = gameData.get("collider") as AtomCollider;
      return atomCollider.atoms.find(atom => atom.index == 1)?.getBonus() || 0;
    }
  },
  redox_salts_in_storage: {
    description: 'Redox salts in storage',
    extractionKey: 'redox_salts_in_storage',
    domainExtractor: (gameData: Map<string, any>) => {
      const storage = gameData.get("storage") as Storage;
      return storage.amountInStorage("Refinery1");
    }
  },
  winner_bonus_13: {
    description: 'Summoning winner bonus 13',
    extractionKey: 'winner_bonus_13',
    domainExtractor: (gameData: Map<string, any>) => {
      const summoning = gameData.get("summoning") as Summoning;
      return summoning.summonBonuses.find(bonus => bonus.index == 13)?.getBonus() || 0;
    }
  },
  palette_bonus_25: {
    description: 'Gaming palette bonus 25',
    extractionKey: 'palette_bonus_25',
    domainExtractor: (_gameData: Map<string, any>) => {
      // TODO: This feature is not yet implemented in the domain
      // Game function: GamingStatType("PaletteBonus", 25, 0)
      // Currently hardcoded as 17 in the domain (line 1472)
      // This test will fail until gaming palette is properly implemented
      throw new Error("palette_bonus_25: NOT IMPLEMENTED - GamingStatType('PaletteBonus', 25, 0) not yet implemented in gaming domain");
    }
  },
  gear_bonus_etc_bonuses_30: {
    description: 'Gear bonus from EtcBonuses 30 (tested for player 0)',
    extractionKey: 'gear_bonus_etc_bonuses_30',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      return players[0].getMiscBonusFromGear("Build Spd");
    }
  },
};

describe('Player Domain - Build Speed - Parameters', () => {
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
