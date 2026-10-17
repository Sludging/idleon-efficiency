import { MenagerieMissionModel } from '../model/menagerieMissionModel';

export class MenagerieMissionBase { constructor(public index: number, public data: MenagerieMissionModel) { } }



export const initMenagerieMissionRepo = () => {
    return [    
        new MenagerieMissionBase(0, <MenagerieMissionModel>{
                "index": 0,
                "description": "Reach a Total Account LV of {",
                "label": "Account LV",
                "initialRequirement": 4000,
                "requirementIncrement": 2000
            }),
        new MenagerieMissionBase(1, <MenagerieMissionModel>{
                "index": 1,
                "description": "Reach Sneaking Mastery {",
                "label": "Sneaking Mastery",
                "initialRequirement": 1,
                "requirementIncrement": 1
            }),
        new MenagerieMissionBase(2, <MenagerieMissionModel>{
                "index": 2,
                "description": "Achieve { Total Spelunking Depths",
                "label": "Total Depths, including Manic",
                "initialRequirement": 500,
                "requirementIncrement": 500
            }),
        new MenagerieMissionBase(3, <MenagerieMissionModel>{
                "index": 3,
                "description": "Discover { different Farming Crop types",
                "label": "Crops Discovered",
                "initialRequirement": 200,
                "requirementIncrement": 25
            }),
        new MenagerieMissionBase(4, <MenagerieMissionModel>{
                "index": 4,
                "description": "Achieve { Endless Summoning victories",
                "label": "Victories",
                "initialRequirement": 50,
                "requirementIncrement": 50
            }),
        new MenagerieMissionBase(5, <MenagerieMissionModel>{
                "index": 5,
                "description": "Reach { total Best Waves in Worship",
                "label": "Best Waves",
                "initialRequirement": 500,
                "requirementIncrement": 200
            }),
        new MenagerieMissionBase(6, <MenagerieMissionModel>{
                "index": 6,
                "description": "Reach a God Rank of { in Divinity",
                "label": "God Ranks",
                "initialRequirement": 5,
                "requirementIncrement": 5
            }),
        new MenagerieMissionBase(7, <MenagerieMissionModel>{
                "index": 7,
                "description": "Level up your Turkey Meal to Lv.{",
                "label": "Turkey Meal LVs",
                "initialRequirement": 100,
                "requirementIncrement": 10
            }),
        new MenagerieMissionBase(8, <MenagerieMissionModel>{
                "index": 8,
                "description": "Reach Worker Class Lv.{ in The Clamworks",
                "label": "Worker Class",
                "initialRequirement": 3,
                "requirementIncrement": 1
            }),
        new MenagerieMissionBase(9, <MenagerieMissionModel>{
                "index": 9,
                "description": "Defeat { Mr. Minehead Depth Charge opponents",
                "label": "Minehead wins",
                "initialRequirement": 9,
                "requirementIncrement": 3
            }),
        new MenagerieMissionBase(10, <MenagerieMissionModel>{
                "index": 10,
                "description": "Cook up { different Sushi Types",
                "label": "Sushi Types Cooked",
                "initialRequirement": 40,
                "requirementIncrement": 5
            }),
        new MenagerieMissionBase(11, <MenagerieMissionModel>{
                "index": 11,
                "description": "Remove { obstructions in Jelly Operator",
                "label": "Successful Operations",
                "initialRequirement": 14,
                "requirementIncrement": 4
            }),
        new MenagerieMissionBase(12, <MenagerieMissionModel>{
                "index": 12,
                "description": "Earn { total Opals from The Hole",
                "label": "Opals Earned",
                "initialRequirement": 400,
                "requirementIncrement": 50
            }),
        new MenagerieMissionBase(13, <MenagerieMissionModel>{
                "index": 13,
                "description": "Make { Glimbo Trades",
                "label": "Glimbo Trades",
                "initialRequirement": 1000,
                "requirementIncrement": 200
            }),
        new MenagerieMissionBase(14, <MenagerieMissionModel>{
                "index": 14,
                "description": "Press the giant green Button { times in W7",
                "label": "Button Presses",
                "initialRequirement": 150,
                "requirementIncrement": 25
            }),
        new MenagerieMissionBase(15, <MenagerieMissionModel>{
                "index": 15,
                "description": "Find { Farming Stickers",
                "label": "Farming Stickers",
                "initialRequirement": 80,
                "requirementIncrement": 10
            }),
        new MenagerieMissionBase(16, <MenagerieMissionModel>{
                "index": 16,
                "description": "Achieve a Tome Score of {",
                "label": "Tome Score",
                "initialRequirement": 35000,
                "requirementIncrement": 5000
            }),
        new MenagerieMissionBase(17, <MenagerieMissionModel>{
                "index": 17,
                "description": "Collect { of the Rat King's Crowns in Gaming",
                "label": "Rat King Crowns",
                "initialRequirement": 60,
                "requirementIncrement": 5
            }),
        new MenagerieMissionBase(18, <MenagerieMissionModel>{
                "index": 18,
                "description": "Find { total Artifact findings in Sailing",
                "label": "Artifact Findings",
                "initialRequirement": 210,
                "requirementIncrement": 15
            }),
        new MenagerieMissionBase(19, <MenagerieMissionModel>{
                "index": 19,
                "description": "Find { unique items as shown in The Slab",
                "label": "Slab Items",
                "initialRequirement": 1700,
                "requirementIncrement": 50
            }),
        new MenagerieMissionBase(20, <MenagerieMissionModel>{
                "index": 20,
                "description": "Take a Copper 3d Printer Sample of $",
                "label": "Copper Sample Digits",
                "initialRequirement": 10,
                "requirementIncrement": 2
            }),
        new MenagerieMissionBase(21, <MenagerieMissionModel>{
                "index": 21,
                "description": "Greenstack { different items",
                "label": "Greenstacks",
                "initialRequirement": 250,
                "requirementIncrement": 30
            }),
        new MenagerieMissionBase(22, <MenagerieMissionModel>{
                "index": 22,
                "description": "Reach Showdown { in the Emperors Castle",
                "label": "Emperor Showdown",
                "initialRequirement": 100,
                "requirementIncrement": 25
            }),
        new MenagerieMissionBase(23, <MenagerieMissionModel>{
                "index": 23,
                "description": "Work through { layers across all Resource Caverns",
                "label": "Cavern Layer Removals",
                "initialRequirement": 60,
                "requirementIncrement": 20
            }),
        new MenagerieMissionBase(24, <MenagerieMissionModel>{
                "index": 24,
                "description": "Own at least $ Gaming Bits",
                "label": "Gaming Bits owned",
                "initialRequirement": 80,
                "requirementIncrement": 10
            }),
        new MenagerieMissionBase(25, <MenagerieMissionModel>{
                "index": 25,
                "description": "Collect { Orion's Fractal Megafeathers",
                "label": "Fractal Megafeathers",
                "initialRequirement": 20,
                "requirementIncrement": 5
            }),
        new MenagerieMissionBase(26, <MenagerieMissionModel>{
                "index": 26,
                "description": "Collect { Poppy's Eclectic Megafish",
                "label": "Eclectic Megafish",
                "initialRequirement": 6,
                "requirementIncrement": 3
            }),
        new MenagerieMissionBase(27, <MenagerieMissionModel>{
                "index": 27,
                "description": "Collect { of Bubba's Chromatic Megaflesh",
                "label": "Chromatic Megaflesh",
                "initialRequirement": 1,
                "requirementIncrement": 2
            }),
        new MenagerieMissionBase(28, <MenagerieMissionModel>{
                "index": 28,
                "description": "Achieve a total Palette LV of {",
                "label": "Palette LVs",
                "initialRequirement": 1500,
                "requirementIncrement": 150
            }),
        new MenagerieMissionBase(29, <MenagerieMissionModel>{
                "index": 29,
                "description": "Defeat { Summoning Bosses",
                "label": "Summoning Boss Kills",
                "initialRequirement": 25,
                "requirementIncrement": 5
            }),
        new MenagerieMissionBase(30, <MenagerieMissionModel>{
                "index": 30,
                "description": "Achieve { Deathnote PTS for the Bosses Page",
                "label": "Deathnote Boss PTS",
                "initialRequirement": 25,
                "requirementIncrement": 15
            }),
        new MenagerieMissionBase(31, <MenagerieMissionModel>{
                "index": 31,
                "description": "Achieve a total Sigil LV of {",
                "label": "Sigil LVs",
                "initialRequirement": 80,
                "requirementIncrement": 10
            }),
        new MenagerieMissionBase(32, <MenagerieMissionModel>{
                "index": 32,
                "description": "Achieve { total Killroy Prime kills",
                "label": "total Killroy Prime kills",
                "initialRequirement": 150000,
                "requirementIncrement": 50000
            })    
]
}
