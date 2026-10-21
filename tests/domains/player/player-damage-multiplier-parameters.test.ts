import { ClassIndex } from '../../../data/domain/talents';
import type { Family } from '../../../data/domain/family';
import type { Player } from '../../../data/domain/player';
import { TotalizerBonus } from '../../../data/domain/world-3/worship';
import type { Worship } from '../../../data/domain/world-3/worship';
import type { ConstructionMastery, Rift, SkillMastery } from '../../../data/domain/world-4/rift';
import type { Tome } from '../../../data/domain/world-4/tome';
import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import type { Minehead } from '../../../data/domain/world-7/minehead';
import type { SushiStation } from '../../../data/domain/world-7/sushi';
import type { Deathnote } from '../../../data/domain/world-3/construction/deathnote';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Player damage multiplier direct parameters', () => {
  let player: Player;
  let data: Map<string, any>;
  let nativeTomeBonus: number;
  let nativeConstructionMasteryBonus: number;
  let nativeKillroyDamageBonus: number;
  let nativeMineheadBonus0: number;
  let nativeMineheadBonus4: number;
  let nativeJellyObstruction37: number;
  let nativeRoyalStatue0: number;
  let nativeHoleFountainBonus: number;
  let nativeSushiBonus49: number;
  let nativeFamilyBonus80: number;
  let nativeFamilyBonus20: number;
  let nativeEclipseSkulls: number;
  let nativeRiftSkillDamage: number;
  let nativeMsaDamageBonus: number;
  let nativeWeaponPowerBonus: number;
  beforeAll(() => {
    const results = loadExtractionResults('player-damage-multiplier-parameters-data.json');
    validateExtractionHealth(results);
    nativeTomeBonus = getExtractedValue(results, 'damage_tome_bonus_0');
    nativeConstructionMasteryBonus = getExtractedValue(results, 'damage_construction_mastery_1');
    nativeKillroyDamageBonus = getExtractedValue(results, 'damage_killroy_multiplier');
    nativeMineheadBonus0 = getExtractedValue(results, 'damage_minehead_bonus_0');
    nativeMineheadBonus4 = getExtractedValue(results, 'damage_minehead_bonus_4');
    nativeJellyObstruction37 = getExtractedValue(results, 'damage_jelly_obstruction_37');
    nativeRoyalStatue0 = getExtractedValue(results, 'damage_royal_statue_0');
    nativeHoleFountainBonus = getExtractedValue(results, 'damage_hole_fountain_1_16');
    nativeSushiBonus49 = getExtractedValue(results, 'damage_sushi_49');
    nativeFamilyBonus20 = getExtractedValue(results, 'damage_family_bonus_20');
    nativeEclipseSkulls = getExtractedValue(results, 'damage_eclipse_skulls');
    nativeRiftSkillDamage = getExtractedValue(results, 'damage_rift_skill_etc_0');
    nativeMsaDamageBonus = getExtractedValue(results, 'damage_msa_bonus');
    nativeWeaponPowerBonus = getExtractedValue(results, 'damage_weapon_power_bonus');
    nativeFamilyBonus80 = getExtractedValue(results, 'damage_family_bonus_80');
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
  });

  it('matches native TomeBonus(0) with the saved Tome score', () => {
    const tome = data.get('tome') as Tome;
    expect(tome.getTomeBonus(0, player)).toMatchLiveGame(nativeTomeBonus, 0);
  });

  it('matches native ConstMasteryBonus(1) with Construction Mastery damage', () => {
    const rift = data.get('rift') as Rift;
    const constructionMastery = rift.bonuses.find(bonus => bonus.name === 'Construct Mastery') as ConstructionMastery;
    expect(constructionMastery.getBonusByIndex(2)).toMatchLiveGame(nativeConstructionMasteryBonus, 0);
  });

  it('matches native KillroyDMG with Killroy Prime', () => {
    const rift = data.get('rift') as Rift;
    expect(rift.bonuses.find(bonus => bonus.name === 'Killroy Prime')!.getBonus()).toMatchLiveGame(nativeKillroyDamageBonus, 0);
  });
 
  it('matches native Eclipse Skulls damage bonus across Death Note worlds', () => {
    const deathnote = data.get('deathnote') as Deathnote;
    expect(deathnote.getEclipseSkullsDamageBonus()).toMatchLiveGame(nativeEclipseSkulls, 0);
  });

  it('matches native Rift Skill Mastery total damage', () => {
    const rift = data.get('rift') as Rift;
    const skillMastery = rift.bonuses.find(bonus => bonus.name === 'Skill Mastery') as SkillMastery;
    expect(skillMastery.getTotalBonusByIndex(4)).toMatchLiveGame(nativeRiftSkillDamage, 0);
  });

  it('matches native MSA Totalizer damage bonus', () => {
    const worship = data.get('worship') as Worship;
    expect(worship.totalizer.getBonus(TotalizerBonus.Damage)).toMatchLiveGame(nativeMsaDamageBonus, 0);
  });
 
  it('matches native Minehead opponent bonus 0', () => {
    const minehead = data.get('minehead') as Minehead;
    expect(minehead.getBonusFromIndex(0)).toMatchLiveGame(nativeMineheadBonus0, 0);
  });

  it('matches native Minehead opponent bonus 4', () => {
    const minehead = data.get('minehead') as Minehead;
    expect(minehead.getBonusFromIndex(4)).toMatchLiveGame(nativeMineheadBonus4, 0);
  });

  it('matches native Jelly Operator obstruction 37', () => {
    const jellyOperator = data.get('jellyOperator') as JellyOperator;
    expect(jellyOperator.getObstructionBonus(37)).toMatchLiveGame(nativeJellyObstruction37, 0);
  });

  it('matches native Royal Armory statue 0', () => {
    const royalArmory = data.get('royalArmory') as RoyalArmory;
    expect(royalArmory.statues.find(statue => statue.index === 0)!.getBonus()).toMatchLiveGame(nativeRoyalStatue0, 0);
  });

  it('matches native Hole Fountain_BonTOT(1, 16)', () => {
    const hole = data.get('hole') as Hole;
    expect(hole.getFountainBonus(1, 16)).toMatchLiveGame(nativeHoleFountainBonus, 0);
  });

  it('matches native Sushi bonus 49', () => {
    const sushi = data.get('sushi') as SushiStation;
    expect(sushi.getBonusFromIndex(49)).toMatchLiveGame(nativeSushiBonus49, 0);
  });
 
  it('matches native family damage quantity 20 with Blood Berserker family bonus', () => {
    const family = data.get('family') as Family;
    expect(family.getClassBonus(ClassIndex.Blood_Berserker)!.getBonus(player)).toMatchLiveGame(nativeFamilyBonus20, 0);
  });

  it('matches native family damage quantity 80 with Arcane Cultist family bonus', () => {
    const family = data.get('family') as Family;
    expect(family.getClassBonus(ClassIndex.Arcane_Cultist)!.getBonus(player)).toMatchLiveGame(nativeFamilyBonus80, 0);
  });
  it('matches native WepPowDmgPCT with weapon base power and weapon-map stone value', () => {
    const weaponPower = player.gear.equipment[1]?.getProperty('Weapon_Power');
    expect((weaponPower ? weaponPower.value + weaponPower.stone : 0)).toMatchLiveGame(nativeWeaponPowerBonus, 0);
  });

 
});
