import { BuildingModel } from '../model/buildingModel';
import { ComponentModel } from '../model/componentModel';

export class BuildingBase { constructor(public index: number, public data: BuildingModel) { } }



export const initBuildingRepo = () => {
    return [    
        new BuildingBase(0, <BuildingModel>{
                "name": "3D Printer",
                "description": "Using the new Star Talent (on the 2nd tab of Star Talents), you can collect samples to start printing resources! ",
                "bonus": " $ Player Slots Unlocked",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery1", "quantity": 3}, <ComponentModel>{"item": "Blank", "quantity": 0}],
                "maxLvl": 10,
                "costInc": 1,
                "bonusInc": [1, 30],
                "misc": 10
            }),
        new BuildingBase(1, <BuildingModel>{
                "name": "Talent Book Library",
                "description": "Relive your youth by checking out books, and further relive your youth by never returning them! Instead, use them to boost your talent max levels. ",
                "bonus": " +{% Checkout Refresh Speed",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery1", "quantity": 6}, <ComponentModel>{"item": "Critter1", "quantity": 100}],
                "maxLvl": 101,
                "costInc": 1.18,
                "bonusInc": [5, 30],
                "misc": 201
            }),
        new BuildingBase(2, <BuildingModel>{
                "name": "Death Note",
                "description": "Defeat TONS of monsters to boost your Multikill Rate for each world. Upgrading this tower also boosts your base Multikill Bonus in all worlds. ",
                "bonus": " +{% Multikill Bonus",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery2", "quantity": 10}, <ComponentModel>{"item": "Soul1", "quantity": 200}],
                "maxLvl": 51,
                "costInc": 1.23,
                "bonusInc": [2, 50],
                "misc": 51
            }),
        new BuildingBase(3, <BuildingModel>{
                "name": "Salt Lick",
                "description": "Spend refinery salts and other World 3 Resources in return for bonuses from the hungry blobulytes! ",
                "bonus": " $ Available Upgrades",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery2", "quantity": 20}, <ComponentModel>{"item": "Critter2", "quantity": 60}],
                "maxLvl": 10,
                "costInc": 2,
                "bonusInc": [1, 30],
                "misc": 10
            }),
        new BuildingBase(4, <BuildingModel>{
                "name": "Chest Space",
                "description": "Just gives more Storage Chest slots, straight up. I gotchu dawg, yeh. (Passive Upgrade) ",
                "bonus": " +2 Storage Chest Slots @ +{ more Storage Chest Slots",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery2", "quantity": 25}, <ComponentModel>{"item": "OakTree", "quantity": 500}],
                "maxLvl": 25,
                "costInc": 1.27,
                "bonusInc": [2, 30],
                "misc": 25
            }),
        new BuildingBase(5, <BuildingModel>{
                "name": "Cost Cruncher",
                "description": "Reduces the resource costs of upgrading buildings. Doesn't affect 'building' phase cost (Passive Upgrade) ",
                "bonus": " -10% Resource Cost @ -{% more Resource Cost",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery3", "quantity": 20}, <ComponentModel>{"item": "Bug4", "quantity": 500}],
                "maxLvl": 60,
                "costInc": 1.106,
                "bonusInc": [1, 30],
                "misc": 60
            }),
        new BuildingBase(6, <BuildingModel>{
                "name": "Trapper Drone",
                "description": "Remotely deploy AND collect traps to and from any discovered critter location! Collect-all is based on Hunter's Eagle Eye Talent. ",
                "bonus": " +{% Extra critters from all traps",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery3", "quantity": 30}, <ComponentModel>{"item": "Critter3A", "quantity": 5}],
                "maxLvl": 15,
                "costInc": 1.95,
                "bonusInc": [10, 1],
                "misc": 50
            }),
        new BuildingBase(7, <BuildingModel>{
                "name": "Automation Arm",
                "description": "Automate some of the more tedious actions with the flip of a switch! Let the robots do the dirty work! ",
                "bonus": " +{ Automated System, controlled via @ the Robotic Arm.",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery3", "quantity": 50}, <ComponentModel>{"item": "SnowC2", "quantity": 300}],
                "maxLvl": 5,
                "costInc": 4,
                "bonusInc": [1, 1],
                "misc": 5
            }),
        new BuildingBase(8, <BuildingModel>{
                "name": "Atom Collider",
                "description": "Accelerate enough material to high speeds, and you can create the first physical atoms in this pixellated world! ",
                "bonus": " Upgrade costs for atoms are {% cheaper (Increases every 10 lvs).",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery6", "quantity": 10}, <ComponentModel>{"item": "LavaB2", "quantity": 25}],
                "maxLvl": 200,
                "costInc": 1.14,
                "bonusInc": [0.1, 0.1],
                "misc": 200
            }),
        new BuildingBase(9, <BuildingModel>{
                "name": "Pulse Mage",
                "description": "Zaps a single nearby monster. @ Has fast speed, and low damage. ",
                "bonus": " +{% Damage @ +}% Lower Upgrade Costs in Worship",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery1", "quantity": 2}, <ComponentModel>{"item": "Blank", "quantity": 0}],
                "maxLvl": 50,
                "costInc": 1.365,
                "bonusInc": [15, 1.4],
                "misc": 130
            }),
        new BuildingBase(10, <BuildingModel>{
                "name": "Fireball Lobber",
                "description": "Lobs exploding fireballs. @ Has medium speed, and medium damage. ",
                "bonus": " +{% Damage @ +}% Lower Upgrade Costs in Worship",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery1", "quantity": 4}, <ComponentModel>{"item": "Critter1", "quantity": 50}],
                "maxLvl": 50,
                "costInc": 1.33,
                "bonusInc": [20, 1.5],
                "misc": 130
            }),
        new BuildingBase(11, <BuildingModel>{
                "name": "Boulder Roller",
                "description": "Rolls a boulder forward. @ Has slow speed, and medium damage, but reliably hits multiple enemies. ",
                "bonus": " +{% Damage @ +}% Lower Upgrade Costs in Worship",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery2", "quantity": 4}, <ComponentModel>{"item": "IronBar", "quantity": 30}],
                "maxLvl": 50,
                "costInc": 1.276,
                "bonusInc": [25, 1.6],
                "misc": 130
            }),
        new BuildingBase(12, <BuildingModel>{
                "name": "Frozone Malone",
                "description": "Casts a wave of freezing snow. @ Has slow speed, but can stack it's effect with other Freeze Towers. ",
                "bonus": " +{% Range @ +}% Lower Upgrade Costs in Worship",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery2", "quantity": 7}, <ComponentModel>{"item": "BirchTree", "quantity": 200}],
                "maxLvl": 50,
                "costInc": 1.246,
                "bonusInc": [1.5, 1.6],
                "misc": 130
            }),
        new BuildingBase(13, <BuildingModel>{
                "name": "Stormcaller",
                "description": "Smites enemies with lightning @ Has super slow speed, but high damage. ",
                "bonus": " +{% Damage @ +}% Lower Upgrade Costs in Worship",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery3", "quantity": 5}, <ComponentModel>{"item": "Critter3", "quantity": 200}],
                "maxLvl": 50,
                "costInc": 1.23,
                "bonusInc": [30, 1.7],
                "misc": 130
            }),
        new BuildingBase(14, <BuildingModel>{
                "name": "Party Starter",
                "description": "Confetti! @ Has no function other than its Trait Boosts. ",
                "bonus": " +{% Range @ +}% Lower Upgrade Costs in Worship",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery3", "quantity": 9}, <ComponentModel>{"item": "Bug5", "quantity": 300}],
                "maxLvl": 50,
                "costInc": 1.222,
                "bonusInc": [4, 1.7],
                "misc": 130
            }),
        new BuildingBase(15, <BuildingModel>{
                "name": "Kraken Cosplayer",
                "description": "Summons eyeball defenders. @ Has slow speed, and just keeps monsters away. ",
                "bonus": " +{% Spawn Rate @ +}% Lower Upgrade Costs in Worship",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery4", "quantity": 7}, <ComponentModel>{"item": "Dementia", "quantity": 200}],
                "maxLvl": 50,
                "costInc": 1.22,
                "bonusInc": [3, 1.6],
                "misc": 130
            }),
        new BuildingBase(16, <BuildingModel>{
                "name": "Poisonic Elder",
                "description": "Poisons enemies. @ Has slow speed, but great AoE for hitting large crowds of mobs. ",
                "bonus": " +{% Damage @ +}% Lower Upgrade Costs in Worship",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery5", "quantity": 10}, <ComponentModel>{"item": "GalaxyA1", "quantity": 600}],
                "maxLvl": 50,
                "costInc": 1.21,
                "bonusInc": [15, 1.6],
                "misc": 130
            }),
        new BuildingBase(17, <BuildingModel>{
                "name": "Voidinator",
                "description": "Casts a wave of null and void, removing enemy colours. ",
                "bonus": " +{% Range @ +}% Lower Upgrade Costs in Worship",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery6", "quantity": 20}, <ComponentModel>{"item": "LavaA1", "quantity": 5000}],
                "maxLvl": 50,
                "costInc": 1.4,
                "bonusInc": [0.7, 0.8],
                "misc": 130
            }),
        new BuildingBase(18, <BuildingModel>{
                "name": "Woodular Shrine",
                "description": "This shrine increases the Total Damage of all characters on the same map. Level it up by claiming AFK Gains on the same map. ",
                "bonus": " +{% Level Up Rate",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery1", "quantity": 2}, <ComponentModel>{"item": "Blank", "quantity": 0}],
                "maxLvl": 100,
                "costInc": 1.16,
                "bonusInc": [10, 30],
                "misc": 200
            }),
        new BuildingBase(19, <BuildingModel>{
                "name": "Isaccian Shrine",
                "description": "This shrine increases the Max HP and Total Defence of characters on the same map. Level it up by claiming AFK Gains on the same map. ",
                "bonus": " +{% Level Up Rate",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery1", "quantity": 5}, <ComponentModel>{"item": "Soul1", "quantity": 30}],
                "maxLvl": 100,
                "costInc": 1.15,
                "bonusInc": [10, 30],
                "misc": 200
            }),
        new BuildingBase(20, <BuildingModel>{
                "name": "Crystal Shrine",
                "description": "This shrine increases Shrine Level Up Rate for all other shrines on the same map. Level it up by claiming AFK Gains on the same map. ",
                "bonus": " +{% Level Up Rate",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery2", "quantity": 4}, <ComponentModel>{"item": "GoldBar", "quantity": 25}],
                "maxLvl": 100,
                "costInc": 1.13,
                "bonusInc": [10, 30],
                "misc": 200
            }),
        new BuildingBase(21, <BuildingModel>{
                "name": "Pantheon Shrine",
                "description": "This shrine increases the Carry Capacity of all characters on the same map. Level it up by claiming AFK Gains on the same map. ",
                "bonus": " +{% Level Up Rate",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery2", "quantity": 7}, <ComponentModel>{"item": "JungleTree", "quantity": 300}],
                "maxLvl": 100,
                "costInc": 1.115,
                "bonusInc": [10, 30],
                "misc": 200
            }),
        new BuildingBase(22, <BuildingModel>{
                "name": "Clover Shrine",
                "description": "This shrine increases the Drop Rate of all characters on the same map. Level it up by claiming AFK Gains on the same map. ",
                "bonus": " +{% Level Up Rate",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery3", "quantity": 5}, <ComponentModel>{"item": "Soul3", "quantity": 50}],
                "maxLvl": 100,
                "costInc": 1.11,
                "bonusInc": [10, 30],
                "misc": 200
            }),
        new BuildingBase(23, <BuildingModel>{
                "name": "Summereading Shrine",
                "description": "This shrine increases all EXP gain for all characters on the same map. Level it up by claiming AFK Gains on the same map. ",
                "bonus": " +{% Level Up Rate",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery3", "quantity": 10}, <ComponentModel>{"item": "Bug6", "quantity": 100}],
                "maxLvl": 100,
                "costInc": 1.106,
                "bonusInc": [10, 30],
                "misc": 200
            }),
        new BuildingBase(24, <BuildingModel>{
                "name": "Crescent Shrine",
                "description": "This shrine increases Crystal and Giant Spawn chance, and Active EXP gain, of all characters on the same map. U know how to lvl it up lol. ",
                "bonus": " +{% Level Up Rate",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery4", "quantity": 12}, <ComponentModel>{"item": "Void", "quantity": 200}],
                "maxLvl": 100,
                "costInc": 1.106,
                "bonusInc": [10, 30],
                "misc": 200
            }),
        new BuildingBase(25, <BuildingModel>{
                "name": "Undead Shrine",
                "description": "This shrine increases the Respawn rate of all monsters on the same map. ",
                "bonus": " +{% Level Up Rate",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery5", "quantity": 14}, <ComponentModel>{"item": "Tree7", "quantity": 350}],
                "maxLvl": 100,
                "costInc": 1.1,
                "bonusInc": [10, 30],
                "misc": 200
            }),
        new BuildingBase(26, <BuildingModel>{
                "name": "Primordial Shrine",
                "description": "This shrine increases the AFK Gain Rate of all characters on the same map, but only if you have less than 150%. ",
                "bonus": " +{% Level Up Rate",
                "lvlUpReq": [<ComponentModel>{"item": "Refinery6", "quantity": 10}, <ComponentModel>{"item": "SnowC4a", "quantity": 1}],
                "maxLvl": 100,
                "costInc": 1.09,
                "bonusInc": [10, 30],
                "misc": 200
            })    
]
}
