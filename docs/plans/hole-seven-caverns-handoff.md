# Seven Hole caverns: delivery handoff

## Status and approvals

Backend and lightweight UI delivery, including the requested UI revisions, are complete for Dawg Den, Bravery, Gloomie Mushroom Grotto, Justice, Wisdom, Gambit, and Temple. Final user review is pending. This record does not claim final UI acceptance.

The user approved the lightweight UI scope, Justice's **Starting trial stats** and **Starting Court Coins** labels, and UI-hardcoded Temple upgrade names with a font-glyph comment. The existing Hole navigation and visual style remain.

### Latest requested UI adjustments

Final user review is pending. The latest pass changed `monumentCaverns.tsx`, `gambit.tsx`, and static image metadata in `hole.tsx`. It did not change gameplay formulas or add backend calculation APIs.

- Bravery, Justice, and Wisdom now use **Story / Starting upgrades / Bonuses** tabs. Summary metrics and the complete Study footer stay outside the tabs.
- The user's trimmed Bravery help and metrics remain. Reward cards share intrinsic CSS subgrid header/body tracks within each visual pair. No fixed header height, minimum-height workaround, or JavaScript measurement is used.
- Bounded nonportrait art and a flexible identity row fix the narrow Bell/title overlap. The 56×64 Villager portrait clip and user copy remain unchanged.
- Gambit now compares current rewards automatically with the next Opal milestone. The editable **Target points** control, its local state/validation, and `(available / total)` suffix were removed. Rewards/Times tabs, artwork, and inactive opacity remain.
- Justice uses native `JusticeMentalHealth`, `JusticePopularity`, and `JusticeDismissals` images at 21×21, plus existing `HoleJusticeObj0` at 21×22. Wisdom uses `WisdomAttempts` at 21×21 for attempts and attempts per round, plus `WisdomInstantMatches` at 48×44. Seconds per match stays text-only because its native display has no dedicated icon.
- Static `JusticeMonument.getStartingStatImageData()` and `WisdomMonument.getStartingStatImageData()` supply this metadata. Five new PNGs were published after exact-key absence guards. CDN dimensions and hashes matched the native crops. Existing SSO authentication was reused; no full asset sync or unrelated object change occurred.

The canonical extractor was `data/extract-icon.js`. Justice and Wisdom attempts use `apk/assets/assets/graphics/1x/font-675.png` and its `.fnt` metadata. Wisdom instant matches use `font-707.png` and its `.fnt` metadata. Crops preserve native pixels without resizing, recoloring, or invented transparency.

### Bravery starting-stat icon follow-up

Bravery Story now supplies all four required starting-stat images through static `BraveryMonument.getStartingStatImageData()` in `data/domain/world-5/hole/hole.tsx:1175-1182` and the four metric calls in `components/world-5/hole/monumentCaverns.tsx:24-27`. Starting damage and Starting swords reuse existing native `HoleBraverySword` at 61×61. Max rethrows uses `BraveryRethrows`; Max retellings uses `BraveryRetellings`, both at 21×21. Current copy, values, layout, tabs, paired subgrid, and formulas remain unchanged.

Exactly two new S3 objects were published after exact-key HEAD 404 guards. The canonical extractor cropped the native rethrow and retelling cells from `font-675.png` without resizing or recoloring. CDN 200 responses, dimensions, hashes, and decoded pixels matched the crops. Cached SSO authentication was reused. No full sync or unrelated object change occurred.

At 1440×1000, the focused Bravery Story run passed all four required-image assertions: exact paths, one image per metric, complete loads, native dimensions, visible labels and unchanged retained values, and no icon/value or icon/label overlap. An inspected ordinary viewport screenshot showed both swords, the cyan circular arrow, and the gold retelling symbol clearly. Neither command exited 0: the first failed a later whole-page image gate on a separate image with an empty currentSrc; its identity was not recorded. One bounded harness correction followed. Confirmation then stopped before Bravery because a Next.js overlay intercepted Caverns. Its logs identified unrelated Alchemy's missing `bubbleGrowthMilestones` export. No feature fix or further run occurred.

Known shared-navigation hydration, NitroPay, CORS/resource, and HTTP 403 errors were recorded separately without suppression. No observed page error identified a Hole component. The four stat-image checks and visual proof passed, but no unconditional smoke-command or clean-browser pass is claimed. Prior core checks were not rerun. The owned scenario was removed, browser contexts closed, and the shared stack left running. Final user review remains pending.


