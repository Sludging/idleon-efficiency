# Spelunking: approved product specification

**Status:** APPROVED PRODUCT SCOPE / PUBLISHED / PARTS 1 AND 2 CLOSED; SELECTED PART 3 COMPLETE — Original scope was approved on 2026-10-12. Human accepted selected Part 3 backend and UI work on 2026-10-17 within recorded evidence limits. Issues #434/#437 remain open; no clean-runtime, whole-feature deployment, push, PR, or issue-closure claim is made. Preserve prior approvals and per-part limits.

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

## Delivery and approval

Retain three independent backend-to-UI parts: tunnel/Lore/discovery progression; gathering/Journal/pages/character stamina; and Amber/shop/Elixirs with accepted Manic/Overstim/Trackometer summary progress. Each includes its own data, research, and integration work; none depends on another part. Part 3 keeps tool/AUTO backend APIs but excludes Tools/AUTO/Advanced UI.

The human approved this specification and the [delivery parts](spelunking-delivery-parts-draft.md) on 2026-10-12. Part 1's accepted backend/UI and Part 2's direct human completion on 2026-10-14 remain valid within their own evidence limits. On 2026-10-15 the human authorized closing accepted Parts 1 and 2 with handoffs; this supersedes earlier keep-open instructions for #435/#436 only. Both remain closed as completed; parent #434 and issue #437 remain open. The human accepted selected Part 3 backend and UI work on 2026-10-17 within its retained evidence limits. See the [Part 3 completion record](https://github.com/Sludging/idleon-efficiency/issues/437#issuecomment-6226758375) and [parent status](https://github.com/Sludging/idleon-efficiency/issues/434#issuecomment-6226758396), plus the [current handoff](spelunking-research-brief.md#current-handoff). No clean-runtime, whole-feature deployment, push, PR, or issue-closure claim is made.
