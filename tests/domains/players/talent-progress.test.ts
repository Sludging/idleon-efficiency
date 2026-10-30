import { Player } from '../../../data/domain/player';
import type { Talent } from '../../../data/domain/talents';

const talent = (pointsSpent: number, bookMaxLevel: number, level: number, maxLevel: number): Talent =>
  ({ pointsSpent, bookMaxLevel, level, maxLevel } as Talent);

describe('Super Talent point boundaries', () => {
  it.each([
    [0, false, 0], [499, false, 0], [500, false, 1], [599, false, 1],
    [600, false, 2], [0, true, 1], [499, true, 1], [500, true, 2],
    [2299, true, 19], [2300, true, 20], [2400, false, 20], [5000, true, 20],
  ])('class level %i, Lore completed %s gives %i points', (level, loreCompleted, total) => {
    const player = new Player(0, '');
    player.level = level;
    player.updateSuperTalentPoints(loreCompleted);
    expect(player.superTalentPoints).toEqual({ total, spent: 0, remaining: total });
  });

  it('counts duplicates and stale selections only in the first 20 active slots', () => {
    const player = new Player(0, '');
    player.level = 600;
    player.allPresetSuperTalentIndexes = new Set([3, 4, 5, 6]);
    player.setActiveSuperTalentSlots([3, 3, 99999, ...Array(17).fill(-1), 4]);
    player.updateSuperTalentPoints(false);
    expect(player.superTalentPoints).toEqual({ total: 2, spent: 3, remaining: 0 });
  });

  it('counts an active selection even without any ordinary talent investment', () => {
    const player = new Player(0, '');
    player.level = 500;
    player.talents = [talent(0, 100, 0, 100)];
    player.setActiveSuperTalentSlots([123]);
    player.updateSuperTalentPoints(false);
    expect(player.superTalentPoints).toEqual({ total: 1, spent: 1, remaining: 0 });
  });

  it('replaces the previous preset count rather than unioning presets', () => {
    const player = new Player(0, '');
    player.level = 600;
    player.setActiveSuperTalentSlots([1, 2]);
    player.setActiveSuperTalentSlots([3, -1]);
    player.updateSuperTalentPoints(false);
    expect(player.superTalentPoints).toEqual({ total: 2, spent: 1, remaining: 1 });
  });
});

describe('Talent page progress', () => {
  const player = new Player(0, '');

  it('sums positive saved book caps and ignores bonus levels', () => {
    const talents = [talent(20, 100, 120, 200), talent(50, 50, 80, 80), talent(0, -1, 0, 0)];
    expect(player.getTalentPageProgress(talents)).toEqual({ pointsRequiredToMax: 150, isMaxed: false });
    expect(talents.map(item => item.bookMaxLevel)).toEqual([100, 50, -1]);
  });

  it('reports full only when every available talent reaches its saved cap', () => {
    expect(player.getTalentPageProgress([talent(100, 100, 100, 250), talent(50, 50, 50, 200)]))
      .toEqual({ pointsRequiredToMax: 150, isMaxed: true });
    expect(player.getTalentPageProgress([talent(150, 100, 150, 150), talent(49, 50, 149, 150)]))
      .toEqual({ pointsRequiredToMax: 150, isMaxed: false });
  });
});
