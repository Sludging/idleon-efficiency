# The Hole part 2: UI plan

## Player outcome and scope

Let players scan **Upgrades → Majik / Schematics / Measurements** for owned benefits, useful unowned rewards, and the next purchase. Keep each benefit beside its progression. Use compact cards rather than an audit of backend fields.

Scope follows [#442](https://github.com/Sludging/idleon-efficiency/issues/442), the [part 2 outcomes](hole-delivery-parts-draft.md#2-schematics-majik-and-measurements), and the [accepted backend](hole-part-2-backend-plan.md). The latest selected presentation direction in the [current handoff](hole-research-brief.md#current-handoff) controls this revision. Backend formulas and imported player stats do not change.

Preserve all **17 released Majik upgrades, 105 released schematics, and 17 Measurements**. Keep useful unobtained purposes, truthful missing benefits, complete static multi-effects, and known zeroes. Preserve completed part 1, shared Hole resources, Studies, all cavern identities, and unrelated work.

## Sources and visual direction

Use the incumbent Rubik typography, charcoal surfaces, blue navigation selection, and verified game imagery. Follow the [UI guide](../agents/ui-patterns.md) and [UI feedback](../insights/ui-feedback.md). This is a focused Operate-mode refinement, not a new visual system.

Keep the shared outer wrapper and the canonical **Villagers / Upgrades / Caverns** tabs. Preserve the **Majik / Schematics / Studies / Measurements** rail and its existing 25% / 75% composition. Do not add a page width, horizontal inset, destination, or cross-content link.

Retain Sneaking Upgrades' close identity/level/effect grouping and dark-1 card surface. Use a dense two-column grid inside the existing Hole pane. Use small gaps and enough internal padding for readable grouping. Card heights follow their content; do not impose tall empty bodies.

Inspect actual rendered **Royal Armory → Statues** at `/master-classes/royal-armory` for Measurement hierarchy. Its current bonus is 28px bold, above smaller level, next outcome, and purchase information. Match bonus dominance, not its restoration controls, next-level forecast, or shared-material panel. In Hole's narrower cards, keep the complete Measurement effect at 20px/700 and supporting level, statistic, multiplier, and cost at 12–14px. Do not extract a large number and repeat the same effect sentence below it.

Use [IdleonToolbox's public Hole page](https://idleontoolbox.com/account/world-5/hole?profile=liiiiiiiiiiiig), under Account → World 5 → Hole, for content reference. Engineer confirms schematic recognition art and construction-versus-access relationships. Bonuses groups the three trees. Measure connects effect, level, statistic, and cost. Do not copy Toolbox's styling, hidden-owned default, placeholder entries, Bee String, ETA, or unexplained balance/cost pairs.

## Game meaning and available data

- Kaipu grants schematic access. Construction is separate and spends the matched Hole wallet. Lamp discounts the next construction. Purchased schematics have no next construction cost.
- All three Majik trees use one prepared point pool. A first level and each permitted enhancement cost points. **Cosmo, Enhance!** controls enhancement access. A current cap of one does not imply the final enhancement cap.
- Pocket's selected god identities are saved state. Original game display uses a different benefit when King Doot is active. Ordinary selected-god major text must not stand in for that Doot benefit.
- Minau grants Measurement access. Saved purchased levels, account statistics, and Lengthmeister determine the prepared benefit. Fountain changes price. Missing data is not zero.

Reuse the [existing mechanic evidence](hole-research-brief.md), [official Wiki camp context](https://idleon.wiki/wiki/The_Caverns#Camp), generated descriptions, and accepted owner APIs. Reuse unchanged calculation evidence. A disposable preview does not establish new game parity.

## Majik and Pocket Divinity

Show one compact **remaining / earned points** summary above the Hole, Village, and Idleon tabs. Its existing shared-pool tooltip may retain invested and purchased-point contributors. Read the authoritative pool, including investment in undisplayed placeholders.

Keep **5 Hole / 6 Village / 6 Idleon** upgrades in game order. Each card groups game name, **level / current cap**, and its complete useful effect once. Remove every per-bonus tooltip. Remove **Maxed** labels. Level/cap communicates completion without another state sentence.

Show only a genuinely blocking named prerequisite or **Cosmo, Enhance! required** beside the affected card. Preserve a local locked state when prepared access is false and no named requirement explains it. Keep access or progression unavailable when inputs are missing. An owned effect with unresolved inputs retains its genuine independent purpose and **Benefit unavailable**, not unresolved tokens or a false zero. Where a next purchase is permitted, show its compact point cost using the established affordability colors. Do not show a next purchase at cap. Do not repeat investment, cap, or prerequisite checklists. Remove every shortfall label.

### Doot-specific benefit

Read active King Doot status through the existing companion API, including its existing token behavior. Do not infer activation from raw ownership alone or from one selected character.

For active Doot, show the prepared Pocket contribution as **+30% All Stat** for the retained level-two example. Keep **Divinity Lv. 2+** as compact scope context. The amount means Pocket's contribution for eligible characters, not a recomputed account-wide main stat. Render saved **Arctis / Snehebatu** identities and verified art without ordinary major-bonus paragraphs beneath them.

The original `_event_Hole` branch says: “The Divine feel their obsolescence, and grant +{allStatPercent}% ALL STAT for all your characters... may your stats loom large!” Its `Companions(0)` gate excludes characters below Divinity level two. The source establishes the meaning; the short **All Stat** label presents an existing typed value. Do not copy the caller's whole sentence into handwritten production descriptions: the generated Pocket description does not contain it.

A small Pocket-owned display accessor may expose the common known `allStatPercent` already prepared for eligible records. It must not add a formula, choose a website-selected character, recalculate imported stats, or add a character inspection surface. If the saved level or safe prepared amount is missing, show **Benefit unavailable**, not zero. If no eligible prepared value exists, retain source-backed eligibility context without inventing a total. The original sentence would require a normal static-data prerequisite if its full localization were requested; it is not required for this compact typed-value presentation.

For inactive Doot, keep saved selected gods and their genuine independent major-bonus purpose. Preserve inactive and unavailable saved slots. Do not claim duplicate activation. Do not restore character selection, alignments, eligibility lists, union/overlap inspection, separate stat inspection, or Divinity navigation.

## Schematics

Show all **105 released identities** in original order. Exclude only the unreleased slot containing Bee String, not stable building ID 105. Stable IDs are not availability slots or display prefixes.

Place Kaipu level and the next-construction Lamp discount once above the cards. Keep the existing catalogue search over name, effect, and currency, with clear and compact result count. Add exactly one **Show Owned** checkbox. It starts **checked**, preserving the prior all-visible default. Unchecking hides only known built entries; unknown ownership remains visible. Search and checkbox combine without changing canonical order. Do not add other filters, sorting, or view toggles.

Use two-column dense cards with verified schematic foreground art beside name and effect. The original caller maps `HolesInfo[40][availabilitySlot]` to stable building ID, then uses `HoleUIbuildUpg{stableBuildingId}`. All 105 released foregrounds are verified 97×97 PNGs on the existing CDN. `squareImageType` selects a separate background, not identity art. Use foreground art on the website's dark card surface; do not add the game's colored square backgrounds merely because they exist.

Expose this metadata through an initialization-owned `Schematic.getImageData()` accessor during separately approved production work. Create metadata once per instance and return it directly. Do not add generated fields, handwritten catalogue tables, public images, or asset URL construction in React.

Distinguish built, unbuilt-but-unlocked, and locked entries through restrained readable opacity and local state treatment. Built entries retain full identity/effect emphasis and have no resource area. Unbuilt unlocked entries retain readable subdued identity/effect and a current cost. Locked entries remain readable, with a lock affordance and **Requires Kaipu Lv. N**. Do not repeat **Built**, **Available**, or Kaipu checklists on unlocked entries. Keep access unknown explicitly unavailable rather than making it locked. Construction and access remain independent if unusual imported states coexist.

Built cards show neither a currency icon nor current, historical, or base construction cost. Keep **Benefit unavailable** when a built numeric effect lacks required inputs, beside its genuine independent purpose. Do not disguise an unknown benefit as resolved.

Unbuilt cards show only the compact current cost beside verified resource art. Do not repeat the resource name when art exists. Use a compact canonical name only when no verified icon exists. Show **Cost unavailable** neutrally when needed. Remove resource tooltips, exact-count disclosures, competition lists, and shortfall labels.

## Measurements

Show all **17 Measurements** in original order as two-column dense cards. Use each genuine effect as its identity; do not invent names or caps. Make its complete useful benefit the strongest text, larger and bolder than cost or contributing statistics. Pair purchased level with that effect, then show one compact named statistic with its unit and multiplier. No repeated effect sentence or synthetic next-level benefit is needed.

Show Minau level and Fountain price discount once above the grid. Keep the accepted statistic mappings and units, including Tome points, total Study levels, account/skill levels, crops, Slab items, damage, Death Note points, and Gloomie/Golem kills. Use compact game formatting, not unformatted exact counts.

Show current next cost beside verified resource art without repeating its name. Keep canonical **Bronze Coins** as compact text when no verified currency icon exists. Show required Minau level only when access is locked; keep unavailable access separate. Remove **all Measurement tooltips**, including benefit, statistic, level, exact-count, and resource disclosures. Add no search, sorting, or filter controls.

Read nullable prepared `rawStatistic`, `multiplier`, `baseBenefit`, `effectiveBenefit`, and `nextCost`. Missing statistics leave dependent benefits unavailable while independent level, access, and cost remain. Keep **Benefit unavailable** explicit and retain the genuine purpose without unresolved tokens. Known zero remains zero. Unowned rewards retain useful genuine purpose, not merely zero contribution. Remove every shortfall label.

## Affordability and integration

Use the existing Royal Armory purchase-cost colors: **green-2** for known sufficient resources and **status-critical** for known insufficient resources. Apply the same convention to schematic costs, Measurement costs, and permitted Majik point costs. Read accepted affordability or known prepared inputs; do not add formulas or fake stock. A missing input stays neutral with an unavailable value. Access and prerequisites remain independent: show the blocking requirement and do not imply that a green resource cost grants access.

Reuse `ContentTabs`, `LeftNavButton`, `ShadowBox`, `IconImage`, existing number formatters, and suitable resource primitives. Any local cost renderer must avoid tooltip behavior for these panes. Use `notateNumber` for compact game values. Remove obsolete cost-tooltip, competition, row, or state helpers only after their selected final caller is removed; preserve the actual scroll-owner helper and unrelated callers.

Keep the existing route/server wrapper, store ownership, grouped `useShallow` selections, and `lastUpdated` refresh dependency. Production scope is the selected three panes and necessary local display exposure only. Preserve current scroll-owner retention across trees, rail panes, outer tabs, and Studies. Search and Show Owned remain local controls. No formulas, discounts, currency mappings, prerequisites, god aggregation, imported stats, purchases, forecasts, new engine, generated changes, or later-part tools change.

## Fourteen-point preview and delivery checklist

1. No per-bonus Majik tooltips; only genuinely blocking requirements remain local.
2. Doot uses source-confirmed Pocket All Stat meaning and existing prepared amount, without character inspection or guessed major text.
3. No Majik Maxed labels.
4. Dense schematic cards use all 105 verified identity icons.
5. Unlocked cards have no Kaipu/Built checklist; built, unbuilt, locked, and unknown states remain distinct.
6. Resource icons replace repeated names; purchased schematics have no resource or historical cost.
7. No schematic resource tooltips, competition lists, or exact stock/cost disclosures.
8. One Show Owned checkbox starts checked; search/filter/clear preserve unknown ownership and released order.
9. Measurement costs use resource icons or a verified-icon-absent compact name fallback.
10. All 17 Measurements use dense cards.
11. No Measurement tooltips or exact-count disclosures.
12. Measurement benefits dominate cost/statistics; compare actual rendered Royal Armory Statues.
13. Costs and point affordability use established colors; unknowns stay neutral and access/prerequisites remain truthful.
14. No shortfall labels. Preserve coverage, useful unobtained purposes, missing benefits, navigation/scroll, accepted mechanics, and part 1.

Use the private Docker Playwright workflow at **1440×1000** with the retained real save. Retain actual Royal Statue and Toolbox references, preview captures, decoded-image evidence, effect/support typography, state/affordability checks, and nonzero actual-owner scroll checks. Demonstrate all three trees, all released catalogue identities, the Show Owned/search combination, no results and clear, and all Measurements. Test removed-tooltip targets and check no page-wide overflow or selected-pane exception.

Use separately labelled detached display examples for absent real-save states: locked/unbuilt, missing ownership/access/cost/statistic/benefit, verified zero, unowned reward, point shortage, prerequisite/enhancement gate, and inactive/unavailable Pocket. Do not mutate prepared source objects or the save. Such examples prove presentation only, not alternate game branches or parity.

Record exact commands, exits, browser errors, scope, and limits in the handoff. Preserve source/save/generated fingerprints. Remove owned disposable routes and executable scenarios after capture; keep private source copies and screenshots. A preview is not production implementation or acceptance. Stop for judgment before production work or commit.
