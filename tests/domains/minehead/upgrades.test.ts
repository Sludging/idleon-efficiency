/**
 * Minehead shop upgrade calculations against the paired live-game extraction.
 *
 * Quantity rows target positive levels, zero levels, distinct per-level
 * coefficients, and the max-zero record. Requirement rows target the floor
 * changes at indices 3 and 11. Cost rows target the pre-index-2 term, the
 * 2^max(0,n-4) transition, the A_MineCost exponent transition, and both
 * discount/cap records. Affordability, unlock, buyability, and maxed rows
 * retain the approved finite, unlimited, locked, and max-zero boundaries.
 * The paired extraction establishes which states this save exercises; a
 * single save cannot establish every level or cap transition, so expected
 * values remain source-extracted rather than inferred.
 *
 * @testCovers Minehead.getUpgradeBonus
 * @testCovers MineheadUpgrade.getRequiredLevel
 * @testCovers MineheadUpgrade.nextLevelCost
 * @testCovers Minehead.canAffordUpgrade
 * @testCovers MineheadUpgrade.isUnlocked
 * @testCovers Minehead.canBuyUpgrade
 * @testCovers MineheadUpgrade.isMaxed
 */

import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

/**
 * Keep these test-local and optional until the approved Minehead shop API is
 * present in the domain. Every optional method has an explicit runtime guard
 * below so a missing selected calculation remains an active failure.
 */
interface MineheadUpgradeForTest {
  index: number;
  getRequiredLevel?: () => number;
  nextLevelCost?: () => number;
  isUnlocked?: () => boolean;
  isMaxed?: () => boolean;
}

interface MineheadForTest {
  upgrades?: MineheadUpgradeForTest[];
  getUpgradeBonus?: (index: number) => number;
  canAffordUpgrade?: (index: number) => boolean;
  canBuyUpgrade?: (index: number) => boolean;
}

const extractionResultsName = 'minehead-data.json';
const saveName = 'latest';

const quantityCases = [
  { index: 0, description: 'Base Damage I at a positive level' },
  { index: 3, description: 'Bettah Numbahs with a distinct per-level quantity' },
  { index: 16, description: 'Legal Cheating Button at a zero level' },
  { index: 26, description: "El' Cheapo Upgrado's discount quantity at a zero level" },
  { index: 29, description: "Rift Guy's max-zero quantity" },
] as const;

const requirementCases = [
  { index: 2, description: 'the pre-floor-change requirement' },
  { index: 3, description: 'the floor(n / 3) requirement boundary' },
  { index: 10, description: 'the pre-floor(n / 11) requirement' },
  { index: 11, description: 'the floor(n / 11) requirement boundary' },
] as const;

const costCases = [
  { index: 2, description: 'the last zero fractional base-cost term' },
  { index: 3, description: 'the fractional base-cost branch' },
  { index: 4, description: 'the last unit power-of-two cost factor' },
  { index: 5, description: 'the first doubled power-of-two cost factor' },
  { index: 9, description: 'the pre-A_MineCost exponent branch' },
  { index: 10, description: 'the A_MineCost exponent branch' },
  { index: 26, description: 'the Minehead discount upgrade' },
  { index: 29, description: 'the max-zero upgrade cost' },
] as const;

const affordabilityCases = [
  { index: 0, description: 'an unlimited-cap upgrade' },
  { index: 1, description: 'a finite-cap upgrade' },
  { index: 29, description: 'the max-zero upgrade' },
] as const;

const unlockCases = [
  { index: 20, description: 'the requirement-equal unlocked boundary' },
  { index: 21, description: 'the next locked requirement boundary' },
] as const;

const buyabilityCases = [
  { index: 0, description: 'an unlocked unlimited-cap upgrade' },
  { index: 1, description: 'an unlocked finite-cap upgrade' },
  { index: 20, description: 'the requirement-equal upgrade' },
  { index: 21, description: 'the requirement-locked upgrade' },
  { index: 29, description: 'the max-zero upgrade' },
] as const;

const maxedCases = [
  { index: 0, description: 'an unlimited-cap upgrade below its listed maximum' },
  { index: 1, description: 'a finite-cap upgrade below its maximum' },
  { index: 29, description: 'the zero-maximum upgrade' },
] as const;

const getMinehead = (gameData: Map<string, any>): MineheadForTest => {
  const minehead = gameData.get('minehead') as MineheadForTest | undefined;
  if (!minehead) {
    throw new Error('Minehead domain not found in save data');
  }
  return minehead;
};

const getUpgrade = (minehead: MineheadForTest, index: number, gameMethod: 'UpgLvREQ' | 'UpgCost' | 'CanWeBuyUpg'): MineheadUpgradeForTest => {
  const upgrade = minehead.upgrades?.find(candidate => candidate.index === index);
  if (!upgrade) {
    throw new Error(`MISSING SELECTED CALCULATION - Minehead("${gameMethod}", ${index}, 0) requires the missing shop upgrade record`);
  }
  return upgrade;
};

const getUpgradeBonus = (minehead: MineheadForTest, index: number): number => {
  if (typeof minehead.getUpgradeBonus !== 'function') {
    throw new Error(`MISSING SELECTED CALCULATION - Minehead.getUpgradeBonus(${index}) must expose Minehead("UpgradeQTY", ${index}, 0)`);
  }
  return minehead.getUpgradeBonus(index);
};


