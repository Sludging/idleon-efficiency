# The Hole part 1: backend plan

## Outcomes

Provide the backend information for [#441 — Villager growth, Opals, and Studies](https://github.com/Sludging/idleon-efficiency/issues/441), under the [approved specification](hole-spec-draft.md):

- Show Polonai, Kaipu, Cosmo, Minau, and Bolaia together. Distinguish rescue/access, saved level, invested Opals, stored EXP, next requirement, claim readiness, and next intrinsic unlock. Provide all five current EXP/hour rates and their contributors for every named imported character context.
- Reconcile earned, invested, and uninvested Opals across all released cavern sources and external grants. Explain current allocation-dependent effects and category-specific reset consequences.
- Show all 18 Studies, saved target, eligible immediate neighbors, saved levels/progress, next requirements, claim readiness, current progress/hour, contributors, and owned effective effects.
- Show Blinding Lantern quantities in storage and each character inventory. Keep inventory separate from account-wide daily usage out of 12 and from skilling claims.

The [selected information architecture](hole-ui-information-architecture.md) places growth, the Opal ledger, and Lantern context in **Villagers**. Studies belongs in **Upgrades → Studies**. Caverns consume their relevant owned Study effects. This plan supplies information, not page layout, forecasts, investment controls, or game actions.

## Responsibilities

Extend the existing [Hole domain](../../data/domain/world-5/hole/hole.tsx). Keep one account owner.

| Owner | Responsibility |
|---|---|
| **Hole** | Initialize five villagers and 18 released Studies. Coordinate aspect-owned parsing and preparation for every named imported Player context. Own saved Study targeting, shared allocation effects, Opal reconciliation, and the Lantern summary. Expose named source identities for later owner links. |
| **Villager**, in [villager.tsx](../../data/domain/world-5/hole/villager.tsx) | Parse its saved progression. Own role-specific EXP requirements, claim readiness, prepared character-context EXP rates and contributors, and next intrinsic unlock. Join each rate and contributor set to the imported Player identity. Use this class throughout; remove the duplicate class in `hole.tsx`. Align the existing `Bolai` name with approved **Bolaia** vocabulary and migrate affected references. |
| **Study** | Retain the generated-data wrapper and `fromBase` initialization. Own saved level/progress, access, requirement, claim readiness, rate participation, and effective effects. Keep numeric effects and discrete unlocked rules explicit; description text alone is not an effect API. |
| **Hole's Opal ledger** | Source rows are data-only records. Hole calculates cavern/external subtotals, invested total, and uninvested supply. Each row identifies its owner and acquisition meaning. Keep cavern-earned Opals separately available to existing consumers. |
| **Storage and existing source domains** | Remain authoritative for inventory and external grants/modifiers. Players own character identity and settled character inputs; Statues owns each character's Statue bonus. Hole reads their named state or calculated APIs during preparation. Lantern locations, character rates, and contributor rows are data-only records, not new domain classes or another account-data model. |

Apply these [backend pattern](../agents/backend-patterns.md) aspects: **FriendBonus** for generated-data wrappers; **Meal** for concept-owned calculations; **Worship Totalizer** for prepared source inputs; **Sushi** for named relationships; **Lab** for genuinely exceptional effect rules. Reuse suitable helpers from [data/utility.tsx](../../data/utility.tsx). These examples do not validate Hole formulas or authorize purchase simulation or a generic modifier framework.

## Required data and prerequisites

### Save boundary

Translate raw positions only during parsing. Pass named state to calculations and consumers.

| Input | Named meaning and verification need |
|---|---|
| `Holes[1]`, `[2]`, `[3]`, `[23]` | Existing mappings for villager saved levels, EXP, invested Opals, and purchased EXP upgrade. Verify each mapping and its meaning. Rescue/access needs its own source-backed rule; a rescue location, level, or cavern access does not by itself prove rescue. |
| `Holes[26]`, plus Study progress and target fields | Existing Study-level mapping needs verification. Identify persistent progress and target fields from the accrual and camp callers. Translate a missing/unselected target explicitly; do not import an actor-selected row. |
| `Holes[7]`, plus external grant inputs | Existing cavern Opal counts are a starting mapping, not the full ledger. Verify every source and avoid duplicate grants or future slots. Use the ledger refresh caller, not the actor's cached uninvested value. |
| `Holes[11][84]` | Research identifies account-wide Lantern uses today. Verify the persistent mapping and limit independently of stock and layer claims. |
| Storage chest and per-character inventory | Reuse `Storage.chest` and `Storage.playerStorage`, with character identities and quantities. The exported item identity is `Quest90`, **Blinding Lantern**; Gem Shop calls it **2 Hour Lantern**. Preserve storage versus character locations. |
| Camp and cross-account state | Read owned Majik, Measurements, schematics, monument rewards, Bell, collectibles, purchased EXP upgrades, Gaming Superbit 43, and relevant account modifiers through their owners. Identify each directly used calculation and its source-backed combination rule. |
| Lamp reset context | Verify Another Try access, six-wish cost, and each reset category. Supply cost/resource and cleared-versus-retained facts; do not execute or simulate a reset. |

Existing `StudyRepo` contains 18 entries. Existing item exports contain the Lantern identity and description. Catalogue presence does not prove current-version parity. Verify role identities, rescue conditions, released unlock order, requirement curves, effect coefficients, caps, and descriptions against the delivered game version. Missing or wrong game-owned static data requires a reported WikiBot extraction/sync prerequisite, not handwritten copies or generated-directory edits.

### Character-context growth mechanics

- The recorded game source directly multiplies `VillagerExpPerHour` by `1 + StatueBonusGiven28 / 100`. That branch reads runtime character `StatueLevels`. This establishes a character input, not observed rate differences or personalized parity; see [mechanic evidence](hole-research-brief.md#phase-4-evidence-and-stop).
- Use existing `Player.playerID` and `Player.playerName` for each imported context. Match `PlayerStatues.playerID`, select Statue index 28, and call `Statue.getBonus(player)` with that same Player. Consume settled Statue bonuses and Player contexts during late Hole preparation, together with shared inputs such as stamps and Sushi.
- Provide data-only rate records for every imported character and all five villagers under Hole's single account owner. Each record identifies its Player and includes that villager's rate and same-character contributor set. Identify the character's Statue percentage and factor separately from account contributors. Shared Hole progression stays the same across these contexts.
- Different valid character rates are valid outputs. Expose no arbitrary, best, first, or active primary rate. Do not create an unavailable account-rate field solely because character rates disagree, or infer game active state.
- Later UI must identify the inspected context, for example, **Rates for [character name]** or **Inspected character: [name]**. This describes imported snapshot inspection, not game selection, activity, or assignment changes. Widgets and default inspection selection remain future UI decisions. No forecasting, simulation, recommendation, or game action belongs to this contract.

### Mechanics needed to interpret the outcome

- Villager EXP rate starts from invested Opals: 100 EXP/hour per Opal, or 125 with Opal Dividends, before relevant modifiers. Verify role and account inputs separately. A purchased EXP multiplier is not Majik enhancement.
- Saved level remains authoritative. Stored EXP can meet the next requirement before the game claims a level. Report readiness without converting EXP, raising levels, or granting unlocks. Apply the same distinction to Study progress.
- Next intrinsic unlock uses saved level and released content: Polonai's next cavern, Kaipu's next schematic availability, Cosmo's next shared point, Minau's next Measurement access, or Bolaia's Study capability. Availability is not construction or purchase. Use verified schematic order rather than raw catalogue order. Report the released maximum where no further released unlock exists.
- Opal Enthusiasm uses tens invested per villager. Equal Spread uses blocks of five in the least-invested **unlocked** villager. Show actual current effects and contributors, not an optimal allocation.
- Reconcile `earned = cavern sources + external sources`, `invested = villager investments`, and `uninvested = earned - invested`. Audit Gem Shop, companions, Grimoire, Compass, Emperor, schematics, Arcane, Sushi, and any other grant in the current refresh caller. A reward description or unlocked acquisition route is not an earned grant.
- Another Try resets one category. Opal reset preserves earned Opals, levels, and stored EXP. Majik reset preserves Cosmo's level. Jar enchantment reset retains discovery level one. Summoning doubler reset clears assignments. These are explanations, not new Majik, Jar, or Summoning tools.
- Study the saved unlocked target. Superbit 43 also studies immediate eligible unlocked neighbors at the same rate. Other Studies keep their stored progress but do not receive that rate. Target selection never changes saved state on the website.
- Study effects include both scaling values and discrete rules. Cover all 18, including additive cross-skilling requirement-divisor contributions, challenge rules, Bell/Harp/Lamp gains, Jar targeting, Fountain marbleization, and Cove discounts. Cross-skilling Study contributions add to the collectible contribution in the denominator `1 + sum / 100`. Their percentages are not literal requirement reductions or complete cavern requirements. Distinguish the owned Study contribution from a cavern's complete output. Prepare any required saved cavern progression without waiting for its later UI part.
- Lanterns advance supported Hole accrual and villager EXP by two hours, not skilling layers or active challenges. Their daily usage does not refill other daily allowances. No import-to-now accrual or reset countdown is calculated.

Normal supported imports must provide a complete ledger and verified required rates/effects for every named character context. Unresolved attribution or modifier inputs block acceptance. A genuinely missing required account or character input affects only values that depend on it. Preserve independent information and expose each affected context value as unavailable with a reason. Unknown access is not a game lock; missing inputs are not zero or complete totals. Keep initialized required objects required.

## Integration

- Retain Hole's domain registration and the `init → parse → calculate` pipeline in [idleonData.tsx](../../data/domain/idleonData.tsx). Initialize required objects once. Aspect parsers only translate their own save state; no cross-domain access or calculation belongs in parsing.
- Prepare owned Study effects and required shared bonuses in `postProcessingMap` before their consumers. Replace parse-time Study-effect preparation used by schematics with ordered calculation. Preserve the existing schematic and Gambit consumer contracts unless a verified semantic change requires caller migration.
- Put part 1 display-only character-context growth rates, Study progress rates, full ledger reconciliation, Lantern summaries, next intrinsic unlocks, and Another Try inspection in a narrow Hole preparation step in `postPostProcessingMap`. This runs after calculated account inputs, including stamps and Sushi, and settled Statue bonuses and Player contexts. Keep game mechanics on their owning classes, not in UI code. Any newly required shared producer stays in `postProcessingMap` after its own inputs and before consumers.
- Preserve the early cavern-only Opal total used by [Tome's Hole Opal line](../../data/domain/world-4/tome.tsx). Rename the ambiguous `ownedOpals` contract to an explicit cavern-earned total and migrate that caller. Do not replace it with the later full ledger total. This also avoids feeding the full ledger back through Tome into growth rates.
- Replace prepared character-rate collections, contributors, source records, target eligibility, and Lantern locations on each update. Repeated parsing or calculation must not retain another account's progression, character identities, or contributor sets, or stack modifiers. Handle genuinely absent Hole/save fields without treating initialized domains as optional.
- Provide stable villager/cavern/source identities, values, units, access state, and missing-input reasons for later browsing and named owner links. Preserve all five villagers and 18 Study identities during partial support. Do not prescribe route shapes or add another store, endpoint, or parallel account-data model.

## Verification

Use the [repository testing guide](../TESTING_IMPLEMENTATION.md) and [extraction helper](../../tests/helpers/README.md). Extend the existing `tests/domains/hole/` core/parameter tests and `tests/configs/hole-*.json` extraction configurations.

- Pair running-game outputs with the same-version originating real save. Confirm the runtime active index equals the tested imported `Player.playerID`; use the matching Player and PlayerStatues. Compare typed public APIs with extracted values. Use `toMatchLiveGameWithDetails` for core results and `toMatchLiveGame` for direct calculated inputs, with configured tolerance `0`.
- Follow the helper's [active-player policy](../../tests/helpers/README.md#active-player-policy). Helpers do not switch characters. Each further character needs a real same-context game capture/startup and aligned test target. Inserting an ID into a character-implicit source expression does not create that context.
- Compare all five villagers' mappings, rescue/access, role requirements, investments, rates, contributors, readiness, and next unlocks. In each tested character context, compare all five rates, `StatueBonusGiven28`, and every direct contributor at tolerance `0`. Cover observed zero-investment, purchased-upgrade, locked, and claim-ready behavior. Do not create synthetic saves to manufacture branches.
- Verify collection coverage for every imported Player, all five rates per context, unchanged shared progression, and rate/contributor identity alignment. Verify valid differences using paired real contexts with different Statue inputs when available; report unavailable branch evidence. Check that no primary account-rate field exists.
- Compare all 18 Studies' identity, access, level/progress, requirements, effective effects, target participation, and rates. Verify the saved target, adjacent eligibility, Superbit behavior, discrete rules, and capped effects where the paired account exercises them.
- Reconcile every Opal source to the refresh caller, then compare cavern/external totals, investments, and uninvested supply. Check allocation effects against the same unlocked-villager set. Compare reset facts with the actual reset callers without claiming unobserved reset actions.
- Compare Lantern slot/location quantities and totals with saved storage/inventories. Compare usage with the account counter and limit. Verify the separation from skilling claims and the two-hour exclusion context.
- Keep every directly used calculation as a parameter comparison, including same-Hole inputs and each character's Statue contribution. Missing or failing parameters remain visible. Runtime account-counter differences from the originating save remain visible prerequisites for affected comparisons. Static metadata and trivial helpers are not parameter targets.
- Exercise the normal account pipeline with fresh instances and repeated processing of the paired real save. Check idempotence, settled late inputs, character-rate and contributor replacement across updates/account changes, Tome's cavern-only count, and affected schematic/Gambit consumers. Run changed tests and relevant existing Hole/Tome regressions after implementation lands.
- Record observed branches and unsupported comparisons. Source inspection alone does not establish personalized output parity. Later UI verification must demonstrate Villagers, Upgrades → Studies, and relevant owner links; backend tests do not prove rendered UI behavior.

This plan defines verification scope; it does not report executed checks. Documentation consistency and source tracing do not verify changed production behavior or establish personalized parity.
