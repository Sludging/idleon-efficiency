import { AnvilWrapper } from "./anvil";
import { Arcade } from "./arcade";
import { Domain, RawData } from "./base/domain";
import { Construction } from "./construction";
import { Equinox, FoodLust } from "./equinox";
import { ImageData } from "./imageData";
import { Item } from './items';
import { ObolsData, Obol } from "./obols";
import { Activity, Player } from "./player";
import { Prayer } from "./prayers";
import { Refinery } from "./refinery";
import { Skilling } from "./skilling";
import { SkillsIndex } from "./SkillsIndex";
import { Talent } from "./talents";
import { Trap } from "./traps";
import { Farming } from "./world-6/farming";
import { Worship } from "./worship";
import { Storage } from "./storage";
import { SummonEssenceColor, Summoning } from "./world-6/summoning";
import { Divinity } from "./divinity";

export enum AlertType {
    CardSet = "Card Set",
    NoActivity = "No Activity",
    Anvil = "Anvil",
    EmptyObolSlot = "Empty Obol Slot",
    Worship = "Worship",
    Refinery = "Refinery",
    CDReady = "Cooldown Ready",
    Traps = "Traps",
    ArcadeFull = "Arcade Full",
    Prayer = "Prayer",
    Construction = "Construction",
    Cooking = "Cooking",
    Farming = "Farming",
    Sneaking = "Sneaking",
    EquinoxFull = "Equinox Full",
    CanCraftLuckierLad = "Can craft Luckier Lad",
    CanBuyFamiliar = "Can buy a familiar for Summoning",
    PassiveCardEquipped = "Cards that are passive are equipped",
    DivinityStyleBad = "Divinity style should be changed",
    DivinityGodBad = "Divinity linked should be changed"
}

export abstract class Alert {
    title: string = "";
    text: string = "";
    icon: ImageData | undefined = undefined;
    constructor(public type: AlertType) { }
}

export class GlobalAlert extends Alert {
    constructor(title: string, type: AlertType, icon?: ImageData) {
        super(type);
        this.title = title;
        this.icon = icon;
    }
}

export class PlayerAlert extends Alert {
    constructor(public player: Player, type: AlertType) {
        super(type);
    }
}

export class DivinityStyleAlert extends PlayerAlert {
    constructor(player: Player, public text: string) {
        super(player, AlertType.EmptyObolSlot);
        this.title = "Change meditation style";
        this.text = text;
        this.icon = {
            location: 'GemP22',
            height: 36,
            width: 36,
        }
    }
}

export class DivinityLinkedAlert extends PlayerAlert {
    constructor(player: Player, public text: string) {
        super(player, AlertType.EmptyObolSlot);
        this.title = "Change linked God";
        this.text = text;
        this.icon = {
            location: Skilling.getSkillImageData(SkillsIndex.Divinity).location,
            height: 36,
            width: 36,
        }
    }
}

export class CardSetAlert extends PlayerAlert {
    constructor(player: Player, text: string, icon: string) {
        super(player, AlertType.CardSet);
        this.title = "Bad card set";
        this.text = text;
        this.icon = {
            location: icon,
            height: 36,
            width: 36,
        }
    }
}

export class DoingNothingAlert extends PlayerAlert {
    constructor(player: Player) {
        super(player, AlertType.NoActivity);
        this.title = "Doing nothing";
    }
}

export class ObolEmptyAlert extends PlayerAlert {
    constructor(player: Player, public count: number) {
        super(player, AlertType.EmptyObolSlot);
        this.title = "Empty Obol Slots";
        this.text = `${count} empty slots`;
        this.icon = {
            location: 'ObolLocked1',
            height: 36,
            width: 36,
        }
    }
}

export class AnvilAlert extends PlayerAlert {
    constructor(player: Player, text: string, icon?: ImageData) {
        super(player, AlertType.Anvil);
        this.title = "Anvil issues";
        this.text = text;
        this.icon = icon;
    }
}

export class WorshipAlert extends PlayerAlert {
    constructor(player: Player) {
        super(player, AlertType.Worship);
        this.title = "Worship is Full";
        this.icon = Skilling.getSkillImageData(SkillsIndex.Worship);
    }
}

