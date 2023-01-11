import { AtomColliderModel } from '../model/atomColliderModel';

export class AtomColliderBase { constructor(public index: number, public data: AtomColliderModel) { } }



export const initAtomColliderRepo = () => {
    return [    
        new AtomColliderBase(0, <AtomColliderModel>{
                "name": "Hydrogen - Stamp Decreaser",
                "growthFactor": 1,
                "baseExponent": 1.35,
                "baseCost": 2,
                "bonusPerLv": 1,
                "desc": "Every day you log in, the resource cost to upgrade a stamp's max lv decreases by {% up to a max of 90%. This reduction resets back to 0% when upgrading any stamp max lv."
            }),
        new AtomColliderBase(1, <AtomColliderModel>{
                "name": "Helium - Talent Power Stacker",
                "growthFactor": 0,
                "baseExponent": 10,
                "baseCost": 10,
                "bonusPerLv": 1,
                "desc": "All talents that give more bonus per 'Power of 10 resources you own' will count +{ more powers of 10 than you actually own when giving the bonus."
            }),
        new AtomColliderBase(2, <AtomColliderModel>{
                "name": "Lithium - Bubble Insta Expander",
                "growthFactor": 10,
                "baseExponent": 1.25,
                "baseCost": 25,
                "bonusPerLv": 1,
                "desc": "No Bubble Left Behind bonus now has a 15% chance to level up the lowest bubble out of ALL bubbles, not just the first 15 of each colour. Also, +{% chance to give +1 additional Lv."
            }),
        new AtomColliderBase(3, <AtomColliderModel>{
                "name": "Beryllium - Post Office Penner",
                "growthFactor": 20,
                "baseExponent": 1.26,
                "baseCost": 75,
                "bonusPerLv": 1,
                "desc": "Every day, 1 silver pen from your Post Office will instantly convert into 1 PO Box for all characters. This conversion happens { times per day."
            }),
        new AtomColliderBase(4, <AtomColliderModel>{
                "name": "Boron - Particle Upgrader",
                "growthFactor": 70,
                "baseExponent": 1.37,
                "baseCost": 175,
                "bonusPerLv": 2,
                "desc": "When a bubble has a cost of 100M or more to upgrade, you can instead spend particles. However, you can only do this { times a day, after which the cost will return to resources."
            }),
        new AtomColliderBase(5, <AtomColliderModel>{
                "name": "Carbon - Wizard Maximizer",
                "growthFactor": 250,
                "baseExponent": 1.27,
                "baseCost": 500,
                "bonusPerLv": 2,
                "desc": "All wizard towers in construction get +{ max levels. Also, all wizards get a +2% damage bonus for each wizard tower level above 50 in construction. Total bonus: }% wizard dmg."
            }),
        new AtomColliderBase(6, <AtomColliderModel>{
                "name": "Nitrogen - Construction Trimmer",
                "growthFactor": 500,
                "baseExponent": 1.25,
                "baseCost": 1000,
                "bonusPerLv": 15,
                "desc": "Gold trimmed construction slots give +{% more build rate than before. Also, you now have 1 additional trimmed slot."
            }),
        new AtomColliderBase(7, <AtomColliderModel>{
                "name": "Oxygen - Library Booker",
                "growthFactor": 2000,
                "baseExponent": 1.24,
                "baseCost": 3250,
                "bonusPerLv": 2,
                "desc": "Increases the Checkout Refresh Speed of the Talent Library by +{%. Also, the Minimum Talent LV is increased by +<, and the Maximum Talent LV is increased by +10."
            }),
        new AtomColliderBase(8, <AtomColliderModel>{
                "name": "Fluoride - Void Plate Chef",
                "growthFactor": 12000,
                "baseExponent": 1.23,
                "baseCost": 10000,
                "bonusPerLv": 1,
                "desc": "Multiplies your cooking speed by +{% for every meal at Lv 30+. In other words, every plate with a studded black void plate. Total bonus: >% cooking speed"
            }),
        new AtomColliderBase(9, <AtomColliderModel>{
                "name": "Neon - Damage N' Cheapener",
                "growthFactor": 40000,
                "baseExponent": 1.22,
                "baseCost": 40000,
                "bonusPerLv": 1,
                "desc": "Increases your total damage by +{%. Also, reduces the cost of all atom upgrades by {% too."
            })    
]
}
