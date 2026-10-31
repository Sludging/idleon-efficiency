export interface ChangelogSection {
  title: string;
  changes: string[];
}

/** Changes accept plain bullets or titled sections with their own bullet lists. */
export interface ChangelogEntryData {
  version: string;
  title: string;
  date: string;
  changes: (string | ChangelogSection)[];
}

export const changelogData: ChangelogEntryData[] = [
  {
    version: "1.6.2",
    title: "Super Talents, Construction, and More",
    date: "October 31, 2026",
    changes: [
      {
        title: "Players & Construction",
        changes: [
          "Players: Added Super Talent tracking, talent filters, and Library checkout estimates.",
          "Construction: Added building completion estimates, Trimmed slot bonuses, and Refinery production and fuel details.",
        ],
      },
      {
        title: "More Tracking",
        changes: [
          "Added Gem Shop, Bundles, Friends Stats, and Speedrun pages.",
          "Added Hat Rack, Vote Ballot, Island Expeditions, Killroy, and Weekly Bosses pages.",
          "Storage: Added Greenstack tracking and filters.",
          "Alchemy: Added daily bubble upgrade estimates and target indicators.",
        ],
      },
      {
        title: "Bug Fixes",
        changes: [
          "Players: Fixed calculations and loading for incomplete account data.",
          "Talents: Fixed Super Talent contributions to Family bonuses and talent bonuses to 3D Printer and Royal Armory.",
          "Construction: Fixed Refinery rank and unlock tracking and Equinox fill bonuses.",
          "Stamps: Fixed bonuses to respect character skill levels.",
          "Fixed Infinite Stars activation, Tome unlock requirements, Gaming shovel bonuses, and Sushi Knowledge bonuses.",
          "Research: Fixed progress previews before entering Research.",
        ],
      },
    ],
  },
  {
    version: "1.6.1",
    title: "1.24 and Menagerie",
    date: "October 24, 2026",
    changes: [
      {
        title: "Update 1.24",
        changes: [
          "Companions: Added Maccie’s Lumi bonus.",
          "Companions: Added Ancientfish’s upgrade-doubling capacity.",
          "Event Shop: Added Black Star, Organic Label, and Lumi rewards.",
          "Game Data: Updated items, cards, companions, and shop data for 1.24.",
          "Upgrade Vault: Updated level caps and prices to include Event Shop rewards, bundles, Glimbo trades, and companion and Sushi discounts.",
        ],
      },
      {
        title: "Menagerie",
        changes: [
          "Breeding: Added increased shiny pet level caps and bonuses from levels above 20 to shiny levelling speed and pet damage.",
          "Coral Reef: Added Menagerie’s increased Pillar Coral level cap.",
          "Forge: Fixed smelting speed calculations, including Menagerie, Godshard card, and oil bonuses.",
          "Gaming: Fixed Black Star multipliers and available Black Star counts.",
          "Obols: Fixed Silver Jellyfish bonuses to non-attribute stats.",
          "Sneaking: Added Omnijade allocation tracking and upgrade bonuses.",
          "Trapping: Fixed Menagerie and Meritocracy multipliers for shiny critter rewards.",
        ],
      },
      {
        title: "Older Content",
        changes: [
          "Farming: Added Exotic Market upgrade tracking.",
          "Farming: Added Sticker collection tracking.",
          "Gallery: Added page with trophies, nametags, podiums, and bonus summaries.",
          "Glimbo: Added page with trade costs, affordability, Vault cap increases, and an option to preserve greenstacks.",
          "Sneaking: Added floor progression, Mastery, Gemstones, and daily charm roll tracking.",
          "Summoning: Added Essences & Stones overview with generation rates, stone wins, next boss HP, and upgrade bonuses.",
        ],
      },
      {
        title: "Other Fixes",
        changes: [
          "Alchemy: Fixed character assignment counts for the first Sigil.",
          "Breeding: Fixed shiny pet levelling speed, pet damage bonuses, and Grey DNA estimates when trashing pets.",
          "Bubba: Fixed upgrade prices and production.",
          "Clam Work: Fixed upgrade costs, promotion-level requirements, and Scurge discounts.",
          "Construction: Fixed character build speed, cog build and EXP rates, flag speed, and Shrine level caps.",
          "Cooking: Fixed cooking speed, Mastery EXP, meal level caps, ribbon bonuses, and No Meal Left Behind indicators and bundle support.",
          "Divinity: Fixed Divinity point and EXP rates.",
          "Farming: Fixed Exotic Market bonuses and Land Rank EXP calculations.",
          "Kangaroo: Fixed upgrade prices and production.",
          "Legend Talents: Fixed talent activation, level caps, and bonuses.",
          "Owl: Fixed upgrade prices and production.",
          "Players: Fixed character damage and drop rate calculations.",
          "Research: Fixed EXP bonuses from Crucible, Gallery nametags, Clam Work, Arcade, Killroy, and companions. Marked Gallery and Silkrode assumptions.",
          "Sailing: Fixed artifact bonuses, artifact find chance, captain EXP, and treasure value.",
          "Spelunking: Fixed persistent POW calculations.",
          "Summoning: Fixed essence generation, Teal unlocks, and Dream Pack bonuses.",
        ],
      },
    ]
  },
  {
    version: "1.6.0",
    title: "We are cooking!",
    date: "October 19, 2026",
    changes: [
      "Added Menagerie page to track missions, rank, Lumi, Shells, unlocks, and bonuses. Menagerie's impact on other systems is not complete yet.",
      {
        title: "Older Content",
        changes: [
          "Added Research page to track Observations, lenses, Papers, Research EXP, Grid upgrades, and Shapes.",
          "Added Spelunking page to track tunnels, discoveries, Journal pages, character progression, Amber, Shop upgrades, and Elixirs.",
          "Added Emperor, Minehead, and Clam Work pages.",
          "Expanded The Hole with villager growth, Opals, Studies, Schematics, Majik, and Measurements.",
          "Added cavern resource, production, collectible, and upgrade tracking to The Hole.",
          "Detailed progression remains limited for Bravery, Justice, Wisdom, Dawg Den, Gloomie Mushroom Grotto, Gambit, and Temple.",
          "Added Advice Fish, Zenith Market, and The Button pages to track bonuses, upgrades, costs, and task progress.",
          "Added Bribes, Guild Bonuses, Event Shop, and Armor Smithy pages, plus bonus summaries for Owl, Kangaroo, and Bubba.",
          "Expanded character stats with defence, accuracy, movement speed, weapon power, and drop rate.",
          "Fixed upgrade costs for Compass, Grimoire, and Tesseract.",
          "Fixed card-star progress and card bonus calculations, including Cardifiers.",
          "Added passive Prayer bonus and per-character Nobisect blessing displays.",
          "Refreshed Sushi Station and Jelly Operator layouts.",
        ]
      }
    ]
  },
  {
    version: "1.5.0",
    title: "World 7, Royal Armory, and Gaming",
    date: "October 11, 2026",
    changes: [
      "Added Royal Armory page to track resources, upgrades, Orblets, Royal Statues, and Outpost progress.",
      "Added Coral Reef page to track coral production, upgrades, and Dancing Coral bonuses.",
      "Added Sushi Station page to track collection progress, resources, and upgrades.",
      "Added Jelly Operator page to track cells, upgrades, obstructions, and operation progress.",
      "Expanded Gaming page with plants, mutations, upgrades, Superbits, and Palette.",
      "Added World 7 to the Task Board page.",
    ]
  },
  {
    version: "1.4.0",
    title: "Cooking speed",
    date: "September 1, 2026",
    changes: [
      "Cooking speed should be accurate again!",
      "Working through fixing all existing maths and calculations across the site before I create new UI elements.",
    ]
  },
  {
    version: "1.3.0",
    title: "World 7 - Part 2",
    date: "February 22, 2026",
    changes: [
      "New data from world 7 - part 2 incorporated into the site.",
      "Some systems updated (like sailing, and refinery), but mostly untouched.",
      "Expect some lead time until I catch up to world 7 systems and impacts.",
      "Sorry for the delay!"
    ]
  },
  {
    version: "1.2.50",
    title: "World 7",
    date: "November 7, 2025",
    changes: [
      "Initial pass for new data from World 7.",
      "No new features added, just data like bubbles, stamps, cards etc.",
      "Expected some math to be off for a while.",
    ]
  },
  {
    version: "1.2.41-v4",
    title: "Minor bug fixes",
    date: "September 27, 2025",
    changes: [
      "Fix filtering on elite class upgrades sometimes showing invalid upgrades.",
      "Fix max level costs calculations for elite class upgrades.",
      "Fix bug with pocket divinity.",
      "Add 'Linked Players' display to the gods display in Divinity.",
    ]
  },
  {
    version: "1.2.41-v3",
    title: "General fixes!",
    date: "September 16, 2025",
    changes: [
      "It's time to catch-up on broken things!",
      "Cooking speed calculation should be accurate or very close now.",
      "To do that many things across the site were updated, such as bubbles, max level talents, and more.",
      "This change was done purely for the calculations and the visuals are lagging behind, they will be next to be updated."
    ]
  },
  {
    version: "1.2.41-v2",
    title: "Extend Efficiency Calculators",
    date: "July 17, 2025",
    changes: [
      "Add accuracy and defense efficiency calculators to all elite classes.",
      "Fix a bug with efficiency calculators being off by one.",
    ]
  },
  {
    version: "1.2.41",
    title: "Update 2.41",
    date: "July 13, 2025",
    changes: [
      "Add data and assets for update 2.41.",
      "Elite class pages now have their own sub-navigation.",
      "Elite classes now have better feature parity across them.",
      "Resource weights are now configurable for elite classes.",
    ]
  },
  {
    version: "1.2.40-v2",
    title: "Tesseract - First pass",
    date: "June 28, 2025",
    changes: [
      "Add tesseract page to track tesseract upgrades.",
      "Add long overdue display of new player inventory bags."
    ]
  },
  {
    version: "1.2.40",
    title: "Update 2.40",
    date: "June 28, 2025",
    changes: [
      "Add data and assets for update 2.40.",
    ]
  },
  {
    version: "1.2.37-v2",
    title: "Compass",
    date: "May 31, 2025",
    changes: [
      "Enhance efficiency calculator on compass page.",
      "Fix bug with not handling the premium hat for extra dust.",
      "Handle arcade blue balls and reindeer pet. As this impacted bonus dust."
    ]
  },
  {
    version: "1.2.37",
    title: "Compass",
    date: "May 25, 2025",
    changes: [
      "Added first pass at compass page. Find it under the Account navigation.",
      "Tracking damage, dust, and efficiency of compass upgrades.",
    ]
  },
  {
    version: "1.2.30",
    title: "Stamp Grid",
    date: "March 19, 2025",
    changes: [
      "Added stamp grid with filter support to the stamp page.",
      "Fixed bug with carry capacity math.",
      "Fixed bug with navigation between players resetting the current sub-tab."
    ]
  },
  {
    version: "1.2.29",
    title: "Steam Login",
    date: "March 13, 2025",
    changes: [
      "Added Steam login button to the login page.",
    ]
  },
  {
    version: "1.2.28",
    title: "Grimoire and Upgrade Vault",
    date: "February 27, 2025",
    changes: [
      "Added grimoire page to track grimoire upgrades. Make sure to checkout the 'unlock path' feature.",
      "Added upgrade vault page to track upgrade vault",
      "Added change log page to track site updates",
    ]
  },
];
