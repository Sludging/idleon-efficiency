/**
 * Compare Skill Mastery's live numeric effects, card-access state, and account-wide totals
 * with the paired saved-game extractions.
 */

import { getExtractedValue, loadExtractionResults, validateExtractionHealth, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Rift, SkillMastery } from '../../../data/domain/world-4/rift';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';

const saveName = 'latest';
const extractionResultsName = 'rift-skill-mastery-data.json';

type SkillBonusCase = {
 skill: SkillsIndex;
 displayName: string;
 bonusIndex: number;
 feature: string;
 extractionKey: string;
};

const skillBonusCases: SkillBonusCase[] = [
 { skill: SkillsIndex.Mining, displayName: 'Mining', bonusIndex: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_mining_experience' },
 { skill: SkillsIndex.Mining, displayName: 'Mining', bonusIndex: 1, feature: 'efficiency', extractionKey: 'rift_skill_mastery_mining_efficiency' },
 { skill: SkillsIndex.Smithing, displayName: 'Smithing', bonusIndex: 1, feature: 'forge capacity', extractionKey: 'rift_skill_mastery_smithing_forge_capacity' },
 { skill: SkillsIndex.Alchemy, displayName: 'Alchemy', bonusIndex: 1, feature: 'liquid capacity', extractionKey: 'rift_skill_mastery_alchemy_liquid_capacity' },
 { skill: SkillsIndex.Construction, displayName: 'Construction', bonusIndex: 1, feature: 'shrine level-up rate', extractionKey: 'rift_skill_mastery_construction_shrine_rate' },
 { skill: SkillsIndex.Breeding, displayName: 'Breeding', bonusIndex: 1, feature: 'egg incubation speed', extractionKey: 'rift_skill_mastery_breeding_egg_speed' },
 { skill: SkillsIndex.Sailing, displayName: 'Sailing', bonusIndex: 1, feature: 'boat sailing speed', extractionKey: 'rift_skill_mastery_sailing_speed' },
 { skill: SkillsIndex.Divinity, displayName: 'Divinity', bonusIndex: 1, feature: 'points gained', extractionKey: 'rift_skill_mastery_divinity_points' },
 { skill: SkillsIndex.Gaming, displayName: 'Gaming', bonusIndex: 1, feature: 'bits gained', extractionKey: 'rift_skill_mastery_gaming_bits' },
 { skill: SkillsIndex.Farming, displayName: 'Farming', bonusIndex: 1, feature: 'crop evolution chance', extractionKey: 'rift_skill_mastery_farming_crop_chance' },
 { skill: SkillsIndex.Sneaking, displayName: 'Sneaking', bonusIndex: 1, feature: 'jade coin gain', extractionKey: 'rift_skill_mastery_sneaking_jade_coins' },
 { skill: SkillsIndex.Summoning, displayName: 'Summoning', bonusIndex: 1, feature: 'essence gain', extractionKey: 'rift_skill_mastery_summoning_essence' },
 { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 3, feature: 'maximum stamina', extractionKey: 'rift_skill_mastery_spelunking_max_stamina' },
 { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 4, feature: 'daily page reads', extractionKey: 'rift_skill_mastery_spelunking_daily_page_reads' },
 { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 5, feature: 'stamina regeneration', extractionKey: 'rift_skill_mastery_spelunking_stamina_regen' },
 { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 6, feature: 'amber gain', extractionKey: 'rift_skill_mastery_spelunking_amber_gain' },
];


type CardPassiveCase = {
 skill: SkillsIndex;
 displayName: string;
 sourceIndex: number;
 extractionKey: string;
};

const cardPassiveCases: CardPassiveCase[] = [
 { skill: SkillsIndex.Mining, displayName: 'Mining', sourceIndex: 0, extractionKey: 'rift_skill_mastery_mining_cards_passive' },
];


type TotalCase = {
 sourceIndex: number;
 domainBonusIndex: number;
 feature: string;
 extractionKey: string;
};

const totalCases: TotalCase[] = [
 { sourceIndex: 0, domainBonusIndex: 2, feature: 'total damage', extractionKey: 'rift_skill_mastery_total_damage' },
 { sourceIndex: 1, domainBonusIndex: 3, feature: 'all-skill experience', extractionKey: 'rift_skill_mastery_total_all_skill_experience' },
 { sourceIndex: 2, domainBonusIndex: 4, feature: 'all-skill efficiency', extractionKey: 'rift_skill_mastery_total_all_skill_efficiency' },
 { sourceIndex: 3, domainBonusIndex: 5, feature: 'printer output', extractionKey: 'rift_skill_mastery_total_printer_output' },
 { sourceIndex: 4, domainBonusIndex: 6, feature: 'large all-skill experience', extractionKey: 'rift_skill_mastery_total_large_all_skill_experience' },
];


describe('Rift Domain - Skill Mastery account effects', () => {
 let extractionResults: ExtractionResults;
 let skillMastery: SkillMastery;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  const gameData = loadGameDataFromSave(saveName);
  const rift = gameData.get('rift') as Rift;
  skillMastery = rift.bonuses.find((bonus) => bonus.name === 'Skill Mastery') as SkillMastery;

  if (!skillMastery) {
   throw new Error('Skill Mastery owner calculation is missing from Rift domain');
  }

  if (!skillMastery.active) {
   throw new Error('The latest real save does not have Skill Mastery active; active comparisons require an unlocked effect');
  }
 });

 describe('numeric effects for each supported category', () => {
  skillBonusCases.forEach(({ skill, displayName, bonusIndex, feature, extractionKey }) => {
   it(`matches live ${displayName} ${feature}`, () => {
    expect(skillMastery.getSkillBonus(skill, bonusIndex)).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, extractionKey), {
     tolerance: 0,
     context: `Skill Mastery effect / ${displayName} / ${feature}`,
    });
   });
  });
 });


 describe('card effect access for configured public categories', () => {
  cardPassiveCases.forEach(({ skill, displayName, sourceIndex, extractionKey }) => {
   it(`matches live ${displayName} passive-card access`, () => {
    const domainGate = skillMastery.getSkillRank(skill) > 2 ? 1 : 0;

    expect(domainGate).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, extractionKey), {
     tolerance: 0,
     context: `Passive-card access / ${displayName} / source position ${sourceIndex}`,
    });
   });
  });
 });



 describe('account-wide totals', () => {
  totalCases.forEach(({ sourceIndex, domainBonusIndex, feature, extractionKey }) => {
   it(`matches the live ${feature} total`, () => {
    expect(skillMastery.getTotalBonusByIndex(domainBonusIndex)).toMatchLiveGameWithDetails(
     getExtractedValue(extractionResults, extractionKey),
     {
      tolerance: 0,
      context: `Account-wide total / ${feature} / source position ${sourceIndex}`,
     },
    );
   });
  });

 });
});
