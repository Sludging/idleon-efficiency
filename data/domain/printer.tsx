import { Lab } from "./lab";

interface PlayerInfo {
    samples: {item: string, quantity: number}[]
    active: {item: string, quantity: number}[]
    inLab: boolean;
}

export class Printer {
    playerInfo: PlayerInfo[] = [];
}

export default function parsePrinter(rawData: any[], charCount: number) {
    const toReturn = new Printer();
    if (rawData) {
        [...Array(charCount)].forEach((_, playerIndex) => {
            const samples: {item: string, quantity: number}[] = [];
            [...Array(5)].forEach((_, sampleIndex) => {
                samples.push({ item: rawData[5 + (sampleIndex * 2) + (playerIndex * 14)], quantity: rawData[6 + (sampleIndex * 2) + (playerIndex * 14)]})
            })

            const active: {item: string, quantity: number}[] = [];
            [...Array(2)].forEach((_, printerIndex) => {
                active.push({ item: rawData[5 + 10 + (printerIndex * 2) + (playerIndex * 14)], quantity: rawData[6 + 10 + (printerIndex * 2) + (playerIndex * 14)]})
            })

            toReturn.playerInfo.push({ samples: samples, active: active, inLab: false});
        })
    }
    return toReturn;
}

export const updatePrinter = (data: Map<string, any>) => {
    const printer = data.get("printer") as Printer;
    const lab = data.get("lab") as Lab;

    // if double printer
    if (lab.bonuses[1].active) {
        lab.playersInTubes.forEach(player => {
            printer.playerInfo[player.playerID].inLab = true
        })
    }

    return printer;
}