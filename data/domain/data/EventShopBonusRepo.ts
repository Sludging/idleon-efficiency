import { EventShopBonusModel } from '../model/eventShopBonusModel';

export class EventShopBonusBase { constructor(public index: number, public data: EventShopBonusModel) { } }

export const initEventShopBonusRepo = () => {
    return [
        new EventShopBonusBase(0, <EventShopBonusModel>{
            "name": "Golden Tome",
            "desc": "Adds a new DMG Multi bonus type to the Tome in World 4",
            "price": 25
        }),
        new EventShopBonusBase(1, <EventShopBonusModel>{
            "name": "Stamp Stack",
            "desc": "Get +3 Stamp LVs every day for a random Stamp",
            "price": 30
        }),
        new EventShopBonusBase(2, <EventShopBonusModel>{
            "name": "Bubble Broth",
            "desc": "Get +5 LVs for a random Alchemy Bubble every day",
            "price": 20
        }),
        new EventShopBonusBase(3, <EventShopBonusModel>{
            "name": "Equinox Enhancement",
            "desc": "Get 1.5x faster Bar Fill Rate in Equinox Valley in World 3",
            "price": 15
        }),
        new EventShopBonusBase(4, <EventShopBonusModel>{
            "name": "Supreme Wiring",
            "desc": "+2% Printer Output per day, taking new sample resets this",
            "price": 45
        }),
        new EventShopBonusBase(5, <EventShopBonusModel>{
            "name": "Sleepy Joe Armstrong",
            "desc": "+20% AFK Gains for all things IdleOn related",
            "price": 25
        }),
        new EventShopBonusBase(6, <EventShopBonusModel>{
            "name": "Village Encouragement",
            "desc": "All Villagers in World 5 Camp get 1.25x EXP Gain",
            "price": 30
        }),
        new EventShopBonusBase(7, <EventShopBonusModel>{
            "name": "Gilded Vote Button",
            "desc": "Get +17% higher Ballot Bonus Multi from Voting",
            "price": 35
        }),
        new EventShopBonusBase(8, <EventShopBonusModel>{
            "name": "Extra Page",
            "desc": "Get +1 more Filter Page. Find it on the left side of Cards",
            "price": 20
        }),
        new EventShopBonusBase(9, <EventShopBonusModel>{
            "name": "Coin Stacking",
            "desc": "Get a 1.50x multiplier to ALL coin gain, and profit big time!",
            "price": 15
        }),
        new EventShopBonusBase(10, <EventShopBonusModel>{
            "name": "Storage Chest",
            "desc": "Get +12 storage slots for your storage chest",
            "price": 15
        }),
        new EventShopBonusBase(11, <EventShopBonusModel>{
            "name": "Storage Vault",
            "desc": "Get +16 storage slots for your storage chest",
            "price": 32
        }),
        new EventShopBonusBase(12, <EventShopBonusModel>{
            "name": "Secret Pouch",
            "desc": "Get +3 Inventory slots for your Items Backpack",
            "price": 27
        }),
        new EventShopBonusBase(13, <EventShopBonusModel>{
            "name": "Ribbon Connoisseur",
            "desc": "Get +3 more ribbons every day for your Ribbon Shelf",
            "price": 35
        }),
        new EventShopBonusBase(14, <EventShopBonusModel>{
            "name": "Golden Square",
            "desc": "Get +1 Trimmed Construction slot, which has 3x speed!",
            "price": 23
        }),
        new EventShopBonusBase(15, <EventShopBonusModel>{
            "name": "Summoning Star",
            "desc": "Get +10 Summoning Doublers, used on Summoning Upgrades!",
            "price": 30
        }),
        new EventShopBonusBase(16, <EventShopBonusModel>{
            "name": "Royal Vote Button",
            "desc": "Get +30% higher Ballot Bonus Multi instead of +17%",
            "price": 25
        }),
        new EventShopBonusBase(17, <EventShopBonusModel>{
            "name": "Extra Page",
            "desc": "Get +1 more Filter Page. Find it on the left side of Cards",
            "price": 22
        }),
        new EventShopBonusBase(18, <EventShopBonusModel>{
            "name": "Extra Exaltedness",
            "desc": "Get +1 Exalted Stamp use, and +20% Exalt Bonus.",
            "price": 35
        }),
        new EventShopBonusBase(19, <EventShopBonusModel>{
            "name": "Smiley Statue",
            "desc": "All statues give 1.30x higher bonuses, forever!",
            "price": 30
        }),
        new EventShopBonusBase(20, <EventShopBonusModel>{
            "name": "Government Subsidy",
            "desc": "Get 1.60x more coins from defeating monsters!",
            "price": 17
        }),
        new EventShopBonusBase(21, <EventShopBonusModel>{
            "name": "Automated Mail",
            "desc": "Get +5 Boxes at the Post Office every day you play!",
            "price": 15
        }),
        new EventShopBonusBase(22, <EventShopBonusModel>{
            "name": "Friendly Slot",
            "desc": "Adds +1 more slot for your Friend Bonuses in Codex!",
            "price": 12
        }),
        new EventShopBonusBase(23, <EventShopBonusModel>{
            "name": "Fossil Meritocracy",
            "desc": "Get +20% higher Meritocracy Bonus in World 7",
            "price": 45
        }),
        new EventShopBonusBase(24, <EventShopBonusModel>{
            "name": "Bonus Points",
            "desc": "You now earn 1.5x PTS for the Hoops and Darts shops!",
            "price": 20
        }),
        new EventShopBonusBase(25, <EventShopBonusModel>{
            "name": "Coolral",
            "desc": "Boosts daily gain for the Coral Reef in W7 by 1.30x",
            "price": 30
        }),
        new EventShopBonusBase(26, <EventShopBonusModel>{
            "name": "Plain Showcase",
            "desc": "Get +1 more trophy slot for the Gallery in World 7",
            "price": 35
        }),
        new EventShopBonusBase(27, <EventShopBonusModel>{
            "name": "Singed Tome",
            "desc": "Adds a new Drop Rate Multi bonus to the Tome in World 4",
            "price": 125
        }),
        new EventShopBonusBase(28, <EventShopBonusModel>{
            "name": "Higgs Boson",
            "desc": "All atoms have a +20 higher Max LV",
            "price": 150
        }),
        new EventShopBonusBase(29, <EventShopBonusModel>{
            "name": "Worldclass Showcase",
            "desc": "Turns a Gallery Slot in World 7 to Grade 4",
            "price": 180
        }),
        new EventShopBonusBase(30, <EventShopBonusModel>{
            "name": "King of the Rack",
            "desc": "+10% Hat Rack Bonus Multi",
            "price": 30
        }),
        new EventShopBonusBase(31, <EventShopBonusModel>{
            "name": "Omega Bubble",
            "desc": "Kattlekruk divinity gives 1.50x more daily bubbles",
            "price": 75
        }),
        new EventShopBonusBase(32, <EventShopBonusModel>{
            "name": "Plain Showcase",
            "desc": "Get +2 more Legend Talent PTS for World 7",
            "price": 25
        })
    ]
}