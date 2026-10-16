# The Hole part 3: skilling layers and character capability UI plan

- **Status:** Accepted after fresh phase 8 review with zero specification, standards, or scope findings. The accepted production UI followups are committed locally; no push, PR, or deployment.
- **Scope:** Part 3 only: Motherlode, Undying Hive, Evertree, and Bottomless Trench. Preserve parts 1–2, the other 14 cavern support states, the earlier accepted reductions, and all recorded history in the [current handoff](hole-research-brief.md#current-handoff).

## Player outcome

Players scan cavern progress, current versus required resources, lifetime ore where applicable, skill efficiency required, remaining shared claims, and owned dynamic effects. Fields flow in one simple row and wrap naturally when content width is constrained.

## UI responsibilities and composition

- Preserve the normal Hole shell, account-wide Opal and Lantern summaries, centered **Villagers → Upgrades → Caverns** tabs, all 18 unnumbered cavern names/order/art, and existing selection behavior.
- Render progress, current/required resource, Motherlode **Lifetime ore**, required efficiency, remaining claims, and owned benefits as siblings in one wrapping row. Use existing Grommet `Box` and `TextAndLabel` patterns; no grid, secondary resource block, special Motherlode placement, or nested summary groups.
- Use a modest horizontal gap and a larger existing vertical gap, e.g. `gap={{ row: "medium", column: "small" }}`. Keep values and labels compact. Let the shared page layout bound normal desktop content; do not add viewport-specific offsets or mobile scope.
- Keep resource current/required free of tooltip and information icon. Preserve dynamic values, normal incomplete color, green met-resource values, and distinct lifetime ore.
- Label all four skill thresholds **Efficiency required**. Keep each cavern's existing Mining, Catching, Chopping, or Fishing threshold and qualifying-character filtering. Its tooltip lists qualifying names only; preserve unknown-threshold **Unavailable** and known-empty **None** behavior.
- Give each retained tooltip the same small `CircleInformation` affordance beside its label. Pass tooltip content through `TextAndLabel` for required efficiency, remaining claims, and owned-effect descriptions; its existing TipDisplay provides the shared icon and anchored Grommet Tip. Keep claim copy at six shared claims per day across the four caverns, manual in-game claims, and no reset-timing claim.
- Keep benefits in the same field flow without a redundant heading. Keep all values and calculations on existing domain owners; add no backend or static-data work.
- Preserve no numeric navigation labels, remaining-resource amounts, local Opals, readiness text, character table/assignments, repeated cavern names, or redundant headings.

## Data and integration

Use the accepted part 3 data already consumed by `app/world-5/hole/content.tsx`: completed progress, current/required resource, `efficiencyType`/threshold, qualifying imported characters, remaining shared claims, Motherlode lifetime ore, and owned effect descriptions/values. Keep source allowance six and unknown claim usage unavailable. Do not change formulas, eligibility, save state, or backend exports.

## Verification

- **Production verification:** The normal `/world-5/hole` route passed at **1440×1000** with the configured local save through the account pipeline. The scenario exercised all four selected caverns, all 18 unnumbered rail entries, all 14 other support states, and the preserved tabs. It confirmed the three shared tooltip types open near their icons, qualifying names only, resource fields without tooltips/icons, Motherlode lifetime ore, and owned dynamic effects. A browser-only **640px max-width** constraint produced natural row wrapping with **65px** between field-row origins; production styles remain unconstrained. See the [production report](../../.ui-verification/runs/2026-10-16T08-12-33-619Z-19619/hole-wrapping-report.json), [normal Motherlode capture](../../.ui-verification/runs/2026-10-16T08-12-33-619Z-19619/motherlode-production.png), [wrapped Motherlode capture](../../.ui-verification/runs/2026-10-16T08-12-33-619Z-19619/motherlode-wrapped-production.png), and [shell capture](../../.ui-verification/runs/2026-10-16T08-12-33-619Z-19619/hole-shell-production.png). The [current handoff](hole-research-brief.md#current-handoff) records detailed observations and limits.

Earlier preview-only evidence: [Motherlode wrapped render](../../.ui-verification/runs/2026-10-16T08-00-11-457Z-69644/motherlode-normal.png), [Hive render](../../.ui-verification/runs/2026-10-16T08-00-11-457Z-69644/hive-normal.png), and [measurement report](../../.ui-verification/runs/2026-10-16T08-00-11-457Z-69644/preview-report.json). Representative preview values remain display-only.