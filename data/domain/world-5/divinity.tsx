import { range } from "../../utility";
import { Alchemy } from "../world-2/alchemy/alchemy";
import { Domain, RawData } from "../base/domain";
import { initDivinityStyleRepo } from "../data/DivinityStyleRepo";
import { GodInfoBase, initGodInfoRepo } from "../data/GodInfoRepo";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { DivinityStyleModel } from "../model/divinityStyleModel";
import { GodInfoModel } from "../model/godInfoModel";
import { Activity, Player } from "../player";
import { getCompanionActiveBonus, getCompanionBonus, type Companion } from "../companions";
import { SkillsIndex } from "../SkillsIndex";
import type { Skilling } from "../skilling";
import { Hole } from "./hole/hole";
import { Sneaking } from "../world-6/sneaking";
import { CoralKid } from "../world-7/coralKid";
import { Sailing } from "./sailing/sailing";
import type { Achievement } from "../achievements";
import { Arcade } from "../world-2/arcade";
import { Sigils } from "../world-2/alchemy/sigils";
import { Bribe } from "../world-1/bribes";
import { PlayerStatues } from "../world-1/statues";
import { getStampBonusForKey, type Stamp } from "../world-1/stamps";
import { Cooking } from "../world-4/cooking";
import { Rift, SkillMastery } from "../world-4/rift";
import { TaskBoard } from "../tasks";
import { EquipmentBonus } from "../equipment-effects";
import { EquipmentSets } from "../misc/equipmentSets";
import { Guild } from "../guild";
import { GemStore } from "../gemPurchases";
import { UpgradeVault } from "../upgradeVault";
import { LegendTalents } from "../world-7/legendTalents";
import { SushiStation } from "../world-7/sushi";
import { CoralReef } from "../world-7/coralReef";
import { Votes } from "../world-2/votes";
import { Talent } from "../talents";

export class DivinityGod {
    blessLevel: number = 0;
    blessMaxLevel: number = 100;
    unlocked: boolean = false;
    linkedPlayers: Player[] = [];

    // updated values
    activeBubblePassiveBonus: number = 0;
    jadeUpgradeBlessingBonus: number = 0;
    godRank: number = 0;
    coralKidUpgrade3: number = 0;
    constructor(public index: number, public data: GodInfoModel) { }


    static fromBase = (data: GodInfoBase[]): DivinityGod[] => {
        const godData = data.map(god => god.index == 2
            ? new NobisectGod(god.index, god.data)
            : new DivinityGod(god.index, god.data));
        const godCopy = JSON.parse(JSON.stringify(godData));

        // Fix up the bonus texts based on bonus index, because ... Lava.
        godData.forEach(god => {
            god.data.majorBonus = godCopy[god.data.bonusIndex].data.majorBonus;
            god.data.passiveBonus = godCopy[god.data.bonusIndex].data.passiveBonus;
            god.data.passiveMax = godCopy[god.data.bonusIndex].data.passiveMax;
        })
        return godData;
    }

    getMaxMinorLinkBonusText = () => {
        return this.data.passiveBonus.replace(/{/g, this.data.passiveMax.toString());
    }

    getMinorLinkBonus = (player: Player) => {
        // If not linked to this god, return 0.
        if (!this.linkedPlayers.find(linked => linked.playerID == player.playerID)) {
            return 0;
        }
        return this.getMinorBonusForPlayer(player);
    }

    getMinorBonusForPlayer = (player: Player): number => {
        const divinityLevel = player.skills.get(SkillsIndex.Divinity)?.level ?? 0;
        return Math.max(1, this.activeBubblePassiveBonus)
            * ((1 + this.coralKidUpgrade3 / 100) * divinityLevel / (60 + divinityLevel))
            * this.data.passiveMax;
    }

    getBlessingBonusText = () => {
        return this.data.blessingBonus.replace("{", this.getBlessingBonus().toString());
    }

    getBlessingBonus = (_player?: Player): number => {
        return this.blessLevel *
            this.data.blessingPerLevel *
            (1 + (this.jadeUpgradeBlessingBonus / 100) * this.godRank);
    }

    getImageData = (): ImageData => {
        return {
            location: `DivGod${this.index}`,
            width: 108,
            height: 97
        }
    }
}

export class NobisectGod extends DivinityGod {
    private alchemy!: Alchemy;
    private skilling!: Skilling;

