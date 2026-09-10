/**
 * Rift Skill Mastery compares account-visible ranks, skill effects, card access,
 * and account-wide totals against the live game for every SkillsIndex category.
 *
 * The game exposes 20 rank categories. Research has a rank but no numeric or
 * display Skill Mastery effect; Spelunking has seven public effects.
 *
 * @testCovers SkillMastery.getSkillRank
 * @testCovers SkillMastery.getSkillBonus
 * @testCovers SkillMastery.getTotalBonusByIndex
 */

import { getExtractedValue, loadExtractionResults, validateExtractionHealth, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Rift, SkillMastery } from '../../../data/domain/world-4/rift';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';

const saveName = 'latest';
const extractionResultsName = 'rift-skill-mastery-data.json';

type SkillRankCase = {
  sourceIndex: number;
  skill: SkillsIndex;
  displayName: string;
  extractionKey: string;
};

// Keep the account enum and the live rank category position side by side.
// Intellect is shown to players as Laboratory.
const skillRankCases: SkillRankCase[] = [
  { sourceIndex: 0, skill: SkillsIndex.Mining, displayName: 'Mining', extractionKey: 'rift_skill_mastery_mining_rank' },
  { sourceIndex: 1, skill: SkillsIndex.Smithing, displayName: 'Smithing', extractionKey: 'rift_skill_mastery_smithing_rank' },
  { sourceIndex: 2, skill: SkillsIndex.Chopping, displayName: 'Chopping', extractionKey: 'rift_skill_mastery_chopping_rank' },
  { sourceIndex: 3, skill: SkillsIndex.Fishing, displayName: 'Fishing', extractionKey: 'rift_skill_mastery_fishing_rank' },
  { sourceIndex: 4, skill: SkillsIndex.Alchemy, displayName: 'Alchemy', extractionKey: 'rift_skill_mastery_alchemy_rank' },
  { sourceIndex: 5, skill: SkillsIndex.Catching, displayName: 'Catching', extractionKey: 'rift_skill_mastery_catching_rank' },
  { sourceIndex: 6, skill: SkillsIndex.Trapping, displayName: 'Trapping', extractionKey: 'rift_skill_mastery_trapping_rank' },
  { sourceIndex: 7, skill: SkillsIndex.Construction, displayName: 'Construction', extractionKey: 'rift_skill_mastery_construction_rank' },
  { sourceIndex: 8, skill: SkillsIndex.Worship, displayName: 'Worship', extractionKey: 'rift_skill_mastery_worship_rank' },
  { sourceIndex: 9, skill: SkillsIndex.Cooking, displayName: 'Cooking', extractionKey: 'rift_skill_mastery_cooking_rank' },
  { sourceIndex: 10, skill: SkillsIndex.Breeding, displayName: 'Breeding', extractionKey: 'rift_skill_mastery_breeding_rank' },
  { sourceIndex: 11, skill: SkillsIndex.Intellect, displayName: 'Laboratory', extractionKey: 'rift_skill_mastery_laboratory_rank' },
  { sourceIndex: 12, skill: SkillsIndex.Sailing, displayName: 'Sailing', extractionKey: 'rift_skill_mastery_sailing_rank' },
  { sourceIndex: 13, skill: SkillsIndex.Divinity, displayName: 'Divinity', extractionKey: 'rift_skill_mastery_divinity_rank' },
  { sourceIndex: 14, skill: SkillsIndex.Gaming, displayName: 'Gaming', extractionKey: 'rift_skill_mastery_gaming_rank' },
  { sourceIndex: 15, skill: SkillsIndex.Farming, displayName: 'Farming', extractionKey: 'rift_skill_mastery_farming_rank' },
  { sourceIndex: 16, skill: SkillsIndex.Sneaking, displayName: 'Sneaking', extractionKey: 'rift_skill_mastery_sneaking_rank' },
  { sourceIndex: 17, skill: SkillsIndex.Summoning, displayName: 'Summoning', extractionKey: 'rift_skill_mastery_summoning_rank' },
  { sourceIndex: 18, skill: SkillsIndex.Spelunking, displayName: 'Spelunking', extractionKey: 'rift_skill_mastery_spelunking_rank' },
  { sourceIndex: 19, skill: SkillsIndex.Research, displayName: 'Research', extractionKey: 'rift_skill_mastery_research_rank' },
];

