import { Breeding } from "./breeding"
import { Card, CardInfo } from "./cards"
import { Cooking } from "./cooking"
import { ChipBase, initChipRepo } from "./data/ChipRepo"
import { initJewelRepo, JewelBase } from "./data/JewelRepo"
import { initLabBonusRepo, LabBonusBase } from "./data/LabBonusRepo"
import { Deathnote } from "./deathnote"
import { Divinity } from "./divinity"
import { GemStore } from "./gemPurchases"
import { ImageData } from "./imageData"
import { ChipModel } from "./model/chipModel"
import { JewelModel } from "./model/jewelModel"
import { LabBonusModel } from "./model/labBonusModel"
import { Player } from "./player"
import { SkillsIndex } from "./SkillsIndex"
import { Storage } from "./storage"
import { TaskBoard } from "./tasks"

export const chipSlotReq = [5, 10, 15, 25, 35, 50, 75];

export class MainframeBonus {
    x: number
    y: number
    range: number
    bonusOn: number
    bonusOff: number
    name: string
    description: string

    active: boolean = false;

    constructor(public index: number, data: LabBonusModel) {
        this.x = data.x;
        this.y = data.y;
        this.range = data.range;
        this.bonusOn = data.bonusOff;
        this.bonusOff = data.bonusOn;
        this.name = data.name;
        this.description = data.description;
    }

    getImageData = (): ImageData => {
        return {
            location: `LabBonus${this.index}`,
            width: 64,
            height: 64
        }
    }

    getBonusText = () => {
        return this.description.split("@ - @")[0];
    }

    getBonus = () => {
        return this.active ? this.bonusOn : this.bonusOff;
    }

    getRange = (connectionBonus: number, meritConnectionBonus: number) => {
        return Math.floor((80 * (1 + connectionBonus / 100)) + meritConnectionBonus);
    }

    static fromBase(data: LabBonusBase[]): MainframeBonus[] {
        return data.map(bonus => 
        {
            switch (bonus.index) {
                case 0: return new AnimalFarmBonus(bonus.index, bonus.data);
                case 8: return new SpelunkerObolBonus(bonus.index, bonus.data);
                case 9: return new FungiFingerBonus(bonus.index, bonus.data);
                case 11: return new UnadulteratedBankingBonus(bonus.index, bonus.data);
                case 13: return new ViralConnectionBonus(bonus.index, bonus.data);
                default: return new MainframeBonus(bonus.index, bonus.data);
            }
        });
    }
}

export class AnimalFarmBonus extends MainframeBonus {
    totalSpecies: number = 0;
    override getBonusText = () => {
        return this.description.replace(/{/g, this.getBonus().toString())
    }

    override getBonus = () => {
        return this.bonusOn * this.totalSpecies;
    }
}

export class FungiFingerBonus extends MainframeBonus {
    greenMushroomKilled: number = 0;
    jewelBoost: number = 0;
    override getBonusText = () => {
        return this.description.replace(/{/g, this.getBonus().toString())
    }

    override getBonus = () => {
        return (this.bonusOn + this.jewelBoost) * Math.floor(this.greenMushroomKilled / 1e6);
    }
}

export class UnadulteratedBankingBonus extends MainframeBonus {
    greenStacks: number = 0;
    override getBonusText = () => {
        return this.description.replace(/{/g, this.getBonus().toString())
    }

    override getBonus = () => {
        return this.bonusOn * this.greenStacks;
    }
}

export class ViralConnectionBonus extends MainframeBonus {
    override getRange = () => {
        return 80;
    }
}

export class SpelunkerObolBonus extends MainframeBonus {
    override getRange = () => {
        return 80;
    }
}

export class Jewel {
    available: boolean = false;
    active: boolean = false;

    bonusMultiplier: number = 1;

    constructor(public index: number, public data: JewelModel) { }

    getImageData = (): ImageData => {
        return {
            location: `ConsoleJwl${this.index}`,
            width: 66,
            height: 66
        }
    }

    getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {
        if (!this.active) {
            return 0;
        }
        
        return this.data.bonusGiven * bonusMultiplier;
    }

    getBonusText = () => {
        return `${this.data.effect.replace(/}/g, this.getBonus().toString())}${this.bonusMultiplier > 1 ? ` (${this.bonusMultiplier}x multiplier from mainframe bonus)` : ""}`;
    }

    getRange = (connectionBonus: number, meritConnectionBonus: number) => {
        return Math.floor((80 * (1 + connectionBonus / 100)) + meritConnectionBonus);
    }

