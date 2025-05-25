export interface ChangelogEntryData {
  version: string;
  title: string;
  date: string;
  changes: string[];
}

export const changelogData: ChangelogEntryData[] = [
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