import { Card } from '../../../data/domain/cards';
import { getCompanionActiveBonus, isCompanionLevelTwo, type Companion } from '../../../data/domain/companions';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import type { Player } from '../../../data/domain/player';
import { getStatCards } from '../../../data/domain/player-stats';
import { Talent } from '../../../data/domain/talents';
import { getStampBonusForKey, type Stamp } from '../../../data/domain/world-1/stamps';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Cooking } from '../../../data/domain/world-4/cooking';
import type { Dungeons } from '../../../data/domain/dungeons';
import { PassiveType } from '../../../data/domain/dungeons';
import type { Friends } from '../../../data/domain/friends';
import type { Farming } from '../../../data/domain/world-6/farming';
import type { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Compass } from '../../../data/domain/compass';
import type { ResearchGrid } from '../../../data/domain/world-7/research';
import type { ZenithMarket } from '../../../data/domain/world-7/zenithShop';
import type { BigFish } from '../../../data/domain/world-7/bigFish';
import type { DancingCoral } from '../../../data/domain/world-7/dancingCoral';
import type { CoralKid } from '../../../data/domain/world-7/coralKid';
import type { Bubba } from '../../../data/domain/world-3/bubba';
import type { SushiStation } from '../../../data/domain/world-7/sushi';
import type { Shrine } from '../../../data/domain/world-3/construction/shrines';
import type { SaltLick } from '../../../data/domain/world-3/construction/saltLick';
import type { Prayer } from '../../../data/domain/world-3/prayers';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import type { Meritocraty } from '../../../data/domain/world-7/meritocraty';
import type { Button } from '../../../data/domain/world-7/button';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

type SourceParameter = { key: string; name: string; getValue: () => number };

