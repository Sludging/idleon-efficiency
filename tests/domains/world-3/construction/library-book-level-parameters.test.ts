import { initLibraryMetadataRepo } from '../../../../data/domain/data/LibraryMetadataRepo';
import { TaskBoard } from '../../../../data/domain/tasks';
import { Sigils } from '../../../../data/domain/world-2/alchemy/sigils';
import { SaltLick } from '../../../../data/domain/world-3/construction/saltLick';
import { Breeding } from '../../../../data/domain/world-4/breeding';
import { Cooking } from '../../../../data/domain/world-4/cooking';
import { Sailing } from '../../../../data/domain/world-5/sailing/sailing';
import { Summoning } from '../../../../data/domain/world-6/summoning';
import { loadGameDataFromSave } from '../../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../../utils/live-game-data-loader';

const metadata = initLibraryMetadataRepo()[0].data;
const parameters = [
  { key: 'fury_relic', description: 'Fury Relic book level bonus', value: (data: Map<string, any>) => (data.get('sailing') as Sailing).artifacts[21].getBonus() },
  { key: 'summoning_winner', description: 'Summoning winner book level bonus', value: (data: Map<string, any>) => (data.get('summoning') as Summoning).getSummoningWinnerBonusFromIndex(19) },
  { key: 'salt_lick', description: 'Spontaneity Salts book level bonus', value: (data: Map<string, any>) => (data.get('saltLick') as SaltLick).getBonus(4) },
  { key: 'world_3_merit', description: 'World 3 merit book level bonus', value: (data: Map<string, any>) => (data.get('taskboard') as TaskBoard).merits[18].getBonus() },
  { key: 'vip_meal', description: 'VIP meal membership bonus', value: (data: Map<string, any>) => (data.get('cooking') as Cooking).getMealBonusForKey('VIP') },
  { key: 'vip_arena_1', description: 'first VIP Arena reward unlock', value: (data: Map<string, any>) => Number((data.get('breeding') as Breeding).hasBonus(metadata.arenaMembershipBonuses[0].arenaBonusIndex)) },
  { key: 'vip_arena_10', description: 'second VIP Arena reward unlock', value: (data: Map<string, any>) => Number((data.get('breeding') as Breeding).hasBonus(metadata.arenaMembershipBonuses[1].arenaBonusIndex)) },
  { key: 'vip_sigil', description: 'VIP sigil membership bonus', value: (data: Map<string, any>) => (data.get('sigils') as Sigils).sigils[15].getBonus() },
];

describe('Library book level parameters', () => {
  const results = loadExtractionResults('library-book-level-data.json');
  let data: Map<string, any>;

  beforeAll(() => {
    validateExtractionHealth(results);
    data = loadGameDataFromSave('latest');
  });

  for (const parameter of parameters) {
    it(`matches ${parameter.description}`, () => {
      expect(parameter.value(data)).toMatchLiveGame(getExtractedValue(results, parameter.key), 0);
    });
  }
});
