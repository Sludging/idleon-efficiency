/**
 * Hourly Royal Guardian Outpost collection for a developed outpost and the
 * raw calculated rate for the saved empty row, which is not forced to zero.
 * Player-specific bonuses use the player selected by the matching extraction
 * configuration.
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { Player } from '../../../data/domain/player';
import { ClassIndex } from '../../../data/domain/talents';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { RoyalArmory, getRoyalGuardianContribution } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { HandleRawDataKey } from '../../../data/domain/base/domain';
import { initAllItems } from '../../../data/domain/items';
import { initAccountDataKeys, updateIdleonData } from '../../../data/domain/idleonData';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { getTargetPlayer } from '../../utils/target-player';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-resource-rate-data.json';
const extractedPlayerID = 3;
const rateCases = [
 { mapIndex: 1, extractionKey: 'royal_armory_rate_row_1', description: 'developed outpost row 1' },
 { mapIndex: 0, extractionKey: 'royal_armory_rate_row_0_empty', description: 'empty outpost row 0' },
] as const;

describe('Royal Armory hourly outpost collection', () => {
 let extractionResults: ExtractionResults;
 let royalArmory: RoyalArmory;
 let player: Player;
 let alchemy: Alchemy;
 let players: Player[];

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const gameData = loadGameDataFromSave(saveName);
  royalArmory = gameData.get('royalArmory') as RoyalArmory;
  alchemy = gameData.get('alchemy') as Alchemy;
  players = gameData.get('players') as Player[];
  const matchingPlayer = players.find(candidate => candidate.playerID === extractedPlayerID);
  if (!matchingPlayer) {
   throw new Error(`The paired save has no player ${extractedPlayerID} from the extraction state.`);
  }
  player = matchingPlayer;
 });

 rateCases.forEach(({ mapIndex, extractionKey, description }) => {
  it(`matches the game's hourly collection for ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = royalArmory.mapStates.get(mapIndex)!.getResourceCollectionRate(
    royalArmory.resourceCollectionBonuses,
    getRoyalGuardianContribution(player, alchemy),
   );

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory hourly collection for ${description}`,
   });
  });
 });
 // This real-save invariant checks website selection, not paired best-RG game parity.
 it('uses the highest collection-rate Royal Guardian from the actual account roster', () => {
  const outpost = royalArmory.mapStates.get(1)!;
  const guardians = players.filter(candidate => candidate.classId === ClassIndex.Royal_Guardian);
  if (guardians.length === 0) {
   throw new Error('The real-save selection regression requires an eligible Royal Guardian.');
  }
  const candidates = guardians.map(candidate => ({
   playerID: candidate.playerID,
   rate: outpost.getResourceCollectionRate(
    royalArmory.resourceCollectionBonuses,
    getRoyalGuardianContribution(candidate, alchemy),
   ),
  }));
  const selected = candidates.find(candidate => candidate.playerID === royalArmory.selectedRoyalGuardian?.playerID);
  if (!selected) throw new Error('The account-selected character must be an eligible Royal Guardian.');
  const bestRate = Math.max(...candidates.map(candidate => candidate.rate));
  // This fixture has one eligible Royal Guardian, so it does not prove multi-character selection.
  expect(selected.rate).toBe(bestRate);
  expect(royalArmory.getOutpostResourceRate(1)).toBe(bestRate);
 });

 it('clears a parsed or reparsed outpost collection rate until account calculations prepare it again', () => {
  const save = loadTestSave(saveName);
  const accountData = initAccountDataKeys(initAllItems());
  const lifecycleArmory = accountData.get('royalArmory') as RoyalArmory;
  const charNames = save.get('playerNames') as string[];
  const companions = normalizeCompanionStates(save.get('companions'));
  const serverVars = save.get('servervars');
  const parseData = new Map<string, any>([['royalArmory', lifecycleArmory]]);
  lifecycleArmory.getRawKeys().forEach(raw => HandleRawDataKey(raw, parseData, save, charNames.length));
  const liveValue = getExtractedValue(extractionResults, 'royal_armory_rate_row_1');

  for (let pass = 0; pass < 2; pass++) {
   lifecycleArmory.parse(parseData);
   if (!lifecycleArmory.mapStates.get(1)?.isOutpost()) {
    throw new Error('The paired lifecycle save must contain constructed Outpost 1.');
   }
   expect(lifecycleArmory.mapStates.get(1)!.getResourceCollectionRate(
    lifecycleArmory.resourceCollectionBonuses,
    getRoyalGuardianContribution(player, alchemy),
   )).toBe(0);

   const calculated = updateIdleonData(accountData, save, charNames, companions, serverVars, true).getData();
   const currentPlayer = getTargetPlayer(calculated.get('players') as Player[], extractedPlayerID);
   expect(lifecycleArmory.mapStates.get(1)!.getResourceCollectionRate(
    lifecycleArmory.resourceCollectionBonuses,
    getRoyalGuardianContribution(currentPlayer, calculated.get('alchemy') as Alchemy),
   )).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory collection after ${pass === 0 ? 'initial parsing' : 'reparsing'} and ordered account calculations`,
   });
  }
 });
});
