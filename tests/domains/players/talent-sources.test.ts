import { Companions, getCompanionActiveBonus } from '../../../data/domain/companions';
import { initTalentTreeRepo } from '../../../data/domain/data/TalentTreeRepo';
import { Grimoire } from '../../../data/domain/grimoire';
import { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import { LUNARHEIM_TUNNEL_INDEX, Player, SkillData } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { ClassIndex, Talent, TalentLevelInputs } from '../../../data/domain/talents';
import { getTalentSourceGroups, updatePlayerTalentPresentation } from '../../../data/domain/talentSources';
import { Tesseract } from '../../../data/domain/tesseract';
import { Library } from '../../../data/domain/world-3/construction/construction';
import { Equinox } from '../../../data/domain/world-3/equinox';
import { Divinity } from '../../../data/domain/world-5/divinity';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { Sneaking } from '../../../data/domain/world-6/sneaking';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import type { Tunnel } from '../../../data/domain/world-7/spelunking';
import { ZenithMarket } from '../../../data/domain/world-7/zenithShop';

const talentData = initTalentTreeRepo().flatMap(tree => Object.values(tree.data.talents));
const createTalent = (skillIndex: number): Talent => {
  const data = talentData.find(talent => talent.skillIndex === skillIndex)!;
  return Talent.fromBase(data.name, data);
};

const createFixture = () => {
  const player = new Player(0, '');
  const inputs: TalentLevelInputs = {
    eliteTalentLevels: 0,
    achievementTalentLevels: 0,
    familyTalentLevels: 0,
    companionTalentLevels: 0,
    minorLinkTalentLevels: 0,
    equinoxTalentLevels: 0,
    ninjaMasteryTalentLevels: 0,
    grimoireTalentLevels: 0,
    equipmentTalentLevels: 0,
    tesseractTalentLevels: 0,
    gamingTalentLevels: 0,
    superTalentLevels: 50,
    allTalentCap: 9999,
  };
  player.applyTalentLevelInputs(inputs);

  const companions = new Companions('companions').init();
  const equipmentSets = new EquipmentSets('equipmentSets').init([], 0);
  const legendTalents = new LegendTalents('legendTalents').init([]);
  const zenithMarket = new ZenithMarket('zenithMarket').init([]);
  const grimoire = new Grimoire('grimoire').init([], 0);
  const tesseract = new Tesseract('tesseract').init([], 0);
  const equinox = new Equinox('equinox').init([], 0);
  const sneaking = new Sneaking('sneaking').init([], 0);
  const divinity = new Divinity('divinity');
  const gaming = new Gaming('gaming');
  const tunnels: Pick<Tunnel, 'loreCompleted'>[] = Array.from(
    { length: LUNARHEIM_TUNNEL_INDEX + 1 }, () => ({ loreCompleted: false }),
  );
  const data = new Map<string, any>(Object.entries({
    companions, equipmentSets, legendTalents, zenithMarket, grimoire,
    tesseract, equinox, sneaking, divinity, gaming, spelunking: { tunnels },
  }));

  return {
    player, inputs, data, companions, equipmentSets, legendTalents, zenithMarket,
    grimoire, tesseract, equinox, sneaking, divinity, gaming, tunnels,
  };
};

describe('Talent source contributions', () => {
  it('keeps fractions until the final talent floor, except for native source rounding and caps', () => {
    const { player, inputs, data } = createFixture();
    player.talents = [createTalent(149)];
    Object.assign(inputs, {
      eliteTalentLevels: 0.6,
      achievementTalentLevels: 0.6,
      familyTalentLevels: 0.9,
      companionTalentLevels: 0.6,
      minorLinkTalentLevels: 0.2,
      equinoxTalentLevels: 0.6,
      ninjaMasteryTalentLevels: 0.6,
      grimoireTalentLevels: 0.6,
      equipmentTalentLevels: 0.6,
      tesseractTalentLevels: 6.8,
      gamingTalentLevels: 0.6,
      superTalentLevels: 50.4,
    });
    player.applyTalentLevelInputs(inputs);

    // The eligible Symbols row comes first. The remaining rows follow source order.
    const rows = getTalentSourceGroups(data, player).ordinaryLevels;
    expect(rows.map(row => row.value)).toEqual([0.6, 1, 0, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 5, 0.6]);
    expect(rows.map(row => row.active)).toEqual([true, true, false, true, true, true, true, true, true, true, true]);
    expect(rows.reduce((total, row) => total + row.value, 0)).toBeCloseTo(10.8);

    const ordinaryTalent = createTalent(0);
    expect(ordinaryTalent.getExtraLevels(player.currentTalentInputs, false)).toBe(10);
    expect(ordinaryTalent.getExtraLevels(player.currentTalentInputs, true)).toBe(61);
  });

  it('does not floor a fractional Tesseract contribution below its cap', () => {
    const { player, inputs, data } = createFixture();
    inputs.tesseractTalentLevels = 2.7;
    player.applyTalentLevelInputs(inputs);
    expect(getTalentSourceGroups(data, player).ordinaryLevels[8].value).toBe(2.7);
  });

  it('previews bonuses from unowned sources without changing ownership or levels', () => {
    const fixture = createFixture();
    const { player, data, companions, equipmentSets, legendTalents, zenithMarket,
      grimoire, tesseract, equinox, sneaking } = fixture;
    const ownerState = () => ({
      companions: companions.map(companion => [companion.owned, companion.bonusTokenActive, companion.level]),
      sets: equipmentSets.equipmentSets.map(set => set.unlocked),
      legends: legendTalents.talents.map(talent => talent.level),
      market: zenithMarket.bonuses.map(bonus => [bonus.level, bonus.unlocked]),
      grimoire: grimoire.upgrades.map(upgrade => [upgrade.level, upgrade.unlocked, upgrade.bonus]),
      tesseract: tesseract.upgrades.map(upgrade => [upgrade.level, upgrade.unlocked, upgrade.bonus]),
      equinox: equinox.upgrades.map(upgrade => [upgrade.level, upgrade.unlocked]),
      masteries: sneaking.completedMasteries,
      rewards: sneaking.masteryRewards.map(reward => reward.earned),
    });
    const before = ownerState();
    const { ordinaryLevels, superLevels } = getTalentSourceGroups(data, player);
    // No Symbols row exists for this class. Positions identify each source, not its wording.
    const [, family, , slug, equinoxRow, mastery, grimoireRow, equipment, tesseractRow] = ordinaryLevels;
    expect([slug, equipment, equinoxRow, mastery, grimoireRow, tesseractRow].map(row => ({
      value: row.value, active: row.active, obtainableValue: row.obtainableValue,
    }))).toEqual([25, 5, 1, 5, 1, 1].map(obtainableValue => ({ value: 0, active: false, obtainableValue })));
    expect(superLevels.slice(1).map(row => ({
      value: row.value, active: row.active, obtainableValue: row.obtainableValue,
    }))).toEqual([10, 1].map(obtainableValue => ({ value: 0, active: false, obtainableValue })));
    expect(family.value).toBe(0);
    expect(family).not.toHaveProperty('obtainableValue');
    expect(ownerState()).toEqual(before);
  });

  it('uses current contributions instead of companion or equipment ownership', () => {
    const { player, inputs, data, companions, equipmentSets } = createFixture();
    const slug = companions.find(companion => companion.id === 1)!;
    const set = equipmentSets.equipmentSets.find(equipment => equipment.data.name === 'KATTLEKRUK_SET')!;
    slug.bonusTokenActive = true;
    inputs.companionTalentLevels = getCompanionActiveBonus(companions, slug.id);
    player.applyTalentLevelInputs(inputs);

    let rows = getTalentSourceGroups(data, player).ordinaryLevels;
    expect(slug.owned).toBe(false);
    expect(rows[3]).toMatchObject({ value: 25, active: true });
    expect(rows[7]).toMatchObject({ value: 0, active: false });

    slug.owned = true;
    slug.bonusTokenActive = false;
    set.unlocked = true;
    inputs.companionTalentLevels = 0;
    player.applyTalentLevelInputs(inputs);
    rows = getTalentSourceGroups(data, player).ordinaryLevels;
    expect(rows[3]).toMatchObject({ value: 0, active: false });
    expect(rows[7]).toMatchObject({ value: 0, active: false });
  });

  it('shows zero Arctis and Gaming previews when character levels give no bonus', () => {
    const { player, data } = createFixture();
    player.level = 599;
    player.skills.set(SkillsIndex.Divinity, new SkillData(0, 0, 0));
    const rows = getTalentSourceGroups(data, player).ordinaryLevels;
    expect(rows[0]).toMatchObject({ value: 0, active: false, obtainableValue: 0 });
    expect(rows[9]).toMatchObject({ value: 0, active: false, obtainableValue: 0 });
  });

  it.each([149, 374, 539])('previews an eligible uninvested Symbols talent %i without adding it to other classes', skillIndex => {
    const { player, inputs, data } = createFixture();
    expect(getTalentSourceGroups(data, player).ordinaryLevels).toHaveLength(10);
    const symbols = createTalent(skillIndex);
    player.talents = [symbols];
    player.applyTalentLevelInputs(inputs);
    const row = getTalentSourceGroups(data, player).ordinaryLevels[0];
    expect(row).toMatchObject({ value: 0, active: false, obtainableValue: symbols.getBonusAtLevel(1) });
    expect(row.obtainableValue).toBeGreaterThan(0);
    expect(symbols.pointsSpent).toBe(0);
    expect(symbols.level).toBe(0);
  });

  it('keeps uncapped class point sources separate from the capped total and previews the first point', () => {
    const { player, data, tunnels } = createFixture();
    player.level = 5000;
    tunnels[LUNARHEIM_TUNNEL_INDEX].loreCompleted = true;
    player.updateSuperTalentPoints(true);
    const { points } = getTalentSourceGroups(data, player);
    expect(points[0]).toMatchObject({ value: 46, active: true, obtainableValue: 1 });
    expect(points[1]).toMatchObject({ value: 1, active: true, obtainableValue: 1 });
    expect(player.superTalentPoints.total).toBe(20);
  });
});

describe('Prepared talent presentation', () => {
  it('keeps character results separate and removes old contributions and checkout requirements after refresh', () => {
    const { player, inputs, data } = createFixture();
    const secondPlayer = new Player(1, '');
    const library = new Library();
    const players = [player, secondPlayer];
    data.set('players', players);
    data.set('construction', { library });

    expect(player.talentPresentation).toEqual({
      sources: { points: [], superLevels: [], ordinaryLevels: [] },
      bonusLevels: 0,
      superTalentLevels: 0,
      checkoutSummary: { requiredCheckouts: 0, vipTalentsToBook: 0 },
    });

    player.classId = ClassIndex.Blood_Berserker;
    player.level = 700;
    player.talents = [
      Object.assign(createTalent(0), { bookMaxLevel: 100, libraryMaxLevel: 200 }),
      createTalent(149),
    ];
    player.applyTalentLevelInputs({ ...inputs, eliteTalentLevels: 1, companionTalentLevels: 25, superTalentLevels: 60 });
    secondPlayer.talents = [
      Object.assign(createTalent(0), { bookMaxLevel: 200, libraryMaxLevel: 200 }),
      Object.assign(createTalent(641), { bookMaxLevel: 100, libraryMaxLevel: 200 }),
    ];
    secondPlayer.applyTalentLevelInputs({ ...inputs, equipmentTalentLevels: 5 });

    updatePlayerTalentPresentation(data);

    expect(player.talentPresentation).toMatchObject({
      bonusLevels: 26,
      superTalentLevels: 60,
      checkoutSummary: { requiredCheckouts: 20, vipTalentsToBook: 0 },
    });
    expect(player.talentPresentation.sources.points[0]).toMatchObject({ value: 3, active: true });
    expect(player.talentPresentation.sources.ordinaryLevels.filter(row => row.active).map(row => row.value)).toEqual([1, 25]);
    expect(secondPlayer.talentPresentation).toMatchObject({
      bonusLevels: 5,
      superTalentLevels: 50,
      checkoutSummary: { requiredCheckouts: 0, vipTalentsToBook: 1 },
    });
    expect(secondPlayer.talentPresentation.sources.points[0]).toMatchObject({ value: 0, active: false });
    expect(secondPlayer.talentPresentation.sources.ordinaryLevels.filter(row => row.active).map(row => row.value)).toEqual([5]);

    player.level = 0;
    player.talents = [];
    player.applyTalentLevelInputs(inputs);
    updatePlayerTalentPresentation(data);

    expect(player.talentPresentation).toMatchObject({
      bonusLevels: 0,
      superTalentLevels: 50,
      checkoutSummary: { requiredCheckouts: 0, vipTalentsToBook: 0 },
    });
    expect(player.talentPresentation.sources.points[0]).toMatchObject({ value: 0, active: false });
    expect(player.talentPresentation.sources.ordinaryLevels).toHaveLength(10);
    expect(player.talentPresentation.sources.ordinaryLevels.every(row => !row.active && row.value === 0)).toBe(true);
    expect(secondPlayer.talentPresentation).toMatchObject({
      bonusLevels: 5,
      superTalentLevels: 50,
      checkoutSummary: { requiredCheckouts: 0, vipTalentsToBook: 1 },
    });
    expect(secondPlayer.talentPresentation.sources.ordinaryLevels.filter(row => row.active).map(row => row.value)).toEqual([5]);
  });

  it('counts only displayed class and special talent identities, with separate VIP requirements', () => {
    const { player, data } = createFixture();
    player.classId = ClassIndex.Barbarian;
    // The Squire talent is bookable but does not appear on a Barbarian page.
    const hiddenSquireSkill = 120;
    const vipSkill = 641;
    player.talents = [0, 100, 105, hiddenSquireSkill, vipSkill, 0, vipSkill].map(skillIndex =>
      Object.assign(createTalent(skillIndex), { bookMaxLevel: 100, libraryMaxLevel: 200 }),
    );
    player.talents.push(
      Object.assign(createTalent(642), { bookMaxLevel: 200, libraryMaxLevel: 200 }),
      createTalent(643),
    );
    data.set('players', [player]);
    data.set('construction', { library: new Library() });

    updatePlayerTalentPresentation(data);

    expect(player.talentPresentation.checkoutSummary).toEqual({
      requiredCheckouts: 60,
      vipTalentsToBook: 1,
    });
  });
});
