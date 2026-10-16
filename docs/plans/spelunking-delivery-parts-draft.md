# Spelunking: approved delivery parts

**Status:** APPROVED DELIVERY SCOPE / PARTS 1–3 CLOSED AS COMPLETED; PARENT #434 CLOSED AS COMPLETED — Scope was approved on 2026-10-12. The human accepted Part 3 on 2026-10-17 within recorded evidence limits and explicitly authorized closing #437 and #434 as completed. This does not claim a clean runtime, whole-feature deployment, push, PR, or connected-game parity.

**Scope sources:** [Approved research brief](spelunking-research-brief.md) and [approved product specification](spelunking-spec-draft.md).

**Parent feature issue:** [#434 — Spelunking product specification](https://github.com/Sludging/idleon-efficiency/issues/434). The three issues below are its native subissues.

The three parts below each deliver backend data through a usable UI. Research, data mapping, and integration belong inside each part, not separate tickets. All three are required for complete feature coverage, but none blocks another.

The page focuses on current progression and stats, not efficiency or planning calculators. Browsing and filters are read-only. Spoilers remain visible, and **Show locked** starts enabled where useful. Game metadata supports the displayed entries rather than becoming a standalone mechanics guide.

## 1. Tunnel, Lore, and discovery progression

**Delivery issue:** [#435](https://github.com/Sludging/idleon-efficiency/issues/435). **Phase:** COMPLETE / CLOSED AS COMPLETED — 2026-10-15, by explicit human closure authority on previously accepted backend/UI work. [Closing handoff, approval history, and actual Part 1 evidence limits](https://github.com/Sludging/idleon-efficiency/issues/435#issuecomment-6183319096). Pending accepted UI/local work remains uncommitted; no commit completion is claimed.

**Outcome:** Players can see their tunnel achievements, Lore milestones, and discovery collection alongside the relevant requirements and game information.

**Blocked by:** None.

### Backend data and UI information needs

- **Backend:** Provide tunnel access and Lore completion, best depths and biggest hauls, and separate ordinary and Grand Discovery progress with relevant totals.
- **Backend:** Match this progression to tunnel and discovery identities, descriptions, boss depths, requirements, milestone unlocks, and related delve or item/action metadata.
- **UI:** Show tunnel records and Lore milestones beside their requirements; show both discovery collections with found/missing status and useful filters.

### Acceptance outcomes

- [x] Players can inspect available and locked tunnels, their recorded achievements, and their Lore milestones without confusing access with completion.
- [x] Players can distinguish ordinary discoveries from Grand Discoveries and see each collection's found/missing progress and requirements.
- [x] Progression and relevant game information appear together, using correctly matched backend state and metadata.

**Data note:** Tunnel/Lore and Grand mappings are delivered and accepted. The local handoff retains separate human backend/UI acceptance, 16 accepted backend tests and two normal-account passes, final five-suite/24-test UI/Amber evidence, passing final TypeScript, independent Amber PASS, and all nine scoped real-route outcomes. Retained Red-tier proof does not cover active other tiers or saved Big-notation branches beyond source review. Shared Nav/ad/network errors remain recorded; no connected live-game parity, mobile matrix, performed game actions/drops/exits, full-suite run, build, or lint is claimed.

## 2. Gathering, Journal, and character progression

**Delivery issue:** [#436](https://github.com/Sludging/idleon-efficiency/issues/436). **Phase:** COMPLETE BY DIRECT HUMAN APPROVAL — 2026-10-14; CLOSED AS COMPLETED under explicit closure authority, 2026-10-15. [Closing handoff](https://github.com/Sludging/idleon-efficiency/issues/436#issuecomment-6183319342). New UI/backend changes remain local, uncommitted, and unstaged, not remotely published, pushed, or deployed.

**Outcome:** Players can see gathering and page information, shared Journal progress, and each character's skill progression and stamina.

**Blocked by:** None.

### Backend data and UI information needs

- **Backend:** Provide cave/page metadata, Journal chapters, page requirements, owned progress and bonuses, and the account-wide daily read limit, usage, and remaining allowance.
- **Backend:** Keep skill levels/EXP, and saved current stamina attached to their characters; calculate maximum stamina and hourly recharge.
- **Backend:** Estimate time from saved current stamina to maximum stamina using the hourly recharge rate.
- **UI:** Show chapter progress and bonuses beside page requirements, shared reading allowance, pages storage locations, and character skill/stamina information.

### Acceptance outcomes

- [x] Players can inspect shared Journal progress, earned bonuses, page requirements, and the account-wide reading allowance.
- [x] Players can see cave/page information and available pages.
- [x] Each character shows skill level/EXP, saved stamina, maximum stamina, hourly recharge, and estimated time until full from correctly matched inputs.

**Data note:** Journal/read-usage mappings and stamina inputs are delivered within accepted Part 2 scope. The [direct completion record](https://github.com/Sludging/idleon-efficiency/issues/436#issuecomment-6166929113) and closing handoff retain approval and evidence limits; parent #434 carries the [Parts 1/2 closure and Part 3 handoff](https://github.com/Sludging/idleon-efficiency/issues/434#issuecomment-6183330452).

**Completion basis:** The human approved settling Part 2 as complete and requested documentation and issue updates. The reviewed backend and all eight latest UI outcomes are accepted; final Standards and Spec findings are zero. Retained backend evidence is 8 suites / 95 tests and two normal-factory runs with 734 assertions each. Final scoped UI outcomes pass, but the post-S1 packet still has `passed: false`, `runtimeClean: false`, exit 1, five errors, seven warnings, and one NitroPay page error. Shared hydration/network failures, historical TS18047, the approved 12px typography advisory, and unobserved-state limits remain unwaived. Completion does not establish clean runtime, fresh connected-game parity, or deployment. Full authority, evidence, and limits remain in the [current handoff](spelunking-research-brief.md#current-handoff); no checks were rerun for bookkeeping.

## 3. Amber, equipment, and advanced progression

**Delivery issue:** [#437](https://github.com/Sludging/idleon-efficiency/issues/437). **Phase:** COMPLETE / CLOSED AS COMPLETED under explicit human authority on 2026-10-17. [Acceptance record](https://github.com/Sludging/idleon-efficiency/issues/437#issuecomment-6226758375); [closing handoff and retained limits](https://github.com/Sludging/idleon-efficiency/issues/437#issuecomment-6226898022).

**Outcome:** Players can inspect Amber and Shop progression, Elixirs, and Manic, Overstim, and Trackometer summary progress through accepted backend data and UI.

**Blocked by:** None.

### Backend data and UI information needs

- **Backend:** Provide account Amber and Shop upgrade metadata, saved levels/caps/prerequisites/effects, verified next and bulk costs, affordability, source-resolved descriptions, and advanced progression state.
- **Backend:** Retain tool identity/stat and automatic-use APIs; do not imply saved actor-local tool/team/AUTO state.
- **Backend:** Provide Elixir ownership/equipment/memorization state, limits, and source-resolved descriptions.
- **UI:** Show Amber, Shop costs and affordability, locked prerequisites and potential effects; show Elixir memorization/consumption details and Manic/Overstim/Trackometer summary progress.
- **UI boundary:** Tools, AUTO, and Advanced sections are excluded by latest human feedback. Backend tool APIs remain available. Do not restore removed UI outputs.

### Acceptance outcomes

- [x] Players can inspect Amber and Shop progression, including saved levels/caps, effects, prerequisites, next and bulk costs, affordability, locked prerequisites, and potential effects.
- [x] Players can inspect Elixirs with saved ownership/equipment/memorization state, resolved descriptions, and memorized cues; tool/AUTO data APIs remain available without a Tools/AUTO UI section.
- [x] Players can inspect Manic, Overstim, and Trackometer saved progression and effects in the accepted summary.

**Evidence and limits:** Reuse accepted backend evidence (2 focused suites / 12 tests) and retained UI packets: ten outcomes, 68 Shop rows, five price comparisons, three unowned Elixirs, twelve icons, and locked-prerequisite proof. Shared hydration/NitroPay/CORS/failed-resource/HTTP 403 errors remain unwaived. Price evidence is offline v1.22, one account, and five comparisons; no connected-game parity, full suite, TypeScript, build, lint, or formatter claim. Part 1 Amber-haul denomination/formatting and Part 2 stamina/recharge/Trackometer input remain accepted, unchanged baselines.

## Approval and current boundary

The human approved these three parts and the [product specification](spelunking-spec-draft.md) on 2026-10-12. Prior Part 1 backend/UI acceptance and Part 2 direct completion approval on 2026-10-14 remain valid. Explicit human authority on 2026-10-15 closed accepted #435/#436; Part 3 #437 and parent #434 were closed as completed under later explicit authority on 2026-10-17. Earlier keep-open instructions remain historical and superseded only for their authorized issues. Accepted evidence limits remain unchanged; no clean-runtime, whole-feature deployment, push, PR, connected-game parity, or verification rerun is claimed. See [Part 3 closing handoff](https://github.com/Sludging/idleon-efficiency/issues/437#issuecomment-6226898022), [parent closing handoff](https://github.com/Sludging/idleon-efficiency/issues/434#issuecomment-6226899621), and [current handoff](spelunking-research-brief.md#current-handoff).
