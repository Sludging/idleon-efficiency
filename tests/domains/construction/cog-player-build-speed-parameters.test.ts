import type { Player } from '../../../data/domain/player';
import type { Guild } from '../../../data/domain/guild';
import type { Stamp } from '../../../data/domain/world-1/stamps';
import { CauldronIndex, type Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Votes } from '../../../data/domain/world-2/votes';
import type { Bubba } from '../../../data/domain/world-3/bubba';
import type { AtomCollider } from '../../../data/domain/world-3/construction/atomCollider';
import type { Rift } from '../../../data/domain/world-4/rift';
import { ConstructionMastery } from '../../../data/domain/world-4/rift';
import type { Summoning } from '../../../data/domain/world-6/summoning';
import type { Gaming } from '../../../data/domain/world-5/gaming';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ParameterTestSpec } from '../../utils/parameter-test-config';
import { getTargetPlayer } from '../../utils/target-player';

const saveName = 'latest';
const extractionResultsName = 'construction-cog-player-build-speed-parameters-data.json';
let activePlayerId: number;

const parameterSpecs: Record<string, ParameterTestSpec> = {
  construction_bubble_12: {
    description: 'Power cauldron bubble 12 bonus used with active context character 3',
    extractionKey: 'player_build_speed_bubble_12',
    domainExtractor: data => (data.get('alchemy') as Alchemy).getBonusForPlayer((data.get('players') as Player[])[3], CauldronIndex.Power, 12),
  },
  build_prod_stamp: {
    description: 'BuildProd stamp construction-speed bonus',
    extractionKey: 'player_build_speed_build_prod_stamp',
    domainExtractor: data => (data.get('stamps') as Stamp[][]).flatMap(tab => tab).find(stamp => stamp.raw_name === 'BuildProd')?.getBonus() ?? 0,
  },
  guild_bonus_5: {
    description: 'guild bonus 5 construction-speed contribution',
    extractionKey: 'player_build_speed_guild_bonus_5',
    domainExtractor: data => (data.get('guild') as Guild).guildBonuses.find(bonus => bonus.index === 5)?.getBonus() ?? 0,
  },
  context_gear_build_speed: {
    description: 'active context character gear Build Speed bonus',
    extractionKey: 'player_build_speed_gear_build_speed',
    domainExtractor: data => getTargetPlayer(data.get('players') as Player[], activePlayerId).gear.getBonus(EquipmentBonus.BuildSpeed),
  },
  construction_mastery_4: {
    description: 'Construction Mastery build-speed bonus at public index 4',
    extractionKey: 'player_build_speed_construction_mastery_4',
    domainExtractor: data => ((data.get('rift') as Rift).bonuses.find(bonus => bonus.name === 'Construct Mastery') as ConstructionMastery).getBonusByIndex(4),
  },
  shinyfin_stew_vial: {
    description: 'Shinyfin Stew construction-speed vial bonus',
    extractionKey: 'player_build_speed_shinyfin_vial',
    domainExtractor: data => (data.get('alchemy') as Alchemy).vials.find(vial => vial.name === 'Shinyfin Stew')?.getBonus() ?? 0,
  },
  turtle_tisane_vial: {
    description: 'Turtle Tisane construction-speed vial bonus',
    extractionKey: 'player_build_speed_turtle_vial',
    domainExtractor: data => (data.get('alchemy') as Alchemy).vials.find(vial => vial.name === 'Turtle Tisane')?.getBonus() ?? 0,
  },
  arcade_bonus_44: {
    description: 'Arcade bonus 44 construction-speed contribution',
    extractionKey: 'player_build_speed_arcade_44',
    domainExtractor: data => (data.get('arcade') as Arcade).bonuses.find(bonus => bonus.index === 44)?.getBonus() ?? 0,
  },
  voting_bonus_18: {
    description: 'current voting bonus 18 construction-speed contribution',
    extractionKey: 'player_build_speed_voting_18',
    domainExtractor: data => (data.get('votes') as Votes).getCurrentBonus(18),
  },
  bubba_global_bonus_1: {
    description: 'Bubba global bonus 1 construction-speed contribution',
    extractionKey: 'player_build_speed_bubba_1',
    domainExtractor: data => (data.get('bubba') as Bubba).getGlobalBonus(1),
  },
  upgrade_vault_48: {
    description: 'Upgrade Vault 48 bonus before native Sheepie kill scaling',
    extractionKey: 'player_build_speed_vault_48',
    domainExtractor: data => (data.get('upgradeVault') as UpgradeVault).getBonusForId(48),
  },
  summoning_winner_13: {
    description: 'Summoning winner bonus 13 construction-speed contribution',
    extractionKey: 'player_build_speed_winner_13',
    domainExtractor: data => (data.get('summoning') as Summoning).summonBonuses.find(bonus => bonus.index === 13)?.getBonus() ?? 0,
  },
  gaming_palette_25: {
    description: 'Gaming palette 25 construction-speed contribution',
    extractionKey: 'player_build_speed_palette_25',
    domainExtractor: data => (data.get('gaming') as Gaming).getPaletteBonus(25),
  },
  atom_bonus_1: {
    description: 'Atom Collider bonus 1 construction-speed contribution',
    extractionKey: 'player_build_speed_atom_1',
    domainExtractor: data => (data.get('collider') as AtomCollider).atoms.find(atom => atom.index === 1)?.getBonus() ?? 0,
  },
  target_talent_131: {
    description: 'target character 3 talent 131 calculated bonus',
    extractionKey: 'player_build_speed_talent_131',
    domainExtractor: data => ((data.get('players') as Player[])[3]).talents.find(talent => talent.skillIndex === 131)?.getBonus() ?? 0,
  },
};

describe('Construction cog player build speed parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    activePlayerId = getExtractedValue(extractionResults, 'player_build_speed_active_player');
    if (!Number.isInteger(activePlayerId) || activePlayerId < 0) throw new Error('Invalid active character in Construction gear capture');
    gameData = loadGameDataFromSave(saveName);
  });

  Object.values(parameterSpecs).forEach(spec => {
    it(`matches ${spec.description}`, () => {
      const expected = getExtractedValue(extractionResults, spec.extractionKey);
      expect(spec.domainExtractor(gameData)).toMatchLiveGame(expected, 0);
    });
  });
});