export class CooldownAlert extends PlayerAlert {
    constructor(player: Player, talent: Talent) {
        super(player, AlertType.CDReady);
        this.title = `${talent.name} is ready`;
        this.icon = talent.getImageData();

        // Override default size
        this.icon.height = 36;
        this.icon.width = 36;
    }
}

export class PrayerAlert extends PlayerAlert {
    constructor(player: Player, prayer: Prayer) {
        super(player, AlertType.Prayer);
        switch (prayer.data.name) {
            case "Unending Energy":
                this.title = "AFK for too long (>10 hours) with Unending Energy Prayer";
                break;
            default:
                this.title = `Prayer issue with ${prayer.data.name}`;
                break;
        }
        this.icon = prayer.getImageData();

        // Override default size
        this.icon.height = 36;
        this.icon.width = 36;
    }
}

export class SneakingLevelReady extends PlayerAlert {
    constructor(player: Player, talent: Talent) {
        super(player, AlertType.Sneaking);
        this.title = "Connect this player to increase Sneaking level";
        this.icon = Skilling.getSkillImageData(SkillsIndex.Sneaking);

        // Override default size
        this.icon.height = 36;
        this.icon.width = 36;
    }
}

export class PassiveCardEquipped extends PlayerAlert {
    constructor(player: Player) {
        super(player, AlertType.PassiveCardEquipped);
        this.title = "Some passive cards are equipped (you always get their bonus so you shouldn't equip them)"
        this.icon = {
            location: 'ClassIconsQmark',
            height: 36,
            width: 36,
        }
    }
}

export class TrapAlerts extends GlobalAlert {
    constructor(public count: number) {
        super(`${count} Traps ready to be collected`, AlertType.Traps, Item.getImageData("TrapBoxSet1"));

        // override default size
        (this.icon as ImageData).width = 50;
        (this.icon as ImageData).height = 50;
    }
}

export class ArcadeFullAlert extends GlobalAlert {
    constructor() {
        super(`Your arcade balls are capped, go claim.`, AlertType.ArcadeFull, Arcade.silverBallImageData());

        // override default size
        (this.icon as ImageData).width = 50;
        (this.icon as ImageData).height = 50;
    }
}

export class ConstructionAlert extends GlobalAlert {
    constructor(public count: number) {
        super(`${count} buildings finished in construction, go claim.`, AlertType.Construction, Skilling.getSkillImageData(SkillsIndex.Construction));

        (this.icon as ImageData).width = 50;
        (this.icon as ImageData).height = 50;
    }
}

export class FoodLustAlert extends GlobalAlert {
    constructor() {
        super(`Maximum food lust discount reached, go upgrade a meal`, AlertType.Cooking, Skilling.getSkillImageData(SkillsIndex.Cooking));

        (this.icon as ImageData).width = 50;
        (this.icon as ImageData).height = 50;
    }
}

export class CropReadyAlert extends GlobalAlert {
    constructor(public count: number, public countOG: number) {
        super(`${count} farming plots fully grown${countOG > 0 ? ` (${countOG} with OG level)` : ``}, go collect.`, AlertType.Farming, Skilling.getSkillImageData(SkillsIndex.Farming));

        (this.icon as ImageData).width = 50;
        (this.icon as ImageData).height = 50;
    }
}

export class EquinoxBarFull extends GlobalAlert {
    constructor() {
        super(`Equinox bar is full, go upgrade a bonus`, AlertType.EquinoxFull, Equinox.cloudImageData());

        (this.icon as ImageData).width = 50;
        (this.icon as ImageData).height = 50;
    }
}

export class CanCraftLuckierLad extends GlobalAlert {
    constructor() {
        super(`You have enough Lucky Lads across your account to craft a Luckier Lad`, AlertType.CanCraftLuckierLad, Item.getImageData("Trophy20"));

        (this.icon as ImageData).width = 50;
        (this.icon as ImageData).height = 50;
    }
}

export class CanBuySummoningFamiliar extends GlobalAlert {
    constructor() {
        super(`You have enough white essence to buy a familiar, go get it`, AlertType.CanBuyFamiliar, 
            {
                location: 'SumUpgIc2',
                height: 50,
                width: 50,
            });
    }
}

