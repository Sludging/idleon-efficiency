import { AnvilWrapper } from "./anvil";
import { ObolsData, Obol } from "./obols";
import { Activity, Player } from "./player";

export enum AlertType {
    CardSet = "Card Set",
    NoActivity = "No Activity",
    Anvil = "Anvil",
    EmptyObolSlot = "Empty Obol Slot"
}

abstract class Alert {
    title: string = "";
    text: string = "";
    constructor(public type: AlertType) { }
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
    }
}

export class AnvilAlert extends PlayerAlert {
    constructor(player: Player, text: string) {
        super(player, AlertType.Anvil);
        this.title = "Anvil issues";
        this.text = text;
    }
}

export class Alerts {
    playerAlerts: Record<number, Alert[]> = {};

    getPlayerAlertsOfType = (playerID: number, alertType: string): Alert[] => {
        return this.playerAlerts[playerID].filter(alert => alert.type == alertType);
    }
}

const getPlayerAlerts = (player: Player, anvil: AnvilWrapper, playerObols: Obol[]): Alert[] => {
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
            alerts.push(new AnvilAlert(player, `${anvilProduct.displayName} production is at capacity, go collect!`))
        }
    })

    if (anvil.playerAnvils[player.playerID].currentlySelect.indexOf(-1) > -1) {
        alerts.push(new AnvilAlert(player, "Unused hammer, losing out on production!"))
    }

    // Obol Alerts
    const emptyObolSlots = playerObols.filter(obol => obol.item.internalName == "Blank").length;
    if (emptyObolSlots > 0) {
        alerts.push(new ObolEmptyAlert(player, emptyObolSlots));
    }

    return alerts;
}

export const updateAlerts = (data: Map<string, any>) => {
    const alerts = new Alerts();
    const players = data.get("players") as Player[];
    const anvil = data.get("anvil") as AnvilWrapper;
    const obols = data.get("obols") as ObolsData;


    players.forEach(player => {
        alerts.playerAlerts[player.playerID] = []
        alerts.playerAlerts[player.playerID].push(...getPlayerAlerts(player, anvil, obols.playerObols[player.playerID]))
    })
    return alerts;
}