# Menagerie: proposed delivery parts

**Status:** Historical proposal record. Part 1 completed and human-accepted — 2026-10-18; #467 is closed as completed. See the [current handoff](menagerie-research-brief.md#current-handoff) for accepted implementation and verification limits. Part 2 remains proposed and unselected. The original Part 1 UI proposal below is superseded by the accepted handoff, not current binding design. **Tracking:** [Menagerie feature issue #466](https://github.com/Sludging/idleon-efficiency/issues/466); [closed Part 1 delivery issue #467](https://github.com/Sludging/idleon-efficiency/issues/467).

The parts below are two substantial player outcomes, each spanning trusted account information through usable UI. They are not parser/UI/calculation work layers. Part 2 depends on Part 1's Menagerie account context, page, access, and Lumi presentation. Part 1 does **not** depend on all Part 2 panels being delivered. The jellyfish catalog and models are present and align with known static needs; this bounded comparison found no confirmed new upstream static blocker. Purple/Yellow Lumi formula validation remains necessary; missing formula details are IE-owned investigation unless later evidence proves a fixed input is absent. See the [side-jelly evidence note](../research/menagerie-jelly-evidence.md). Do not show a guessed or placeholder rate. These are implementation prerequisites within affected outcomes, not a separate horizontal part, and do not create a circular dependency.

## Part 1 — Understand Menagerie progression and Lumi

**Outcome:** From an imported account, players can understand Menagerie access and progression: available missions and their current tasks/progress, Shell and rank state, Lumi balance and rate, one-time unlocks, all 25 repeatable bonus entries, purchased levels and current effects, and currently usable resources. Use only verified in-game names, descriptions, and tooltips. Apply verified effects once to existing IE calculations where recipients are already modeled. Do not assume new recipient models or rebuild structural unlock recipients.

**Implementation gate:** Part 1 and its backend plan are approved. Obtain matching v1.23 native outputs paired with the same real save before domain code or meaningful failing tests. No synthetic save permutations or implementation-derived expected constants. Accurate Lumi/hour requires all verified factors, including incoming patch flags/bonuses; never substitute zero. Part 1 is not complete until all acceptance outcomes, including accurate Lumi/hour, are satisfied.

**Backend information needs:**

- Use the inspected v1.23 menu-open behavior: no rank or Research access gate applies. Keep saved Shells, displayed threshold, and Lumi rank distinct.
- The displayed threshold triggers delayed rank-up and Shell subtraction in-game; IE reports imported state and does not simulate the transition.
- Derive mission availability from the account-dependent rule. Show catalog entries and available missions accurately; 33 implemented IDs and seven visible rows do not mean 33 or seven are available. The persistent top summary shows available-mission count, with a tooltip explaining verified contributors and where additional missions come from; do not guess a cap. Show each mission's saved claim count, first unclaimed requirement, and current account-stat progress separately. Later thresholds already met do not replace the current task.
- Provide verified in-game mission, unlock, and bonus names/descriptions/tooltips only. Unlocks are one-time purchases, not levels; bonuses are repeatable levels. For every bonus, distinguish availability, current level/effect, valid next effect/cost, and affordability where supported.
- Read saved Lumi balance and calculate hourly generation from all source-verified factors. Menagerie bonus 1 times rank is a separate multiplicative factor, not part of the final additive percentage pool. Preserve native operation order and include required saved inputs from incoming systems without rebuilding their structural features. Never substitute zero for a missing modeled factor. Resolve Purple and Yellow values against supplied catalogs and source evidence; request upstream extraction only if source proves fixed data is absent. Do not extrapolate balance from import time.
- Track usable resources available now, including remaining doubler resources where applicable. Preserve owned/consumed/remaining distinctions internally; do not default to historical owned/used display.
- Apply verified effects to existing modeled values once, without duplicate application. Showing Verisimilitude artifact, Singularity, Crucible, Nightmariner, or similar unlock ownership/descriptions does not include building those recipient systems.