    static fromBase(data: JewelBase[]): Jewel[] {
        return data.map(jewel => 
        {
            switch (jewel.index) {
                case 0: return new AmethystRhinestoneJewel(jewel.index, jewel.data);
                case 5: return new SapphireRhombolJewel(jewel.index, jewel.data);
                case 9: return new PyriteRhombolJewel(jewel.index, jewel.data);
                case 10: return new PyritePyramiteJewel(jewel.index, jewel.data);
                case 12: return new EmeraldNavetteJewel(jewel.index, jewel.data);
                case 14: return new EmeraldPyramiteJewel(jewel.index, jewel.data);
                default: return new Jewel(jewel.index, jewel.data);
            }
        });
    }
}

export class SapphireRhombolJewel extends Jewel {
    // Need to make this smarter in the future if I even want to care about breeding EXP.
    // Right now it returns even if the jewel isn't active (which it shouldn't for breeding)
    override getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {     
        return this.data.bonusGiven * bonusMultiplier;
    }
}

export class PyriteRhombolJewel extends Jewel {
    override getRange = () => {
        // 1.52 change: Pyrite Rhombol no longer affects itself.
        return 80;
    }
}

export class AmethystRhinestoneJewel extends Jewel {
    numberOfActivePurples: number = 0;
    override getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {
        if (!this.active) {
            return 0;
        }

        const extraMultiplier = this.numberOfActivePurples >= 3 ? 2 : 1;
        return this.data.bonusGiven * bonusMultiplier * extraMultiplier;
    }
}

export class PyritePyramiteJewel extends Jewel {
    numberOfActiveOrange: number = 0;
    override getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {
        if (!this.active) {
            return 0;
        }

        const extraMultiplier = this.numberOfActiveOrange >= 4 ? 2 : 1;
        return this.data.bonusGiven * bonusMultiplier * extraMultiplier;
    }
}

export class EmeraldNavetteJewel extends Jewel {
    numberOfActiveGreen: number = 0;
    override getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {
        if (!this.active) {
            return 0;
        }

        const extraMultiplier = this.numberOfActiveGreen >= 5 ? 2 : 1;
        return this.data.bonusGiven * bonusMultiplier * extraMultiplier;
    }
}

export class EmeraldPyramiteJewel extends Jewel {
    numberOfKitchenLevels: number = 0;
    override getBonus = (bonusMultiplier: number = this.bonusMultiplier) => {
        if (!this.active) {
            return 0;
        }

        const extraMultiplier = Math.floor((this.numberOfKitchenLevels + 0.5) / 25);
        return this.data.bonusGiven * bonusMultiplier * extraMultiplier;
    }

    override getBonusText = () => {
        const increaseBy = this.data.bonusGiven * this.bonusMultiplier;
        return `${this.data.effect.replace(/}/g, increaseBy.toString()).replace(/{/g, this.getBonus().toString())}${this.bonusMultiplier > 1 ? ` (${this.bonusMultiplier}x multiplier from mainframe bonus)` : ""}`;
    }
}

export class Chip {
    count: number = 0;
    constructor(public index: number, public data: ChipModel) { }

    getImageData = (): ImageData => {
        return {
            location: `ConsoleChip${this.index}`,
            width: 42,
            height: 42
        }
    }

    getBonus = () => {
        return this.data.baseVal;
    }

    getBonusText = () => {
        return this.data.bonus.replace(/{/g, this.getBonus().toString());
    }

    static fromBase(data: ChipBase[]): Chip[] {
        return data.map(chip => new Chip(chip.index, chip.data));
    }
}

export interface Point {
    x: number
    y: number
}

export class Lab {
    bonuses: MainframeBonus[];
    jewels: Jewel[];
    chips: Chip[];
    playerCords: Record<number, Point> = {};
    playerChips: Record<number, Chip[]> = {};
    playersInTubes: Player[] = [];
    playersInChain: Player[] = [];

    bestBuboPlayerID: number = -1;

    constructor() {
        this.bonuses = MainframeBonus.fromBase(initLabBonusRepo())
        this.jewels = Jewel.fromBase(initJewelRepo());
        this.chips = Chip.fromBase(initChipRepo());
    }

    getDistance = (x1: number, y1: number, x2: number, y2: number) => {
        return 0.9604339 * Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2)) + 0.397824735 * Math.min(Math.abs(x1 - x2), Math.abs(y1 - y2));
    }

