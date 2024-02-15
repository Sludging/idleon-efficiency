import { SigilModel } from '../model/sigilModel';

export class SigilBase { constructor(public index: number, public data: SigilModel) { } }



export const initSigilRepo = () => {
    return [    
        new SigilBase(0, <SigilModel>{
                "name": "Big Muscle",
                "unlockCost": 2,
                "boostCost": 100,
                "unlockBonus": 10,
                "boostBonus": 20,
                "filler": "filler",
                "desc": "Boosts base STR by +{"
            }),
        new SigilBase(1, <SigilModel>{
                "name": "Pumped Kicks",
                "unlockCost": 3,
                "boostCost": 150,
                "unlockBonus": 10,
                "boostBonus": 20,
                "filler": "filler",
                "desc": "Boosts base AGI by +{"
            }),
        new SigilBase(2, <SigilModel>{
                "name": "Odd Litearture",
                "unlockCost": 5,
                "boostCost": 200,
                "unlockBonus": 10,
                "boostBonus": 20,
                "filler": "filler",
                "desc": "Boosts base WIS by +{"
            }),
        new SigilBase(3, <SigilModel>{
                "name": "Good Fortune",
                "unlockCost": 8,
                "boostCost": 300,
                "unlockBonus": 10,
                "boostBonus": 20,
                "filler": "filler",
                "desc": "Boosts base LUK by +{"
            }),
        new SigilBase(4, <SigilModel>{
                "name": "Plunging Sword",
                "unlockCost": 15,
                "boostCost": 700,
                "unlockBonus": 75,
                "boostBonus": 225,
                "filler": "filler",
                "desc": "Boosts base damage by +{"
            }),
        new SigilBase(5, <SigilModel>{
                "name": "Wizardly Hat",
                "unlockCost": 24,
                "boostCost": 1250,
                "unlockBonus": 10,
                "boostBonus": 20,
                "filler": "filler",
                "desc": "Boosts Mana Regeneration by +{% both inside and outside of dungeon"
            }),
        new SigilBase(6, <SigilModel>{
                "name": "Envelope Pile",
                "unlockCost": 60,
                "boostCost": 2500,
                "unlockBonus": 12,
                "boostBonus": 25,
                "filler": "filler",
                "desc": "Decreases the cost of upgrading stamp MAX LEVELS by -{%"
            }),
        new SigilBase(7, <SigilModel>{
                "name": "Shiny Beacon",
                "unlockCost": 120,
                "boostCost": 4000,
                "unlockBonus": 1,
                "boostBonus": 2,
                "filler": "filler",
                "desc": "The first { monster kills every day will spawn a Crystal Mob"
            }),
        new SigilBase(8, <SigilModel>{
                "name": "Metal Exterior",
                "unlockCost": 250,
                "boostCost": 7000,
                "unlockBonus": 6,
                "boostBonus": 12,
                "filler": "filler",
                "desc": "Boosts defence by nothing. Also gives +{% Class EXP"
            }),
        new SigilBase(9, <SigilModel>{
                "name": "Two Starz",
                "unlockCost": 500,
                "boostCost": 10000,
                "unlockBonus": 10,
                "boostBonus": 25,
                "filler": "filler",
                "desc": "Gives +{ Star Talent points to spend as you wish"
            }),
        new SigilBase(10, <SigilModel>{
                "name": "Pipe Gauge",
                "unlockCost": 700,
                "boostCost": 12000,
                "unlockBonus": 10,
                "boostBonus": 20,
                "filler": "filler",
                "desc": "Increases the speed of refinery cycles by +{%"
            }),
        new SigilBase(11, <SigilModel>{
                "name": "Trove",
                "unlockCost": 1300,
                "boostCost": 14000,
                "unlockBonus": 10,
                "boostBonus": 20,
                "filler": "filler",
                "desc": "Boosts drop rate by +{%"
            }),
        new SigilBase(12, <SigilModel>{
                "name": "Pea Pod",
                "unlockCost": 2100,
                "boostCost": 15000,
                "unlockBonus": 25,
                "boostBonus": 50,
                "filler": "filler",
                "desc": "All sigils charge {% faster than normal"
            }),
        new SigilBase(13, <SigilModel>{
                "name": "Tuft Of Hair",
                "unlockCost": 3000,
                "boostCost": 25000,
                "unlockBonus": 3,
                "boostBonus": 6,
                "filler": "filler",
                "desc": "Boosts movement speed by +{% if under 175%"
            }),
        new SigilBase(14, <SigilModel>{
                "name": "Emoji Veggie",
                "unlockCost": 4500,
                "boostCost": 33000,
                "unlockBonus": 10,
                "boostBonus": 25,
                "filler": "filler",
                "desc": "Boosts the bonus of all golden food by +{%"
            }),
        new SigilBase(15, <SigilModel>{
                "name": "Vip Parchment",
                "unlockCost": 6300,
                "boostCost": 42000,
                "unlockBonus": 10,
                "boostBonus": 25,
                "filler": "filler",
                "desc": "Boosts VIP Membership in the library by +{%"
            }),
        new SigilBase(16, <SigilModel>{
                "name": "Dream Catcher",
                "unlockCost": 7000,
                "boostCost": 50000,
                "unlockBonus": 1,
                "boostBonus": 2,
                "filler": "filler",
                "desc": "Boosts all Skill AFK gain rates by +{%"
            }),
        new SigilBase(17, <SigilModel>{
                "name": "Duster Studs",
                "unlockCost": 8000,
                "boostCost": 60000,
                "unlockBonus": 3,
                "boostBonus": 7,
                "filler": "filler",
                "desc": "Boosts weapon power by +{"
            }),
        new SigilBase(18, <SigilModel>{
                "name": "Garlic Glove",
                "unlockCost": 9000,
                "boostCost": 70000,
                "unlockBonus": 15,
                "boostBonus": 35,
                "filler": "filler",
                "desc": "Decreases the cost of all kitchen upgrades by -{%"
            }),
        new SigilBase(19, <SigilModel>{
                "name": "Lab Tesstube",
                "unlockCost": 12000,
                "boostCost": 80000,
                "unlockBonus": 8,
                "boostBonus": 20,
                "filler": "filler",
                "desc": "Boosts Lab EXP gain by +{%"
            }),
        new SigilBase(20, <SigilModel>{
                "name": "Peculiar Vial",
                "unlockCost": 17000,
                "boostCost": 120000,
                "unlockBonus": 15,
                "boostBonus": 25,
                "filler": "filler",
                "desc": "Boosts the regeneration rate of all alchemy liquids by +{%"
            }),
        new SigilBase(21, <SigilModel>{
                "name": "Loot Pile",
                "unlockCost": 23000,
                "boostCost": 160000,
                "unlockBonus": 10,
                "boostBonus": 20,
                "filler": "filler",
                "desc": "All sailing treasure chests give +{% more treasure!"
            }),
        new SigilBase(22, <SigilModel>{
                "name": "Div Spiral",
                "unlockCost": 26000,
                "boostCost": 200000,
                "unlockBonus": 10,
                "boostBonus": 30,
                "filler": "filler",
                "desc": "Boosts Divinity EXP gain by +{%"
            }),
        new SigilBase(23, <SigilModel>{
                "name": "Cool Coin",
                "unlockCost": 30000,
                "boostCost": 250000,
                "unlockBonus": 20,
                "boostBonus": 50,
                "filler": "filler",
                "desc": "Boosts Jade Coin gain in Sneaking by +{%"
            })    
]
}
