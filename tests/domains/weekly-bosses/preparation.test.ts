import { Account } from '../../../data/domain/account';
import { WeeklyBoss, WeeklyBossPreparation } from '../../../data/domain/weekly-boss';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

interface NativeWeeklyPacket {
  players: string[];
  generation: [null, number, number, number[]];
  clock: { h: { GlobalTime: number } };
  operands: { levels: number[]; greenResidual: number }[];
  greenPortalRequirement: number;
  currentQuantity: number;
  materialCapacity: number;
}


function compareNumber(actual: number | undefined, expected: number, context: string): void {
  expect(actual).toMatchLiveGameWithDetails(expected, { tolerance: 0, context });
}

// Prepared account state remains read-only. These tests do not execute a battle.
describe('Weekly Bosses saved preparation', () => {
  let weeklyBoss: WeeklyBoss;
  let native: NativeWeeklyPacket;
  let preparation: WeeklyBossPreparation;


  beforeAll(() => {
    const results = loadExtractionResults('weekly-bosses-data.json');
    validateExtractionHealth(results);
    native = JSON.parse(results.extractions.native_weekly_packet.result) as NativeWeeklyPacket;
    weeklyBoss = (loadGameDataFromSave('latest').get('account') as Account).weeklyBoss;
    preparation = weeklyBoss.getPreparation();
  });

  it('groups native requirements in first-assignment order and retains account order within each group', () => {
    const nativeTaskIds = native.generation[3].slice(0, native.players.length);
    const expectedTaskIds = [...new Set(nativeTaskIds)];
    expect(preparation.groups.map(group => group.taskId)).toEqual(expectedTaskIds);
    compareNumber(preparation.week.weekNumber, Math.floor(native.clock.h.GlobalTime / 604800), 'Prepared current account week');
    expect(preparation.week).toEqual(weeklyBoss.getWeek(0));
    expect(preparation.week.turns).toHaveLength(native.players.length);

    preparation.groups.forEach(group => {
      const expectedPlayerIndices = nativeTaskIds.flatMap((taskId, playerIndex) => taskId === group.taskId ? [playerIndex] : []);
      expect(group.characters.map(character => character.playerIndex)).toEqual(expectedPlayerIndices);
    });
  });

});
