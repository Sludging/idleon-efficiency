import { VoteBonusModel } from '../model/voteBonusModel';

export class VoteBonusBase { constructor(public index: number, public data: VoteBonusModel) { } }



export const initVotesBonusRepo = (): VoteBonusBase[] => {
    return [
        new VoteBonusBase(0, <VoteBonusModel>{
            "text": "All your characters deal }x more damage to enemies",
            "bonus": 25,
            "value": 0
        }),
        new VoteBonusBase(1, <VoteBonusModel>{
            "text": "All your characters deal }x more damage to enemies",
            "bonus": 25,
            "value": 0
        }),
        new VoteBonusBase(2, <VoteBonusModel>{
            "text": "Increases STR AGI WIS and LUK for all characters by +{%",
            "bonus": 15,
            "value": 0
        }),
        new VoteBonusBase(3, <VoteBonusModel>{
            "text": "Increases Defence and Accuracy by +{% for all characters",
            "bonus": 30,
            "value": 0
        }),
        new VoteBonusBase(4, <VoteBonusModel>{
            "text": "Logging in each day gives +{ more GP to your guild than you normally do",
            "bonus": 30,
            "value": 0
        }),
        new VoteBonusBase(5, <VoteBonusModel>{
            "text": "}x Kill per Kill, making monster kills worth more for portals and Deathnote",
            "bonus": 20,
            "value": 0
        }),
        new VoteBonusBase(6, <VoteBonusModel>{
            "text": "+{% AFK gain for both fighting and skills for all characters",
            "bonus": 15,
            "value": 0
        }),
        new VoteBonusBase(7, <VoteBonusModel>{
            "text": "Boosts all Mining EXP gain and Mining Efficiency by +{%",
            "bonus": 42,
            "value": 0
        }),
        new VoteBonusBase(8, <VoteBonusModel>{
            "text": "Boosts all Fishing EXP gain and Fishing Efficiency by +{%",
            "bonus": 50,
            "value": 0
        }),
        new VoteBonusBase(9, <VoteBonusModel>{
            "text": "Boosts all Choppin' EXP gain and Choppin' Efficiency by +{%",
            "bonus": 38,
            "value": 0
        }),
        new VoteBonusBase(10, <VoteBonusModel>{
            "text": "Boosts all Catching EXP gain and Catching Efficiency by +{%",
            "bonus": 46,
            "value": 0
        }),
        new VoteBonusBase(11, <VoteBonusModel>{
            "text": "Increases the amount of resources produced by the 3D Printer by }x",
            "bonus": 20,
            "value": 3
        }),
        new VoteBonusBase(12, <VoteBonusModel>{
            "text": "Boosts liquid generation rate for all Alchemy liquids by +{%",
            "bonus": 25,
            "value": 0
        }),
        new VoteBonusBase(13, <VoteBonusModel>{
            "text": "Boosts all Cooking EXP gain and Cooking Speed by +{%",
            "bonus": 63,
            "value": 4
        }),
        new VoteBonusBase(14, <VoteBonusModel>{
            "text": "Boosts Dungeon Credit and Dungeon Flurbo gain by }x",
            "bonus": 50,
            "value": 0
        }),
        new VoteBonusBase(15, <VoteBonusModel>{
            "text": "All your characters gain +{% more Class EXP from monsters",
            "bonus": 60,
            "value": 0
        }),
        new VoteBonusBase(16, <VoteBonusModel>{
            "text": "Speeds up Egg Incubation time and Breeding EXP gain by +{%",
            "bonus": 50,
            "value": 4
        }),
        new VoteBonusBase(17, <VoteBonusModel>{
            "text": "Boosts Sigil EXP gain by }x, still requires Sigils active in Lab",
            "bonus": 80,
            "value": 4
        }),
        new VoteBonusBase(18, <VoteBonusModel>{
            "text": "Boosts Construction Build Rate and Construction EXP gain by +{%",
            "bonus": 40,
            "value": 3
        }),
        new VoteBonusBase(19, <VoteBonusModel>{
            "text": "Boosts Shrine EXP gain by a staggering }x",
            "bonus": 53,
            "value": 3
        }),
        new VoteBonusBase(20, <VoteBonusModel>{
            "text": "Boosts Artifact Find chance in Sailing by }x",
            "bonus": 31,
            "value": 5
        }),
        new VoteBonusBase(21, <VoteBonusModel>{
            "text": "Boosts New Species chance when using DNA in Gaming by }x",
            "bonus": 80,
            "value": 5
        }),
        new VoteBonusBase(22, <VoteBonusModel>{
            "text": "Find +{% more Gold Nuggets when digging with the Shovel in Gaming",
            "bonus": 75,
            "value": 5
        }),
        new VoteBonusBase(23, <VoteBonusModel>{
            "text": "Boosts Divinity PTS gain by }x and Divinity EXP Gain by +{%",
            "bonus": 60,
            "value": 5
        }),
        new VoteBonusBase(24, <VoteBonusModel>{
            "text": "Boosts Sailing Captain EXP gain and Sailing Speed by }x",
            "bonus": 50,
            "value": 5
        }),
        new VoteBonusBase(25, <VoteBonusModel>{
            "text": "Boosts Sneaking Stealth by }x and EXP Gain by +{% for all your Ninja Twins",
            "bonus": 65,
            "value": 6
        }),
        new VoteBonusBase(26, <VoteBonusModel>{
            "text": "Boosts bonuses from all Golden Food by +{%",
            "bonus": 30,
            "value": 0
        }),
        new VoteBonusBase(27, <VoteBonusModel>{
            "text": "Increases Drop Rate for all your characters by +{%",
            "bonus": 38,
            "value": 0
        }),
        new VoteBonusBase(28, <VoteBonusModel>{
            "text": "Boosts Summoning EXP gain by +{% and all Essence gained by }x",
            "bonus": 40,
            "value": 6
        }),
        new VoteBonusBase(29, <VoteBonusModel>{
            "text": "Boosts Crop Value, and Farming EXP gain, AND Next Crop Chance by +{%",
            "bonus": 40,
            "value": 6
        }),
        new VoteBonusBase(30, <VoteBonusModel>{
            "text": "Increases Trapping EXP gain and Worship EXP gain by +{%",
            "bonus": 54,
            "value": 3
        }),
        new VoteBonusBase(31, <VoteBonusModel>{
            "text": "Increases Lab EXP gain by +{%",
            "bonus": 90,
            "value": 4
        }),
        new VoteBonusBase(32, <VoteBonusModel>{
            "text": "Boosts Equinox Bar Fill rate by }x",
            "bonus": 40,
            "value": 3
        }),
        new VoteBonusBase(33, <VoteBonusModel>{
            "text": "Boosts Refinery Cycle Speed by +{%",
            "bonus": 50,
            "value": 3
        }),
        new VoteBonusBase(34, <VoteBonusModel>{
            "text": "Increases cash earned from monsters by +{%",
            "bonus": 52,
            "value": 0
        })
    ];
};