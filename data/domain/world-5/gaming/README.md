# Gaming domain reference

Use this reference when changing Gaming meanings, save mappings, dependencies, or website displays. Production behavior lives in [Gaming](../gaming.tsx), [garden](garden.ts), [imports](imports.ts), and [Palette/Superbits](palette.ts). Artwork and publication guidance live in the [Gaming asset runbook](../../../../docs/runbooks/gaming-assets.md).

## Meanings and units

- Gaming level is uniform across characters. `Gaming.level` is one account value, not a maximum across character levels.
- Bits is the saved balance. Rate and yield calculations do not add future income to that balance.
- A `Plant` is a species with identity, effect text, and unlock state. A garden slot references that species and owns current stage, position, and color. The Logbook owns historical stage records.
- Empty slots have no plant or stage. Save stages start at zero; visible stages start at one. Native evolution calculations convert visible stage back with `stage - 1`.
- Logbook encoded counts already include the first visible stage. Decode without adding one; zero means no record. Historical records do not depend on current garden occupancy.
- Palette stage-Luck metadata uses native stages 0–7. Convert once to visible stages 1–8; higher stages use the last multiplier.
- King Rat crown IDs encode zero-based species index × 10 + zero-based stage. Crown chances show visible stages and include duplicate draws. A successful crown draw does not guarantee a new crown.
- Slot positions use game-garden coordinates for plant effects, not website layout coordinates. Slots contain no saved per-plant elapsed-growth timer.
- Initial appearance and evolution are separate events. Evolution probabilities refer to a named stage transition during a growth cycle.
- `garden.harvestBits` is the standard stage-one Sprout payout with account and Kitsune multipliers. It is not an aggregate prediction of randomized species harvests.
- Growth time uses seconds, confirmed by the native speed display's minutes/hours/seconds conversion. `garden.growthCycleSeconds` is the underlying cycle; Fertilizer speed reports average initial-growth time.
- Probability fields use 0–1. Percent fields use percentage points. Multipliers use 1 as neutral.
- Acorn production is a one-hour yield, not a constant hourly rate.

## Ownership and static identities

Gaming owns its account progress and aspect objects. Each aspect owns parsing, state, and calculations; root Gaming methods orchestrate them. UI code reads prepared values and handles layout and formatting.

| Source | Identity and meaning |
| --- | --- |
| [GamingSpeciesRepo](../../data/GamingSpeciesRepo.ts) | Ten species, explicit `speciesId` 1–10. Do not use the wrapper's zero-based `index`. Names exist for every species; Sprout has no optional `effectText`. Ordinary mutation discoveries unlock species; Royale requires the King Rat purchase. |
| [GamingImportRepo](../../data/GamingImportRepo.ts) | Nine imports, `importId` 0–8: Little Sprinkler, Shovel, Autumn Squirrel, Shell, Kitsune, Bog Log, POiNG, Snail, and King Rat. Purchased-item names, effects, upgrade-bonus text, and flavor text belong here. |
| [GamingBoxRepo](../../data/GamingBoxRepo.ts) | Join imports to cost parameters by `boxId`. Unopened-box text stays box metadata. Empty Box 9 is not an import. |
| [GamingUpgradeRepo](../../data/GamingUpgradeRepo.ts) | Three Fertilizer records supply names and descriptions. The separate evolution upgrade belongs to Garden, not a fourth Fertilizer record. |
| [GamingMetadataRepo](../../data/GamingMetadataRepo.ts) | One record supplies plant-stage Palette Luck, Bog Log ranks/death-card counts/progress hours, and King Token shop labels. Join shop labels by `upgradeId`; this table does not supply shop prices or effect coefficients. |
| [GamingSuperbitsRepo](../../data/GamingSuperbitsRepo.ts) | Real IDs 0–68 retain their identities across boards of 24, 24, and 21. Exclude filler IDs 69–71 without renumbering. |
| [GamingPaletteRepo](../../data/GamingPaletteRepo.ts) | All 37 colors supply names, RGB values, bonus text, and numeric bonus/chance parameters. Earned bonuses remain effective when unequipped; equipment controls equipped-color mechanics. |