type SkillBonusCase = {
  skill: SkillsIndex;
  displayName: string;
  bonusIndex: number;
  sourceThreshold: number;
  feature: string;
  extractionKey: string;
};

// Every numeric public effect has its own live value. The source threshold
// explains which rank unlocks the effect, while the feature keeps the test
// readable without relying on a positional value list.
const skillBonusCases: SkillBonusCase[] = [
  { skill: SkillsIndex.Mining, displayName: 'Mining', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_mining_experience' },
  { skill: SkillsIndex.Mining, displayName: 'Mining', bonusIndex: 1, sourceThreshold: 1, feature: 'efficiency', extractionKey: 'rift_skill_mastery_mining_efficiency' },
  { skill: SkillsIndex.Smithing, displayName: 'Smithing', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_smithing_experience' },
  { skill: SkillsIndex.Smithing, displayName: 'Smithing', bonusIndex: 1, sourceThreshold: 0, feature: 'forge capacity', extractionKey: 'rift_skill_mastery_smithing_forge_capacity' },
  { skill: SkillsIndex.Chopping, displayName: 'Chopping', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_chopping_experience' },
  { skill: SkillsIndex.Chopping, displayName: 'Chopping', bonusIndex: 1, sourceThreshold: 1, feature: 'efficiency', extractionKey: 'rift_skill_mastery_chopping_efficiency' },
  { skill: SkillsIndex.Fishing, displayName: 'Fishing', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_fishing_experience' },
  { skill: SkillsIndex.Fishing, displayName: 'Fishing', bonusIndex: 1, sourceThreshold: 1, feature: 'efficiency', extractionKey: 'rift_skill_mastery_fishing_efficiency' },
  { skill: SkillsIndex.Alchemy, displayName: 'Alchemy', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_alchemy_experience' },
  { skill: SkillsIndex.Alchemy, displayName: 'Alchemy', bonusIndex: 1, sourceThreshold: 1, feature: 'liquid capacity', extractionKey: 'rift_skill_mastery_alchemy_liquid_capacity' },
  { skill: SkillsIndex.Catching, displayName: 'Catching', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_catching_experience' },
  { skill: SkillsIndex.Catching, displayName: 'Catching', bonusIndex: 1, sourceThreshold: 1, feature: 'efficiency', extractionKey: 'rift_skill_mastery_catching_efficiency' },
  { skill: SkillsIndex.Trapping, displayName: 'Trapping', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_trapping_experience' },
  { skill: SkillsIndex.Trapping, displayName: 'Trapping', bonusIndex: 1, sourceThreshold: 1, feature: 'efficiency', extractionKey: 'rift_skill_mastery_trapping_efficiency' },
  { skill: SkillsIndex.Construction, displayName: 'Construction', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_construction_experience' },
  { skill: SkillsIndex.Construction, displayName: 'Construction', bonusIndex: 1, sourceThreshold: 1, feature: 'shrine level-up rate', extractionKey: 'rift_skill_mastery_construction_shrine_rate' },
  { skill: SkillsIndex.Worship, displayName: 'Worship', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_worship_experience' },
  { skill: SkillsIndex.Worship, displayName: 'Worship', bonusIndex: 1, sourceThreshold: 1, feature: 'efficiency', extractionKey: 'rift_skill_mastery_worship_efficiency' },
  { skill: SkillsIndex.Cooking, displayName: 'Cooking', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_cooking_experience' },
  { skill: SkillsIndex.Cooking, displayName: 'Cooking', bonusIndex: 1, sourceThreshold: 1, feature: 'efficiency', extractionKey: 'rift_skill_mastery_cooking_efficiency' },
  { skill: SkillsIndex.Breeding, displayName: 'Breeding', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_breeding_experience' },
  { skill: SkillsIndex.Breeding, displayName: 'Breeding', bonusIndex: 1, sourceThreshold: 1, feature: 'egg incubation speed', extractionKey: 'rift_skill_mastery_breeding_egg_speed' },
  { skill: SkillsIndex.Intellect, displayName: 'Laboratory', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_laboratory_experience' },
  { skill: SkillsIndex.Intellect, displayName: 'Laboratory', bonusIndex: 1, sourceThreshold: 1, feature: 'efficiency', extractionKey: 'rift_skill_mastery_laboratory_efficiency' },
  { skill: SkillsIndex.Sailing, displayName: 'Sailing', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_sailing_experience' },
  { skill: SkillsIndex.Sailing, displayName: 'Sailing', bonusIndex: 1, sourceThreshold: 1, feature: 'boat sailing speed', extractionKey: 'rift_skill_mastery_sailing_speed' },
  { skill: SkillsIndex.Divinity, displayName: 'Divinity', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_divinity_experience' },
  { skill: SkillsIndex.Divinity, displayName: 'Divinity', bonusIndex: 1, sourceThreshold: 1, feature: 'points gained', extractionKey: 'rift_skill_mastery_divinity_points' },
  { skill: SkillsIndex.Gaming, displayName: 'Gaming', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_gaming_experience' },
  { skill: SkillsIndex.Gaming, displayName: 'Gaming', bonusIndex: 1, sourceThreshold: 1, feature: 'bits gained', extractionKey: 'rift_skill_mastery_gaming_bits' },
  { skill: SkillsIndex.Farming, displayName: 'Farming', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_farming_experience' },
  { skill: SkillsIndex.Farming, displayName: 'Farming', bonusIndex: 1, sourceThreshold: 1, feature: 'crop evolution chance', extractionKey: 'rift_skill_mastery_farming_crop_chance' },
  { skill: SkillsIndex.Sneaking, displayName: 'Sneaking', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_sneaking_experience' },
  { skill: SkillsIndex.Sneaking, displayName: 'Sneaking', bonusIndex: 1, sourceThreshold: 1, feature: 'jade coin gain', extractionKey: 'rift_skill_mastery_sneaking_jade_coins' },
  { skill: SkillsIndex.Summoning, displayName: 'Summoning', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_summoning_experience' },
  { skill: SkillsIndex.Summoning, displayName: 'Summoning', bonusIndex: 1, sourceThreshold: 1, feature: 'essence gain', extractionKey: 'rift_skill_mastery_summoning_essence' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 0, sourceThreshold: 0, feature: 'experience gain', extractionKey: 'rift_skill_mastery_spelunking_experience' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 1, sourceThreshold: 1, feature: 'efficiency', extractionKey: 'rift_skill_mastery_spelunking_efficiency' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 3, sourceThreshold: 3, feature: 'maximum stamina', extractionKey: 'rift_skill_mastery_spelunking_max_stamina' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 4, sourceThreshold: 4, feature: 'daily page reads', extractionKey: 'rift_skill_mastery_spelunking_daily_page_reads' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 5, sourceThreshold: 5, feature: 'stamina regeneration', extractionKey: 'rift_skill_mastery_spelunking_stamina_regen' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 6, sourceThreshold: 6, feature: 'amber gain', extractionKey: 'rift_skill_mastery_spelunking_amber_gain' },
];

/**
 * Minimum skill level for each Skill Mastery rank used by the game. Boundary
 * tests use the level at the declared source threshold and then the next rank.
 */
const rankBoundaryLevels: Record<number, number> = {
  0: 0,
  1: 150,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
  6: 750,
  7: 1000,
};

type CardPassiveCase = {
  skill: SkillsIndex;
  displayName: string;
  sourceIndex: number;
  effectLabel: string;
  extractionKey: string;
};

const cardPassiveCases: CardPassiveCase[] = [
  { skill: SkillsIndex.Mining, displayName: 'Mining', sourceIndex: 0, effectLabel: 'ALL MINING CARDS ARE NOW PASSIVE', extractionKey: 'rift_skill_mastery_mining_cards_passive' },
  { skill: SkillsIndex.Chopping, displayName: 'Chopping', sourceIndex: 2, effectLabel: 'ALL CHOPPING CARDS ARE NOW PASSIVE', extractionKey: 'rift_skill_mastery_chopping_cards_passive' },
  { skill: SkillsIndex.Fishing, displayName: 'Fishing', sourceIndex: 3, effectLabel: 'ALL FISHING CARDS ARE NOW PASSIVE', extractionKey: 'rift_skill_mastery_fishing_cards_passive' },
  { skill: SkillsIndex.Catching, displayName: 'Catching', sourceIndex: 5, effectLabel: 'ALL CATCHING CARDS ARE NOW PASSIVE', extractionKey: 'rift_skill_mastery_catching_cards_passive' },
  { skill: SkillsIndex.Trapping, displayName: 'Trapping', sourceIndex: 6, effectLabel: 'ALL TRAPPING CARDS ARE NOW PASSIVE', extractionKey: 'rift_skill_mastery_trapping_cards_passive' },
  { skill: SkillsIndex.Worship, displayName: 'Worship', sourceIndex: 8, effectLabel: 'ALL WORSHIP CARDS ARE NOW PASSIVE', extractionKey: 'rift_skill_mastery_worship_cards_passive' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', sourceIndex: 18, effectLabel: 'ALL SPELUNKING CARDS ARE NOW PASSIVE', extractionKey: 'rift_skill_mastery_spelunking_cards_passive' },
];

type PublicBonusCase = {
  skill: SkillsIndex;
  displayName: string;
  bonusIndex: number;
  feature: string;
  expectedLabel: string;
};

// These are the public labels that differ from the generic effect names,
// together with one generic label for Cooking and Laboratory.
const publicBonusCases: PublicBonusCase[] = [
  { skill: SkillsIndex.Mining, displayName: 'Mining', bonusIndex: 2, feature: 'passive Mining cards', expectedLabel: 'ALL MINING CARDS ARE NOW PASSIVE' },
  { skill: SkillsIndex.Smithing, displayName: 'Smithing', bonusIndex: 1, feature: 'forge ore capacity', expectedLabel: '+25% FORGE ORE CAPACITY' },
  { skill: SkillsIndex.Chopping, displayName: 'Chopping', bonusIndex: 2, feature: 'passive Chopping cards', expectedLabel: 'ALL CHOPPING CARDS ARE NOW PASSIVE' },
  { skill: SkillsIndex.Fishing, displayName: 'Fishing', bonusIndex: 2, feature: 'passive Fishing cards', expectedLabel: 'ALL FISHING CARDS ARE NOW PASSIVE' },
  { skill: SkillsIndex.Alchemy, displayName: 'Alchemy', bonusIndex: 1, feature: 'liquid capacity', expectedLabel: '+5% ALL LIQUID CAP' },
  { skill: SkillsIndex.Catching, displayName: 'Catching', bonusIndex: 2, feature: 'passive Catching cards', expectedLabel: 'ALL CATCHING CARDS ARE NOW PASSIVE' },
  { skill: SkillsIndex.Trapping, displayName: 'Trapping', bonusIndex: 2, feature: 'passive Trapping cards', expectedLabel: 'ALL TRAPPING CARDS ARE NOW PASSIVE' },
  { skill: SkillsIndex.Construction, displayName: 'Construction', bonusIndex: 1, feature: 'shrine level-up rate', expectedLabel: '+15% SHRINE LV UP RATE' },
  { skill: SkillsIndex.Worship, displayName: 'Worship', bonusIndex: 2, feature: 'passive Worship cards', expectedLabel: 'ALL WORSHIP CARDS ARE NOW PASSIVE' },
  { skill: SkillsIndex.Cooking, displayName: 'Cooking', bonusIndex: 0, feature: 'Cooking experience gain', expectedLabel: '+25% Cooking EXP GAIN' },
  { skill: SkillsIndex.Breeding, displayName: 'Breeding', bonusIndex: 1, feature: 'egg incubation speed', expectedLabel: '+15% EGG INCUBATION SPEED' },
  { skill: SkillsIndex.Intellect, displayName: 'Laboratory', bonusIndex: 0, feature: 'Laboratory experience gain', expectedLabel: '+25% Laboratory EXP GAIN' },
  { skill: SkillsIndex.Sailing, displayName: 'Sailing', bonusIndex: 1, feature: 'boat sailing speed', expectedLabel: '+15% BOAT SAILING SPEED' },
  { skill: SkillsIndex.Divinity, displayName: 'Divinity', bonusIndex: 1, feature: 'Divinity points gained', expectedLabel: '+15% DIVINITY PTS GAINED' },
  { skill: SkillsIndex.Gaming, displayName: 'Gaming', bonusIndex: 1, feature: 'Gaming bits gained', expectedLabel: '1.15X GAMING BITS GAINED' },
  { skill: SkillsIndex.Farming, displayName: 'Farming', bonusIndex: 1, feature: 'crop evolution chance', expectedLabel: '1.15X CROP EVO CHANCE' },
  { skill: SkillsIndex.Sneaking, displayName: 'Sneaking', bonusIndex: 1, feature: 'jade coin gain', expectedLabel: '1.10X JADE COIN GAIN' },
  { skill: SkillsIndex.Summoning, displayName: 'Summoning', bonusIndex: 1, feature: 'essence gain', expectedLabel: '1.10X ESSENCE GAIN' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 0, feature: 'Spelunking experience gain', expectedLabel: '+25% SPELUNKING EXP' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 1, feature: 'Spelunking efficiency', expectedLabel: '+30% SPELUNKING EFFICIENCY' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 2, feature: 'passive Spelunking cards', expectedLabel: 'ALL SPELUNKING CARDS ARE NOW PASSIVE' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 3, feature: 'maximum stamina for everyone', expectedLabel: '+15 MAX STAMINA FOR EVERYONE' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 4, feature: 'daily page reads', expectedLabel: '+3 DAILY PAGE READS' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 5, feature: 'stamina regeneration rate', expectedLabel: '+10% STAMINA REGEN RATE' },
  { skill: SkillsIndex.Spelunking, displayName: 'Spelunking', bonusIndex: 6, feature: 'all amber gain', expectedLabel: '1.50x ALL AMBER GAIN' },
];

type ResearchGateCase = {
  threshold: number;
  extractionKey: string;
};

const researchGateCases: ResearchGateCase[] = [
  { threshold: 0, extractionKey: 'rift_skill_mastery_research_rank_above_0' },
  { threshold: 1, extractionKey: 'rift_skill_mastery_research_rank_above_1' },
  { threshold: 2, extractionKey: 'rift_skill_mastery_research_rank_above_2' },
  { threshold: 3, extractionKey: 'rift_skill_mastery_research_rank_above_3' },
  { threshold: 4, extractionKey: 'rift_skill_mastery_research_rank_above_4' },
  { threshold: 5, extractionKey: 'rift_skill_mastery_research_rank_above_5' },
  { threshold: 6, extractionKey: 'rift_skill_mastery_research_rank_above_6' },
];

const researchSlotCases = [
  { bonusIndex: 0, feature: 'experience gain' },
  { bonusIndex: 1, feature: 'efficiency' },
  { bonusIndex: 2, feature: 'total damage' },
  { bonusIndex: 3, feature: 'all-skill experience' },
  { bonusIndex: 4, feature: 'all-skill efficiency' },
  { bonusIndex: 5, feature: 'printer output' },
  { bonusIndex: 6, feature: 'large all-skill experience' },
] as const;

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

const makeSkillMastery = (active: boolean): SkillMastery => {
  const mastery = new SkillMastery(2, 'Skill Mastery', 16, 'Skill effects based on account skill levels.');
  mastery.active = active;
  return mastery;
};

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

  describe('ranks for all SkillsIndex categories', () => {
    skillRankCases.forEach(({ sourceIndex, skill, displayName, extractionKey }) => {
      it(`matches the live ${displayName} Skill Mastery rank`, () => {
        expect(skillMastery.getSkillRank(skill)).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, extractionKey), {
          tolerance: 0,
          context: `Skill Mastery rank / ${displayName} / source position ${sourceIndex}`,
        });
      });
    });
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

  describe('numeric effect rank boundaries', () => {
    skillBonusCases.forEach(({ skill, displayName, bonusIndex, sourceThreshold, feature, extractionKey }) => {
      it(`unlocks ${displayName} ${feature} after source rank ${sourceThreshold}`, () => {
        const boundaryMastery = makeSkillMastery(true);
        boundaryMastery.skillLevels[skill] = rankBoundaryLevels[sourceThreshold];

        expect(boundaryMastery.getSkillRank(skill)).toBe(sourceThreshold);
        expect(boundaryMastery.getSkillBonus(skill, bonusIndex)).toBe(0);

        boundaryMastery.skillLevels[skill] = rankBoundaryLevels[sourceThreshold + 1];
        expect(boundaryMastery.getSkillRank(skill)).toBe(sourceThreshold + 1);
        expect(boundaryMastery.getSkillBonus(skill, bonusIndex)).toMatchLiveGameWithDetails(
          getExtractedValue(extractionResults, extractionKey),
          {
            tolerance: 0,
            context: `Skill Mastery effect / ${displayName} / ${feature} / rank ${sourceThreshold + 1}`,
          },
        );
      });
    });
  });

  describe('public consumer threshold mappings', () => {
    it('enables Smithing forge capacity at rank one for the anvil consumer', () => {
      const thresholdMastery = makeSkillMastery(true);
      thresholdMastery.skillLevels[SkillsIndex.Smithing] = rankBoundaryLevels[0];

      expect(thresholdMastery.getSkillRank(SkillsIndex.Smithing)).toBe(0);
      expect(thresholdMastery.getSkillBonus(SkillsIndex.Smithing, 1)).toBe(0);

      thresholdMastery.skillLevels[SkillsIndex.Smithing] = rankBoundaryLevels[1];
      expect(thresholdMastery.getSkillRank(SkillsIndex.Smithing)).toBe(1);
      expect(thresholdMastery.getSkillBonus(SkillsIndex.Smithing, 1)).toMatchLiveGameWithDetails(
        getExtractedValue(extractionResults, 'rift_skill_mastery_smithing_forge_capacity'),
        {
          tolerance: 0,
          context: 'Smithing forge capacity / rank one',
        },
      );
    });
  });

  describe('card effects for the seven public card categories', () => {
    cardPassiveCases.forEach(({ skill, displayName, sourceIndex, effectLabel, extractionKey }) => {
      it(`matches live ${displayName} card effect access`, () => {
        const domainGate = skillMastery.getSkillRank(skill) > 2 ? 1 : 0;

        expect(domainGate).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, extractionKey), {
          tolerance: 0,
          context: `Card effect access / ${displayName} / source position ${sourceIndex}`,
        });
        expect(skillMastery.getBonusText(skill, 2)).toBe(effectLabel);
      });
    });
  });

  describe('public Skill Mastery labels', () => {
    publicBonusCases.forEach(({ skill, displayName, bonusIndex, feature, expectedLabel }) => {
      it(`shows ${displayName} ${feature}`, () => {
        expect(skillMastery.getBonusText(skill, bonusIndex)).toBe(expectedLabel);
      });
    });
  });

  describe('Research rank and no-mastery boundary', () => {
    researchGateCases.forEach(({ threshold, extractionKey }) => {
      it(`matches Research rank access above threshold ${threshold}`, () => {
        const domainGate = skillMastery.getSkillRank(SkillsIndex.Research) > threshold ? 1 : 0;

        expect(domainGate).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, extractionKey), {
          tolerance: 0,
          context: `Research rank access / threshold ${threshold}`,
        });
      });
    });

    researchSlotCases.forEach(({ bonusIndex, feature }) => {
      it(`has no numeric Research effect for ${feature}`, () => {
        expect(skillMastery.getSkillBonus(SkillsIndex.Research, bonusIndex)).toBe(0);
      });

      it(`has no Research label for ${feature}`, () => {
        expect(skillMastery.getBonusText(SkillsIndex.Research, bonusIndex)).toBe('');
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

    it('keeps all five totals at seven points while Skill Mastery is locked', () => {
      const lockedMastery = makeSkillMastery(false);

      totalCases.forEach(({ domainBonusIndex }) => {
        expect(lockedMastery.getTotalBonusByIndex(domainBonusIndex)).toBe(7);
      });
    });
  });
});
