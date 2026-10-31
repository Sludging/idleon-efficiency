import { StaticRepositories } from '../../../data/domain/repositories';
import { WeeklyBoss, WeeklyBossShopCharacter, type WeeklyBossCharacterIdentity } from '../../../data/domain/weekly-boss';

function createWeeklyBoss(): WeeklyBoss {
  const weeklyBoss = new WeeklyBoss();
  weeklyBoss.init(new StaticRepositories());
  return weeklyBoss;
}

function characterIdentity(playerIndex: number): WeeklyBossCharacterIdentity {
  return {
    playerIndex,
    playerName: `Character ${playerIndex + 1}`,
    classImageData: { location: 'ClassIcons0', width: 36, height: 36 },
  };
}

describe('Weekly Bosses task power', () => {
  it('starts at zero and reaches half power at the Mining reference quantity', () => {
    const weeklyBoss = createWeeklyBoss();
    // Mining reaches 50% task power at a quantity of 60.
    expect(weeklyBoss.getTaskPower(0, 0)).toBe(0);
    expect(weeklyBoss.getTaskPower(60, 0)).toBe(0.5);
  });

  it('provides quantities for 50%, 75%, and 90% task power', () => {
    const weeklyBoss = createWeeklyBoss();
    expect(weeklyBoss.getTaskPowerReferences(0)).toEqual([
      { power: 0.5, quantity: 60 },
      { power: 0.75, quantity: 180 },
      { power: 0.9, quantity: 540 },
    ]);
    expect(weeklyBoss.getTaskPower(180, 0)).toBe(0.75);
    expect(weeklyBoss.getTaskPower(540, 0)).toBe(0.9);
  });

  it('keeps improving above the references without a finite hard cap', () => {
    const weeklyBoss = createWeeklyBoss();
    expect(weeklyBoss.getTaskPower(5940, 0)).toBe(0.99);
    expect(weeklyBoss.getTaskPower(59940, 0)).toBe(0.999);
  });
});

