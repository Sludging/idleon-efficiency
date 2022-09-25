import { AnvilWrapper } from "./anvil";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { ObolsData, Obol } from "./obols";
import { Activity, Player } from "./player";
import { Refinery } from "./refinery";
import { Skilling } from "./skilling";
import { SkillsIndex } from "./SkillsIndex";
import { ClassIndex, Talent } from "./talents";
import { Trap } from "./traps";
import { Worship } from "./worship";

export enum AlertType {
    CardSet = "Card Set",
    NoActivity = "No Activity",
    Anvil = "Anvil",
    EmptyObolSlot = "Empty Obol Slot",
    Worship = "Worship",
    Refinery = "Refinery",
    CDReady = "Cooldown Ready",
    Traps = "Traps"
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

export class CardSetAlert extends PlayerAlert {
    constructor(player: Player, text: string) {
        super(player, AlertType.CardSet);
        this.title = "Bad card set";
        this.text = text;
        this.icon = {
            location: 'CardSet26',
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
    }
}

export class TrapAlerts extends GlobalAlert {
    constructor(public count: number) {
        super(`${count} Traps ready to be collected`, AlertType.Traps, Item.getImageData("TrapBoxSet1"));
    }
}

export class Alerts {
    playerAlerts: Record<number, Alert[]> = {};
    generalAlerts: Alert[] = [];

    getPlayerAlertsOfType = (playerID: number, alertType: string): Alert[] => {
        return this.playerAlerts[playerID].filter(alert => alert.type == alertType);
    }
}

const getPlayerAlerts = (player: Player, anvil: AnvilWrapper, playerObols: Obol[], worshipData: Worship): Alert[] => {
    const alerts: Alert[] = [];
    // Activity based alerts
    switch (player.getActivityType()) {
        case Activity.Fighting:
            if (![0, 1, 4, 5, 6].some(id => (player.cardInfo?.getBonusForId(id) ?? 0) > 0)) {
                alerts.push(new CardSetAlert(player, `${player.cardInfo?.getCardSetText()} isn't useful for fighting`));
            }
            break;
        case Activity.Lab:
            if (![2, 3, 7].some(id => (player.cardInfo?.getBonusForId(id) ?? 0) > 0)) {
                alerts.push(new CardSetAlert(player, `${player.cardInfo?.getCardSetText()} isn't useful for lab`));
            }
            break;
        case Activity.Skilling:
            if (![1, 2, 3, 7].some(id => (player.cardInfo?.getBonusForId(id) ?? 0) > 0)) {
                alerts.push(new CardSetAlert(player, `${player.cardInfo?.getCardSetText()} isn't useful for skilling`));
            }
            break;
        case Activity.Unknown:
            alerts.push(new DoingNothingAlert(player));
            break;
    }

    // Anvil Alerts
    anvil.playerAnvils[player.playerID].production.forEach(anvilProduct => {
        if (anvilProduct.timeTillCap <= 0) {
            alerts.push(new AnvilAlert(player, `${anvilProduct.displayName} production is at capacity, go collect!`, Item.getImageData(anvilProduct.data.item)))
        }
    })

    if (anvil.playerAnvils[player.playerID].currentlySelect.indexOf(-1) > -1) {
        alerts.push(new AnvilAlert(player, "Unused hammer, losing out on production!",{ location: 'UIquickref1', height: 36, width: 36}))
    }

    // Obol Alerts
    const emptyObolSlots = playerObols.filter(obol => obol.item.internalName == "Blank").length;
    if (emptyObolSlots > 0) {
        alerts.push(new ObolEmptyAlert(player, emptyObolSlots));
    }

    // Worship Alerts
    const playerWorshipInfo = worshipData.playerData[player.playerID];
    if (playerWorshipInfo.currentCharge >= playerWorshipInfo.maxCharge) {
        alerts.push(new WorshipAlert(player));
    }

    return alerts;
}

const getGlobalAlerts = (worship: Worship, refinery: Refinery, players: Player[], traps: Trap[][]): Alert[] => {
    const globalAlerts: Alert[] = [];

    // Worship
    if (worship.totalData.overFlowTime <= 0) {
        globalAlerts.push(new GlobalAlert("Overflowing charge", AlertType.Worship, Skilling.getSkillImageData(SkillsIndex.Worship)))
    }

    // Refinery
    Object.entries(refinery.salts).forEach(([saltName, saltInfo]) => {
        if (saltInfo.progress == saltInfo.getCap()) {
            globalAlerts.push(new GlobalAlert(`${saltName} is ready for rank up.`, AlertType.Refinery, Item.getImageData(saltName)))
        }
        // Fuel is empty math, need storage items logic from the construction page.
        //if (saltInfo.active && saltInfo.getFuelTime())
    })

    // Cooldown alerts
    const cooldownTalentIndexes = [32, 130, 475, 370, 490]
    cooldownTalentIndexes.forEach(cdTalent => {
        const potentialPlayers = players.filter(player => player.talents.find(talent => talent.skillIndex == cdTalent) != undefined);
        const readyPlayers = potentialPlayers.reduce((toPrint, player, index, _) => {
            const talentCooldown = player.getCurrentCooldown(cdTalent);
            if (talentCooldown <= 0) {
                toPrint.push(player.playerName)
            }
            return toPrint;
        }, [] as String[])

        if (readyPlayers.length > 0) {
            const talent = potentialPlayers[0].talents.find(talent => talent.skillIndex == cdTalent);
            globalAlerts.push(new GlobalAlert(`${talent?.name} is ready on ${readyPlayers.join(",")}`, AlertType.CDReady, talent?.getImageData()))
        }
    })

    // Traps
    const readyTraps = traps.flatMap(playerTraps => playerTraps).reduce((sum, trap) => sum += trap.placed && trap.isReady() ? 1 : 0, 0);
    if (readyTraps > 0) {
        globalAlerts.push(new TrapAlerts(readyTraps));
    }

    return globalAlerts;
}

export const updateAlerts = (data: Map<string, any>) => {
    const alerts = new Alerts();
    const players = data.get("players") as Player[];
    const anvil = data.get("anvil") as AnvilWrapper;
    const obols = data.get("obols") as ObolsData;
    const worship = data.get("worship") as Worship;
    const refinery = data.get("refinery") as Refinery;
    const traps = data.get("traps") as Trap[][];


    players.forEach(player => {
        alerts.playerAlerts[player.playerID] = []
        alerts.playerAlerts[player.playerID].push(...getPlayerAlerts(player, anvil, obols.playerObols[player.playerID], worship))
    })

    // Global Alerts
    alerts.generalAlerts = getGlobalAlerts(worship, refinery, players, traps);
    return alerts;
}