Imports share identity, ownership, level, costs, and text behavior. Specializations own their actual resources and mechanics. Bog Log and POiNG share high-score state; only Bog Log adds free-game probability. POiNG's “No bonus. It's all skill.” text does not establish an upgrade mechanic. Imports without a real upgrade have no upgrade cost.

Shell's earned Bits multiplier differs from its next rank's advertised reward. Snail reset probability is conditional on failure; the result identifies protection consumption, a checkpoint, or zero. Shovel nugget bounds describe the game's draw, not a guaranteed improvement. King Rat owns unique crowns even though Research stores them. Acorn and King Token shop upgrades own their levels, currency, unlocks, costs, and effects separately from their Import level. Mutation progress owns DNA, discoveries, spent-DNA pity, and the next attempt's chance.

Superbit ownership, board access, affordability, and qualifying-neighbor prerequisites are separate states. Board membership is game logic, not page geometry. Superbits use no per-upgrade artwork or borders. Palette uses actual RGB swatches; other images follow the asset runbook.

### Farming sticker ownership

[Farming](../../world-6/farming.tsx) owns saved sticker counts and prepared bonuses. [FarmingStickerRepo](../../data/FarmingStickerRepo.ts) contains seven real stickers, IDs 0–6, with names, descriptions, and `bonusPerSticker`; filler entries are excluded. Gaming consumes ID 3, **UWU Kawaii Rice Sticker**, with coefficient **250**, through Farming's prepared garden Bits bonus.

The export maps native names, descriptions, and coefficients from `CustomLists.Research[23–25]`. [FarmingMetadataRepo](../../data/FarmingMetadataRepo.ts) instead supplies Crop Scientist descriptions and unlock IDs. It is not a sticker table. Gaming does not duplicate sticker metadata or calculations.

## Lifecycle and dependencies

The registered domain key remains `gaming`. Static repositories initialize aspect objects; Imports initialize their shops. Save arrays and encoded strings stay at the parsing boundary. Shared `number2letterArray` and `letterToNumber` helpers support the complete save alphabet, including non-Latin Superbit characters.

- Parse resets state, reads the uniform level and Bits, then runs Imports → Superbits → Palette → Mutations → Plants → Fertilizer → Garden → Logbook. Palette also parses its colors.
- Prepare Gaming contributions to Research, Construction, Collider, and Equinox before those consumers. Other domains can read parsed Superbit ownership; Tome reads saved Shell, Snail, nugget, and Bits progress.
- Prepare Farming sticker bonuses immediately after Research Grid. Research supplies a calculated bonus; Event Shop ownership, Superbit ownership, and sticker counts are parsed inputs. Farming's late callback prepares display data only.
- Prepare earned Palette bonuses after Legend Talents and before their consumers. These bonuses must not wait for the later Palette Luck calculation; Sushi must not depend on that later result.
- Late Gaming calculation runs Imports → Plants → Mutations → Garden preparation → Logbook → Garden rates/harvest → Fertilizer display effects → Palette chances → Superbit Boards.
- Garden preparation supplies capacity, maximum stage, and evolution readiness before Logbook. Garden harvest then uses Logbook's prepared Bits multiplier. Boards prepare access and prerequisites before updating their Superbits.

Late growth, mutation, import, and Palette-chance calculations consume settled inputs from domains including Alchemy, Divinity, Farming, Sneaking, Votes, Arcade, Islands, Hole, Research, and Sushi. UI-only results use post-postprocessing after dependencies settle. Lifecycle methods use `data: Map<string, any>`; repeated updates replace results rather than stacking contributions. Preserve native arithmetic order and rounding.

## Website display contract

The [Gaming page](../../../../app/world-5/gaming/content.tsx) uses four tabs: Plants, Upgrades, Superbits, and Palette. The [shared summary](../../../../components/world-5/gaming/summary.tsx) remains visible across tabs. It shows account level, Bits, garden capacity against `maximumCapacity`, and purchased Import resources.

