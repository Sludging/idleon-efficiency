import { ConstellationBase, initConstellationsRepo } from "./data/ConstellationsRepo";
import { ConstellationModel } from "./model/constellationModel";
import { Player } from "./player";

export class Constellation {
    isComplete: boolean = false;
    completedBy: Player[] = []
    
    constructor(public index: number, public data: ConstellationModel) { }

    static fromBase = (data: ConstellationBase[]) => {
        return data.map(constellation => new Constellation(constellation.index, constellation.data))
    }
}

export default function parseConstellations(constellationData: any[][], players: Player[]) {
    const constellations: Constellation[] = Constellation.fromBase(initConstellationsRepo());

    constellations.forEach(constellation => {
        constellation.isComplete = constellationData && constellationData[constellation.index][1] == "1";
        constellation.completedBy = players.filter((player) => constellationData[constellation.index][0].includes(player.getPlayerLetter()));
    })

    return constellations;
}