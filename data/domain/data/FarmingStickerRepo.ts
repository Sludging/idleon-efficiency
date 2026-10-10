import { FarmingStickerModel } from '../model/farmingStickerModel';

export class FarmingStickerBase { constructor(public index: number, public data: FarmingStickerModel) { } }



export const initFarmingStickerRepo = () => {
    return [    
        new FarmingStickerBase(0, <FarmingStickerModel>{
                "index": 0,
                "name": "Mega Mongo Sticker",
                "description": "Multiplies Class EXP gain for all of your players by a staggering }x",
                "bonusPerSticker": 10
            }),
        new FarmingStickerBase(1, <FarmingStickerModel>{
                "index": 1,
                "name": "Laissez Maize Sticker",
                "description": "Boosts your Research EXP gain rate by approximately +{%",
                "bonusPerSticker": 5
            }),
        new FarmingStickerBase(2, <FarmingStickerModel>{
                "index": 2,
                "name": "Chocotastic Muffin Sticker",
                "description": "Increases Artifact Find Chance by a measly, almost imperceivable +{%",
                "bonusPerSticker": 15
            }),
        new FarmingStickerBase(3, <FarmingStickerModel>{
                "index": 3,
                "name": "UWU Kawaii Rice Sticker",
                "description": "Multiplies your Bits Gained in Gaming by a whopping }x",
                "bonusPerSticker": 250
            }),
        new FarmingStickerBase(4, <FarmingStickerModel>{
                "index": 4,
                "name": "Sporrious Stalk Sticker",
                "description": "Boost Crop Evolution chance by what some consider a lot, that being }x",
                "bonusPerSticker": 40
            }),
        new FarmingStickerBase(5, <FarmingStickerModel>{
                "index": 5,
                "name": "Glassical Bananical Sticker",
                "description": "Multiplies Megacrop growth chance, AKA your Sticker Find chance, by }x",
                "bonusPerSticker": 30
            }),
        new FarmingStickerBase(6, <FarmingStickerModel>{
                "index": 6,
                "name": "Threepeat Champ Sticker",
                "description": "Multiplies Spelunking POW by }x in an effort to help you defeat Lore bosses!",
                "bonusPerSticker": 60
            })    
]
}