    updateBlessingInputs(alchemy: Alchemy, skilling: Skilling): void {
        this.alchemy = alchemy;
        this.skilling = skilling;
    }

    override getBlessingBonusText = (): string => {
        return "Base skill efficiency bonus varies by character.";
    }

    override getBlessingBonus = (player?: Player): number => {
        if (!player) {
            throw new Error("Nobisect's blessing bonus requires an explicit player.");
        }

        const allEfficiencies = this.skilling.getAllEfficiencies(player);
        const miningEfficiency = this.alchemy.getBubbleBonusForKey("MinEff", player);
        const choppingEfficiency = this.alchemy.getBubbleBonusForKey("ChopEff", player);

        // Nobisect adds base efficiency; independent all-skill efficiency, bubbles and attributes set its scaling input.
        // Source: docs/game-snippets/divinity/Divinity.1.22.js:50-55.
        const efficiencyBase = Math.max(
            1,
            allEfficiencies
            + Math.pow((miningEfficiency + choppingEfficiency) / 100, 2)
            + Math.pow((player.stats.strength + (player.stats.agility + player.stats.wisdom)) / 3, 0.5) / 7,
        );
        // Higher efficiency damps the blessing multiplier, clamped from 0.1 to 1.8.
        // Source: docs/game-snippets/divinity/Divinity.1.22.js:57-65.
        const efficiencyFactor = Math.min(
            1.8,
            Math.max(
                0.1,
                4 * Math.pow(((efficiencyBase + 10000) / Math.max(10 * efficiencyBase + 10, 1)) * 0.01, 2),
            ),
        );
        return this.blessLevel * this.data.blessingPerLevel * efficiencyFactor;
    }
}

export class PlayerDivinityInfo {
    // Saved primary link, independent of account-wide and ES effective links.
    primaryGod: DivinityGod | undefined = undefined;

    // es has a second god, jam it in here.
    esGod: DivinityGod | undefined = undefined;
    dootActive: boolean = false;
    dootOwned: boolean = false;
    pocketDivinityActive: boolean = false;
    player: Player | undefined;
    styleIndex: number = 0;

    constructor(public playerIndex: number, public style: DivinityStyleModel, public gods: DivinityGod[], public active: boolean = false) { }

    get ordinaryGods(): DivinityGod[] {
        if (!this.primaryGod) return [];
        if (this.esGod?.unlocked && this.esGod.index !== this.primaryGod.index) {
            return [this.primaryGod, this.esGod];
        }
        return [this.primaryGod];
    }

    expPerHour: number = 0;

    getDivinityExpPerHour = (): number => this.expPerHour;

    isLinkedToGod = (godIndex: number): boolean => {
        return this.gods.some(god => god.index === godIndex);
    }
}

export class GodOffering {
    constructor(public index: number, public odds: number) { }
}

export class Divinity extends Domain {
    playerInfo: PlayerDivinityInfo[] = [];
    pointsPerHourByPlayerIndex: number[] = [];
    currentDivinity: number = 0;
    atomsBalance: number | null = null;
    gods: DivinityGod[] = DivinityGod.fromBase(initGodInfoRepo());
    offerings: GodOffering[] = [];
    godRank: number = 0;
    gamingGrowthMinorLinkBonus: number = 0;
    w7ChosenDivinityBonusIndex: number = -1;

    getGamingGrowthMinorLinkBonus = (): number => this.gamingGrowthMinorLinkBonus;
    private getBasePointsPerHour(style: number): number {
        switch (style) {
            case 0: return 1;
            case 1: return 2;
            case 2: return 4;
            case 3: return 0;
            case 4: return 2;
            case 5: return 0;
            case 6: return 8;
            case 7: return 15;
            default: return 0;
        }
    }

