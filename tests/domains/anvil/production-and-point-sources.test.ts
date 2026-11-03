import { AnvilWrapper } from '../../../data/domain/world-1/anvil';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const cloudSave = loadTestSave(saveName);
const playerNames = cloudSave.get('playerNames') as string[];

const pointFields = [
  ['availablePoints', 0],
  ['pointsFromCoins', 1],
  ['pointsFromMats', 2],
  ['xpPoints', 3],
  ['speedPoints', 4],
  ['capPoints', 5],
] as const;

describe('Anvil Domain - saved production EXP and points', () => {
  let anvilWrapper: AnvilWrapper;

  beforeAll(() => {
    anvilWrapper = loadGameDataFromSave(saveName).get('anvil') as AnvilWrapper;
  });

  describe.each(playerNames.map((playerName, playerID) => ({ playerName, playerID })))(
    '$playerName (character $playerID)',
    ({ playerName, playerID }) => {

      it('matches stored Smithing EXP for every represented product', () => {
        const savedProducts = cloudSave.get(`AnvilPA_${playerID}`) as number[][];
        const anvil = anvilWrapper.playerAnvils[playerID];

        for (const product of anvil.production) {
          expect(product.currentXP).toMatchLiveGameWithDetails(savedProducts[product.index][1], {
            tolerance: 0,
            context: `${playerName}: product ${product.index} stored Smithing EXP (saved product position 1)`,
          });
        }
      });

      it('matches Anvil points earned from the saved Smithing level', () => {
        const savedSkillLevels = cloudSave.get(`Lv0_${playerID}`) as number[];

        expect(anvilWrapper.playerAnvils[playerID].pointsFromSmithing).toMatchLiveGameWithDetails(
          savedSkillLevels[2],
          {
            tolerance: 0,
            context: `${playerName}: Smithing-earned Anvil points (saved skill position 2)`,
          },
        );
      });

      it.each(pointFields)('matches saved %s at point position %i', (field, savedPosition) => {
        const savedPoints = cloudSave.get(`AnvilPAstats_${playerID}`) as number[];

        expect(anvilWrapper.playerAnvils[playerID][field]).toMatchLiveGameWithDetails(
          savedPoints[savedPosition],
          {
            tolerance: 0,
            context: `${playerName}: ${field} (saved Anvil point position ${savedPosition})`,
          },
        );
      });
    },
  );
});
