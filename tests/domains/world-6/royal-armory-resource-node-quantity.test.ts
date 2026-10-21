import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { RoyalResourceNode } from '../../../data/domain/world-6/royalArmory/resourceNodes';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Royal Armory resource-node quantities', () => {
    let royalArmory: RoyalArmory;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('royal-armory-resource-node-quantity-data.json');
        validateExtractionHealth(results);
        // Use the normal domain factory and ordered account calculations for the matching real save.
        royalArmory = loadGameDataFromSave('latest').get('royalArmory') as RoyalArmory;
    });

    function nodeAt(nodeId: number): RoyalResourceNode {
        const node = royalArmory.resourceNodes.getNode(nodeId);
        if (!node) throw new Error(`Missing saved Royal Armory resource node ${nodeId}.`);
        return node;
    }

    const maximumCases = [
        { nodeId: 0, key: 'node_maximum_0', description: 'node 0 world 0 grade 0 baseline capacity' },
        { nodeId: 2, key: 'node_maximum_2', description: 'node 2 world 0 fractional grade-adjusted capacity' },
        { nodeId: 21, key: 'node_maximum_21', description: 'node 21 world 1 capacity factor' },
    ] as const;

    maximumCases.forEach(({ nodeId, key, description }) => {
        it(`matches the maximum harvest quantity for ${description}`, () => {
            const node = nodeAt(nodeId);
            expect(node.getMaximumQuantity()).toMatchLiveGameWithDetails(
                getExtractedValue(results, key),
                { tolerance: 0, context: `Maximum harvest quantity: ${description}` },
            );
        });
    });

});
