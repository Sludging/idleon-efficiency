export interface ChangelogEntryData {
  version: string;
  title: string;
  date: string;
  changes: string[];
}

export const changelogData: ChangelogEntryData[] = [
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