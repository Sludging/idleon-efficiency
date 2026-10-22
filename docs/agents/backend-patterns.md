# Backend implementation patterns

Read [implementation-patterns.md](implementation-patterns.md) first for the shared pattern-selection workflow. This guide covers backend/domain calculations; [ui-patterns.md](ui-patterns.md) covers presentation. The examples below demonstrate only the named aspects, not whole-file templates. They are guidance, not requirements to add a new abstraction to every feature.

## Start from the player's question

### “What does this bonus give me now, or at the next level?”

[MODEL-01](../../CODING_STANDARDS.md#model-01--model-responsible-concepts) applies here: a `Meal` can answer its current bonus or evaluate a proposed level through the same calculation without changing the player's actual level. See [`Meal`](../../data/domain/world-4/cooking.tsx) for the state, bonus, image and cost APIs; use the same approach when a new feature needs a bonus preview, rather than calculating a second version in a component.

### “What will it cost to reach the target level or milestone?”

`Meal.getMealLevelCost(level)` accepts a target level, and its milestone methods total costs to named milestones. Use them to answer a target-level question without duplicating the cost calculation elsewhere.


When another game system supplies an input, prepare it before the consumer asks for the value. `updateWorshipTotalizer` gathers Worship, Gaming, and Sneaking state onto `Totalizer`; `Totalizer.getBonus` gates and calculates the requested effect. Cooking and other consumers ask the Totalizer API instead of re-reading those domains. See [`Worship`](../../data/domain/world-3/worship.tsx) and its registration in [`idleonData.tsx`](../../data/domain/idleonData.tsx).

### “What should I buy, in what order, with these resources?”

A purchase can change later prices, bonuses, unlocks, and remaining resources. Evaluate a purchase sequence using a temporary copy of the relevant upgrades and resources; after each simulated purchase, recalculate dependent state before evaluating the next one. Keep the real account unchanged. The shared [`EfficiencyEngine`](../../lib/efficiencyEngine/efficiencyEngine.tsx) and [`Compass`](../../data/domain/compass.tsx), [`Grimoire`](../../data/domain/grimoire.tsx), and [`Tesseract`](../../data/domain/tesseract.tsx) are examples to study when their approach suits the feature. This applies to new and existing features, not only those calculators.

## Give game records and entities clear owners

### Repository-backed records

For repository-backed concepts selected under [MODEL-01](../../CODING_STANDARDS.md#model-01--model-responsible-concepts), the examples below use website-owned wrappers initialized with a static `fromBase` factory. Their mechanic-specific APIs include `getBonus`, `getImageData`, `getBonusText` or `getDescription`, and `getCost` where needed; they are not a required identical interface for every record.

[`FriendBonus`](../../data/domain/friends.tsx) wraps generated `FriendBonusBase` data and owns active/account-level state and its bonus calculation. [`Meal`](../../data/domain/world-4/cooking.tsx) and [`MainframeBonus`](../../data/domain/world-4/lab.tsx) show other uses of website wrappers and `fromBase`. Keep generated repositories and models as game data sources; put website state and behavior in handwritten domain code.

### Raw static repository catalogue

Use `repositories.get('Item')` to read raw `ItemRepo` records as `DeepReadonly` data. The catalogue returns raw records, not website-owned wrappers; use wrappers only when a concept needs website state or behavior.

The catalogue loads each repository lazily and freezes its records and nested data. Each `StaticRepositories` instance caches its own loaded records. Callers may migrate incrementally and do not need to preserve repository initialization order.

Run `yarn repo:registry` to regenerate the typed registry. The `dev` and `build` scripts run this generator automatically, so new `*Repo.ts` files register before those commands start.

### Save-defined entities and relationships

`Kitchen` holds kitchen state and behavior, and `Player` represents a character with its own state; neither needs repository inheritance merely to be a class. Sushi's `SushiBoardSlot` and `SushiFireplace` illustrate data-only relationships as typed records with named fields instead of untyped tuples in [`sushi.tsx`](../../data/domain/world-7/sushi.tsx).

Apply [PARSE-01](../../CODING_STANDARDS.md#parse-01--translate-at-the-boundary) and [VOCAB-01](../../CODING_STANDARDS.md#vocab-01--game-vocabulary) to save mappings. A raw `-1` can mean different things in different game systems, not one universal “missing” value. Sailing captain trait parsing illustrates filtering a sentinel; Sushi parsing translates separate arrays into named board-slot and fireplace state. See [`sailing.tsx`](../../data/domain/world-5/sailing/sailing.tsx) and [`sushi.tsx`](../../data/domain/world-7/sushi.tsx).

## Share bonus behavior; specialize exceptional rules

A game may have many bonuses sharing a lifecycle and common behavior—such as name, image, active/unlocked state, and display or bonus APIs—while a few obey different rules. Model the shared behavior together where it genuinely helps consumers ask a common question. Specialize only bonuses with distinct game behavior; different names or constants alone are record data, not a reason for subclasses.

For example, Lab's ordinary mainframe bonuses share `MainframeBonus` behavior. `FungiFingerBonus` has a different effect and owns prepared Green Mushroom kill and jewel-boost inputs. `MainframeBonus.fromBase` chooses its kind; callers use the common bonus API rather than branching on bonus identity to reproduce its formula. See [`lab.tsx`](../../data/domain/world-4/lab.tsx).

## Prepare inputs in dependency order

Keep the established `init` → `parse` → `calculate` boundaries: initialize domain structures, parse the save into state, then calculate derived values in the registered dependency order. Updaters prepare cross-domain inputs on their owning object; consumer-facing getters may perform the final formula from that prepared state. `Totalizer` is one example. Read the [architecture skill](../../skills/architecture/SKILL.md) when changing pipeline dependencies rather than duplicating its ordering tutorial here.

Account-level getters must also work before a save loads. Initialize owned contribution inputs with neutral values, then replace them during calculation. Poppy's bonus inputs, Farming's Land Rank multipliers, and Hat Rack's empty contribution map illustrate this pattern. Use neutral values when resetting these inputs, and accept an empty roster for account projections. Keep validation for requests that require an actual player.

For account-wide mechanics that use a selected or best character contribution, select and prepare it once, then expose the result to consumers. Lab stores `bestBuboPlayerID` and prepares the connection bonus in [`lab.tsx`](../../data/domain/world-4/lab.tsx). This illustrates where selection belongs, not endorsement of Lab's specific player-selection expression for other calculations. Preserve explicit player context when a result is genuinely per-character; do not replace it with an account-wide value. Skilling's player-specific cache and callers are useful references in [`skilling.tsx`](../../data/domain/skilling.tsx).

For calculations currently called only by UI code, apply [MODEL-01](../../CODING_STANDARDS.md#model-01--model-responsible-concepts) with the preparation workflow above. Follow the UI guide for presentation, not calculation ownership.

## Make repeated processing safe

Initialization, parsing, and recalculation have been called more than once. Processing the same inputs again should not duplicate records or stack a bonus simply because a phase reran. Reset or replace derived collections and flags before rebuilding them, or otherwise ensure the operation overwrites its prior result. For example, `updateWorshipTotalizer` rebuilds unlocked bonuses, and Lab resets derived flags before applying current assignments. Treat these as techniques, not proof that every phase is safe: inspect the full lifecycle you change and preserve character-specific state where required.

## Reuse existing helpers

For [CONSIST-01](../../CODING_STANDARDS.md#consist-01--research-and-reuse-patterns), include [`data/utility.tsx`](../../data/utility.tsx) in helper discovery; check that a candidate matches the game rule. Keep display formatting details in the UI guide and existing display components rather than reimplementing them in a domain calculation.

## Evidence and testing

Never guess a game calculation. For domain changes, follow the [testing skill](../../skills/testing/SKILL.md) for game evidence and validation requirements. For new features, follow the [feature-implementation skill](../../skills/feature-implementation/SKILL.md) as well. Use the [calculation-correctness skill](../../skills/calculation-correctness/SKILL.md) when working on an existing selected correctness case. This guide selects implementation patterns; it does not replace those workflows.
