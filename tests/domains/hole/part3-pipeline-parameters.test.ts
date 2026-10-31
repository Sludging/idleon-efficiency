import { Card } from '../../../data/domain/cards';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { getStatCards } from '../../../data/domain/player-stats';
import { getRightHandOfActionBonus } from '../../../data/domain/talents';
import type { Player } from '../../../data/domain/player';
import { Skilling } from '../../../data/domain/skilling';
import { getStampBonusForKey, Stamp } from '../../../data/domain/world-1/stamps';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

function getStarSignEfficiency(player: Player, bonusText: string): number {
    return player.starSigns.reduce((total, sign) => total + sign.getBonus(bonusText), 0);
}

const parameterCases = [
    { key: 'mining_card_factor', description: 'Mining card factor', calculate: (_players: Player[], player: Player) => Card.GetTotalBonusForId(getStatCards(player), 24) },
    { key: 'chopping_card_factor', description: 'Choppin card factor', calculate: (_players: Player[], player: Player) => Card.GetTotalBonusForId(getStatCards(player), 27) },
    { key: 'fishing_card_factor', description: 'Fishing card factor', calculate: (_players: Player[], player: Player) => Card.GetTotalBonusForId(getStatCards(player), 30) },
    { key: 'catching_card_factor', description: 'Catching card factor', calculate: (_players: Player[], player: Player) => Card.GetTotalBonusForId(getStatCards(player), 32) },
    { key: 'mining_right_hand_bonus', description: 'Mining Right Hand of Action bonus', calculate: (players: Player[], player: Player) => getRightHandOfActionBonus(players, player, SkillsIndex.Mining) },
    { key: 'chopping_right_hand_bonus', description: 'Choppin Right Hand of Action bonus', calculate: (players: Player[], player: Player) => getRightHandOfActionBonus(players, player, SkillsIndex.Chopping) },
    { key: 'fishing_right_hand_bonus', description: 'Fishing Right Hand of Action bonus', calculate: (players: Player[], player: Player) => getRightHandOfActionBonus(players, player, SkillsIndex.Fishing) },
    { key: 'catching_right_hand_bonus', description: 'Catching Right Hand of Action bonus', calculate: (players: Player[], player: Player) => getRightHandOfActionBonus(players, player, SkillsIndex.Catching) },
    { key: 'mining_post_office_efficiency', description: 'Mining Post Office efficiency bonus', calculate: (_players: Player[], player: Player) => player.getPostOfficeBonus('MinEffPct') },
    { key: 'chopping_post_office_efficiency', description: 'Choppin Post Office efficiency bonus', calculate: (_players: Player[], player: Player) => player.getPostOfficeBonus('ChopEffPct') },
    { key: 'fishing_post_office_efficiency', description: 'Fishing Post Office efficiency bonus', calculate: (_players: Player[], player: Player) => player.getPostOfficeBonus('FishEffPct') },
    { key: 'catching_post_office_efficiency', description: 'Catching Post Office efficiency bonus', calculate: (_players: Player[], player: Player) => player.getPostOfficeBonus('CatchEffPct') },
    { key: 'mining_star_sign_efficiency', description: 'Mining Star Sign efficiency bonus', calculate: (_players: Player[], player: Player) => getStarSignEfficiency(player, 'Mining Efficiency') },
    { key: 'chopping_star_sign_efficiency', description: 'Choppin Star Sign efficiency bonus', calculate: (_players: Player[], player: Player) => getStarSignEfficiency(player, 'Chop Efficiency') },
    { key: 'fishing_star_sign_efficiency', description: 'Fishing Star Sign efficiency bonus', calculate: (_players: Player[], player: Player) => getStarSignEfficiency(player, 'Fishing Efficiency') },
    { key: 'catching_star_sign_efficiency', description: 'Catching Star Sign efficiency bonus', calculate: (_players: Player[], player: Player) => getStarSignEfficiency(player, 'Catch Efficiency') },
] as const;

describe('Hole part-three direct skill-efficiency parameters', () => {
    const results = loadExtractionResults('hole-character-skill-efficiencies-data.json');
    validateExtractionHealth(results);
    const gameData = loadGameDataFromSave('latest');
    const players = gameData.get('players') as Player[];
    const player = getTargetPlayer(players);
    const stamps = gameData.get('stamps') as Stamp[][];
    const skilling = gameData.get('skilling') as Skilling;
    const efficiencyStampMultiplier = Math.max(player.getTalentBonus(625), 1);

    it('matches the character-specific Toilet Paper Postage efficiency stamp multiplier', () => {
        expect(efficiencyStampMultiplier).toMatchLiveGame(getExtractedValue(results, 'efficiency_stamp_talent_multiplier'), 0);
    });

    [
        { key: 'mining_efficiency_stamp', stampKey: 'BaseMinEff', description: 'Mining efficiency' },
        { key: 'all_base_efficiency_stamp', stampKey: 'BaseAllEff', description: 'all-base skill efficiency' },
    ].forEach(({ key, stampKey, description }) => {
        it(`matches the effective ${description} stamp bonus`, () => {
            expect(getStampBonusForKey(stamps, stampKey, player) * efficiencyStampMultiplier)
                .toMatchLiveGame(getExtractedValue(results, key), 0);
        });
    });

    it('matches the all-base skill efficiency used by skill calculations', () => {
        expect(skilling.getAllBaseSkillEfficiency(player))
            .toMatchLiveGame(getExtractedValue(results, 'all_base_skill_efficiency'), 0);
    });

    parameterCases.forEach(({ key, description, calculate }) => {
        it(`matches the ${description} used by skill efficiency`, () => {
            expect(calculate(players, player)).toMatchLiveGame(getExtractedValue(results, key), 0);
        });
    });
});
