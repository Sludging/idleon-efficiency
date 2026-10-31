import { Account } from '../../../data/domain/account';
import { WeeklyBoss } from '../../../data/domain/weekly-boss';
import { WeeklyShopSectionEnum } from '../../../data/domain/enum/weeklyShopSectionEnum';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import extractionConfig from '../../configs/weekly-bosses.json';

interface NativeWeeklyPacket {
  weekly: { h: Record<string, number> };
  options: number[];
  players: string[];
  catalogs: {
    boss: string[][];
    shop: string[][][];
    task: string[][];
  };
  generation: [null, number, number, number[], number, number, number[]];
  clock: { h: { GlobalTime: number } };
  operands: { name: string; levels: number[]; greenResidual: number }[];
  greenPortalRequirement: number;
  currentQuantity: number;
  materialCapacity: number;
}

interface NativeKillPacket {
  bossId: number;
  killMaps: { mapIndex: number; portalRequirement: number; residuals: number[] }[];
}


function compareNumber(actual: number | undefined, expected: number, context: string): void {
  expect(actual).toMatchLiveGameWithDetails(expected, { tolerance: 0, context });
}

describe('Weekly Bosses account state and numeric stats', () => {
  let weeklyBoss: WeeklyBoss;
  let native: NativeWeeklyPacket;
  let nativeKills: NativeKillPacket;

  beforeAll(() => {
    const results = loadExtractionResults('weekly-bosses-data.json');
    validateExtractionHealth(results);
    native = JSON.parse(results.extractions.native_weekly_packet.result) as NativeWeeklyPacket;
    nativeKills = JSON.parse(results.extractions.native_weekly_kill_operands.result) as NativeKillPacket;
    weeklyBoss = (loadGameDataFromSave('latest').get('account') as Account).weeklyBoss;
  });

  it('matches Trophies, current character, saved battle week, and account-clock week', () => {
    compareNumber(weeklyBoss.trophies, native.options[8], 'Weekly Bosses Trophy balance');
    compareNumber(weeklyBoss.currentCharacterIndex, native.options[5], 'Current Weekly Battle character slot');
    compareNumber(weeklyBoss.savedBattleWeekNumber, native.options[11], 'Saved Weekly Battle week');
    // Native weeks use Unix seconds divided by seven days.
    const nativeWeek = Math.floor(native.clock.h.GlobalTime / 604800);
    compareNumber(weeklyBoss.currentWeekNumber, nativeWeek, 'Weekly schedule anchored to account clock');
  });

  it('matches the current boss, four shop offers, and every character task', () => {
    const week = weeklyBoss.getWeek(0);
    const nativeWeek = Math.floor(native.clock.h.GlobalTime / 604800);
    compareNumber(week.weekNumber, nativeWeek, 'Current schedule week');
    compareNumber(week.startsAtSeconds, nativeWeek * 604800, 'Current week starts Thursday at 00:00 UTC');
    compareNumber(week.endsAtSeconds, (nativeWeek + 1) * 604800, 'Current week ends Thursday at 00:00 UTC');
    compareNumber(week.bossId, nativeKills.bossId, 'Current native boss identity');

    // Native offer indices are local to UI or Items. Generated shop IDs are global.
    const uiEntries = weeklyBoss.shopEntries.filter(entry => entry.data.section === WeeklyShopSectionEnum.UI);
    const itemEntries = weeklyBoss.shopEntries.filter(entry => entry.data.section === WeeklyShopSectionEnum.Items);
    const nativeOffers = native.generation[6];
    const expectedShopIds = [
      uiEntries[nativeOffers[0]].index,
      uiEntries[nativeOffers[1]].index,
      itemEntries[nativeOffers[2]].index,
      itemEntries[nativeOffers[3]].index,
    ];
    expect(week.shopEntryIds).toEqual(expectedShopIds);
    expect(week.turns).toHaveLength(native.players.length);
    week.turns.forEach((turn, playerIndex) => {
      compareNumber(turn.playerIndex, playerIndex, `Account order for Weekly Battle character ${playerIndex}`);
      compareNumber(turn.taskId, native.generation[3][playerIndex], `Task for Weekly Battle character ${playerIndex}`);
    });
  });

  it('matches the native current-turn quantity', () => {
    const contextPlayerIndex = extractionConfig.requiredActivePlayerIndex;
    const week = weeklyBoss.getWeek(0);
    const currentTurn = week.turns[weeklyBoss.currentCharacterIndex];
    compareNumber(
      weeklyBoss.getTaskQuantity(currentTurn.playerIndex, currentTurn.taskId, contextPlayerIndex),
      native.currentQuantity,
      'Direct native quantity for the saved current turn',
    );

  });

  it('matches material capacity for the saved turn character and active character', () => {
    const targetPlayerIndex = native.options[5];
    const contextPlayerIndex = extractionConfig.requiredActivePlayerIndex;
    // Task 15 uses the dedicated other-character branch, not ordinary material capacity.
    compareNumber(
      weeklyBoss.getTaskQuantity(targetPlayerIndex, 15, contextPlayerIndex),
      native.materialCapacity,
      `Material capacity for turn character ${targetPlayerIndex} with active character ${contextPlayerIndex}`,
    );
  });

  it('matches every native shop price and observed appearance ownership', () => {
    const sections = [WeeklyShopSectionEnum.UI, WeeklyShopSectionEnum.Items];
    sections.forEach((section, sectionIndex) => {
      const entries = weeklyBoss.shopEntries.filter(entry => entry.data.section === section);
      native.catalogs.shop[sectionIndex].forEach((observed, localIndex) => {
        const shopEntryId = entries[localIndex].index;
        compareNumber(
          weeklyBoss.shopEntries[shopEntryId].data.cost,
          Number(observed[1]),
          `Trophy price for shop entry ${shopEntryId}`,
        );
        const ownershipKey = `UI_${String.fromCharCode(97 + localIndex)}`;
        const expectedOwned = Object.keys(native.weekly.h).length === 0
          ? undefined
          : section === WeeklyShopSectionEnum.UI && native.weekly.h[ownershipKey] === 1;
        expect(weeklyBoss.isUIOwned(shopEntryId)).toBe(expectedOwned);
      });
    });
  });

  it('retains defeated difficulty, optional bonus absence, and completed and unfinished dreams', () => {
    compareNumber(weeklyBoss.defeatedDifficultiesThisWeek, native.options[9], 'Highest difficulty defeated this week');
    expect(weeklyBoss.getClassExperienceBonusPoints()).toBe(native.weekly.h.c);
    expect(weeklyBoss.getDamageBonusPoints()).toBe(native.weekly.h.g);
    Object.entries(native.weekly.h).forEach(([key, progress]) => {
      const challenge = /^d_(\d+)$/.exec(key);
      if (challenge) {
        expect(weeklyBoss.isDreamChallengeCompleted(Number(challenge[1]))).toBe(progress === -1);
      }
    });
  });

});
