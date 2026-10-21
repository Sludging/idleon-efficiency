import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Power Talent direct ordinary-effect parameters', () => {
  let player: Player;
  let ordinaryTalents: Record<number, number>;
  beforeAll(() => {
    const results = loadExtractionResults('player-powers-data.json');
    validateExtractionHealth(results);
    ordinaryTalents = results.extractions.powers.result.ordinaryTalents;
    player = getTargetPlayer(loadGameDataFromSave('latest').get('players') as Player[]);
  });

  const curves = [
    { id: 616, effect: 'Beginner Best Class before its account character-level cap' },
    { id: 140, effect: 'Cooking decade Weapon Power' },
    { id: 170, effect: 'Gaming decade Weapon Power' },
    { id: 320, effect: 'Sailing decade Weapon Power' },
    { id: 500, effect: 'Divinity decade Weapon Power' },
    { id: 365, effect: 'Animalistic Ferocity stored-pet Weapon Power' },
    { id: 530, effect: 'Intellect decade Weapon Power' },
  ];
  curves.forEach(({ id, effect }) => {
    it(`matches the ordinary ${effect} effect at final talent inputs`, () => {
      expect(player.getTalentBonusAtInputs(id, player.finalTalentInputs)).toMatchLiveGame(ordinaryTalents[id], 0);
    });
  });
});
