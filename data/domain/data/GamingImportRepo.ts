import { GamingImportModel } from '../model/gamingImportModel';

export class GamingImportBase { constructor(public index: number, public data: GamingImportModel) { } }



export const initGamingImportRepo = () => {
    return [    
        new GamingImportBase(0, <GamingImportModel>{
                "importId": 0,
                "name": "Little Sprinkler",
                "effectText": "Instantly grows sprouts when activated.|Recharges over time.",
                "upgradeBonusText": "Recharges +{% faster",
                "boxId": 0,
                "flavorText": "A small metal sprinkler, and a trusty ally to have in the garden. It's heart is in the right place, but it won't do much if your garden has no space."
            }),
        new GamingImportBase(1, <GamingImportModel>{
                "importId": 1,
                "name": "Dirty Shovel",
                "effectText": "Digs up gold nuggets when activated.|Only the biggest nugget found affects ₣ multi",
                "upgradeBonusText": "+{% big nugget luck",
                "boxId": 1,
                "flavorText": "It may be rusty and old, but this reliable tool can find pure gold! With rumors of a million multiplier nugget, this is sure to come in handy!"
            }),
        new GamingImportBase(2, <GamingImportModel>{
                "importId": 2,
                "name": "Autumn Squirrel",
                "effectText": "Gives all acorns it has found since your last visit.|Acorns are spent in the Acorn Shop",
                "upgradeBonusText": "+{% acorns found",
                "boxId": 2,
                "flavorText": "Everyones favorite garden rodent, other than the King Rat of Olde. This furry fella just cant help but gather all the nuts it can find!"
            }),
        new GamingImportBase(3, <GamingImportModel>{
                "importId": 3,
                "name": "Elegant Seashell",
                "effectText": "Boosts ₣ from plants based on Shell Rank.|Increase Shell Rank when enough plants evolve.",
                "upgradeBonusText": "+{% ₣ per Rank",
                "boxId": 3,
                "flavorText": "The seashell emits a soothing ocean noise. The good vibes stop once you realize that ninja tsunamis will use this as a distraction to sneak up on you."
            }),
        new GamingImportBase(4, <GamingImportModel>{
                "importId": 4,
                "name": "Kitsune Roxie",
                "effectText": "Plants grow 4x faster but all give 3x less ₣|Tap rock to turn this effect ON or OFF",
                "upgradeBonusText": "+{% faster active bonus",
                "boxId": 4,
                "flavorText": "Totally kawaii, totally enjoys sleeping! IMPORTANT: Kitsune Rock cannot be toggled while plants are unpicked."
            }),
        new GamingImportBase(5, <GamingImportModel>{
                "importId": 5,
                "name": "Bog Log",
                "effectText": "Lets you play the Log Minigame, which|awards Instant Progress if you find stars!",
                "upgradeBonusText": "{% chance for free game",
                "boxId": 5,
                "flavorText": "Underneath each log lies either a star, which will give you instant garden growth, or death, which will end your career as a log flipper."
            }),
        new GamingImportBase(6, <GamingImportModel>{
                "importId": 6,
                "name": "POiNG Controller",
                "effectText": "Lets you play POiNG, and adds a new|₣ Multi based on your Highscore",
                "upgradeBonusText": "No bonus. It's all skill.",
                "boxId": 6,
                "flavorText": "Retro technology capable of moving a rectangle into the direct path of a circle, in the hopes that the opposing rectangle wont do it as well."
            }),
        new GamingImportBase(7, <GamingImportModel>{
                "importId": 7,
                "name": "Immortal Snail",
                "effectText": "Every day, the snail will collect mail.|Spend the mail to upgrade the snail.",
                "upgradeBonusText": "+{% chance for 2x daily mail",
                "boxId": 7,
                "flavorText": "This snail will slowly drive you crazy. With each Lv, the snail grows stronger, and thanks to the Snail Sprout Treaty of 1951, your garden does too."
            }),
        new GamingImportBase(8, <GamingImportModel>{
                "importId": 8,
                "name": "King Rat of Olde",
                "effectText": "Boosts ₣ for every Crown found,|and generates King Tokens to spend on upgrades",
                "upgradeBonusText": "+{% chance to find Crowns",
                "boxId": 8,
                "flavorText": "He used to rule the garden... IMPORTANT INFO: Higher evolved Royale Sprouts have higher chances of finding new Crowns!"
            })    
]
}
