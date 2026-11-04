import { Storage } from '../../../data/domain/storage';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

// Native evidence: ../IdleonWikiBot/codefiles/idleon1.25.txt:181227-181276,326247-326272.
describe('Storage capacity and chest upgrades', () => {
    let storage: Storage;
    let extractionResults: ExtractionResults;
    let usedChests: Record<string, number | string>;

    beforeAll(() => {
        storage = loadGameDataFromSave('latest').get('storage') as Storage;
        extractionResults = loadExtractionResults('storage-capacity-data.json');
        validateExtractionHealth(extractionResults);
        usedChests = JSON.parse(loadTestSave('latest').get('InvStorageUsed') as string) as Record<string, number | string>;
    });

    it('reports the native total of owned storage slots', () => {
        expect(storage.getSlotCount()).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'storage_slots_owned'),
            { tolerance: 0, context: 'Owned storage slot total' },
        );
    });

    // Check the swapped numbered-chest IDs and owned/unowned numbered and named upgrades.
    const selectedChests = [
        { internalName: 'InvStorage14', saveId: '14', description: 'Storage Chest 14' },
        { internalName: 'InvStorage15', saveId: '13', description: 'Storage Chest 15' },
        { internalName: 'InvStorage30', saveId: '29', description: 'Storage Chest 30' },
        { internalName: 'InvStorageL', saveId: '106', description: 'Valenslime Chest' },
        { internalName: 'InvStorageZ', saveId: '107', description: 'Buried Treasure Chest' },
    ];

    for (const { internalName, saveId, description } of selectedChests) {
        it(`reports saved ownership and earned storage slots for ${description}`, () => {
            const chest = storage.chestUpgrades.find(candidate => candidate.internalName === internalName);
            if (!chest) {
                throw new Error(`Storage chest ${internalName} is missing from the domain`);
            }
            const unlocked = Object.prototype.hasOwnProperty.call(usedChests, saveId);
            const contribution = unlocked ? Number(usedChests[saveId]) : 0;

            expect(chest.unlocked).toBe(unlocked);
            expect(chest.slotContribution).toMatchLiveGameWithDetails(contribution, {
                tolerance: 0,
                context: `${description} owned storage slot contribution`,
            });
        });
    }
});