### Latest exercised proof and limits

- Corrected tab/Gambit smoke and focused Wisdom icon confirmation each exited 0. At 1440×1000 and 1000×1000, all three monuments switched distinct content, with eight upgrades and ten bonuses each. Summary/Study content remained. All four Justice stat images and all three Wisdom stat-image uses loaded. Gambit had no input or removed suffix; automatic gains and both tabs worked.
- The initial smoke attempt timed out on obsolete harness selectors/query navigation before feature checks. The app was healthy. Only the corrected runs passed.
- After the final art fix, 30 header pairs had exactly 0px top/bottom/height deltas. All 60 headers had no inline height/min-height or horizontal overflow. All 54 rendered images loaded, with at least 12px art/title clearance. Bell art stayed bounded and Villager portraits stayed correctly clipped.
- That final art command exited **1**, solely because the harness wrongly required images on optional-art card 6 in six views. No alignment, art-fit, overflow, or image-load assertion failed. No rerun occurred.
- The harness's `levelBox` measured the gap before the level, not level text. Titles ended before that gap. Six inspected screenshots showed separate levels; actual level rectangles were not captured. The final narrow Bravery screenshot also received parent inspection.
- Scoped tab/automatic, Wisdom-icon, and final header/art reviews found no actionable issues. Known shared-navigation hydration, NitroPay, ad-network CORS/resource, and HTTP 403 errors remain separate. No changed-feature exception was observed; no clean-browser-suite pass is claimed.

No core tests, production-pipeline smoke, build, lint, or formatter ran during this latest UI/static-metadata pass. The 115-test and 178-check results below are historical evidence, not reruns.

## Delivered scope and locations

| Area | Public source locations | Delivered behavior |
| --- | --- | --- |
| Integration | `app/world-5/hole/content.tsx`, `components/world-5/hole/part4Caverns.tsx` | Seven dedicated cavern views; Summoning input for Gambit; All Studies navigation. |
| Dawg Den | `data/domain/world-5/hole/dawgDen.ts`, `components/world-5/hole/dawgDen.tsx` | Score, next Opal score, multiplier, earned Opals, and eight amplifier levels/effects/caps with exact native icons. |
| Grotto | `data/domain/world-5/hole/grotto.ts`, `components/world-5/hole/grotto.tsx` | Layer, Monarch HP, current-colony kill progress, schematic bonuses, and Opals. The redundant kills-left display was removed. |
| Monuments | `data/domain/world-5/hole/hole.tsx`, `components/world-5/hole/monumentCaverns.tsx` | Story / Starting upgrades / Bonuses tabs; eight upgrades and ten bonuses each; summary/Study content outside tabs; native starting-stat images; paired intrinsic reward headers. Unearned cards retain 0.6 opacity without negative status labels. |
| Gambit | `data/domain/world-5/hole/gambit.tsx`, `components/world-5/hole/gambit.tsx` | Prepared score and multiplier, total time, Summoning-owned Doublers, 19 reward thresholds, six named challenge times, and automatic current → next-Opal reward comparisons. Available art, Rewards/Times tabs, and inactive opacity remain. No editable target or `(available / total)` suffix remains. |
| Temple | `data/domain/world-5/hole/temple.ts`, `components/world-5/hole/temple.tsx` | Torches, layer, uncapped extra torch chance, Opals, and Illuminate/Search/Amplify levels, effects, and current costs. Search uses the pre-purchase torch balance. |

Backend parsing and preparation use the existing Hole pipeline. Existing `idleonData.tsx` registration was sufficient. Opals remain on the existing ledger. No generated directories were edited for this feature.

Feature evidence uses `tests/configs/hole-<name>.json`, `tests/results/hole-<name>-data.json`, and `tests/domains/hole/<name>.test.ts`. Names are `dawg-den`, `grotto`, `temple`, `gambit`, and `monuments`.

### Revision APIs and preview contract

