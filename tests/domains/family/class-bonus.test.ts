/**
 * Family Class Bonus calculation tests.
 *
 * TalentCalc(-3) rebuilds FamBonusQTYs from each character's class lineage.
 * Branch 0 is stored at `2 * classId`. Unowned classes contribute zero.
 * The comparisons use Family's public API rather than the static bonus mapping.
 *
 * The delivered source has placeholder fields for branch 1 for these class
 * IDs, and Family currently exposes only branch-0 FamilyBonus values, so no
 * branch-1 state is invented here.
 *
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Family } from '../../../data/domain/family';
import { ClassIndex } from '../../../data/domain/talents';
import { Player } from '../../../data/domain/player';
import { getTargetPlayer } from '../../utils/target-player';


const saveName = 'latest';
const extractionResultsName = 'family-class-bonus-data.json';

type FamilyBonusCase = {
 classIndex: ClassIndex;
 gameKey: number;
 description: string;
};

const branchZeroCases: FamilyBonusCase[] = [
 { classIndex: ClassIndex.Beginner, gameKey: 2, description: 'Beginner' },
 { classIndex: ClassIndex.Journeyman, gameKey: 4, description: 'Journeyman' },
 { classIndex: ClassIndex.Maestro, gameKey: 6, description: 'Maestro' },
 { classIndex: ClassIndex.Voidwalker, gameKey: 8, description: 'Voidwalker' },
 { classIndex: ClassIndex.Warrior, gameKey: 14, description: 'Warrior' },
 { classIndex: ClassIndex.Barbarian, gameKey: 16, description: 'Barbarian' },
 { classIndex: ClassIndex.Squire, gameKey: 18, description: 'Squire' },
 { classIndex: ClassIndex.Blood_Berserker, gameKey: 20, description: 'Blood Berserker' },
 { classIndex: ClassIndex.Divine_Knight, gameKey: 24, description: 'Divine Knight' },
 { classIndex: ClassIndex.Death_Bringer, gameKey: 28, description: 'Death Bringer' },
 { classIndex: ClassIndex.Royal_Guardian, gameKey: 32, description: 'Royal Guardian' },
 { classIndex: ClassIndex.Archer, gameKey: 38, description: 'Archer' },
 { classIndex: ClassIndex.Bowman, gameKey: 40, description: 'Bowman' },
 { classIndex: ClassIndex.Hunter, gameKey: 42, description: 'Hunter' },
 { classIndex: ClassIndex.Siege_Breaker, gameKey: 44, description: 'Siege Breaker' },
 { classIndex: ClassIndex.Beast_Master, gameKey: 50, description: 'Beast Master' },
 { classIndex: ClassIndex.Wind_Walker, gameKey: 58, description: 'Wind Walker' },
 { classIndex: ClassIndex.Mage, gameKey: 62, description: 'Mage' },
 { classIndex: ClassIndex.Wizard, gameKey: 64, description: 'Wizard' },
 { classIndex: ClassIndex.Shaman, gameKey: 66, description: 'Shaman' },
 { classIndex: ClassIndex.Elemental_Sorcerer, gameKey: 68, description: 'Elemental Sorcerer' },
 { classIndex: ClassIndex.Bubonic_Conjuror, gameKey: 72, description: 'Bubonic Conjuror' },
 { classIndex: ClassIndex.Arcane_Cultist, gameKey: 80, description: 'Arcane Cultist' },
];

describe('Family Domain - Class Bonus', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;
 let family: Family;
 let players: Player[];
 let player: Player;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  family = gameData.get('family') as Family;
  players = gameData.get('players') as Player[];
  player = getTargetPlayer(players);
 });

 branchZeroCases.forEach(({ classIndex, gameKey, description }) => {

  it(`matches the game ${description} Family Bonus (FamBonusQTYs[${gameKey}])`, () => {
   const liveBonus = getExtractedValue(extractionResults, `family_bonus_${gameKey}`);
   const domainBonus = family.getClassBonus(classIndex)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: `Family ${description} class bonus (FamBonusQTYs[${gameKey}])`,
   });
  });
 });
});

