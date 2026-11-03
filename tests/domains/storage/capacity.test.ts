import { Storage } from '../../../data/domain/storage';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

interface NativeStorageChest {
    internalName: string;
    id: number;
    displayName: string;
    capacity: number;
}

// Native evidence: ../IdleonWikiBot/codefiles/idleon1.25.txt:181227-181276,326247-326272.
describe('Storage capacity and chest upgrades', () => {
    let storage: Storage;
    let extractionResults: ExtractionResults;
    let nativeChests: NativeStorageChest[];
    let usedChests: Record<string, number | string>;

    beforeAll(() => {
        storage = loadGameDataFromSave('latest').get('storage') as Storage;
        extractionResults = loadExtractionResults('storage-capacity-data.json');
        validateExtractionHealth(extractionResults);
        nativeChests = extractionResults.extractions.storage_chest_catalogue.result as NativeStorageChest[];
        usedChests = JSON.parse(loadTestSave('latest').get('InvStorageUsed') as string) as Record<string, number | string>;
    });

    it('reports the native total of owned storage slots', () => {
        expect(storage.getSlotCount()).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'storage_slots_owned'),
            { tolerance: 0, context: 'Owned storage slot total' },
        );
    });

    it('lists every true chest upgrade with its native item and ownership identity', () => {
        const actual = storage.chestUpgrades.map(chest => ({
            internalName: chest.internalName,
            id: chest.id,
        })).sort((left, right) => left.id - right.id);
        const expected = nativeChests.map(chest => ({
            internalName: chest.internalName,
            id: chest.id,
        }));
        expect(actual).toHaveLength(50);
        expect(actual).toEqual(expected);
    });

    // Chests 14 and 15 have swapped save IDs. Named chests use a separate ID range.
    // Chest 30 and Buried Treasure Chest cover unowned numbered and named upgrades.
    const selectedChests = [
        { internalName: 'InvStorage14', description: 'Storage Chest 14' },
        { internalName: 'InvStorage15', description: 'Storage Chest 15' },
        { internalName: 'InvStorage30', description: 'Storage Chest 30' },
        { internalName: 'InvStorageL', description: 'Valenslime Chest' },
        { internalName: 'InvStorageZ', description: 'Buried Treasure Chest' },
    ];

    for (const { internalName, description } of selectedChests) {
        it(`reports ownership and individual slot contribution for ${description}`, () => {
            const chest = storage.chestUpgrades.find(candidate => candidate.internalName === internalName);
            const nativeChest = nativeChests.find(candidate => candidate.internalName === internalName);
            if (!chest || !nativeChest) {
                throw new Error(`Storage chest ${internalName} is missing from the domain or native catalogue`);
            }
            const unlocked = Object.prototype.hasOwnProperty.call(usedChests, String(nativeChest.id));
            const contribution = unlocked ? Number(usedChests[String(nativeChest.id)]) : 0;

            expect(chest.unlocked).toBe(unlocked);
            expect(chest.capacity).toMatchLiveGameWithDetails(nativeChest.capacity, {
                tolerance: 0,
                context: `${description} potential storage slots`,
            });
            expect(chest.slotContribution).toMatchLiveGameWithDetails(contribution, {
                tolerance: 0,
                context: `${description} owned storage slot contribution`,
            });
        });
    }
});
