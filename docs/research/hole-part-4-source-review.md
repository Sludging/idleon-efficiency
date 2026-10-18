# Hole part 4: v1.23 source review

**Scope:** Source-only review against [approved backend plan](../plans/hole-part-4-backend-plan.md). Source is `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt`. Findings establish source behavior, not parity with a live or imported game state. No runtime query or save mutation was performed; prior handoff reports `/game-version` timed out and says not to retry.
**Current status:** These are historical source-only findings. Approved static prerequisites were subsequently fulfilled; the accepted backend plan and current handoff supersede open prerequisite questions below. Source findings remain bounded and do not prove runtime parity.


## Findings

### Wishes: no per-wish access gate found in purchase path

The Lamp purchase handler accepts selected wish index `this._GenINFO[115]` when it is nonnegative, compares stock `[11][25]` against `LampWishCost(index)`, deducts cost, and increments `[21][index]` (269729–269737). This path has no wish-specific unlock condition. Wish 0 additionally increments slot count, capped at 12 (269740–269742). This supports recording each saved wish level/state and current cost without modeling a source-level per-wish access gate. It does not establish that every save has all 12 state entries, or that every wish is reachable in every UI/account state; source path is not a runtime parity observation.

The approved plan describes wish metadata in `LampWishRepo`, but neither this handler nor cited static declaration evidence proves a formal contract guaranteeing a wish at index 5. The static catalog must be checked directly before claiming that record is guaranteed. Source formula/purchase branch for wish index 5 alone would establish behavior if selected, not existence of corresponding generated metadata.

### Harp: slot coordinates are geometry; Cglunko is not part of planned current Harp output

`StringSlots` computes available slots from Cosmo plus B_UPG 32–36, capped at 15 (241003–241012). `StringXpos` returns pixel coordinates using three spacing branches for fewer than 8, fewer than 12, and at least 12 slots (241025–241030). These values are presentation geometry, not game output or a progression effect. The plan requires saved layout/slots and power, note, and string outputs; it excludes a rendered layout implementation.

The plan’s cited Harp power source is 261860–261890 and string passive/strum source is 261980–261996, 264267–264301, 265615–265620, and 268037–268042. Those formulas are the relevant current-state Harp outputs. The previously reviewed code concern is that Harp stores a passed Cglunko value but its power/hour formula does not consume it. Nothing in the approved required outputs supports adding that value as an input merely because it is passed/stored. Cglunko remains Gaming-owned; do not infer a Harp effect. The exact functions/ranges above derive from approved plan evidence; this review did not find another Cglunko consumer in those Harp formulas.

### Well: bucket slots, missing stock, and expansion are distinct

Source treats `Holes[10][bucket]` as bucket-to-sediment assignment. UI shows `|` when mapped stock `Holes[9][sediment]` is negative, rather than displaying that value as a spendable stock amount (261633–261640). Assignment UI checks bucket ownership and blocks selection when that mapped stock is negative or sediment type 9 is selected (263566–263579); source does not explain why stock is negative. This is a missing/unavailable marker, not evidence of a known obstruction cause.

Bucket assignment positions are bounded by `BucketsOwned`; assignment selection rejects an index outside owned bucket count (`idleon1.23.txt:263590–263594`). Source defines the count as one default bucket plus owned B_UPG 3–11 (`240749–240758`). Do not confuse owned assignment slots with sediment stock entries.

Well Opal expansion has a separate affordability predicate: `CanWeAfford_Well` compares Gravel stock `Holes[9][0]` against `WellOpal_cost` (`idleon1.23.txt:240780–240794`). `HoleCurrencyRepo` and `SedimentRepo` identify index 0 as Gravel (`HoleCurrencyRepo.ts:7–12`, `SedimentRepo.ts:9`). Cost uses Well expansion level `Holes[11][9]`; levels 1 and 2 have costs 6 and 60, otherwise the source formula applies. The purchase spends Gravel, increments `[11][9]` and `[7][0]`, then calls `createOpal` (`263580–263587`). The website maps saved `[7][study.index]` into cavern-specific Opal sources and names index 0 “Purchased an Opal with Well sediment” (`hole.tsx:2282–2306`); this is the Well-only source value, not account-wide Opal totals. `Well.opalAffordable` represents Gravel affordability, not a bucket-count/unlock gate. Bucket count purchases are separate. The UI branch checks B_UPG 12 before toggling `[11][10]` (`263588–263589`); that is not an expansion threshold.

### Well: hypothetical time to fill

Game source calls `BucketFillRate(bucketIndex, 0)` for each owned bucket's assigned sediment (`idleon1.23.txt:265588–592`). The rate function receives bucket index, not sediment index (`240760–240779`), so current prepared per-bucket rates support a target-independent hypothetical reassignment while bucket ownership, gold status, and bonuses stay unchanged. `Well.prepare` stores those rates; current assigned group rates still require known assignments (`well.tsx:142–179`).

