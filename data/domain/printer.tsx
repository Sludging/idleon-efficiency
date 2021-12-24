import { Item } from "./items";

interface PlayerInfo {
    samples: {item: string, quantity: number}[]
    active: {item: string, quantity: number}[]
}

export class Printer {
    playerInfo: PlayerInfo[] = [];
}

export default function parsePrinter(rawData: any[], charCount: number) {
    const toReturn = new Printer();
    if (rawData) {
        [...Array(charCount)].forEach((_, playerIndex) => {
            const samples: {item: string, quantity: number}[] = [];
            [...Array(4)].forEach((_, sampleIndex) => {
                samples.push({ item: rawData[5 + (sampleIndex * 2) + (playerIndex * 14)], quantity: rawData[6 + (sampleIndex * 2) + (playerIndex * 14)]})
            })

            const active: {item: string, quantity: number}[] = [];
            [...Array(2)].forEach((_, printerIndex) => {
                active.push({ item: rawData[5 + 10 + (printerIndex * 2) + (playerIndex * 14)], quantity: rawData[6 + 10 + (printerIndex * 2) + (playerIndex * 14)]})
            })

            toReturn.playerInfo.push({ samples: samples, active: active});
        })
    }
    return toReturn;
}