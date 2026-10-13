# Research Part 1: UI plan

## Player outcome and scope

Players can read current Research growth, discovery limits, lens production, Insight, offline gains, Papers, and milestone rewards together.

This plan delivers [Part 1 — #462](https://github.com/Sludging/idleon-efficiency/issues/462), using its accepted backend. The [product specification](research-spec-draft.md), [delivery part](research-delivery-parts-draft.md#1-account-growth-discoveries-and-lens-production), and [backend plan](research-part-1-backend-plan.md) define the information boundary. The [current handoff](research-research-brief.md#current-handoff) records decisions and preview evidence.

Use one read-only World 7 Research page. Show all 43 Observations and all 14 Posty Notes by default. Search Observations by name or map. Do not add a second view, a filter, or a tab set for this part.

Exclude game boards, placement controls, discovery actions, purchases, planning, forecasts, and activity navigation. Point balances, the Grid catalogue, and Shape placement or coverage remain Part 2. Shape ownership and cumulative Point milestone context appear only to explain Posty Notes.

## Direction and established patterns

Use Impeccable's Operate mode within the existing **Game Ledger** visual system. Preserve Rubik, charcoal surfaces, theme colors, and game artwork. Familiar list structure serves the player task better than a new visual identity.

Follow [UI patterns](../agents/ui-patterns.md) and [Data rows](../agents/ui-rows.md). Use the ordinary feature heading and inherited app content wrapper. Do not add another content width, centering rule, or outer horizontal inset.

- Use `TextAndLabel` for account totals and simple named values.
- Use `DataRow` for Observations, actual lens placements, and Posty Notes. Stack rows with `Box gap="small"`. Keep the component's shell and typography.
- Keep identity, game artwork, current values, and requirements aligned. Put hints, conditions, relationships, and contributors in always-visible row details.
- Use plain `dark-1` sections for singleton production, ownership, and offline summaries. Do not make every stat a separate card.
- Reuse the existing Observation-style search control from Stamps. Filtering stays in the view.
- Use `IconImage` with entity image metadata. Add narrow `getImageData()` methods to Observation and ResearchLens during approved UI delivery. Keep feature asset mapping with its owner, not route URLs. Existing Paper item artwork needs no new mapping.
- Use existing `notateNumber`, `commaNotation`, and date formatting. Keep exact counts or rates available when compact formatting hides precision. Do not change calculation units.

References inspected: World 7 Coral for summaries and rows; Spelunking for store refresh and identity artwork; Sushi for collection identity and progress; Jelly Operator for existing image composition. These references supply named traits, not their unrelated controls or fields.

## Page order and information

### Account progress

Show highest saved account Research level, discoveries out of 43, total Observation Insight levels, and exact source-save timestamp.

Show **Saved EXP copy / same-copy requirement**, character name, and character ID. Explain that both values come from one saved character copy. Choose the lowest character ID among copies at the highest saved Research level. State: **This saved copy does not establish total account Research EXP. It does not establish total account progress.** Do not show separate character progression, sum copies, or choose maximum EXP.

Use `progress.saveGlobalTime`, not the store refresh time, for save provenance. Render the timestamp in UTC with its timezone. If EXP or its requirement is absent, show the specific unavailable value rather than zero.

### Discovery limits

Show remaining account attempts separately from daily allocation. Show inclusive minimum and maximum roll values, shared failed-roll count, current failed-roll bonus, and its cap.

Keep allocation, minimum-roll, and maximum-roll contributors beside their values. Show contribution operations, current values, caps, and supplied gates. Do not infer attempts used from allocation minus remaining. Do not add a reset timer or map-access claim.

### Current production and lens ownership

Show current Research EXP per hour, production before the shared multiplier, and the shared multiplier. Group additive Research EXP bonuses as percentages and independent multipliers as × factors. Explain that EXP bonus percentages are added together before independent multipliers apply. Do not use generic operation-debug labels. Show all supported sources, including zero or inactive contributions, with supplied context and nested components.

Use player-facing contributor names and bonus or multiplier wording. Do not repeat unchanged raw inputs. Keep a differing input when it explains a cap or conversion. Present the permanent Paper source as **Professional Papers**, not its internal item name. Remove description placeholders from the Hole Gambit label without changing its contribution. Format the Hole Gambit score requirement with the established number formatter. Keep its exact source value available through `TipDisplay`, beside the formatted requirement.

Show actual Insight accrual per hour and **Game-displayed Insight per hour** separately. Include the backend discrepancy explanation beside both values. Insight levels Observations; it is not Research skill EXP.

Keep local Research EXP benefit per Insight level separate from the total-Observation-level Research EXP benefit. Show their named contributors. Show current Kaleidoscope boost and its contributors. Orthogonal supporting lenses add their boosts; diagonals and the supporting lens itself do not contribute.

Show owned lens total, ownership cap, all three fixed-kind counts, unplaced count, and capacity per Observation. Keep ownership sources and capacity sources beside those values. Do not imply players can switch a lens kind.

### Observations

Use one flat, game-order list. Empty search shows all 43 named entries, including undiscovered and level-gated entries. Case-insensitive search matches name or map. Show the current result count. A search with no matches shows a clear empty result without changing account totals.

Each row includes:

- Name and Observation artwork; map name; location hint.
- Required Research level and discovery roll threshold; found state.
- Distinct level, already-discovered, exhausted-attempt, and insufficient-maximum-roll conditions. Use readable met or blocked labels, not raw booleans. Render all applicable conditions, not one generic unavailable status.
- Insight level, saved partial Insight EXP, and next requirement.
- Actual Research EXP per hour, actual Insight accrual per hour, and game-displayed Insight per hour.
- Assigned owned lens IDs and fixed names; actual supporting Kaleidoscope IDs and target Observation names.
- Current support multiplier, local Insight benefit, and the row's production contributor operations. The shared multiplier refers to the visible shared source group; do not repeat its full external catalogue in every row.

Use zero for a real zero rate. Do not imply an undiscovered entry produces, a missing requirement equals zero, or a roll threshold grants map access. Keep readable status text; do not rely on color alone. Do not dim entire locked rows because their requirements remain useful.

### Actual owned lens placements

List each actual owned lens once. Show its ID, fixed kind, artwork, target Observation or **Unplaced**, and saved position `(x, y)`. Coordinates describe saved state, not website placement controls. Do not display reserved saved slots as owned lenses.

### Offline gains and Papers

Show online gains at 100%. Show current offline percentage with its 1% baseline, 100% cap, unclamped value, and current source contributions. Label additive offline contributions as **+40 percentage points**, not **Add percentage +40%**. Explain that these points add to the baseline before the cap applies. Keep final percentages distinct from contribution units. Do not turn current rates into away-time predictions.

Show **Half Finished Research Papers** with existing item artwork, inventory count, and the two-hour progress grant. Explain the grant once. State: **Papers also grant Minehead Currency, but this page does not show its balance.** Keep the caveat: **Pending progress is not applied to this saved view.** Do not show a Minehead Currency balance or activity panel.

Show **Professional Papers** separately with permanent purchase count and current offline bonus in percentage points. Do not add a use button, purchase button, stock claim, or time-skip calculation.

### Posty Notes

Show all 14 notes in level order. Each row includes required Research level, reached or upcoming state, reward description, and typed current reward context.

- Lens notes: additional lens reward, current lens ownership, and cap.
- Capacity notes: milestone capacity and current capacity.
- Shape notes: additional Shape reward and current owned Shape names/count/cap. Show shared current ownership contributors once beside these notes. Explain that outside rewards affect current ownership. A pictured Shape does not guarantee the next Shape received.
- Point note: current Points per ten-level block and cumulative milestone contribution. Do not show available or spent Point balances.
- Rotation note: required Research level, current unlocked state, and rotation step.

Descriptions and typed contexts come from the backend. Do not parse descriptions to derive mechanics or add a structured reward framework.

## Data and delivery responsibilities

| Surface | Accepted backend input |
|---|---|
| Account and provenance | `ResearchGrid.progress` |
| Attempts and roll sources | `ResearchGrid.discoveryAllowance` |
| Ownership, capacity, placements | `ResearchGrid.lensOwnership`, `lenses`, `lensDefinitions` |
| Observation catalogue and local state | `observations`, joined `Observation.map`, assigned/supporting lenses |
| Actual production and discrepancy | `production`, Observation rates and contributor arrays |
| Offline gains and Papers | `offlineGains`, `papers` |
| Notes and ownership-sensitive rewards | `postyNotes` and their typed `context` |

Keep route metadata and the server wrapper in `app/world-7/research/page.tsx`. Render `components/world-7/research/researchContent.tsx` directly from the route. Put store hooks, search state, and display composition in this `ResearchContent` client component. Use `useShallow` for displayed store selections and retain `lastUpdated` as the mutable-domain refresh dependency.

Wait for the store's completed `StaticData` or `LiveData` status before reading prepared Research details. Initialized singleton fields alone do not establish load completion. Guard genuine unloaded data locally; do not invent fallback domain objects or hide missing note contexts.

The existing account loader and late Research preparation already supply these results. No new formulas, parsing, producer API, persistence layer, store, or backend framework is required. Research supplies named companion groups, their additive terms, and the same calculated factors used by production. The UI renders these groups without reconstructing their factors or inferring membership from array positions. Narrow image and contributor display metadata APIs do not change the accepted calculations. Add the Research link to existing World 7 navigation only during approved production delivery.

## Preview and verification boundary

The disposable preview must load `tests/fixtures/saves/latest.json` through the existing Docker fixture-mode loader. Current values must come from populated accepted public APIs, not literal demonstration values. Keep captures and backend evidence private under `.ui-verification/`.

For approved delivery, verify the rendered values against the loaded public backend; catalogue counts; default visibility; name and map search; separate discovery conditions; owned placements; support relationships; EXP and Insight units; contributor meanings; Papers; and all note contexts. Check saved-copy wording and provenance, additive offline percentage points, separate EXP percentages and × factors, the formatted Hole Gambit requirement and exact-value detail, the single Paper grant explanation, and the pending-progress caveat. Exercise loading and no-result states without synthetic saves. Record real-save branches that remain unobserved.

Browser screenshots prove presentation only. They do not re-establish calculation parity, connected live-game parity, or fresh version confirmation. No mobile/tablet matrix or assistive-technology certification is required by this scoped plan. Preserve existing component semantics and responsive behavior.

Record preview captures, exercised assertions, runtime errors, reproduction files, and coverage limits in the [current handoff](research-research-brief.md#current-handoff).

## Game and source references

- [Wiki: Research](https://idleon.wiki/wiki/Research): names, landmarks, lens meanings, and Posty Notes. The current article identifies itself as a recent addition.
- [Wiki: Half Finished Research Papers](https://idleon.wiki/wiki/Half_Finished_Research_Papers) and [Gem Shop](https://idleon.wiki/wiki/Gem_Shop#World_7): consumable versus permanent purchases.
- [Approved source ledger](research-research-brief.md#sources) and [source/caller findings](research-research-brief.md#source-and-caller-findings): authoritative rules, hourly units, saved-copy policy, and Insight display discrepancy.
- [Accepted public domain](../../data/domain/world-7/research.tsx): current values and typed contributor/context results. Reuse its calculations unchanged.
