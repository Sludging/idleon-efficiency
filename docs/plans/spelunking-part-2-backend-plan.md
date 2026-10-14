# Spelunking Part 2: backend delivery plan

## Outcomes

Provide the information for [#436 — gathering, Journal, and character progression](https://github.com/Sludging/idleon-efficiency/issues/436):

- Inspect six Journal chapters, all 20 bonus levels and effects, and minimum page-stack requirements.
- Distinguish bonuses with diminishing returns from bonuses without a finite formula limit. Support progress toward finite limits.
- Show cave/page metadata and compact page quantities, with storage and named character locations available as details.
- Show account-wide daily reads as remaining/limit. Keep usage available without requiring a third displayed value.
- Show each character's skill level/EXP and saved/maximum stamina. Provide shared recharge and an account refill estimate with individual estimates available.

Expose generated descriptions and numeric results only. Do not add authored game-description sentences or presentation records to the backend. Density, instruction removal, empty-location wording, and Sneaking/Lab character composition belong to UI delivery.

## Mechanics and required data

### Journal limits

Let `L` be the saved bonus level. Let `A` be `1 + artifactBonus / 100` when generated `x3 === 1`; otherwise use `1`.

| Formula | Current effect | Limit at the current artifact strength | Progress toward the earned portion |
|---|---|---|---|
| `add`, with generated `x2 = 0` | `A * x1 * L` | No finite limit | No finite-limit progress |
| `decay` | `A * x1 * L / (L + x2)` | `A * x1` | `L / (L + x2)` |
| `decayMulti` | `A * (1 + x1 * L / (L + x2))` | `A * (1 + x1)` | `L / (L + x2)` |

These are asymptotic limits, not hard maximum levels or reached effect caps. The inspected page-reading caller adds gained levels without a maximum-level clamp. The bonus helper does not clamp levels or effects. For the positive decay parameters, each additional level gives less effect. A finite level does not mathematically reach the asymptote. Display rounding must not imply completion.

The 20 real bonuses contain **2 `add`, 16 `decay`, and 2 `decayMulti`** entries. Both Base Spelunking Efficiency bonuses grow without a finite formula limit. All 20 current generated artifact flags are enabled. Limits therefore change with the account's current artifact strength; they are not universal maxima.

The two Chapter Two multipliers approach `5 * A`, not `4 * A`. Their formula includes a baseline of `1 * A`. Other multiplier-worded bonuses use `decay`, not `decayMulti`: Chapter Five's Amber and POW effects approach `3 * A`; Chapter Six's POW and Amber effects approach `10 * A`. Follow the generated formula, not the wording's `x` unit. Progress excludes the baseline so level-zero entries remain zero-progress and unearned.

### Existing inputs

| Data | Existing owner and use |
|---|---|
| Generated `func`, `x1`, `x2`, `x3`, `requiredPages`, and intrinsic bonus text | `ChapterBonus.data`; calculate limits without a copied table. |
| Saved Journal levels | `Chapter.parse`: `Spelunk[8][4 * chapterIndex + bonusIndex]`. Preserve four-slot strides. |
| Sailing artifact 35 | Existing `updateSpelunkingChapterBonuses` prepares its current bonus. |
| Page item and cave metadata | Existing `Chapter.pageItem` and `gatheringSource`. Preserve the six real associations and exclude FILLER. |
| Storage and character page stacks | Existing `chestPageStacks` and `playerPageStacks[playerID]`, sourced from Storage. Preserve individual stacks. |
| Reading allowance | Existing `dailyReadLimit`, `dailyReadsUsed`, and `dailyReadsRemaining`; usage comes from `OptionsListAccount[410]`. |
| Character identity, skill level, and EXP | Existing `Player`, joined by `playerID`. |
| Saved stamina and calculated maximum | Existing `SpelunkingStamina.current` and `maximum`. Preserve above-maximum saved amounts. |
| Shared recharge and individual refill | Existing `Spelunking.hourlyRecharge` and `SpelunkingStamina.getHoursUntilFull(rate)`. |

The account refill estimate is the **maximum**, not the sum, of individual refill durations. This summary assumes concurrent recharge at the shared rate for every character. It describes the saved snapshot with unchanged recharge and no spending. It does not establish or simulate actual recharge eligibility, elapsed time, or team activity.

## Responsibilities and integration

Retain the accepted Spelunking backend and its existing producers. Add only:

- **ChapterBonus:** `getEffectLimit(): number | undefined` returns the artifact-scaled asymptote for `decay` or `decayMulti`. `undefined` means the actual `add` bonus has no finite limit.
- **ChapterBonus:** `getProgressToEffectLimit(): number | undefined` returns the earned-portion ratio above for bounded formulas. Unbounded bonuses have no ratio. Keep current `getBonus()` behavior unchanged.
- **Spelunking:** `getHoursUntilAllFull(): number` returns the largest existing individual estimate using the shared recharge rate. Iterate existing stamina aspects directly. The initialized empty collection returns zero; the UI must retain its account-loading guard rather than showing a loaded-account conclusion.

Use the existing prepared state. Add no saved fields, static exports, domain registration, preparation hook, cached presentation snapshot, or Royal Armory change. Limits automatically follow artifact preparation in `postProcessingMap`. Account refill uses maxima and recharge already prepared in `postPostProcessingMap`, after the existing producers.

Selected [backend patterns](../agents/backend-patterns.md): FriendBonus/Meal keep bonus behavior with its generated-data wrapper. Totalizer demonstrates getters over prepared inputs. Lab demonstrates account-wide ownership rather than repeated per-character calculation. Follow these aspects only; do not introduce a generic cap framework or new aspect class.

Existing data already supports the other feedback:

- Remove instructions and empty-inventory messages in the UI; no domain change is needed.
- Compact page counts and location tooltips can use existing stack amounts. Any display subtotal must retain its location meaning. A combined owned-pages count must not be labeled chest storage or treated as a readable stack.
- Render stamina as saved/maximum without clamping the saved amount. Show recharge once because the original formula has no character-specific input.
- Render daily reads as `dailyReadsRemaining / dailyReadLimit`: the retained snapshot displays `8/8`, not `0/8`. Keep saved-period ownership; do not add a reset timer.
- Keep individual refill getters for character details. The account summary adds only the domain-owned maximum above.

## Prerequisites and verification

All required metadata and calculation inputs already exist. No static extraction or WikiBot work is required. Approval and implementation authorization remain separate gates, recorded in the handoff.

After authorization, follow [domain testing guidance](../TESTING_IMPLEMENTATION.md):

1. Keep the existing paired Part 2 save/results and all current core/direct-parameter comparisons. Check the two formula families with finite limits, both unbounded entries, and level-zero progress through the typed new APIs.
2. Use the retained original helper equations and extracted chapter tuples as the limit oracle. Do not approximate a limit by calling the formula with a very large level or infinite input. Compare the account's extracted artifact bonus directly at configured tolerance `0`.
3. Check the `decayMulti` baseline, artifact scaling, and multiplier-worded `decay` cases. Confirm current effects and saved levels remain unchanged. Do not manufacture saves to exercise unsupported artifact states.
4. Verify account refill against the maximum of independently checked character estimates from the paired save. Keep individual estimates as direct parameter comparisons. The current save proves only zero account refill; positive refill remains a coverage question until real paired data provides it.
5. Run focused Part 2 suites and Spelunking regressions. Check TypeScript and two fresh normal-account-factory passes. Confirm repeated processing does not accumulate state and new getters use settled inputs. Record unrelated failures without fixing or waiving them.
6. In the later approved UI phase, verify finite-limit information, correct progress meaning, no unbounded completion bars, named location details, saved/maximum stamina, shared recharge/refill, and remaining/limit reads. Compare the actual route with the newly approved preview. UI experiments must retain every character and all 20 bonuses.

Historical acceptance does not prove these new APIs. No checks run during planning. Offline source and paired saved-snapshot evidence do not prove connected live-game parity, performed reads/resets, or elapsed refill.

## Source references

- **Original formula branches:** [ArbitraryCode5Inputs.1.22.js](../game-snippets/players/ArbitraryCode5Inputs.1.22.js#L8-L24), lines 8–24. Arguments map to `(func, x1, x2, level, x4, x5)`. These branches establish linear growth, decay, and the multiplier baseline.
- **Original chapter application:** [Spelunk.1.22.js](../game-snippets/spelunking/Spelunk.1.22.js#L8), line 8, `ChapterBonus`. Source accessor: `idleon.allScripts.ActorEvents_579._customBlock_Spelunk.toString()`. The branch passes saved level to the helper and multiplies its complete result by artifact 35 when tuple position 4 equals 1.
- **Original level update:** [PageRead.1.22.js](../game-snippets/spelunking/PageRead.1.22.js#L8), line 8, `SPELUNKY_PAGE`. Accessor: `idleon.allScripts.ActorEvents_38.prototype._event_InvItem4custom.toString()`. Assignment is existing `Spelunk[8][bonusSlot] + PageReadingLVgains(stackQuantity, 0)`; no level clamp appears in that branch. Daily allowance limits reads, not bonus levels.
- **Original tuples:** [retained Part 2 extraction](../../tests/results/spelunking-part-2-data.json), JSON path `extractions.chapter_metadata.result`, from `idleon.getAttr("CustomLists").h.SpelunkChapters`. [Generated metadata](../../data/domain/data/SpelunkingChapterRepo.ts#L13-L237), lines 13–237, matches all 20 real tuples. It is the implementation data source, not a table to copy.
- **Existing domain contracts:** [Spelunking](../../data/domain/world-7/spelunking.tsx#L225-L326), lines 225–326; shared counters/rate at 351–363; preparation at 532–594. [Current paired comparisons](../../tests/domains/spelunking/part-2-test-helpers.ts#L47-L97), lines 47–97.
- **Recharge and refill semantics:** Existing findings P2-G6/P2-G7 in the [research handoff](spelunking-research-brief.md#mechanics-and-evidence-for-judging-the-plan) identify original `StaminaRegenRate` and `ActorEvents_713.prototype._customEvent_SpelunkStuff2`. The refill summary is derived from the approved snapshot estimate, not an observed game summary.
- **Player vocabulary:** [Wiki Spelunking](https://idleon.wiki/wiki/Spelunking), Lore Journal and Cave Nodes. Formula authority remains the captured game source, not the competitor or Wiki presentation.
