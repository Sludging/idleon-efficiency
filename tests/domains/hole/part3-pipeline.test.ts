import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Skilling } from '../../../data/domain/skilling';
import { getTargetPlayer } from '../../utils/target-player';
import type { Player } from '../../../data/domain/player';
import type { Hole } from '../../../data/domain/world-5/hole/hole';

describe('Hole part-three public skill efficiencies', () => {
    it('matches active-player Mining, Choppin, Fishing, and Catching efficiency', () => {
        const results = loadExtractionResults('hole-character-skill-efficiencies-data.json');
        validateExtractionHealth(results);
        const gameData = loadGameDataFromSave('latest');
        const player = getTargetPlayer(gameData.get('players') as Player[]);
        const skilling = gameData.get('skilling') as Skilling;
        const efficiencyCases = [
            { skill: SkillsIndex.Mining, label: 'mining_efficiency', name: 'Mining' },
            { skill: SkillsIndex.Chopping, label: 'chopping_efficiency', name: 'Choppin' },
            { skill: SkillsIndex.Fishing, label: 'fishing_efficiency', name: 'Fishing' },
            { skill: SkillsIndex.Catching, label: 'catching_efficiency', name: 'Catching' },
        ] as const;

        efficiencyCases.forEach(({ skill, label, name }) => {
            expect(skilling.getSkillEfficiency(player.playerID, skill)).toMatchLiveGameWithDetails(
                getExtractedValue(results, label),
                { tolerance: 0, context: `Player ${player.playerID} ${name} efficiency` },
            );
        });
    });

    it('matches prepared resource-cavern eligibility for every character', () => {
        const gameData = loadGameDataFromSave('latest');
        const players = gameData.get('players') as Player[];
        const hole = gameData.get('hole') as Hole;
        const skilling = gameData.get('skilling') as Skilling;

        for (const cavern of Object.values(hole.resourceCavrens.cavrens)) {
            expect(cavern.characterCapabilities).toHaveLength(players.length);
            for (const player of players) {
                const capability = cavern.characterCapabilities.find(result => result.playerID === player.playerID)!;
                const efficiency = skilling.getSkillEfficiency(player.playerID, capability.skill);
                expect(capability.playerName).toBe(player.playerName);
                expect(capability.efficiency).toBe(efficiency);
                expect(capability.meetsThreshold).toBe(efficiency >= cavern.efficiencyThreshold);
            }
        }
    });
});
