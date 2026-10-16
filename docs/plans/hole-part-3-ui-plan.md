# The Hole part 3: skilling layers and character capability UI plan

- **Status:** Approved plan executed and UI accepted as complete on 2026-10-16. This selected UI result adds no backend changes. Production evidence covers one imported local save at 1440×1000; unknown numeric assignments, assigned-character/live claim/reset/all-cavern parity, mobile/tablet, accessibility, and source-six versus Wiki-five remain unverified. See the [current handoff](hole-research-brief.md#part-3-ui-acceptance-and-local-settlement--2026-10-16) for final review, evidence, limits, and issue publication.

**Scope:** Issue [#443 — Skilling layers and character capability](https://github.com/Sludging/idleon-efficiency/issues/443), the accepted [part 3 backend plan](hole-part-3-backend-plan.md), approved [delivery outcomes](hole-delivery-parts-draft.md#3-skilling-layers-and-character-capability-motherlode-undying-hive-evertree-and-bottomless-trench), and selected [Hole IA](hole-ui-information-architecture.md#caverns). The selected page is **Caverns → Motherlode, Undying Hive, Evertree, Bottomless Trench**. Preserve completed parts 1–2 and leave parts 4–7 untouched.

## Player outcome

Players compare saved layer progress and resource readiness with each character's matching skill capability. They can distinguish completed progression, current and required resources, remaining resources, earned Opals, owned synergies, the separate shared claim counter, and saved assignment without inferring activity or automatic claims.

## Layout and interaction

- Reuse the normal Hole shell: heading, compact shared Opals/Lanterns summary, three `ContentTabs`, then the existing 25/75 Caverns rail/detail composition. Keep **Villagers → Upgrades → Caverns** unchanged.
- Preserve the full 18-entry Caverns rail in the IA's numbered game order. Keep all other cavern identities and current support states; part 3 changes details only for Motherlode, Undying Hive, Evertree, and Bottomless Trench. Default to Motherlode and preserve scroll on selection.
- Keep the shared layer-claim count once beside cavern progression, not in the global header. A concise local tip explains its shared scope and source-six/Wiki-five uncertainty; show no cap, remaining allowance, claim availability, or claim action.
- Use existing Hole cavern artwork through `IconImage`. Keep selected cavern identity, progress, resources, readiness, earned Opals, and owned effects together. Pair completed layers/trunks/depth, current/required resource, and non-negative remaining resource. Keep Motherlode lifetime ore separate from current ore and completed layers.
- Show readiness independently from the matching skill-efficiency threshold. A full progress bar does not imply an automatic claim. Put concise help beside requirement inputs and avoid repeating visible values in tips.
- Compare **every imported character** against selected cavern's matching skill and threshold, using aligned columns for character, saved assignment, skill efficiency, and capability comparison. Show no assignment as **Unassigned**; map valid saved cavern IDs to their full-rail names; show out-of-range non-null values as **Unknown assignment**. Never infer assignment from skill capability or filter to assigned/active characters. The saved Player 3 `Sludgev4` sentinel is unassigned. Do not imply current activity or contribution; capability does not gate readiness or claims.
- Show only owned, relevant schematic synergies. Keep effective value and target visible: Motherlode effect 58 as **+45.57/hr Bucket Fill Rate**, and multiplier targets as **Well bucket fill**, **Harp note production**, **Jar Rupie value**, or **Fountain currency**. Keep progression basis secondary. Retain genuine static game descriptions in optional local details, not as the primary effect or repeated raw count. Keep AMETHYST HEARTSTONE and Studies 1, 7, 11, and 16 context beside resource requirements without duplicating a backend field dump.
- Preserve unavailable values as unavailable. Use existing number formatting, dark surfaces, blue active navigation, restrained status color, and compact spacing. Do not introduce a new visual language, forecast, activity/rate claim, recommendation, claim/reset interaction, or unsupported character-selection control.

## Pattern and reference basis

- **Repository references:** `app/world-5/hole/content.tsx` (rendered Hole heading, shared summary, tabs, 25/75 rail/detail, cavern artwork, and local effects); `app/world-1/stampTableView.tsx` (feature-specific aligned comparison); `components/base/ContentTabs.tsx`, `LeftNavButton.tsx`, `IconImage.tsx`, `DataRow.tsx`, and `TipDisplay.tsx` for their established behavior only.
- **Rendered references inspected:** [existing Hole](../../.ui-verification/runs/2026-10-15T04-26-15-028Z-85495/preview-majik-hole.png), [Spelunking shared-summary and all-character composition](../../.ui-verification/runs/2026-10-16T00-22-09-182Z-1925/tunnels.png), and [Players navigation](../../.ui-verification/runs/2026-10-16T00-26-48-712Z-17480/players-character0.png). Reuse composition traits, not unrelated fields or data. The IA's all-18 numbered Caverns rail remains canonical; part 3 changes only four cavern details.
- **IdleonToolbox content reference:** inspected the requested [public profile Hole route](https://idleontoolbox.com/account/misc/general?profile=liiiiiiiiiiiig) and equivalent [Hole page](https://idleontoolbox.com/account/world-5/hole). The requested profile currently returns **404 / Profile Not Found**; the generic Hole route exposes guest/zero data, not a usable public profile. Its content grouping and game imagery informed the plan only. Keep IdleOn Efficiency's page style and navigation.
## Rendered preview and limits

The revised disposable preview reuses the local save, normal Hole shell, compact Opal/Lantern summaries, three `ContentTabs`, and canonical numbered 18-entry Caverns rail. It displays the four selected details and all 11 capability rows. `yarn ui:run .ui-verification/hole-part3-semantic-revision.cjs` passed at **1440×1200**: all 18 names/order, all four effect targets, `+45.57/hr Bucket Fill Rate`, Sludgev4 as **Unassigned**, and optional genuine descriptions.

Final captures:

- [Motherlode effects, full rail, and character rows](../../.ui-verification/runs/2026-10-16T03-58-39-336Z-92195/motherlode-semantic.png)
- [Bottomless Trench effect and Sludgev4 assignment row](../../.ui-verification/runs/2026-10-16T03-58-39-336Z-92195/trench-assignment-semantic.png)
- [Scenario result](../../.ui-verification/runs/2026-10-16T03-58-39-336Z-92195/result.json)

Saved assignment rendering uses the source's `-1` no-assignment sentinel and nullable missing values for **Unassigned**, IDs `0–17` for the canonical cavern names, and other non-null numeric values for **Unknown assignment**. The fixture includes valid named assignments and Sludgev4's unassigned sentinel, but no out-of-range numeric assignment; that branch has no saved-game screenshot. Capability never supplies an assignment.

The final preview run recorded the existing shared app hydration mismatch, NitroPay `document.browsingTopics()` failure, RL identity CORS failure, one failed resource request, and one 403 response. It recorded no preview-route error. Preview captures show imported-fixture presentation, not new game-parity evidence. Assigned-character game comparisons, claim/reset parity, and source-six versus Wiki-five remain unresolved. Production UI was separately authorized, executed, reviewed with zero actionable findings, and accepted; backend changes were outside this UI result.
