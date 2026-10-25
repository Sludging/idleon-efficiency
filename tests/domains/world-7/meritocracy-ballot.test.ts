import { Meritocraty } from '../../../data/domain/world-7/meritocraty';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type MeritocracyState = {
  currentBonusIndex: number;
  candidateIndices: [number, number, number];
  candidatePercents: [number, number, number];
  canVote: boolean;
  haveReachedW7: boolean;
};

type PotentialBonus = {
  index: number;
  contribution: number;
  factor: number;
};

type BallotWeek = {
  unixTimeSeconds: number;
  selectedSlot: number;
  savedVotePeriod: number;
  currentPeriod: number;
  secondsUntilRotation: number;
  nextRotationAt: number;
  hasVotedThisWeek: number;
};

// These cover all three candidates and the active effect in the retained save.
const potentialCases = [
  { index: 7, effect: 'Monument Reward Multi candidate' },
  { index: 19, effect: 'Masterclass AFK items candidate' },
  { index: 26, effect: 'Statue bonuses candidate' },
  { index: 24, effect: 'active Brain Coral daily Grind Time levels effect' },
];

const bonusIndices = Array.from({ length: 28 }, (_, index) => index);

describe('Meritocracy Ballot core results', () => {
  let meritocracy: Meritocraty;
  let extractionResults: ExtractionResults;
  let state: MeritocracyState;
  let earned: number[];
  let potential: PotentialBonus[];
  let week: BallotWeek;

  beforeAll(() => {
    extractionResults = loadExtractionResults('vote-ballot-data.json');
    validateExtractionHealth(extractionResults);
    meritocracy = loadGameDataFromSave('latest').get('meritocraty') as Meritocraty;
    state = extractionResults.extractions.meritocracy_state.result as MeritocracyState;
    earned = extractionResults.extractions.meritocracy_earned.result as number[];
    potential = extractionResults.extractions.meritocracy_potential.result as PotentialBonus[];
    week = extractionResults.extractions.meritocracy_week.result as BallotWeek;
  });

  it('matches the saved active bonus and the next three candidate IDs', () => {
    expect(meritocracy.currentBonusIndex).toBe(state.currentBonusIndex);
    expect([
      meritocracy.ongoingVoteTopOptionIndex,
      meritocracy.ongoingVoteMiddleOptionIndex,
      meritocracy.ongoingVoteBottomOptionIndex,
    ]).toEqual(state.candidateIndices);
  });

  it.each([0, 1, 2])('matches candidate %i vote percentage', (slot) => {
    const percentages = [
      meritocracy.ongoingVoteTopOptionPercent,
      meritocracy.ongoingVoteMiddleOptionPercent,
      meritocracy.ongoingVoteBottomOptionPercent,
    ];

    expect(percentages[slot]).toMatchLiveGameWithDetails(state.candidatePercents[slot], {
      tolerance: 0,
      context: `Meritocracy Ballot candidate slot ${slot} vote percentage`,
      debugInfo: { candidateIndex: state.candidateIndices[slot] },
    });
  });

  it('matches World 7 access and the Demonflesh voting unlock', () => {
    expect(meritocracy.haveReachedW7).toBe(state.haveReachedW7);
    expect(meritocracy.canVote).toBe(state.canVote);
  });

  it('matches the next Meritocracy reset and remaining seconds at the native capture time', () => {
    const nextRotationAt = meritocracy.getNextRotationAt(week.unixTimeSeconds);

    expect(nextRotationAt).toBe(week.nextRotationAt);
    expect(nextRotationAt - week.unixTimeSeconds).toMatchLiveGameWithDetails(week.secondsUntilRotation, {
      tolerance: 0,
      context: 'Meritocracy seconds until the next weekly reset',
      debugInfo: { unixTimeSeconds: week.unixTimeSeconds, nextRotationAt },
    });
  });

  it('matches whether the retained account records a Meritocracy vote for the captured week', () => {
    expect(Number(meritocracy.hasVotedThisWeek(week.unixTimeSeconds))).toMatchLiveGameWithDetails(week.hasVotedThisWeek, {
      tolerance: 0,
      context: 'Meritocracy saved current-week participation',
      debugInfo: {
        unixTimeSeconds: week.unixTimeSeconds,
        selectedSlot: week.selectedSlot,
        savedVotePeriod: week.savedVotePeriod,
        currentPeriod: week.currentPeriod,
      },
    });
  });

  it('matches the settled account multiplier applied to Meritocracy effects', () => {
    expect(meritocracy.getBonusMultiplier()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'meritocracy_multiplier'),
      {
        tolerance: 0,
        context: 'Meritocracy Ballot account-wide multiplier',
        debugInfo: {
          haveReachedW7: meritocracy.haveReachedW7,
          canVote: meritocracy.canVote,
        },
      },
    );
  });

  // The complete small catalogue checks the saved active effect and every inactive result.
  it.each(bonusIndices)('matches the earned contribution for bonus %i', (index) => {
    expect(meritocracy.getCurrentBonus(index)).toMatchLiveGameWithDetails(earned[index], {
      tolerance: 0,
      context: `Meritocracy Ballot earned contribution for bonus ${index}`,
      debugInfo: { currentBonusIndex: meritocracy.currentBonusIndex },
    });
  });

  it('retains all four extracted candidate and active-effect preview cases', () => {
    expect(potential.map(({ index }) => index)).toEqual(potentialCases.map(({ index }) => index));
  });

  it.each(potentialCases)('matches the potential contribution and factor for $effect', ({ index, effect }) => {
    const expected = potential.find((bonus) => bonus.index === index)!;

    expect(meritocracy.getPotentialBonus(index)).toMatchLiveGameWithDetails(expected.contribution, {
      tolerance: 0,
      context: `Meritocracy Ballot ${effect} potential contribution`,
      debugInfo: { index },
    });
    expect(meritocracy.getPotentialBonusMultiplier(index)).toMatchLiveGameWithDetails(expected.factor, {
      tolerance: 0,
      context: `Meritocracy Ballot ${effect} potential factor`,
      debugInfo: { index },
    });
  });
});
