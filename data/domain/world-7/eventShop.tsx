import { letterToNumber, number2letter, number2letterArray } from "../../utility";
import { Domain, RawData } from "../base/domain"
import { Item } from "../items";

export class EventShopBonus {
    owned: boolean = false;

    constructor(public index: number) {}
}

export class EventShop extends Domain {
    bonuses: EventShopBonus[] = [];

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        number2letterArray.forEach(char => {
            this.bonuses.push(new EventShopBonus(letterToNumber(char)));
        });
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

    isBonusOwned(index: number) {
        const bonus = this.bonuses.find(bonus => bonus.index == index);

        if (bonus) {
            return bonus.owned;
        }

        return false;
    }
}