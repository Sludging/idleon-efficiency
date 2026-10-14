import type { Player } from '../../../data/domain/player';
import { Talent } from '../../../data/domain/talents';
import type { Breeding } from '../../../data/domain/world-4/breeding';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Talent-owned persistent Weapon Power contributions', () => {
  let player: Player;
  let breeding: Breeding;
  let terms: Record<string, number>;
  beforeAll(() => {
    const results = loadExtractionResults('player-powers-data.json');
    validateExtractionHealth(results);
    terms = results.extractions.powers.result.terms;
    const data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
    breeding = data.get('breeding') as Breeding;
  });

  it('matches Beginner Best Class Weapon Power after the beginner character-level cap', () => {
    expect(Talent.getBeginnerWeaponPowerBonus(player)).toMatchLiveGameWithDetails(terms.beginner, {
      tolerance: 0, context: 'Beginner Best Class uses only characters with source class below 6',
    });
  });

  it('matches complete skill-progression Weapon Power without crossing the pet addition boundary', () => {
    const bonus = Talent.getSkillWeaponPowerBonus(player);
    expect(bonus.progression).toMatchLiveGameWithDetails(terms.progression, {
      tolerance: 0, context: 'Cooking, Gaming, Sailing and Divinity decade-based Weapon Power',
    });
    expect(bonus.intellect).toMatchLiveGameWithDetails(terms.intellect, {
      tolerance: 0, context: 'Intellect decade-based Weapon Power after the pet effect',
    });
  });

  it('matches Animalistic Ferocity Weapon Power from the first raw stored pet slot', () => {
    expect(Talent.getPetWeaponPowerBonus(player, breeding.firstStoredPetPower)).toMatchLiveGameWithDetails(terms.pet, {
      tolerance: 0, context: 'Animalistic Ferocity uses stored pet power, not pet level or strongest pet',
    });
  });
});
