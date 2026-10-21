import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Menagerie } from '../../../data/domain/menagerie';

const extractionResultsName = 'menagerie-lumi-inputs-data.json';

let extractionResults: ExtractionResults;
let menagerie: Menagerie;
let expectedLumiRate: number;

beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  expectedLumiRate = getExtractedValue(extractionResults, 'lumi_rate') as number;
  const accountData = loadGameDataFromSave('latest');
  menagerie = accountData.get('menagerie') as Menagerie;
});

describe('Menagerie Lumi saved inputs', () => {
  it('uses saved Crucible unlock progression for native bonus branches', () => {
    const lumiInputs = menagerie.getLumiSaveInputs();

    expect(lumiInputs.crucibleBonus4).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'crucible_4'),
      { tolerance: 0, context: 'Crucible bonus 4 contribution' },
    );
    expect(lumiInputs.crucibleBonus14).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'crucible_14'),
      { tolerance: 0, context: 'Crucible bonus 14 contribution' },
    );
  });
  it('maps every modeled native Lumi rate factor from the paired account', () => {
    const inputs = menagerie.getLumiInputs();
    const expectedInputs = {
      coralKidBonus10: 'coral_kid_10',
      arcadeBonus73: 'arcade_73',
      menagerieBonus1: 'menagerie_bonus_1',
      researchBonus165: 'research_165',
      purpleJellyBonus: 'purple_jelly_0',
      crucibleBonus4: 'crucible_4',
      crucibleBonus14: 'crucible_14',
      yellowConstructionBonus: 'yellow_construction_3',
      atomBonus16: 'atom_16',
      zenithMarketBonus11: 'zenith_11',
      dancingCoralBonus6: 'dancing_coral_6',
      lumiVialBonus: 'lumi_vial',
      researchBonus164: 'research_164',
      cardLevel: 'w7b10_card_level',
    } as const;

    Object.entries(expectedInputs).forEach(([name, label]) => {
      expect(inputs[name as keyof typeof inputs]).toMatchLiveGameWithDetails(
        getExtractedValue(extractionResults, label),
        { tolerance: 0, context: `Native Lumi input ${name}` },
      );
    });
  });
  it('reports the native source-ordered Lumi rate for the paired account', () => {
    expect(menagerie.getProgression().lumiPerHour).toMatchLiveGameWithDetails(
      expectedLumiRate,
      { tolerance: 0, context: 'Native Menagerie Lumi per hour' },
    );
  });
});
