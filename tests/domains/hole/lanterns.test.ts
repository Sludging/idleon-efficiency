import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { assertPairedContext, captured, coreNumber, decodedSave } from './part1-test-helpers';

interface CapturedInventory {
 order: string[];
 quantity: number[];
 characters: { playerId: number; playerName: string; order: string[]; quantity: number[] }[];
}

describe('Hole Blinding Lantern stock, locations and separate daily usage', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;
 let inventory: CapturedInventory;

 beforeAll(() => {
  results = loadExtractionResults('hole-lanterns-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
  inventory = captured<CapturedInventory>(results, 'lantern_inventory_inputs');
 });

 it('pairs real storage and all character inventory slots without assuming stock from usage', () => {
  assertPairedContext(results, data);
  expect(inventory.order).toEqual(decodedSave<string[]>('ChestOrder'));
  expect(inventory.quantity).toEqual(decodedSave<number[]>('ChestQuantity'));
  const players = data.get('players') as Player[];
  expect(inventory.characters.map(player => player.playerId)).toEqual(players.map(player => player.playerID));
  inventory.characters.forEach(player => {
   expect(player.playerName).toBe(players.find(candidate => candidate.playerID === player.playerId)!.playerName);
   expect(player.order).toEqual(decodedSave<string[]>(`InventoryOrder_${player.playerId}`));
   expect(player.quantity).toEqual(decodedSave<number[]>(`ItemQTY_${player.playerId}`));
  });
 });

 it('keeps storage stock separate from every named character location', () => {
  expect(hole.lanterns.itemId).toBe('Quest90');
  expect(hole.lanterns.name).toBe('Blinding Lantern');
  expect(hole.lanterns.locations).toHaveLength(inventory.characters.length + 1);
  expect(hole.lanterns.locations[0]).toMatchObject({ kind: 'storage', playerId: null, playerName: null, unavailableReason: null });
  coreNumber(hole.lanterns.locations[0].quantity, results, 'lantern_storage', 'Blinding Lantern storage stock');
  inventory.characters.forEach(player => {
   const locations = hole.lanterns.locations.filter(location => location.playerId === player.playerId);
   expect(locations).toHaveLength(1);
   expect(locations[0]).toMatchObject({ kind: 'character', playerId: player.playerId, playerName: player.playerName, unavailableReason: null });
   const quantity = player.order.reduce((total, id, index) => total + (id === 'Quest90' ? Number(player.quantity[index]) : 0), 0);
   expect(locations[0].quantity).toMatchLiveGameWithDetails(quantity, {
    tolerance: 0, context: `${player.playerName} Blinding Lantern inventory stock`,
   });
  });
  coreNumber(hole.lanterns.totalStock, results, 'lantern_stock', 'Total Blinding Lantern stock');
 });

 it('reports usage out of 12 and two-hour accrual independently of inventory', () => {
  coreNumber(hole.lanterns.usesToday, results, 'lantern_usage', 'Account Blinding Lantern uses today');
  expect(hole.lanterns.usageUnavailableReason).toBeNull();
  expect(hole.lanterns.dailyLimit).toBe(12);
  expect(hole.lanterns.hoursPerUse).toBe(2);
  expect(hole.lanterns.totalStock).toBeGreaterThan(0);
  expect(hole.lanterns.usesToday).toBe(0);
 });
});