    private getBaseExpPerHour(style: number): number {
        switch (style) {
            case 0: return 1;
            case 1: return 2;
            case 2: return 1;
            case 3: return 1;
            case 4: return 7;
            case 5: return 3;
            case 6: return 8;
            case 7: return 10;
            default: return 0;
        }
    }

    private getDivinityBlessingRateBonus(godIndex: number, emporiumBonus33: number): number {
        const god = this.gods[godIndex];
        return god.blessLevel * god.data.blessingPerLevel * (1 + emporiumBonus33 * 0.05 * this.godRank);
    }

    private getDivinityPointsMultiplier(sneaking: Sneaking, sailing: Sailing): number {
        const emporiumBonus33 = Number(sneaking.jadeUpgrades.find(upgrade => upgrade.index === 33)!.purchased);
        const divider = 100;
        const multiplier = (1 + this.getDivinityBlessingRateBonus(0, emporiumBonus33) / divider)
            * (1 + this.getDivinityBlessingRateBonus(1, emporiumBonus33) / divider)
            * (1 + sailing.artifacts.find(artifact => artifact.index === 11)!.getBonus() / divider)
            * (1 + this.getDivinityBlessingRateBonus(3, emporiumBonus33) / divider)
            * (1 + this.getDivinityBlessingRateBonus(5, emporiumBonus33) / divider)
            * (1 + sailing.artifacts.find(artifact => artifact.index === 18)!.getBonus() / divider);
        return Math.max(1, multiplier);
    }

    private getMajorBonus6Multiplier(companions: Companion[], hole: Hole): number {
        if (getCompanionActiveBonus(companions, 0) === 1
            || hole.majiks.pocketDivinity.selections.some(selection => selection.active && selection.bonusId === 6)
            || this.w7ChosenDivinityBonusIndex === 6) {
            return 2;
        }

        for (let playerIndex = 0; playerIndex < 12 && playerIndex < this.playerInfo.length; playerIndex++) {
            if (this.playerInfo[playerIndex].primaryGod?.data.bonusIndex === 6) {
                return 2;
            }
        }
        return 1;
    }
    getDivinityPointsPerHour = (playerIndex: number): number => this.pointsPerHourByPlayerIndex[playerIndex] ?? 0;

