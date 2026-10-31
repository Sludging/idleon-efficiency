import { initTalentTreeRepo } from '../../../../data/domain/data/TalentTreeRepo';
import { Talent } from '../../../../data/domain/talents';

const healthBooster = initTalentTreeRepo().find(page => page.id === 'Beginner')!.data.talents['Health Booster'];

const makeTalent = (bookMaxLevel: number, libraryMaxLevel: number | undefined, pointsSpent: number, level: number, maxLevel: number): Talent => {
  const talent = new Talent(healthBooster.name, healthBooster);
  talent.bookMaxLevel = bookMaxLevel;
  talent.libraryMaxLevel = libraryMaxLevel;
  talent.pointsSpent = pointsSpent;
  talent.level = level;
  talent.maxLevel = maxLevel;
  return talent;
};

describe('Library booking state', () => {
  const cases: Array<[string, number, number | undefined, number, number, number, boolean, boolean]> = [
    ['unallocated talent at the attainable cap', 200, 200, 0, 0, 200, true, false],
    ['high allocation below the attainable cap', 100, 200, 100, 250, 300, false, true],
    ['learned cap above the current attainable cap', 250, 200, 0, 0, 250, true, false],
    ['talent unavailable from the Library', 100, undefined, 0, 0, 100, false, false],
  ];

  it.each(cases)('%s', (_description, learned, attainable, points, level, maxLevel, fullyBooked, canBookHigher) => {
    const talent = makeTalent(learned, attainable, points, level, maxLevel);

    expect(talent.isFullyBooked()).toBe(fullyBooked);
    expect(talent.canBookHigher()).toBe(canBookHigher);
  });
});
