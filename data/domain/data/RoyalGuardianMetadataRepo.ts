import { RoyalGuardianMetadataModel } from '../model/royalGuardianMetadataModel';

export class RoyalGuardianMetadataBase { constructor(public index: number, public data: RoyalGuardianMetadataModel) { } }



export const initRoyalGuardianMetadataRepo = () => {
    return [    
        new RoyalGuardianMetadataBase(0, <RoyalGuardianMetadataModel>{
                "outpostKillRequirementOverrides": {
                    "29": 27,
                    "10": 25000,
                    "14": 500,
                    "16": 1000,
                    "19": 2000,
                    "24": 7500,
                    "26": 20000,
                    "27": 60000,
                    "28": 100000,
                    "17": 5000,
                    "42": 60000,
                    "13": 75000,
                    "30": 125000,
                    "18": 200000,
                    "31": 500000,
                    "6": 8000,
                    "7": 15000,
                    "11": 60000,
                    "12": 250000,
                    "32": 750000,
                    "67": 125000,
                    "73": 250000,
                    "65": 3000000,
                    "61": 1500000,
                    "55": 800000,
                    "54": 250000,
                    "112": 80000000,
                    "113": 120000000,
                    "116": 40000000,
                    "117": 75000000,
                    "120": 100000000,
                    "166": 4000000000
                }
            })    
]
}