**UI information and interactions:**

- Explain access state where verified; show imported Lumi rank, Shell progress against a verified threshold, saved Lumi balance, and verified Lumi/hour.
- Keep the available-mission count in the persistent top summary. Its tooltip explains verified availability contributors and where more missions come from. In Missions, distinguish available and locked; show saved claim count, first unclaimed task requirement, and current account-stat progress separately. Later thresholds already met may be noted in text but cannot replace the current task.
- Show **Ready** only for an available mission meeting its current task. A locked mission that meets several task thresholds keeps its first unclaimed task and Locked state; account progress alone never advances claims, awards Shells, or makes it Ready.
- Show one-time unlocks without upgrade-level language. For available unowned unlocks, show verified purchase cost and affordability where supported. Use source-confirmed identity and in-game description/tooltips only.
- Present bonuses with state-specific aligned rows: locked entries show verified source description/art and required rank/unlock condition, without current benefit or next-level/cost/affordability fields; available entries show level, current effect, and valid next effect/cost/affordability. Keep available level-zero separate from locked. Omit next-level fields only at a source-confirmed cap.
- Show usable resources now. Do not default to owned/used histories; retain those distinctions internally. Keep details visible without requiring hover.
- Allow browsing, filtering, and detail inspection. Use existing account/profile loading behavior and identify data as imported account state, not live state. The current Part 1 information structure is accepted for backend planning, subject to review against a rendered page; exact visual design and rendered proof remain later work.

**Acceptance outcomes:**

- A player can distinguish access, available missions, saved claims, first unclaimed task, current-stat progress, later thresholds met, Shells, rank, Lumi balance, and Lumi generation without confusing their meanings.
- Mission list reflects account-derived availability and current progress; top summary shows available-mission count and tooltip explains verified contributors and where more missions come from. It does not hardcode a count cap or treat seven display rows as an availability cap.
- A locked mission meeting multiple thresholds still shows the first unclaimed task and remains locked. Only an available mission meeting its current task is Ready; progress alone never claims, grants Shells, or marks Ready.
- All 25 catalog bonuses and unlocks have accurate availability/ownership information. Unlocks are one-time; bonuses are repeatable. Displayed effects and levels reflect the account, not unowned potential.
- Show current saved Shells against the source-confirmed displayed threshold and imported Lumi rank. Threshold readiness is current-account information; IE never simulates rank-up or Shell consumption.
- Lumi/hour matches verified incoming Purple/Yellow inputs and matching-version game output. No placeholder rate is presented as accurate.
- Verified effects update their already-modeled recipients once; no new recipient models or structural extensions are assumed.
- Repository verification uses paired matching-version native expected values and account saves, asserting domain public outputs for meaningful state boundaries, resource ownership/use, and confirmed calculations. Actual route proof exercises this outcome with imported account data; a preview alone is insufficient.

**Evidence and prerequisites:** Matching v1.23 source establishes claims grant one Shell, mission progress uses current game statistics, availability is account-dependent, and inspected menu-open paths have no rank or Research gate. The Shell threshold triggers delayed rank-up and Shell subtraction; IE reports imported state only. Lumi is `[0][0]` (not Shells); rank gates generation and purchases. Menagerie bonus 1 times rank is a separate factor, not part of the final additive percentage pool. The 25-entry bonus catalog and saved levels are established. Personalized native-output parity remains unverified. Complete save mapping and compare calculations and recipients against matching-version outputs. Supplied jellyfish catalog/models expose no confirmed static blocker; model source-verified Lumi inputs without rebuilding unrelated structural features. See [research brief](menagerie-research-brief.md), [core evidence](../research/menagerie-core-evidence.md), and [side-jelly evidence](../research/menagerie-jelly-evidence.md).

### Proposed Part 1 page structure

**Status:** Part 1 information structure accepted for backend planning; not an approved backend plan or rendered design. Keep existing site styling and game imagery. A World 7 Menagerie entry is the proposed navigation home; account-wide state does not require a separate account-navigation category. The user may revisit this structure against a rendered page.

