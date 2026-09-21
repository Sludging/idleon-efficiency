/**
 * Rift Skill Mastery compares configured live effects, card access,
 * Research boundaries, and account-wide totals against the live game.
 *
 * The extraction config contains selected numeric effects, two Research
 * boundaries, one card-access check, and all account-wide totals.
 *
 * @testCovers SkillMastery.getSkillBonus
 * @testCovers SkillMastery.getTotalBonusByIndex
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
  { skill: SkillsIndex.Smithing, displayName: 'Smithing', bonusIndex: 1, sourceThreshold: 0, feature: 'forge capacity', extractionKey: 'rift_skill_mastery_smithing_forge_capacity' },
  { skill: SkillsIndex.Alchemy, displayName: 'Alchemy', bonusIndex: 1, sourceThreshold: 1, feature: 'liquid capacity', extractionKey: 'rift_skill_mastery_alchemy_liquid_capacity' },
  { skill: SkillsIndex.Construction, displayName: 'Construction', bonusIndex: 1, sourceThreshold: 1, feature: 'shrine level-up rate', extractionKey: 'rift_skill_mastery_construction_shrine_rate' },
  { skill: SkillsIndex.Breeding, displayName: 'Breeding', bonusIndex: 1, sourceThreshold: 1, feature: 'egg incubation speed', extractionKey: 'rift_skill_mastery_breeding_egg_speed' },
  { skill: SkillsIndex.Sailing, displayName: 'Sailing', bonusIndex: 1, sourceThreshold: 1, feature: 'boat sailing speed', extractionKey: 'rift_skill_mastery_sailing_speed' },
  { skill: SkillsIndex.Divinity, displayName: 'Divinity', bonusIndex: 1, sourceThreshold: 1, feature: 'points gained', extractionKey: 'rift_skill_mastery_divinity_points' },
  { skill: SkillsIndex.Gaming, displayName: 'Gaming', bonusIndex: 1, sourceThreshold: 1, feature: 'bits gained', extractionKey: 'rift_skill_mastery_gaming_bits' },
  { skill: SkillsIndex.Farming, displayName: 'Farming', bonusIndex: 1, sourceThreshold: 1, feature: 'crop evolution chance', extractionKey: 'rift_skill_mastery_farming_crop_chance' },
  { skill: SkillsIndex.Sneaking, displayName: 'Sneaking', bonusIndex: 1, sourceThreshold: 1, feature: 'jade coin gain', extractionKey: 'rift_skill_mastery_sneaking_jade_coins' },
  { skill: SkillsIndex.Summoning, displayName: 'Summoning', bonusIndex: 1, sourceThreshold: 1, feature: 'essence gain', extractionKey: 'rift_skill_mastery_summoning_essence' },
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

  describe('card effects for configured public card categories', () => {
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
