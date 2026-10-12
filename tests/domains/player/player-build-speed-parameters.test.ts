import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Player } from '../../../data/domain/player';
import type { Achievement } from '../../../data/domain/achievements';
import type { Deathnote } from '../../../data/domain/world-3/construction/deathnote';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import { getTargetPlayer, TARGET_PLAYER_INDEX } from '../../utils/target-player';
import type { Guild } from '../../../data/domain/guild';
import type { Rift } from '../../../data/domain/world-4/rift';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Votes } from '../../../data/domain/world-2/votes';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';
import type { Bubba } from '../../../data/domain/world-3/bubba';
import type { AtomCollider } from '../../../data/domain/world-3/construction/atomCollider';
import type { Summoning } from '../../../data/domain/world-6/summoning';
import type { Gaming } from '../../../data/domain/world-5/gaming';
import { lavaLog } from '../../../data/utility';

const saveName = 'latest';
const extractionResultsName = 'player-build-speed-data.json';

const parameterSpecs = {
  stamps_bonus_build_prod: {
    description: 'BuildProd stamp contribution to construction build speed',
    extractionKey: 'stamps_bonus_build_prod',
    domainExtractor: (gameData: Map<string, any>) => {
      const stamps = gameData.get("stamps") as Stamp[][];
      return stamps.flatMap(stamp => stamp).find(stamp => stamp.raw_name == "BuildProd")?.getBonus() || 0;
    }
  },
  guild_bonus_5: {
    description: 'Make or Break guild bonus to production in town skills',
    extractionKey: 'guild_bonus_5',
    domainExtractor: (gameData: Map<string, any>) => {
      const guild = gameData.get("guild") as Guild;
      return guild.guildBonuses.find(bonus => bonus.index == 5)?.getBonus() || 0;
    }
  },
  achievement_153: {
    description: 'Achievement 153 build-speed contribution (5 when completed, otherwise 0)',
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
    description: 'Arcade construction build rate bonus',
    extractionKey: 'arcade_bonus_44',
    domainExtractor: (gameData: Map<string, any>) => {
      const arcade = gameData.get("arcade") as Arcade;
      return arcade.bonuses.find(bonus => bonus.index == 44)?.getBonus() || 0;
    }
  },
  voting_bonus_18: {
    description: 'Construction Build Rate and Construction EXP voting bonus',
    extractionKey: 'voting_bonus_18',
    domainExtractor: (gameData: Map<string, any>) => {
      const votes = gameData.get("votes") as Votes;
      return votes.getCurrentBonus(18);
    }
  },
  vault_upgrade_48: {
    description: 'Buildie Sheepie upgrade build-speed bonus',
    extractionKey: 'vault_upgrade_48',
    domainExtractor: (gameData: Map<string, any>) => {
      const upgradeVault = gameData.get("upgradeVault") as UpgradeVault;
      return upgradeVault.getBonusForId(48);
    }
  },
  sheepies_killed: {
    description: 'Log-scaled total Sheepie kills used by the Buildie Sheepie upgrade',
    extractionKey: 'sheepies_killed',
    domainExtractor: (gameData: Map<string, any>) => {
      const deathnote = gameData.get("deathnote") as Deathnote;
      const totalSheepie = deathnote.mobKillCount.get("sheep")?.reduce((sum, killCount) => sum += Math.round(killCount), 0) ?? 0;
      return Math.floor(lavaLog(totalSheepie));
    }
  },
  bubba_bonus_1: {
    description: 'Bubba Rizz global cost reduction contribution',
    extractionKey: 'bubba_bonus_1',
    domainExtractor: (gameData: Map<string, any>) => {
      const bubba = gameData.get("bubba") as Bubba;
      return bubba.getGlobalBonus(1);
    }
  },
  atom_collider_1: {
    description: 'Helium Talent Power Stacker Atom Collider bonus',
    extractionKey: 'atom_collider_1',
    domainExtractor: (gameData: Map<string, any>) => {
      const atomCollider = gameData.get("collider") as AtomCollider;
      return atomCollider.atoms.find(atom => atom.index == 1)?.getBonus() || 0;
    }
  },
  winner_bonus_13: {
    description: 'Summoning construction-speed winner bonus',
    extractionKey: 'winner_bonus_13',
    domainExtractor: (gameData: Map<string, any>) => {
      const summoning = gameData.get("summoning") as Summoning;
      return summoning.summonBonuses.find(bonus => bonus.index == 13)?.getBonus() || 0;
    }
  },
  palette_bonus_25: {
    description: 'Peachy Pink palette Construction Build Rate bonus',
    extractionKey: 'palette_bonus_25',
    domainExtractor: (gameData: Map<string, any>) => {
      const gaming = gameData.get("gaming") as Gaming;
      return gaming.getPaletteBonus(25);
    }
  },
  gear_bonus_etc_bonuses_30: {
    description: `Player ${TARGET_PLAYER_INDEX} equipment Build Speed`,
    extractionKey: 'gear_bonus_etc_bonuses_30',
    domainExtractor: (gameData: Map<string, any>) => {
      const players = gameData.get("players") as Player[];
      return getTargetPlayer(players).getEquipmentBonus(EquipmentBonus.BuildSpeed);
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
