import { range, round } from '../../utility';
import { Domain, RawData } from '../base/domain';
import { initStatueRepo, StatueDataBase } from '../data/StatueRepo';
import { EventShop } from '../eventShop';
import { ImageData } from '../imageData';
import { Item } from '../items';
import { StatueDataModel } from '../model/statueDataModel';
import { Player } from '../player';
import { UpgradeVault } from '../upgradeVault';
import { Sailing } from '../world-5/sailing/sailing';
import { Meritocraty } from '../world-7/meritocraty';
import { ZenithMarket } from '../world-7/zenithShop';

export const StatueConst = {
    LevelIndex: 0,
    ProgressIndex: 1,
    AnvilIndex: 11,
    SkillXpIndex: 17
}

export enum StatusType {
    Basic,
    Gold,
    Onyx,
    Zenith
}

export class Statue {
    public type: StatusType = StatusType.Basic;
    public level: number = 0;
    public progress: number = 0;

    public statueNumber: number = 0;

    public onyxStatueBonus: number = 2;
    public zenithStatueBonus: number = 1.5;
    public dragonStatueBonus: number = 1;
    public otherBonuses: number = 1;

    constructor(public index: number, public displayName: string, public internalName: string, public bonus: string, public statueData: StatueDataModel) {
        const StatueNumberRegex = /EquipmentStatues(\d+)/gm;
        try {
            const regexMatches = StatueNumberRegex.exec(internalName);
            if (regexMatches) {
                this.statueNumber = parseInt(regexMatches[1]);
            }
        }
        catch (e) {
            console.debug("Failed parsing statue number", e);
        }
    }

    getRequiredForNextLevel = () => {
        return 0;
    }

    getBonus = (player: Player | undefined = undefined): number => {
        let talentBonus = 1;

        // Calculate statue bonus based on talents
        if (player) {
            switch (this.displayName) {
                case "Power Statue":
                case "Mining Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 112 || x.skillIndex == 127)?.getBonus() ?? 0) / 100;
                    break;
                case "Thicc Skin Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 127)?.getBonus() ?? 0) / 100;
                    break;
                case "Oceanman Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 112)?.getBonus() ?? 0) / 100;
                    break;
                case "Speed Statue":
                case "Anvil Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 307 || x.skillIndex == 292)?.getBonus() ?? 0) / 100;
                    break;
                case "Bullseye Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 307)?.getBonus() ?? 0) / 100;
                    break;
                case "Ol Reliable Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 292)?.getBonus() ?? 0) / 100;
                    break;
                case "Exp Statue":
                case "Lumberbob Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 472 || x.skillIndex == 487)?.getBonus() ?? 0) / 100;
                    break;
                case "Beholder Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 472)?.getBonus() ?? 0) / 100;
                    break;
                case "Cauldron Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 487)?.getBonus() ?? 0) / 100;
                    break;
                case "EhExPee Statue":
                case "Kachow Statue":
                case "Feasty Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 37)?.getBonus() ?? 0) / 100;
                    break;
                default: talentBonus = 1;
            }
        }
        return this.level * this.statueData.bonus * talentBonus * (this.type >= StatusType.Onyx ? this.onyxStatueBonus : 1) 
            * (this.type >= StatusType.Zenith ? this.zenithStatueBonus : 1) * this.otherBonuses * this.dragonStatueBonus;
    }

    getBonusText = (player: Player | undefined = undefined) => {
        const bonus = round(this.getBonus(player));
        if (this.bonus.includes("%@")) {
            return this.bonus.replace("%@", `+${bonus}% `);
        }
        return this.bonus.replace("@", `+${bonus} `);
    }

    getImageData = (): ImageData => {
        let extraChar = "";
        switch (this.type) {
            case StatusType.Gold: {
                extraChar = "G"
                break;
            }
            case StatusType.Onyx: {
                extraChar = "O";
                break;
            }
            case StatusType.Zenith: {
                extraChar = "Z";
                break;
            }
        }
        return {
            location: `Statue${extraChar}${this.statueNumber}`,
            height: 50,
            width: 41
        }
    }

    static fromBase = (data: StatueDataBase[]) => {
        return data.map(statue => new Statue(statue.index, `${statue.data.name} Statue`, `EquipmentStatues${statue.index + 1}`, statue.data.effect, statue.data));
    }
}

export class PlayerStatues {
    statues: Statue[];

    constructor(public playerID: number) {
        this.statues = Statue.fromBase(initStatueRepo());
    }
}

