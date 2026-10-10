import { GamingSpeciesModel } from '../model/gamingSpeciesModel';

export class GamingSpeciesBase { constructor(public index: number, public data: GamingSpeciesModel) { } }



export const initGamingSpeciesRepo = () => {
    return [    
        new GamingSpeciesBase(0, <GamingSpeciesModel>{"speciesId": 1, "name": "Sprout", "effectText": undefined}),
        new GamingSpeciesBase(1, <GamingSpeciesModel>{
                "speciesId": 2,
                "name": "Fungi",
                "effectText": "Gives 3x more ₣ when picked, but gives no gaming exp.|Usually, gaming exp is based on ₣ gained"
            }),
        new GamingSpeciesBase(2, <GamingSpeciesModel>{
                "speciesId": 3,
                "name": "Bonsai",
                "effectText": "Gives 4x ₣ per evolution instead of the normal |3x ₣ per evolution that other plants get"
            }),
        new GamingSpeciesBase(3, <GamingSpeciesModel>{
                "speciesId": 4,
                "name": "Cactus",
                "effectText": "Gives growth cycles to surrounding plants within 230 pixels.|The more evolutions the cactus has, the more cycles it gives!"
            }),
        new GamingSpeciesBase(4, <GamingSpeciesModel>{
                "speciesId": 5,
                "name": "Blossom",
                "effectText": "Gives 2x more ₣ when picked, and 5x more gaming exp too."
            }),
        new GamingSpeciesBase(5, <GamingSpeciesModel>{
                "speciesId": 6,
                "name": "Voraci",
                "effectText": "Instantly grows plants, the amount based on Voraci's Evolution.|These plants can be Sprouts, Fungi, Bonsai, Cactus, or Blossoms."
            }),
        new GamingSpeciesBase(6, <GamingSpeciesModel>{
                "speciesId": 7,
                "name": "Berri Bush",
                "effectText": "Gives 7x more ₣ when picked, and 3x more gaming exp too."
            }),
        new GamingSpeciesBase(7, <GamingSpeciesModel>{
                "speciesId": 8,
                "name": "Evergreen",
                "effectText": "Gives up to 100x more ₣ when picked, but the exact|multiplier is random. It could be as low as just 1x ₣."
            }),
        new GamingSpeciesBase(8, <GamingSpeciesModel>{
                "speciesId": 9,
                "name": "Chemical",
                "effectText": "Moves everything in garden ahead in time when picked.|This includes import item cooldowns and growing all plants."
            }),
        new GamingSpeciesBase(9, <GamingSpeciesModel>{
                "speciesId": 10,
                "name": "Royale",
                "effectText": "Has a chance of recovering one of King Rat's 100 missing crowns.|You can't get duplicate crowns, just so you know..."
            })    
]
}
