import { Item, filteredLootyItems, filteredMissingItems } from './items'

export class LootyInfo {
    obtained: Item[] = []
    missing: Item[] = []
    obtainable: Item[] = []

    isLooted = (rawName: string): boolean => {
        return this.obtained.find((item) => item.internalName == rawName) != null;
    }
}

export default function parseLooty(lootedInfo: string[], allItems: Item[]) {
    let toReturn = new LootyInfo();
    toReturn.obtainable = allItems.filter((item) => !filteredLootyItems.includes(item.internalName));
    toReturn.obtained = lootedInfo.filter(looted => !filteredLootyItems.includes(looted)).map(looted => allItems.find((item) => item.internalName == looted) ?? new Item({ internalName: looted, displayName: "Unknown Name"}));
    toReturn.missing = toReturn.obtainable.filter((item) => toReturn.obtained.find((item2) => item.internalName == item2.internalName) == undefined && !filteredMissingItems.includes(item.internalName));

    toReturn.obtainable.sort((item1, item2) => item1.internalName < item2.internalName ? -1 : 1);
    toReturn.obtained.sort((item1, item2) => item1.internalName < item2.internalName ? -1 : 1);
    toReturn.missing.sort((item1, item2) => item1.internalName < item2.internalName ? -1 : 1);

    return toReturn;
}

22