**Reference traits:** [Sushi page](../../app/world-7/sushi/content.tsx#L28-L43) keeps its overview above Collection/Upgrades tabs; [Sushi overview](../../components/world-7/sushi/sushiOverview.tsx#L64-L125) puts currency balance beside hourly rate. [Research](../../components/world-7/research/researchContent.tsx#L177-L203) groups progression and gains in persistent summary sections before content tabs. These are source-inspected composition references; no browser appearance was verified in this planning pass.

#### Page frame and persistent summary

Use one Menagerie title, a compact two-group summary plus available-mission count, then three peer content tabs: **Missions**, **Unlocks**, **Bonuses**. Missions opens by default. Changing tabs replaces only the content below; rank, Shell progression, Lumi balance, Lumi/hour, and available-mission count remain visible.

| Summary group | Fields | Presentation and meaning |
|---|---|---|
| Rank progression | Lumi rank; Shell count against the verified requirement for the next rank | Rank is the primary value. Shell artwork and a compact progress indicator sit below it. Exact Shell-to-rank semantics must be resolved before choosing the denominator or a readiness label. Do not substitute lifetime mission claims for current Shell progress. |
| Lumi | Saved balance; current calculated Lumi/hour | Balance is the primary value; rate sits beside it, following Sushi's balance/rate relationship. Use verified game artwork and exact-count detail when compact notation is used. Do not add projected balance or time-to-purchase. |
| Mission availability | Available mission count | Keep count in persistent summary. Tooltip explains verified contributors and where additional missions come from; do not imply an overall count cap or invent unlock sources. |

Access/loading state follows existing account behavior. A verified locked feature has a concise access explanation, not fabricated zero progression. The existing shared data-status surface remains authoritative; no separate Menagerie refresh system or live timer is proposed.

Do not add a separate Overview tab, full-page statistics dashboard, or per-character selector. The persistent summary already serves as overview, and this feature state is account-wide. Keep other mission counts within Missions and unlock counts within Unlocks, not repeated across the top.

#### Missions tab

**Player question:** Which available mission requirements does my account meet, and what remains?

- Show available-mission count in persistent summary; its tooltip explains verified contributors and where more missions come from. In this tab, show ready count and state once that each in-game claim grants one Shell. Keep source/game order; do not rank missions by recommended effort or value.
- Use aligned mission rows rather than a selected-mission leftnav. Each row contains verified game identity/artwork, source-provided requirement text, current task derived from saved claim count, current account-stat progress, and status.
- Display first unclaimed requirement separately from current account progress and later thresholds already met. If progress exceeds the current requirement, it may be stated as text; do not substitute a potential-threshold counter for current task.
- Use **Ready**, **In progress**, and **Locked** as website statuses. A mission is Ready only when available and its current task is met. A locked mission meeting multiple thresholds keeps its first unclaimed task and remains Locked. Progress never changes saved claims or grants Shells. After an in-game claim, imported claim count and current requirement change.
- Keep all real mission records visible by default, including locked ones. A simple status filter can show all, available, or ready missions. Locked rows explain only the verified availability condition.
- Preserve verified per-mission measurement labels rather than presenting unrelated values under a generic bar. Clamp only visual progress at completion; retain true numeric progress.
- No claim button, auto-claim simulation, time estimate, or reproduction of the game's seven-row viewport.

#### Unlocks tab

**Player question:** What have I unlocked, what can I buy, and what rank or Lumi requirement remains?

- Use a dense card grid for one-time unlock purchases. Keep game order and show all real entries, including owned and rank-locked entries.
- Each card shows verified game artwork/identity and in-game description or tooltip, ownership/availability status, and verified rank/cost context where applicable. Do not manufacture titles or explanatory descriptions.
- Distinguish **Owned**, **Available**, and **Rank locked**. For an available unowned entry, show whether saved Lumi covers its cost. Affordability is not another unlock state.
- Owned entries do not show a misleading next-purchase cost. Locked entries show their verified rank/unlock condition and source description/art; do not imply they can be purchased now.
- An unlock card may show source text for Verisimilitude, Singularity, or Crucible. That does not claim IE supports the newly unlocked mode or link to a nonexistent page.

#### Bonuses tab

**Player question:** Which available bonus levels do I own, what do they currently grant, and what would the next level cost?

- Present all 25 entries in game order as aligned contextual rows, not a rigid table with blank or irrelevant columns.
- For locked entries, show verified in-game description/art and required rank or unlock condition. Do not show current benefit, next-level comparison, next cost, or affordability.
- For available entries, including available level-zero entries, show current level and current benefit plus next effect/cost and affordability where valid and supported. Do not repeat unlock criteria in available rows.
- For source-confirmed maxed entries, omit next-level fields. Do not invent caps or assume every bonus uses a simple multiplier.
- Keep resource rows focused on usable balances now, including available/remaining Black Stars, Organic Labels, and Minehead/Sushi/Jelly Operator doublers where supported. Do not default to owned/used histories; preserve those distinctions internally.
- Show only verified in-game identities, descriptions, and tooltips. Current/next effects use confirmed game text/values; do not add mechanic prose. No buy buttons, bulk-purchase controls, efficiency rankings, or return-on-investment sorting.
- The page displays verified current effect values; integration separately applies a verified effect to an existing IE calculation, such as cooking speed or research EXP, without new recipient models.

#### Tabs versus left navigation

Do not stack a sidebar containing Missions/Unlocks/Bonuses beside tabs containing the same categories. Part 1 has no separate entity that needs persistent selection, so a leftnav would only hide comparable list information behind another click.

Part 2 can later add a **Jellyfish** peer tab, with six color selectors inside if panel detail warrants them. That future inner selection is not a Part 1 sidebar, disabled placeholder tab, or permission to implement Part 2 early.

**Check limits:** This section establishes information hierarchy and fields only. No Menagerie UI has been rendered or exercised. Later UI planning must evaluate a browser-rendered preview; final UI delivery must prove the fields against imported account outputs.


## Part 2 — Understand all six side jellyfish

**Outcome:** Players can inspect all six side jellyfish—Purple, Blue, Red, Silver, Yellow, and Green—from the imported Menagerie account. Each panel shows verified unlock state, saved progression, relevant resource or readiness, and source-backed descriptions/current effect values. Apply verified effects once to existing IE calculations where recipients are already modeled. This is one complete experience; no color is a separate delivery part.

**Blocked by:** Part 1, for shared Menagerie account/page/access/unlock/Lumi context. The supplied jellyfish catalog/models align with known static needs; no new upstream static blocker is confirmed. Part 1's accurate Lumi rate separately requires Purple/Yellow formula validation. Neither part waits for the other's full UI, so no circular dependency exists.

**Backend information needs:**

- Use supplied panel-to-unlock mappings and catalog fields alongside verified save semantics and dynamic formulas. The bounded catalog comparison found alignment with known static needs, not confirmed upstream blockers. IE owns save semantics, dynamic calculations, costs/effects, readiness, and native parity; do not prescribe repository shape or require a formula API.
- Purple: show coin-funded purchase progression and Lumi-generation upgrade; include both verified levels and their contributions to Lumi/hour.
- Blue: show persistent Ladle donation total and its daily-reset cooking contribution. Do not invent a claim-ready or spent state.
- Red: show stored reading opportunity and chapter progress; readiness requires positive stored opportunity, and reading resets that opportunity.
- Silver: show both Obol Fragment upgrades, levels and caps (100 and 190), and verified Obol MISC and automatic fragment-conversion effects.
- Yellow: show Construction's eighth-slot progress, four upgrade levels, verified coefficients/targets, and Lumi-generation contribution. Keep progress, purchased levels, and effects distinct.
- Green: show Gallery deposited/required count and threshold readiness for the Tome Immortal Nametag reward. Do not infer claimed or owned state from reaching the threshold; resolve ownership detection before asserting reward status.
- Apply each verified effect once to existing modeled recipient calculations only. Keep structural recipient systems out of scope.

**UI information and interactions:**

- Present all six named panels as a complete, consistent account view, with locked/unlocked state and only source-supported progress or effects. Do not split delivery into individual jellyfish.
- Explain Purple purchase levels and current Lumi effect; Blue saved donation and daily contribution; Red stored opportunity/readiness and chapter progress; Silver levels, caps, and effects; Yellow slot progress, levels, and effects; Green deposit count, requirement, and verified reward state.
- Distinguish owned progression, generated/stored resources, purchase levels, readiness, and spent/claimed state only where source and save data establish them.
- Explain the in-game actions without adding donation, purchase, reading, or claim controls. Required details must not depend on hover. Use imported account context, not live-state language; defer exact layout/navigation.

**Acceptance outcomes:**

- All six panels appear together with accurate account-specific unlock and progression information; no per-color omission or split delivery.
- Purple and Yellow contributions match the verified Lumi calculation. Blue's daily contribution, Red's reading readiness/reset, Silver's capped effects, and Yellow's progress/levels/effects match source-backed behavior.
- Green shows the 12-item Gallery threshold and reward identity only with evidence-backed semantics; it never labels the reward unclaimed or owned based on threshold alone.
- Verified effects update already-modeled calculations once. Unimplemented structural recipient features are not represented as supported integrations.
- Request upstream extraction only if later evidence proves a fixed static input is missing; no guessed constants or placeholder effects appear.
- Repository verification compares paired matching-version native expected values and account saves through domain public outputs for meaningful progression/effect boundaries. Actual route proof exercises all six panels with imported account data and checks visible outcomes; a rendered preview alone is insufficient.

**Evidence and prerequisites:** Matching v1.23 source and supplied catalog/model establish six color/unlock mappings and align with known static needs; no new upstream static blocker is confirmed. Catalog labels are not verified verbatim in-game copy. IE owns dynamic formulas, saved state, costs/effects, readiness/order, and native parity. Green claimed/owned detection and some labels remain unresolved. No deeper Part 2 investigation, live runtime output, or personalized parity is claimed. See [research brief](menagerie-research-brief.md), [side-jelly evidence](../research/menagerie-jelly-evidence.md), and [site/workflow research](../research/menagerie-site-research.md).

## Scope risks and backend-planning handoff

- Imported account save semantics and paired native parity remain implementation checks; source confirms the inspected menu has no rank or Research access gate and Shell threshold triggers delayed rank-up with Shell subtraction. IE must not simulate the transition.
- Model every source-verified Lumi factor and keep Menagerie bonus 1 times rank as its own multiplicative factor. Include required saved inputs from incoming systems without rebuilding their unrelated structural features or substituting zero for missing modeled values.
- Green ownership detection remains specifically unresolved.
- Verify recipient quantities and resource-use semantics against native source; preserve every approved existing output. No IE class-experience gain output exists for bonus 23, so do not add a recipient.
- **Mission coverage inventory:** Complete; all 33 source inputs are mapped. Classes are C 10, C* 1, R 22, M 0, U 0. These counts are source mappings, not parity results. ID 32 is a bounded `KRbest` sum/filter/round transform.
- Native paired-save parity and actual-route proof have not yet been performed. Acceptance of the Part 1 presentation does not waive these evidence gates.
- Part 1 is selected and approved; its backend plan is approved — 2026-10-17. Public domain seams and paired native-output TDD are approved. Before domain code or meaningful failing tests, obtain matching v1.23 native outputs paired with the same real save; do not use synthetic save permutations or implementation-derived expected constants. No personalized parity is established. Part 2 remains unselected, and its rendered design is unapproved.
