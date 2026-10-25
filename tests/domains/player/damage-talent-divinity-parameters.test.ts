import type { Player } from '../../../data/domain/player';
import { getTalentCalculationBonus } from '../../../data/domain/player-talent-calculations';
import type { TalentCalculationSelector } from '../../../data/domain/player-talent-calculations';
import type { Divinity } from '../../../data/domain/world-5/divinity';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Player damage talent and divinity direct parameters', () => {
  let player: Player;
  let data: Map<string, unknown>;
  let nativeTalentCalculationBonuses: Record<number, number>;
  let nativeDivinityMinorBonus4: number;
  let nativeDivinityMinorBonus7: number;

  beforeAll(() => {
    const results = loadExtractionResults('player-damage-talent-divinity-parameters-data.json');
    validateExtractionHealth(results);
    nativeTalentCalculationBonuses = {
      31: getExtractedValue(results, 'talent_calculation_31'),
      110: getExtractedValue(results, 'talent_calculation_110'),
      125: getExtractedValue(results, 'talent_calculation_125'),
      305: getExtractedValue(results, 'talent_calculation_305'),
      470: getExtractedValue(results, 'talent_calculation_470'),
      485: getExtractedValue(results, 'talent_calculation_485'),
      656: getExtractedValue(results, 'talent_calculation_656'),
    };
    nativeDivinityMinorBonus4 = getExtractedValue(results, 'divinity_minor_bonus_4');
    nativeDivinityMinorBonus7 = getExtractedValue(results, 'divinity_minor_bonus_7');
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
  });

  const talentCalculations: { selector: TalentCalculationSelector; effect: string }[] = [
    { selector: 31, effect: 'skill-level-scaled talent bonus' },
    { selector: 110, effect: 'fighting-map portal-progress talent bonus' },
    { selector: 125, effect: 'accuracy-gated refinery-rank talent bonus' },
    { selector: 305, effect: 'eligible-card-scaled talent bonus' },
    { selector: 470, effect: 'stamp-scaled talent bonus' },
    { selector: 485, effect: 'alchemy-vial-scaled talent bonus' },
    { selector: 656, effect: 'completed dream-challenge-scaled talent bonus' },
  ];

  talentCalculations.forEach(({ selector, effect }) => {
    it(`matches native TalentCalc for the ${effect} used by damage calculations`, () => {
      expect(getTalentCalculationBonus(data, player, selector)).toMatchLiveGame(nativeTalentCalculationBonuses[selector], 0);
    });
  });

  it('matches native Bonus_Minor category 4 for the target player', () => {
    const divinity = data.get('divinity') as Divinity;
    expect(divinity.getMinorBonus(player.playerID, 4)).toMatchLiveGame(nativeDivinityMinorBonus4, 0);
  });

  it('matches native Bonus_Minor category 7 for the target player', () => {
    const divinity = data.get('divinity') as Divinity;
    expect(divinity.getMinorBonus(player.playerID, 7)).toMatchLiveGame(nativeDivinityMinorBonus7, 0);
  });
});
