
export class Trap {
    playerID: number;
    critterName: string;
    timeSincePut: number;
    trapDuration: number;

    constructor(playerID: number, trapArray: Array<any>) {
        this.playerID = playerID;
        this.critterName = trapArray[3];
        this.timeSincePut = trapArray[2];
        this.trapDuration = trapArray[6];
    }

    isReady = () => {
        return this.timeSincePut >= this.trapDuration;
    }
}


export default function parseTraps(allTraps: Array<any>) {
    const parsedData = allTraps.map((playerArray, pIndex) => {
        try {
            const parsedPlayerData: Array<any> = JSON.parse(playerArray);
            const filteredTraps = parsedPlayerData.filter(trapData => trapData[0] != -1);
            return filteredTraps.map(trapData => {
                return new Trap(pIndex, trapData)
            });
        }
        catch {
            return [];
        }
    });
    return parsedData;
}