import { CardInfo } from '../../../data/domain/cards';
import { initSpelunkingTunnelRepo } from '../../../data/domain/data/SpelunkingTunnelRepo';
import { initSpelunkingUpgradeRepo } from '../../../data/domain/data/SpelunkingUpgradeRepo';
import { initTalentTreeRepo } from '../../../data/domain/data/TalentTreeRepo';
import { Player, SkillData } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Talent, type TalentLevelInputs } from '../../../data/domain/talents';
import { SkillMastery } from '../../../data/domain/world-4/rift';
import {
    type Chapter,
    Spelunking,
    SpelunkingStamina,
    Tunnel,
    Upgrade,
    updateSpelunkingAccountMetrics,
} from '../../../data/domain/world-7/spelunking';

const talentInputs = (overrides: Partial<TalentLevelInputs> = {}): TalentLevelInputs => ({
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
    superTalentLevels: 0,
    allTalentCap: 0,
    ...overrides,
});

const royalGuardianTemplates = Object.values(
    initTalentTreeRepo().find(tree => tree.id === 'Royal Guardian')!.data.talents,
);

const talent = (skillIndex: number, pointsSpent: number): Talent => {
    const template = royalGuardianTemplates.find(candidate => candidate.skillIndex === skillIndex)!;
    const result = Talent.fromBase(template.name, template);
    result.pointsSpent = pointsSpent;
    return result;
};

const player = (playerID: number, talents: Talent[] = []): Player => {
    const result = new Player(playerID, `Player ${playerID}`);
    result.talents = talents;
    result.skills.set(SkillsIndex.Spelunking, new SkillData(1, 0, 0));
    result.finalTalentInputs = talentInputs();
    result.applyTalentLevelInputs(result.finalTalentInputs);
    result.cardInfo = new CardInfo({}, new Map(), []);
    result.cardInfo.cards = [];
    return result;
};

const prepareSpelunking = (players: readonly Player[]): Spelunking => {
    const result = new Spelunking('spelunking');
    result.stamina = players.map(candidate => new SpelunkingStamina(candidate.playerID));
    // These controlled Journal inputs exclude unrelated page and gathering-source state.
    result.chapters = Array.from({ length: 7 }, () => ({
        bonuses: Array.from({ length: 4 }, () => ({ getBonus: () => 0 })),
    } as Chapter));
    result.upgrades = Upgrade.fromBase(initSpelunkingUpgradeRepo());
    result.grandDiscoveryUpgrade = result.upgrades[43];
    result.grandDiscoveryUpgrade.level = 1;
    result.tunnels = Tunnel.fromBase(initSpelunkingTunnelRepo(), result, []);
    result.tunnels[0].finalDiscovery.found = true;
    return result;
};

const updateMetrics = (players: Player[], spelunking = prepareSpelunking(players)): Spelunking => {
    const zero = () => 0;
    const data = new Map<string, unknown>([
        ['spelunking', spelunking],
        ['players', players],
        ['cards', [{ id: 'w7a7', getLevels: zero }]],
        ['stamps', []],
        ['arcade', { bonuses: [{ index: 55, getBonus: zero }] }],
        ['sushi', { getBonusFromIndex: zero }],
        ['farming', { cropScientist: { getBonus: zero }, getExoticMarketBonusValue: zero }],
        ['hole', { lamp: { getBonus: zero }, cove: { upgrades: Array.from({ length: 21 }, () => ({ getBonus: zero })) } }],
        ['alchemy', { getVialBonusForKey: zero, getBubbleBonusForKey: zero }],
        ['cooking', { getMealBonusForKey: zero }],
        ['dancingCoral', { getBonusFromIndex: zero }],
        ['summoning', { getSummoningWinnerBonusFromIndex: zero }],
        ['tome', { getEpilogueBonus: zero }],
        ['rift', { bonuses: [{ name: SkillMastery.displayName, getSkillBonus: zero }] }],
        ['skilling', { getAllEfficiencies: () => 1 }],
        ['zenithMarket', { getBonusForId: zero }],
        ['jellyOperator', { getObstructionBonus: zero }],
        ['minehead', { getBonusFromIndex: zero }],
    ]);
    updateSpelunkingAccountMetrics(data);
    return spelunking;
};

