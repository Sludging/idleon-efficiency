import { cauldronMapping } from '../processed-maps';

const cauldronsIndexMapping = ["power", "quicc", "high-iq", 'kazam'];
const cauldronsTextMapping = ["O", "G", "P", 'Y'];

export class Bubble {
    name: string;
    icon: string;
    level: number;
    class_name: string;

    constructor(name: string, icon_prefix: string, bubble_number: string, level: number) {
        this.level = level;
        this.class_name = `alchemy-aUpgrades${icon_prefix}${bubble_number}`;
        this.icon = `/icons/assets/data/aUpgrades${icon_prefix}${bubble_number}.png`;
        this.name = name.replace(/_/g, " ");
    }
}

export class Cauldron {
    name: string;
    short_name: string;
    bubbles: Array<Bubble> = [];

    constructor(name: string, short_name: string) {
        this.name = name;
        this.short_name = short_name;
    }
}

export class Vial {
    name: string;
    icon: string;
    level: number;

    constructor(name: string, icon_prefix: string, vialNumber: string, level: number) {
        this.level = level;
        this.icon = `/icons/assets/data/aUpgrades${icon_prefix}${vialNumber}.png`;
        this.name = name.replace(/_/g, " ");
    }
}

export class Alchemy {
    cauldrons: Array<Cauldron> = [];
    vials: Array<Vial> = [];
}

export default function parseAlchemy(cauldronData: Array<Map<string, number>>) {
    const finalData = new Alchemy();
    cauldronData.forEach((rawData, index) => {
        if (index < 4) {
            let cauldron = new Cauldron(cauldronsIndexMapping[index], cauldronsTextMapping[index]);
            const bubbleNames = new Map(Object.entries(cauldronMapping.get(cauldronsIndexMapping[index])));
            Object.entries(rawData).forEach(([bubble_number, level], _) => {
                if (bubble_number !== "length" && bubbleNames?.get(bubble_number)) {
                    const bubble = new Bubble(bubbleNames?.get(bubble_number), cauldron.short_name, bubble_number, level);
                    cauldron.bubbles.push(bubble);
                }
            });
            finalData.cauldrons.push(cauldron);
        }
    })
    return finalData;
}