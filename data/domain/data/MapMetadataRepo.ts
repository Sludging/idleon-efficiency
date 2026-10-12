import { MapMetadataModel } from '../model/mapMetadataModel';

export class MapMetadataBase { constructor(public index: number, public data: MapMetadataModel) { } }



export const initMapMetadataRepo = () => {
    return [    
        new MapMetadataBase(0, <MapMetadataModel>{
                "nonAfkScreenDestinations": {
                    "29": 27,
                    "36": 2,
                    "37": 0,
                    "68": 52,
                    "66": 65,
                    "69": 64,
                    "115": 103,
                    "40": 39,
                    "39": 39,
                    "70": 70,
                    "71": 70,
                    "114": 113,
                    "118": 118,
                    "119": 118,
                    "164": 152,
                    "165": 163,
                    "214": 211,
                    "215": 202,
                    "265": 252,
                    "266": 264
                }
            })    
]
}
