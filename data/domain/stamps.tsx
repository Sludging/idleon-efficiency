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
                const tab_data = stampsMap.get(tab_name);
                const stamp_info = tab_data?.get(key);
                if (stamp_info) {
                    return new Stamp(stamp_info.name.replace("_", " "), stamp_info.rawName, value as number);
                }
            }
        })
    })
    return parsedData;
}