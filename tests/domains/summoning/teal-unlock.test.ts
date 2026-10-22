import { initAllItems } from '../../../data/domain/items';
import { StaticRepositories } from '../../../data/domain/repositories';
import { SummonEssenceColor, Summoning } from '../../../data/domain/world-6/summoning';
import { Spelunking } from '../../../data/domain/world-7/spelunking';

describe('Summoning Teal essence unlock', () => {
  it('unlocks only for Chucklemire Lore and clears when Lore is lost', () => {
    const allItems = initAllItems();
    const summoning = new Summoning().init(allItems, 1);
    const spelunking = new Spelunking();
    spelunking.init(allItems, 1, new StaticRepositories());

    const tealEssence = summoning.summonEssences.find(essence => essence.color === SummonEssenceColor.Teal)!;
    const chucklemire = spelunking.tunnels.find(tunnel => tunnel.data.name === 'Chucklemire')!;
    const otherTunnel = spelunking.tunnels.find(tunnel => tunnel.data.name === 'Pebble Cove')!;

    otherTunnel.loreCompleted = true;
    otherTunnel.bestDepth = otherTunnel.data.bossDepth;
    chucklemire.bestDepth = chucklemire.data.bossDepth;
    summoning.updateTealEssenceUnlock(spelunking);
    expect(tealEssence.unlocked).toBe(false);

    chucklemire.loreCompleted = true;
    chucklemire.bestDepth = 0;
    summoning.updateTealEssenceUnlock(spelunking);
    expect(tealEssence.unlocked).toBe(true);

    chucklemire.loreCompleted = false;
    summoning.updateTealEssenceUnlock(spelunking);
    expect(tealEssence.unlocked).toBe(false);
  });
});
