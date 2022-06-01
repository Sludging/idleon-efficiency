import { VendorModel } from '../model/vendorModel';
import { VendorsModel } from '../model/vendorsModel';

export class VendorsBase { constructor(public id: string, public data: VendorsModel) { } }



export const initVendorRepo = () => {
    return [    
        new VendorsBase("Blunder Hills", <VendorsModel>{
                "items": [
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "FoodHealth1",
                        "quantity": 750,
                        "no": 1,
                        "purchasePrice": 8
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "FoodHealth3",
                        "quantity": 750,
                        "no": 2,
                        "purchasePrice": 28
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "FoodHealth2",
                        "quantity": 750,
                        "no": 3,
                        "purchasePrice": 80
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "CraftMat3",
                        "quantity": 5000,
                        "no": 4,
                        "purchasePrice": 12
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "FoodPotMana1",
                        "quantity": 500,
                        "no": 5,
                        "purchasePrice": 20
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "FoodPotOr1",
                        "quantity": 400,
                        "no": 6,
                        "purchasePrice": 20
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "FoodPotRe1",
                        "quantity": 400,
                        "no": 7,
                        "purchasePrice": 16
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "FoodPotGr1",
                        "quantity": 400,
                        "no": 8,
                        "purchasePrice": 28
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "OilBarrel1",
                        "quantity": 1000,
                        "no": 9,
                        "purchasePrice": 32
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "StoneW1",
                        "quantity": 3,
                        "no": 10,
                        "purchasePrice": 500
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "StoneA1",
                        "quantity": 6,
                        "no": 11,
                        "purchasePrice": 400
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "StoneT1",
                        "quantity": 4,
                        "no": 12,
                        "purchasePrice": 440
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "EquipmentRings7",
                        "quantity": 1,
                        "no": 13,
                        "purchasePrice": 16000
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "EquipmentStatues1",
                        "quantity": 3,
                        "no": 14,
                        "purchasePrice": 40
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "SmithingHammerChisel",
                        "quantity": 4,
                        "no": 15,
                        "purchasePrice": 3200
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "StampA5",
                        "quantity": 1,
                        "no": 16,
                        "purchasePrice": 1000
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "StampA6",
                        "quantity": 1,
                        "no": 17,
                        "purchasePrice": 3200
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "StampA3",
                        "quantity": 1,
                        "no": 18,
                        "purchasePrice": 10000
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "InvBag104",
                        "quantity": 1,
                        "no": 19,
                        "purchasePrice": 96
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "InvStorage2",
                        "quantity": 1,
                        "no": 20,
                        "purchasePrice": 4000
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "InvStorage6",
                        "quantity": 1,
                        "no": 21,
                        "purchasePrice": 10000
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "InvStorage7",
                        "quantity": 1,
                        "no": 22,
                        "purchasePrice": 22000
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "rtt0",
                        "quantity": 15,
                        "no": 23,
                        "purchasePrice": 200
                    },
                    <VendorModel>{
                        "vendor": "Blunder Hills",
                        "item": "ResetFrag",
                        "quantity": 1,
                        "no": 24,
                        "purchasePrice": 800
                    }
                ]
            }),
        new VendorsBase("Encroaching Forest Villas", <VendorsModel>{
                "items": [
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "FoodHealth3",
                        "quantity": 1000,
                        "no": 1,
                        "purchasePrice": 28
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "FoodHealth2",
                        "quantity": 1000,
                        "no": 2,
                        "purchasePrice": 80
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "FoodHealth5",
                        "quantity": 1000,
                        "no": 3,
                        "purchasePrice": 128
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "FoodPotOr2",
                        "quantity": 500,
                        "no": 4,
                        "purchasePrice": 100
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "FoodPotYe1",
                        "quantity": 500,
                        "no": 5,
                        "purchasePrice": 100
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "StoneA2",
                        "quantity": 6,
                        "no": 6,
                        "purchasePrice": 3400
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "StampA12",
                        "quantity": 1,
                        "no": 7,
                        "purchasePrice": 32000
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "EquipmentPendant12",
                        "quantity": 1,
                        "no": 8,
                        "purchasePrice": 26000
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "Quest37",
                        "quantity": 1,
                        "no": 9,
                        "purchasePrice": 80000
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "InvBag105",
                        "quantity": 2,
                        "no": 10,
                        "purchasePrice": 9996
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "InvStorage8",
                        "quantity": 1,
                        "no": 11,
                        "purchasePrice": 22000
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "InvStorage12",
                        "quantity": 1,
                        "no": 12,
                        "purchasePrice": 28000
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "rtt0",
                        "quantity": 30,
                        "no": 13,
                        "purchasePrice": 200
                    },
                    <VendorModel>{
                        "vendor": "Encroaching Forest Villas",
                        "item": "ResetFrag",
                        "quantity": 1,
                        "no": 14,
                        "purchasePrice": 800
                    }
                ]
            }),
        new VendorsBase("YumYum Grotto", <VendorsModel>{
                "items": [
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "FoodHealth6",
                        "quantity": 25000,
                        "no": 1,
                        "purchasePrice": 192
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "FoodHealth7",
                        "quantity": 25000,
                        "no": 2,
                        "purchasePrice": 320
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "FoodHealth4",
                        "quantity": 25000,
                        "no": 3,
                        "purchasePrice": 480
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "Quest19",
                        "quantity": 10000,
                        "no": 4,
                        "purchasePrice": 14000
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "BobJoePickle",
                        "quantity": 1,
                        "no": 5,
                        "purchasePrice": 160000
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "StoneW2",
                        "quantity": 3,
                        "no": 6,
                        "purchasePrice": 6000
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "StoneA2",
                        "quantity": 6,
                        "no": 7,
                        "purchasePrice": 3400
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "StoneT2",
                        "quantity": 4,
                        "no": 8,
                        "purchasePrice": 5000
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "FoodPotOr2",
                        "quantity": 20000,
                        "no": 9,
                        "purchasePrice": 100
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "FoodPotGr2",
                        "quantity": 20000,
                        "no": 10,
                        "purchasePrice": 240
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "FoodPotRe2",
                        "quantity": 20000,
                        "no": 11,
                        "purchasePrice": 120
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "InvBag106",
                        "quantity": 1,
                        "no": 12,
                        "purchasePrice": 999996
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "InvStorage9",
                        "quantity": 1,
                        "no": 13,
                        "purchasePrice": 35600
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "InvStorage10",
                        "quantity": 1,
                        "no": 14,
                        "purchasePrice": 100000
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "InvStorage13",
                        "quantity": 1,
                        "no": 15,
                        "purchasePrice": 240000
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "InvStorage15",
                        "quantity": 1,
                        "no": 16,
                        "purchasePrice": 400000
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "SmithingHammerChisel2",
                        "quantity": 1,
                        "no": 17,
                        "purchasePrice": 50000
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "rtt0",
                        "quantity": 40,
                        "no": 18,
                        "purchasePrice": 200
                    },
                    <VendorModel>{
                        "vendor": "YumYum Grotto",
                        "item": "ResetFrag",
                        "quantity": 2,
                        "no": 19,
                        "purchasePrice": 800
                    }
                ]
            }),
        new VendorsBase("Faraway Piers", <VendorsModel>{
                "items": [
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "Line1",
                        "quantity": 1,
                        "no": 1,
                        "purchasePrice": 14000
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "Weight1",
                        "quantity": 1,
                        "no": 2,
                        "purchasePrice": 20000
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "Line5",
                        "quantity": 1,
                        "no": 3,
                        "purchasePrice": 30000
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "Weight5",
                        "quantity": 1,
                        "no": 4,
                        "purchasePrice": 40000
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "Weight10",
                        "quantity": 1,
                        "no": 5,
                        "purchasePrice": 70000
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "Line10",
                        "quantity": 1,
                        "no": 6,
                        "purchasePrice": 60000
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "Weight11",
                        "quantity": 1,
                        "no": 7,
                        "purchasePrice": 220000
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "StoneT1",
                        "quantity": 2,
                        "no": 8,
                        "purchasePrice": 440
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "StoneT2",
                        "quantity": 1,
                        "no": 9,
                        "purchasePrice": 5000
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "StampB8",
                        "quantity": 1,
                        "no": 10,
                        "purchasePrice": 26800
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "StampA15",
                        "quantity": 1,
                        "no": 11,
                        "purchasePrice": 48000
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "NPCtoken27",
                        "quantity": 1,
                        "no": 12,
                        "purchasePrice": 620000
                    },
                    <VendorModel>{
                        "vendor": "Faraway Piers",
                        "item": "ResetFrag",
                        "quantity": 1,
                        "no": 13,
                        "purchasePrice": 800
                    }
                ]
            }),
        new VendorsBase("Frostbite Towndra", <VendorsModel>{
                "items": [
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "FoodHealth10",
                        "quantity": 25000,
                        "no": 1,
                        "purchasePrice": 560
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "FoodHealth9",
                        "quantity": 25000,
                        "no": 2,
                        "purchasePrice": 760
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "FoodHealth11",
                        "quantity": 25000,
                        "no": 3,
                        "purchasePrice": 1240
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "TrapBoxSet1",
                        "quantity": 99,
                        "no": 4,
                        "purchasePrice": 20000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "WorshipSkull1",
                        "quantity": 99,
                        "no": 5,
                        "purchasePrice": 20000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "StoneW3",
                        "quantity": 4,
                        "no": 6,
                        "purchasePrice": 100000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "StoneA3",
                        "quantity": 10,
                        "no": 7,
                        "purchasePrice": 60000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "StoneT3",
                        "quantity": 7,
                        "no": 8,
                        "purchasePrice": 80000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "FoodPotOr3",
                        "quantity": 20000,
                        "no": 9,
                        "purchasePrice": 600
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "FoodPotGr3",
                        "quantity": 20000,
                        "no": 10,
                        "purchasePrice": 1600
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "FoodPotRe3",
                        "quantity": 20000,
                        "no": 11,
                        "purchasePrice": 800
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "InvBag107",
                        "quantity": 1,
                        "no": 12,
                        "purchasePrice": 99999996
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "InvStorage16",
                        "quantity": 1,
                        "no": 13,
                        "purchasePrice": 600000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "InvStorage17",
                        "quantity": 1,
                        "no": 14,
                        "purchasePrice": 800000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "InvStorage18",
                        "quantity": 1,
                        "no": 15,
                        "purchasePrice": 1400000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "InvStorage19",
                        "quantity": 1,
                        "no": 16,
                        "purchasePrice": 2000000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "InvStorage20",
                        "quantity": 1,
                        "no": 17,
                        "purchasePrice": 3200000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "InvStorage21",
                        "quantity": 1,
                        "no": 18,
                        "purchasePrice": 5000000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "rtt0",
                        "quantity": 60,
                        "no": 19,
                        "purchasePrice": 200
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "ResetFrag",
                        "quantity": 3,
                        "no": 20,
                        "purchasePrice": 800
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "Quest57",
                        "quantity": 1,
                        "no": 21,
                        "purchasePrice": 2000000000
                    },
                    <VendorModel>{
                        "vendor": "Frostbite Towndra",
                        "item": "Quest67",
                        "quantity": 1,
                        "no": 22,
                        "purchasePrice": 4000000
                    }
                ]
            }),
        new VendorsBase("Outer World Town", <VendorsModel>{
                "items": [
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "Quest65",
                        "quantity": 1,
                        "no": 1,
                        "purchasePrice": 2500000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "Quest66",
                        "quantity": 1,
                        "no": 2,
                        "purchasePrice": 10000000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "FoodHealth13",
                        "quantity": 5000000,
                        "no": 3,
                        "purchasePrice": 6000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "FoodHealth12",
                        "quantity": 5000000,
                        "no": 4,
                        "purchasePrice": 16000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "DNAgun0",
                        "quantity": 10,
                        "no": 5,
                        "purchasePrice": 24000000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "StoneW4",
                        "quantity": 4,
                        "no": 6,
                        "purchasePrice": 2400000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "StoneA4",
                        "quantity": 10,
                        "no": 7,
                        "purchasePrice": 1800000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "StoneT4",
                        "quantity": 7,
                        "no": 8,
                        "purchasePrice": 2200000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "FoodPotOr4",
                        "quantity": 300000,
                        "no": 9,
                        "purchasePrice": 10800
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "FoodPotGr4",
                        "quantity": 300000,
                        "no": 10,
                        "purchasePrice": 32000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "FoodPotRe4",
                        "quantity": 300000,
                        "no": 11,
                        "purchasePrice": 16000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "FoodPotYe4",
                        "quantity": 300000,
                        "no": 12,
                        "purchasePrice": 120000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "InvBag108",
                        "quantity": 1,
                        "no": 13,
                        "purchasePrice": 9999999996
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "StampB41",
                        "quantity": 1,
                        "no": 14,
                        "purchasePrice": 40000000
                    },
                    <VendorModel>{
                        "vendor": "Outer World Town",
                        "item": "StampB38",
                        "quantity": 1,
                        "no": 15,
                        "purchasePrice": 200000000
                    }
                ]
            })    
]
}
