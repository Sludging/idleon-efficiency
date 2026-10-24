import { initAccountDataKeys } from '../../../data/domain/idleonData';
import { initAllItems } from '../../../data/domain/items';
import { StaticRepositories } from '../../../data/domain/repositories';
import { Gallery } from '../../../data/domain/world-7/gallery';

describe('Gallery no-save initialization', () => {
  it('exposes static Gallery state and previews before save processing', () => {
    const noSaveData = initAccountDataKeys(initAllItems(), new StaticRepositories());
    const gallery = noSaveData.get('gallery') as Gallery;
    const missingTrophy = gallery.trophies.find(trophy => trophy.name === 'Nine Dart Finish');
    const missingNametag = gallery.nametags[0];

    expect(noSaveData.get('players')).toEqual([]);
    expect((noSaveData.get('itemsData') as unknown[]).length).toBeGreaterThan(0);
    expect(gallery.trophies.length).toBeGreaterThan(0);
    expect(gallery.podiumCapacity).toBe(1);
    expect(gallery.capacitySources).toEqual([expect.objectContaining({ source: 'base', amount: 1 })]);
    expect(gallery.getPodiumCount(1)).toBe(1);
    expect(gallery.nametags.length).toBeGreaterThan(0);
    expect(missingTrophy).toBeDefined();
    expect(missingNametag).toBeDefined();
    expect(gallery.getBonusMultiplierForChip(false)).toBe(1);
    expect(gallery.getBonusMultiplierForChip(true)).toBe(1.1);
    const trophyPreview = gallery.getTrophyItemBonusesForChip(missingTrophy!, false);
    expect(trophyPreview).toEqual(expect.arrayContaining([
      expect.objectContaining({ channel: 'property', name: 'Weapon_Power' }),
      expect.objectContaining({ channel: 'property', name: 'Defence', value: 15 }),
    ]));
    expect(trophyPreview.find(bonus => bonus.name === 'Weapon_Power')?.value).toBeCloseTo(2.7, 10);
    expect(gallery.getNametagItemBonusesForChip(missingNametag!, false).length).toBeGreaterThan(0);
    expect(gallery.getCombinedBonusForChip('% DROP RATE', false)).toBe(0);
  });
});
