import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec, runParameterValidationSuite } from '../../utils/parameter-test-config';
import { Sailing } from '../../../data/domain/sailing';
import { Divinity } from '../../../data/domain/divinity';
import { Card } from '../../../data/domain/cards';
import { Alchemy } from '../../../data/domain/alchemy';
import { Votes } from '../../../data/domain/world-2/votes';
import { Stamp } from '../../../data/domain/world-1/stamps';
import { PlayerStatues } from '../../../data/domain/statues';
import { Cooking } from '../../../data/domain/cooking';
import { Rift, SkillMastery } from '../../../data/domain/rift';
import { Worship, TotalizerBonus } from '../../../data/domain/worship';
import { StarSigns } from '../../../data/domain/starsigns';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { SlabInfluencedArtifact } from '../../../data/domain/sailing/artifacts';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'latest';
const extractionResultsName = 'sailing-speed-data.json';

export const sailingSpeedParameterSpecs: Record<string, ParameterTestSpec> = {
  divinity_minor_bonus_6: {
    id: 'divinity_minor_bonus_6',
    description: 'Divinity minor bonus for Purrmep (god 6)',
    extractionKey: 'divinity_minor_bonus_6',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      const purrmepPlayer = divinity.gods[6].linkedPlayers.at(0);
      return purrmepPlayer ? divinity.gods[6].getMinorLinkBonus(purrmepPlayer) : 0;
    }
  },
  card_w5c1_bonus: {
    id: 'card_w5c1_bonus',
    description: 'Card w5c1 bonus',
    extractionKey: 'card_w5c1_bonus',
    domainExtractor: (gameData) => {
      const cards = gameData.get("cards") as Card[];
      return cards.find(card => card.id === "w5c1")?.getBonus() ?? 0;
    }
  },
  card_boss5a_bonus: {
    id: 'card_boss5a_bonus',
    description: 'Card Boss5A bonus',
    extractionKey: 'card_boss5a_bonus',
    domainExtractor: (gameData) => {
      const cards = gameData.get("cards") as Card[];
      return cards.find(card => card.id === "Boss5A")?.getBonus() ?? 0;
    }
  },
  alchemy_bubble_y1: {
    id: 'alchemy_bubble_y1',
    description: 'Alchemy bubble Y1 (yellow bubble 1)',
    extractionKey: 'alchemy_bubble_y1',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getBubbleBonusForKey("Y1");
    }
  },
  davey_jones_bonus: {
    id: 'davey_jones_bonus',
    description: 'Davey Jones bonus',
    extractionKey: 'davey_jones_bonus',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.boats[0]?.daveyJonesBonus ?? 1;
    }
  },
  divinity_blessing_4: {
    id: 'divinity_blessing_4',
    description: 'Divinity blessing bonus for god 4',
    extractionKey: 'divinity_blessing_4',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      return divinity.gods[4].getBlessingBonus();
    }
  },
  divinity_blessing_6: {
    id: 'divinity_blessing_6',
    description: 'Divinity blessing bonus for god 6 (Purrmep)',
    extractionKey: 'divinity_blessing_6',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      return divinity.gods[6].getBlessingBonus();
    }
  },
  voting_bonus_24: {
    id: 'voting_bonus_24',
    description: 'Voting bonus 24',
    extractionKey: 'voting_bonus_24',
    domainExtractor: (gameData) => {
      const votes = gameData.get("votes") as Votes;
      return votes.getCurrentBonus(24);
    }
  },
  divinity_blessing_9: {
    id: 'divinity_blessing_9',
    description: 'Divinity blessing bonus for god 9',
    extractionKey: 'divinity_blessing_9',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      return divinity.gods[9].getBlessingBonus();
    }
  },
  artifact_10_bonus: {
    id: 'artifact_10_bonus',
    description: 'Sailing artifact 10 bonus',
    extractionKey: 'artifact_10_bonus',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return (sailing.artifacts[10] as SlabInfluencedArtifact).getBonus();
    }
  },
  stamp_sailspd_bonus: {
    id: 'stamp_sailspd_bonus',
    description: 'Stamp bonus for SailSpd',
    extractionKey: 'stamp_sailspd_bonus',
    domainExtractor: (gameData) => {
      const stamps = gameData.get("stamps") as Stamp[][];
      return stamps.flatMap(tab => tab).reduce((sum, stamp) => 
        sum += stamp.data.effect == "SailSpd" ? stamp.getBonus() : 0, 0);
    }
  },
  statue_24_bonus: {
    id: 'statue_24_bonus',
    description: 'Statue 24 bonus',
    extractionKey: 'statue_24_bonus',
    domainExtractor: (gameData) => {
      const statues = gameData.get("statues") as PlayerStatues[];
      return statues[0].statues[24].getBonus();
    }
  },
  meal_bonus_sailing: {
    id: 'meal_bonus_sailing',
    description: 'Meal bonus for Sailing',
    extractionKey: 'meal_bonus_sailing',
    domainExtractor: (gameData) => {
      const cooking = gameData.get("cooking") as Cooking;
      return cooking.getMealBonusForKey("Sailing");
    }
  },
  alchemy_vial_sailspd: {
    id: 'alchemy_vial_sailspd',
    description: 'Alchemy vial SailSpd bonus',
    extractionKey: 'alchemy_vial_sailspd',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getVialBonusForKey("SailSpd");
    }
  },
  rift_skill_bonus_sailing: {
    id: 'rift_skill_bonus_sailing',
    description: 'Rift skill mastery bonus for sailing (skill index 12)',
    extractionKey: 'rift_skill_bonus_sailing',
    domainExtractor: (gameData) => {
      const rift = gameData.get("rift") as Rift;
      const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;
      return skillMastery.getSkillBonus(SkillsIndex.Sailing, 1);
    }
  },
  worship_msa_bonus_2: {
    id: 'worship_msa_bonus_2',
    description: 'Worship MSA bonus 2 (boat speed)',
    extractionKey: 'worship_msa_bonus_2',
    domainExtractor: (gameData) => {
      const worship = gameData.get("worship") as Worship;
      return worship.totalizer.getBonus(TotalizerBonus.BoatSpeed);
    }
  },
  starsign_63_bonus: {
    id: 'starsign_63_bonus',
    description: 'Star sign 63 (C. Shanti Minor) bonus',
    extractionKey: 'starsign_63_bonus',
    domainExtractor: (gameData) => {
      const starSigns = gameData.get("starsigns") as StarSigns;
      return starSigns.unlockedStarSigns.find(sign => sign.name == "C. Shanti Minor")?.getBonus("Sailing SPD") ?? 0;
    }
  },
  minimum_travel_time: {
    id: 'minimum_travel_time',
    description: 'Minimum travel time for sailing',
    extractionKey: 'minimum_travel_time',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.boats[0]?.minTravelTime ?? 120;
    }
  },
  boat_0_captain_index: {
    id: 'boat_0_captain_index',
    description: 'Boat 0 captain index',
    extractionKey: 'boat_0_captain_index',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.boats[0]?.captain?.index ?? -1;
    }
  },
  boat_0_island_index: {
    id: 'boat_0_island_index',
    description: 'Boat 0 island index',
    extractionKey: 'boat_0_island_index',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.boats[0]?.assignIsland?.index ?? -1;
    }
  },
  boat_0_speed_upgrades: {
    id: 'boat_0_speed_upgrades',
    description: 'Boat 0 speed upgrade level',
    extractionKey: 'boat_0_speed_upgrades',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.boats[0]?.speedUpgrades ?? 0;
    }
  },
  boat_1_captain_index: {
    id: 'boat_1_captain_index',
    description: 'Boat 1 captain index',
    extractionKey: 'boat_1_captain_index',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.boats[1]?.captain?.index ?? -1;
    }
  },
  boat_1_island_index: {
    id: 'boat_1_island_index',
    description: 'Boat 1 island index',
    extractionKey: 'boat_1_island_index',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.boats[1]?.assignIsland?.index ?? -1;
    }
  },
  boat_1_speed_upgrades: {
    id: 'boat_1_speed_upgrades',
    description: 'Boat 1 speed upgrade level',
    extractionKey: 'boat_1_speed_upgrades',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.boats[1]?.speedUpgrades ?? 0;
    }
  }
};

