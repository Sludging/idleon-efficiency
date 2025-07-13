export interface ChangelogEntryData {
  version: string;
  title: string;
  date: string;
  changes: string[];
}

export const changelogData: ChangelogEntryData[] = [
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