export class Statues extends Domain {
    getRawKeys(): RawData[] {
        return [
            { key: `StatueLevels_`, perPlayer: true, default: [] },
            { key: `StuG`, perPlayer: false, default: [] },
        ]
    }
    init(_allItems: Item[], charCount: number) {
        return [...Array(charCount)].map((_, pIndex) => new PlayerStatues(pIndex));
    }
    parse(data: Map<string, any>): void {
        const charCount = data.get("charCount") as number;
        const statues = data.get(this.getDataKey()) as PlayerStatues[];

        const allStatues = [...Array(charCount)].map((_, i) => data.get(`StatueLevels_${i}`)) as number[][][];
        const goldStatues = data.get(`StuG`) as number[];


        range(0, charCount).forEach((_, pIndex) => {
            // If this is the first time handling this player, init.
            if (statues.length <= pIndex) {
                statues.push(new PlayerStatues(pIndex))
            }

            statues[pIndex].statues.forEach((statue, statueIndex) => {
                if (allStatues[pIndex].length > statueIndex) {
                    statue.level = allStatues[pIndex][statueIndex][StatueConst.LevelIndex];
                    statue.progress = allStatues[pIndex][statueIndex][StatueConst.ProgressIndex];
                    if (goldStatues.length > statueIndex) {
                        switch (goldStatues[statueIndex]) {
                            case 1: {
                                statue.type = StatusType.Gold;
                                break;
                            }
                            case 2: {
                                statue.type = StatusType.Onyx;
                                break;
                            }
                            case 3: {
                                statue.type = StatusType.Zenith;
                                break;
                            }
                        }
                    }
                }
            });
        });
    }
}

export const updateStatueBonuses = (data: Map<string, any>) => {
    const statues = data.get("statues") as PlayerStatues[];
    const playerData = data.get("players") as Player[];
    const sailing = data.get("sailing") as Sailing;
    const eventShop = data.get("eventShop") as EventShop;
    const meritocraty = data.get("meritocraty") as Meritocraty;
    const upgradeVault = data.get("upgradeVault") as UpgradeVault;
    const zenithMarket = data.get("zenithMarket") as ZenithMarket;

    let voodooStatuficationTalentBonus = 0;
    const bestVoidMan = playerData.reduce((final, player) => final = (player.talents.find(talent => talent.skillIndex == 56)?.level ?? 0) > 0 && player.playerID > final.playerID ? player : final, playerData[0]);
    if (bestVoidMan) {
        voodooStatuficationTalentBonus = bestVoidMan.talents.find(talent => talent.skillIndex == 56)?.getBonus() ?? 0;
    }
    const eventShopBonus19 = eventShop.isBonusOwned(19) ? 30 : 0;
    const meritocratyBonus26 = meritocraty.getCurrentBonus(26);
    const otherBonuses = (1 + eventShopBonus19 / 100) * (1 + voodooStatuficationTalentBonus / 100) * (1 + meritocratyBonus26 / 100);

    // Bonus for a few statues only
    const upgradeVaultBonus = 1 + upgradeVault.getBonusForId(25) / 100;

    const onyxStatueBonus = 2 + Math.max(0, sailing.artifacts[30].getBonus()) / 100;
    const zenithStatueBonus = Math.max(1, 1 + (50 + zenithMarket.getBonusForId(0)) / 100);

    statues.forEach(playerStatues => {
        // First calculate the bonus for the dragon statue of the player
        const dragonStatue = playerStatues.statues.find(statue => statue.index == 29);
        let dragonStatueBonus = 1;
        if (dragonStatue) {
            dragonStatue.onyxStatueBonus = onyxStatueBonus;
            dragonStatue.zenithStatueBonus = zenithStatueBonus;
            dragonStatue.otherBonuses = otherBonuses;
            dragonStatue.dragonStatueBonus = 1;
            dragonStatueBonus = 1 + dragonStatue.getBonus() / 100;
        }

        // Then calculate the bonus for all other statues
        playerStatues.statues.forEach(statue => {
            if (statue.index != 29) {
                statue.onyxStatueBonus = onyxStatueBonus;
                statue.zenithStatueBonus = zenithStatueBonus;
                // Add the upgrade vault bonus for those ones only
                if([0, 1, 2, 6].includes(statue.index)) {
                    statue.otherBonuses = otherBonuses * upgradeVaultBonus;
                } else {
                    statue.otherBonuses = otherBonuses;
                }
                statue.dragonStatueBonus = dragonStatueBonus;
            }
        });
    });
}
