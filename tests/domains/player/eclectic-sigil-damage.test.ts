import { initResearchGridBonusRepo } from '../../../data/domain/data/ResearchGridBonusRepo';
import { initSigilRepo } from '../../../data/domain/data/SigilRepo';
import { getEclecticSigilDamageMultiplier } from '../../../data/domain/player-damage-multiplier';
import { Sigil, Sigils } from '../../../data/domain/world-2/alchemy/sigils';
import { ResearchGrid, ResearchGridBonus } from '../../../data/domain/world-7/research';

describe('Eclectic Sigil combat damage multiplier', () => {
  let sigils: Sigils;
  let research: ResearchGrid;
  let damageBonus: ResearchGridBonus;

  beforeEach(() => {
    sigils = new Sigils('sigils');
    sigils.sigils = Sigil.fromBase(initSigilRepo());
    research = new ResearchGrid('research');
    const definitions = initResearchGridBonusRepo();
    damageBonus = new ResearchGridBonus(127, definitions.find(bonus => bonus.index === 127)!.data);
    damageBonus.level = 1;
    const eclecticUnlock = new ResearchGridBonus(128, definitions.find(bonus => bonus.index === 128)!.data);
    eclecticUnlock.linkedState = {
      kind: 'eclecticSigils', researchGranted: false, loreCompleted: false, effectiveUnlocked: false,
    };
    research.bonuses = [damageBonus, eclecticUnlock];
  });

  const setEclecticCount = (count: number): void => {
    sigils.sigils.forEach((sigil, index) => {
      sigil.boostLevel = index < count ? 4 : -1;
    });
  };

  it('adds no damage without Eclectic Sigils', () => {
    expect(getEclecticSigilDamageMultiplier(sigils, research)).toBe(1);
  });

  it('counts Eclectic and higher tiers, but not Ethereal or lower tiers', () => {
    [-1, 0, 1, 2, 3, 4, 5].forEach((level, index) => {
      sigils.sigils[index].boostLevel = level;
    });

    expect(getEclecticSigilDamageMultiplier(sigils, research)).toBeCloseTo(1.02, 12);
  });

  it('uses the effective Research bonus, including Shape and shared Grid scaling', () => {
    setEclecticCount(2);
    damageBonus.shapeBonusPercent = 20;
    damageBonus.allBonusMultiplier = 1.5;

    expect(getEclecticSigilDamageMultiplier(sigils, research)).toBeCloseTo(1.036, 12);
  });

  it('gives 1.078 for six Eclectic Sigils with an effective 1.3 percent bonus', () => {
    setEclecticCount(6);
    damageBonus.allBonusMultiplier = 1.3;

    expect(getEclecticSigilDamageMultiplier(sigils, research)).toBeCloseTo(1.078, 12);
  });

  it('adds no damage when the Research damage square is inactive', () => {
    setEclecticCount(6);
    damageBonus.level = 0;
    damageBonus.allBonusMultiplier = 1.3;

    expect(getEclecticSigilDamageMultiplier(sigils, research)).toBe(1);
  });

  it('does not require the Eclectic unlock square or completed lore', () => {
    setEclecticCount(1);

    expect(getEclecticSigilDamageMultiplier(sigils, research)).toBeCloseTo(1.01, 12);
  });

  it.each([100, 150])('caps the combat bonus at 100 percent with %i percent per Sigil', bonus => {
    setEclecticCount(1);
    damageBonus.allBonusMultiplier = bonus;

    expect(getEclecticSigilDamageMultiplier(sigils, research)).toBe(2);
  });
});
