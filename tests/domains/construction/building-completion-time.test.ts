import type { Construction } from '../../../data/domain/world-3/construction/construction';
import type { Player } from '../../../data/domain/player';
import { getTargetPlayer } from '../../utils/target-player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Construction building completion time', () => {
  it('projects an eligible occupied building at normal and trimmed build speeds', () => {
    const workResults = loadExtractionResults('construction-building-time-data.json');
    const rateResults = loadExtractionResults('construction-cog-build-rate-data.json');
    const multiplierResults = loadExtractionResults('construction-trimmed-build-speed-data.json');
    [workResults, rateResults, multiplierResults].forEach(validateExtractionHealth);

    const work = workResults.extractions.building_work.result as {
      slot: number; index: number; level: number; progress: number; required: number; maxLevel: number;
    };
    const rate = getExtractedValue(rateResults, 'construction_cog_build_rate');
    const multiplier = getExtractedValue(multiplierResults, 'construction_trimmed_multiplier');
    const gameData = loadGameDataFromSave('latest');
    const construction = gameData.get('construction') as Construction;
    const building = construction.buildings[work.index];
    const timing = construction.getBuildingTiming(getTargetPlayer(gameData.get('players') as Player[])).buildings[work.index];

    expect(construction.buildingSlots[work.slot]).toBe(work.index);
    expect(building.level).toBe(work.level);
    expect(building.currentXP).toBe(work.progress);
    expect(building.maxLvl).toBe(work.maxLevel);
    expect(work.level).toBeLessThan(work.maxLevel);
    expect(building.maxed).toBe(false);
    expect(work.required).toBeGreaterThan(work.progress);
    expect(rate).toBeGreaterThan(0);
    expect(multiplier).toBeGreaterThan(0);

    // Game 1.24 adds work per hour to each occupied slot; trimmed slots apply the native multiplier.
    // These constant-rate projections are not native game ETA values.
    const remainingWork = work.required - work.progress;
    expect(timing.normalCompletionSeconds).toMatchLiveGameWithDetails(remainingWork * 3600 / rate, {
      tolerance: 0,
      context: `Normal completion seconds for building ${work.index}`,
    });
    expect(timing.trimmedCompletionSeconds).toMatchLiveGameWithDetails(remainingWork * 3600 / (rate * multiplier), {
      tolerance: 0,
      context: `Trimmed completion seconds for building ${work.index}`,
    });
  });

  it('prepares the fastest character projection for the account', () => {
    const gameData = loadGameDataFromSave('latest');
    const construction = gameData.get('construction') as Construction;
    const players = gameData.get('players') as Player[];
    const timings = players.map(player => construction.getBuildingTiming(player));
    const fastest = timings.reduce((best, timing) =>
      timing.normalBuildSpeed > best.normalBuildSpeed ? timing : best
    );

    expect(construction.bestBuildingTiming).toEqual(fastest);
    expect(construction.bestBuildingTiming!.buildings).toHaveLength(construction.buildings.length);
    const fastestIndex = timings.findIndex(timing => timing.normalBuildSpeed === fastest.normalBuildSpeed);
    expect(construction.bestBuildingTiming!.playerID).toBe(players[fastestIndex].playerID);
    expect(construction.bestBuildingTiming!.playerName).toBe(players[fastestIndex].playerName);
    expect(construction.bestBuildingTiming!.lowerBuildRatePercent).toBe(0);
    expect(construction.buildingTimingComparison).toHaveLength(players.length);
    construction.buildingTimingComparison.forEach((comparison, index) => {
      expect(comparison.playerID).toBe(players[index].playerID);
      expect(comparison.playerName).toBe(players[index].playerName);
      expect(comparison.normalBuildSpeed).toBe(timings[index].normalBuildSpeed);
      const expectedPercent = fastest.normalBuildSpeed > 0
        ? (fastest.normalBuildSpeed - timings[index].normalBuildSpeed) / fastest.normalBuildSpeed * 100
        : 0;
      expect(comparison.lowerBuildRatePercent).toBeCloseTo(expectedPercent);
    });
  });
});