describe('Weekly Bosses character shop rewards', () => {
  it('checks each world unlock separately, including zero and negative remaining kills', () => {
    const starter = new WeeklyBossShopCharacter(characterIdentity(0), {
      world2KillsLeft: 1, world3KillsLeft: 1, world4KillsLeft: 1, world5KillsLeft: 1,
    });
    const world2 = new WeeklyBossShopCharacter(characterIdentity(1), {
      world2KillsLeft: 0, world3KillsLeft: 1, world4KillsLeft: 1, world5KillsLeft: 1,
    });
    const world3 = new WeeklyBossShopCharacter(characterIdentity(2), {
      world2KillsLeft: 1, world3KillsLeft: -1, world4KillsLeft: 1, world5KillsLeft: 1,
    });
    const world4 = new WeeklyBossShopCharacter(characterIdentity(3), {
      world2KillsLeft: 1, world3KillsLeft: 1, world4KillsLeft: 0, world5KillsLeft: 1,
    });
    const world5 = new WeeklyBossShopCharacter(characterIdentity(4), {
      world2KillsLeft: 1, world3KillsLeft: 1, world4KillsLeft: 1, world5KillsLeft: 0,
    });

    expect(starter.getReward('EquipmentStatues', 500)).toEqual({ itemId: 'EquipmentStatues7', quantity: 1000 });
    expect(world2.getReward('EquipmentStatues', 500)).toEqual({ itemId: 'EquipmentStatues9', quantity: 1000 });
    expect(world3.getReward('EquipmentStatues', 500)).toEqual({ itemId: 'EquipmentStatues11', quantity: 1000 });
    expect(world4.getReward('EquipmentStatues', 500)).toEqual({ itemId: 'EquipmentStatues13', quantity: 1000 });
    expect(world5.getReward('EquipmentStatues', 500)).toEqual({ itemId: 'EquipmentStatues15', quantity: 1000 });
    expect(starter.getReward('FoodG', 500)).toEqual({ itemId: 'FoodG2', quantity: 100 });
    expect(world2.getReward('FoodG', 500)).toEqual({ itemId: 'FoodG3', quantity: 100 });
    expect(world3.getReward('FoodG', 500)).toEqual({ itemId: 'FoodG4', quantity: 100 });
    expect(world4.getReward('FoodG', 500)).toEqual({ itemId: 'FoodG5', quantity: 100 });
    expect(world5.getReward('FoodG', 500)).toEqual({ itemId: 'FoodG6', quantity: 100 });
  });

  it('rounds each reward item number down and applies its lower and upper limits', () => {
    const starter = new WeeklyBossShopCharacter(characterIdentity(0), {
      world2KillsLeft: 1, world3KillsLeft: 1, world4KillsLeft: 1, world5KillsLeft: 1,
    });
    const advanced = new WeeklyBossShopCharacter(characterIdentity(1), {
      world2KillsLeft: 0, world3KillsLeft: 0, world4KillsLeft: 0, world5KillsLeft: 0,
    });

    expect(starter.getReward('EquipmentStatues', 0)).toEqual({ itemId: 'EquipmentStatues1', quantity: 1000 });
    expect(starter.getReward('EquipmentStatues', 142)).toEqual({ itemId: 'EquipmentStatues1', quantity: 1000 });
    expect(starter.getReward('EquipmentStatues', 143)).toEqual({ itemId: 'EquipmentStatues2', quantity: 1000 });
    expect(starter.getReward('FoodG', 0)).toEqual({ itemId: 'FoodG1', quantity: 100 });
    expect(starter.getReward('FoodG', 399)).toEqual({ itemId: 'FoodG1', quantity: 100 });
    expect(starter.getReward('FoodG', 400)).toEqual({ itemId: 'FoodG2', quantity: 100 });
    expect(advanced.getReward('EquipmentStatues', 999)).toEqual({ itemId: 'EquipmentStatues25', quantity: 1000 });
    expect(advanced.getReward('FoodG', 999)).toEqual({ itemId: 'FoodG10', quantity: 100 });
  });

  it('leaves rewards unknown when missing world progress can change the item', () => {
    const unknown = new WeeklyBossShopCharacter(characterIdentity(0), {
      world2KillsLeft: 0, world3KillsLeft: 0, world4KillsLeft: 0, world5KillsLeft: undefined,
    });
    const knownLaterGate = new WeeklyBossShopCharacter(characterIdentity(1), {
      world2KillsLeft: undefined, world3KillsLeft: undefined, world4KillsLeft: undefined, world5KillsLeft: 0,
    });

    expect(unknown.getReward('EquipmentStatues', 500)).toBeUndefined();
    expect(unknown.getReward('FoodG', 500)).toBeUndefined();
    expect(knownLaterGate.getReward('EquipmentStatues', 500)).toEqual({ itemId: 'EquipmentStatues15', quantity: 1000 });
  });

  it('calculates character rewards and matches Hat Rack deposits by exact item ID', () => {
    const weeklyBoss = createWeeklyBoss();
    const statues = weeklyBoss.shopEntries.find(entry => entry.data.intName === 'EquipmentStatues')!;
    const food = weeklyBoss.shopEntries.find(entry => entry.data.intName === 'FoodG')!;
    const headband = weeklyBoss.shopEntries.find(entry => entry.data.intName === 'EquipmentHats10')!;
    const crow = weeklyBoss.shopEntries.find(entry => entry.data.intName === 'EquipmentHats84')!;
    const character = new WeeklyBossShopCharacter(characterIdentity(7), {
      world2KillsLeft: 0, world3KillsLeft: 0, world4KillsLeft: 0, world5KillsLeft: 0,
    });

    expect(weeklyBoss.getShopRewards(statues.index)).toEqual([]);
    expect(weeklyBoss.getShopHatDeposited(headband.index)).toBeUndefined();
    weeklyBoss.updateShopRewards([character], [
      { internalName: 'EquipmentHats10', stored: true },
      { internalName: 'EquipmentHats84', stored: false },
      { internalName: 'EquipmentHats840', stored: true },
    ]);

    expect(weeklyBoss.getShopRewards(statues.index)).toEqual([
      expect.objectContaining({ playerIndex: 7, quantity: 1000 }),
    ]);
    expect(weeklyBoss.getShopRewards(food.index)).toEqual([
      expect.objectContaining({ playerIndex: 7, quantity: 100 }),
    ]);
    expect(weeklyBoss.getShopHatDeposited(headband.index)).toBe(true);
    expect(weeklyBoss.getShopHatDeposited(crow.index)).toBe(false);
    expect(weeklyBoss.getShopHatDeposited(statues.index)).toBeUndefined();
  });
});
