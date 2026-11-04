import { Guild, GuildBonus } from '../../../data/domain/guild';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';

// Exclude the final placeholder, which has a maximum level of zero.
const bonusIndices = Array.from({ length: 17 }, (_, index) => index);

describe('Guild bonus upgrade levels', () => {
  let guild: Guild;
  let savedLevels: number[];

  beforeAll(() => {
    guild = loadGameDataFromSave(saveName).get('guild') as Guild;
    const savedGuild = JSON.parse(loadTestSave(saveName).get('Guild') as string) as number[][];
    savedLevels = savedGuild[0];
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
});
