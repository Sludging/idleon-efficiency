# The Hole part 2: UI plan

## Player outcome

Let players inspect camp upgrades in **Upgrades → Majik / Schematics / Measurements**. Show what they own, what is available, what each purchase requires, and which purchases share saved resources. Pocket Divinity must explain the result for each imported character without counting a god twice.

Scope follows [#442](https://github.com/Sludging/idleon-efficiency/issues/442), the [approved outcomes](hole-delivery-parts-draft.md#2-schematics-majik-and-measurements), the [accepted backend plan](hole-part-2-backend-plan.md), and the [canonical navigation](hole-ui-information-architecture.md#upgrades). Approval and preview evidence belong in the [current handoff](hole-research-brief.md#current-handoff).

## Mechanic and source meaning

Players use the campfire to inspect the rescued villagers' systems. These upgrades are related, but their progression and spending rules differ.

- **Schematics:** Kaipu's saved level makes more schematics available. Availability is not construction. Construction spends a named Hole currency. The active Lamp discount applies to the next construction. Built schematics provide numeric effects or unlock rules; some numeric effects depend on saved resources or completed progression.
- **Majik:** Cosmo levels and purchased extra points supply one pool across Hole, Village, and Idleon Majik. A first purchase grants one level. **Cosmo, Enhance!** allows further levels, up to each upgrade's cap. Hidden placeholder investments still consume points; placeholders are not released useful upgrades.
- **Pocket Divinity:** Saved selected gods, ordinary links, secondary links, and effective Doot can overlap. Show their union, not duplicate god activations. Doot requires the character's Divinity eligibility. Show Pocket's character-bound All Stat contribution separately. Do not recalculate imported main stats or imply that website inspection switches the game's active character.
- **Measurements:** Minau's progression grants access. Resource purchases increase a Measurement's saved level. Its owned benefit combines that level, the prepared Lengthmeister effect, and a multiplier from a named account statistic. The raw statistic and normalized quantity are different values. Fountain can reduce the next price.

Sources: [official Wiki camp descriptions](https://idleon.wiki/wiki/The_Caverns#Camp), [accepted mechanic contract](hole-part-2-backend-plan.md#required-mechanics), supplied generated metadata, and prepared `Schematic`, `Majiks`, `CosmoUpgrade`, `PocketDivinityUpgrade`, and `Measurement` APIs in `data/domain/world-5/hole/hole.tsx`. The Wiki establishes player context, not personalized numerical parity. Accepted backend evidence remains authoritative for this selected calculation layer.

## Layout and existing patterns

This is a local extension in the existing **Game Ledger** visual world, in Operate/Read mode. Keep Rubik, charcoal surfaces, existing blue selection, and game imagery. Do not add a hero, new visual system, page-width wrapper, dashboard, view-mode switch, or delivery-part navigation.

Preserve current Hole presentation outside the three selected upgrade panes. Keep exactly **Villagers / Upgrades / Caverns**, in that order. Keep the existing left selection **Majik / Schematics / Studies / Measurements** and its current 25% / 75% composition. Preserve completed Villagers, all Studies, the compact shared resources, Players/Obols navigation, and all 18 named cavern identities and artwork.

- Reuse `ContentTabs`, `LeftNavButton`, `ShadowBox`, `TextAndLabel`, `TipDisplay`, `IconImage`, existing number formatters, and resource displays where compatible.
- Use `DataRow` for aligned schematic and Measurement records. Preserve its owned padding, field alignment, typography, and details API. Rows wrap within the existing pane; no extra outer width or inset.
- Use dense two-column Majik cards. Follow Sneaking's identity/details grouping, dark-1 surface, medium padding, and small inner gaps. This does not copy its feature-specific fields or controls.
- Put a villager portrait beside each subsystem heading. Put verified Majik tree art beside its tree heading, god art beside Pocket identities, and resource art beside costs. Use domain image metadata through `IconImage`; never build feature CDN URLs in production components.
- Retain ordinary feature title and existing snapshot context. No animation, new global controls, or responsive support expansion is required.

The [UI guide](../agents/ui-patterns.md), [DataRow guide](../agents/ui-rows.md), existing `app/world-5/hole/content.tsx`, and [DESIGN.md](../../DESIGN.md) govern these choices.

### IdleonToolbox reference

Locate **Account → World 5 → Hole** at the [public-profile Hole route](https://idleontoolbox.com/account/world-5/hole?profile=liiiiiiiiiiiig). Inspect **Engineer**, **Bonuses**, and **Measure**.

- Engineer pairs game imagery, schematic descriptions, construction state, and resource costs. Its **Show all schematics** control makes owned entries visible.
- Bonuses groups the three Majik trees and shows investment against caps with game tree imagery.
- Measure pairs effective effect, purchased level, base effect, multiplier, measured statistic, and resource cost.

Reuse those useful information relationships, not Toolbox styling or layout. Keep this website's selected navigation and shared components. Do not copy its ETA, default hiding of owned entries, placeholder cards, unexplained balance/cost pair, or source-only Bee String. The public profile's values are reference content, not our paired-save evidence.

## Majik

### Shared summary and trees

Show **earned points**, **invested points**, **remaining points**, and **purchased extra points** once. Purchased points are part of the pool, not an additional spendable balance. Keep this summary unchanged when switching trees. Preserve unavailable totals rather than summing only visible upgrades.

Use three local `ContentTabs`: **Hole**, **Village**, **Idleon**. Show all 17 released named upgrades across the trees in game order: 5 Hole, 6 Village, and 6 Idleon. Do not show the 16 Confused Bonus placeholders. Do not subtract their saved investment from the domain's invested total. Keep placeholder accounting in technical documentation, not player-facing text; the displayed pool remains authoritative.

Each card shows:

- Game name, owned level, and the complete current game description with resolved values. Show the description once in the card, not again in expanded details.
- Initial level, enhancement levels, current cap, and full enhancement cap as separate facts. A current cap of one is not the upgrade's final enhancement cap.
- Named preceding upgrade and whether its requirement is met. Root entries have no preceding requirement.
- Enhancement allowance and the **Cosmo, Enhance!** gate where relevant.
- Required points for the next permitted purchase and current pool sufficiency. Maxed entries say **Maxed**; they do not imply another purchase.
- Expanded **Owned effects** details contain distinct typed effect values and units, including all Profoun-tain effects and Beeg Beeg Forge's prepared nonlinear multiplier. Do not repeat the card's description, calculate effects in the frontend, or parse numbers from description strings.

Unowned upgrades retain their generated purpose, but label their benefit as not owned. Do not present a hypothetical next-level value as current. Locked and maxed entries remain visible.

### Pocket Divinity

Keep Pocket beside its owning Idleon upgrade, not a new top-level destination. Show saved slots and canonical god names/art even when selections overlap. Preserve slot identity, inactive slots, unavailable selections, and upgrade ownership.

Provide a read-only character selector over every imported character. Show:

1. Ordinary primary and secondary linked gods, separately.
2. Doot eligibility for this character.
3. **Pocket activation** availability and which saved slots apply.
4. Gods already active through another source, and gods added by Pocket.
5. Effective god set, without duplicates.
6. Pocket's All Stat contribution, separately from god activation and imported character stats.

Use canonical Divinity god names, never raw IDs. Keep an explicit no-duplicate explanation beside overlap. Missing link state leaves only dependent results unavailable; it does not imply no links. Character selection changes inspection only.

## Schematics

Show the complete released catalogue in game order, including locked and built entries. Exclude Bee String and other unavailable source-only content. Keep stable building IDs distinct from display order.

Place Kaipu's saved level, the active next-construction discount stacks, and the prepared price multiplier above the catalogue. State that construction consumes the discount in game; this read-only view does not consume it. A known zero stack is valid and must not look missing.

Use search over generated name, description, and currency. Add **All / Unbuilt / Built** state selection and optional **Show unlocked**, initially off. Show result count. No result text explains how to clear search or filters. Search/filter state stays local to this subsystem.

Each row shows identity/art where verified, availability/construction state, the complete current game description as owned benefit or inactive purpose, and its named currency. Show the description once in this visible benefit area. Row details expose only distinct information:

- Required Kaipu level and saved access state. **Available** and **Built** remain separate facts.
- Typed intrinsic/effective numeric or discrete effects. A built unlock is an owned rule, not an invented rate. Missing effect inputs show an unavailable reason. Do not repeat the description in details.
- Current discounted cost, spendable stock, and shortfall for an unbuilt schematic. Built entries say **Built; no next construction cost**. Do not display catalogue base cost as a current price.
- Exact resource count behind compact formatting where needed.
- Same-currency competition: the other released schematic and Measurement purchases that use this saved wallet. List their identities and current costs where available. Keep built/locked status truthful. Do not sum future purchases, reserve funds, or imply all individually affordable purchases can be bought together.

Keep resource competition local to this disclosure. No later-part cavern tooling or owner-scroll/deep-link system is introduced.

## Measurements

Show all 17 rows in game order. Use the statistic identity as the row heading and the complete current game effect text once in its visible benefit area. That effect text distinguishes rows with repeated statistics; do not invent Measurement names or repeat its static sentence in expanded details. If the current effect cannot be resolved, retain the source effect identity and a separate unavailable state without unresolved placeholders. Search game effect text, statistic, and currency. No extra sorting or view toggle is needed.

Show Minau's saved level and access context. Each row pairs purchased level/access, raw measured statistic with units, multiplier, owned effective benefit, and next named-currency cost with stock/shortfall. Keep each pair readable rather than displaying unexplained percentages.

| Row ID | Measured statistic | Unit |
|---|---|---|
| 0 | Tome score | points |
| 1 | All skill levels | levels |
| 2 | Death Note points | points |
| 3 | Slab items | items |
| 4 | Crops | crops |
| 5 | Highest recorded damage | damage |
| 6 | Account level | levels |
| 7 | Slab items | items |
| 8 | Tome score | points |
| 9 | Gloomie kills | kills |
| 10 | Total Study levels | Study levels |
| 11 | All skill levels | levels |
| 12 | Account level | levels |
| 13 | Death Note points | points |
| 14 | Highest recorded damage | damage |
| 15 | Golem kills | kills |
| 16 | Slab items | items |

Row IDs above are implementation coverage, not extra player-facing numeric prefixes. Labels may expand generated abbreviations, but must keep the same meaning.

Each row's details show exact raw statistic, normalized quantity, level-derived base benefit with Lengthmeister context, multiplier, typed effective benefit, access requirement, **Fountain price discount**, currency stock, current cost, and shortfall. Do not repeat the visible game effect sentence. Label base versus effective benefit explicitly. The domain's base benefit already includes its prepared camp modifier; do not multiply it again in the view.

Use nullable public `rawStatistic`, `normalizedQuantity`, `multiplier`, `baseBenefit`, `effectiveBenefit`, and `nextCost`. Never read legacy numeric fallback fields to render a missing statistic. If a statistic is missing, preserve independent purchased level, access, and price information. Keep verified zero-level benefits as zero. Bronze Coins must resolve through the supplied currency identity, not `Unknown30`.

The accepted domain prepares access from `minau.level > measurement.index`, but does not expose the required level as a named field. Expose that existing threshold through a small Measurement-owned `requiredMinauLevel` accessor during approved UI delivery. This names the existing rule; it does not change access or add a new calculation. The preview retains prepared access, saved Minau level, and the existing next-unlock context without inventing a missing field.

## Integration and boundaries

Read prepared Hole data from the existing app store. Select displayed values with `useShallow` and retain `lastUpdated` for mutable-domain refresh. Keep the existing route/server wrapper. Limit client changes to the three selected panes and their needed local display components.

Keep formulas, pool accounting, prerequisites, discounts, currencies, effects, access, and Pocket aggregation in the accepted domain. Add only verified `getImageData()` accessors where the selected concept lacks one. Use delivered metadata or observed static game asset identity/dimensions. Do not add generated fields or run WikiBot during UI work. If an image cannot be verified, use verified heading/resource/god imagery without substituting a false entity icon.

Use generated descriptions only. Normalize presentation separators and replace only resolved placeholders. When required inputs are absent, show typed unavailable state and genuine independent text; do not leak unresolved placeholders or author a replacement game effect. Use direct player-facing labels such as **Description**, **Effect**, **Fountain price discount**, and **Pocket activation** where needed. Keep generated-data provenance and placeholder accounting in technical documentation, not labels, disclosure titles, or player help.

No purchases, allocation editor, forecasts, ETA, recommendations, live scene reconstruction, snapshot-to-now growth, new domain engine, or later-part implementation belongs here.

## Material states and verification

Distinguish loading/unavailable account data, missing inputs, verified zero, locked, available/unbuilt, built, maxed, insufficient stock, and no search results. Do not infer a game lock from missing data. Keep all released entries visible by default.

Use the private Docker Playwright workflow at desktop 1440×1000. Demonstrate all three Majik trees and their one pool, every Pocket character's inspectability, the complete released schematic catalogue, currency competition, and all 17 Measurement rows. Exercise tree/rail selection, search/filter/clear, row details, exact-count disclosure, character selection, and unavailable states. Inspect rendered screenshots and relevant browser errors. Confirm static game imagery loads and no page-wide overflow occurs.

For the selected clarity paths, open schematic, Majik, and Measurement details and confirm that each row/card contains its complete game description or effect sentence only once. Confirm details retain distinct typed effects, exact counts, costs, modifiers, requirements, availability, and shared-wallet information. Check all three tree summaries against the same authoritative pool. Inspect Pocket activation and Fountain price discount labels. Confirm implementation/audit terms and placeholder accounting do not appear in player-facing text.

A preview demonstrates information hierarchy and read-only interactions, not production implementation or new game parity. Real-save captures and display-only state examples must stay explicitly separate. Preserve the source save. Remove disposable route/scenario after capture; retain private source copies, screenshots, and reports for judgment. Production implementation needs separate approval.
