import { initLibraryMetadataRepo } from '../../../../data/domain/data/LibraryMetadataRepo';
import { initTalentTreeRepo } from '../../../../data/domain/data/TalentTreeRepo';
import { Talent } from '../../../../data/domain/talents';
import { Library } from '../../../../data/domain/world-3/construction/construction';

const talentTemplates = initTalentTreeRepo().flatMap(page => Object.values(page.data.talents));
const vipTalents = initLibraryMetadataRepo()[0].data.vipTalents;
const healthBoosterSkill = 0;
const manaBoosterSkill = 1;

const makeTalent = (skillIndex: number, bookMaxLevel: number, libraryMaxLevel: number | undefined, pointsSpent: number = 0): Talent => {
  const template = talentTemplates.find(talent => talent.skillIndex === skillIndex)!;
  const talent = new Talent(template.name, template);
  talent.bookMaxLevel = bookMaxLevel;
  talent.libraryMaxLevel = libraryMaxLevel;
  talent.pointsSpent = pointsSpent;
  talent.level = pointsSpent;
  talent.maxLevel = bookMaxLevel;
  return talent;
};

describe('Library checkout summary', () => {
  it.each([100, 175, 199])('requires one maximum-level book for a learned cap of %i below 200', bookMaxLevel => {
    const library = new Library();
    const talent = makeTalent(healthBoosterSkill, bookMaxLevel, 200);

    expect(library.getBookCheckoutSummary([talent])).toEqual({ requiredCheckouts: 20, vipTalentsToBook: 0 });
  });

  it('counts one book per normal talent regardless of allocated points', () => {
    const library = new Library();
    const talents = [
      makeTalent(healthBoosterSkill, 100, 200, 0),
      makeTalent(manaBoosterSkill, 199, 200, 300),
    ];

    expect(library.getBookCheckoutSummary(talents)).toEqual({ requiredCheckouts: 40, vipTalentsToBook: 0 });
  });

  it('excludes unallocated talents already at or above the attainable cap', () => {
    const library = new Library();
    const talents = [
      makeTalent(healthBoosterSkill, 200, 200, 0),
      makeTalent(manaBoosterSkill, 250, 200, 0),
    ];

    expect(library.getBookCheckoutSummary(talents)).toEqual({ requiredCheckouts: 0, vipTalentsToBook: 0 });
  });

  it('excludes talents unavailable from the Library', () => {
    const library = new Library();
    const talent = makeTalent(healthBoosterSkill, 100, undefined, 100);

    expect(library.getBookCheckoutSummary([talent])).toEqual({ requiredCheckouts: 0, vipTalentsToBook: 0 });
  });

  it('separates every eligible VIP talent from the guaranteed maximum checkout cost', () => {
    const library = new Library();
    const talents = [
      makeTalent(healthBoosterSkill, 100, 200),
      ...vipTalents.map(entry => makeTalent(entry.skillIndex, 0, 200)),
    ];

    expect(library.getBookCheckoutSummary(talents)).toEqual({
      requiredCheckouts: 20,
      vipTalentsToBook: vipTalents.length,
    });
  });

  it('excludes fully booked and unavailable VIP talents', () => {
    const library = new Library();
    const talents = [
      makeTalent(vipTalents[0].skillIndex, 100, 200),
      makeTalent(vipTalents[1].skillIndex, 200, 200),
      makeTalent(vipTalents[2].skillIndex, 100, undefined),
    ];

    expect(library.getBookCheckoutSummary(talents)).toEqual({ requiredCheckouts: 0, vipTalentsToBook: 1 });
  });

  it('counts repeated skill identities only once for normal and VIP talents', () => {
    const library = new Library();
    const normalTalent = makeTalent(healthBoosterSkill, 100, 200);
    const vipTalent = makeTalent(vipTalents[0].skillIndex, 100, 200);
    const talents = [
      normalTalent,
      normalTalent,
      makeTalent(healthBoosterSkill, 100, 200),
      vipTalent,
      vipTalent,
      makeTalent(vipTalent.skillIndex, 100, 200),
    ];

    expect(library.getBookCheckoutSummary(talents)).toEqual({ requiredCheckouts: 20, vipTalentsToBook: 1 });
  });

  it.each([0, 19, 20, 80])('keeps the gross requirement when %i checkouts are available', currentBooks => {
    const library = new Library();
    library.currentBooks = currentBooks;
    const talent = makeTalent(healthBoosterSkill, 100, 200);

    expect(library.getBookCheckoutSummary([talent])).toEqual({ requiredCheckouts: 20, vipTalentsToBook: 0 });
    expect(library.currentBooks).toBe(currentBooks);
  });

  it('requires no checkouts for an empty talent list', () => {
    expect(new Library().getBookCheckoutSummary([])).toEqual({ requiredCheckouts: 0, vipTalentsToBook: 0 });
  });
});