describe('Sailing Domain - Speed - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  
  beforeAll(() => {
    // Load live game extraction results
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    
    // Load matching save data - MUST correspond to the same game state as extraction
    try {
      gameData = loadGameDataFromSave(saveName);
    } catch (error: any) {
      throw new Error(`❌ Failed to load save data: ${error.message}`);
    }
  });

  describe('Parameter Validation', () => {
    it('validates all sailing speed parameters against extracted results', () => {
      // Run table-driven parameter validation
      const parameterResults = runParameterValidationSuite(
        sailingSpeedParameterSpecs,
        extractionResults,
        gameData
      );
      
      // Ensure we validated at least some parameters
      expect(parameterResults.length).toBeGreaterThan(0);

      // Log results for each parameter
      let passedCount = 0;
      let failures: string[] = [];
      parameterResults.forEach(result => {
        if (result.passed) {
          passedCount++;
          // Only log successes in verbose mode
          testLog(result.notes || `✅ ${result.parameterId}: passed`, 'debug');
        } else {
          // Log ALL failures for debugging
          testLog(`❌ ${result.parameterId}: ${result.error}`, 'always');
          
          failures.push(result.parameterId);
        }
      });
      testLog(`📊 Parameter Validation: ${passedCount}/${parameterResults.length} passed`, 'always');
      
      // FAIL THE TEST IMMEDIATELY if parameters don't match
      if (failures.length > 0) {
        const failureDetails = failures.map(paramId => {
          const result = parameterResults.find(r => r.parameterId === paramId);
          return `${paramId}: ${result?.error}`;
        }).join('\n   ');
        
        throw new Error(`Parameter validation failed:\n   ${failureDetails}\n\nThis indicates save data doesn't match live game state.`);
      }
    });
  });

  describe('Boat Speed Calculations', () => {
    it('validates boat 0 current speed calculation', () => {
      const sailing = gameData.get("sailing") as Sailing;
      const boat = sailing.boats[0];
      
      if (!boat) {
        throw new Error('Boat 0 not found');
      }

      const extractedSpeed = extractionResults.extractions.boat_0_current_speed.result;
      const calculatedSpeed = boat.getSpeedValue({ 
        starSignEquipped: true, 
        silkRodeEquipped: false,
        includeCaptain: true,
        islandBound: false
      });

      testLog(`Boat 0 Current Speed - Extracted: ${extractedSpeed}, Calculated: ${calculatedSpeed}`, 'always');
      
      expect(calculatedSpeed).toBeCloseTo(extractedSpeed, 2);
    });

    it('validates boat 0 next speed level calculation', () => {
      const sailing = gameData.get("sailing") as Sailing;
      const boat = sailing.boats[0];
      
      if (!boat) {
        throw new Error('Boat 0 not found');
      }

      const extractedSpeed = extractionResults.extractions.boat_0_next_speed.result;
      const calculatedSpeed = boat.getSpeedValue({ 
        starSignEquipped: true, 
        silkRodeEquipped: false,
        speedUpgrades: boat.speedUpgrades + 1,
        includeCaptain: true,
        islandBound: false
      });

      testLog(`Boat 0 Next Speed - Extracted: ${extractedSpeed}, Calculated: ${calculatedSpeed}`, 'always');
      
      expect(calculatedSpeed).toBeCloseTo(extractedSpeed, 2);
    });

    it('validates boat 0 island-bound speed calculation', () => {
      const sailing = gameData.get("sailing") as Sailing;
      const boat = sailing.boats[0];
      
      if (!boat) {
        throw new Error('Boat 0 not found');
      }

      const extractedSpeed = extractionResults.extractions.boat_0_island_bound_speed.result;
      const calculatedSpeed = boat.getSpeedValue({ 
        starSignEquipped: true, 
        silkRodeEquipped: false,
        includeCaptain: true,
        islandBound: true
      });

      testLog(`Boat 0 Island-Bound Speed - Extracted: ${extractedSpeed}, Calculated: ${calculatedSpeed}`, 'always');
      
      expect(calculatedSpeed).toBeCloseTo(extractedSpeed, 2);
    });

    it('validates boat 1 current speed calculation', () => {
      const sailing = gameData.get("sailing") as Sailing;
      const boat = sailing.boats[1];
      
      if (!boat) {
        throw new Error('Boat 1 not found');
      }

      const extractedSpeed = extractionResults.extractions.boat_1_current_speed.result;
      const calculatedSpeed = boat.getSpeedValue({ 
        starSignEquipped: true, 
        silkRodeEquipped: false,
        includeCaptain: true,
        islandBound: false
      });

      testLog(`Boat 1 Current Speed - Extracted: ${extractedSpeed}, Calculated: ${calculatedSpeed}`, 'always');
      
      expect(calculatedSpeed).toBeCloseTo(extractedSpeed, 2);
    });

    it('validates boat 1 next speed level calculation', () => {
      const sailing = gameData.get("sailing") as Sailing;
      const boat = sailing.boats[1];
      
      if (!boat) {
        throw new Error('Boat 1 not found');
      }

      const extractedSpeed = extractionResults.extractions.boat_1_next_speed.result;
      const calculatedSpeed = boat.getSpeedValue({ 
        starSignEquipped: true, 
        silkRodeEquipped: false,
        speedUpgrades: boat.speedUpgrades + 1,
        includeCaptain: true,
        islandBound: false
      });

      testLog(`Boat 1 Next Speed - Extracted: ${extractedSpeed}, Calculated: ${calculatedSpeed}`, 'always');
      
      expect(calculatedSpeed).toBeCloseTo(extractedSpeed, 2);
    });

    it('validates boat 1 island-bound speed calculation', () => {
      const sailing = gameData.get("sailing") as Sailing;
      const boat = sailing.boats[1];
      
      if (!boat) {
        throw new Error('Boat 1 not found');
      }

      const extractedSpeed = extractionResults.extractions.boat_1_island_bound_speed.result;
      const calculatedSpeed = boat.getSpeedValue({ 
        starSignEquipped: true, 
        silkRodeEquipped: false,
        includeCaptain: true,
        islandBound: true
      });

      testLog(`Boat 1 Island-Bound Speed - Extracted: ${extractedSpeed}, Calculated: ${calculatedSpeed}`, 'always');
      
      expect(calculatedSpeed).toBeCloseTo(extractedSpeed, 2);
    });
  });
});
