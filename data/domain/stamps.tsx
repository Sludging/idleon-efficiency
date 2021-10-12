import { stampsMap } from '../maps';

export const stampNameArray = [
    "combat",
    "skills",
    "misc"
]

export class Stamp {
    raw_name: string;
    name: string;
    value: number;
    icon: string;


    constructor(name: string, raw_name: string, value: number) {
        this.raw_name = raw_name;
        this.value = value;
        this.icon = `/icons/assets/data/${raw_name}.png`;
        this.name = name.replace("_", " ");
    }
}


export default function parseStamps(stampsData: Array<any>) {
    const parsedData = stampsData.map((tab, index) => {
        return Object.entries(tab).map(([key, value]) => {
            if (key.toLowerCase() !== "length") {
                const tab_name = stampNameArray[index];
                const tab_data = stampsMap.get(tab_name) || {};
                const tab_as_map = new Map(Object.entries(tab_data).map(([k, v]) => [k, [v.name.replace("_", " "), v.rawName]]));
                return new Stamp(tab_as_map.get(key)[0], tab_as_map.get(key)[1], value as number);
            }
        })
    })
    return parsedData;
}