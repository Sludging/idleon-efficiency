# Menagerie core: versioned evidence

Scope: first-look player-mechanic research for v1.23 `Luminous_Menagerie`. This note reuses relevant findings from [v1.23 work summary](v1.23-work-summary.md), without treating that summary as a formula specification. Research only; no implementation or save refresh.

## Supported player-facing account

- **Missions:** Catalog and `MissionProg` cover **33** mission IDs, 0–32 (`MenagerieMissionRepo.ts:7-241`; native source `118907–118980`). Main UI renders up to seven mission rows, showing each current requirement, progress, and Shell count (`297110–297160`, `297167–297187`). `UpgUnlocked(0)` is the number of mission entries currently available, capped by catalog length; it adds bonus sources from Menagerie bonuses, Research 164, Jade Emporium 47, and Thingies (`118691–118700`). Thus unlocked mission count is distinct from the seven-row display capacity.
- **Mission loop and Shells:** Claiming a completed mission (`CanClaim(0,i)`) increments its saved completion count `Menagerie[1][i]` and total Shells `Menagerie[0][1]` by one (`297327–297336`). `ShellEXPreq` determines the displayed threshold (`118706–118716`, `297388–297399`). At that threshold, a delayed UI transition subtracts exactly the threshold from `[0][1]`, increments Lumi rank `[0][2]` by one, then refreshes Shells, unlock rows, and bonus rows (`297040–297064`, `297401–297430`). Shells do not pay mission claims. Progress itself comes from current account stats, not a saved progress counter (`118907–118980`).
- **Lumi, ranks, and upgrades:** `Menagerie[0][0]` is the saved Lumi balance: the menu displays `LumiGainRate` as Lumi per hour (`297101–297106`), and a timer adds that rate to `[0][0]` when `[0][2] > 0` (`297432–297451`). `LumiGainRate` starts at 10 and applies account bonuses (`118717–118741`). `Menagerie[0][2]` is Lumi rank; rank controls Lumi generation and unlock availability for two five-row purchase lists (`118702–118705`, `118718–118741`, `297193–297241`, `297255–297300`). First list purchases unlocks using Lumi, sets `Menagerie[2][i]` owned, and subtracts cost from `[0][0]`; second list purchases upgrade levels in `[3][i]` and likewise spends Lumi (`297200–297211`, `297255–297270`, `297342–297360`). `CanClaim(1)` additionally prevents buying an already-owned unlock; `CanClaim(2)` checks Lumi affordability (`118764–118770`). These lists' unlocked purchase rows are not mission slots.
- **Rank meaning:** The UI names these Lumi ranks `Lumi_Rank_*` and shows required-rank messages beside locked rows (`297232–297241`, `297291–297300`). Rank is `[0][2]`; the Shell threshold is rank-dependent and capped at 15 (`118706–118716`). When the displayed Shell count meets threshold, the menu schedules a delayed rank-up after its shell animation; it subtracts threshold and increments rank by one (`297040–297064`). No manual rank-up button or automatic non-menu transition was found in this source path.
- **Initial access:** `LilTownJellyUnlocked` returns `1` unconditionally; its rank and Research checks are evaluated but discarded by the comma operator (`118742`). One town menu opener calls this helper before setting menu 109, so that path is always allowed (`435637–435639`). Another menu-109 opener checks movement only (`457343–457344`). No rank-zero or Research-165 access gate applies in these inspected v1.23 paths.


All ranges below refer to `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt` (v1.23, `Luminous_Menagerie`), read directly from the local matching-version source:

| Source range | Evidence |
|---|---|
| 118689–118705 | Empty-save guard; available mission count and Lumi-rank unlock counts. |
| 118706–118716 | Shell icon/rank requirement count. |
| 118717–118742 | Lumi generation and unlock condition. |
| 118743–118758 | Mission, unlock, and bonus costs. |
| 118759–118770 | Mission-completion and purchase affordability predicates. |
| 118771–118805 | Account effect resource counts, unlock ownership, and saved bonus levels. |
| 118907–118980 | Mission progress computed from 33 current account/game inputs. |
| 297101–297106 | Main menu Lumi-per-hour display. |
| 297110–297187 | Mission-row display, Shell count, requirements, and current progress. |
| 297193–297300 | Lumi-rank-gated unlock and bonus purchase lists. |
| 297327–297360 | Mission claim and Lumi purchase state mutations. |
| 297385–297451 | Shell icon refresh and periodic Lumi balance gain. |
| 297040–297064 | Shell animation and delayed rank transition: threshold Shells subtracted; rank incremented. |
| 435634–435639, 457343–457344 | Menagerie menu open events and access predicates. |
| 240387–240391 | Prime Killroy total aggregation from `KRbest.h`. |

- **Player terminology:** Generated unlock catalog provides player labels and access context (`MenagerieUnlockRepo.ts:9-28`). This task did not fetch Wiki pages; catalog text does not establish formulas.
- **Handoffs/issues:** Existing relevant handoff is `docs/research/v1.23-work-summary.md`. No issue-tracker lookup occurred.

## Evidence anchors and limits

- **Version/runtime readiness:** Offline `GET /status` returned `source=offline`, `cdpConnected=true`, `injected=true`, `gameReady=true`, character `3`, scene `ySnowaTown`, scheduler paused. `GET /game-version` returned `{"title":"Luminous_Menagerie","version":"1.23"}`. No fixture refresh or live-server access occurred.
- **Runtime limits:** Earlier Menagerie function-source and state queries returned HTTP 500. This task used readable, matching-version local source instead; no live access or personalized parity check occurred.

The source establishes mission claims grant Shells, Shell totals trigger delayed rank progression, Lumi buys upgrades, and Lumi generation adds to saved balance.

## Remaining uncertainties

1. Patch notes' “25 missions” wording conflicts with 33 catalog/progress entries. Source proves 33 implemented entries and account-dependent available count; it does not explain patch-note number.
2. Exact cadence context: menu actor ticks Lumi every 15 seconds off the two named maps and every second on those maps (`297432–297451`). Broader offline accrual behavior was not inspected.
3. Full descriptions and display units for all 25 bonuses remain outside this focused action-cycle research.

The source establishes rank-up timing and mutation, initial menu access, and mission claim effects. Matching v1.23 local source provides mechanic evidence; no personalized parity conclusion follows.