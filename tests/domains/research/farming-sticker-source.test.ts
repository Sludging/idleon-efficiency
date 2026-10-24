import { Menagerie } from '../../../data/domain/menagerie';
import { ResearchGrid, updateResearchDisplay } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

it('keeps one Farming Sticker EXP source in its unlocked group across repeated updates', () => {
    const accountData = loadGameDataFromSave('latest');
    const research = accountData.get('research') as ResearchGrid;
    const converted = (accountData.get('menagerie') as Menagerie).getUnlocks()[22].owned;

    for (const repeatUpdate of [false, true]) {
        if (repeatUpdate) {
            updateResearchDisplay(accountData);
        }

        const additiveRows = research.production.additiveExpContributors.filter(row => row.source.startsWith('Farming sticker:'));
        const multiplierRows = research.production.expMultiplierContributors.filter(row => row.source.startsWith('Farming sticker:'));
        const selectedRows = converted ? multiplierRows : additiveRows;
        const oppositeRows = converted ? additiveRows : multiplierRows;

        expect(selectedRows).toHaveLength(1);
        expect(oppositeRows).toHaveLength(0);
        expect(selectedRows[0].operation).toBe(converted ? 'multiply' : 'addPercent');
    }
});
