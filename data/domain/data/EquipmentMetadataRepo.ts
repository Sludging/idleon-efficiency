import { EquipmentMetadataModel } from '../model/equipmentMetadataModel';

export class EquipmentMetadataBase { constructor(public index: number, public data: EquipmentMetadataModel) { } }



export const initEquipmentMetadataRepo = () => {
    return [    
        new EquipmentMetadataBase(0, <EquipmentMetadataModel>{
                "powerSuffixes": [
                    "Mining",
                    "Choppin",
                    "Fishing",
                    "Catching",
                    "Trapping",
                    "Worship",
                    "Dung"
                ],
                "equipmentTypeRequirements": [
                    [
                        "aHelmet",
                        "aWeapon",
                        "aShirt",
                        "aPendant",
                        "aPants",
                        "aRing",
                        "aShoes",
                        "aRing",
                        "aHelmetMTX",
                        "aKeychain",
                        "aTrophy",
                        "aKeychain",
                        "aCape",
                        "aChatRingMTX",
                        "aNametag",
                        "aGown"
                    ],
                    [
                        "aPick",
                        "aHatchet",
                        "aFishingRod",
                        "aBugNet",
                        "aTrap",
                        "aSkull",
                        "aDNAgun",
                        "8"
                    ],
                    [
                        "cFood",
                        "cFood",
                        "cFood",
                        "cFood",
                        "cFood",
                        "cFood",
                        "cFood",
                        "cFood"
                    ]
                ],
                "equipmentTypeGroups": [
                    [
                        "aHelmet",
                        "aShirt",
                        "aPants",
                        "aShoes",
                        "aPendant",
                        "aRing"
                    ],
                    [
                        "aPick",
                        "aHatchet",
                        "aFishingRod",
                        "aBugNet",
                        "aTrap",
                        "aSkull",
                        "aDNAgun"
                    ],
                    [
                        "aHelmet",
                        "aShirt",
                        "aPants",
                        "aShoes",
                        "aPendant",
                        "aRing",
                        "aWeapon",
                        "aPick",
                        "aHatchet",
                        "aObol"
                    ]
                ],
                "speedNames": [
                    "IMMOBILE",
                    "MOLASSES",
                    "SLUGGISH",
                    "SLOWER",
                    "SLOW",
                    "MEDIUM",
                    "QUICK",
                    "FAST",
                    "FASTER",
                    "TURBO",
                    "SUPERSONIC",
                    "WARPSPEED"
                ]
            })    
]
}
