import { number2letter } from "../utility";
import { Domain, RawData } from "./base/domain"
import { EventShopBonusBase, initEventShopBonusRepo } from "./data/EventShopBonusRepo";
import { Item } from "./items";
import { EventShopBonusModel } from "./model/eventShopBonusModel";

export class EventShopBonus {
    owned: boolean = false;

    constructor(public index: number, public data: EventShopBonusModel) {}

    static fromBase(data: EventShopBonusBase[]): EventShopBonus[] {
        return data.map(bonus => new EventShopBonus(bonus.index, bonus.data));
    }
}

export class EventShop extends Domain {
    bonuses: EventShopBonus[] = [];

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        this.bonuses = EventShopBonus.fromBase(initEventShopBonusRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const eventShop = data.get(this.getDataKey()) as EventShop;
        const optionList = data.get("OptLacc");

        const eventShopBonusOwned = (optionList[311] as string) || "";

        eventShop.bonuses.forEach(bonus => {
            const letter = number2letter(bonus.index);
            bonus.owned = eventShopBonusOwned.indexOf(letter) >= 0;
        });
    }

    isBonusOwned(index: number): boolean {
        const bonus = this.bonuses.find(bonus => bonus.index == index);

        if (bonus) {
            return bonus.owned;
        }

        return false;
    }
}