# The Hole part 2: UI plan

## Player outcome

Let players scan **Upgrades → Majik / Schematics / Measurements** to understand owned benefits, available upgrades, requirements, and competing resources. Put each benefit beside its progression. Pocket Divinity shows the saved selected bonuses only; the dedicated Divinity page owns character alignments.

Scope follows [#442](https://github.com/Sludging/idleon-efficiency/issues/442), the [part 2 outcomes](hole-delivery-parts-draft.md#2-schematics-majik-and-measurements), and the [accepted backend](hole-part-2-backend-plan.md). The latest selected human direction in the [current handoff](hole-research-brief.md#current-handoff) governs this UI. Backend information is not a display checklist.

## Sources and mechanic meaning

- Kaipu makes schematics available. Construction is a separate state and spends the named resource. Lamp discounts the next construction. Built schematics have no next construction price.
- All three Majik trees spend one point pool. A first purchase grants one level. **Cosmo, Enhance!** allows additional levels within each prepared cap. Prerequisites and point sufficiency remain separate from ownership.
- Pocket keeps saved canonical god selections. Display their genuine selected-bonus text without claiming an extra activation or a character-specific result.
- Minau unlocks Measurements. Their purchased levels and measured account statistics determine prepared benefits. Lengthmeister affects benefits; Fountain affects prices. Missing inputs are not zero.

Reuse the [Hole vocabulary and mechanic evidence](hole-research-brief.md#kaipu-construction-is-not-unlock), [official Wiki camp context](https://idleon.wiki/wiki/The_Caverns#Camp), supplied static descriptions, and accepted prepared domain APIs. Existing game evidence establishes meanings and units. Preview data does not establish new game parity.

Use [IdleonToolbox's public Hole page](https://idleontoolbox.com/account/world-5/hole?profile=liiiiiiiiiiiig), reached through Account → World 5 → Hole, for content reference. Engineer provides construction identities, purposes, states, and costs. Bonuses groups the three Majik trees. Measure connects effects with purchased levels and measured statistics. Do not copy Toolbox's styling, ETA, default hiding, placeholders, or source-only Bee String.

## Composition and website references

Keep the existing Rubik typography, charcoal surfaces, blue selection, and verified game artwork. Use the shared page wrapper without another content width or horizontal inset. Preserve **Villagers / Upgrades / Caverns**, the **Majik / Schematics / Studies / Measurements** rail, and its existing 25% / 75% layout. Preserve completed part 1, shared Hole resources, Studies, and all cavern identities.

Use actual rendered **Sneaking Upgrades** at `/world-6/sneaking` as the Majik card reference. Match its close image/name/level relationship, dark-1 surface, medium card padding, and small internal gaps. Keep two columns within the narrower Hole pane; Sneaking's column count and purchase fields are not requirements.

Use actual rendered **Atom Collider** at `/world-3/construction` as the repeated-row reference. Match aligned benefit, current/cap, and cost relationships, compact label/value typography, small row padding, and small row gaps. Use `DataRow` without overriding its owned shell or alignment. Feature-specific field widths remain local.

The [UI guide](../agents/ui-patterns.md), [row guide](../agents/ui-rows.md), and [UI feedback](../insights/ui-feedback.md) govern composition. Retain `ContentTabs`, `LeftNavButton`, `TipDisplay`, `IconImage`, existing number formatters, and resource displays where suitable. Use `notateNumber` for compact game values and `commaNotation` for exact counts. Use domain image metadata; do not invent schematic, node, or currency artwork.

Keep one incumbent portrait/pane title. Remove additional subsystem introductions, repeated tree/count headings, state paragraphs, repeated effect sentences, field checklists, audit panels, and explanations of website purchase limitations. Use one shared summary per subsystem. Keep inactive content readable; use restrained state emphasis rather than heavy dimming.

## Majik

Show one compact **remaining / earned points** summary above the Hole, Village, and Idleon tree tabs. Its local tooltip shows invested points and purchased-point contributions. Purchased points are included in earned points. Read the authoritative pool; do not reconstruct it from the visible released nodes.

Show all **17 released upgrades**, in game order: **5 Hole, 6 Village, 6 Idleon**. Exclude Confused Bonus placeholders without removing their investment from pool accounting.

Each two-column card groups the game identity, **level / current cap**, and genuine benefit closely. Show its complete useful game effect once. Keep unowned purpose or reward text useful; do not replace it with zero contribution or invent a next-level benefit. Keep multi-effect and nonlinear prepared benefits intact without adding a duplicate typed-effect list.

A level tooltip contains initial versus enhancement investment, the named preceding requirement and its state, full enhancement cap, and the **Cosmo, Enhance!** requirement when relevant. This distinguishes a current cap of one from the final enhancement allowance without separate visible fields. Show unmet named prerequisites and missing points beside the affected card. Reserve **Maxed** for the final enhancement cap. If the current cap blocks further levels, show the enhancement requirement instead. Keep locked and unowned upgrades visible.

### Pocket Divinity

Keep saved selections inside the owning Idleon Majik card. Show canonical god names, verified god artwork, and useful genuine selected major-bonus text. Preserve saved slot identity and distinguish inactive or unavailable selections. Do not show a numeric raw god ID as a name.

Do not add character selection, ordinary or secondary alignments, Doot eligibility, effective/overlapping/added god lists, a union explanation, or separate All Stat inspection. Do not add a Divinity deep link or another inspection surface. Do not derive an account-wide numeric god benefit from one character's record. Where selected text needs an unavailable input, retain the genuine independent purpose and a local unavailable state without unresolved placeholders.

## Schematics

Show all **105 released schematics** in game order, including built and locked entries. Exclude Bee String. Stable building IDs do not become display prefixes or unlock rules.

Place Kaipu's saved level and the active **next construction discount** together once. Its local tooltip can explain the saved Lamp stacks and their next-construction meaning. Do not repeat discount multipliers or construction-consumption prose across rows. A known zero discount differs from missing data.

Keep one search over game name, effect, and currency because the catalogue has 105 entries. Do not add ownership filters, show-unlocked controls, sorting, or view toggles. Show the result count compactly. A no-result state needs only a clear result and the existing search clear action.

Each `DataRow` groups identity, useful genuine benefit or unobtained purpose, and concise **Built / Available / Locked** state. Keep Kaipu requirements local. Availability and construction remain independent: a built item can still have an unavailable access state. Do not repeat a state as a full sentence.

Unbuilt rows show the named current discounted cost and any shortfall. Built rows show **Built**, not a fake next cost or catalogue base price. Use verified resource artwork beside the named currency. Never substitute an unrelated icon for absent artwork.

Attach a useful local resource tooltip to the row's cost/resource. Include exact stock, current cost, shortfall, and other released schematic/Measurement uses of that wallet. Identify competing entries and their built/locked state and current prices where available. Do not reserve funds, sum speculative future purchases, or imply that individually affordable purchases are affordable together. Remove full-width shared-wallet audit disclosures.

## Measurements

Show all **17 Measurements** in game order. Use the genuine effect to identify the reward and pair it directly with purchased level. Keep the corresponding named raw statistic, units, and multiplier compact and aligned. Repeated statistics do not make different rewards interchangeable. Do not invent Measurement names or a cap.

Show Minau's saved level and the **Fountain price discount** once above the list. Do not repeat the discount or an access paragraph on every row. No extra sorting, filter, search, or view controls are needed for this list.

Each `DataRow` contains the useful genuine effect beside its level, the measured quantity with its unit and multiplier, and the next named resource cost with any shortfall. Show the required Minau level when locked. Use the existing `requiredMinauLevel` accessor. Use local tooltips for exact statistics, useful base-benefit/Lengthmeister contributors, access detail, and resource competition. Do not show normalized quantities, formula derivations, duplicate effects, or full-width audits.

Keep the established statistic meanings: Tome score is points, account level is levels, total Study levels are Study levels, and all skill levels are levels. Slab items, crops, Gloomie kills, Golem kills, highest recorded damage, and Death Note points retain their own identities and units. The generated row-to-statistic mapping remains authoritative for all 17 rows.

Read nullable prepared `rawStatistic`, `multiplier`, `baseBenefit`, `effectiveBenefit`, and `nextCost`. Missing statistics leave dependent benefits unavailable, while independent level, access, and price remain visible. Verified zero remains zero. An unowned reward retains useful genuine source purpose rather than only a zero contribution. Do not invent hypothetical next-level values. Bronze Coins keeps its canonical name even when no verified icon exists.

## Integration and boundaries

Keep the existing route/server wrapper and prepared store data. Use `useShallow` for grouped displayed selections and retain `lastUpdated` for mutable-domain refresh. Limit eventual production changes to the three panes and their necessary local/shared display. Remove obsolete Pocket inspection UI and audit helpers when their final caller is removed; retain unrelated callers and domain calculations.

No domain formula, pool accounting, currency mapping, prerequisite, discount, statistic, god aggregation, or consumer calculation changes are needed. Keep supplied generated files and existing verified image accessors unchanged. Reuse existing static descriptions and owner APIs. Missing game-owned static data requires the normal extraction prerequisite, not handwritten replacements.

Keep navigation local. Tab changes must preserve scroll without automatic focus or owner scrolling. Shorter panels must not force a scroll jump; preserve sufficient local panel extent where needed. Keep search state local. Do not add cross-content deep links, purchases, allocation controls, forecasts, ETA, recommendations, a new engine, later-part tools, or another Divinity page.

## Verification and preview

Use the private Docker Playwright workflow at **1440×1000** with the real imported save. Compare actual rendered Sneaking cards and Atom rows before judging the preview. Retain reference captures, preview captures, useful dimensions, and comparison notes in the handoff.

Exercise all three trees and the unchanged pool; confirm **17 Majik / 105 schematics / 17 Measurements**. Confirm Pocket saved identities, decoded game imagery, genuine selected text, and absence of the removed character/eligibility/alignment/stat controls. Exercise useful pool/level/effect/resource tooltips, schematic search/clear/no-results, local resource competition, named costs/shortfalls, and tab scroll preservation. Check no horizontal overflow, cross-content deep links, repeated effect sentences, or full-width audit disclosures.

Demonstrate locked, available, built, unowned, maxed, insufficient-resource, missing-input, and verified-zero states. If the real save lacks a state, label a separate display-only example and leave the original prepared domain unchanged. Such examples prove presentation only, not alternate game branches. Record browser errors and command exits without claiming clean results from scoped assertions alone.

Keep private saves and artifacts private. Remove owned disposable routes and executable scenarios after capture; retain private source copies and screenshot/report references. A preview proves composition and exercised interaction, not production implementation or new game parity. Production changes require a separate approval gate.
