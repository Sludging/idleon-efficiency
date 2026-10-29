import type { Refinery, SaltStatus } from '../../../data/domain/world-3/construction/refinery';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type Capture = {
  refinery: number[][];
  info: string[][];
  task: number;
  cycles: number[];
  powers: number[];
  companion: number;
  slots: { name: string; quantity: number; factor: number }[];
};

type Projection = {
  outputPerHour: number;
  consumedPerHour: number;
  balancePerHour: number;
};

// Game 1.24 idleon1.24.txt:172357-172366 supplies cycle time and power.
// The printer multiplier and collection are at :173300-173325 and :197636-197639.
// Toolbox refinery.ts:271-293,323-415 defines this website projection, not a native getter.
// It assumes continuous cycles with enough fuel, even when a salt's power bar is full.
// Safe rank assumes the previous salt is active and ignores inputs without active samples.
const project = (capture: Capture, index: number): Projection => {
  const { refinery, info, task, cycles, powers } = capture;
  const unlocked = (i: number) => i < refinery[0][0];
  const active = (i: number) => Boolean(refinery[i + 3][3]);
  const cycle = (i: number) => cycles[Math.floor(i / 3)];
  const recipe = (i: number) => info[i].slice(0, 6).map((name, position) => ({
    name,
    quantity: Number(info[i][position + 6]),
  })).filter(item => item.name !== 'Blank');

  const outputPerHour = unlocked(index) && active(index) ? powers[index] * 3600 / cycle(index) : 0;
  const next = index + 1;
  const nextCost = next < info.length ? recipe(next).find(item => item.name === info[index][12]) : undefined;
  const consumedPerHour = unlocked(index) && next < info.length && unlocked(next) && active(next) && nextCost
    ? Math.floor(Math.pow(refinery[next + 3][1], next <= task ? 1.3 : 1.5)) * nextCost.quantity * 3600 / cycle(next)
    : 0;

  return { outputPerHour, consumedPerHour, balancePerHour: outputPerHour - consumedPerHour };
};

describe('Refinery sustainability projections', () => {
  let capture: Capture;
  let refinery: Refinery;

  beforeAll(() => {
    const results = loadExtractionResults('construction-refinery-sustainability-data.json');
    validateExtractionHealth(results);
    capture = results.extractions.refinery_sustainability_inputs.result as Capture;
    refinery = loadGameDataFromSave('latest').get('refinery') as Refinery;
  });

  // The nine native recipes cover all three cycle groups.
  const fields: ('outputPerHour' | 'consumedPerHour' | 'balancePerHour')[] = ['outputPerHour', 'consumedPerHour', 'balancePerHour'];
  const cases = Array.from({ length: 9 }, (_, index) => fields.map(field => ({ index, field }))).flat();

  it.each(cases)('matches $field for salt $index', ({ index, field }) => {
    const salt = refinery.salts[capture.info[index][12]] as SaltStatus;
    expect(salt.rank).toBe(capture.refinery[index + 3][1]);
    expect(salt.unlocked).toBe(index < capture.refinery[0][0]);
    expect(Boolean(salt.active)).toBe(index < capture.refinery[0][0] && Boolean(capture.refinery[index + 3][3]));

    const expected = project(capture, index);
    const actual = salt[field];
    expect(actual).toMatchLiveGameWithDetails(expected[field], {
      tolerance: 0,
      context: `${capture.info[index][12]} ${field} (salt per hour)`,
    });
  });

  it('reports only limits imposed by a feeder or an active printer sample', () => {
    capture.info.forEach((recipe, index) => {
      const salt = refinery.salts[recipe[12]] as SaltStatus;
      if (index >= capture.refinery[0][0]) {
        expect(salt.maxSafeRank).toBeNull();
        return;
      }

      const cycle = capture.cycles[Math.floor(index / 3)];
      const constraints: { allowance: number; quantity: number; exponent: number }[] = [];
      recipe.slice(0, 6).forEach((name, position) => {
        if (name === 'Blank') return;
        const quantity = Number(recipe[position + 6]);
        if (index > 0 && name === capture.info[index - 1][12]) {
          const previousCycle = capture.cycles[Math.floor((index - 1) / 3)];
          constraints.push({
            allowance: capture.powers[index - 1] * cycle / previousCycle,
            quantity,
            exponent: index <= capture.task ? 1.3 : 1.5,
          });
        } else if (!name.includes('Refinery')) {
          const printed = capture.slots.filter(slot => slot.name === name)
            .reduce((sum, slot) => sum + slot.quantity * slot.factor, 0);
          if (printed > 0) constraints.push({ allowance: printed * cycle / 3600, quantity, exponent: 1.5 });
        }
      });

      if (constraints.length === 0) {
        expect(salt.maxSafeRank).toBeNull();
        return;
      }
      expect(salt.maxSafeRank).not.toBeNull();
      const rank = salt.maxSafeRank as number;
      expect(Number.isInteger(rank)).toBe(true);
      expect(rank).toBeGreaterThanOrEqual(0);
      const fits = (constraint: typeof constraints[number], candidate: number) =>
        Math.floor(Math.pow(candidate, constraint.exponent)) * constraint.quantity <= constraint.allowance + 1e-9;
      expect(constraints.every(constraint => fits(constraint, rank))).toBe(true);
      expect(constraints.some(constraint => !fits(constraint, rank + 1))).toBe(true);
    });
  });
});
