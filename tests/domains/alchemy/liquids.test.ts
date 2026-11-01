import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { Cloudsave, safeJsonParse } from '../../../data/domain/cloudsave';
import { Player } from '../../../data/domain/player';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const liquidIndexes = [0, 1, 2, 3] as const;
const upgradeSpecs = [
  { name: 'capacity', property: 'capacityUpgrade', saveOffset: 18, nativeSlot: 2, resultIndex: 0 },
  { name: 'rate', property: 'rateUpgrade', saveOffset: 19, nativeSlot: 3, resultIndex: 1 },
] as const;

describe('Alchemy liquid cauldrons', () => {
  let alchemy: Alchemy;
  let save: Cloudsave;
  let results: ExtractionResults;

  beforeAll(() => {
    save = loadTestSave('latest');
    results = loadExtractionResults('alchemy-liquids-data.json');
    validateExtractionHealth(results);
    alchemy = loadGameDataFromSave('latest').get('alchemy') as Alchemy;
  });

  it('keeps all four liquid cauldrons in liquid-index order', () => {
    expect(alchemy.liquids).toHaveLength(liquidIndexes.length);
    liquidIndexes.forEach(liquidIndex => {
      expect(alchemy.liquids[liquidIndex].liquidIndex).toMatchLiveGameWithDetails(liquidIndex, {
        tolerance: 0,
        context: `Liquid cauldron ${liquidIndex} identity`,
      });
    });
  });

  describe.each(liquidIndexes)('liquid cauldron %i', liquidIndex => {
    it('retains the saved liquid amount without advancing production', () => {
      const savedAmounts = save.get('CauldronInfo')[6] as Record<number, number | string>;

      expect(alchemy.liquids[liquidIndex].amount).toMatchLiveGameWithDetails(Number(savedAmounts[liquidIndex]), {
        tolerance: 0,
        context: `Liquid ${liquidIndex} saved amount from CauldronInfo[6]`,
      });
    });

    it('matches the native maximum liquid capacity', () => {
      const nativeCapacities = results.extractions.liquid_capacities.result as number[];

      expect(alchemy.liquids[liquidIndex].capacity).toMatchLiveGameWithDetails(nativeCapacities[liquidIndex], {
        tolerance: 0,
        context: `Liquid ${liquidIndex} capacity from CauldronStats("LiquidCap", ${liquidIndex}, 0, 0)`,
      });
    });

    it('matches the saved liquid fill percentage against the independent display projection', () => {
      const fillPercentages = results.extractions.liquid_fill_percentages.result as number[];

      expect(alchemy.liquids[liquidIndex].fillPercent).toMatchLiveGameWithDetails(fillPercentages[liquidIndex], {
        tolerance: 0,
        context: `Liquid ${liquidIndex} fill percentage from saved amount and native capacity`,
      });
    });

    describe.each(upgradeSpecs)('$name upgrade', spec => {
      it('retains its own saved level and upgrade progress', () => {
        const upgrade = alchemy.liquids[liquidIndex][spec.property];
        const saveIndex = spec.saveOffset + 4 * liquidIndex;
        const savedLevels = save.get('CauldUpgLVs') as number[];
        const savedProgress = save.get('CauldUpgXPs') as number[];

        expect(upgrade.level).toMatchLiveGameWithDetails(Number(savedLevels[saveIndex]), {
          tolerance: 0,
          context: `Liquid ${liquidIndex} ${spec.name} upgrade level at saved index ${saveIndex}`,
        });
        expect(upgrade.progress).toMatchLiveGameWithDetails(Number(savedProgress[saveIndex]), {
          tolerance: 0,
          context: `Liquid ${liquidIndex} ${spec.name} upgrade progress at saved index ${saveIndex}`,
        });
      });

      it('matches the native requirement for that upgrade', () => {
        const upgrade = alchemy.liquids[liquidIndex][spec.property];
        const nativeRequirements = results.extractions.liquid_upgrade_requirements.result as number[][];

        expect(upgrade.requirement).toMatchLiveGameWithDetails(nativeRequirements[liquidIndex][spec.resultIndex], {
          tolerance: 0,
          context: `Liquid ${liquidIndex} ${spec.name} requirement from native slot ${spec.nativeSlot}`,
        });
      });

      it('identifies when saved progress can register the next upgrade level', () => {
        const upgrade = alchemy.liquids[liquidIndex][spec.property];
        const saveIndex = spec.saveOffset + 4 * liquidIndex;
        const savedProgress = save.get('CauldUpgXPs') as number[];
        const nativeRequirements = results.extractions.liquid_upgrade_requirements.result as number[][];
        const expectedReady = Number(savedProgress[saveIndex]) >= nativeRequirements[liquidIndex][spec.resultIndex];

        expect(upgrade.readyToRegister).toBe(expectedReady);
      });
    });

    it('preserves the identities of players assigned to this liquid', () => {
      const savedJobs = safeJsonParse<number[]>(save, 'CauldronJobs1', []);
      const savedNames = save.get('playerNames') as string[];
      // Native liquid selections map to jobs 4 through 7, including the fourth liquid.
      const assignedPlayerIds = savedNames.flatMap((_, playerID) =>
        Number(savedJobs[playerID]) === liquidIndex + 4 ? [playerID] : [],
      );
      const assignedPlayers = alchemy.liquids[liquidIndex].assignedPlayers;

      expect(assignedPlayers).toHaveLength(assignedPlayerIds.length);
      const actualPlayers = [...assignedPlayers].sort((left, right) => left.playerID - right.playerID);
      assignedPlayerIds.forEach((playerID, position) => {
        expect(actualPlayers[position]).toBeInstanceOf(Player);
        expect(actualPlayers[position].playerID).toMatchLiveGameWithDetails(playerID, {
          tolerance: 0,
          context: `Liquid ${liquidIndex} assigned player identity`,
        });
        expect(actualPlayers[position].playerName).toBe(savedNames[playerID]);
      });
    });

    it('matches the saved Dragonic purchase state for this liquid', () => {
      const savedOptions = save.get('OptLacc') as (number | string)[];

      expect(alchemy.liquids[liquidIndex].dragonic).toBe(Number(savedOptions[123]) > liquidIndex);
    });
  });
});
