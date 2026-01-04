import { HoleJarModel } from "../model/holeJarModel";

export class HoleJarInfoBase { constructor(public index: number, public data: HoleJarModel) { } }



export const initHoleJarRepo = () => {
    return [
        new HoleJarInfoBase(0, <HoleJarModel>{
            name: "Simple Jar",
            description: "Contains a random basic rupie"
        }),
        new HoleJarInfoBase(1, <HoleJarModel>{
            name: "Tall Jar",
            description: "Has a {% chance to contain an Opal"
        }),
        new HoleJarInfoBase(2, <HoleJarModel>{
            name: "Ornate Jar",
            description: "Has a {% chance to contain a new collectible"
        }),
        new HoleJarInfoBase(3, <HoleJarModel>{
            name: "Great Jar",
            description: "Contains a random decent rupie"
        }),
        new HoleJarInfoBase(4, <HoleJarModel>{
            name: "Enchanted Jar",
            description: "Has a {% chance to enchant a collectible doubling its bonus"
        }),
        new HoleJarInfoBase(5, <HoleJarModel>{
            name: "Artisan Jar",
            description: "Contains a white rupee"
        }),
        new HoleJarInfoBase(6, <HoleJarModel>{
            name: "Epic Jar",
            description: "Contains a random elegant rupie"
        }),
        new HoleJarInfoBase(7, <HoleJarModel>{
            name: "Gilded Jar",
            description: "Doubles the amount of rupies from the next jar opened"
        }),
        new HoleJarInfoBase(8, <HoleJarModel>{
            name: "Ceremony Jar",
            description: "Contains a dark rupie"
        }),
        new HoleJarInfoBase(9, <HoleJarModel>{
            name: "Heirloom Jar",
            description: "Contains the one and only master rupie"
        }),
    ]
}