import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Farming } from '../../../data/domain/world-6/farming';
import type { Breeding } from '../../../data/domain/world-4/breeding';
import type { Compass } from '../../../data/domain/compass';
import type { Meritocraty } from '../../../data/domain/world-7/meritocraty';
import type { Sigils } from '../../../data/domain/world-2/alchemy/sigils';
import { TotalizerBonus, type Worship } from '../../../data/domain/world-3/worship';
import type { Equinox } from '../../../data/domain/world-3/equinox';
import { Food } from '../../../data/domain/items';
import type { Player } from '../../../data/domain/player';
import { getActiveClassExperienceBubble } from '../../../data/domain/player-experience';
import type { Companion } from '../../../data/domain/companions';
import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Persistent player stat input used by class EXP', () => {
  let player: Player;
  let classExperienceFood: number;
  let shimLanternBonus: number;
  let dreamCloudBonus: number;
  let sailing: Sailing;
  let equinox: Equinox;
  let totalizerExperienceBonus: number;
  let sigilExperienceBonus: number;
  let totalTitanKills: number;
  let worship: Worship;
  let sigils: Sigils;
  let meritocraty: Meritocraty;
  let compass: Compass;
  let shinyExperienceBonus: number;
  let breeding: Breeding;
  let farmingExoticBonus50: number;
  let boxMonsterExperience: number;
  let activeExperienceBubble: number;
  let farming: Farming;
  let alchemy: Alchemy;
  let companions: Companion[];

  beforeAll(() => {
    const results = loadExtractionResults('player-experience-parameters-data.json');
    validateExtractionHealth(results);
    classExperienceFood = getExtractedValue(results, 'class_experience_food');
    shimLanternBonus = getExtractedValue(results, 'shim_lantern_bonus');
    dreamCloudBonus = getExtractedValue(results, 'dream_cloud_bonus_70');
    totalizerExperienceBonus = getExtractedValue(results, 'experience_totalizer_bonus_4');
    sigilExperienceBonus = getExtractedValue(results, 'experience_sigil_bonus_8');
    totalTitanKills = getExtractedValue(results, 'experience_total_titan_kills');
    shinyExperienceBonus = getExtractedValue(results, 'experience_shiny_bonus_1');
    farmingExoticBonus50 = getExtractedValue(results, 'native_farming_exotic_50');
    boxMonsterExperience = getExtractedValue(results, 'native_box_monster_exp');
    activeExperienceBubble = getExtractedValue(results, 'native_active_exp_bubble');
    const data = loadGameDataFromSave('latest');
    worship = data.get('worship') as Worship;
    sigils = data.get('sigils') as Sigils;
    meritocraty = data.get('meritocraty') as Meritocraty;
    compass = data.get('compass') as Compass;
    breeding = data.get('breeding') as Breeding;
    player = getTargetPlayer(data.get('players') as Player[]);
    sailing = data.get('sailing') as Sailing;
    farming = data.get('farming') as Farming;
    alchemy = data.get('alchemy') as Alchemy;
    companions = data.get('companions') as Companion[];
    equinox = data.get('equinox') as Equinox;
  });

  it('matches prepared LUK used by the native class EXP multiplier', () => {
    const luck = loadExtractionResults('player-attributes-data.json').extractions.attributes.result.luck;
    expect(player.stats.luck).toMatchLiveGameWithDetails(luck, {
      tolerance: 0,
      context: `${player.playerName} total LUK used by the native class EXP multiplier`,
    });
  });

  it('matches equipped food class EXP points used by the native class EXP multiplier', () => {
    expect(Food.getClassExperienceContribution(player)).toMatchLiveGameWithDetails(classExperienceFood, {
      tolerance: 0,
      context: `${player.playerName} equipped-food class EXP percentage points`,
    });
  });

  it('matches the saved Shim Lantern bonus used by AllShimmerBonuses(0)', () => {
    expect(sailing.artifacts[31].getBonus()).toMatchLiveGameWithDetails(shimLanternBonus, {
      tolerance: 0,
      context: 'Shim Lantern artifact bonus used by AllShimmerBonuses(0)',
    });
  });

  it('matches native CloudBonus(70) using the typed Equinox challenge value', () => {
    const challengeValue = equinox.challenges.find(challenge => challenge.index === 70)?.getValue() ?? 0;
    expect(challengeValue).toMatchLiveGameWithDetails(dreamCloudBonus, {
      tolerance: 0,
      context: 'Dream Cloud challenge 70 completion flag used by CloudBonus(70)',
    });
  });

  it('matches native MSA_Bonus(4) through the typed totalizer', () => {
    expect(worship.totalizer.getBonus(TotalizerBonus.ExpMulti)).toMatchLiveGameWithDetails(totalizerExperienceBonus, {
      tolerance: 0,
      context: 'Totalizer EXP mastery additive percentage points',
    });
  });

  it('matches native SigilBonus(Blank, 8) through typed Sigil and meritocracy bonuses', () => {
    const sigilBonus = sigils.sigils[8].getBonus() * (1 + meritocraty.getCurrentBonus(21) / 100);
    expect(sigilBonus).toMatchLiveGameWithDetails(sigilExperienceBonus, {
      tolerance: 0,
      context: 'Sigil 8 additive EXP percentage points including meritocracy',
    });
  });

  it('matches native TotalTitanKills from saved defeated titan flags', () => {
    expect(compass.titansKilled.filter(killed => killed === 1).length).toMatchLiveGameWithDetails(totalTitanKills, {
      tolerance: 0,
      context: 'Saved defeated titan count used as Talent 434 exponent',
    });
  });
  it('matches native ShinyBonusS index 1 through the typed breeding bonus', () => {
    const bonus = breeding.shinyBonuses.find(candidate => candidate.data.index === 1)?.getBonus() ?? 0;
    expect(bonus).toMatchLiveGameWithDetails(shinyExperienceBonus, {
      tolerance: 0,
      context: 'Shiny pet bonus index 1 additive class EXP percentage points',
    });
  });
  it('matches native FarmingStuffs ExoticBonusQTY(50)', () => {
    expect(farming.getExoticMarketBonusValue(50)).toMatchLiveGameWithDetails(farmingExoticBonus50, {
      tolerance: 0,
      context: 'Farming exotic-market bonus 50 used by class EXP',
    });
  });

  it('matches native BoxRewards monster EXP through the typed player post-office bonus', () => {
    expect(player.getPostOfficeBonus('monsterExp')).toMatchLiveGameWithDetails(boxMonsterExperience, {
      tolerance: 0,
      context: 'Prepared post-office monster EXP additive',
    });
  });

  it('matches native active EXP bubble through the selected player contribution', () => {
    expect(getActiveClassExperienceBubble(alchemy, player, companions)).toMatchLiveGameWithDetails(activeExperienceBubble, {
      tolerance: 0,
      context: 'Prepared active EXP bubble additive',
    });
  });
});
