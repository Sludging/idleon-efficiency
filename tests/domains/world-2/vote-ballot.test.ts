import { Votes } from '../../../data/domain/world-2/votes';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type BallotState = {
  currentBonusIndex: number;
  candidateIndices: [number, number, number];
  candidatePercents: [number, number, number];
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

const bonusSourceKeys = [
  'crystalCuttlefish',
  'equinox',
  'cosmo',
  'summoning',
  'eventShop7',
  'eventShop16',
  'mashedPotato',
  'palette',
  'legendTalent',
  'sushi',
] as const;

type BonusSources = Record<(typeof bonusSourceKeys)[number], number>;

// The retained save has three candidates and an active mixed Divinity effect.
const potentialCases = [
  { index: 11, effect: '3D Printer resources candidate' },
  { index: 20, effect: 'Artifact Find chance candidate' },
  { index: 21, effect: 'Gaming new species chance candidate' },
  { index: 23, effect: 'active Divinity points and EXP effect' },
];

const bonusIndices = Array.from({ length: 35 }, (_, index) => index);

describe('Bonus Ballot core results', () => {
  let votes: Votes;
  let extractionResults: ExtractionResults;
  let state: BallotState;
  let earned: number[];
  let potential: PotentialBonus[];
  let sources: BonusSources;
  let week: BallotWeek;

  beforeAll(() => {
    extractionResults = loadExtractionResults('vote-ballot-data.json');
    validateExtractionHealth(extractionResults);
    votes = loadGameDataFromSave('latest').get('votes') as Votes;
    state = extractionResults.extractions.bonus_state.result as BallotState;
    earned = extractionResults.extractions.bonus_earned.result as number[];
    potential = extractionResults.extractions.bonus_potential.result as PotentialBonus[];
    sources = extractionResults.extractions.bonus_sources.result as BonusSources;
    week = extractionResults.extractions.bonus_week.result as BallotWeek;
  });

  it('matches the current bonus and the next three candidate IDs', () => {
    expect(votes.currentBonusIndex).toBe(state.currentBonusIndex);
    expect([
      votes.ongoingVoteTopOptionIndex,
      votes.ongoingVoteMiddleOptionIndex,
      votes.ongoingVoteBottomOptionIndex,
    ]).toEqual(state.candidateIndices);
  });

  it.each([0, 1, 2])('matches candidate %i vote percentage', (slot) => {
    const percentages = [
      votes.ongoingVoteTopOptionPercent,
      votes.ongoingVoteMiddleOptionPercent,
      votes.ongoingVoteBottomOptionPercent,
    ];

    expect(percentages[slot]).toMatchLiveGameWithDetails(state.candidatePercents[slot], {
      tolerance: 0,
      context: `Bonus Ballot candidate slot ${slot} vote percentage`,
      debugInfo: { candidateIndex: state.candidateIndices[slot] },
    });
  });

  it('matches the next Bonus Ballot reset and remaining seconds at the native capture time', () => {
    const nextRotationAt = votes.getNextRotationAt(week.unixTimeSeconds);

    expect(nextRotationAt).toBe(week.nextRotationAt);
    expect(nextRotationAt - week.unixTimeSeconds).toMatchLiveGameWithDetails(week.secondsUntilRotation, {
      tolerance: 0,
      context: 'Bonus Ballot seconds until the next weekly reset',
      debugInfo: { unixTimeSeconds: week.unixTimeSeconds, nextRotationAt },
    });
  });

  it('matches whether the retained account records a Bonus Ballot vote for the captured week', () => {
    expect(Number(votes.hasVotedThisWeek(week.unixTimeSeconds))).toMatchLiveGameWithDetails(week.hasVotedThisWeek, {
      tolerance: 0,
      context: 'Bonus Ballot saved current-week participation',
      debugInfo: {
        unixTimeSeconds: week.unixTimeSeconds,
        selectedSlot: week.selectedSlot,
        savedVotePeriod: week.savedVotePeriod,
        currentPeriod: week.currentPeriod,
      },
    });
  });

  it('matches the settled account multiplier applied to Bonus Ballot effects', () => {
    expect(votes.getBonusMultiplier()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'bonus_multiplier'),
      {
        tolerance: 0,
        context: 'Bonus Ballot account-wide multiplier',
        debugInfo: {
          additiveSources: votes.bonusSources,
          additiveGroup: votes.multiFromBonuses,
          poppyContribution: votes.multiFromCompanion161,
          meritocracyContribution: votes.multiFromMeritocraty,
        },
      },
    );
  });

  // The complete small catalogue checks the earned winner and every inactive result.
  it.each(bonusIndices)('matches the earned contribution for bonus %i', (index) => {
    expect(votes.getCurrentBonus(index)).toMatchLiveGameWithDetails(earned[index], {
      tolerance: 0,
      context: `Bonus Ballot earned contribution for bonus ${index}`,
      debugInfo: { currentBonusIndex: votes.currentBonusIndex },
    });
  });

  it('retains all four extracted candidate and active-effect preview cases', () => {
    expect(potential.map(({ index }) => index)).toEqual(potentialCases.map(({ index }) => index));
  });

  it.each(potentialCases)('matches the potential contribution and factor for $effect', ({ index, effect }) => {
    const expected = potential.find((bonus) => bonus.index === index)!;

    expect(votes.getPotentialBonus(index)).toMatchLiveGameWithDetails(expected.contribution, {
      tolerance: 0,
      context: `Bonus Ballot ${effect} potential contribution`,
      debugInfo: { index },
    });
    expect(votes.getPotentialBonusMultiplier(index)).toMatchLiveGameWithDetails(expected.factor, {
      tolerance: 0,
      context: `Bonus Ballot ${effect} potential factor`,
      debugInfo: { index },
    });
  });

  it.each(bonusSourceKeys)('matches the numeric %s multiplier source', (source) => {
    expect(votes.bonusSources[source]).toMatchLiveGameWithDetails(sources[source], {
      tolerance: 0,
      context: `Bonus Ballot ${source} percentage-point contribution`,
    });
  });
});