// Pit O' Pages uses 1 + 5 * level / (level + 300).
// Each character receives the account's highest talent effect, with a minimum multiplier of one.
describe("Pit O' Pages account efficiency", () => {
    it('gives the account multiplier to a recipient without the talent', () => {
        const owner = player(0, [talent(237, 100)]);
        const recipient = player(1);
        const players = [owner, recipient];
        const spelunking = updateMetrics(players);

        expect(Talent.getAccountTalentBonus(players, 237, recipient.finalTalentInputs)).toBe(2.25);
        expect(spelunking.characters[1].efficiency).toBe(22.5);
    });

    it.each([false, true])('keeps efficiency neutral when a zero-point talent exists: %s', hasTalent => {
        const owner = player(0, hasTalent ? [talent(237, 0)] : []);
        owner.allPresetSuperTalentIndexes.add(237);
        const recipient = player(1);
        recipient.finalTalentInputs = talentInputs({ eliteTalentLevels: 500, superTalentLevels: 500, allTalentCap: 500 });
        const players = [owner, recipient];
        const spelunking = updateMetrics(players);

        expect(Talent.getAccountTalentBonus(players, 237, recipient.finalTalentInputs)).toBe(hasTalent ? 1 : 0);
        expect(spelunking.characters[1].efficiency).toBe(10);
    });

    it('selects the highest effect, including Super Talents selected only in the other preset', () => {
        const presetOwner = player(0, [talent(237, 100)]);
        presetOwner.allPresetSuperTalentIndexes.add(237);
        const otherOwner = player(1, [talent(237, 120)]);
        const recipient = player(2);
        recipient.finalTalentInputs = talentInputs({ superTalentLevels: 50 });
        const players = [presetOwner, otherOwner, recipient];
        const spelunking = updateMetrics(players);
        const expectedMultiplier = 1 + 5 * 150 / 450;

        expect(presetOwner.activeSuperTalentIndexes.has(237)).toBe(false);
        expect(Talent.getAccountTalentBonus(players, 237, recipient.finalTalentInputs)).toBe(expectedMultiplier);
        expect(spelunking.characters[2].efficiency).toBe(10 * expectedMultiplier);
    });

    it("uses each recipient's final modifiers and cap rather than the owner's or previously applied inputs", () => {
        const owner = player(0, [talent(237, 40)]);
        owner.allPresetSuperTalentIndexes.add(237);
        owner.finalTalentInputs = talentInputs({ eliteTalentLevels: 900, allTalentCap: 900 });
        owner.applyTalentLevelInputs(owner.finalTalentInputs);
        const recipient = player(1);
        recipient.applyTalentLevelInputs(talentInputs({ eliteTalentLevels: 200, allTalentCap: 200 }));
        recipient.finalTalentInputs = talentInputs({
            eliteTalentLevels: 20,
            familyTalentLevels: 2.8,
            minorLinkTalentLevels: 1.2,
            tesseractTalentLevels: 20,
            allTalentCap: 12,
            superTalentLevels: 7.5,
        });
        const otherRecipient = player(2);
        otherRecipient.finalTalentInputs = talentInputs({ eliteTalentLevels: 4, allTalentCap: 3, superTalentLevels: 2 });
        const spelunking = updateMetrics([owner, recipient, otherRecipient]);

        // Shared levels stop at the recipient cap before Super Talent levels enter the rounded total.
        expect(spelunking.characters[1].efficiency).toBe(10 * (1 + 5 * 59 / 359));
        expect(spelunking.characters[2].efficiency).toBe(10 * (1 + 5 * 45 / 345));
    });

    it('keeps Grand Vein separate from the efficiency talent', () => {
        const owner = player(0, [talent(237, 100), talent(238, 40)]);
        const recipient = player(1);
        const spelunking = updateMetrics([owner, recipient]);
        // Grand Vein uses its own template: 1 + 20 * level / (level + 400).
        const expectedGrandChance = 0.00004 * (1 + 20 * 40 / 440);

        expect(spelunking.tunnels[0].grandEligible).toBe(true);
        expect(spelunking.characters[1].efficiency).toBe(22.5);
        expect(spelunking.characters[1].grandDiscoveryChances[0]).toBe(expectedGrandChance);
    });

    it.each([
        { allEfficiencyMultiplier: 41, talentMultiplier: 2.25, expectedEfficiency: 204.12 },
        { allEfficiencyMultiplier: 0, talentMultiplier: 0, expectedEfficiency: 30.24 },
    ])('preserves every efficiency factor with all-efficiency $allEfficiencyMultiplier and talent $talentMultiplier', ({
        allEfficiencyMultiplier, talentMultiplier, expectedEfficiency,
    }) => {
        const recipient = player(0);
        const spelunking = prepareSpelunking([recipient]);
        spelunking.chapters[0].bonuses[0].getBonus = () => 2;
        spelunking.chapters[1].bonuses[0].getBonus = () => 4;
        spelunking.chapters[0].bonuses[1].getBonus = () => 25;
        spelunking.upgrades[56].sourceBonus = 20;
        spelunking.prepareCharacterMetrics({
            masteryEfficiencyPercent: 5,
            efficiencyStampBonus: 2,
            efficiencyVialBonus: 3,
            efficiencyBubbleBonus: 4,
            zenithMarketBonus: 0,
            jellyObstructionBonus: 0,
            mineheadBonus: 0,
            sushiBonus: 0,
            coveBonus: 0,
            grandTalentMultiplier: 4,
        }, [{
            playerID: 0,
            playerName: recipient.playerName,
            skillLevel: 1,
            allEfficiencyMultiplier,
            efficiencyTalentMultiplier: talentMultiplier,
            efficiencyCardBonus: 11,
        }]);

        // (10 + 2 + 4) * all-efficiency * 1.05 * 1.2 * 1.25 * talent * 1.20.
        expect(spelunking.characters[0].efficiency).toBeCloseTo(expectedEfficiency, 10);
        expect(spelunking.characters[0].grandDiscoveryChances[0]).toBe(0.00016);
    });
});
