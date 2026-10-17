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
import { getCompanionActiveBonus, type Companion } from "../companions";
import { SkillsIndex } from "../SkillsIndex";
import type { Skilling } from "../skilling";
import { Hole } from "./hole/hole";
import { Sneaking } from "../world-6/sneaking";
import { CoralKid } from "../world-7/coralKid";

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

    constructor(public playerIndex: number, public style: DivinityStyleModel, public gods: DivinityGod[], public active: boolean = false) { }

    get ordinaryGods(): DivinityGod[] {
        if (!this.primaryGod) return [];
        if (this.esGod?.unlocked && this.esGod.index !== this.primaryGod.index) {
            return [this.primaryGod, this.esGod];
        }
        return [this.primaryGod];
    }

    divinityPerHour = (): number => {
        return 0;
    }

    isLinkedToGod = (godIndex: number): boolean => {
        return this.gods.some(god => god.index === godIndex);
    }
}

export class GodOffering {
    constructor(public index: number, public odds: number) { }
}

export class Divinity extends Domain {
    playerInfo: PlayerDivinityInfo[] = [];
    currentDivinity: number = 0;
    atomsBalance: number | null = null;
    gods: DivinityGod[] = DivinityGod.fromBase(initGodInfoRepo());
    offerings: GodOffering[] = [];
    godRank: number = 0;
    gamingGrowthMinorLinkBonus: number = 0;

    getGamingGrowthMinorLinkBonus = (): number => this.gamingGrowthMinorLinkBonus;

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
