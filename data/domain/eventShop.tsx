import { number2letter } from "../utility";
import { Domain, RawData } from "./base/domain"
import { EventShopBonusBase, initEventShopBonusRepo } from "./data/EventShopBonusRepo";
import { ImageData } from "./imageData";
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
    starsOwned: number = 0;

    getStarsImageData(): ImageData {
        return { location: "EventStarCurrency", width: 14, height: 14 };
    }

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
        eventShop.starsOwned = Number(optionList[310] ?? 0);

        const eventShopBonusOwned = (optionList[311] as string) || "";

        eventShop.bonuses.forEach(bonus => {
            const letter = number2letter(bonus.index);
            bonus.owned = eventShopBonusOwned.indexOf(letter) >= 0;
        });
    }

    getRemainingStarCost(): number {
        let total = 0;
        for (const bonus of this.bonuses) {
            if (!bonus.owned) {
                total += bonus.data.price;
            }
        }
        return total;
    }

    isBonusOwned(index: number): boolean {
        const bonus = this.bonuses.find(bonus => bonus.index == index);

        if (bonus) {
            return bonus.owned;
        }

        return false;
    }
}