export class Alerts extends Domain {
    playerAlerts: Record<number, Alert[]> = {};
    generalAlerts: Alert[] = [];

    getPlayerAlertsOfType = (playerID: number, alertType: string): Alert[] => {
        return this.playerAlerts[playerID]?.filter(alert => alert.type == alertType) ?? [];
    }

    getRawKeys(): RawData[] {
        return []
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        return;
    }
}

const getPlayerAlerts = (player: Player, anvil: AnvilWrapper, playerObols: Obol[], worshipData: Worship, prayers: Prayer[], divinityData: Divinity): Alert[] => {
    const alerts: Alert[] = [];
    // use a new variable to shorten conditions in later uses
    const playerDivinityData = divinityData.playerInfo[player.playerID];
    // Activity based alerts
    switch (player.getActivityType()) {
        case Activity.Fighting:
            if (![0, 1, 4, 5, 6, 9, 10, 11].some(id => (player.cardInfo?.getBonusForId(id) ?? 0) > 0)) {
                alerts.push(new CardSetAlert(player, `${player.cardInfo?.getCardSetText()} isn't optimal fighting`, player.cardInfo?.getCardSetIcon() ?? 'CardSet26'));
            }
            break;
        case Activity.Lab:
            if (![2, 3, 7].some(id => (player.cardInfo?.getBonusForId(id) ?? 0) > 0)) {
                alerts.push(new CardSetAlert(player, `${player.cardInfo?.getCardSetText()} isn't optimal lab`, player.cardInfo?.getCardSetIcon() ?? 'CardSet26'));
            }
            if ((playerDivinityData.gods.length ?? 0) == 1 && playerDivinityData.gods[1].data.name == 'Arctis') {
                alerts.push(new DivinityLinkedAlert(player, "Arctis god is useless while you're in lab"));
            }
            break;
        case Activity.Skilling:
            if (![1, 2, 3, 7].some(id => (player.cardInfo?.getBonusForId(id) ?? 0) > 0)) {
                alerts.push(new CardSetAlert(player, `${player.cardInfo?.getCardSetText()} isn't optimal skilling`, player.cardInfo?.getCardSetIcon() ?? 'CardSet26'));
            }
            break;
        case Activity.Divinity:
            if ((player.skills.get(SkillsIndex.Divinity)?.level ?? 0) >= 80 && (playerDivinityData.style.name ?? '') != 'Mindful') {
                alerts.push(new DivinityStyleAlert(player, "You should use Mindful style"));
            } else if ((player.skills.get(SkillsIndex.Divinity)?.level ?? 0) >= 60 && (playerDivinityData.style.name ?? '') != 'Zen') {
                // If using Mantra on 8 or more players it'll be better than using Zen for EXP
                if (!(divinityData.playerInfo.filter(info => (info.style.name ?? '') == 'Mantra').length >= 8 && (playerDivinityData.style.name ?? '') == 'Mantra')) {
                    alerts.push(new DivinityStyleAlert(player, "You should use Zen style"));
                }
            } else if ((player.skills.get(SkillsIndex.Divinity)?.level ?? 0) >= 25) {
                // If using Mantra on 7 or more players it'll be better than using Vitalic for EXP
                if (!(divinityData.playerInfo.filter(info => (info.style.name ?? '') == 'Mantra').length >= 7 && (playerDivinityData.style.name ?? '') == 'Mantra')) {
                    alerts.push(new DivinityStyleAlert(player, "You should use Vitalic style"));
                }
            } else if ((player.skills.get(SkillsIndex.Divinity)?.level ?? 0) >= 10 && (playerDivinityData.style.name ?? '') == 'Kinesis') {
                alerts.push(new DivinityStyleAlert(player, "You should use Focus style"));
            } else if ((player.skills.get(SkillsIndex.Divinity)?.level ?? 0) >= 5 && (playerDivinityData.style.name ?? '') == 'Kinesis') {
                alerts.push(new DivinityStyleAlert(player, "You should use Chakra style"));
            }            
            break;
        case Activity.Unknown:
            alerts.push(new DoingNothingAlert(player));
            break;
    }

    // Separate those two from above to avoid having it in multiple case
    if (player.getActivityType() != Activity.Lab && (playerDivinityData.gods.length ?? 0) == 1 && playerDivinityData.gods[1].data.name == 'Goharut') {
        alerts.push(new DivinityLinkedAlert(player, "Goharut god is useless while you're not in lab"));
    }
    if (player.getActivityType() != Activity.Divinity && (playerDivinityData.style.name ?? '') != 'TranQi' && (player.skills.get(SkillsIndex.Divinity)?.level ?? 0) >= 40) {
        alerts.push(new DivinityStyleAlert(player, "You should use TranQi style while not meditating"));
    }

    // Passive cards equipped
    if (player.cardInfo?.equippedCards.some(card => card.passive)) {
        alerts.push(new PassiveCardEquipped(player));
    }

    // Anvil Alerts
    anvil.playerAnvils[player.playerID].production.forEach(anvilProduct => {
        if (anvilProduct.timeTillCap <= 0) {
            alerts.push(new AnvilAlert(player, `${anvilProduct.displayName} production is at capacity, go collect!`, Item.getImageData(anvilProduct.data.item)));
        }
    })

    if (anvil.playerAnvils[player.playerID].currentlySelect.indexOf(-1) > -1) {
        alerts.push(new AnvilAlert(player, "Unused hammer, losing out on production!", { location: 'UIquickref1', height: 36, width: 36 }));
    }

    // Obol Alerts
    if (playerObols) {
        const emptyObolSlots = playerObols.filter(obol => obol.item.internalName == "Blank").length;
        if (emptyObolSlots > 0) {
            alerts.push(new ObolEmptyAlert(player, emptyObolSlots));
        }
    }

    // Worship Alerts
    const playerWorshipInfo = worshipData.playerData[player.playerID];
    if (playerWorshipInfo && playerWorshipInfo.maxCharge > 0 && playerWorshipInfo.currentCharge >= playerWorshipInfo.maxCharge) {
        alerts.push(new WorshipAlert(player));
    }

    // Cooldown alerts
    const cooldownTalentIndexes = [32, 130, 370, 490] // Ignoring Charge Syphon (475) for now.
    cooldownTalentIndexes.forEach(cdTalent => {
        const talent = player.talents.find(talent => talent.skillIndex == cdTalent && talent.level > 0);
        if (talent) {
            const talentCooldown = player.getCurrentCooldown(cdTalent);
            if (talentCooldown <= 0) {
                alerts.push(new CooldownAlert(player, talent));
            }
        }
    })

    // Unending Energy Issue (Prayer Index = 2)
    if (player.activePrayers.includes(2) && player.afkFor > 10 * 60 * 60) {
        alerts.push(new PrayerAlert(player, prayers[2]));
    }

    return alerts;
}