The Well table's “Full in” calculation uses `max(0, capacity - stock) / sum(rate for every owned bucket)` hours. Capacity remains the current per-sediment `100 × 1.5^level × (1 + unlockRequirement / 100)` (`well.tsx:73–80`; game source `240759`). This estimate asks only how long all owned buckets would take to fill one sediment at current rates. It does not use the auto-expansion toggle, level-14 gate, or Study overflow conversion; it does not modify assignments or predict expansion. At or above capacity, it reports Full without requiring production. Missing stock/capacity, ownership, or any owned-bucket rate remains unavailable; a known zero total rate below capacity reports “No production.” This is a website hypothetical display, not a game-generated forecast.


### Static index/record guarantees are not established by source alone

Wish index 5 behavior is represented by a source branch/formula and saved index access, but that does not guarantee the generated `LampWishRepo` contains index 5. The approved plan says the repository already supplies wish metadata; that is project evidence, not a game-source guarantee. Verify the actual generated catalog if implementation needs that contract.

The Bell formula indexes `HolesInfo[59]` at `round(2*t+1)` for a bonus family (`BellBonuss`, 240969), and plan source identifies seven bonus families and seven `BellBonusRepo` records (308445; plan lines 70–74). This proves formula expectations/index mapping in source, not a universal runtime guarantee that all seven records are present in every save. Static coverage is a generated-data contract and must be verified in repository data, not inferred from game formulas. The source’s indexed access assumes the relevant table entries exist; it does not establish how the website repository is initialized.

## Evidence limits and disposition

- Source establishes predicates, indices, formulas, and UI writes at cited locations.
- No v1.23 runtime parity was observed for these mechanics. Existing handoff explicitly reports no applicable paired save; no retry was made.
- Exact existing plan references supply the broader Harp behavior ranges and seven-record static-data claim. This review does not claim those generated records from source alone.
- Current code concern about passing/storing Cglunko is not a reason to add a Harp current-output dependency under the approved plan.
### Well: automatic expansion trigger and snapshot timing

The v1.23 periodic update first adds each owned bucket's `BucketFillRate × elapsedSeconds / 3600` to its assigned sediment stock. It then visits each of ten sediment types. If stock is at least `SedimentMax`, it first clamps stock to capacity. Only after that clamp does it test automatic expansion. (`idleon1.23.txt:265588–604`; capacity is `100 × 1.5^level × (1 + HolesInfo[21][sediment]/100)` at `240759`.)

Automatic expansion therefore triggers at the capacity threshold, not at an earlier overflow amount: stock must reach or exceed current capacity during that update. The next operation requires saved `Holes[11][10] == 1`. It is suppressed when current sediment level `Holes[8][s] >= 14` and `B_UPG(13,1) == 0`. If enabled, stock is reduced by `capacity / round(2 + 2 × StudyBolaiaBonuses(0,99))`, then level increments by one. Thus a successful event leaves stock below the *old* capacity; it does not carry all overflow forward. Since the source evaluates the update's accumulated stock before clamping and reduction, crossing the threshold during a tick can trigger the event that tick. `B_UPG(13,1)` removes the level-14+ suppression; it does not bypass the saved toggle.

**Snapshot ETA feasibility:** Current stock, capacity, grouped current rate, and parsed gates suffice only for an explicitly approximate *current-rate* time to the next capacity crossing when stock is known, rate is positive and known, the auto-expansion toggle is known enabled, and level gate is open (level below 14 or B_UPG 13 ownership known). Compute `(capacity - stock) / groupedRate` in hours, bounded below by zero; the fill step is linear in elapsed hours (`265588–592`). This estimates threshold crossing, not exact event time: source processes elapsed time in periodic updates, and does not expose a fixed tick cadence here. It also assumes current grouped rate stays constant.

If stock is already at/above capacity, threshold duration is zero (next qualifying update), not a positive wait. If the toggle is known off, report automatic expansion disabled, not an ETA. If level is at least 14 and upgrade ownership is known absent, report capped, not an ETA; known ownership present keeps gate open. If stock, rate, toggle, level, or relevant upgrade ownership is unknown, report unknown rather than zero or a forecast. A zero rate below capacity means no crossing under current-rate assumptions; it is not a finite ETA. The threshold ETA does not predict successive expansions: each event changes level and capacity, and uses Study's factor in the stock reduction.

This is a source-derived model, not runtime-observed behavior. Source inspection does not establish snapshot freshness, update cadence, or whether parsed application fields preserve every gate as known/unknown; do not claim those facts without checking the consumer's actual parsed fields. No runtime query or save mutation was used.