describe('Direct class-EXP source calculations', () => {
  let gameData: Map<string, any>;
  let player: Player;
  let players: Player[];
  let nativeValues: Map<string, number>;
  const getDomain = <T,>(key: string): T => gameData.get(key) as T;
  const getNative = (key: string): number => nativeValues.get(key)!;

  const parameters: SourceParameter[] = [
    { key: 'farming_sticker_0', name: 'Sticker bonus 0', getValue: () => getDomain<Farming>('farming').getStickerBonus(0) },
    { key: 'hole_schematic_47', name: 'Hole schematic 47', getValue: () => getDomain<Hole>('hole').getSchematicBonus(47) },
    { key: 'hole_schematic_83', name: 'Hole schematic 83 mode 40', getValue: () => getDomain<Hole>('hole').getSchematicBonus(83, 40) },
    { key: 'hole_fountain_0_16', name: 'Fountain bonus 0 mode 16', getValue: () => getDomain<Hole>('hole').getFountainBonus(0, 16) },
    { key: 'hole_monument_justice_6', name: 'Justice monument bonus 6', getValue: () => getDomain<Hole>('hole').getMonumentBonus('Justice', 6) },
    { key: 'compass_upgrade_51', name: 'Compass upgrade bonus 51', getValue: () => getDomain<Compass>('compass').getUpgradeBonus(51) },
    { key: 'research_130', name: 'Research grid bonus 130', getValue: () => getDomain<ResearchGrid>('research').getBonusForId(130) },
    { key: 'research_131', name: 'Research grid bonus 131', getValue: () => getDomain<ResearchGrid>('research').getBonusForId(131) },
    { key: 'research_132', name: 'Research grid bonus 132', getValue: () => getDomain<ResearchGrid>('research').getBonusForId(132) },
    { key: 'research_152', name: 'Research grid bonus 152', getValue: () => getDomain<ResearchGrid>('research').getBonusForId(152) },
    { key: 'zenith_market_9', name: 'Zenith Market bonus 9', getValue: () => getDomain<ZenithMarket>('zenithMarket').getBonusForId(9) },
    { key: 'big_fish_4', name: 'Big Fish bonus 4', getValue: () => getDomain<BigFish>('bigFish').getBonusFromIndex(4) },
    { key: 'dancing_coral_3', name: 'Dancing Coral bonus 3', getValue: () => getDomain<DancingCoral>('dancingCoral').getBonusFromIndex(3) },
    { key: 'coral_kid_2', name: 'Coral Kid upgrade 2', getValue: () => getDomain<CoralKid>('coralKid').getBonusFromIndex(2) },
    { key: 'bubba_6', name: 'Bubba bonus 6', getValue: () => getDomain<Bubba>('bubba').getGlobalBonus(6) },
    { key: 'sushi_15', name: 'Sushi bonus 15', getValue: () => getDomain<SushiStation>('sushi').getBonusFromIndex(15) },
    { key: 'royal_statue_3', name: 'Royal Armory statue 3', getValue: () => getDomain<RoyalArmory>('royalArmory').statues.find(statue => statue.index === 3)!.getBonus() },
    { key: 'card_bonus_44', name: 'Monster EXP card bonus 44', getValue: () => Card.GetTotalBonusForId(getStatCards(player), 44) },
    { key: 'card_bonus_100', name: 'Class EXP card bonus 100', getValue: () => Card.GetTotalBonusForId(getStatCards(player), 100) },
    { key: 'card_set_0', name: 'Card set bonus 0', getValue: () => player.cardInfo!.getBonusForId(0) },
    { key: 'card_set_5', name: 'Card set bonus 5', getValue: () => player.cardInfo!.getBonusForId(5) },
    { key: 'card_set_12', name: 'Card set bonus 12', getValue: () => player.cardInfo!.getBonusForId(12) },
    { key: 'gear_monster_exp', name: 'Monster EXP gear effect', getValue: () => player.gear.getBonus(EquipmentBonus.XpFromMonsters) },
    { key: 'gear_class_exp_multi', name: 'Class EXP multiplier gear effect', getValue: () => player.gear.getBonus(EquipmentBonus.ClassExpMulti) },
    { key: 'gear_bonus_class_exp', name: 'Class EXP bonus gear effect', getValue: () => player.gear.getBonus(EquipmentBonus.BonusClassExp) },
    { key: 'alchemy_vial_monster_exp', name: 'Monster EXP vial bonus', getValue: () => getDomain<Alchemy>('alchemy').getVialBonusForKey('MonsterEXP') },
    { key: 'cooking_class_exp_meal', name: 'Class EXP meal bonus', getValue: () => getDomain<Cooking>('cooking').getMealBonusForKey('Clexp') },
    { key: 'alchemy_vial_class_exp', name: 'Class EXP vial bonus', getValue: () => getDomain<Alchemy>('alchemy').getVialBonusForKey('7classexp') },
    { key: 'star_sign_main_xp', name: 'Native StarSigns.MainXP aggregate', getValue: () => player.starSigns.reduce((sum, sign) => sum + sign.getClassExperienceBonus(player.level), 0) },
    { key: 'arcade_12', name: 'Arcade bonus 12', getValue: () => getDomain<Arcade>('arcade').bonuses[12].getBonus() },
    { key: 'arcade_60', name: 'Arcade bonus 60', getValue: () => getDomain<Arcade>('arcade').bonuses[60].getBonus() },
    { key: 'shrine_5', name: 'Shrine bonus 5', getValue: () => getDomain<Shrine[]>('shrines')[5].getBonus(player.currentMapId) },
    { key: 'salt_lick_3', name: 'Salt Lick bonus 3', getValue: () => getDomain<SaltLick>('saltLick').getBonus(3) },
    { key: 'prayer_0', name: 'Prayer 0 player bonus', getValue: () => getDomain<Prayer[]>('prayers').find(prayer => prayer.index === 0)!.getBonusForPlayer(player) },
    { key: 'prayer_2', name: 'Prayer 2 player bonus', getValue: () => getDomain<Prayer[]>('prayers').find(prayer => prayer.index === 2)!.getBonusForPlayer(player) },
    { key: 'prayer_9_curse', name: 'Active Prayer 9 curse', getValue: () => player.activePrayers.includes(9) ? getDomain<Prayer[]>('prayers').find(prayer => prayer.index === 9)!.getCurse() : 0 },
    { key: 'flurbo_2', name: 'Flurbo bonus 2', getValue: () => getDomain<Dungeons>('dungeons').passives.get(PassiveType.Flurbo)![2].getBonus() },
    { key: 'stamp_class_xp', name: 'Class EXP stamp bonus', getValue: () => getStampBonusForKey(getDomain<Stamp[][]>('stamps'), 'classxp') },
    { key: 'friend_bonus_1', name: 'Friend bonus 1', getValue: () => getDomain<Friends>('friends').getFriendBonus(1) },
    { key: 'button_bonus_8', name: 'Class EXP Button bonus 8', getValue: () => getDomain<Button>('button').getBonusForIndex(8) },
    { key: 'iron_set_class_exp', name: 'Iron equipment set bonus', getValue: () => getDomain<EquipmentSets>('equipmentSets').getSetBonus('IRON_SET', true) },
    { key: 'talent_328', name: 'Account talent 328 workbench factor', getValue: () => Talent.getAccountTalentBonus(players, 328, player.finalTalentInputs) },
    { key: 'talent_35', name: 'Talent 35 LUK scaling input', getValue: () => player.getTalentBonusAtInputs(35, player.finalTalentInputs) },
    { key: 'talent_55', name: 'Account talent 55 additive bonus', getValue: () => Talent.getAccountTalentBonus(players, 55, player.finalTalentInputs) },
    { key: 'talent_632', name: 'Talent 632 additive bonus', getValue: () => player.getTalentBonusAtInputs(632, player.finalTalentInputs) },
    { key: 'talent_429', name: 'Account talent 429 Compass gate', getValue: () => Talent.getAccountTalentBonus(players, 429, player.finalTalentInputs) },
    { key: 'talent_434', name: 'Account talent 434 titan exponent', getValue: () => Talent.getAccountTalentBonus(players, 434, player.finalTalentInputs) },
    { key: 'companion_bonus_128', name: 'Active companion bonus 128', getValue: () => getCompanionActiveBonus(getDomain<Companion[]>('companions'), 128) },
    { key: 'companion_level_2_128', name: 'Companion 128 level-two state', getValue: () => Number(isCompanionLevelTwo(getDomain<Companion[]>('companions'), 128)) },
    { key: 'statue_bonus_10', name: 'Player statue 10 class EXP bonus', getValue: () => getDomain<PlayerStatues[]>('statues')[player.playerID].statues[10].getBonus(player) },
    { key: 'meritocracy_bonus_27', name: 'Meritocracy bonus 27', getValue: () => getDomain<Meritocraty>('meritocraty').getCurrentBonus(27) },
  ];

  beforeAll(() => {
    const results = loadExtractionResults('player-experience-source-parameters-data.json');
    validateExtractionHealth(results);
    nativeValues = new Map(parameters.map(({ key }) => [key, getExtractedValue(results, key)]));
    gameData = loadGameDataFromSave('latest');
    players = gameData.get('players') as Player[];
    player = getTargetPlayer(players);
  });

  it.each(parameters)('matches $name used by native class EXP', ({ key, getValue }) => {
    expect(getValue()).toMatchLiveGame(getNative(key), 0);
  });
});
