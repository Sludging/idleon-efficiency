/**
 * Direct calculations used by Royal Armory extra clear-kills.
 * The account-wide Full Clear Orblet input is compared through RoyalArmory's market-bonus API.
 */

import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Player } from '../../../data/domain/player';
import { BigFish } from '../../../data/domain/world-7/bigFish';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-extra-clear-kills-data.json';

const parameterComparisons = [
    {
        description: 'account-roster maximum talent 231 multiplier input',
        extractionKey: 'royal_armory_extra_clear_kills_talent_231',
        domainValue: (gameData: Map<string, any>): number => {
            const players = gameData.get('players') as Player[];
            // The game uses its roster-wide maximum for getbonus2(..., -1), not an active character.
            return players.reduce((maximum, player) => Math.max(maximum, player.getTalentBonus(231)), 0);
        },
    },
    {
        description: 'Full Clear Orblet Market bonus input',
        extractionKey: 'royal_armory_extra_clear_kills_orblet_3',
        domainValue: (gameData: Map<string, any>): number => {
            const royalArmory = gameData.get('royalArmory') as RoyalArmory;
            return royalArmory.getOrbletMarketBonus(3);
        },
    },
    {
        description: 'Big Fish bonus 6 percentage input',
        extractionKey: 'royal_armory_extra_clear_kills_big_fish_6',
        domainValue: (gameData: Map<string, any>): number => {
            const bigFish = gameData.get('bigFish') as BigFish;
            return bigFish.getBonusFromIndex(6);
        },
    },
    {
        description: 'Jelly Operator obstruction 2 quantity input',
        extractionKey: 'royal_armory_extra_clear_kills_jelly_quantity_2',
        domainValue: (gameData: Map<string, any>): number => {
            const jellyOperator = gameData.get('jellyOperator') as JellyOperator;
            const obstruction = jellyOperator.obstructions.find(candidate => candidate.index === 2);
            if (!obstruction) {
                throw new Error('Missing website result for JellyOperator obstruction 2 used by extra clear-kills.');
            }
            return obstruction.getBonus();
        },
    },
];

describe('Royal Armory extra clear-kills direct parameters', () => {
    let gameData: Map<string, any>;

    beforeAll(() => {
        gameData = loadGameDataFromSave(saveName);
    });


    parameterComparisons.forEach(({ description, extractionKey, domainValue }) => {
        it(`matches the game ${description} used by extra clear-kills`, () => {
            const websiteValue = domainValue(gameData);
            const extractionResults = loadExtractionResults(extractionResultsName);
            validateExtractionHealth(extractionResults);
            const liveValue = getExtractedValue(extractionResults, extractionKey);

            expect(websiteValue).toMatchLiveGameWithDetails(liveValue, {
                tolerance: 0,
                context: `Royal Armory extra clear-kills direct input: ${description}`,
            });
        });
    });
});