    updateRates(data: Map<string, unknown>): void {
        const players = data.get("players") as Player[];
        const coralKid = data.get("coralKid") as CoralKid;
        const coralReef = data.get("coralReef") as CoralReef;
        const gemStore = data.get("gems") as GemStore;
        const companions = data.get("companions") as Companion[];
        const hole = data.get("hole") as Hole;
        const sneaking = data.get("sneaking") as Sneaking;
        const sailing = data.get("sailing") as Sailing;
        const alchemy = data.get("alchemy") as Alchemy;
        const legendTalents = data.get("legendTalents") as LegendTalents;
        const sushi = data.get("sushi") as SushiStation;
        const skilling = data.get("skilling") as Skilling;
        const achievements = data.get("achievements") as Achievement[];
        const bribes = data.get("bribes") as Bribe[];
        const guild = data.get("guild") as Guild;
        const taskboard = data.get("taskboard") as TaskBoard;
        const arcade = data.get("arcade") as Arcade;
        const cooking = data.get("cooking") as Cooking;
        const statues = data.get("statues") as PlayerStatues[];
        const sigils = data.get("sigils") as Sigils;
        const rift = data.get("rift") as Rift;
        const equipmentSets = data.get("equipmentSets") as EquipmentSets;
        const votes = data.get("votes") as Votes;
        const upgradeVault = data.get("upgradeVault") as UpgradeVault;
        const stamps = data.get("stamps") as Stamp[][];
        const gemPurchaseCount = gemStore.purchases.find(purchase => purchase.no === 130)!.pucrhased;
        const skillMastery = rift.bonuses.find(bonus => bonus.name === SkillMastery.displayName) as SkillMastery;
        const divinityRiftRank = skillMastery.getSkillRank(SkillsIndex.Divinity);
        const riftMode0 = Number(skillMastery.active && divinityRiftRank > 0);
        const riftMode1 = Number(skillMastery.active && divinityRiftRank > 1);
        const pointsMultiplier = this.getDivinityPointsMultiplier(sneaking, sailing);
        const majorBonus6Multiplier = this.getMajorBonus6Multiplier(companions, hole);
        const coralReefUpgradeLevels = coralReef.getTotalUpgradeLevels();
        const votingBonus23 = votes.getCurrentBonus(23);

        this.pointsPerHourByPlayerIndex.length = this.playerInfo.length;
        for (const playerInfo of this.playerInfo) {
            const player = players[playerInfo.playerIndex];
            const maxTalent505 = Talent.getAccountTalentBonus(players, 505, player.finalTalentInputs);
            const maxTalent506 = Talent.getAccountTalentBonus(players, 506, player.finalTalentInputs);
            const style = playerInfo.styleIndex;
            const basePointsPerHour = this.getBasePointsPerHour(style);
            const baseExpPerHour = this.getBaseExpPerHour(style);
            const boxReward22c = player.getPostOfficeBonus("22c");
            const statueBonus23 = statues[player.playerID].statues[23].getBonus(player);
            const additivePointsBonus = boxReward22c
                + 10 * Number(achievements[298].completed)
                + 10 * Number(achievements[304].completed)
                + 15 * riftMode1
                + bribes.find(bribe => bribe.bribeIndex === 38)!.getBonus()
                + upgradeVault.getBonusForId(71);
            const pointsMultiplierFromCoralReef = 1 + coralReefUpgradeLevels * coralKid.getBonusFromIndex(4) / 100;
            const pointsPerHour = basePointsPerHour
                * (1 + gemPurchaseCount / 4)
                * (1 + 0.25 * getCompanionBonus(companions, 0, 2))
                * (1 + sushi.getBonusFromIndex(46) / 100)
                * (1 + coralKid.getBonusFromIndex(6) / 100)
                * pointsMultiplier
                * (1 + maxTalent505 / 100)
                * majorBonus6Multiplier
                * (1 + votingBonus23 / 100)
                * (1 + hole.lamp.getBonus(false, 1, 2) / 100)
                * pointsMultiplierFromCoralReef
                * (1 + additivePointsBonus / 100);
            const additiveExpBonus = 10 * this.godRank
                + boxReward22c
                + sigils.sigils[22].getBonus()
                + 6 * player.cardInfo!.cards.find(card => card.id === "w5a5")!.getLevels()
                + getStampBonusForKey(stamps, "DivineExp")
                + alchemy.getBubbleBonusForKey("M3ACTIVE")
                + statueBonus23
                + cooking.getMealBonusForKey("DivExp")
                + alchemy.getVialBonusForKey("DivXP")
                + player.getTalentBonus(464)
                + 10 * taskboard.merits[36].level
                + 25 * riftMode0
                + (player.starSigns.find(sign => sign.name === "Divividov")?.getBonus("Divinity EXP") ?? 0)
                + guild.guildBonuses[14].getBonus()
                + arcade.bonuses[37].getBonus()
                + player.gear.getBonus(EquipmentBonus.DivinityExp)
                + votingBonus23
                + equipmentSets.getSetBonus("MAGMA_SET")
                + upgradeVault.getBonusForId(72);
            const expPerHour = baseExpPerHour
                * (1 + gemPurchaseCount / 4)
                * (1 + legendTalents.getBonusFromIndex(15) / 100)
                * skilling.getAllSkillExperienceMultiplier()
                * (1 + coralKid.getBonusFromIndex(0) / 100)
                * (1 + coralKid.getBonusFromIndex(8) / 100)
                * majorBonus6Multiplier
                * (1 + maxTalent506 / 100)
                * (1 + getCompanionActiveBonus(companions, 16))
                * (1 + additiveExpBonus / 100);

            this.pointsPerHourByPlayerIndex[playerInfo.playerIndex] = pointsPerHour;
            playerInfo.expPerHour = expPerHour;
        }
    }