- `DawgDenModifier.getImageData()` supplies the eight native modifier icons.
- `Monument.nextStartingUpgrade` exposes the next saved-brick upgrade. `MonumentUnlock.hoursRemaining` and `claimable` describe its Respect-hour gate.
- Monument, bonus, and unlock `getImageData()` methods supply website-owned image metadata. No generated-directory changes were needed.
- Respect hours do not decrease when a brick is removed. Saved removed bricks determine upgrade ownership.
- Stored story time is separate from permanent Story rewards. Normal stories consume stored story time; Wisdom's Pure Memory behavior remains distinct.
- Each monument has an account-specific full-rate reward window. Rewards keep growing more slowly afterward; neither storage nor the reward multiplier has a hard cap.
- `Gambit.getNextOpalScore(foundOpals)` and `getOpalsAtScore(score)` preserve native logarithm rounding. For example, the seventh Opal threshold is `10000344`, not `10000000`.
- `GambitBonus.getBonusAtScore(score)` and `getMultiplierAtScore(score)` return score-specific preview values. Existing current-score APIs and the claimed-Opal ledger remain unchanged.
- The UI uses the existing score-specific APIs for automatic current → next-Opal comparisons. It does not change ownership, current effects, saved scores, or account Summoning totals. The former editable Target points control is removed.
- `GambitChallenge.getImageData()` and `GambitBonus.getImageData()` supply available art. Missing precise icons remain explicit limits, not invented substitutes.

This revision changed the existing Dawg, monument, Gambit, and Grotto components; it added no component files. Revision extraction configs, results, and domain tests changed only for Gambit and monuments.

## Exercised verification

All account checks used only the retained regular-account fixture. No alternate accounts, parameter suites, save refreshes, or synthetic account state were used.

### Historical pre-adjustment core tests

```bash
yarn test --runTestsByPath tests/domains/hole/dawg-den.test.ts tests/domains/hole/grotto.test.ts tests/domains/hole/temple.test.ts tests/domains/hole/gambit.test.ts tests/domains/hole/monuments.test.ts tests/domains/hole/monument-bonuses.test.ts tests/domains/hole/part1-pipeline.test.ts tests/domains/hole/part5-state.test.ts tests/domains/hole/schematics.test.ts tests/domains/hole/schematic-bonuses.test.ts tests/domains/hole/studies.test.ts tests/domains/hole/opal-ledger.test.ts
```

Result at that stage: 12 selected source suites, one passed grouped Jest suite, **115/115 tests passed**, zero snapshots, exit 0. The earlier 110/110 result is also historical, not an additional current test count.

### Historical pre-adjustment production-pipeline smoke

The actual `loadGameDataFromSave('latest')` pipeline passed **178 checks**, prepared 130 map entries, and exited 0. Native Node Web Storage avoided the Jest-only mock branch.

The smoke checked all 24 upgrade ownership flags, remaining hours, claimability gates, saved next-brick states, and growth beyond full-rate windows. It also checked Opal thresholds, all 19 reward unlock thresholds, and non-mutating target projections. Source and save remained unchanged.

Current monument values and full-rate windows matched retained-account native evidence. Target-score projections were checked against source-derived arithmetic, not alternate-score native captures.

The account had no pending claimable brick. No story was started and no brick was claimed. Normal-story consumption and Wisdom Pure Memory were not exercised dynamically. The temporary script and storage file were removed.

### Historical production-pipeline smoke

```bash
NODE_OPTIONS='--experimental-webstorage --localstorage-file=/tmp/hole-seven-caverns-localstorage' yarn tsx scripts/.hole-seven-caverns-final-smoke.ts
```

Result: exit 0. Actual `loadGameDataFromSave('latest')` completed init/parse/calculate and prepared 130 map entries. Across five captures, 80 output labels matched with **247 numeric and 116 boolean/null comparisons**. Numeric tolerance stayed at `5e-7`. The native actor-context label `normal_story_context` was excluded from this smoke and checked by Jest.

This covered all 30 monument bonus rows, prepared rewards/readiness and starting stats, Gambit's calculated multiplier, Summoning ownership/availability, and selected Opal-ledger integration. No mocks, injected dependencies, or prepared-state mutations were used. The temporary script and storage path were removed; the command records an exercised check, not a retained script.

### Native and earlier isolated evidence

Native captures contain **81 successful labels and zero errors**: Dawg 5, Grotto 10, Temple 13, Gambit 12, monuments 41. These are extraction labels, not Jest tests.

Earlier isolated checks also exited 0:

```bash
yarn tsx scripts/.hole-reachable-caverns-smoke.ts
yarn tsx scripts/.hole-reachable-gambit-smoke.ts
yarn tsx scripts/.hole-reachable-monuments-smoke.ts
yarn tsx scripts/.hole-reachable-preparation-smoke.ts
```

They covered 35 numeric comparisons; 51 numeric plus 19 unlock comparisons; 18 parse-state comparisons; and three genuine preparation comparisons, respectively. These temporary scripts were removed. Final production-pipeline evidence supersedes their narrower coverage.