const getRequiredLevel = (upgrade: MineheadUpgradeForTest, index: number): number => {
  if (typeof upgrade.getRequiredLevel !== 'function') {
    throw new Error(`MISSING SELECTED CALCULATION - MineheadUpgrade.getRequiredLevel() must expose Minehead("UpgLvREQ", ${index}, 0)`);
  }
  return upgrade.getRequiredLevel();
};

const getNextLevelCost = (upgrade: MineheadUpgradeForTest, index: number): number => {
  if (typeof upgrade.nextLevelCost !== 'function') {
    throw new Error(`MISSING SELECTED CALCULATION - MineheadUpgrade.nextLevelCost() must expose Minehead("UpgCost", ${index}, 0)`);
  }
  return upgrade.nextLevelCost();
};

const isUpgradeUnlocked = (upgrade: MineheadUpgradeForTest, index: number): boolean => {
  if (typeof upgrade.isUnlocked !== 'function') {
    throw new Error(`MISSING SELECTED CALCULATION - MineheadUpgrade.isUnlocked() must expose the account Research unlock for Minehead("UpgLvREQ", ${index}, 0)`);
  }
  return upgrade.isUnlocked();
};

const isUpgradeMaxed = (upgrade: MineheadUpgradeForTest, index: number): boolean => {
  if (typeof upgrade.isMaxed !== 'function') {
    throw new Error(`MISSING SELECTED CALCULATION - MineheadUpgrade.isMaxed() must expose MineheadUPG[${index}][1] cap semantics`);
  }
  return upgrade.isMaxed();
};

const canAffordUpgrade = (minehead: MineheadForTest, index: number): boolean => {
  if (typeof minehead.canAffordUpgrade !== 'function') {
    throw new Error(`MISSING SELECTED CALCULATION - Minehead.canAffordUpgrade(${index}) must expose Minehead("CanWeBuyUpg", ${index}, 0)`);
  }
  return minehead.canAffordUpgrade(index);
};

const canBuyUpgrade = (minehead: MineheadForTest, index: number): boolean => {
  if (typeof minehead.canBuyUpgrade !== 'function') {
    throw new Error(`MISSING SELECTED CALCULATION - Minehead.canBuyUpgrade(${index}) must expose Minehead("CanWeBuyUpg", ${index}, 0) plus the account Research unlock`);
  }
  return minehead.canBuyUpgrade(index);
};

describe('Minehead Domain - Upgrade Shop', () => {
  let extractionResults: ExtractionResults;
  let minehead: MineheadForTest;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    minehead = getMinehead(loadGameDataFromSave(saveName));
  });

  quantityCases.forEach(({ index, description }) => {
    it(`matches the owner upgrade quantity for ${description}`, () => {
      const liveValue = getExtractedValue(extractionResults, `minehead_upgrade_quantity_${index}`);
      const domainValue = getUpgradeBonus(minehead, index);

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Minehead upgrade quantity ${index} (${description})`,
      });
    });
  });


  requirementCases.forEach(({ index, description }) => {
    it(`matches ${description} for upgrade ${index}`, () => {
      const liveValue = getExtractedValue(extractionResults, `minehead_upgrade_requirement_${index}`);
      const domainValue = getRequiredLevel(getUpgrade(minehead, index, 'UpgLvREQ'), index);

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Minehead upgrade requirement ${index} (${description})`,
      });
    });
  });

  costCases.forEach(({ index, description }) => {
    it(`matches ${description} for upgrade ${index}`, () => {
      const liveValue = getExtractedValue(extractionResults, `minehead_upgrade_cost_${index}`);
      const domainValue = getNextLevelCost(getUpgrade(minehead, index, 'UpgCost'), index);

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Minehead next-level cost ${index} (${description})`,
      });
    });
  });

  affordabilityCases.forEach(({ index, description }) => {
    it(`matches affordability for ${description}`, () => {
      const liveValue = Number(getExtractedValue(extractionResults, `minehead_upgrade_affordable_${index}`));
      const domainValue = Number(canAffordUpgrade(minehead, index));

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Minehead upgrade affordability ${index} (${description})`,
      });
    });
  });

  unlockCases.forEach(({ index, description }) => {
    it(`matches the account unlock state for ${description}`, () => {
      const liveValue = Number(getExtractedValue(extractionResults, `minehead_upgrade_unlocked_${index}`));
      const domainValue = Number(isUpgradeUnlocked(getUpgrade(minehead, index, 'UpgLvREQ'), index));

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Minehead upgrade unlock ${index} (${description})`,
      });
    });
  });

  buyabilityCases.forEach(({ index, description }) => {
    it(`matches purchase eligibility for ${description}`, () => {
      const liveValue = Number(getExtractedValue(extractionResults, `minehead_upgrade_buyable_${index}`));
      const domainValue = Number(canBuyUpgrade(minehead, index));

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Minehead upgrade buyability ${index} (${description})`,
      });
    });
  });

  maxedCases.forEach(({ index, description }) => {
    it(`matches the cap state for ${description}`, () => {
      const liveValue = Number(getExtractedValue(extractionResults, `minehead_upgrade_maxed_${index}`));
      const domainValue = Number(isUpgradeMaxed(getUpgrade(minehead, index, 'CanWeBuyUpg'), index));

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Minehead upgrade maxed ${index} (${description})`,
      });
    });
  });
});
