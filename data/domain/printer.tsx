import { range } from "../utility";
import { Divinity } from "./divinity";
import { Lab } from "./lab";
import { Artifact } from "./sailing/artifacts";

export class Sample {
    inLab: boolean = false;
    harriep: boolean = false;
    artifactBoost: number = 0;
    // Number of slots printing this sample.
    printing: number = 0;

    printingQuantity: number = 0;

    constructor(public item: string, public quantity: number) {}

    getSampleQuantity = (base: boolean = true) => {
        // If we want base amount, or if the sample isn't actively printing. Just return the raw sample number.
        if (base || !this.printing) {
            return this.quantity;
        }

        // Else do math to figure out the boost from lab / harriep.
        let baseQuantity = this.printingQuantity;
        baseQuantity *= this.inLab ? 2 : 1;
        baseQuantity *= this.harriep ? 3 : 1;
        return baseQuantity * (1 + this.artifactBoost / 100);
    }

    isOutdatedPrint = () => {
        return this.printingQuantity < this.quantity;
    }
}

export class PlayerInfo {
    constructor(public samples: Sample[]) {}
}

export class Printer {
    // 2d array of players and their 5 samples.
    samples: Sample[][] = [];

    GetTotalActive = (itemName: string): number => {
        return this.samples.flatMap(sample => sample)
        .filter(sample => sample.item == itemName && sample.printing)
        .reduce((total, sample) => total += sample.getSampleQuantity(false), 0);
    }
}

export default function parsePrinter(rawData: any[], charCount: number) {
    const toReturn = new Printer();
    if (rawData) {
        [...Array(charCount)].forEach((_, playerIndex) => {
            const samples: Sample[] = [];
            range(0, 5).forEach(sampleIndex => {
                samples.push(new Sample(rawData[5 + (sampleIndex * 2) + (playerIndex * 14)], rawData[6 + (sampleIndex * 2) + (playerIndex * 14)]));
            });

            range(0,2).forEach(activeIndex => {
                const printingItem = rawData[5 + 10 + (activeIndex * 2) + (playerIndex * 14)];
                const matchingSample = samples.find(sample => sample.item == printingItem);
                matchingSample!.printingQuantity = rawData[6 + 10 + (activeIndex * 2) + (playerIndex * 14)];
                matchingSample!.printing += 1;
            })

            toReturn.samples[playerIndex] = samples;
        })
    }
    return toReturn;
}

export const updatePrinter = (data: Map<string, any>) => {
    const printer = data.get("printer") as Printer;
    const lab = data.get("lab") as Lab;
    const divinity = data.get("divinity") as Divinity;
    const artifacts = data.get("artifacts") as Artifact[];
    const optLacc = data.get("OptLacc");

    // if double printer
    if (lab.bonuses[1].active) {
        lab.playersInTubes.forEach(player => {
            printer.samples[player.playerID].forEach(sample => sample.inLab = true);
        })
    }

    divinity.gods[3].linkedPlayers.forEach(linkedPlayer => {
        printer.samples[linkedPlayer.playerID].forEach(sample => sample.harriep = true);
    })

    const daysSinceLastPrint = optLacc[125];
    printer.samples.flatMap(player => player).forEach(sample => sample.artifactBoost = artifacts[4].getBonus() * daysSinceLastPrint);

    return printer;
}