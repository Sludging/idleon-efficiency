# Spelunking: approved product specification

**Status:** APPROVED PRODUCT SCOPE / PUBLISHED / PARTS 1–3 CLOSED AS COMPLETED; PARENT #434 CLOSED AS COMPLETED — Original scope was approved on 2026-10-12. Human accepted Part 3 on 2026-10-17 within recorded evidence limits and explicitly authorized closing #437 and #434 as completed. No clean-runtime, whole-feature deployment, push, PR, or connected-game parity claim is made. Preserve prior approvals and per-part limits.

**Scope source:** [Approved research brief](spelunking-research-brief.md). **Delivery detail:** [Three delivery parts](spelunking-delivery-parts-draft.md).

**Feature issue:** [#434 — Spelunking product specification](https://github.com/Sludging/idleon-efficiency/issues/434). Individual delivery issues are linked in the [approved delivery parts](spelunking-delivery-parts-draft.md).

## Problem

The current Spelunking page says “Coming Soon.” Players need to see their current progression, earned bonuses, and remaining requirements across the feature, together with each character's skill progress and stamina.

## Solution

Replace the placeholder with read-only Spelunking progression and stat displays. Show account progress and character information alongside useful game metadata: names, descriptions, effects, requirements, costs, and relevant rules. Keep contextual descriptions beside their entries rather than building a mechanics guide or wiki replacement.

The product covers tunnels and Lore, discoveries, gathering and pages, the Journal, character stamina, Amber and shop upgrades, Elixirs, and summary progression. Part 3 retains backend tool APIs but has no Tools/AUTO/Advanced UI sections under the latest human-approved scope. It shows current information, not efficiency or planning calculators.

## User stories

1. **Tunnel and Lore progression**
   As a player, I want to see tunnel access requirements, best depths, biggest hauls, Lore bosses, and milestones, so I can understand my progress and what remains to unlock or complete.

2. **Discovery collection**
   As a player, I want to browse ordinary discoveries and Grand Discoveries as distinct collections, with tunnel context and requirements, so I can see what I have found and what is missing.

3. **Gathering and pages**
   As a player, I want useful cave and page information, so I can understand what those pages are for and where I hold them (storage or players's inventory).

4. **Shared Journal progress**
   As a player, I want to see Journal chapters, page requirements, owned levels and bonuses, and the shared daily read allowance, so I can distinguish earned progress from available benefits and see remaining reads.

5. **Character progression and stamina**
   As a player, I want each character's name, Spelunking level and EXP, current and maximum stamina, hourly recharge, and time to refill, so I can inspect their current skill progress and stamina.

6. **Amber and shop progression**
   As a player, I want to see my Amber, its denominations, and shop upgrades with their effects, levels, caps, unlock requirements, and supported next costs, so I can understand my currency and purchased progress.

7. **Elixirs and retained tool data**
   As a player, I want to inspect Elixir ownership, saved equipment and memorization, descriptions, and useful limits. Tool data APIs remain available to backend consumers; the accepted UI does not display Tools or AUTO.

8. **Advanced summary progression**
   As a player, I want to see Manic Mode, Overstim, and Trackometer progress in the accepted summary. Advanced progression has no separate UI section.

## Product decisions

- **Ownership:** Journal progress, bonuses, and daily reads are account-wide. Skill progress, inventory page quantities, and stamina retain their character ownership.
- **Visibility:** Spoilers are visible. Where useful, **Show locked** starts enabled; found/missing and locked/completed filters help players browse progress.
- **Context:** Include useful gathering terms, delve requirements, stamina costs, escape/toll rules, special actions, and drops beside the related entries, not as a standalone tutorial.
- **Refill:** Calculate time from saved current stamina to maximum stamina using hourly recharge.
- **Current values:** Distinguish owned bonuses from potential benefits and show equipment from saved state. Show next shop cost and affordability where verified inputs support simple arithmetic.

## Scoped UI direction

The approved Spelunking overview and Tunnels screenshot remains scoped to those surfaces. Use rounded, outlined cards with generous spacing, the ordinary normal-weight page title, shared `RoundedShadowBox`, and existing game-image metadata. Preserve the overview and Tunnels values, calculations, tooltips, filters, and content unchanged.

The new Journal screenshot scope applies only to the Journal tab. Use clear chapter header bands, prominent owned-page totals, a dense bonus table with all five approved columns, and real game page icons. Preserve every chapter and bonus row, values and getters, page-location and description tooltips, soft-cap help, and zero-owned chapters when present. Summary, characters, Tunnels, and Elixirs remain unchanged by Journal work.

The Elixirs tab uses a responsive four-column desktop card grid for all twelve source entries. Keep each Elixir's game icon, complete source description including its final parenthetical footer segment, saved ownership, memorized badge, and equipped slot badges with one-based slot numbers. Show the memorization limit and consumption reduction from existing getters. Unowned Elixirs retain their potential-benefit tooltip. Preserve the summary, character cards, Tunnels, Journal, and Shop contents and state. Keep the four tab-panel containers at one consistent 24px gap through repeated switching; retain each mounted tab's filters and controls.

The Shop tab receives a focused table redesign from the supplied 2026-10-17 reference. Keep the existing account summary, character cards, tab navigation, Tunnels, Journal, Elixirs, and all current game values unchanged. Present all 68 real upgrades in one six-column table: Upgrade, Level / prerequisite, Effect, Total bonus, Next cost, and Bulk cost. Keep icons, descriptions, levels, prerequisites, supported quotes, affordability, locked/maxed states, and source-derived effect units tied to existing domain values.

Populate Total bonus only from literal `Total Bonus:` clauses in `SpelunkingUpgradeRepo.ts`: indices 0–3, 8–10, 44–46, 54–56, and 60–61. Preserve each source clause's wording and existing `$` binding; show an em dash for the other 53 rows. Do not infer totals from generic `sourceBonus`, rewrite Effect text, or recalculate values.

Reuse `UpgradeTable` for the Shop rows. Its opt-in `panel` variant and toolbar filter layout may shape this feature only; omitted/default props must retain the existing table, filters, body background, and consumer visuals. Use one continuous table surface inside `RoundedShadowBox`, not per-row cards. Keep hide-locked, hide-maxed, search, and sort controls in the split toolbar. Keep locked and maxed entries visible by default. On narrow screens, preserve the page width and contain table overflow within its own scroll region.

Verify the Shop tab with the loaded local save: 68 rows, six columns, loaded game icons, source-backed total bonuses and costs, locked/maxed rows, filter and empty states, and state retention after tab navigation. Compare default UpgradeTable consumers before and after the shared opt-in change; no visual change is expected. Check desktop 1440px, reference-width 1056px, and narrow 390px without page overflow. The summary and other tabs remain unchanged.

## Delivery and approval

Retain three independent backend-to-UI parts: tunnel/Lore/discovery progression; gathering/Journal/pages/character stamina; and Amber/shop/Elixirs with accepted Manic/Overstim/Trackometer summary progress. Each includes its own data, research, and integration work; none depends on another part. Part 3 keeps tool/AUTO backend APIs but excludes Tools/AUTO/Advanced UI.

The human approved this specification and the [delivery parts](spelunking-delivery-parts-draft.md) on 2026-10-12. Part 1's accepted backend/UI and Part 2's direct human completion on 2026-10-14 remain valid within their own evidence limits. Explicit human authority on 2026-10-15 closed accepted Parts 1 and 2 as completed; Part 3 backend/UI work was accepted on 2026-10-17 and #437 and parent #434 were subsequently closed as completed under explicit authority. Earlier keep-open instructions are historical and superseded only for #435/#436/#437/#434 closure. See the [Part 3 acceptance record](https://github.com/Sludging/idleon-efficiency/issues/437#issuecomment-6226758375), [Part 3 closing handoff](https://github.com/Sludging/idleon-efficiency/issues/437#issuecomment-6226898022), [parent closing handoff](https://github.com/Sludging/idleon-efficiency/issues/434#issuecomment-6226899621), and the [current handoff](spelunking-research-brief.md#current-handoff). No clean-runtime, whole-feature deployment, push, PR, connected-game parity, or verification rerun is claimed.