Water, Digs, and Mail use prepared Import values and appear independently only when their responsible Import is purchased. Acorn and King Rat resource groups follow the same ownership rule. The summary adds no calculations.

- **Plants:** discovery and Logbook progress, not a reconstruction of the live garden. Completed Mutation progress and empty unavailable-discovery sections are omitted. One Logbook table shows plant effects, recorded/missing stages, and next-stage chances. Hide complete records and one-in-N growth-cycle explanations remain available.
- **Upgrades:** Fertilizer and all nine Imports, with resources and shops grouped under their owner. Acorn Shop and King Token Shop start collapsed. Each disclosure shows every upgrade row and cost, even when its Import is not purchased.
- **Superbits:** all 69 entries across three boards. Purchased cards omit prices; affordable prices use green. Hide purchased starts off. Board links show purchased counts and remain usable for empty filtered boards. Effects present supplied static rules, not unsupported account-total claims or raw game-font tokens.
- **Palette:** all 37 colors form the default comparison. Equipped colors have a separate bonus section. Filters, sorting, and stage selection affect view state only, not the save or domain calculations.

## Evidence and numerical comparison policy

The [extraction config](../../../../tests/configs/gaming-mechanics.json) records read-only native calls, including `GamingStatType`, against the paused offline 1.22 runtime and its paired real save. [Retained native results](../../../../tests/results/gaming-mechanics-data.json), [mechanics tests](../../../../tests/domains/gaming/mechanics.test.ts), [direct-parameter tests](../../../../tests/domains/gaming/mechanics-parameters.test.ts), and [lifecycle coverage](../../../../tests/domains/gaming/lifecycle.test.ts) preserve comparison and repeated-update evidence.

Ordinary comparisons remain exact. Only these demonstrated Chromium/Node `Math.pow` differences have human-approved bounds:

| Comparison | Approved bound | Rationale |
| --- | --- | --- |
| Squirrel shop 2 Luck | Absolute `2e-14` percentage points | `288^0.8` differs by `1.4210854715202004e-14`. |
| Shell next-rank threshold | Absolute `7e-11` | `140^1.2` propagates to `5.820766091346741e-11` threshold error. |
| Snail success probability | Absolute `6e-16` | At level 47, subtraction amplifies the `23^0.16` difference to `5.447031714567174e-16`. Reset probability stays exact. |
| Superbit 48 cost | Relative `2e-16` | Native `10^70` is `1.0000000000000001e70`; Node returns `1e70`. Cost differs by about `1.53e-16` relative. |
| Carbon atom 5 cost | Absolute `6e-8` | Native/Node `1.27^50` yields costs `348039084.1292103` and `348039084.12921035`, one ULP apart (`5.960464477539063e-8`). See [Collider comparison](../../../../tests/domains/world-3/construction/atomcollider-cost-and-maxlevel.test.ts). |

These bounds do not change native formulas, extracted expectations, or global matcher defaults.

### Historical verification

The completed implementation recorded 208 passing tests across nine Gaming, Farming, and Collider suites, plus passing TypeScript checks. The account pipeline observed sticker bonus 2750 during the early earned-Palette update, before UI-only processing. Repeated account/aspect updates and reparsing preserved results. Native growth time `157.88196577997837` seconds, non-plant Bits multiplier `7.49053478826947e54`, and Palette Luck `1691.187396753388` matched retained results.

Historical desktop browser checks exercised all four tabs, 10 plants, nine Imports, 69 Superbits, and 37 Palette colors. Water 430, Digs 4, and Mail 3.05 stayed visible across tabs; independent purchased-state changes hid each responsible resource. Shop disclosures, board links, filters, stage selection, and seven published PNGs were checked. Shared-navigation hydration and external advertising errors remained recorded, not suppressed.

This evidence uses one real saved state. It does not claim runtime coverage of Royale garden slots, unobserved upper-stage transitions, first-discovery mutation, early Snail states, or every alternate board/selector state. Documentation cleanup did not rerun numerical or browser verification.
