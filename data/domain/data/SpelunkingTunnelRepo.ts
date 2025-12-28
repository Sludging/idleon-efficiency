import { SpelunkingDiscoveryModel } from '../model/spelunkingDiscoveryModel';
import { SpelunkingTunnelModel } from '../model/spelunkingTunnelModel';

export class SpelunkingTunnelBase { constructor(public index: number, public data: SpelunkingTunnelModel) { } }



export const initSpelunkingTunnelRepo = () => {
    return [    
        new SpelunkingTunnelBase(0, <SpelunkingTunnelModel>{
                "index": 0,
                "name": "Pebble Cove",
                "loreBonus": "World's End island & Omnipotent Artifact tier unlocked in Sailing!",
                "bossDepth": 7,
                "discoveries": [
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 0,
                        "name": "Smol Pebbles",
                        "x1": 0.01,
                        "x2": 1,
                        "x3": 1,
                        "x4": 0,
                        "x5": 1,
                        "x6": 0,
                        "x7": 1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 0,
                        "name": "Smooth Rocks",
                        "x1": 0.1,
                        "x2": 1,
                        "x3": 1.3,
                        "x4": 0,
                        "x5": 1,
                        "x6": 2,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 0,
                        "name": "Big Stone",
                        "x1": 10,
                        "x2": 2,
                        "x3": 1.5,
                        "x4": 0,
                        "x5": 1,
                        "x6": 6,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 0,
                        "name": "Gravel Pile",
                        "x1": 300,
                        "x2": 2,
                        "x3": 1.8,
                        "x4": 0,
                        "x5": 1,
                        "x6": 11,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 0,
                        "name": "Granite Stack",
                        "x1": 5000,
                        "x2": 3,
                        "x3": 2.1,
                        "x4": 0,
                        "x5": 1,
                        "x6": 16,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 0,
                        "name": "Stonespire",
                        "x1": 30000,
                        "x2": 4,
                        "x3": 3,
                        "x4": 1,
                        "x5": 1.2,
                        "x6": 20,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 0,
                        "name": "Scoundrel Pommsie",
                        "x1": 1,
                        "x2": 10,
                        "x3": 10,
                        "x4": 0,
                        "x5": 1,
                        "x6": 7,
                        "x7": -1
                    }
                ]
            }),
        new SpelunkingTunnelBase(1, <SpelunkingTunnelModel>{
                "index": 1,
                "name": "Sedimeadow",
                "loreBonus": "Superbits in Gaming now has a 2nd page full of new upgrades!",
                "bossDepth": 11,
                "discoveries": [
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 1,
                        "name": "Stubby Coral",
                        "x1": 0.2,
                        "x2": 1,
                        "x3": 2,
                        "x4": 0,
                        "x5": 1,
                        "x6": 0,
                        "x7": 50
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 1,
                        "name": "Fuzzy Fungi",
                        "x1": 0.8,
                        "x2": 1,
                        "x3": 2.5,
                        "x4": 0,
                        "x5": 1,
                        "x6": 2,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 1,
                        "name": "Vibrant Coral",
                        "x1": 4,
                        "x2": 2,
                        "x3": 3,
                        "x4": 0,
                        "x5": 1,
                        "x6": 7,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 1,
                        "name": "Spikey Shell",
                        "x1": 20,
                        "x2": 3,
                        "x3": 3.7,
                        "x4": 0,
                        "x5": 1,
                        "x6": 14,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 1,
                        "name": "Seaweed Tuft",
                        "x1": 100,
                        "x2": 4,
                        "x3": 4.5,
                        "x4": 0,
                        "x5": 1,
                        "x6": 20,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 1,
                        "name": "Giant Conch",
                        "x1": 300,
                        "x2": 5,
                        "x3": 5.5,
                        "x4": 0,
                        "x5": 1,
                        "x6": 26,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 1,
                        "name": "Coralissimus",
                        "x1": 1000,
                        "x2": 6,
                        "x3": 7,
                        "x4": 1,
                        "x5": 1.2,
                        "x6": 31,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 1,
                        "name": "Esquire Numbo",
                        "x1": 50,
                        "x2": 15,
                        "x3": 25,
                        "x4": 0,
                        "x5": 1,
                        "x6": 11,
                        "x7": -1
                    }
                ]
            }),
        new SpelunkingTunnelBase(2, <SpelunkingTunnelModel>{
                "index": 2,
                "name": "Rustbelt 03",
                "loreBonus": "Cards can now be upgraded to 6-Star Majestic quality!",
                "bossDepth": 20,
                "discoveries": [
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 2,
                        "name": "Sheet Metal",
                        "x1": 1,
                        "x2": 1,
                        "x3": 4,
                        "x4": 0,
                        "x5": 1,
                        "x6": 0,
                        "x7": 1500
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 2,
                        "name": "CTR Television",
                        "x1": 4,
                        "x2": 2,
                        "x3": 5,
                        "x4": 0,
                        "x5": 1,
                        "x6": 3,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 2,
                        "name": "Rusted Girders",
                        "x1": 15,
                        "x2": 3,
                        "x3": 6,
                        "x4": 0,
                        "x5": 1,
                        "x6": 7,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 2,
                        "name": "Corroded Pipe",
                        "x1": 30,
                        "x2": 3,
                        "x3": 7,
                        "x4": 0,
                        "x5": 1,
                        "x6": 12,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 2,
                        "name": "Sign of Haltage",
                        "x1": 75,
                        "x2": 4,
                        "x3": 8,
                        "x4": 0,
                        "x5": 1,
                        "x6": 17,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 2,
                        "name": "E-Waste Pile",
                        "x1": 250,
                        "x2": 5,
                        "x3": 10,
                        "x4": 0,
                        "x5": 1,
                        "x6": 24,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 2,
                        "name": "Scrap Heap",
                        "x1": 500,
                        "x2": 6,
                        "x3": 12,
                        "x4": 0,
                        "x5": 1,
                        "x6": 30,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 2,
                        "name": "No Man's Crossroad",
                        "x1": 1000,
                        "x2": 7,
                        "x3": 15,
                        "x4": 1,
                        "x5": 1.2,
                        "x6": 35,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 2,
                        "name": "Sentinelbot 447",
                        "x1": 30,
                        "x2": 40,
                        "x3": 50,
                        "x4": 0,
                        "x5": 1,
                        "x6": 20,
                        "x7": -1
                    }
                ]
            }),
        new SpelunkingTunnelBase(3, <SpelunkingTunnelModel>{
                "index": 3,
                "name": "Blushpit",
                "loreBonus": "Unlocks the Exotic Market tab & Medal seed type in Farming!",
                "bossDepth": 30,
                "discoveries": [
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 3,
                        "name": "Lil Shroomie",
                        "x1": 1,
                        "x2": 2,
                        "x3": 8,
                        "x4": 0,
                        "x5": 1,
                        "x6": 0,
                        "x7": 80000
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 3,
                        "name": "Fly Amanita",
                        "x1": 3,
                        "x2": 3,
                        "x3": 12,
                        "x4": 0,
                        "x5": 1,
                        "x6": 4,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 3,
                        "name": "Toadstool Sprouts",
                        "x1": 5,
                        "x2": 4,
                        "x3": 15,
                        "x4": 0,
                        "x5": 1,
                        "x6": 8,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 3,
                        "name": "Fungi Trunk",
                        "x1": 12,
                        "x2": 4,
                        "x3": 20,
                        "x4": 0,
                        "x5": 1,
                        "x6": 11,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 3,
                        "name": "Tabletop Shroomie",
                        "x1": 30,
                        "x2": 5,
                        "x3": 25,
                        "x4": 0,
                        "x5": 1,
                        "x6": 15,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 3,
                        "name": "Speckled Amanita",
                        "x1": 70,
                        "x2": 6,
                        "x3": 32,
                        "x4": 0,
                        "x5": 1,
                        "x6": 19,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 3,
                        "name": "Toadshool Thicket",
                        "x1": 200,
                        "x2": 7,
                        "x3": 40,
                        "x4": 0,
                        "x5": 1,
                        "x6": 25,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 3,
                        "name": "Rotwood Colony",
                        "x1": 2000,
                        "x2": 8,
                        "x3": 50,
                        "x4": 0,
                        "x5": 1,
                        "x6": 32,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 3,
                        "name": "Plurabella",
                        "x1": 10000,
                        "x2": 9,
                        "x3": 65,
                        "x4": 1,
                        "x5": 1.2,
                        "x6": 40,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 3,
                        "name": "Greg",
                        "x1": 1000,
                        "x2": 100,
                        "x3": 100,
                        "x4": 0,
                        "x5": 1,
                        "x6": 30,
                        "x7": -1
                    }
                ]
            }),
        new SpelunkingTunnelBase(4, <SpelunkingTunnelModel>{
                "index": 4,
                "name": "Chucklemire",
                "loreBonus": "Teal Summoning is now available, with new upgrades and opponents!",
                "bossDepth": 40,
                "discoveries": [
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Cotton Candy",
                        "x1": 1,
                        "x2": 2,
                        "x3": 25,
                        "x4": 0,
                        "x5": 1,
                        "x6": 0,
                        "x7": 5e+07
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Tiny Teddy",
                        "x1": 3,
                        "x2": 3,
                        "x3": 35,
                        "x4": 0,
                        "x5": 1,
                        "x6": 3,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Nacho Box",
                        "x1": 5,
                        "x2": 4,
                        "x3": 50,
                        "x4": 0,
                        "x5": 1,
                        "x6": 7,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Milk Stack",
                        "x1": 20,
                        "x2": 5,
                        "x3": 100,
                        "x4": 0,
                        "x5": 1,
                        "x6": 10,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Stuffed Grizzly",
                        "x1": 35,
                        "x2": 5,
                        "x3": 120,
                        "x4": 0,
                        "x5": 1,
                        "x6": 15,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Discarded Popcorn",
                        "x1": 100,
                        "x2": 6,
                        "x3": 180,
                        "x4": 0,
                        "x5": 1,
                        "x6": 21,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Broken Horsey",
                        "x1": 700,
                        "x2": 7,
                        "x3": 230,
                        "x4": 0,
                        "x5": 1,
                        "x6": 28,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Broken Dispenser",
                        "x1": 1000,
                        "x2": 8,
                        "x3": 260,
                        "x4": 0,
                        "x5": 1,
                        "x6": 34,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Knockdown Tower",
                        "x1": 2500,
                        "x2": 9,
                        "x3": 350,
                        "x4": 0,
                        "x5": 1,
                        "x6": 39,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Forgotten Funhouse",
                        "x1": 20000,
                        "x2": 10,
                        "x3": 600,
                        "x4": 1,
                        "x5": 1.23,
                        "x6": 45,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 4,
                        "name": "Blind Gallopera",
                        "x1": 1250,
                        "x2": 150,
                        "x3": 500,
                        "x4": 0,
                        "x5": 1,
                        "x6": 40,
                        "x7": -1
                    }
                ]
            }),
        new SpelunkingTunnelBase(5, <SpelunkingTunnelModel>{
                "index": 5,
                "name": "Lunarheim",
                "loreBonus": "+30 Max LV for Cooking Meals! @ +1 Super Talent PTS! @ +2 Gallery Slots!",
                "bossDepth": 50,
                "discoveries": [
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Skull Pile",
                        "x1": 1,
                        "x2": 2,
                        "x3": 150,
                        "x4": 0,
                        "x5": 1,
                        "x6": 0,
                        "x7": 6e+12
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Stuck Sword",
                        "x1": 2,
                        "x2": 2,
                        "x3": 220,
                        "x4": 0,
                        "x5": 1,
                        "x6": 4,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Proud Flag",
                        "x1": 15,
                        "x2": 3,
                        "x3": 420,
                        "x4": 0,
                        "x5": 1,
                        "x6": 7,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Old Bones",
                        "x1": 20,
                        "x2": 4,
                        "x3": 500,
                        "x4": 0,
                        "x5": 1,
                        "x6": 13,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Wall Remnants",
                        "x1": 200,
                        "x2": 5,
                        "x3": 800,
                        "x4": 0,
                        "x5": 1,
                        "x6": 19,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Heroic Remains",
                        "x1": 300,
                        "x2": 6,
                        "x3": 920,
                        "x4": 0,
                        "x5": 1,
                        "x6": 25,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Knightly Twohander",
                        "x1": 600,
                        "x2": 7,
                        "x3": 1200,
                        "x4": 0,
                        "x5": 1,
                        "x6": 30,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Vacant Throne",
                        "x1": 1500,
                        "x2": 8,
                        "x3": 1500,
                        "x4": 0,
                        "x5": 1,
                        "x6": 36,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Kingdom Flags",
                        "x1": 5000,
                        "x2": 9,
                        "x3": 1900,
                        "x4": 0,
                        "x5": 1,
                        "x6": 39,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Fallen Castle",
                        "x1": 20000,
                        "x2": 10,
                        "x3": 2500,
                        "x4": 0,
                        "x5": 1,
                        "x6": 44,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Monolith",
                        "x1": 110000,
                        "x2": 11,
                        "x3": 4500,
                        "x4": 1,
                        "x5": 1.25,
                        "x6": 51,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 5,
                        "name": "Esquire Skuumbus",
                        "x1": 15000,
                        "x2": 250,
                        "x3": 3000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 50,
                        "x7": -1
                    }
                ]
            }),
        new SpelunkingTunnelBase(6, <SpelunkingTunnelModel>{
                "index": 6,
                "name": "Bizarrio",
                "loreBonus": "Sigils can be upgraded a 4th time to Ethereal! @ Each one also gives +0.2% Prisma Bubble Multi!",
                "bossDepth": 70,
                "discoveries": [
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Lil Peeper",
                        "x1": 1,
                        "x2": 2,
                        "x3": 1200,
                        "x4": 0,
                        "x5": 1,
                        "x6": 0,
                        "x7": 2e+16
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Snoozebox",
                        "x1": 3,
                        "x2": 2,
                        "x3": 1900,
                        "x4": 0,
                        "x5": 1,
                        "x6": 4,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Stuckstream",
                        "x1": 9,
                        "x2": 3,
                        "x3": 3000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 8,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Stacked Gaze",
                        "x1": 25,
                        "x2": 4,
                        "x3": 4500,
                        "x4": 0,
                        "x5": 1,
                        "x6": 12,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Upstairs",
                        "x1": 80,
                        "x2": 5,
                        "x3": 6000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 16,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Oz Mirror",
                        "x1": 300,
                        "x2": 6,
                        "x3": 8000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 21,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Flowffee",
                        "x1": 1000,
                        "x2": 7,
                        "x3": 11500,
                        "x4": 0,
                        "x5": 1,
                        "x6": 27,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Ordinary Door",
                        "x1": 5000,
                        "x2": 8,
                        "x3": 15000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 31,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Grandmother Clock",
                        "x1": 20000,
                        "x2": 9,
                        "x3": 21000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 35,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Implausible Statue",
                        "x1": 100000,
                        "x2": 10,
                        "x3": 30000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 40,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Robust Mirror",
                        "x1": 300000,
                        "x2": 11,
                        "x3": 50000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 49,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Persisting Time",
                        "x1": 1000000,
                        "x2": 15,
                        "x3": 75000,
                        "x4": 1,
                        "x5": 1.28,
                        "x6": 56,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 6,
                        "name": "Mister Jazzie",
                        "x1": 200000,
                        "x2": 500,
                        "x3": 100,
                        "x4": 0,
                        "x5": 1,
                        "x6": 70,
                        "x7": -1
                    }
                ]
            }),
        new SpelunkingTunnelBase(7, <SpelunkingTunnelModel>{
                "index": 7,
                "name": "Glitter End",
                "loreBonus": "This lore bonus has yet to be fully understood...",
                "bossDepth": 100,
                "discoveries": [
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Opie",
                        "x1": 1,
                        "x2": 2,
                        "x3": 15000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 0,
                        "x7": 5e+21
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Bloo",
                        "x1": 2,
                        "x2": 2,
                        "x3": 20000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 5,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Onyx",
                        "x1": 10,
                        "x2": 3,
                        "x3": 32000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 12,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Merald",
                        "x1": 20,
                        "x2": 4,
                        "x3": 45000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 24,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Gumborox",
                        "x1": 100,
                        "x2": 5,
                        "x3": 65000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 33,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Beeg Rubee",
                        "x1": 200,
                        "x2": 6,
                        "x3": 80000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 42,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Chaomeraldi",
                        "x1": 500,
                        "x2": 7,
                        "x3": 110000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 54,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Ammatheist",
                        "x1": 1000,
                        "x2": 8,
                        "x3": 140000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 68,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Solidary Pilar",
                        "x1": 5000,
                        "x2": 9,
                        "x3": 190000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 80,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Supreme Onyx",
                        "x1": 25000,
                        "x2": 10,
                        "x3": 250000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 91,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Spagettical",
                        "x1": 150000,
                        "x2": 11,
                        "x3": 350000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 105,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Flaming Lavarock",
                        "x1": 2000000,
                        "x2": 12,
                        "x3": 600000,
                        "x4": 1,
                        "x5": 1,
                        "x6": 120,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Magnum Opus",
                        "x1": 10000000,
                        "x2": 25,
                        "x3": 1000000,
                        "x4": 1,
                        "x5": 1.3,
                        "x6": 130,
                        "x7": -1
                    },
                    <SpelunkingDiscoveryModel>{
                        "tunnelIndex": 7,
                        "name": "Bah Dazzul",
                        "x1": 2500000,
                        "x2": 1000,
                        "x3": 250000,
                        "x4": 0,
                        "x5": 1,
                        "x6": 100,
                        "x7": -1
                    }
                ]
            }),
        new SpelunkingTunnelBase(8, <SpelunkingTunnelModel>{
                "index": 8,
                "name": "Name9",
                "loreBonus": "8",
                "bossDepth": 55,
                "discoveries": []
            }),
        new SpelunkingTunnelBase(9, <SpelunkingTunnelModel>{
                "index": 9,
                "name": "Name10",
                "loreBonus": "9",
                "bossDepth": 60,
                "discoveries": []
            }),
        new SpelunkingTunnelBase(10, <SpelunkingTunnelModel>{
                "index": 10,
                "name": "Name11",
                "loreBonus": "10",
                "bossDepth": 65,
                "discoveries": []
            }),
        new SpelunkingTunnelBase(11, <SpelunkingTunnelModel>{
                "index": 11,
                "name": "Name12",
                "loreBonus": "11",
                "bossDepth": 70,
                "discoveries": []
            }),
        new SpelunkingTunnelBase(12, <SpelunkingTunnelModel>{
                "index": 12,
                "name": "Name13",
                "loreBonus": "12",
                "bossDepth": 80,
                "discoveries": []
            }),
        new SpelunkingTunnelBase(13, <SpelunkingTunnelModel>{
                "index": 13,
                "name": "Name14",
                "loreBonus": "13",
                "bossDepth": 101,
                "discoveries": []
            }),
        new SpelunkingTunnelBase(14, <SpelunkingTunnelModel>{
                "index": 14,
                "name": "Name15",
                "loreBonus": "14",
                "bossDepth": 121,
                "discoveries": []
            })    
]
}
