import { MenagerieUnlockModel } from '../model/menagerieUnlockModel';

export class MenagerieUnlockBase { constructor(public index: number, public data: MenagerieUnlockModel) { } }



export const initMenagerieUnlockRepo = () => {
    return [    
        new MenagerieUnlockBase(0, <MenagerieUnlockModel>{
                "index": 0,
                "description": "You can now find the Verisimilitude Artifacts 膛",
                "tooltip": "This is a new Sailing Artifact Tier! It now goes Ancient, Eldritch, Sovereign, Omnipotent, Transcendent, then Verisimilitude!"
            }),
        new MenagerieUnlockBase(1, <MenagerieUnlockModel>{
                "index": 1,
                "description": "Spelunking Caverns get a Shortcut every 50 Depths",
                "tooltip": "Shortcut are for normal mode only, not Manic mode!"
            }),
        new MenagerieUnlockBase(2, <MenagerieUnlockModel>{
                "index": 2,
                "description": "Unlock Singularity Mode for the Coral Kid 膛",
                "tooltip": "The Coral Kid can now turn Divinity PTS into Singularity Spirals for new upgrades! Remember to drop the Fishbowl on him if you haven't already!"
            }),
        new MenagerieUnlockBase(3, <MenagerieUnlockModel>{
                "index": 3,
                "description": "Unlock the Pink Jellyfish within the Menagerie 膛",
                "tooltip": "The Menagerie is located in the Molten Edge map, 15 maps away from town!"
            }),
        new MenagerieUnlockBase(4, <MenagerieUnlockModel>{"index": 4, "description": "New Musselini Upgrades at The Clamworks", "tooltip": ""}),
        new MenagerieUnlockBase(5, <MenagerieUnlockModel>{
                "index": 5,
                "description": "Unlock the Blue Jellyfish within the Menagerie 膛",
                "tooltip": "The Menagerie is located in the Molten Edge map, 15 maps away from town!"
            }),
        new MenagerieUnlockBase(6, <MenagerieUnlockModel>{
                "index": 6,
                "description": "Mobs drop Omega Arcade Balls, 1 in $ chance 膛",
                "tooltip": "Omega Balls SIXTUPLE the bonus of upgrades in the Gold Ball Arcade Shop! You must upgrade to 'Super' first with Cosmic Balls though!"
            }),
        new MenagerieUnlockBase(7, <MenagerieUnlockModel>{
                "index": 7,
                "description": "Unlock the Red Jellyfish within the Menagerie 膛",
                "tooltip": "The Menagerie is located in the Molten Edge map, 15 maps away from town!"
            }),
        new MenagerieUnlockBase(8, <MenagerieUnlockModel>{
                "index": 8,
                "description": "Unlock the Crucible Mode in the Breeding Arena 膛",
                "tooltip": "This is the Hardmode version of the Breeding Arena, with enemies having more HP, dealing more DMG, and giving a NEW set of bonuses!"
            }),
        new MenagerieUnlockBase(9, <MenagerieUnlockModel>{
                "index": 9,
                "description": "Increases Max LV of the 'Pillar' Coral Reef by +3",
                "tooltip": ""
            }),
        new MenagerieUnlockBase(10, <MenagerieUnlockModel>{
                "index": 10,
                "description": "Unlock the Silver Jellyfish within the Menagerie 膛",
                "tooltip": "The Menagerie is located in the Molten Edge map, 15 maps away from town!"
            }),
        new MenagerieUnlockBase(11, <MenagerieUnlockModel>{
                "index": 11,
                "description": "+10 Max Shiny LV in Breeding 膛",
                "tooltip": "Each Shiny LV above 20 is +1 OverLV, which multiply Mob DMG and Shiny LV Up Rate"
            }),
        new MenagerieUnlockBase(12, <MenagerieUnlockModel>{
                "index": 12,
                "description": "Unlock the Yellow Jellyfish within the Menagerie 膛",
                "tooltip": "The Menagerie is located in the Molten Edge map, 15 maps away from town!"
            }),
        new MenagerieUnlockBase(13, <MenagerieUnlockModel>{
                "index": 13,
                "description": "Lv.600+ Sailing Ships become Nightmariners 膛",
                "tooltip": "Each LV of a Nightmariner above 600 boosts the Nightmariner Bonuses, shown in the Top-Left of the Sailing Crew Tab"
            }),
        new MenagerieUnlockBase(14, <MenagerieUnlockModel>{
                "index": 14,
                "description": "Adds 2 new White Legend Talents to Whallamus",
                "tooltip": ""
            }),
        new MenagerieUnlockBase(15, <MenagerieUnlockModel>{
                "index": 15,
                "description": "Never lose Stim from starting Spelunking Delves",
                "tooltip": ""
            }),
        new MenagerieUnlockBase(16, <MenagerieUnlockModel>{
                "index": 16,
                "description": "Adds a new Atom type to the Atom Collider",
                "tooltip": ""
            }),
        new MenagerieUnlockBase(17, <MenagerieUnlockModel>{
                "index": 17,
                "description": "Boosts max Flair LV of Statues to Elegant",
                "tooltip": ""
            }),
        new MenagerieUnlockBase(18, <MenagerieUnlockModel>{
                "index": 18,
                "description": "Doubles the 1st trait for Wizards 膛",
                "tooltip": "During Worship, the first Trait you select for each Wizard counts for DOUBLE, and is shown in gold."
            }),
        new MenagerieUnlockBase(19, <MenagerieUnlockModel>{
                "index": 19,
                "description": "Boost the Max LV of various Legend Talents",
                "tooltip": ""
            }),
        new MenagerieUnlockBase(20, <MenagerieUnlockModel>{"index": 20, "description": "Boost the Max Cooking LV by +10", "tooltip": ""}),
        new MenagerieUnlockBase(21, <MenagerieUnlockModel>{
                "index": 21,
                "description": "Boost the Max Tiny Cog Tier to T11 膛",
                "tooltip": "Each Tier is 2x rarer than the last, making a T11 Tiny Cog about a 1 in 2000 chance!"
            }),
        new MenagerieUnlockBase(22, <MenagerieUnlockModel>{
                "index": 22,
                "description": "Maize and Muffin Sticker Bonuses are now Multi 膛",
                "tooltip": "This means the Laissez Maize and Chocotastic Muffin now give multiplicative bonuses instead of additive!"
            }),
        new MenagerieUnlockBase(23, <MenagerieUnlockModel>{
                "index": 23,
                "description": "Unlock the Green Jellyfish within the Menagerie 膛",
                "tooltip": "The Menagerie is located in the Molten Edge map, 15 maps away from town!"
            }),
        new MenagerieUnlockBase(24, <MenagerieUnlockModel>{
                "index": 24,
                "description": "Adds a new Magnifier to use on Research Observations",
                "tooltip": ""
            })    
]
}