    getPlayerLinewidth = (player: Player, pxMealBonus: number, linePctMealBonus: number, passiveCardBonus: number, petArenaBonus: number, inGemTube: boolean, buboBoost: number, shinyBonus: number) => {
        const labSkillLevel = player.skills.get(SkillsIndex.Intellect)?.level ?? 0;
        let baseWidth = 50 + (2 * labSkillLevel);

        if (this.jewels[5].available) {
            const playerCords = this.playerCords[player.playerID];
            if (this.getDistance(this.jewels[5].data.x, this.jewels[5].data.y, playerCords.x, playerCords.y) < 150) {
                // Match the game code a bit, hard coded 1.25
                baseWidth *= 1.25;
            }
        }
        const playerChipBonus = player.labInfo.chips.filter(slot => slot.chip && slot.chip.data.name == "Conductive Motherboard").reduce((sum, slot) => sum += slot.chip?.getBonus() ?? 0, 0);
        const bonusWidth = inGemTube ? 30 : 0;
        return Math.floor((baseWidth + (pxMealBonus + Math.min(passiveCardBonus, 50)))
            * (1 + ((buboBoost + linePctMealBonus + playerChipBonus + (20 * petArenaBonus) + bonusWidth + shinyBonus) / 100))
        )
    }
}

export const parseLab = (labData: number[][], charCount: number) => {
    const lab = new Lab();

    if (labData.length == 0) {
        return lab;
    }
    let cordIndex = 0;
    while (cordIndex < labData[0].length) {
        lab.playerCords[cordIndex / 2] = { x: labData[0][cordIndex], y: labData[0][cordIndex + 1] };
        cordIndex += 2;
    }

    labData[14].forEach((value, index) => {
        if (value == 1) {
            lab.jewels[index].available = true;
        }
    })

    // Figure out what chips players have.
    labData.slice(1, 1 + charCount).forEach((playerChips, index) => {
        lab.playerChips[index] = playerChips.filter(chip => chip != -1).map(chip => lab.chips[chip]);
    });

    labData[15].forEach((chipCount, index) => {
        if (index < lab.chips.length) {
            lab.chips[index].count = chipCount;
            const usedCount = Object.values(lab.playerChips).flatMap(chips => chips).reduce((sum, chip) => sum += (chip.index == lab.chips[index].index) ? 1 : 0, 0);
            lab.chips[index].count -= usedCount;
        }
    })

    return lab;
}

const _calculatePlayersLineWidth = (lab: Lab, cooking: Cooking, breeding: Breeding, cards: Card[], gemStore: GemStore, buboBoost: number) => {
    // const jewelMultiplier = (lab.bonuses.find(bonus => bonus.index == 8)?.active ?? false) ? 1.5 : 1;
    // const mealBonus = lab.jewels.filter(jewel => jewel.active && jewel.index == 16).reduce((sum, jewel) => sum += jewel.getBonus(jewelMultiplier), 0)
    // 1.59 Change - 16th Jewel no longer impacts meal jewels, therefore bonus is 0.
    const mealBonus = 0;
    if (lab.playersInTubes.length > 0) {
        const pxMealBonus = cooking?.meals.filter(meal => meal.bonusKey == "PxLine").reduce((sum, meal) => sum += meal.getBonus(false, mealBonus), 0) ?? 0;
        const linePctMealBonus = cooking?.meals.filter(meal => meal.bonusKey == "LinePct").reduce((sum, meal) => sum += meal.getBonus(false, mealBonus), 0) ?? 0;
        const passiveCardBonus = cards?.filter(card => card.data.effect.includes("Line Width")).reduce((sum, card) => sum += card.getBonus(), 0) ?? 0;
        const petArenaBonus = breeding.hasBonus(13) ? 1 : 0;
        const shinyBonus = breeding.shinyBonuses.find(bonus => bonus.data.index == 19)?.getBonus() ?? 0;
        const gemTubes = (gemStore?.purchases.find(purchase => purchase.no == 123)?.pucrhased ?? 0) * 2;
        lab.playersInTubes.forEach((player, index) => {
            const rightOfBubo = lab.playerCords[player.playerID].x >= lab.playerCords[lab.bestBuboPlayerID].x;
            player.labInfo.lineWidth = lab?.getPlayerLinewidth(player, pxMealBonus, linePctMealBonus, passiveCardBonus, petArenaBonus, index < gemTubes, rightOfBubo ? buboBoost : 0, shinyBonus);
            player.labInfo.supped = index < gemTubes;
        });
    }
}

const _findPrismSource = (lab: Lab) => {
    for (let playerIndex = 0; playerIndex < lab.playersInTubes.length; playerIndex++) {
        const player = lab.playersInTubes[playerIndex];
        const playerCords = lab.playerCords[player.playerID];
        if (lab.getDistance(43, 229, playerCords.x, playerCords.y) < player.labInfo.lineWidth) {
            return player
        }
    }
    return undefined;
}

const _calculatePlayerImpact = (connectedPlayers: Player[], chainIndex: number, lab: Lab, meritConnectionBonus: number) => {
    const jewelMultiplier = lab.bonuses[8].getBonus();
    const jewelconnectionRangeBonus = lab.jewels.filter(jewel => jewel.active && jewel.index == 9).reduce((sum, jewel) => sum += jewel.getBonus(jewelMultiplier), 0)
    const bonusConnectionRangeBonus = lab.bonuses[13].getBonus();

    const connectionRangeBonus = jewelconnectionRangeBonus + bonusConnectionRangeBonus;

    const player = connectedPlayers[chainIndex];
    const playerCords = lab.playerCords[player.playerID];
    let hasImpact = false
    lab.playersInTubes.forEach(tubePlayer => {
        const tubePlayerCoords = lab.playerCords[tubePlayer.playerID];
        const inRange = lab.getDistance(playerCords.x, playerCords.y, tubePlayerCoords.x, tubePlayerCoords.y) < tubePlayer.labInfo.lineWidth;
        if (!connectedPlayers.includes(tubePlayer) && inRange) {
            connectedPlayers.push(tubePlayer);
            hasImpact = true;
        }
    })

    lab.bonuses.filter(bonus => !bonus.active).forEach(bonus => {
        const inRange = lab.getDistance(playerCords.x, playerCords.y, bonus.x, bonus.y) < bonus.getRange(connectionRangeBonus, meritConnectionBonus);
        if (inRange) {
            bonus.active = true;
            hasImpact = true;
        }
    });

    lab.jewels.filter(jewel => jewel.available && !jewel.active).forEach(jewel => {
        const inRange = lab.getDistance(playerCords.x, playerCords.y, jewel.data.x, jewel.data.y) < jewel.getRange(connectionRangeBonus, meritConnectionBonus);
        if (inRange) {
            jewel.active = true;
            hasImpact = true;
        }
    });

    return hasImpact;
}

export const updateLab = (data: Map<string, any>) => {
    const lab = data.get("lab") as Lab;
    const playerData = data.get("players") as Player[];
    const cooking = data.get("cooking") as Cooking;
    const cards = data.get("cards") as Card[];
    const gemStore = data.get("gems") as GemStore;
    const breeding = data.get("breeding") as Breeding;
    const deathnote = data.get("deathnote") as Deathnote;
    const storage = data.get("storage") as Storage;
    const taskBoard = data.get("taskboard") as TaskBoard;
    const divinity = data.get("divinity") as Divinity;

    // Append chip info to the players.
    Object.entries(lab.playerChips).forEach(([playerIndex, chips]) => {
        const index = parseInt(playerIndex);
        chips.forEach((chip, chipIndex) => {
            playerData[index].labInfo.chips[chipIndex].chip = chip;
        })
        // Update card boost, kinda ugly here but easiest solution for now.
        if (chips.filter(chip => chip.data.name == "Omega Nanochip").length > 0 && playerData[index].cardInfo) {
            (playerData[index].cardInfo as CardInfo).equippedCards[0].chipBoost = 2;
        }
        if (chips.filter(chip => chip.data.name == "Omega Motherboard").length > 0 && playerData[index].cardInfo) {
            (playerData[index].cardInfo as CardInfo).equippedCards[7].chipBoost = 2;
        }
        // Same ugly handling for starsign doubler.
        if (chips.filter(chip => chip.data.name == "Silkrode Nanochip").length > 0) {
            playerData[index].starSigns.filter(sign => sign.aligned).forEach(sign => sign.hasChip = true);
        }
    })

    // Things to care about:
    // 1. Jewel that boosts meal bonus.
    // 2. Jewel that boosts line width.
    // 3. Jewel that boosts connection range.
    // 4. Bonus that doubles all Jewels.
    // 5. Bubo purple for extra line width.

    // Figure out which players are in lab first and sort by player id.
    const playersInLab = [...playerData].filter(player => player.currentMonster?.id == "Laboratory" || divinity.playerInfo[player.playerID].isLinkedToGod(1)).sort((player1, player2) => player1.playerID > player2.playerID ? 1 : -1);

    lab.playersInTubes = playersInLab;

    // figure out w4 merit extra connection range;
    const connectionMerit = taskBoard.merits.find(merit => merit.descLine1.includes("connection range in the Lab"));
    let meritConnectionBonus = 0;
    if (connectionMerit) {
        meritConnectionBonus = connectionMerit.bonusPerLevel * connectionMerit.level;
    }

    // Figure out best bubo (for purple) and his bonus.
    const bestBubo = playerData.reduce((final, player) => final = (player.talents.find(talent => talent.skillIndex == 535)?.level ?? 0) > 0 && player.playerID > final.playerID ? player : final, playerData[0]);
    const buboPxBoost = bestBubo.talents.find(talent => talent.skillIndex == 535)?.getBonus() ?? 0;
    lab.bestBuboPlayerID = bestBubo.playerID;

    let loopAgain = true;
    const connectedPlayers: Player[] = [];
    while (loopAgain) {
        loopAgain = false;
        // calculate line widths
        _calculatePlayersLineWidth(lab, cooking, breeding, cards, gemStore, buboPxBoost);

        // If we have players in lab, and no chain, try and find the player connected to prism.
        if (lab.playersInTubes.length > 0 && connectedPlayers.length == 0) {
            const prismPlayer = _findPrismSource(lab);
            if (prismPlayer) {
                connectedPlayers.push(prismPlayer);
            }
        }

        // Loop the things
        for (let chainIndex = 0; chainIndex < lab.playersInTubes.length; chainIndex++) {
            if (connectedPlayers.length > chainIndex) {
                loopAgain = _calculatePlayerImpact(connectedPlayers, chainIndex, lab, meritConnectionBonus);
            }
        }
    }

    if (lab.jewels[16].available) {
        // fake 16 is active to avoid odd scenarios
        lab.jewels[16].active = true;

        _calculatePlayersLineWidth(lab, cooking, breeding, cards, gemStore, buboPxBoost);
        // deactivate after we updated all the widths.
        lab.jewels[16].active = false;

        // If we have players in lab, and no chain, try and find the player connected to prism.
        if (lab.playersInTubes.length > 0 && connectedPlayers.length == 0) {
            const prismPlayer = _findPrismSource(lab);
            if (prismPlayer) {
                connectedPlayers.push(prismPlayer);
            }
        }

        // Loop the things
        for (let chainIndex = 0; chainIndex < lab.playersInTubes.length; chainIndex++) {
            if (connectedPlayers.length > chainIndex) {
                loopAgain = _calculatePlayerImpact(connectedPlayers, chainIndex, lab, meritConnectionBonus);
            }
        }

        // Redo line width maths in case the jewel didn't get re-enabled.
        _calculatePlayersLineWidth(lab, cooking, breeding, cards, gemStore, buboPxBoost);
    }

    const jewelMultiplier = (lab.bonuses.find(bonus => bonus.index == 8)?.active ?? false) ? 1.5 : 1;
    lab.jewels.forEach(jewel => jewel.bonusMultiplier = jewelMultiplier);

    // Special Jewel handling
    (lab.jewels[0] as AmethystRhinestoneJewel).numberOfActivePurples = lab.jewels.filter(jewel => (jewel.data.name.includes("Amethyst") || jewel.data.name.includes("Purple")) && jewel.active).length;
    (lab.jewels[10] as PyritePyramiteJewel).numberOfActiveOrange = lab.jewels.filter(jewel => jewel.data.name.includes("Pyrite") && jewel.active).length;
    (lab.jewels[12] as EmeraldNavetteJewel).numberOfActiveGreen = lab.jewels.filter(jewel => jewel.data.name.includes("Emerald") && jewel.active).length;
    (lab.jewels[14] as EmeraldPyramiteJewel).numberOfKitchenLevels = cooking.kitchens.reduce((sum, kitchen) => sum += kitchen.recipeLevels + kitchen.mealLevels + kitchen.luckLevels, 0);

    // Special Bonus handling
    (lab.bonuses[0] as AnimalFarmBonus).totalSpecies = breeding.speciesUnlocks.reduce((sum, world) => sum += world, 0);
    
    (lab.bonuses[9] as FungiFingerBonus).greenMushroomKilled = deathnote.mobKillCount.get("mushG")?.reduce((sum, killCount) => sum += Math.round(killCount), 0) ?? 0;
    // Emerald Rhombol
    if (lab.jewels[13].active) {
        (lab.bonuses[9] as FungiFingerBonus).jewelBoost = lab.jewels[13].getBonus()
    
    }
    (lab.bonuses[11] as UnadulteratedBankingBonus).greenStacks = [...new Set(storage.chest.filter(item => item.count >= 1e7).map(item => item.internalName))].length;
    

    return lab;
}