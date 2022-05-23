import { ImageData } from "./imageData";

interface SigilData {
    name: string
    unlockCost: number
    boostCost: number
    unlockBonus: number
    boostBonus: number
    filler: string
    desc: string
    index: number
}

export class Sigil {
    data: SigilData

    progress: number = 0

    constructor(data: SigilData) {
        this.data = data;
    }

    getImageData = (): ImageData => {

        return {
            location: `aSiga${this.data.index}`,
            width: 36,
            height: 36
        }
    }
}

const sigilInit = () => {
    return [
        new Sigil({ "name": "Big Muscle", "unlockCost": 2, "boostCost": 100, "unlockBonus": 10, "boostBonus": 20, "filler": "filler", "desc": "Boosts base STR by +{", "index": 0 }),
        new Sigil({ "name": "Pumped Kicks", "unlockCost": 3, "boostCost": 150, "unlockBonus": 10, "boostBonus": 20, "filler": "filler", "desc": "Boosts base AGI by +{", "index": 1 }),
        new Sigil({ "name": "Odd Litearture", "unlockCost": 5, "boostCost": 200, "unlockBonus": 10, "boostBonus": 20, "filler": "filler", "desc": "Boosts base WIS by +{", "index": 2 }),
        new Sigil({ "name": "Good Fortune", "unlockCost": 8, "boostCost": 300, "unlockBonus": 10, "boostBonus": 20, "filler": "filler", "desc": "Boosts base LUK by +{", "index": 3 }),
        new Sigil({ "name": "Plunging Sword", "unlockCost": 15, "boostCost": 700, "unlockBonus": 75, "boostBonus": 225, "filler": "filler", "desc": "Boosts base damage by +{", "index": 4 }),
        new Sigil({ "name": "Wizardly Hat", "unlockCost": 24, "boostCost": 1250, "unlockBonus": 10, "boostBonus": 20, "filler": "filler", "desc": "Boosts Mana Regeneration by +{% both inside and outside of dungeon", "index": 5 }),
        new Sigil({ "name": "Envelope Pile", "unlockCost": 60, "boostCost": 2500, "unlockBonus": 12, "boostBonus": 25, "filler": "filler", "desc": "Decreases the cost of upgrading stamp MAX LEVELS by -{%", "index": 6 }),
        new Sigil({ "name": "Shiny Beacon", "unlockCost": 120, "boostCost": 4000, "unlockBonus": 1, "boostBonus": 2, "filler": "filler", "desc": "The first { monster kills every day will spawn a Crystal Mob", "index": 7 }),
        new Sigil({ "name": "Metal Exterior", "unlockCost": 250, "boostCost": 7000, "unlockBonus": 6, "boostBonus": 12, "filler": "filler", "desc": "Boosts defence by nothing. Also gives +{% Class EXP", "index": 8 }),
        new Sigil({ "name": "Two Starz", "unlockCost": 500, "boostCost": 10000, "unlockBonus": 10, "boostBonus": 25, "filler": "filler", "desc": "Gives +{ Star Talent points to spend as you wish", "index": 9 }),
        new Sigil({ "name": "Pipe Gauge", "unlockCost": 700, "boostCost": 12000, "unlockBonus": 10, "boostBonus": 20, "filler": "filler", "desc": "Increases the speed of refinery cycles by +{%", "index": 10 }),
        new Sigil({ "name": "Trove", "unlockCost": 1300, "boostCost": 14000, "unlockBonus": 10, "boostBonus": 20, "filler": "filler", "desc": "Boosts drop rate by +{%", "index": 11 }),
        new Sigil({ "name": "Pea Pod", "unlockCost": 2100, "boostCost": 15000, "unlockBonus": 25, "boostBonus": 50, "filler": "filler", "desc": "All sigils charge {% faster than normal", "index": 12 }),
        new Sigil({ "name": "Tuft Of Hair", "unlockCost": 3000, "boostCost": 25000, "unlockBonus": 3, "boostBonus": 6, "filler": "filler", "desc": "Boosts movement speed by +{% if under 175%", "index": 13 }),
        new Sigil({ "name": "Emoji Veggie", "unlockCost": 4500, "boostCost": 33000, "unlockBonus": 10, "boostBonus": 25, "filler": "filler", "desc": "Boosts the bonus of all golden food by +{%", "index": 14 }),
        new Sigil({ "name": "Vip Parchment", "unlockCost": 6300, "boostCost": 42000, "unlockBonus": 10, "boostBonus": 25, "filler": "filler", "desc": "Boosts VIP Membership in the library by +{%", "index": 15 }),
        new Sigil({ "name": "Dream Catcher", "unlockCost": 7000, "boostCost": 50000, "unlockBonus": 1, "boostBonus": 2, "filler": "filler", "desc": "Boosts all Skill AFK gain rates by +{%", "index": 16 }),
        new Sigil({ "name": "Duster Studs", "unlockCost": 8000, "boostCost": 60000, "unlockBonus": 3, "boostBonus": 7, "filler": "filler", "desc": "Boosts weapon power by +{", "index": 17 }),
        new Sigil({ "name": "Garlic Glove", "unlockCost": 9000, "boostCost": 70000, "unlockBonus": 15, "boostBonus": 35, "filler": "filler", "desc": "Decreases the cost of all kitchen upgrades by -{%", "index": 18 }),
        new Sigil({ "name": "Lab Tesstube", "unlockCost": 12000, "boostCost": 80000, "unlockBonus": 8, "boostBonus": 20, "filler": "filler", "desc": "Boosts Lab EXP gain by +{%", "index": 19 }),
        new Sigil({ "name": "Peculiar Vial", "unlockCost": 17000, "boostCost": 120000, "unlockBonus": 15, "boostBonus": 25, "filler": "filler", "desc": "Boosts the regeneration rate of all alchemy liquids by +{%", "index": 20 }),
        new Sigil({ "name": "World 5a", "unlockCost": 23000, "boostCost": 160000, "unlockBonus": 10, "boostBonus": 25, "filler": "filler", "desc": "This bonus will affect world 5. Feel free to lv it up early!", "index": 21 }),
        new Sigil({ "name": "World 5d", "unlockCost": 26000, "boostCost": 200000, "unlockBonus": 10, "boostBonus": 25, "filler": "filler", "desc": "This bonus will affect world 5. Feel free to lv it up early!", "index": 22 }),
        new Sigil({ "name": "World 5c", "unlockCost": 30000, "boostCost": 250000, "unlockBonus": 10, "boostBonus": 25, "filler": "filler", "desc": "This bonus will affect world 5. Feel free to lv it up early!", "index": 23 }),
    ];
}


export class Sigils {
    sigils: Sigil[] = sigilInit();
}

export default function parseSigils(cauldronP2w: number[][]) {
    const sigils = new Sigils();

    sigils.sigils.forEach(sigil => {
        sigil.progress = cauldronP2w[4][2 * sigil.data.index]
    })

    return sigils;
}