### Historical basic UI smoke and reviews

```bash
yarn ui:status
yarn ui:run .ui-verification/hole-seven-basic-smoke-20261101.cjs
```

The existing UI stack was healthy. At a 1440×1000 desktop viewport, all seven pages and both Gambit tabs passed basic content checks. Justice labels, three Temple cards, 19 Gambit reward rows, and six challenge times were verified. Page text contained no `NaN`, unresolved `$`, or `TAP ME`. Justice, Temple, and Gambit screenshots were inspected privately.

The initial scenario passed page/tab checks, then exited 1 because a Studies button locator timed out on the already-loaded Studies screen. A focused rerun used the actual Search Studies textbox. It exited 0 and verified Gambit, both tabs, All Studies, and return after the locked-reward display fix. The scenario was removed and owned browser contexts were closed. Host-side browser access first failed on private Docker hostname resolution; the documented Docker runner supplied the successful checks.

Scoped backend and UI reviews ended with no actionable findings after the locked Gambit text fix and fresh review. No build, lint, formatter, broad UI audit, or other-account checks are claimed.

### Historical editable-target UI smoke and copy confirmation

These checks predate the latest tabs, automatic milestone comparison, stat icons, and final art fix. Target editing below describes the removed UI.

- All seven requested cavern selectors passed feature checks at a 1440×1000 desktop viewport. Target editing, both Gambit tabs, ownership preservation, and All Studies navigation passed.
- All eight Dawg icons loaded. Monument upgrades, reward images, 0.6 opacity, separate Respect hours, and cropped Villager portraits were checked. Grotto had no kills-left text.
- Gambit showed current → target effects and the exact next-Opal threshold. Editing the local target changed previews without changing ownership.
- The primary scenario recorded **61/62 checks** and exited 1. Only the generic zero-page-errors gate failed, because external NitroPay called removed `document.browsingTopics()`. This was not an unconditional command pass.
- Screenshots were inspected privately. Image monitoring recorded zero image HTTP failures. No observed page error identified a Hole component.
- Final monument copy confirmation passed **12 feature assertions** across all three monuments. Compact durations, readable labels, and singular `1 respect hour` were confirmed.
- The copy run first exited 1 after four Bravery checks because a temporary crop assertion failed. A focused Justice/Wisdom continuation passed the remaining eight checks and exited 0. Neither run establishes clean browser errors.
- Source and language reviews found no actionable issues. A fresh review of the final copy also found none.

Existing shared-navigation hydration and ad-network errors remain separate from feature results. No build, lint, formatter, parameter suite, other-account check, or broad UI audit is claimed.

## Resolved prerequisite and accepted limits

- An earlier account-wide test/smoke attempt failed before loading because Alchemy's required `liquidCauldron.tsx` module was absent. Its unrelated owner supplied it. Final checks passed afterward; this feature did not change that prerequisite.
- Temple names use the approved UI text and glyph comment, not new handwritten backend static records.
- Art coverage is partial: Dawg has 8/8 exact icons; Gambit challenges have 5/6 exact icons, with King's precise art unverified.
- Named Gambit rewards have game/source-concept art for 16/19 cards. The three future rewards have no images or invented effects.
- Monument bonuses have source-concept art for 27/30 cards. The earlier starting-upgrade inventory found sword/coin art for 10/24 cards; that is not a new full-card inventory. Bravery's four required stat-image uses, Justice's four uses, and Wisdom's three uses are verified as described above, with the stated command limits. Other generic glyph coverage remains unverified; a font HTTP 403 does not prove absence.
- Villager banners use a 56×64 portrait crop. Available images are not a claim that all native icons exist.
- The retained account did not exercise the fixed-value locked-reward branch in-browser. The fix received a fresh source review.
- Fractional monument caps can produce progress above 100% under native rounding. The retained account did not exercise that case.
- `secondsUntilReady` preserves the native estimate, not an exact inverse under external multipliers. Unsupported Bravery enemy HP and malformed competitor Wisdom next-hour output are omitted.
- Captures lack a cryptographic save fingerprint. Matching selected values does not establish independent extraction provenance.
- Browser logs showed shared navigation hydration mismatch, NitroPay `browsingTopics` failure, ad-network CORS/resource errors, an unidentified console HTTP 403, and image aspect-ratio warnings. No cavern crash or account-domain loading failure was observed.

No private account values, save data, or screenshots are included here. No commit was requested or made for this handoff.
