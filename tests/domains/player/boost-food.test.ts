import { Food } from '../../../data/domain/items';
import { Card } from '../../../data/domain/cards';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import type { Player } from '../../../data/domain/player';
import type { TalentLevelInputs } from '../../../data/domain/talents';
import { getStampBonusForKey, type Stamp } from '../../../data/domain/world-1/stamps';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

type BoostFoodInputs = { boostFoodStamp: number; foodStatue: number };
type BoostFoodSnapshot = {
  effectiveness: number;
  baseHP: number;
  powerFoodEffect: number;
  foodStatue: number;
  equipmentFoodEffect: number;
  boostFoodStamp: number;
  starSignFoodEffect: number;
  cardFoodEffect: number;
  cardSetFoodEffect: number;
  talentFoodEffect: number;
};
type BoostFoodCapture = {
  calls: number;
  restored: boolean;
  early: BoostFoodSnapshot;
  final: BoostFoodSnapshot;
};

const parameterSpecs: {
  key: keyof BoostFoodSnapshot;
  description: string;
  getValue: (gameData: Map<string, any>, player: Player, inputs: BoostFoodInputs, talents: TalentLevelInputs) => number;
}[] = [
  {
    key: 'powerFoodEffect', description: 'post-office boost-food effectiveness',
    getValue: (_gameData, player) => player.postOffice.reduce((total, box) => total + box.bonuses.reduce(
      (boxTotal, bonus, index) => boxTotal + (bonus.data.bonusKey === 'PowerFoodEffect' ? bonus.getBonus(box.level, index) : 0), 0,
    ), 0),
  },
  {
    key: 'foodStatue', description: 'Feasty Statue effectiveness for the recipient',
    getValue: (_gameData, _player, inputs) => inputs.foodStatue,
  },
  {
    key: 'equipmentFoodEffect', description: 'equipment food effectiveness',
    getValue: (_gameData, player) => player.getEquipmentBonus(EquipmentBonus.FoodEffect),
  },
  {
    key: 'boostFoodStamp', description: 'boost-food stamp effectiveness',
    getValue: (_gameData, _player, inputs) => inputs.boostFoodStamp,
  },
  {
    key: 'starSignFoodEffect', description: 'all-food effectiveness from recipient star signs',
    getValue: (_gameData, player) => player.starSigns.reduce((total, sign) => total + sign.getBonus('All Food Effect'), 0),
  },
  {
    key: 'cardFoodEffect', description: 'equipped-card boost-food effectiveness',
    getValue: (_gameData, player) => Card.GetTotalBonusForId(player.cardInfo!.equippedCards, 48),
  },
  {
    key: 'cardSetFoodEffect', description: 'food-effect card-set bonus',
    getValue: (_gameData, player) => player.cardInfo!.getBonusForId(1),
  },
  {
    key: 'talentFoodEffect', description: 'Frothy Malk boost-food bonus at the matching preparation stage',
    getValue: (_gameData, player, _inputs, talents) => player.getTalentBonusAtInputs(631, talents),
  },
];

// The real save checks the factor independently; zero equipped HP food cannot establish its correctness.
describe('Shared boost-food behavior for the actual target', () => {
  let gameData: Map<string, any>;
  let player: Player;
  let inputs: BoostFoodInputs;
  let capture: BoostFoodCapture;

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
    const results = loadExtractionResults('boost-food-data.json');
    validateExtractionHealth(results);
    capture = results.extractions.boost_food_context?.result;
    if (!capture || capture.calls !== 1 || !capture.restored) {
      throw new Error('Missing restored actual MinEff boost-food capture from TalentCalc(-2).');
    }
    const foodStatue = (gameData.get('statues') as PlayerStatues[])[player.playerID].statues.find(statue => statue.index === 3)!;
    inputs = {
      boostFoodStamp: getStampBonusForKey(gameData.get('stamps') as Stamp[][], 'BFood'),
      foodStatue: foodStatue.getBonus(player),
    };
  });

  describe.each(['early', 'final'] as const)('%s callpoint', stage => {
    const getTalentInputs = () => stage === 'early'
      ? player.beforeActiveBubbleMultiplierTalentInputs : player.finalTalentInputs;

    it('matches the complete boost-food effectiveness independently of equipped food', () => {
      expect(Food.getBoostFoodEffectiveness(player, inputs, getTalentInputs())).toMatchLiveGameWithDetails(
        capture[stage].effectiveness,
        { tolerance: 0, context: `Player ${player.playerID} ${stage} boost-food effectiveness` },
      );
    });

    it('matches shared Food-owned equipped base-HP contribution', () => {
      expect(Food.getBaseHPContribution(player, inputs, getTalentInputs())).toMatchLiveGameWithDetails(
        capture[stage].baseHP,
        { tolerance: 0, context: `Player ${player.playerID} ${stage} equipped food base HP` },
      );
    });

    describe('direct external parameters', () => {
      for (const { key, description, getValue } of parameterSpecs) {
        it(`matches ${description}`, () => {
          expect(getValue(gameData, player, inputs, getTalentInputs())).toMatchLiveGame(capture[stage][key], 0);
        });
      }
    });
  });
});
