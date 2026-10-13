# Spelunking part 1: backend plan

## Outcomes

Provide the backend information for [#435 — tunnel, Lore, and discovery progression](https://github.com/Sludging/idleon-efficiency/issues/435):

- Distinguish available and locked tunnels from completed Lore milestones. Provide access requirements, boss identities, encounter depths, intrinsic unlock descriptions, best depths, and biggest hauls.
- Provide separate ordinary and Grand Discovery collections, with tunnel context, requirements, found/missing state, and tunnel/account totals.
- Match progression to relevant game information beside each entry. Support later browsing and found/missing or locked filters; spoilers remain visible and **Show locked** starts enabled.
- Supply backend facts for object POW/HP, spawn depths, destruction/discovery actions, intrinsic drops, Lore unlocks, Grand requirements and rarity, and settled-haul escape/toll context. Keep authored presentation wording out of domain records.

This plan delivers backend data, not page composition or rendering. Gathering, Journal, stamina, shop/equipment progression, and advanced-mode displays belong to the other delivery parts. Existing upgrade metadata supplies the Grand requirement without adding a shop feature or personalized delve calculation.

## Responsibilities

Extend [the existing Spelunking domain](../../data/domain/world-7/spelunking.tsx); do not add another account owner.

- **Spelunking** initializes released tunnels and upgrades, coordinates aspect-owned save parsing, and derives account access and separate collection summaries from its own state. It has no separately registered preparation phase.
- **Tunnel** owns one cohesive parsing section, following the Hole Well/Fountain aspect pattern. It owns saved Lore completion and records, ordinary ownership, and Grand progress. Separate its final Lore boss from ordinary objects. Derive access and Grand eligibility from authoritative state rather than storing requirement snapshots.
- **Discovery** owns tunnel-local identity and found state. Normalize saved names at the parsing boundary; use exported catalogue names unchanged. Keep generated metadata on `data` where direct access supplies the needed fact. Add developer comments for non-obvious numeric meanings rather than copied descriptive fields.
- **Numbered Grand rows** are data-only values with tunnel identity, number, and found state. Numbers start at one. Tunnel supplies their behavior; there is no Grand class or named-item catalogue.
- Keep Chapter/Upgrade structures and raw `Upgrade.getBonus()` / `Spelunking.getUpgradeBonus()` contracts unchanged. Derive the verified Grand gate from the existing upgrade; do not retain another mutable upgrade projection.

Selected [backend pattern](../agents/backend-patterns.md) aspects: [FriendBonus](../../data/domain/friends.tsx) supplies repository wrappers and `fromBase` initialization; [Sushi records](../../data/domain/world-7/sushi.tsx) supply named data-only relationships. Hole Well/Fountain aspects supply cohesive aspect-owned parsing. [Meal](../../data/domain/world-4/cooking.tsx) keeps mechanics on their responsible concept. Direct metadata access is appropriate when a wrapper field would only copy an existing value; purchase-preview APIs do not apply here.

## Required data and prerequisites

### Save boundary

Translate raw positions here only. Downstream logic consumes named state, not raw keys or opaque numeric fields.

| Save input | Named meaning |
|---|---|
| `Spelunk[0][t] >= 1` | Tunnel `t` Lore completion, not its access. |
| `Spelunk[1][t]` | Normal best raw depth. Preserve the game's record-panel value. |
| `Spelunk[2][t]` | Largest settled Amber haul; preserve string-to-number handling. |
| `Spelunk[6]` | Ordinary names recorded on destruction; normalize underscores and surrounding whitespace on saved names only. Exported names are already normalized. |
| `Spelunk[44][t]` | Grand found count; zero-based ordinal `n` is found when count exceeds `n`. |
| `Spelunk[5]` | Existing upgrade levels; `-1` means locked. Translate this sentinel before evaluating the Grand requirement. |

Preserve other Spelunking-owned saved fields. Parsing must overwrite affected progress for missing, partial, and changed saves. Hat Rack owns deposited hats from `Spelunk[46]`; Tome reads their saved sequence count from Hat Rack, not a duplicate Spelunking field.

### Static metadata and source rules

- Existing tunnel metadata supplies released entries, names, intrinsic Lore descriptions, bosses, encounter depths, and ordered objects. Retain the nonempty-object filter for future slots. Ordinary capacity excludes each final boss row.
- Document discovery metadata meanings at their owner: `x1` base POW factor, `x2` base HP, `x3` contextual Amber factor, `x4` depth-scaling flag, `x5` scaling multiplier, `x6` raw spawn depth, and first-row `x7` tunnel POW factor. Other `x7` filler values are not POW inputs. Amber factor is not a fixed drop quantity. Do not copy metadata into extra records solely to rename it.
- Current tunnel/object metadata matches v1.22 after underscore/space, whitespace, and filler normalization. Keep raw best-depth records unchanged: the record panel shows raw depth, while run/end depth shows raw depth plus one. Spawn thresholds are raw; exported boss encounter depths use displayed depth. Expose this distinction beside contextual thresholds.
- The first tunnel is available initially. Scan Lore completion before the final released tunnel; the highest completed scanned index grants available tunnel count `index + 2`. Tunnel access uses this count, independently of that tunnel's own Lore completion.
- Grand eligibility requires tunnel access, the **Grand Discoveries** upgrade, an already-discovered final ordinary object, and remaining capacity. First destruction records the ordinary object instead of a Grand Discovery. Each later Grand Discovery is twice as rare; provide this contextual rule, not a personalized chance.
- Define one module-local handwritten mechanic constant, `GRAND_DISCOVERIES_PER_TUNNEL = 10`, and one named mechanic reference, `GRAND_DISCOVERY_UPGRADE_INDEX = 43`. These are carried-over source rules, not new WikiBot fields or description parsing. Derive account Grand capacity from released tunnel count multiplied by the named capacity. Derive the final ordinary object from existing ordered metadata.
- The named Grand upgrade must be unlocked and have a source-equivalent bonus of at least one. Its existing bonus-per-level metadata and nonnegative purchased level supply that bonus; the current effective helper does not modify this upgrade. No character or cross-domain update is required for this gate.

Source references: `ActorEvents_579._customBlock_Spelunk` branches `CavesUnlocked`, `DoWeHaveLoreN1`, `RockTypeCreated`, `RockPOWreq`, `RockHP`, `RockAmber`, `ShopUpgBonus`, and `GrandDiscoveries_Total`; `ActorEvents_713.prototype._event_4` destruction/eligibility/drop mapping; `_event_5` records and collection counts; `_event_6` Grand popup; `_event_7` selection; `_customEvent_SpelunkStuff` settled exits. Existing [tunnel metadata](../../data/domain/data/SpelunkingTunnelRepo.ts), [discovery schema](../../data/domain/model/spelunkingDiscoveryModel.ts), and [upgrade metadata](../../data/domain/data/SpelunkingUpgradeRepo.ts) supply the mapped inputs. [IdleOn Wiki — Spelunking](https://idleon.wiki/wiki/Spelunking) supplies player-facing vocabulary. Current source and audit captures are indexed in the [research brief](spelunking-research-brief.md#current-offline-game-source); offline inspection is not live parity.

### Tunnel, discovery, and action context

| Context | Required backend information and owner |
|---|---|
| Object requirements | Discovery retains base POW/HP inputs and depth-scaling metadata, with developer comments explaining their meanings; no personalized damage calculation. |
| Spawn and destruction | Discovery exposes its minimum raw spawn depth, not a guaranteed spawn. Destruction records ordinary ownership; boss destruction completes that tunnel's Lore milestone. Tunnel supplies the boss and intrinsic Lore unlock text. |
| Amber and haul | Discovery exposes the existing contextual Amber factor, not a fixed quantity. Tunnel exposes biggest haul as Amber kept after exit, after the applicable toll or successful-exit bonus. |
| Descent and exits | Preserve mechanic facts for descent holes, rope removal on attack, safe exit, and toll settlement without authored presentation sentences. This does not require tool ownership or a run simulation. |
| Shared destruction drops | Expose Prisma Bubbles, Exalted Stamp Frags, Snail Mail, Blinding Lantern, Sigil Syrup, Spirit Offering, and Strange Gold Piece through exported identities and gate metadata. These are optional shop-gated outcomes, not discoveries or fixed per-object drops. |
| Tunnel-specific item outcomes | Associate Rockenstone with tunnel 0, Sheetmetal with tunnel 2, Popcorn with tunnel 4, and Pillario with tunnel 6. These are possible destruction drops, not ordinary or Grand collection entries. Bling bags present generated loot; they are not another discovery identity. |

**Context metadata:** [SpelunkingMetadataRepo](../../data/domain/data/SpelunkingMetadataRepo.ts) supplies source-aligned reward labels and item identities from `CustomLists.Spelunky[5]` and the destruction caller, including the four tunnel/item associations. Reuse exported item identities, including `CaveGoldPiece` → Strange Gold Piece. Keep generated item names unchanged; use exported contextual labels for `W7item0`–`W7item3`. Some shared rewards are not items and do not need item identities. The handwritten Spelunking domain owns the resulting named contextual records. No per-discovery drop fields, Grand exports, full equipment/shop audit, or probability/quantity calculator is required.

## Integration

- Retain `new Spelunking("spelunking")` in `domainList`, its existing repository initialization, and account-wide `Spelunk` raw key in [idleonData.tsx](../../data/domain/idleonData.tsx). Parsing translates and resets saved state without accessing another domain.
- Do not register `updateSpelunking` in either processing map. Initialization owns static relationships; parsing replaces saved state; domain getters/methods derive access, summaries, and eligibility when requested.
- These results use only Spelunking's parsed state and initialized metadata. No cross-domain preparation or mutable synchronization layer is needed. The account pipeline still finishes every domain parse before Cards, Tome, and Gallery calculations read this state.
- Migrate [Gallery's tunnel 5 caller](../../data/domain/world-7/gallery.tsx) explicitly to Lore completion when correcting access. Migrate [Cards' tunnel 2 caller](../../data/domain/cards.tsx) likewise to preserve its existing completion-based behavior; this is consumer preservation, not new game-parity evidence.
- Preserve [Tome](../../data/domain/world-4/tome.tsx) deepest-depth, biggest-haul, ordinary-found-count, and shop-level aggregates. Grand totals must not enter the ordinary count. Remove obsolete ambiguous state after migrating every affected caller.

## Verification

- Pair same-version game outputs with their originating save. Compare released cave count/access and Lore completion separately, including first-tunnel access and highest-completed-index behavior.
- Compare ordinary found/missing and capacity without bosses. Exercise saved-name underscores and trailing whitespace, including `Kingdom_Flags `, without conflating tunnel-local and global indices.
- Compare Grand number/tunnel identity, ordered found/missing state, tunnel/account totals, final-object prerequisite, locked/zero/eligible upgrade gate, and capacity boundary. Current v1.22 totals are 105 ordinary and 100 Grand entries; these are comparison evidence, not handwritten aggregate constants.
- Exercise populated → partial/missing → changed saves on the same initialized owner. Repeated parsing must replace stale completion, records, ownership, and counts without a separate update call.
- Preserve Gallery tunnel 5 and Cards tunnel 2 completion behavior. Cover Tome records, ordinary/count/shop aggregates, and deposited Hat Rack count; large string hauls; locked upgrades; and raw upgrade-bonus regressions without claiming full effective-bonus parity.
- Check the finite context inventory against source and synced metadata. Verify corrected tunnel/item labels and associations, shop-gated shared drops, POW/HP meanings, raw/displayed depth labels, and Amber retained after each exit type. Keep these outcomes distinct from discovery ownership.
- Run the normal account factory twice with fresh instances and the paired save. Observe derived access, Lore completion, records, both collections, Grand eligibility, source metadata, and consumer outputs. Use representative behavioral comparisons plus bounded tunnel-index mapping checks, not tenfold repetition of the same algorithm. Tests alone are insufficient smoke proof.
- Render and exercise these records and filters in the later approved UI phase. Backend verification does not establish rendered UI behavior or connected live-game parity.
