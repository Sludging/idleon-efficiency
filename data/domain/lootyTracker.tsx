import { getAllItems, filteredLootyItems, filteredMissingItems } from './items'

export class LootyInfo {
    obtained: [string, string][] = []
    missing: [string, string][] = []
    obtainable: [string, string][] = []

    isLooted = (rawName: string): boolean => {
        return this.obtained.find(([obtainedRaw, _]) => obtainedRaw == rawName) != null;
    }
}

export default function parseLooty(lootedInfo: string[]) {
    const allItems = getAllItems();
    let toReturn = new LootyInfo();
    toReturn.obtainable = Object.entries(allItems).filter(([raw_name, _]) => !filteredLootyItems.includes(raw_name));
    toReturn.obtained = lootedInfo.filter(looted => !filteredLootyItems.includes(looted)).map(looted => [looted, allItems[looted] ?? "Unknown Name"]);
    toReturn.missing = toReturn.obtainable.filter(([rawName, _]) => toReturn.obtained.find(([obtainedRaw, _]) => obtainedRaw == rawName) == undefined && !filteredMissingItems.includes(rawName));

    toReturn.obtainable.sort(([rawName1, displayName1], [rawName2, displayName2]) => rawName1 < rawName2 ? -1 : 1);
    toReturn.obtained.sort(([rawName1, displayName1], [rawName2, displayName2]) => rawName1 < rawName2 ? -1 : 1);
    toReturn.missing.sort(([rawName1, displayName1], [rawName2, displayName2]) => rawName1 < rawName2 ? -1 : 1);

    return toReturn;
}

22