    // The current source-backed callers require categories 4 and 7; other Bonus_Minor categories have additional branches.
    getMinorBonus(playerIndex: number, category: 4 | 7): number {
        const playerInfo = this.playerInfo[playerIndex];
        if (!playerInfo) {
            return 0;
        }

        const currentPlayer = playerInfo.player;
        if (!currentPlayer) {
            return 0;
        }

        if (playerInfo.dootOwned || playerInfo.pocketDivinityActive) {
            const god = this.gods.find(candidate => candidate.data.bonusIndex === category);
            return god?.getMinorBonusForPlayer(currentPlayer) ?? 0;
        }

        if (playerInfo.primaryGod?.data.bonusIndex === category) {
            return playerInfo.primaryGod.getMinorLinkBonus(currentPlayer);
        }
        if (playerInfo.esGod?.unlocked && playerInfo.esGod.data.bonusIndex === category) {
            return playerInfo.esGod.getMinorLinkBonus(currentPlayer);
        }
        return 0;
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Divinity", perPlayer: false, default: [] },
            { key: "AFKtarget_", perPlayer: true, default: [] },
            { key: "SL_", perPlayer: true, default: [] },
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const divinity = data.get(this.getDataKey()) as Divinity;
        const charCount = data.get("charCount") as number;
        const divinityData = data.get("Divinity") as number[] || [];
        const optionListAccount = data.get("OptLacc") as number[];
        const selectedGodIndex = optionListAccount[425] - 1;
        divinity.w7ChosenDivinityBonusIndex = selectedGodIndex >= 0 ? divinity.gods[selectedGodIndex].data.bonusIndex : -1;
        const afkTarget = range(0, charCount).map((_, index) => data.get(`AFKtarget_${index}`)) as string[];
        const talentLevels = range(0, charCount).map((_, index) => data.get(`SL_${index}`)) as Record<number, number>[];

        divinity.playerInfo = [];
        divinity.offerings = [];
        divinity.atomsBalance = divinityData[39] == null ? null : Number(divinityData[39]);
        divinity.gods.forEach(god => {
            god.linkedPlayers = [];
        });
        if (divinityData.length === 0) {
            return;
        }

        // Index 25 = Number of gods unlocked?
        const numberOfUnlockedGods = divinityData[25];

        // Index 26 = ? 
        divinity.godRank = Math.max(0, numberOfUnlockedGods - 10);
        // Next 10 indexes = god levels
        divinity.gods.forEach((god, godIndex) => {
            // The index of the god doesn't match up the bonus, yay Lava.
            // Using bonus index instead of godIndex.
            god.blessLevel = divinityData[godIndex + 28];
            god.unlocked = godIndex < numberOfUnlockedGods
        });

        const mantraInfo = initDivinityStyleRepo();
        // Read player data.
        range(0, charCount).forEach((_, playerIndex) => {
            const playerMantra = divinityData[playerIndex];
            const linkedGodIndex = divinityData[playerIndex + 12];
            const playerLinkedGod = linkedGodIndex != -1 && linkedGodIndex < divinity.gods.length ? divinity.gods[linkedGodIndex] : undefined;
            // Player is active if actually on divinity alter or using Goharut as god and being in lab.
            const isActive = afkTarget[playerIndex] == "Divinity" || (playerLinkedGod && playerLinkedGod.index == 4 && afkTarget[playerIndex] == "Laboratory")
            divinity.playerInfo.push(new PlayerDivinityInfo(playerIndex, mantraInfo[playerMantra].data, playerLinkedGod ? [playerLinkedGod] : [], isActive));
            divinity.playerInfo[playerIndex].styleIndex = playerMantra;
            divinity.playerInfo[playerIndex].primaryGod = playerLinkedGod;

            // Handle ES extra link talent.
            if (talentLevels.length > playerIndex) { // This should never fail but better safe than sorry.
                const playerTalents = talentLevels[playerIndex];
                if (playerTalents[505] > 0) {
                    const godIndex = playerTalents[505] % 10;
                    divinity.playerInfo[playerIndex].esGod = divinity.gods[godIndex];
                }
            }
        });

        divinity.currentDivinity = divinityData[24];
        // 24 is the index of the current divinity count, or basically after 12 characters worth of god/mantra info.
        // Index 26 = Odds of first offering
        // Index 27 = Odds of second offering
        divinity.offerings.push(new GodOffering(0, divinityData[26]));
        divinity.offerings.push(new GodOffering(1, divinityData[27]));
    }
}

export const updateDivinity = (data: Map<string, any>) => {
    const divinity = data.get("divinity") as Divinity;
    const alchemy = data.get("alchemy") as Alchemy;
    const players = data.get("players") as Player[];
    const sneaking = data.get("sneaking") as Sneaking;
    const hole = data.get("hole") as Hole;
    const coralKid = data.get("coralKid") as CoralKid;
    const companions = data.get("companions") as Companion[];
    const dootOwned = getCompanionActiveBonus(companions, 0) > 0;

    // God related math values;
    const activeBubblePassiveDivinityBonus = alchemy.getBubbleBonusForKey("Y2ACTIVE")
    const jadeUpgradeBlessingBoost = (sneaking.jadeUpgrades.find(upgrade => upgrade.data.name == "True Godly Blessings")?.purchased ?? false) ? 5 : 0;
    const coralKidBonus1 = coralKid.getBonusFromIndex(1);
    const coralKidBonus3 = coralKid.getBonusFromIndex(3);
    divinity.gods.forEach(god => {
        god.activeBubblePassiveBonus = Math.max(1, activeBubblePassiveDivinityBonus);
        god.jadeUpgradeBlessingBonus = jadeUpgradeBlessingBoost;
        god.godRank = divinity.godRank;
        god.coralKidUpgrade3 = coralKidBonus3;
        // Reset previous info as it will be calculated again in the next section.
        god.linkedPlayers = [];
        god.blessMaxLevel = 100 + coralKidBonus1;
    })

    divinity.gamingGrowthMinorLinkBonus = 0;

    // Update the linked player to each god by iterating on each player's data.
    divinity.playerInfo.forEach(player => {
        player.player = players[player.playerIndex];
        player.dootOwned = dootOwned;
        const pocketGodIds = hole.majiks.pocketDivinity.linkedGods;
        player.pocketDivinityActive = pocketGodIds.length > 0;
        const effectiveGods = player.dootActive ? divinity.gods
            : [...player.ordinaryGods, ...pocketGodIds.map(id => divinity.gods[id])];
        player.gods = [...new Map(effectiveGods.map(god => [god.index, god])).values()];
        player.gods.forEach(god => {
            if (!god.linkedPlayers.some(linked => linked.playerID === player.playerIndex)) {
                god.linkedPlayers.push(players[player.playerIndex]);
            }
        });

        // Update being active or not based on linked god(s) (could have changed since parse due to owning Doot or other bonuses like that) and ES secondary god
        player.active = (players[player.playerIndex].getActivityType() == Activity.Divinity || players[player.playerIndex].getActivityType() == Activity.Lab && player.isLinkedToGod(4));

        // Account Gaming growth only counts saved primary links, not ES, Doot, or Pocket Divinity.
        if (player.playerIndex < 12 && player.primaryGod?.data.bonusIndex == 6) {
            divinity.gamingGrowthMinorLinkBonus += player.primaryGod.getMinorLinkBonus(players[player.playerIndex]);
        }
    })

    return divinity;
}

export const updateDivinityBlessings = (data: Map<string, any>): void => {
    const divinity = data.get("divinity") as Divinity;
    const alchemy = data.get("alchemy") as Alchemy;
    const skilling = data.get("skilling") as Skilling;

    (divinity.gods[2] as NobisectGod).updateBlessingInputs(alchemy, skilling);
}

export const updateDivinityRates = (data: Map<string, unknown>): void => {
    const divinity = data.get("divinity") as Divinity;
    divinity.updateRates(data);
}
