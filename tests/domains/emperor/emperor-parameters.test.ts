import { loadExtractionResults, validateExtractionHealth, getExtractedValue, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Sneaking } from '../../../data/domain/world-6/sneaking';
import type { Tesseract } from '../../../data/domain/tesseract';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Emperor } from '../../../data/domain/world-6/emperor';
import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';

const saveName = 'latest';
const extractionResultsName = 'emperor-parameters-data.json';

describe('Emperor calculation parameters', () => {
    let extractionResults: ExtractionResults;
    let gameData: Map<string, unknown>;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        gameData = loadGameDataFromSave(saveName);
    });

    it('matches Ninja Emporium bonus 39 used by maximum attempts', () => {
        const sneaking = gameData.get('sneaking') as Sneaking;
        const domainValue = Number(sneaking.jadeUpgrades.some(upgrade => upgrade.index === 39 && upgrade.purchased));
        expect(domainValue).toMatchLiveGame(getExtractedValue(extractionResults, 'ninja_emporium_bonus_39'), 0);
    });

    it('matches Arcane upgrade bonus 48 used by Emperor rewards', () => {
        const tesseract = gameData.get('tesseract') as Tesseract;
        const domainValue = tesseract.upgrades[48].getBonus(tesseract.upgrades);
        expect(domainValue).toMatchLiveGame(getExtractedValue(extractionResults, 'arcane_bonus_48'), 0);
    });

    it('matches Arcade bonus 51 used by Emperor rewards', () => {
        const arcade = gameData.get('arcade') as Arcade;
        const domainValue = arcade.bonuses.find(bonus => bonus.index === 51)!.getBonus();
        expect(domainValue).toMatchLiveGame(getExtractedValue(extractionResults, 'arcade_bonus_51'), 0);
    });

    it('matches Jelly RoG bonus 28 used by Emperor rewards', () => {
        const jellyOperator = gameData.get('jellyOperator') as JellyOperator;
        const domainValue = jellyOperator.getObstructionBonus(28);
        expect(domainValue).toMatchLiveGame(getExtractedValue(extractionResults, 'jelly_bonus_28'), 0);
    });

});
