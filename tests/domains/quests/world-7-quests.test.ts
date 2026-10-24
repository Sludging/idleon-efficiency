import { Quests } from '../../../data/domain/quests';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';

const extractionResultsName = 'world-7-quests-data.json';

const questCases = [
  {
    npcName: 'Sad Urie',
    questName: 'Urie Wants to be a Millionaire',
    completionKey: 'Sad_Urie1',
    extractionLabel: 'quest_sad_urie_1',
  },
  {
    npcName: 'Snootie',
    questName: 'Lost Possum',
    completionKey: 'Snootie1',
    extractionLabel: 'quest_snootie_1',
  },
  {
    npcName: 'Snootie',
    questName: 'Lost Amber',
    completionKey: 'Snootie2',
    extractionLabel: 'quest_snootie_2',
  },
  {
    npcName: 'Snootie',
    questName: 'Lost Doll',
    completionKey: 'Snootie3',
    extractionLabel: 'quest_snootie_3',
  },
  {
    npcName: 'Bloo Radley',
    questName: 'To Guide a Shypig',
    completionKey: 'Bloo_Radley1',
    extractionLabel: 'quest_bloo_radley_1',
  },
  {
    npcName: 'Bloo Radley',
    questName: "The Hero's Journey",
    completionKey: 'Bloo_Radley2',
    extractionLabel: 'quest_bloo_radley_2',
  },
  {
    npcName: 'Toobus Goobus',
    questName: 'TUNNEL EXPLORING',
    completionKey: 'Toobus_Goobus1',
    extractionLabel: 'quest_toobus_goobus_1',
  },
  {
    npcName: 'Toobus Goobus',
    questName: 'FEAR HOLE! FEAR HOLE!',
    completionKey: 'Toobus_Goobus2',
    extractionLabel: 'quest_toobus_goobus_2',
  },
  {
    npcName: 'Toobus Goobus',
    questName: 'READING CHALLENGE',
    completionKey: 'Toobus_Goobus3',
    extractionLabel: 'quest_toobus_goobus_3',
  },
  {
    npcName: 'Toobus Goobus',
    questName: 'RESEARCH STUDIES',
    completionKey: 'Toobus_Goobus4',
    extractionLabel: 'quest_toobus_goobus_4',
  },
  {
    npcName: 'Zenelith',
    questName: '1 Million Statues',
    completionKey: 'Zenelith1',
    extractionLabel: 'quest_zenelith_1',
  },
  {
    npcName: 'Wavey Wayne',
    questName: 'Briny Tasks',
    completionKey: 'Wavey_Wayne1',
    extractionLabel: 'quest_wavey_wayne_1',
  },
];

describe('World 7 quest catalogue and character completion', () => {
  let quests: Quests;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    quests = loadGameDataFromSave('latest').get('quests') as Quests;
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
  });

  // Cover every World 7 quest, including completed and not-started quests in the retained save.
  it.each(questCases)(
    'lists $questName from $npcName and matches its character completion state',
    ({ npcName, questName, completionKey, extractionLabel }) => {
      const npc = quests.npcData[npcName];
      expect(npc.data.head.world).toBe('Shimmerfin Deep');

      const quest = npc.data.quests[questName];
      expect(quest).toMatchObject({ Name: questName });
      expect(quest.QuestName.replace(/ /g, '_')).toBe(completionKey);

      expect(extractionResults.extractions[extractionLabel].result).toEqual(expect.any(Number));
      const expected = getExtractedValue(extractionResults, extractionLabel);
      expect(quests.playerData[TARGET_PLAYER_INDEX][completionKey]).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: `${questName} completion state for character ${TARGET_PLAYER_INDEX}`,
        debugInfo: { npcName, questName, completionKey, extractionLabel },
      });
    },
  );
});
