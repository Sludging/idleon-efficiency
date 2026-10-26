import { Compass } from '../../../data/domain/compass';
import { Lab } from '../../../data/domain/world-4/lab';
import { Player } from '../../../data/domain/player';
import { Printer } from '../../../data/domain/world-3/construction/printer';
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
    description: 'King of the Remembered Printer-growth contribution across saved characters (getbonus2(1,178,-1))',
    // The game selector -1 chooses the highest saved character's talent bonus.
    extractionKey: 'best_divine_knight_talent_178',
    domainExtractor: gameData => {
      // The game's -1 selector takes the maximum over all saved characters, without a class restriction.
      return (gameData.get('players') as Player[])
        .reduce((maximum, player) => Math.max(maximum, player.getTalentBonus(178)), 0);
    },
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
