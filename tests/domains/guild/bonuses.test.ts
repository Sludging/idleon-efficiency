import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Guild } from '../../../data/domain/guild';

const saveName = 'latest';
const extractionResultsName = 'guild-bonuses-data.json';

const liveBonusCases = Array.from({ length: 17 }, (_, index) => ({
  index,
  extractionKey: `guild_bonus_${index}`,
}));

describe('Guild Domain - Raw Bonus Effects', () => {
  let extractionResults: ExtractionResults;
  let guild: Guild;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave(saveName);
    guild = gameData.get('guild') as Guild;

    if (!guild) {
      throw new Error('Guild domain not found in save data');
    }
  });

  liveBonusCases.forEach(({ index, extractionKey }) => {
    it(`matches the raw game effect for Guild bonus ${index}`, () => {
      const bonus = guild.guildBonuses.find(candidate => candidate.index === index);
      if (!bonus) {
        throw new Error(`Guild bonus ${index} is missing from save data`);
      }

      const liveValue = getExtractedValue(extractionResults, extractionKey);
      expect(bonus.getBonus()).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Raw effect for Guild bonus ${index}`,
        debugInfo: {
          saveName,
          level: bonus.level,
        },
      });
    });
  });
  it('matches the raw percentage shown for a standard Guild bonus', () => {
    const bonus = guild.guildBonuses[2];
    const liveValue = getExtractedValue(extractionResults, 'guild_bonus_2');
    expect(bonus.getBonusDisplayValue()).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Raw percentage displayed for a standard Guild bonus',
      debugInfo: {
        saveName,
        level: bonus.level,
      },
    });
  });
  it('matches the Guild Point percentage shown for small Guilds', () => {
    const bonus = guild.guildBonuses[9];
    const liveValue = getExtractedValue(extractionResults, 'guild_bonus_9_display_percentage');
    expect(bonus.getBonusDisplayValue()).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Guild Point percentage displayed for small Guilds',
      debugInfo: {
        saveName,
        level: bonus.level,
        rawBonus: bonus.getBonus(),
      },
    });
  });
  it('matches the small Guild bonus member limit used for Guild Point rewards', () => {
    const liveValue = getExtractedValue(extractionResults, 'guild_member_limit');
    expect(guild.getSmallGuildBonusMemberLimit()).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Small Guild bonus member limit for Guild Point rewards',
      debugInfo: {
        saveName,
        guildBonus9Level: guild.guildBonuses[9].level,
      },
    });
  });
});
