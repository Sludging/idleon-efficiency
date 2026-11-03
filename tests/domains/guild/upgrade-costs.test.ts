import { Guild, GuildBonus } from '../../../data/domain/guild';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'guild-upgrade-costs-data.json';

interface GuildCostCapture {
  index: number;
  level: number;
  upgradeCost: number;
  costToMax: number;
}

// These 17 records are the real Guild bonuses. The final repository record is filler.
const bonusIndices = Array.from({ length: 17 }, (_, index) => index);

describe('Guild bonus upgrade costs', () => {
  let guild: Guild;
  let savedLevels: number[];
  let nativeCosts: GuildCostCapture[];

  beforeAll(() => {
    guild = loadGameDataFromSave(saveName).get('guild') as Guild;
    const savedGuild = JSON.parse(loadTestSave(saveName).get('Guild') as string) as number[][];
    savedLevels = savedGuild[0];
    const results: ExtractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(results);
    nativeCosts = results.extractions.guild_bonus_costs.result;
    expect(nativeCosts.map(cost => cost.index)).toEqual(bonusIndices);
  });

  const getBonus = (index: number): GuildBonus => {
    const bonus = guild.guildBonuses.find(candidate => candidate.index === index);
    if (!bonus) {
      throw new Error(`Guild bonus ${index} is missing from the prepared account`);
    }
    return bonus;
  };

  it.each(bonusIndices)('preserves the saved level for Guild bonus %i', index => {
    const bonus = getBonus(index);
    expect(bonus.level).toMatchLiveGameWithDetails(savedLevels[index], {
      tolerance: 0,
      context: `Saved level for ${bonus.name}`,
    });
  });

  it.each(bonusIndices)('matches the next-level GP quote for Guild bonus %i', index => {
    const bonus = getBonus(index);
    const expected = nativeCosts[index];
    expect(expected.level).toBe(savedLevels[index]);
    expect(bonus.getUpgradeCost()).toMatchLiveGameWithDetails(expected.upgradeCost, {
      tolerance: 0,
      context: `Next-level Guild Point quote for ${bonus.name}`,
      debugInfo: { saveName, level: bonus.level, maxLevel: bonus.maxLevel },
    });
  });

  it.each(bonusIndices)('matches the remaining GP cost to max Guild bonus %i', index => {
    const bonus = getBonus(index);
    const expected = nativeCosts[index];
    expect(expected.level).toBe(savedLevels[index]);
    expect(bonus.getCostToMax()).toMatchLiveGameWithDetails(expected.costToMax, {
      tolerance: 0,
      context: `Remaining Guild Points to reach maximum level for ${bonus.name}`,
      debugInfo: { saveName, level: bonus.level, maxLevel: bonus.maxLevel },
    });
  });
});
