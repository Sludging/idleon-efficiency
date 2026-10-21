/**
 * CoralReef Daily Gains - Parameter Tests
 *
 * Tests that all input parameters for the daily coral gains calculation
 * are correctly extracted from their respective domains.
 *
 * This validates data flow from multiple domains:
 * - Companions
 * - CoralKid, DancingCoral, Clamworks
 * - KillRoy, Stamps, Alchemy
 * - LegendTalents, Arcade
 * - Cards, Statues
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { CoralKid } from '../../../data/domain/world-7/coralKid';
import { DancingCoral } from '../../../data/domain/world-7/dancingCoral';
import { Clamworks } from '../../../data/domain/world-7/clamworks';
import { KillRoy } from '../../../data/domain/world-2/killroy';
import { Stamp } from '../../../data/domain/world-1/stamps';
import { Alchemy } from '../../../data/domain/alchemy';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { Arcade } from '../../../data/domain/arcade';
import { Card } from '../../../data/domain/cards';
import { PlayerStatues } from '../../../data/domain/statues';
import { getStampBonusForKey } from '../../../data/domain/world-1/stamps';

const saveName = 'latest';
const extractionResultsName = 'coral-reef-daily-gains-data.json';

describe('CoralReef Daily Gains - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let companions: Companion[];

  let coralKid: CoralKid;
  let dancingCoral: DancingCoral;
  let clamworks: Clamworks;
  let killRoy: KillRoy;
  let stamps: Stamp[][];
  let alchemy: Alchemy;
  let legendTalents: LegendTalents;
  let arcade: Arcade;
  let cards: Card[];
  let statues: PlayerStatues[];

  beforeAll(() => {
    // Load live game extraction results
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);

    // Load matching save data
    try {
      gameData = loadGameDataFromSave(saveName);

      companions = gameData.get('companions') as Companion[];
      coralKid = gameData.get('coralKid') as CoralKid;
      dancingCoral = gameData.get('dancingCoral') as DancingCoral;
      clamworks = gameData.get('clamworks') as Clamworks;
      killRoy = gameData.get('killroy') as KillRoy;
      stamps = gameData.get('stamps') as Stamp[][];
      alchemy = gameData.get('alchemy') as Alchemy;
      legendTalents = gameData.get('legendTalents') as LegendTalents;
      arcade = gameData.get('arcade') as Arcade;
      cards = gameData.get('cards') as Card[];
      statues = gameData.get('statues') as PlayerStatues[];

    } catch (error: any) {
      throw new Error(`❌ Failed to load save data: ${error.message}`);
    }
  });

  describe('Companion Parameters', () => {
    it('validates companion 40 bonus', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_companion_40_bonus');
      const calculatedValue = getCompanionActiveBonus(companions, 40);  

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });


  describe('Coral Kid Parameters', () => {
    it('validates coral kid bonus 5 (daily coral generation)', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_coral_kid_bonus_5');
      const calculatedValue = coralKid.getBonusFromIndex(5);

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });

  describe('Dancing Coral Parameters', () => {
    it('validates dancing coral bonus 0 (daily reef coral)', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_dancing_coral_bonus_0');
      const calculatedValue = dancingCoral.getBonusFromIndex(0);

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });

  describe('Clamworks Parameters', () => {
    it('validates clamwork bonus 5 unlock status', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_clamwork_bonus_5');
      const calculatedValue = clamworks.isBonusUnlocked(5) ? 1 : 0;

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });

  describe('KillRoy Parameters', () => {
    it('validates killroy bonus 6 (daily coral reef gains)', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_killroy_bonus_6');
      const calculatedValue = killRoy.dailyCoralReefGains;

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });

  describe('Stamp Parameters', () => {
    it('validates stamp bonus for corale', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_stamp_corale');
      const calculatedValue = getStampBonusForKey(stamps, 'corale');

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });

  describe('Alchemy Parameters', () => {
    it('validates alchemy vial 7corale bonus', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_vial_7corale');
      const calculatedValue = alchemy.getVialBonusForKey('7corale');

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });

  describe('Legend Talents Parameters', () => {
    it('validates legend talent bonus 0', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_legend_talent_bonus_0');
      const calculatedValue = legendTalents.getBonusFromIndex(0);

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });

  describe('Arcade Parameters', () => {
    it('validates arcade bonus 57', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_arcade_bonus_57');
      const calculatedValue = arcade.bonuses.find(bonus => bonus.index == 57)?.getBonus() ?? 0;

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });

  describe('Card Parameters', () => {
    it('validates card w7a9 (Demonblub) level', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_card_w7a9_level');
      const calculatedValue = cards.find(card => card.id == 'w7a9')?.getBonus() ?? 0;

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });

  describe('Statue Parameters', () => {
    it('validates statue 31 bonus', () => {
      const extractedValue = getExtractedValue(extractionResults, 'param_statue_31_bonus');
      const calculatedValue = statues[0].statues[31].getBonus();

      expect(calculatedValue).toMatchLiveGame(extractedValue, 0);
    });
  });
});
