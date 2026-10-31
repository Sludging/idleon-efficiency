import { Breeding, Pet } from '../../../data/domain/world-4/breeding';
import {
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

type ShinySpeciesProgression = {
  world: number;
  petIndex: number;
  petId: string;
  progress: number;
  level: number;
  requirement: number;
};

type ShinyBonusResult = {
  index: number;
  bonus: number;
};

const extractionResultsName = 'breeding-data.json';
const speciesRows = Array.from({ length: 68 }, (_, index) => index);
const bonusIndices = Array.from({ length: 26 }, (_, index) => index);

describe('Breeding Shiny progression and bonuses', () => {
  let breeding: Breeding;
  let shinySpecies: ShinySpeciesProgression[];
  let shinyBonuses: ShinyBonusResult[];

  beforeAll(() => {
    const extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    shinySpecies = extractionResults.extractions['shiny_species'].result as ShinySpeciesProgression[];
    shinyBonuses = extractionResults.extractions['shiny_bonuses'].result as ShinyBonusResult[];
    breeding = loadGameDataFromSave('latest').get('breeding') as Breeding;
  });

  it('covers all 68 native Shiny species records', () => {
    expect(shinySpecies).toHaveLength(68);
  });

  it('covers all 26 native Shiny bonus records', () => {
    expect(shinyBonuses).toHaveLength(26);
  });

  describe.each(speciesRows)('Shiny species native row %i', rowIndex => {
    let expected: ShinySpeciesProgression;
    let pet: Pet;

    beforeAll(() => {
      expected = shinySpecies[rowIndex];
      if (!expected) throw new Error(`Native Shiny species record at row ${rowIndex} not found`);

      const matchingPet = breeding.basePets.find(candidate =>
        candidate.data.world === expected.world && candidate.indexInWorld === expected.petIndex,
      );
      if (!matchingPet) {
        throw new Error(`Breeding pet record ${expected.petId} at world ${expected.world}, index ${expected.petIndex} not found`);
      }
      pet = matchingPet;
    });

    it('matches the native species identity', () => {
      expect(pet.data.petId).toBe(expected.petId);
    });

    it('matches active Shiny progression and inactive bonus state with the game', () => {
      const debugInfo = {
        world: expected.world,
        petIndex: expected.petIndex,
        shinyProgress: pet.shinyProgress,
      };
      expect(pet.shinyProgress).toMatchLiveGameWithDetails(expected.progress, {
        tolerance: 0,
        context: `${expected.petId} Shiny progress`,
        debugInfo,
      });

      // The game uses Shiny levels and requirements only for pets with positive Shiny progress.
      if (expected.progress > 0) {
        expect(pet.shinyLevel).toMatchLiveGameWithDetails(expected.level, {
          tolerance: 0,
          context: `${expected.petId} active Shiny level`,
          debugInfo,
        });
        expect(pet.getNextShinyGoal()).toMatchLiveGameWithDetails(expected.requirement, {
          tolerance: 0,
          context: `${expected.petId} active next Shiny requirement`,
          debugInfo,
        });
      } else {
        expect(pet.getShinyBonus()).toBe(0);
      }
    });
  });

  it.each(bonusIndices)('matches aggregate Shiny bonus %i with the game', index => {
    const expected = shinyBonuses.find(bonus => bonus.index === index);
    if (!expected) throw new Error(`Native Shiny bonus record ${index} not found`);

    const bonus = breeding.shinyBonuses.find(candidate => candidate.data.index === index);
    if (!bonus) throw new Error(`Breeding Shiny bonus record ${index} not found`);

    expect(bonus.getBonus()).toMatchLiveGameWithDetails(expected.bonus, {
      tolerance: 0,
      context: `Shiny bonus ${index}: ${bonus.data.text}`,
      debugInfo: {
        index,
        totalLevels: bonus.totalLevels,
      },
    });
  });
});
