import type { CrystalSteakArtifact, FunHippoeteArtifact } from '../../../data/domain/world-5/sailing/artifacts';
import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Gaming } from '../../../data/domain/world-5/gaming';
import type { Summoning } from '../../../data/domain/world-6/summoning';
import type { Friends } from '../../../data/domain/friends';
import type { Sneaking } from '../../../data/domain/world-6/sneaking';
import type { Farming } from '../../../data/domain/world-6/farming';
import type { Cooking } from '../../../data/domain/world-4/cooking';
import type { Divinity } from '../../../data/domain/world-5/divinity';
import type { Prayer } from '../../../data/domain/world-3/prayers';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import type { Player } from '../../../data/domain/player';
import type { Sigils } from '../../../data/domain/world-2/alchemy/sigils';
import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Meritocraty } from '../../../data/domain/world-7/meritocraty';
import type { Votes } from '../../../data/domain/world-2/votes';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import extractionConfig from '../../configs/player-damage-parameters.json';

const extractionResultsName = 'player-damage-parameters-data.json';
const saveName = 'latest';

describe('Player maximum damage - component D parameters', () => {
  let gameData: Map<string, any>;
  let extractionResults: ExtractionResults;
  let player: Player;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    player = getTargetPlayer(gameData.get('players') as Player[], extractionConfig.requiredActivePlayerIndex);
  });

  it.each([
    ['player_damage_etc_bonus_72', EquipmentBonus.DamageMulti],
    ['player_damage_etc_bonus_75', EquipmentBonus.DamageBonus],
    ['player_damage_etc_bonus_104', EquipmentBonus.BiggerDamage],
  ] as const)('matches native ETC bonus %s', (extractionKey, equipmentBonus) => {
    const liveValue = getExtractedValue(extractionResults, extractionKey);
    expect(player.gear.getBonus(equipmentBonus)).toMatchLiveGame(liveValue, 0);
  });

  it('matches native VotingBonusz(1)', () => {
    const votes = gameData.get('votes') as Votes;
    const liveValue = getExtractedValue(extractionResults, 'player_damage_voting_bonus_1');
    expect(votes.getCurrentBonus(1)).toMatchLiveGame(liveValue, 0);
  });

  it.each([
    [6, 'player_damage_prayer_curse_6'],
    [13, 'player_damage_prayer_curse_13'],
  ] as const)('matches native CURSE value for prayer %s', (index, extractionKey) => {
    const prayers = gameData.get('prayers') as Prayer[];
    expect(prayers.find(prayer => prayer.index === index)!.getCurseForPlayer(player))
      .toMatchLiveGame(getExtractedValue(extractionResults, extractionKey), 0);
  });

  it('matches the native benefit value for prayer 15', () => {
    const prayers = gameData.get('prayers') as Prayer[];
    expect(prayers.find(prayer => prayer.index === 15)!.getBonusForPlayer(player))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_prayer_benefit_15'), 0);
  });
  it.each([7, 8])('matches native Divinity blessing %s', bonusIndex => {
    const divinity = gameData.get('divinity') as Divinity;
    expect(divinity.gods.find(god => god.index === bonusIndex)!.getBlessingBonus(player))
      .toMatchLiveGame(getExtractedValue(extractionResults, `player_damage_divinity_blessing_${bonusIndex}`), 0);
  });

  it('matches the native damage chip bonus', () => {
    expect(player.getChipBonus('dmg'))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_chip_bonus_dmg'), 0);
  });

  it('matches the native total damage meal bonus', () => {
    const cooking = gameData.get('cooking') as Cooking;
    expect(cooking.getMealBonusForKey('TotDmg'))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_meal_total_damage'), 0);
  });

  it('matches native CardSetBonuses(0, "5")', () => {
    expect(player.cardInfo!.getBonusForId(5))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_card_set_5'), 0);
  });

  it.each([108, 124])('matches native GetBuffBonuses(%s, 2)', skillIndex => {
    const expected = getExtractedValue(extractionResults, `player_damage_buff_${skillIndex}_mode_2`);
    expect(player.activeBuffs.find(buff => buff.skillIndex === skillIndex)?.getBonus() ?? 0)
      .toMatchLiveGame(expected, 0);
  });


  it('matches native pristine charm 0 damage factor', () => {
    const sneaking = gameData.get('sneaking') as Sneaking;
    const charm = sneaking.pristineCharms.find(charm => charm.data.itemId === 0)!;
    const actualFactor = charm.unlocked ? charm.getBonus() : 1;
    const nativeFactor = 1 + getExtractedValue(extractionResults, 'player_damage_pristine_charm_0') / 100;
    expect(actualFactor).toMatchLiveGame(nativeFactor, 0);
  });

  it('matches the native damage Friend Bonus', () => {
    const friends = gameData.get('friends') as Friends;
    expect(friends.getFriendBonus(0))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_friend_bonus_0'), 0);
  });

  it('matches the native prepared Total Damage star-sign bonus', () => {
    const actual = player.starSigns.reduce((sum, sign) => sum + sign.getBonus('Total Damage'), 0);
    expect(actual).toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_star_sign_total_damage'), 0);
  });

  it('matches the native god-rank multiplier input', () => {
    const divinity = gameData.get('divinity') as Divinity;
    expect(Math.max(0, divinity.godRank))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_divinity_god_rank'), 0);
  });



  it('matches the native 7dmg vial bonus', () => {
    const alchemy = gameData.get('alchemy') as Alchemy;
    expect(alchemy.getVialBonusForKey('7dmg'))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_vial_7dmg'), 0);
  });

  it('matches native PaletteBonus(34)', () => {
    const gaming = gameData.get('gaming') as Gaming;
    expect(gaming.getPaletteBonus(34))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_palette_34'), 0);
  });

  it('matches native SummUpgBonus(79)', () => {
    const summoning = gameData.get('summoning') as Summoning;
    expect(summoning.getUpgradeBonusFromIndex(79))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_summoning_upgrade_79'), 0);
  });

  it('matches native effective Crystal Steak artifact damage bonus', () => {
    const sailing = gameData.get('sailing') as Sailing;
    const artifact = sailing.artifacts.find(candidate => candidate.index === 25)! as CrystalSteakArtifact;
    expect(artifact.getBonusForPlayer(player))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_artifact_25_effective'), 0);
  });

  it('matches native ExoticBonusQTY(41)', () => {
    const farming = gameData.get('farming') as Farming;
    expect(farming.getExoticMarketBonusValue(41))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_exotic_market_41'), 0);
  });

  it('matches native contextual Fun Hippoete artifact damage bonus', () => {
    const sailing = gameData.get('sailing') as Sailing;
    const artifact = sailing.artifacts[8] as FunHippoeteArtifact;
    expect(artifact.getBonusForPlayer(player, gameData))
      .toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_artifact_8_contextual'), 0);
  });

  describe('existing maximum damage component B parameters', () => {
    it('matches native SigilBonus(Blank, 4) with sigil and Meritocracy bonuses', () => {
      const sigils = gameData.get('sigils') as Sigils;
      const meritocracy = gameData.get('meritocraty') as Meritocraty;
      const expected = getExtractedValue(extractionResults, 'player_maximum_damage_sigil_lab_bonus');
      expect(sigils.sigils[4].getBonus() * (1 + meritocracy.getCurrentBonus(21) / 100)).toMatchLiveGame(expected, 0);
    });

    it('matches native CosmoBonusQTY(2, 4) with Hole upgrade bonus', () => {
      const hole = gameData.get('hole') as Hole;
      const expected = getExtractedValue(extractionResults, 'player_maximum_damage_cosmo_bonus_2_4');
      expect(hole.majiks.IdleonUpgrades[4].getBonus()).toMatchLiveGame(expected, 0);
    });

    it('matches native BoxRewards.basedmg with player post-office bonus', () => {
      const expected = getExtractedValue(extractionResults, 'player_maximum_damage_box_reward_base_damage');
      expect(player.getPostOfficeBonus('basedmg')).toMatchLiveGame(expected, 0);
    });
  });
});
