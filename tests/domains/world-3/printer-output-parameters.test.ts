import { Compass } from '../../../data/domain/compass';
import { Lab } from '../../../data/domain/world-4/lab';
import { Printer, Sample, updatePrinter, INDEX_DAYS_SINCE_SAMPLE_LEGENDTALENT } from '../../../data/domain/world-3/construction/printer';
import { Rift, SkillMastery } from '../../../data/domain/world-4/rift';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { Votes } from '../../../data/domain/world-2/votes';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'printer-output-data.json';

const getActivePrintingTotalBoost = (gameData: Map<string, unknown>): number => {
  const printer = gameData.get('printer') as Printer;
  const activeSample = printer.samples.flat().find(sample => sample.printing > 0);
  if (!activeSample) {
    throw new Error('Expected the paired latest save to contain an actively printed sample');
  }
  return activeSample.printingTotalBoost;
};
const parameterSpecs: Record<string, ParameterTestSpec> = {
  sailing_gold_relic_tier_increment: {
    description: 'Gold Relic artifact 4 tier increment used in Printer sample growth (Sailing ArtifactBonus(4, 1))',
    extractionKey: 'sailing_gold_relic_tier_increment',
    domainExtractor: gameData => {
      const goldRelic = (gameData.get('sailing') as Sailing).artifacts[4];
      return goldRelic.getTierIncrement();
    },
  },
  account_max_talent_178: {
    description: 'Highest attainable King of the Remembered bonus across characters, before the orb-kill multiplier',
    extractionKey: 'best_divine_knight_talent_178',
    domainExtractor: gameData => (gameData.get('printer') as Printer).accountTalent178Bonus,
  },
  rift_skill_mastery_printer_output: {
    description: 'Skill Mastery aggregate Printer-output bonus (RiftSkillETC index 3)',
    extractionKey: 'rift_skill_mastery_printer_output',
    domainExtractor: gameData => {
      const rift = gameData.get('rift') as Rift;
      const skillMastery = rift.bonuses.find(bonus => bonus.name === 'Skill Mastery') as SkillMastery;
      return skillMastery.getTotalBonusByIndex(5);
    },
  },
  voting_bonus_11: {
    description: 'Vote bonus 11 Printer resource-production multiplier',
    extractionKey: 'voting_bonus_11',
    domainExtractor: gameData => (gameData.get('votes') as Votes).getCurrentBonus(11),
  },
  compass_upgrade_43: {
    description: 'Moon of Print Compass upgrade 43 calculated Printer-growth contribution',
    extractionKey: 'compass_upgrade_43',
    domainExtractor: gameData => (gameData.get('compass') as Compass).upgrades.find(upgrade => upgrade.id === 43)?.bonus ?? 0,
  },
  mainframe_bonus_1: {
    description: 'Wired In Lab bonus value (2 with the Printer branch active, 1 otherwise)',
    extractionKey: 'mainframe_bonus_1',
    domainExtractor: gameData => (gameData.get('lab') as Lab).bonuses[1].getBonus(),
  },
  printer_addition_extra_printing: {
    description: 'Account-wide AdditionExtraPrinting boost used by per-character ExtraPrinting',
    extractionKey: 'printer_addition_extra_printing',
    domainExtractor: getActivePrintingTotalBoost,
  },
};


describe('Printer output - mapped inputs', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, unknown>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });



  Object.entries(parameterSpecs).forEach(([, spec]) => {
    it(`matches ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
  it("matches Companion 17's cached effect at its active level", () => {
    const gameEffect = getExtractedValue(extractionResults, 'printer_companion_17_effect');
    const websiteEffect = getCompanionActiveBonus(gameData.get('companions') as Companion[], 17);
    expect(websiteEffect).toMatchLiveGame(gameEffect, 0);
  });
});

describe('Printer output - Yet Another Printer Multi', () => {
  it.each([
    { name: 'keeps zero days neutral', days: 0, talentBonus: 10, voteBonus: 0, expectedBoost: 1, expectedOutput: 100 },
    { name: 'keeps zero talent bonus neutral', days: 20, talentBonus: 0, voteBonus: 0, expectedBoost: 1, expectedOutput: 100 },
    { name: 'applies the day and talent multiplier', days: 20, talentBonus: 10, voteBonus: 0, expectedBoost: 3, expectedOutput: 300 },
    { name: 'composes multiplicatively with the vote bonus', days: 20, talentBonus: 10, voteBonus: 50, expectedBoost: 4.5, expectedOutput: 450 },
  ])('$name', ({ days, talentBonus, voteBonus, expectedBoost, expectedOutput }) => {
    const printer = new Printer('printer');
    const sample = new Sample('OakTree', 100);
    sample.printing = 1;
    sample.printingQuantity = 100;
    printer.samples = [[sample]];

    const optLacc: number[] = [];
    optLacc[INDEX_DAYS_SINCE_SAMPLE_LEGENDTALENT] = days;
    const dependencies = new Map<string, unknown>([
      ['printer', printer],
      ['lab', { bonuses: [{ active: false }, { active: false }], playersInTubes: [] }],
      ['divinity', { gods: Array.from({ length: 4 }, () => ({ linkedPlayers: [] })) }],
      ['sailing', { artifacts: Array.from({ length: 5 }, () => ({ getTierIncrement: () => 0 })) }],
      ['players', []],
      ['gems', { purchases: [] }],
      ['rift', { bonuses: [{ name: 'Skill Mastery', getTotalBonusByIndex: () => 0 }] }],
      ['OptLacc', optLacc],
      ['sneaking', { pristineCharms: [] }],
      ['eventShop', { isBonusOwned: () => false }],
      ['votes', { getCurrentBonus: (index: number) => index === 11 ? voteBonus : 0 }],
      ['companions', []],
      ['compass', { upgrades: [] }],
      ['legendTalents', { getBonusFromIndex: (index: number) => index === 17 ? talentBonus : 0 }],
    ]);

    updatePrinter(dependencies);

    expect(sample.printingTotalBoost).toBe(expectedBoost);
    expect(sample.getSampleQuantity(false)).toBe(expectedOutput);
    expect(printer.GetTotalActive('OakTree')).toBe(expectedOutput);
  });
});
