import { JellyOperatorUpgradeModel } from '../model/jellyOperatorUpgradeModel';

export class JellyOperatorUpgradeBase { constructor(public index: number, public data: JellyOperatorUpgradeModel) { } }



export const initJellyOperatorUpgradeRepo = () => {
    return [    
        new JellyOperatorUpgradeBase(0, <JellyOperatorUpgradeModel>{
                "index": 0,
                "displayIndex": 0,
                "name": "Amoeba Cell Cultivation",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Unlock the Amoeba Cell! Drag it from the Petri Dish onto any Jelly Slot, and it'll automatically attack during the Operation! @ Its passive effect of +10% Cell DMG affects all cells!"
            }),
        new JellyOperatorUpgradeBase(1, <JellyOperatorUpgradeModel>{
                "index": 1,
                "displayIndex": 3,
                "name": "Plasmid Cell Cultivation",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 2,
                "description": "Unlock the Plasmid Cell! It's bigger than the Amoeba, but has better stats and a different Passive Effect, which boosts all Cell SPD by +15%"
            }),
        new JellyOperatorUpgradeBase(2, <JellyOperatorUpgradeModel>{
                "index": 2,
                "displayIndex": 8,
                "name": "Ribosome Cell Cultivation",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 3,
                "description": "Unlock the Ribosome Cell! Tall, slender, with a massive +50% all Cell DMG passive effect!"
            }),
        new JellyOperatorUpgradeBase(3, <JellyOperatorUpgradeModel>{
                "index": 3,
                "displayIndex": 14,
                "name": "Organelle Cell Cultivation",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 1.3,
                "description": "Unlock the Organelle Cell! This oddly shaped unit multiplies the attack SPD of all nearby cells it touches by 1.50x, not to mention its passive effect of +25% all Cell SPD!"
            }),
        new JellyOperatorUpgradeBase(4, <JellyOperatorUpgradeModel>{
                "index": 4,
                "displayIndex": 20,
                "name": "Immunoid Cell Cultivation",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 5,
                "description": "Unlock the Immunoid Cell! It takes aggro during Critical Condition, while also inflicting a stun effect on the obstruction, delaying its next attack further!"
            }),
        new JellyOperatorUpgradeBase(5, <JellyOperatorUpgradeModel>{
                "index": 5,
                "displayIndex": 25,
                "name": "Virus Cell Cultivation",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 20,
                "description": "Unlock the Virus Cell! These infect every slot of nearby cells, with each infected slot multiplying all unit damage by 1.10x"
            }),
        new JellyOperatorUpgradeBase(6, <JellyOperatorUpgradeModel>{
                "index": 6,
                "displayIndex": 30,
                "name": "Mitochondria Cell Cultivation",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 30,
                "description": "Unlock the Mitochondria Cell! Their passive effect is a massive 1.50x all Cell SPD multiplier!"
            }),
        new JellyOperatorUpgradeBase(7, <JellyOperatorUpgradeModel>{
                "index": 7,
                "displayIndex": 34,
                "name": "Gigacyst Cell Cultivation",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 50,
                "description": "Unlock the Gigacyst Cell! Their passive effect is a gigantic 3x all Cell DMG multiplier!"
            }),
        new JellyOperatorUpgradeBase(8, <JellyOperatorUpgradeModel>{
                "index": 8,
                "displayIndex": 6,
                "name": "Another Unlock",
                "maxLevel": 25,
                "costExponent": 11.5,
                "bonusPerLevel": 1,
                "costMultiplier": 7,
                "description": "Gives you +1 more 'slot unlocks' to use!"
            }),
        new JellyOperatorUpgradeBase(9, <JellyOperatorUpgradeModel>{
                "index": 9,
                "displayIndex": 5,
                "name": "Slot Unlocking",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "You can now unlock more slots to place Cells in! @ You currently have $ slot unlocks left, use them wisely!"
            }),
        new JellyOperatorUpgradeBase(10, <JellyOperatorUpgradeModel>{
                "index": 10,
                "displayIndex": 12,
                "name": "Cell Biology",
                "maxLevel": 9999,
                "costExponent": 1.21,
                "bonusPerLevel": 20,
                "costMultiplier": 0,
                "description": "Cells now gain +$ EXP every time they attack! @ Each LV boosts that cell's damage permanently by 1.01x @ Also this upgrade gives +{% Cell EXP gain, why not right?"
            }),
        new JellyOperatorUpgradeBase(11, <JellyOperatorUpgradeModel>{
                "index": 11,
                "displayIndex": 38,
                "name": "Cell Evolution",
                "maxLevel": 9999,
                "costExponent": 1.65,
                "bonusPerLevel": 10,
                "costMultiplier": 0,
                "description": "Multiply the EXP gain for all cells by }x when dealing damage!"
            }),
        new JellyOperatorUpgradeBase(12, <JellyOperatorUpgradeModel>{
                "index": 12,
                "displayIndex": 9,
                "name": "DPS Biometrics",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 1.5,
                "description": "Adds the DPS Biometer! Get a permanent multiplier to Bloodcell gain based on your best ever DPS!"
            }),
        new JellyOperatorUpgradeBase(13, <JellyOperatorUpgradeModel>{
                "index": 13,
                "displayIndex": 31,
                "name": "Proximity Stimulus",
                "maxLevel": 5,
                "costExponent": 2000,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "During the Operation, cells whose core are in any slot next to the obstruction deal }x DMG and SPD. This is designated by the green symbol!"
            }),
        new JellyOperatorUpgradeBase(14, <JellyOperatorUpgradeModel>{
                "index": 14,
                "displayIndex": 21,
                "name": "Cells of Three, Better They Be!",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Every 3rd, 6th, 9th, 12th, etc, of a specific cell type placed in the Jelly gives 2x more passive effect than normal! @ For example, the 3rd Amoeba gives +20% not +10% DMG!"
            }),
        new JellyOperatorUpgradeBase(15, <JellyOperatorUpgradeModel>{
                "index": 15,
                "displayIndex": 26,
                "name": "Viral Injection",
                "maxLevel": 4,
                "costExponent": 10000,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Increases the total number of Virus Cells you can place in the Jelly, letting you place up to $"
            }),
        new JellyOperatorUpgradeBase(16, <JellyOperatorUpgradeModel>{
                "index": 16,
                "displayIndex": 18,
                "name": "Feverizer",
                "maxLevel": 6,
                "costExponent": 250,
                "bonusPerLevel": 1,
                "costMultiplier": 0.04,
                "description": "Unlock the Fever Inducer tool, allowing you to freely select from { different effects which last for the whole Operation!"
            }),
        new JellyOperatorUpgradeBase(17, <JellyOperatorUpgradeModel>{
                "index": 17,
                "displayIndex": 15,
                "name": "Cell Mutilation",
                "maxLevel": 20,
                "costExponent": 40,
                "bonusPerLevel": 1,
                "costMultiplier": 0.2,
                "description": "Cells now get a +$% DMG multi per Cell LV!"
            }),
        new JellyOperatorUpgradeBase(18, <JellyOperatorUpgradeModel>{
                "index": 18,
                "displayIndex": 4,
                "name": "Cell Destruction I",
                "maxLevel": 9999,
                "costExponent": 1.15,
                "bonusPerLevel": 5,
                "costMultiplier": 0,
                "description": "Boost the damage of all Cells by +{% during the Operation"
            }),
        new JellyOperatorUpgradeBase(19, <JellyOperatorUpgradeModel>{
                "index": 19,
                "displayIndex": 10,
                "name": "Cell Destruction II",
                "maxLevel": 9999,
                "costExponent": 1.22,
                "bonusPerLevel": 10,
                "costMultiplier": 0,
                "description": "Boost the damage of all Cells by an extra +{% during the Operation"
            }),
        new JellyOperatorUpgradeBase(20, <JellyOperatorUpgradeModel>{
                "index": 20,
                "displayIndex": 22,
                "name": "Cell Destruction III",
                "maxLevel": 9999,
                "costExponent": 1.51,
                "bonusPerLevel": 25,
                "costMultiplier": 0,
                "description": "Boost the damage of all Cells by a further +{% during the Operation"
            }),
        new JellyOperatorUpgradeBase(21, <JellyOperatorUpgradeModel>{
                "index": 21,
                "displayIndex": 28,
                "name": "Cell Desolation I",
                "maxLevel": 9999,
                "costExponent": 1.35,
                "bonusPerLevel": 3,
                "costMultiplier": 0,
                "description": "Multiply the damage of all Cells by }x during the Operation"
            }),
        new JellyOperatorUpgradeBase(22, <JellyOperatorUpgradeModel>{
                "index": 22,
                "displayIndex": 36,
                "name": "Cell Desolation II",
                "maxLevel": 9999,
                "costExponent": 2.1,
                "bonusPerLevel": 15,
                "costMultiplier": 0,
                "description": "Multiply the damage of all Cells by }x during the Operation"
            }),
        new JellyOperatorUpgradeBase(23, <JellyOperatorUpgradeModel>{
                "index": 23,
                "displayIndex": 1,
                "name": "Bloodcell Coagulation",
                "maxLevel": 9999,
                "costExponent": 1.1,
                "bonusPerLevel": 5,
                "costMultiplier": 0,
                "description": "You now get +$ Bloodcells every 1 DMG dealt! @ This is currency, spend them on upgrades! @ This upgrade gives +{% Bloodcell Gain."
            }),
        new JellyOperatorUpgradeBase(24, <JellyOperatorUpgradeModel>{
                "index": 24,
                "displayIndex": 7,
                "name": "Bloodletting I",
                "maxLevel": 9999,
                "costExponent": 1.15,
                "bonusPerLevel": 10,
                "costMultiplier": 0,
                "description": "Earn +{% more Bloodcells during the Operation"
            }),
        new JellyOperatorUpgradeBase(25, <JellyOperatorUpgradeModel>{
                "index": 25,
                "displayIndex": 19,
                "name": "Bloodletting II",
                "maxLevel": 9999,
                "costExponent": 1.32,
                "bonusPerLevel": 25,
                "costMultiplier": 0,
                "description": "Earn an extra +{% more Bloodcells during the Operation"
            }),
        new JellyOperatorUpgradeBase(26, <JellyOperatorUpgradeModel>{
                "index": 26,
                "displayIndex": 37,
                "name": "Blood Tribunal I",
                "maxLevel": 9999,
                "costExponent": 1.4,
                "bonusPerLevel": 3,
                "costMultiplier": 0,
                "description": "Multiply all Bloodcells gained during the Operation by }x"
            }),
        new JellyOperatorUpgradeBase(27, <JellyOperatorUpgradeModel>{
                "index": 27,
                "displayIndex": 29,
                "name": "Blood Tribunal II",
                "maxLevel": 9999,
                "costExponent": 1.85,
                "bonusPerLevel": 5,
                "costMultiplier": 0,
                "description": "Multiply all Bloodcells gained during the Operation by }x"
            }),
        new JellyOperatorUpgradeBase(28, <JellyOperatorUpgradeModel>{
                "index": 28,
                "displayIndex": 16,
                "name": "Immuno Weakening",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Each individual hit from Amoeba Cell attacks weakens the obstruction, increasing all DMG by 1.01x for the rest of the operation! This is shown in the top-left."
            }),
        new JellyOperatorUpgradeBase(29, <JellyOperatorUpgradeModel>{
                "index": 29,
                "displayIndex": 23,
                "name": "Stronkroid",
                "maxLevel": 150,
                "costExponent": 1.3,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Unlock the Steroid button! When pressed during the Operation, all cells attack $x faster for 5 seconds"
            }),
        new JellyOperatorUpgradeBase(30, <JellyOperatorUpgradeModel>{
                "index": 30,
                "displayIndex": 32,
                "name": "Cell Adaptation I",
                "maxLevel": 9999,
                "costExponent": 1.12,
                "bonusPerLevel": 3,
                "costMultiplier": 0,
                "description": "Boost the EXP gain of all cells by +{% when dealing damage"
            }),
        new JellyOperatorUpgradeBase(31, <JellyOperatorUpgradeModel>{
                "index": 31,
                "displayIndex": 24,
                "name": "Cell Adaptation II",
                "maxLevel": 9999,
                "costExponent": 1.18,
                "bonusPerLevel": 5,
                "costMultiplier": 0,
                "description": "Boost the EXP gain of all cells by +{% when dealing damage"
            }),
        new JellyOperatorUpgradeBase(32, <JellyOperatorUpgradeModel>{
                "index": 32,
                "displayIndex": 27,
                "name": "Cell Metabolism",
                "maxLevel": 10,
                "costExponent": 65,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Boost the DMG of all cells by +{% for every 10 combined LVs of all Cells! @ Total bonus: +$% all Cell DMG"
            }),
        new JellyOperatorUpgradeBase(33, <JellyOperatorUpgradeModel>{
                "index": 33,
                "displayIndex": 13,
                "name": "Cell Dialysis",
                "maxLevel": 25,
                "costExponent": 5.5,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Boost Bloodcell gain by +{% for every LV of all Cells. @ Total bonus: +$% Bloodcell gain"
            }),
        new JellyOperatorUpgradeBase(34, <JellyOperatorUpgradeModel>{
                "index": 34,
                "displayIndex": 33,
                "name": "Lower Cholesterol",
                "maxLevel": 9999,
                "costExponent": 1.45,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Reduce the cost of all upgrades by $%"
            }),
        new JellyOperatorUpgradeBase(35, <JellyOperatorUpgradeModel>{
                "index": 35,
                "displayIndex": 35,
                "name": "Revival Shots",
                "maxLevel": 5,
                "costExponent": 1500,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "You can now click on dead cells during 'Critical Condition' of the Operation to revive them, up to { times!"
            }),
        new JellyOperatorUpgradeBase(36, <JellyOperatorUpgradeModel>{
                "index": 36,
                "displayIndex": 17,
                "name": "Critical Status",
                "maxLevel": 1,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "When you run out of time during the Operation, instead of immediate failure, the Jelly goes into 'Critical Condition' wherein your cells die one by one until they're all gone."
            }),
        new JellyOperatorUpgradeBase(37, <JellyOperatorUpgradeModel>{
                "index": 37,
                "displayIndex": 39,
                "name": "Rift Guy's Upgrade",
                "maxLevel": 0,
                "costExponent": 1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Huh? What?? ME again??? Get real, OF COURSE I'm here!"
            }),
        new JellyOperatorUpgradeBase(38, <JellyOperatorUpgradeModel>{
                "index": 38,
                "displayIndex": 11,
                "name": "Daily Transfusion",
                "maxLevel": 20,
                "costExponent": 2.5,
                "bonusPerLevel": 10,
                "costMultiplier": 0.15,
                "description": "Automatically get +$ Bloodcells each day you login! @ This amount is equal to {% of the most Bloodcells you've ever earned in a single operation!"
            }),
        new JellyOperatorUpgradeBase(39, <JellyOperatorUpgradeModel>{
                "index": 39,
                "displayIndex": 2,
                "name": "Operational Bonuses",
                "maxLevel": 1,
                "costExponent": 1.1,
                "bonusPerLevel": 1,
                "costMultiplier": 0,
                "description": "Each successful operation gives a new IdleOn bonus for the REST of the game! Check them out in the BONUS tap, top right corner."
            })    
]
}
