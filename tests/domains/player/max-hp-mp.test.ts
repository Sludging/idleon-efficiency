import type { Player } from '../../../data/domain/player';
import type { GoldenFood } from '../../../data/domain/golden-food';
import { Talent } from '../../../data/domain/talents';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

const extractionResultsName = 'player-health-data.json';



// The real target uses normal health, not dungeon, Wraith, or Tempest health.
describe('Player normal-character maximum health and mana', () => {
  let player: Player;
  let players: Player[];
  let goldenFood: GoldenFood;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    const gameData = loadGameDataFromSave('latest');
    players = gameData.get('players') as Player[];
    player = getTargetPlayer(players);
    goldenFood = gameData.get('goldenFood') as GoldenFood;
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
  });

  it('matches maximum HP used by the target character mining-efficiency bubble', () => {
    expect(player.getMaxHP()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'maximum_hp'),
      { tolerance: 0, context: `Player ${player.playerID} normal maximum HP` },
    );
  });

  it('matches PlayerHealth-owned equipped food base-HP contribution', () => {
    expect(player.health.getFoodHP()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'food_hp'),
      { tolerance: 0, context: `Player ${player.playerID} equipped food base HP` },
    );
  });

  it('matches PlayerHealth-owned miscellaneous maximum-HP percentage', () => {
    expect(player.health.getMiscHP()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'misc_hp'),
      { tolerance: 0, context: `Player ${player.playerID} miscellaneous maximum HP` },
    );
  });

  it('matches shared golden-food maximum-HP multiplier', () => {
    expect(goldenFood.getHP(player)).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'golden_hp'),
      { tolerance: 0, context: `Player ${player.playerID} golden-food maximum HP` },
    );
  });

  it('matches final normal-character maximum MP after talent preparation', () => {
    expect(player.getMaxMP()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'maximum_mp'),
      { tolerance: 0, context: `Player ${player.playerID} normal maximum MP` },
    );
  });

  it('matches maximum HP sampled while Alchemy prepares mining efficiency', () => {
    const oracle = extractionResults.extractions.alchemy_health_context?.result;
    if (!oracle) {
      throw new Error('Missing actual TalentCalc(-2) HP capture.');
    }
    expect(player.health.getAlchemyMaxHP()).toMatchLiveGameWithDetails(
      oracle.early.maximumHP,
      { tolerance: 0, context: `Player ${player.playerID} Alchemy-preparation maximum HP` },
    );
  });

  it('matches maximum MP sampled while Alchemy prepares chopping efficiency', () => {
    const oracle = extractionResults.extractions.alchemy_mana_context?.result;
    if (!oracle) {
      throw new Error('Missing alchemy_mana_context extraction: capture the actual TalentCalc(-2) MP call.');
    }
    expect(player.health.getAlchemyMaxMP()).toMatchLiveGameWithDetails(
      oracle.early.maximumMP,
      { tolerance: 0, context: `Player ${player.playerID} Alchemy-preparation maximum MP` },
    );
  });

  it.each(['early', 'final'] as const)('matches talent and golden-food inputs at the %s callpoint', stage => {
    const oracle = extractionResults.extractions.alchemy_health_context.result[stage];
    const inputs = stage === 'early'
      ? player.beforeActiveBubbleMultiplierTalentInputs : player.finalTalentInputs;
    for (const talent of oracle.talents) {
      expect(player.getTalentBonusAtInputs(talent.id, inputs)).toMatchLiveGame(talent.bonus, 0);
    }
    expect(Talent.getAccountTalentBonus(players, 209, inputs)).toMatchLiveGame(oracle.accountDeathBringer, 0);
    expect(stage === 'early' ? goldenFood.getAlchemyHP(player) : goldenFood.getHP(player))
      .toMatchLiveGame(oracle.goldFood, 0);
  });
});
