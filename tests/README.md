# Game Testing Infrastructure

Testing approach that validates domain calculations against extracted game values. Use the [canonical game-access policy](helpers/README.md#game-access) to select the default offline server or justify live access.

## Saved-account calculation tests

Domain suites compare website results with extracted game values. They do not
add domain-specific save-pairing, fixed-roster, or extraction-context guards.
Shared extraction-health, character-selection, and dataset-integrity checks
remain in `tests/utils/` and `tests/helpers/`.

Family selects the highest Family Guy account-talent effect across all recipient
characters using their currently applied pre-ES inputs. Class-bonus tests compare
the resulting stored bonuses with the game's stored results. A current game
talent-helper result is not used as an oracle for the earlier Family Guy input.
Pre-ES inputs exclude Elemental Sorcerer Family levels but include applicable
Super Talent levels.

Bubba progression tests compare the next bonus, purchase cost, and affordability.
They do not assert the continuously changing raw meat balance.

Summoning stone tests compare native win counts and upgrade effects without
pinning boss HP to the progression of a particular saved account snapshot.

Gaming prepares its account level from the highest parsed player Gaming skill
before applying Superbit effects, Palette calculations, and harvest multipliers.

Button queue tests compare only the dynamic current task and its requirement
with native APIs. Copper sample progress has a separate matching calculation
comparison; queue progress and readiness do not mix active-character game values
with the website's account-best projections.

Class EXP tests compare the final multiplier with native `ExpMulti(0)` and check
its direct inputs separately. Clamworks promotion reward text does not supply an
extra class EXP factor absent from the native calculation.

Lab Mainframe 11 uses Storage's saved `GreenStacks` credit count, not the number
of current chest entries holding at least 10 million items. Current storage
quantities and inventory-based stack indicators remain unchanged.

The full normal-world maximum-damage comparison uses the dedicated
`player-maximum-damage.json` extraction config. Its native capture requires a town
and records the active player index, map ID, and internal map name. The test
requires a town save matching the captured player and map. Unsuitable captures
fail explicitly; the test does not skip or compare restricted-map damage.
Class EXP and damage parameter extractions remain independent of this requirement.
Town eligibility is a location prerequisite, not proof that every temporary buff
is absent.

## Automatic Domain Class Reference Report

`scripts/domain-class-references.ts` inventories class declarations in editable
`data/domain/**` and their symbol references from `app/**`, `components/**`, and
test files. A class counts as referenced when its class symbol or one of its
declared member symbols is referenced from a root. This is a symbol-reference
inventory; it does not classify classes as core or parameter calculations.

The top-level `excludedDomainDirectories` set near the top of
`scripts/domain-class-references.ts` controls which top-level directories under
`data/domain` are excluded. It currently contains `data`, `enum`, `model`,
`base`, and `login`; maintainers add or remove directory names there when the
exclusion list changes.

All formats group classes into **both**, **UI-only**, **tests-only**, and
**neither**, and group entries by implementation path:

```bash
yarn coverage:report                         # Markdown: coverage-report.md
yarn coverage:report --format=markdown       # Markdown: coverage-report.md
yarn coverage:report --format=html           # HTML: coverage-report.html
yarn coverage:report --format=json           # JSON: coverage-report.json
```

The command also accepts the space-separated form, for example
`yarn coverage:report --format markdown`. HTML is a standalone, human-readable
report with collapsed references and search; JSON is machine-readable.

## Documentation

## Opt-in multi-account tests

Routine `yarn test` and extraction use the regular save and matching results.
Reuse the shared default offline server when ready. Public-account workflows
are opt-in only when the user explicitly requests multi-account or
public-profile validation; they are not routine prerequisites or fallbacks.
See the [canonical game-access policy](helpers/README.md#game-access) and
[helper documentation](helpers/README.md#integration-with-tests).
Cached account snapshots and extraction runs stay under the ignored
`.cache/test-accounts/` directory. Account calculation mismatches remain
visible failures.

See `docs/TESTING_IMPLEMENTATION.md` for comprehensive testing guide.
