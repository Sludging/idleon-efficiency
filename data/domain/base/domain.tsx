import { range } from "../../utility";
import { Cloudsave } from "../cloudsave";
import { Item } from "../items";

const regex = /\{|\[/gm;

const safeJsonParse = <T,>(doc: Cloudsave, key: string, emptyValue: T): T => {
    const data = doc.get(key);
    try {
        if (typeof(data) === "string" && data.match(regex) != null) {
            return JSON.parse(doc.get(key))
        }
        if (data) {
            return data;
        }
    }
    catch (e) {
        console.debug(key, doc.get(key), e)
    }
    return emptyValue;
}

export interface RawData {
    key: string
    default: any
    perPlayer: boolean
}

export abstract class Domain {
    // We only need to initialize once, so once we run init we can mark it as done and skip if we accidently re-render again.
    initialized: boolean = false;

    constructor(public dataKey: string) {}

    getDataKey = (): string => {
        return this.dataKey;
    }

    markInitialized = (): void => {
        this.initialized = true;
    }

    abstract getRawKeys(): RawData[];
    abstract init(allItems: Item[], charCount: number): any;
    abstract parse(data: Map<string, any>): void;
  }

  export const HandleRawDataKey = (raw: RawData, parseData: Map<string, any>, data: Cloudsave, charCount: number) => {
    // If this isn't a key that cares about the number of characters we have
    if (!raw.perPlayer) {
        // Simply parse it and add it to the map.
        parseData.set(raw.key, safeJsonParse(data, raw.key, raw.default))
    } else {
        // Else, for each valid character that we have
        range(0, charCount).forEach((_, playerIndex) => {
            // Get the valid key by adding the player index to the end of the key. 
            // (this is very sensitive to how keys are constructed with adding index in the end, need to do better)
            const playerKey = `${raw.key}${playerIndex}`;
            // Add the player specific key to the map.
            parseData.set(playerKey, safeJsonParse(data, playerKey, raw.default))
        });
    }
  }