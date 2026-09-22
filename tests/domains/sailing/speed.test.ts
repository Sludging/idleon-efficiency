/**
 * Sailing Speed Calculation Tests
 * 
 * @testCovers Boat.getSpeedValue
 */

import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Boat, Sailing } from '../../../data/domain/world-5/sailing/sailing';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'latest';
const extractionResultsName = 'sailing-speed-data.json';

describe('Sailing Domain - Speed', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let sailing: Sailing;

 beforeAll(() => {
  // Load live game extraction results
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  // Load matching save data - MUST correspond to the same game state as extraction
  try {
   gameData = loadGameDataFromSave(saveName);

   // Get fully configured sailing domain
   sailing = gameData.get('sailing') as Sailing;
   if (!sailing) {
    throw new Error('Sailing domain not found in save data');
   }

  } catch (error: any) {
   throw new Error(`❌ Failed to load save data: ${error.message}`);
  }
 });

 describe('Boat Speed Calculations', () => {
  it('validates boat 0 current speed calculation', () => {
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

   expect(calculatedSpeed).toMatchLiveGameWithDetails(extractedSpeed, {
    tolerance: 0,
    context: 'Boat 0 current speed calculation',
   });
  });

  it('validates boat 0 next speed level calculation', () => {
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

   expect(calculatedSpeed).toMatchLiveGameWithDetails(extractedSpeed, {
    tolerance: 0,
    context: 'Boat 0 next speed level calculation',
   });
  });

  it('validates boat 0 island-bound speed calculation', () => {
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

   expect(calculatedSpeed).toMatchLiveGameWithDetails(extractedSpeed, {
    tolerance: 0,
    context: 'Boat 0 island-bound speed calculation',
   });
  });

  it('validates boat 1 current speed calculation', () => {
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

   expect(calculatedSpeed).toMatchLiveGameWithDetails(extractedSpeed, {
    tolerance: 0,
    context: 'Boat 1 current speed calculation',
   });
  });

  it('validates boat 1 next speed level calculation', () => {
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

   expect(calculatedSpeed).toMatchLiveGameWithDetails(extractedSpeed, {
    tolerance: 0,
    context: 'Boat 1 next speed level calculation',
   });
  });

  it('validates boat 1 island-bound speed calculation', () => {
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

   expect(calculatedSpeed).toMatchLiveGameWithDetails(extractedSpeed, {
    tolerance: 0,
    context: 'Boat 1 island-bound speed calculation',
   });
  });
 });

 describe('Deterministic BoatSpeed branches', () => {
  const makeBoat = (speedUpgrades: number, assignIsland?: Island) => {
   const boat = new Boat(0, assignIsland, 0, 0, speedUpgrades, undefined);
   boat.speedBaseMathWithoutStarSign = 1;
   return boat;
  };

  it('does not cap an unassigned boat in island-bound mode', () => {
   const boat = makeBoat(6);

   expect(boat.getSpeedValue({
    starSignEquipped: false,
    silkRodeEquipped: false,
    includeCaptain: false,
    islandBound: true,
   })).toBe(40);
  });

  it('does not cap an assigned boat while it is in a nonzero route state', () => {
   const boat = makeBoat(6, { data: { distance: 1 } } as Island);
   Object.assign(boat, { routeState: 1 });

   expect(boat.getSpeedValue({
    starSignEquipped: false,
    silkRodeEquipped: false,
    includeCaptain: false,
    islandBound: true,
   })).toBe(40);
  });

  it('applies the level-7 squared speed-upgrade milestone', () => {
   const levelSixBoat = makeBoat(6);
   const levelSevenBoat = makeBoat(7);
   const options = {
    starSignEquipped: false,
    silkRodeEquipped: false,
    includeCaptain: false,
    islandBound: false,
   };

   expect(levelSixBoat.getSpeedValue(options)).toBe(40);
   expect(levelSevenBoat.getSpeedValue(options)).toBe(52);
  });
 });
});
