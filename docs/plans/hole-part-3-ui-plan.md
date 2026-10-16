# The Hole part 3: skilling layers and character capability UI plan

- **Status:** Approved by the human on 2026-10-16; the supervisor accepted the implemented amendment after an independent review found zero specification and standards findings. The local implementation is committed. Earlier approval, acceptance, and commit history remains unchanged. See the [current handoff](hole-research-brief.md#current-handoff) for evidence and limits.

**Scope:** Issue [#443 — Skilling layers and character capability](https://github.com/Sludging/idleon-efficiency/issues/443), accepted part 3 backend, and selected [Hole IA](hole-ui-information-architecture.md#caverns). Change only details for **Motherlode, Undying Hive, Evertree, and Bottomless Trench**. Preserve completed parts 1–2 and every other cavern's current support state.

## Player outcome

Players scan completed cavern progress, gathered versus required resources, the required skill efficiency, useful effective schematic benefits, and remaining shared claims. They see which imported characters meet the threshold without a character comparison table, exact character values, saved assignments, or redundant character count.

## Selected user revision

The user selected nine changes. This direction supersedes conflicting prior presentation approvals without erasing their history:

1. **General1 — Navigation:** Remove numeric indices from the Caverns left navigation. Preserve all 18 cavern identities, canonical order, game artwork, and selection behavior.
2. **Resource1 — Resource amount:** Show gathered/current versus required quantity. Remove the separate remaining-resource quantity; current and required already communicate progress.
3. **Resource2 — Shared allowance:** Replace the ambiguous used-count field with remaining claims: source daily allowance **6 minus recorded shared usage**, calculated by a small typed remaining-count getter on the existing shared `ResourceCavrens` owner. Unknown usage stays unavailable; known usage yields a nonnegative remaining count. Tooltip: six claims per day shared across all four resource caverns, with manual claims made in game. Do not add reset timing, claim availability, or claim controls. The user explicitly chooses the code allowance of six; earlier source-six/Wiki-five disagreement remains historical evidence, not an implementation gate.
4. **Resource3 — Effective benefits:** Remove the “Owned schematic synergies” heading. Keep owned dynamic effects with meaningful values, units, and targets; e.g. `+45.57/hr Bucket Fill Rate`, `Well bucket fill`, `Harp note production`, `Jar Rupie value`, and `Fountain currency`. Do not show bare counts or an owner heading.
5. **Resource4 — Requirement state:** Remove the separate Resource readiness field and text. Color current/required green only when gathered quantity meets or exceeds the requirement; otherwise use ordinary text color. Missing values remain unavailable and ordinary-colored.
6. **Resource5 — Local Opals:** Remove cavern-local Earned Opals and its tooltip. Completed layers/trunks/depth provide the needed progress. Preserve the account-wide Opal summary.
7. **Resource6 — Local copy:** Shorten labels and do not repeat selected cavern names below their identity. Preserve necessary distinctions, including Motherlode lifetime ore versus current/required ore.
8. **Resource7 — Skill comparison:** Remove the character capability table and saved assignments. Show the required matching-skill efficiency. Its tooltip title is **Characters meeting requirement** (or equivalent concise wording) and lists only imported character names whose prepared skill output meets the threshold. Show no exact values, locations, or redundant character count.
9. **Resource8 — Composition:** Use compact aligned progression, resource, required-efficiency, and remaining-claims fields with reduced typography, meaningful effective benefits, and game imagery. Avoid a sparse dashboard and redundant headings.

## Layout and behavior

- Preserve the normal Hole shell, account-wide Opal and Lantern summaries, **Villagers → Upgrades → Caverns**, 25/75 rail/detail composition, existing selection behavior, and centered shared `ContentTabs` convention. Preserve all 18 cavern names, order, art, and selection; navigation labels omit indices.
- Keep four selected detail views focused: cavern identity/art; completed layers, trunks, or depth; current/required resource; required matching-skill efficiency; remaining shared claims; and owned effective benefits. Place Motherlode's distinct lifetime ore label/value within the same resource grid cell as current/required ore.
- Align the four primary values in a compact grid. Use existing Grommet `Grid`/`TextAndLabel` field composition, compact labels/values, `IconImage`, dark surfaces, restrained green status color, and existing `TipDisplay` behavior. Benefits follow without a redundant section heading.
- Keep resource requirement context in its local tip. Keep the claim tooltip concise: six claims per day are shared across all four resource caverns; claims are manual in game. Make no reset-timing claim. The efficiency tooltip is titled **Characters meeting requirement** (or equivalent concise wording), filters imported characters' prepared skill output by the displayed threshold, and exposes qualifying names only.
- Keep calculations in the domain. Add `ResourceCavrens.getRemainingSharedClaims(): number | null`, using the existing nullable `sharedClaimCounter` and formula `Math.max(0, 6 - sharedClaimCounter)` when known; return `null` when usage is unknown. Test usage **0 → 6**, partial usage **2 → 4**, exhausted usage **6 → 0**, over-limit usage → **0**, and unknown → unavailable.
- Retain the source's dynamic effect outputs and established formatting. Do not hardcode preview fixture values into production.

## Pattern and evidence basis

- **Repository pattern findings:** `components/world-3/construction/atomCollider.tsx` aligns related fields with a Grommet grid and `TextAndLabel`; `components/base/TipDisplay.tsx` supplies local help; `components/base/LeftNavButton.tsx` retains the existing rail interaction; Hole uses `IconImage` and game art in `app/world-5/hole/content.tsx`. `docs/agents/ui-patterns.md`, `docs/agents/ui-rows.md`, and `docs/insights/ui-feedback.md` guide compact aligned content, verified imagery, useful local tooltips, and removal of repeated labels. Pattern research found no directly reusable Hole comparison view; the selected field arrangement adapts the existing Atom Collider grid rather than introducing a new convention.
- **IdleonToolbox:** Historical content reference only. The requested public profile returned 404 and the generic route showed guest/zero data. Its layout and styling are not adopted.
- **Evidence boundary:** The disposable preview uses clearly labelled retained fixture observations for display only; it does not depend on account import and does not establish fresh game-source evidence or calculation parity.

## Rendered preview and verification

The amended design preserves the normal Hole shell, account-wide Opal and Lantern summaries, and centered shared `ContentTabs`. It refines only the selected navigation labels and four resource-cavern details. The final focused preview uses retained fixture-derived presentation data, existing theme/components, and a unique disposable route; it does not exercise account loading or production data.

- Historical [Motherlode](../../.ui-verification/runs/2026-10-16T04-55-52-363Z-44355/1-motherlode.png) · [Undying Hive](../../.ui-verification/runs/2026-10-16T04-55-52-363Z-44355/7-undying-hive.png)
- Historical [Required efficiency tooltip](../../.ui-verification/runs/2026-10-16T04-55-52-363Z-44355/required-efficiency-tip.png) · [Remaining claims tooltip](../../.ui-verification/runs/2026-10-16T04-55-52-363Z-44355/remaining-claims-tip.png)
- Historical failed preview: [result](../../.ui-verification/runs/2026-10-16T05-11-07-690Z-89975/result.json) · [loading capture](../../.ui-verification/runs/2026-10-16T05-11-07-690Z-89975/final.png)
- Corrected rendered preview: [Motherlode](../../.ui-verification/runs/2026-10-16T05-18-04-438Z-13773/motherlode.png) · [Undying Hive](../../.ui-verification/runs/2026-10-16T05-18-04-438Z-13773/undying-hive.png) · [Characters meeting requirement tooltip](../../.ui-verification/runs/2026-10-16T05-18-04-438Z-13773/skill-tooltip.png) · [Remaining claims tooltip](../../.ui-verification/runs/2026-10-16T05-18-04-438Z-13773/claims-tooltip.png)
- Corrected [passing scenario result](../../.ui-verification/runs/2026-10-16T05-18-04-438Z-13773/result.json) · [presentation report](../../.ui-verification/runs/2026-10-16T05-18-04-438Z-13773/preview-report.json) · [browser errors](../../.ui-verification/runs/2026-10-16T05-18-04-438Z-13773/errors.json)

The original local fixture showed Motherlode **19 layers**, **10.3M / 20.1M** ore, and **1.31B** lifetime ore; Hive **17 layers** and green **6.17M / 4.15M** flies. The original claim fixture recorded zero shared usage and displayed **6**. These observations remain historical imported-fixture presentation, not new game evidence.

`yarn ui:run .ui-verification/hole-part3-amended-preview-20261016.cjs` passed at the runner's **1440×1000** viewport. The scenario confirmed the route returned **200** and real preview content was visible before capture; all **18** cavern names, order, and artwork rendered without numeric rail labels; the visible Opal summary (**109 / 363 available**), Lantern summary (**37**, **0 / 12 today**), and centered shared `ContentTabs` appeared. Compact four-field detail showed Motherlode **19** layers, **10.3M / 20.1M** ordinary-colored ore, **1.31B** lifetime ore, **638M Mining**, and **6** claims; Hive showed **17** layers, green **6.17M / 4.15M** flies, **197M Catching**, and **6** claims. The requirement tip title is **Characters meeting requirement** and its list contains only the 11 retained fixture character names. The claim tip states six daily uses shared across all four resource caverns and manual in-game claims. Removed fields and the capability table were absent. The route used retained presentation values, not imported runtime state or new game evidence.

The preview scenario exercised selection of Motherlode and Hive and captured both details and tooltips. Browser output retained the shared hydration mismatch, NitroPay `document.browsingTopics()` exception, RL identity CORS error, one failed resource request, and one HTTP 403; no preview-specific runtime error was reported. The Impeccable detector returned `[]`. This historical preview stage removed disposable route and scenario sources and made no production/domain/generated-data changes, permanent tests, game interactions, save mutations, build, lint, type check, mobile/tablet, or accessibility checks. Its implementation stop was later superseded by the production authority recorded in the current handoff and below. Make no reset-timing, source-conflict resolution, or new game-evidence claim.

## Production implementation and verification

The accepted implementation is in `app/world-5/hole/content.tsx`. The shared owner exposes the remaining-claims getter, with boundary coverage in `tests/domains/hole/part3-pipeline.test.ts`. The current handoff records final production and tooltip-state evidence, the focused suite result, and limits.

This UI change affects presentation only; it does not remove backend values or change calculations. The user selected source allowance six for remaining shared claims. The retained fixture and screenshots are presentation evidence, not new game-parity evidence. No save mutation, gameplay action, claim/reset behavior, or source-conflict resolution is claimed.

