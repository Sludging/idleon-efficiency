# Minehead: product specification

- **Status:** Approved for implementation; selected as one end-to-end delivery part. No implementation has started. Existing approved page scope remains Overview, Upgrades, and Opponents. The 2026-10-20 approval adds only the remaining/daily-allowance ratio to the existing Daily tries field.
- **Scope source:** [Approved research brief](minehead-research-brief.md). **Selected delivery part:** [Approved one-part plan](minehead-delivery-parts-draft.md).
- **Related issues:** Open [#481 — Minehead: upgrade bonuses, costs, and Menagerie doublers](https://github.com/Sludging/idleon-efficiency/issues/481) remains separate calculation-correctness work and is unchanged. Closed [#390](https://github.com/Sludging/idleon-efficiency/issues/390) is historical calculation work, not the page issue. No separate Minehead UI issue exists; this local draft remains unpublished.

## Problem statement

Minehead's existing page exposes account resources, upgrades, and opponents, but players need a more useful and readable presentation of upgrade affordability, opponent rewards, and shared progress. The requested corrections refine this existing read-only experience without expanding its feature scope.

## Solution

Revise the one World 7 Minehead page using existing domain APIs, verified game assets, and established site patterns. Keep all game calculations in the Minehead domain and keep all three player outcomes together in one end-to-end delivery part.

## User stories

1. As a player, I want to see Mine Currency, its hourly gain, and my Minehead progress together, so I can understand my current account state quickly.
2. As a player, I want every upgrade's effect, unlock requirement, next cost, and useful bulk cost with clear affordability, so I can understand my available progression without a calculator.
3. As a player, I want a compact view of every opponent, its reward and progress state, and current and next opponent bonuses, so I can understand both earned and upcoming rewards.

## Product scope and UI information needs

1. **Overview:** Show Mine Currency and its native hourly gain together, plus daily tries as saved remaining attempts over the native daily allowance, opponents beaten, maximum lives, and base damage. Preserve the exact saved remaining value, including values above allowance. Remove the redundant Overview heading. Use Sushi's compact currency/rate treatment and above-tab summary placement; use Spelunking's compact metric grouping only where it fits.
2. **Upgrades:** Show every real upgrade in the existing shared `UpgradeTable` with its opt-in `panel` variant, using Sushi's actual panel implementation as the reference. Include upgrade image, level, native maximum where capped, effect description, Research requirement only while locked, next cost, and bulk cost. For capped upgrades show cost-to-max; for uncapped upgrades show next-ten cost. Reuse existing affordability colors for both prices. Do not repeat numeric effect prefixes already represented in descriptions. Follow the native cap rule: maxima below 999 are capped; values of 999 or greater are uncapped markers, not displayed maximums.
3. **Opponents:** Show all opponents in a dense card grid with grey header bands, following Jelly Operator obstruction cards. Use the established 0.76 opacity for future entries and full opacity for completed/current entries; omit “Status” text. Keep the current opponent readable and use the gold border/tinted treatment shown for Jelly's current obstruction, without implying the two progressions are the same. Preserve opponent indexing and order. Show each opponent's game image, maximum HP, Depth Charges, and source-owned reward description. Show current and next opponent bonuses locally using Jelly's current/next summary grouping, not its feature-specific fields or labels.
4. **Reward filter:** Omit only opponent reward entries whose source description begins `Nothing... yet...` from the displayed UI list. Do not change generated records, opponent identities, indices, sort/order, or reward calculation and consumer behavior.
5. **Game imagery:** Show opponents with source-verified `MineH${data.displayId}` CDN images; show upgrades with index-based `MineUpg` artwork. The implementation must check all 32 opponent and 30 relevant upgrade assets using actual image headers and rendering. Mine Currency has no confirmed dedicated native sprite; show the existing standard repository UI currency symbol/glyph alongside an explicit Mine Currency label. This is a UI glyph, not native game artwork. Do not invent an asset, construct URLs, add files under `public`, or edit generated data.

## Implementation decisions

- Keep the registered account-owned Minehead domain and its existing APIs. Parse account `Research[7][8]` at the existing Minehead boundary and expose remaining state through existing domain public-state/getter conventions. Preserve the existing allowance API and its callers; keep new costs, game rules, and reward summaries domain-owned; UI performs presentation and the narrow placeholder-reward filter only.
- Reuse `UpgradeTable` with `variant="panel"` and its required table props (`tableName`, `columns`, `data`, `primaryKey`, `filters`, `onFiltersChange`, `sortOptions`), following the actual Sushi caller. Keep Minehead's feature-specific columns/data and preserve shared-table default rendering and other consumers.
- Do not add Minehead-specific search, sorting, or other controls. Supply the shared table's required state while preserving the requested table order and existing entry visibility.
- Add one domain-owned bulk-cost result using Minehead's existing single-level formula with explicit target-level input. Cost-to-max sums remaining purchases; next-ten sums up to ten available purchases. Hold current saved modifiers fixed across terms, including upgrade 26's discount; this quote does not simulate buying levels or mutate saved state. Preserve cost discounts, affordability semantics, native capped versus uncapped distinction, and existing next-level cost behavior.
- Use generated Minehead metadata and existing model wrappers as-is. Keep opponent filtering as a view concern so source IDs and all domain consumers retain their original behavior.
- Use existing image wrappers such as `getImageData()` only after each asset mapping is verified. Do not add new CDN URL conventions or handwritten copies of generated records.
- Follow current account summary, page layout, and table/card family conventions. Do not redesign unrelated Minehead sections or shared components beyond the opt-in table variant already requested.

## Acceptance outcomes

1. Mine Currency uses the standard UI currency graphic alongside its explicit label; opponents and upgrades display their verified existing images.
2. Upgrade rows use the shared table's new opt-in panel presentation; existing default table consumers remain unchanged.
3. Research requirement appears only while an upgrade is locked. Unlocked upgrades show cost-to-max when capped and next-ten cost when uncapped.
4. Next and bulk costs use existing affordability colors and correct available-purchase counts.
5. Upgrade effect descriptions do not duplicate numeric prefixes.
6. Uncapped maximums follow native maximum semantics, not rounded display values.
7. Overview has no redundant heading and follows the established Sushi/Spelunking summary typography and grouping; Mine Currency and hourly gain are grouped together.
8. Opponents use the dense grey-header card-grid composition from Jelly Operator.
9. Opponents have no “Status” text; earned/future state uses established opacity while current opponent remains readable.
10. Current opponent uses the Jelly obstruction gold treatment without changing progression indexing.
11. Opponents section shows current and next bonuses locally using the Jelly obstruction summary pattern.
12. Only placeholder “Nothing... yet...” reward entries are filtered from UI display; original records, IDs, order, and reward consumers remain unchanged.
13. The existing Daily tries field displays saved account remaining attempts over native daily allowance, preserving the exact numerator without deriving it from used attempts or clamping it.

## Testing decisions

- Keep Minehead core assertions for public results backed by matching game values. Add direct parameter comparisons for native next-level cost and its direct inputs, including same-domain calculations. Use configured tolerance `0` and repository matchers.
- Verify bulk sum/cap arithmetic with independent literal examples derived from the captured source/spec, not expected totals recomputed through the production helper. Pure class input variation is valid; do not fabricate saves, refresh a save, or claim a native bulk transaction exists. Confirm upgrade 26's current discount remains fixed throughout its read-only quote, without simulating purchases.
- Parse and expose `Research[7][8]` as account-scoped remaining attempts at the existing Minehead boundary. Keep the existing native-equivalent daily-allowance API and callers unchanged; render only the requested ratio in the existing Daily tries field.
- Cover the UI-only reward filter with behavior assertions that preserve source objects, indices, and original order while omitting only matching placeholders.
- Preserve and run focused existing Minehead and downstream consumer suites during implementation. Use the repository private Docker Playwright workflow on the loaded local save to inspect all three sections, costs and affordability states, current/next bonuses, images, tabs, and runtime errors. UI checks do not establish calculation correctness.
- Add core assertions plus matching parameter/extraction comparisons for parsed remaining attempts and the existing allowance. Cover zero preservation, reparsing, and saved remaining values above allowance without clamping. Use honest offline evidence; the failed compound runtime query provides no numeric pair.
- Do not claim public-account validation, broad responsive coverage, or unrelated full-suite coverage.

## Out of scope

Upgrade calculators or purchase actions; filters or controls beyond removal of placeholder reward entries; authored descriptions; new game data exports unless verified data is genuinely absent; changing opponent reward semantics or progression; changes to #481; broad responsive redesign; unrelated page, domain, or shared-component redesign.

## Further notes

The current handoff records historical implementation evidence separately from this approved revision. Image decisions are settled as specified above; implementation must verify complete opponent and upgrade asset coverage. Approval authorizes implementation of this revision, not changes to its scope.
