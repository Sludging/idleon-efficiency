# Research Part 1: UI plan

## Player outcome and scope

Players can read current Research growth, Observation discovery limits, actual lens production, Insight, Papers, and Posty Note rewards.

This plan delivers [Part 1 — #462](https://github.com/Sludging/idleon-efficiency/issues/462) with its accepted backend. The [product specification](research-spec-draft.md) and [delivery outcomes](research-delivery-parts-draft.md#1-account-growth-discoveries-and-lens-production) define scope. The [current handoff](research-research-brief.md#current-handoff) records approvals, current status, evidence, and limits.

Keep one read-only World 7 Research route. Use common content tabs for Observations, Lenses, Posty Notes, and Papers. Observations are selected initially. Empty search shows all 43 Observations. All 14 Posty Notes remain available in their tab. Do not add an Overview tab.

Exclude game actions, purchases, placement controls, planners, forecasts, and related-activity navigation. Point balances, the Grid catalogue, and Shape placement or coverage remain Part 2. Keep current Shape ownership only as milestone context.

## Visual direction

Use Impeccable Operate mode, with distill, clarify, and layout guidance. Preserve the incumbent Game Ledger identity: Rubik, charcoal surfaces, recognizable game artwork, and the existing theme-blue selection treatment. Use `dark-1` (#1E2127), `dark-2` (#1B1D24), text (#efefef), brand (#0376E3), and supporting grey (#BEC2CC). No new font, palette, or outer content wrapper is required.

Three compact top groups separate the Research skill, Observation discovery, and current gains. Place the skill artwork beside the plain level. Avoid one undifferentiated metric grid. Put common `ContentTabs` below these groups and render only the selected content.

Use illustrated Observation cards on `dark-1`, with medium padding and small internal gaps. Put the game artwork beside the name and map. Found cards use full opacity. Revealed but missing cards use 0.65 opacity. Unrevealed cards use 0.35 opacity. Retain these states in accessible names, without repeated visible status labels. Owned cards show current Insight level, partial EXP, a theme-blue progress bar, and actual hourly rates. Missing cards retain location hints, required roll, and the separate study requirement. Do not present the study level as a discovery gate.

Show one concise reveal-availability line only on currently hidden, not-found cards. Derive the first Research level that includes the entry in the game's visible prefix through the responsible domain visibility rule. Keep study levels independent. Found and already-revealed missing cards show no reveal line. When the first discovery remains incomplete, name that prerequisite instead of implying level alone unlocks the remaining catalogue.

Keep name/map search and three sorts: Game order, Research EXP highest, and Insight highest. Break rate ties by game index. Give Search and Sort persistent, aligned labels through shared `ComponentAndLabel` wrappers. Match both control heights at 48px. Stack their wrappers with aligned left edges on narrow screens. Keep narrow tab labels at 12px and wrap only between words. Do not add an Activity filter or a filtered-result fraction. The shared tab reads `Observations (found/total)` from actual discovery ownership. Keep this count stable during search and sorting, without repeating it in the summary.

Apply the established Insight palette to Observation artwork through `IconImage` wrapper filters. Select the current Insight level, clamped to palette indexes zero through ten. Keep the reference hue stable above level ten instead of applying the game's excess-level darkening. Use neutral grayscale at level zero; derive hue and saturation from the selected RGB entry for higher levels, with brightness 1.3. This is deliberate website artwork presentation, not a claim that the game tints its images. Keep the original sprite, CDN path, and dimensions. Use theme `brand` for progress fill and `grey-1` for its track.

Use illustrated `ShadowBox` cards for owned lenses and Posty Notes, following Sneaking's artwork/name grouping, `dark-1` surface, medium padding, and small internal gaps. Posty Notes use real colored note artwork, concise rewards, level thresholds, reached opacity, and a clear next note. Do not repeat ownership totals in every card. Pictured Shape artwork does not promise a particular next Shape.

Sources inspected: shared `ContentTabs`, `DataRow`, `TipDisplay`, `TextAndLabel`, `IconImage`; Sneaking upgrade cards; Atom Collider rows; Stamps artwork and search; and the authorized [Idleon Toolbox Research reference](https://idleontoolbox.com/account/world-7/research?profile=liiiiiiiiiiiig). The reference supports selected content, game-art recognition, and short milestone cards. Do not copy its visual style, drawers, timers, duplicate rate fields, or implementation.

## Information choices

### Top groups

- Research: account skill level, formatted Research EXP progress when available, and total Observation Insight levels.
- Observation discovery: remaining attempts, daily attempts, and inclusive roll range. Actual found catalogue count appears once in the Observations tab.
- Current gains: actual Research EXP per hour, actual Insight per hour, and current offline percentage.

Do not label level as highest saved. Do not expose character identity, saved-copy policy, provenance, source timestamps, or cloud-save explanations.

Remove failed-roll count, duplicate failure bonus/cap displays, before-multiplier production, game-displayed Insight, rule paragraphs, exact precision panels, and repeated totals. These fields remain in the backend; they do not need alternative public access.

### Source context

Attach shared `TipDisplay` directly to an affected value. A dotted underline and keyboard focus identify values with useful extra context. Observation Research EXP gets a tooltip only when its current rate is positive. Show inactive zero rates as plain text. Tooltips list concise source identities and current contributions for active sources. For inactive sources with verified reward metadata, show the obtainable reward with inactive opacity alone. Do not add inactive, acquired, or not-acquired labels. Label bare Grid rewards per level and preserve conditional units. Do not show neutral current values as unlock rewards or infer future totals.

Keep additive EXP percentages separate from actual multiplicative factors through short labels, not formula exposition. Companion factors use the backend's named groups and already-calculated factors. Offline additions use percentage points. Local Observation tooltips show actual assigned lenses, adjacent Kaleidoscope identities, support factor, and the local Insight EXP effect where useful. Do not repeat shared external source catalogues in every Observation.

### Lenses

Show current owned total, fixed-kind counts, capacity per Observation, unplaced count, and every actual owned lens target. Remove raw coordinates and IDs from visible text.

The original `MagnifiersOwned` helper clamps producer-derived ownership at 80. Source allocation/drawing uses the owned prefix of a reserved slot array. This verifies an engine/storage ceiling, not an obtainable maximum. Do not present 80 as a player target. No all-source attainable maximum is claimed. Ownership and capacity source tooltips use prepared current contributor results.

### Posty Notes and Papers

Show all 14 notes in level order. Use typed reward context for short, accurate rewards. Show current owned Shapes once with source context; do not repeat cap or uncapped totals. Show the next note threshold once. Keep ownership-sensitive no-additional-Shape context when relevant, without promising a particular pictured Shape.

Separate consumable Half Finished Research Papers from permanent Professional Papers. Consumables show inventory, artwork, and the two-hour progress grant including Minehead Currency. Permanent Papers show purchase count and offline percentage-point bonus. Do not add use/purchase controls, pending-save explanation, or balances for other activities.

## Data and responsibility

Keep the route wrapper and metadata in `app/world-7/research/page.tsx`. Render the current client component directly. Keep tab, search, and sort state in `components/world-7/research/researchContent.tsx`.

Use `useShallow` with `lastUpdated` to refresh the mutable domain. Wait for completed StaticData or LiveData before displaying prepared values. Do not mutate domain data or add formulas to pass display checks.

Reuse all existing prepared backend totals, parsing, account progress, ownership, contexts, and producer results. Observation owns separate revealed-prefix and study state. Research contributor display metadata owns intrinsic rewards and acquisition state; current contribution arithmetic remains unchanged. Keep the source-backed Insight palette beside its narrow artwork-presentation method. Preserve the existing source progress-color metadata and numerical results. Do not edit generated data or public assets. `IconImage` resolves verified image metadata through the existing CDN.

Research owns the reveal requirement accessor. Reuse the same prefix calculation used by current visibility and numerical consumers; do not add UI formulas, per-entry reveal tables, or index interpolation. The narrow accessor does not change parsing, production arithmetic, or generated study metadata.

## Verification and boundary

Use the normal private real-save fixture and Docker runner. Update the existing production scenario for three card states, stable discovered tab counts, labeled controls, sorting, image tint, themed bars, and inactive rewards. Compare the complete backend snapshot with retained accepted evidence, projecting only the existing semantic metadata differences and the narrow artwork presentation value. Preserve the save and shared stack.

Exercise all four tabs, all 43 default cards, name/map search, empty result, reset, highest-rate sorting, stable ties, actual rates, and image loading. Verify the real 24/43 found count stays unchanged across search and sorting. Check the real Reef's revealed state and separate level-72 study requirement. Verify computed artwork filters at low and high real Insight levels, original image paths/dimensions, and consistent themed progress colors. Confirm found, revealed-missing, and unrevealed opacity at desktop and narrow widths. Check persistent aligned Search/Sort labels and absence of visible repeated statuses or Activity controls. Confirm no zero-rate EXP tooltip and a working positive-rate tooltip. Read genuine inactive Event Shop and Jelly rewards with opacity and no inactive text. Preserve note rewards, summaries, lenses, and Papers. Check overflow and Research-attributed errors. Assert absence of native disclosures, page links, provenance, precision reveals, and repeated mechanic prose.

Verify every genuinely hidden entry against source-backed tier boundaries. In the retained level-70 save, indices 34–37 reveal at 80, 38–41 at 90, and 42 at 100. Check actual rendered reveal-line absence on all found and revealed-missing entries at desktop and narrow widths. Compare the complete backend with the immediately preceding presentation result without adding numerical projections. Preserve the existing search, sorting, source-tooltip, image, opacity, and layout assertions.

Inspect desktop and narrow screenshots together. Record scoped type/lint results, density measurements, inherited errors, unobserved real-save branches, and source/live-version limits in the handoff. Keep captures and account evidence private. Rendered checks establish the exercised surface, not certification or fresh connected-game parity.
