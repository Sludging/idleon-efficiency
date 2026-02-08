/**
 * AtomCollider Cost and Max Level Calculation Validation
 *
 * Tests our AtomCollider cost and max level calculations against live game data.
 *
 * Max Level Formula:
 *   20 + (10 * superbit23) + compass53 + (20 * eventShop28_owned)
 *
 * Cost Formula:
 *   costReduction = 1 / (1 + totalBonus / 100)
 *   where totalBonus = paletteBonus35 + stampDiscount + nenoBonus + (10 * superbit21) + grimoireBonus51
 *                      + compassBonus50 + bubbleY5 + (colliderBuildingLevel / 10) + (7 * meritLevel) + bubbaBonus7
 *
 *   baseCost = atom.baseCost + (atom.level * atom.growthFactor)
 *   exponentCost = atom.baseExponent ^ atom.level
 *   finalCost = floor(costReduction * baseCost * exponentCost)
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../../utils/cloudsave-loader';
import { AtomCollider } from '../../../../data/domain/world-3/construction/atomCollider';

const saveName = 'latest';
const extractionResultsName = 'atomcollider-cost-and-maxlevel-data.json';

describe('AtomCollider Domain - Cost and Max Level Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let collider: AtomCollider;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    collider = gameData.get("collider") as AtomCollider;
  });

  describe('Max Level Calculation', () => {
    it('validates atom max level calculation', () => {
      const liveMaxLevel = getExtractedValue(extractionResults, 'atom_max_level');
      const domainMaxLevel = collider.atoms[0].getMaxLevel();

      expect(domainMaxLevel).toMatchLiveGame(liveMaxLevel, 0);
    });
  });

  describe('Cost Calculation', () => {
    it('validates Hydrogen (atom 0) cost', () => {
      const liveCost = getExtractedValue(extractionResults, 'atom_0_cost');
      const domainCost = collider.atoms[0].getCost();

      expect(domainCost).toMatchLiveGame(liveCost, 0);
    });

    it('validates Lithium (atom 3) cost', () => {
      const liveCost = getExtractedValue(extractionResults, 'atom_3_cost');
      const domainCost = collider.atoms[3].getCost();

      expect(domainCost).toMatchLiveGame(liveCost, 0);
    });

    it('validates Carbon (atom 5) cost', () => {
      const liveCost = getExtractedValue(extractionResults, 'atom_5_cost');
      const domainCost = collider.atoms[5].getCost();

      expect(domainCost).toMatchLiveGame(liveCost, 0);
    });

    it('validates Fluoride (atom 8) cost', () => {
      const liveCost = getExtractedValue(extractionResults, 'atom_8_cost');
      const domainCost = collider.atoms[8].getCost();

      expect(domainCost).toMatchLiveGame(liveCost, 0);
    });

    it('validates Sodium (atom 11) cost', () => {
      const liveCost = getExtractedValue(extractionResults, 'atom_11_cost');
      const domainCost = collider.atoms[11].getCost();

      expect(domainCost).toMatchLiveGame(liveCost, 0);
    });
  });
});
