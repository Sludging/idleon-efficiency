import type { Refinery } from '../../../data/domain/world-3/construction/refinery';
import type { Storage } from '../../../data/domain/storage';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type SaltCapture = {
  name: string;
  unlocked: boolean;
  progress: number;
  autoRefine: number;
  power: number;
  cap: number;
  meritApplies: boolean;
  costs: { name: string; quantity: number; perCycle: number }[];
  remainingCycles: number;
};

describe('Refinery saved power and cycle limit', () => {
  it('projects saved-state progress and remaining cycles with native power and capacity', () => {
    const results = loadExtractionResults('construction-refinery-core-data.json');
    validateExtractionHealth(results);
    const captures = results.extractions.refinery_core.result as SaltCapture[];
    const sustainabilityResults = loadExtractionResults('construction-refinery-sustainability-data.json');
    validateExtractionHealth(sustainabilityResults);
    const nativeRefinery = sustainabilityResults.extractions.refinery_sustainability_inputs.result as { refinery: number[][] };
    const savedRefinery = loadTestSave('latest').get('Refinery');
    const savedRows: (number | string)[][] = typeof savedRefinery === 'string'
      ? JSON.parse(savedRefinery)
      : savedRefinery;
    const data = loadGameDataFromSave('latest');
    const refinery = data.get('refinery') as Refinery;
    const storage = data.get('storage') as Storage;
    const quantity = (name: string) =>
      (refinery.storage.find(item => item.name === name)?.quantity ?? 0)
      + storage.chest.filter(item => item.internalName === name).reduce((sum, item) => sum + item.count, 0);

    captures.forEach((capture, index) => {
      const savedState = savedRows[index + 3];
      const salt = refinery.salts[capture.name];
      expect(salt.rank).toBe(nativeRefinery.refinery[index + 3][1]);
      expect(salt.getPowerPerCycle()).toMatchLiveGameWithDetails(capture.power, { tolerance: 0, context: `${capture.name} power per cycle` });
      expect(salt.getCap()).toMatchLiveGameWithDetails(capture.cap, { tolerance: 0, context: `${capture.name} power capacity` });
      if (capture.unlocked) {
        const savedProgress = Number(savedState[0]);
        const expectedCycles = Math.max(0, Math.round((capture.cap - savedProgress) / Math.max(capture.power, 1)));
        expect(salt.progress).toBe(savedProgress);
        const shortage = capture.costs.some(cost => quantity(cost.name) < cost.perCycle * expectedCycles);
        expect(salt.storedFuelInsufficient).toBe(shortage);
        expect(salt.autoRefineEnabled).toBe(capture.autoRefine > 0);
        expect(salt.getCyclesTillNextRank()).toMatchLiveGameWithDetails(expectedCycles, { tolerance: 0, context: `${capture.name} saved-state remaining cycles with native power and capacity` });
      }
    });
  });
});

describe('Refinery fuel projection', () => {
  it('uses active printing against each saved fuel item', () => {
    const coreResults = loadExtractionResults('construction-refinery-core-data.json');
    const sustainabilityResults = loadExtractionResults('construction-refinery-sustainability-data.json');
    validateExtractionHealth(coreResults);
    validateExtractionHealth(sustainabilityResults);
    const captures = coreResults.extractions.refinery_core.result as SaltCapture[];
    const inputs = sustainabilityResults.extractions.refinery_sustainability_inputs.result as {
      refinery: number[][];
      cycles: number[];
      slots: { name: string; quantity: number; factor: number }[];
    };
    const data = loadGameDataFromSave('latest');
    const refinery = data.get('refinery') as Refinery;
    const storage = data.get('storage') as Storage;
    const quantity = (name: string) =>
      (refinery.storage.find(item => item.name === name)?.quantity ?? 0)
      + storage.chest.filter(item => item.internalName === name).reduce((sum, item) => sum + item.count, 0);

    // The website projects fuel duration; the game does not provide this value directly.
    // Captured costs and active 3D Printer slots provide rates. Fuel balances come from the saved account.
    captures.forEach((capture, index) => {
      if (!capture.unlocked) return;
      const salt = refinery.salts[capture.name];
      expect(salt.rank).toBe(inputs.refinery[index + 3][1]);
      const cycleTime = inputs.cycles[Math.floor(index / 3)];
      const consumption = new Map<string, number>();
      capture.costs.forEach(cost => consumption.set(cost.name, (consumption.get(cost.name) ?? 0) + cost.perCycle));
      const limits: number[] = [];
      consumption.forEach((perCycle, name) => {
        const printedPerHour = name.includes('Refinery') ? 0 : inputs.slots
          .filter(slot => slot.name === name)
          .reduce((sum, slot) => sum + slot.quantity * slot.factor, 0);
        const netPerSecond = perCycle / cycleTime - printedPerHour / 3600;
        const fuel = salt.fuelInputs.find(row => row.item === name)!;
        expect(fuel.netUsePerHour).toMatchLiveGameWithDetails(Math.max(0, netPerSecond * 3600), {
          tolerance: 0,
          context: `${capture.name} ${name} net fuel use per hour`,
        });
        if (netPerSecond > 0) limits.push(quantity(name) / netPerSecond);
      });
      const expected = limits.length ? Math.min(...limits) : null;
      const actual = salt.fuelTimeSeconds;
      if (expected === null) {
        expect(actual).toBeNull();
      } else {
        expect(actual).not.toBeNull();
        expect(actual as number).toMatchLiveGameWithDetails(expected, {
          tolerance: 0,
          context: `${capture.name} projected fuel seconds with active printing`,
        });
      }
    });
  });
});
