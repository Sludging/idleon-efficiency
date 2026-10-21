import { Card } from '../../../data/domain/cards';
import { getCompanionActiveBonus, type Companion } from '../../../data/domain/companions';
import type { Account } from '../../../data/domain/account';
import type { Achievement } from '../../../data/domain/achievements';
import type { Gaming } from '../../../data/domain/world-5/gaming';
import type { Meritocraty } from '../../../data/domain/world-7/meritocraty';
import type { Tome } from '../../../data/domain/world-4/tome';
import type { Player } from '../../../data/domain/player';
import { getStatCards } from '../../../data/domain/player-stats';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Player maximum damage postcap parameters', () => {
  let gameData: Map<string, any>;
  let extractionResults: ExtractionResults;
  let player: Player;

  beforeAll(() => {
    extractionResults = loadExtractionResults('player-damage-postcap-parameters-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  it('matches native Crystal6 card level', () => {
    const crystalLevel = player.cardInfo!.cards.find(card => card.id === 'Crystal6')!.getLevels();
    expect(crystalLevel).toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_postcap_crystal6_card_level'), 0);
  });

  it('matches native Meritocracy bonus 5', () => {
    const meritocraty = gameData.get('meritocraty') as Meritocraty;
    expect(meritocraty.getCurrentBonus(5)).toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_postcap_meritocracy_5'), 0);
  });

  it('matches native TomeBonus(6)', () => {
    const tome = gameData.get('tome') as Tome;
    expect(tome.getTomeBonus(6, player)).toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_postcap_tome_6'), 0);
  });

  it.each([371, 384])('matches native AchievementStatus(%s)', (index) => {
    const achievements = gameData.get('achievements') as Achievement[];
    expect(Number(achievements[index].completed)).toMatchLiveGame(getExtractedValue(extractionResults, `player_damage_postcap_achievement_${index}`), 0);
  });

  it('matches native CardBonusREAL(96)', () => {
    const cardBonus = Card.GetTotalBonusForId(getStatCards(player), 96);
    expect(cardBonus).toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_postcap_card_96'), 0);
  });

  it.each([12, 33, 160, 168, 170])('matches native active companion bonus %s', (index) => {
    const companions = gameData.get('companions') as Companion[];
    expect(getCompanionActiveBonus(companions, index)).toMatchLiveGame(getExtractedValue(extractionResults, `player_damage_postcap_companion_${index}`), 0);
  });

  it('matches native SuperBitType(64)', () => {
    const gaming = gameData.get('gaming') as Gaming;
    expect(Number(gaming.isSuperbitPurchased(64))).toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_postcap_superbit_64'), 0);
  });

  it('matches account option 232', () => {
    const account = gameData.get('account') as Account;
    expect(account.damageMultiplierFloorInput).toMatchLiveGame(getExtractedValue(extractionResults, 'player_damage_postcap_option_232'), 0);
  });
});