const getGlobalAlerts = (worship: Worship, refinery: Refinery, traps: Trap[][], arcade: Arcade, construction: Construction, equinox: Equinox, farming: Farming, players: Player[], storage: Storage, summoning: Summoning): Alert[] => {
    const globalAlerts: Alert[] = [];

    // Worship
    if (worship.totalData.maxCharge > 0 && worship.totalData.overFlowTime <= 0 ) {
        globalAlerts.push(new GlobalAlert("Overflowing charge. Go to World 3 -> Worship for more details.", AlertType.Worship, Skilling.getSkillImageData(SkillsIndex.Worship)))
    }

    // Refinery
    Object.entries(refinery.salts).forEach(([saltName, saltInfo]) => {
        if (saltInfo.progress == saltInfo.getCap()) {
            globalAlerts.push(new GlobalAlert(`${saltName} is ready for rank up.`, AlertType.Refinery, Item.getImageData(saltName)))
        }
        // Fuel is empty math, need storage items logic from the construction page.
        //if (saltInfo.active && saltInfo.getFuelTime())
    })

    // Traps
    const readyTraps = traps.flatMap(playerTraps => playerTraps).reduce((sum, trap) => sum += trap.placed && trap.isReady() ? 1 : 0, 0);
    if (readyTraps > 0) {
        globalAlerts.push(new TrapAlerts(readyTraps));
    }

    // Arcade
    const isCapped = arcade.maxBalls <= arcade.ballsToClaim;
    if (isCapped) {
        globalAlerts.push(new ArcadeFullAlert())
    }

    // Construction
    const finishedBuildingsCount = construction.buildings.flatMap(building => building).reduce((sum, building) => sum += building.finishedUpgrade ? 1 : 0, 0);
    if (finishedBuildingsCount > 0) {
        globalAlerts.push(new ConstructionAlert(finishedBuildingsCount));
    }

    // Equinox Food Lust
    const foodLustCapped = (equinox.upgrades[9] as FoodLust).isCapped();
    if (foodLustCapped) {
        globalAlerts.push(new FoodLustAlert());
    }

    // Equinox Bar Full
    const equinoxBarFull = (equinox.bar.current == equinox.bar.max);
    // Check if there's an unlocked upgrade that can be leveled
    const canUpgradeSomething = equinox.upgrades.filter(upgrade => upgrade.unlocked == true).some(upgrade => upgrade.level < upgrade.maxLevel);
    // The first upgrade is always unlocked, so to avoid showing the alert for beginner accounts that shouldn't have this, verify if there's at a level in any upgrade
    const totalLevels = equinox.upgrades.reduce((total: number, upgrade) => {return total + upgrade.level}, 0);
    // If bar is full and have an upgrade that can be improved, display the alert
    if (equinoxBarFull && canUpgradeSomething && totalLevels > 0) {
        globalAlerts.push(new EquinoxBarFull());
    }

    // Farming
    const farmingCropsReady = farming.farmPlots.filter(plot => plot.readyToCollect).length;
    const farmingCropsWithOG = farming.farmPlots.filter(plot => plot.readyToCollect && plot.OGlevel > 0).length;
    if (farmingCropsReady > 0) {
        globalAlerts.push(new CropReadyAlert(farmingCropsReady, farmingCropsWithOG));
    }

    // Can craft Luckier Lad
    const recipeUnlocked = equinox.challenges.find(challenge => challenge.index == 16)?.complete ?? false;
    const luckyLadOwned = storage.amountInStorage("Trophy2");
    // If the recipe is unlocked and we have 75 or more Lucky lads, display the alert
    if (recipeUnlocked && luckyLadOwned >= 75) {
        globalAlerts.push(new CanCraftLuckierLad());
    }
    
    // Can buy a familiar for Summoning (in case cost reset for example)
    const familiarUpgrade = summoning.summonUpgrades.find(bonus => bonus.index == 2)!;
    const familiarUpgradeUnlocked = familiarUpgrade.unlocked;
    const canBuyFamiliar = familiarUpgrade.nextLevelCost() < (summoning.summonEssences.find(essence => essence.color == SummonEssenceColor.White)?.quantity ?? 0);
    const maxedFamiliarUpgrade = familiarUpgrade.level == familiarUpgrade.data.maxLvl;
    // If the upgrade is unlocked, can afford a level, and not already maxed, display the alert
    if (familiarUpgradeUnlocked && canBuyFamiliar && !maxedFamiliarUpgrade) {
        globalAlerts.push(new CanBuySummoningFamiliar());
    }

    return globalAlerts;
}

export const updateAlerts = (data: Map<string, any>) => {
    const alerts = data.get("alerts") as Alerts;
    const players = data.get("players") as Player[];
    const anvil = data.get("anvil") as AnvilWrapper;
    const obols = data.get("obols") as ObolsData;
    const worship = data.get("worship") as Worship;
    const refinery = data.get("refinery") as Refinery;
    const traps = data.get("traps") as Trap[][];
    const arcade = data.get("arcade") as Arcade;
    const prayers = data.get("prayers") as Prayer[];
    const construction = data.get("construction") as Construction;
    const equinox = data.get("equinox") as Equinox;
    const farming = data.get("farming") as Farming;
    const storage = data.get("storage") as Storage;
    const summoning = data.get("summoning") as Summoning;
    const divinity = data.get("divinity") as Divinity;

    players.forEach(player => {
        alerts.playerAlerts[player.playerID] = []
        alerts.playerAlerts[player.playerID].push(...getPlayerAlerts(player, anvil, obols.playerObols[player.playerID], worship, prayers, divinity))
    })

    // Global Alerts
    alerts.generalAlerts = getGlobalAlerts(worship, refinery, traps, arcade, construction, equinox, farming, players, storage, summoning);
    return alerts;
}
