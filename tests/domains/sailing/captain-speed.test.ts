import { Boat, Captain, Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'sailing-captain-speed-data.json';

type CaptainSpeedRecord = [
  index: number,
  tier: number,
  firstTraitId: number,
  secondTraitId: number,
  level: number,
  firstBase: number,
  secondBase: number,
  firstSpeedContribution: number,
  secondSpeedContribution: number,
  speedBonus: number,
];

describe('Sailing captain speed bonus', () => {
  let extractionResults: ExtractionResults;
  let sailing: Sailing;
  let records: CaptainSpeedRecord[];
  let supportedRecords: CaptainSpeedRecord[];

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    sailing = loadGameDataFromSave(saveName).get('sailing') as Sailing;

    const save = loadTestSave(saveName);
    const captainRows = JSON.parse(save.get('Captains') as string) as number[][];
    const sailingRows = JSON.parse(save.get('Sailing') as string) as number[][];
    records = JSON.parse(extractionResults.extractions.captain_speed_records.result) as CaptainSpeedRecord[];
    expect(records.map(record => record.slice(0, 7))).toEqual(
      captainRows.map((captain, index) => [index, captain[0], captain[1], captain[2], captain[3], captain[5], captain[6]]),
    );

    const unlockedCaptainCount = Math.round(sailingRows[2][0] + 1);
    supportedRecords = records.filter(record =>
      (record[0] < unlockedCaptainCount && record[1] !== -1) || record[0] >= records.length - 4,
    );

    expect([...sailing.captains, ...sailing.shopCaptains].map(captain => captain.index)).toEqual(
      supportedRecords.map(record => record[0]),
    );
  });

  it('matches each supported captain speed-trait contribution without rounding', () => {
    const captains = [...sailing.captains, ...sailing.shopCaptains];

    supportedRecords.forEach(record => {
      const [index, tier, firstTraitId, secondTraitId, level, firstBase, secondBase, firstContribution, secondContribution] = record;
      const captain = captains.find(candidate => candidate.index === index) as Captain;
      const sourceSlots = [
        { slot: 1, traitId: firstTraitId, base: firstBase, contribution: firstContribution },
        { slot: 2, traitId: secondTraitId, base: secondBase, contribution: secondContribution },
      ].filter(slot => slot.traitId > -1);

      expect(captain.traits).toHaveLength(sourceSlots.length);
      sourceSlots.forEach((slot, traitPosition) => {
        expect(captain.traits[traitPosition].traitIndex).toBe(slot.traitId);
        if (slot.traitId === 0) {
          expect(captain.traits[traitPosition].currentBonus).toMatchLiveGameWithDetails(slot.contribution, {
            tolerance: 0,
            context: `Captain ${index} slot ${slot.slot} speed contribution`,
            debugInfo: { tier, level, base: slot.base },
          });
        }
      });
    });
  });

  it('applies each supported captain result through Boat.getSpeedValue', () => {
    const captains = [...sailing.captains, ...sailing.shopCaptains];

    supportedRecords.forEach(record => {
      const [index, tier, firstTraitId, secondTraitId, level, firstBase, secondBase, firstContribution, secondContribution, speedBonus] = record;
      const captain = captains.find(candidate => candidate.index === index);
      const boat = new Boat(0, undefined, 0, 0, 0, captain);
      boat.speedBaseMathWithoutStarSign = 1;

      const captainFreeBaseline = boat.getSpeedValue({
        starSignEquipped: false,
        silkRodeEquipped: false,
        includeCaptain: false,
      });
      const actual = boat.getSpeedValue({
        starSignEquipped: false,
        silkRodeEquipped: false,
        includeCaptain: true,
      });
      const expected = captainFreeBaseline * (1 + speedBonus / 100);

      expect(actual).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: `Captain ${index} Boat.getSpeedValue aggregation`,
        debugInfo: {
          tier,
          level,
          traitIds: [firstTraitId, secondTraitId],
          bases: [firstBase, secondBase],
          extractedContributions: [firstContribution, secondContribution],
          extractedBonus: speedBonus,
          captainFreeBaseline,
        },
      });
    });
  });

  it('leaves controlled boat speed unchanged without a captain', () => {
    const boat = new Boat(0, undefined, 0, 0, 0, undefined);
    boat.speedBaseMathWithoutStarSign = 1;
    const baseline = boat.getSpeedValue({ starSignEquipped: false, silkRodeEquipped: false, includeCaptain: false });
    const actual = boat.getSpeedValue({ starSignEquipped: false, silkRodeEquipped: false, includeCaptain: true });
    const extractedNoCaptainBonus = extractionResults.extractions.no_captain_speed_bonus.result;

    expect(extractedNoCaptainBonus).toBe(0);
    expect(actual).toMatchLiveGameWithDetails(baseline * (1 + extractedNoCaptainBonus / 100), {
      tolerance: 0,
      context: 'Boat.getSpeedValue without an assigned captain',
    });
  });
});
