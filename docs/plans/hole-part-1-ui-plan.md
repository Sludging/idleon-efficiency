# The Hole part 1: UI plan

## Outcomes and scope

For [#441 — Villager growth, Opals, and Studies](https://github.com/Sludging/idleon-efficiency/issues/441), provide read-only inspection of the accepted [backend](hole-part-1-backend-plan.md):

- Compare all five villagers' rescue state, saved progression, investments, requirements, claim readiness, and next intrinsic unlocks. Inspect growth rates and contributors for every named imported character.
- Reconcile cavern and external Opals into earned, invested, and uninvested totals. Explain current allocation effects and each Another Try reset category.
- Inspect all 18 Studies, the saved target, eligible neighbors, stored progression, current participation, rates, and owned effective effects.
- Inspect Blinding Lantern stock by location and account-wide usage out of 12. Keep Lantern use separate from skilling claims.

Follow the [selected information architecture](hole-ui-information-architecture.md). Use exactly **Villagers → Upgrades → Caverns**. Studies remains under **Upgrades → Studies**. Other Hole systems retain their identities and an honest unsupported-state explanation. This part does not implement their full interfaces.

## Composition and interactions

### Villagers

Open the page on Villagers. Show a short snapshot notice, followed by the character-rate inspection selector and five aligned `DataRow` records. Keep Polonai, Kaipu, Cosmo, Minau, and Bolaia visible together.

Each row shows:

1. Name, role, and personal rescue/access state.
2. Saved level and invested Opals.
3. Stored EXP, next EXP requirement, and claim readiness.
4. Current EXP/hour for the explicitly inspected character.
5. Next intrinsic unlock, its required level, and a named owner link. Show the released maximum when applicable.

The character selector initially has no selection. Prompt the player to inspect a character. After selection, label the rates **Rates for [character name]**. Offer every imported character, using stable Player identity. Changing this selection changes only the inspected rate and matched contributors. It does not change shared progression or game assignments. Do not infer an active, best, first, or account-wide primary rate.

A row's **Growth details** disclosure shows the full matched contributor set. Separate the character's Statue percentage and factor from account contributors. Retain each contributor's unit, combination rule, owner link, and unavailable reason. Include the purchased EXP multiplier separately from Majik enhancement. Do not present a contributor percentage as the complete rate.

Show saved levels even when stored EXP meets the next requirement. Use **Ready to claim in game**, not an increased level or an unlocked reward. For Kaipu and Minau, next availability is not construction or purchase. Bolaia's next capability is Study rate, not a new Study catalogue entry.

Below the five rows, keep these task-local sections:

- **Opals:** earned, invested, and uninvested totals, with cavern and external subtotals. Put Opal artwork beside the resource label. **Opal sources** reveals the complete ledger, including zero contributions, acquisition meanings, source-owner links, and backend floor/rounding adjustments. Show exact counts where compact notation would obscure reconciliation.
- **Allocation effects:** show Equal Spread's current least-unlocked-villager investment and effective percentage. Show each villager's Opal Enthusiasm investment tens and effective percentage. Link the effects to their Majik owner. Do not recommend or simulate an allocation.
- **Another Try reset details:** show current access, wish cost, wish stock, and affordability. List what each category clears and retains. Opal reset retains earned Opals, saved levels, and stored EXP. Show the Majik, Jar enchantment, and Summoning doubler consequences as explanations, not tools. Link to Lamp and explain the competing wish cost. Provide no reset button.
- **Blinding Lanterns:** compact stock, uses today / 12, and the two-hour effect. **Lantern locations** reveals storage and every named character inventory, including zero stock. Show the backend's supported accrual and exclusion lists. Do not infer remaining skilling claims, a refill, or a reset countdown.

These sections are not extra top-level destinations or an always-visible shared-resource dashboard.

### Upgrades → Studies

Use `LeftNavButton` for **Majik → Schematics → Studies → Measurements**. Select Studies on the first visit to Upgrades. Keep later selection while this page remains open. Other subsystems show their name and **Full details are not available on this website yet**. This website-support state does not imply a game lock.

Above the list, show the saved target, immediate eligible neighbors, and shared Study progress/hour. Give the shared rate its own contributor disclosure. Explain that Superbit participation follows the saved target and eligible immediate neighbors. The website does not change that target.

Provide **Search Studies** by name and effect, and **Show unlocked**, initially off. Default to game order. Do not add time sorting, extra views, or recommendations.

Show all 18 Studies as aligned rows. Each row contains numbered cavern identity, saved Study level, stored progress / next requirement, readiness, participation, progress/hour, and an owned-effect summary. Use explicit participation labels: **Saved target**, **Eligible neighbor**, **Inactive**, or **Unavailable**. Known inactive rates may be zero; missing rates are unavailable, not zero.

**Study details** exposes the materialized generated description and complete typed `getEffects()` results, including units, scope, notes, discrete rules, and unavailable reasons. Do not display raw description-template markers. Keep owned effects separate from potential effects and full cavern outputs. In particular:

- Cross-skilling percentages are additive resource-divisor contributions, not literal percentage reductions or complete requirements.
- Fountain's Study description does not establish complete marbleization permission. Preserve the backend's separate owned rule and permission distinction.
- Cove's daily counter limits discounted upgrades, not purchases.
- Jar preference does not guarantee selection. Wisdom recovery retains its capacity condition.

Each Study links to its exact cavern. A cavern links back to that Study's detail under Upgrades → Studies.

### Caverns and owner links

Keep all 18 numbered cavern identities individually reachable in canonical order. For this part, a cavern exposes only the relevant accepted Study effect and earned Opal source context. State that full cavern details are not delivered. Do not display the old incomplete cavern interface or imply that a missing website surface is locked in game.

Owner links retain the correct destination. Internal Hole links select the named tab, subsystem, cavern, or Study detail. Use the existing `/world-5/hole` route, with query state for shareable owner selection. Keep inspected character and search/filter choices local; do not add a persistence store. External links use verified existing source routes. When no source page exists, show a named source explanation rather than guessing a route or returning unrelated values.

## Visual references and artwork

Preserve the incumbent **Rubik, charcoal surfaces, blue selection, and shared app layout** from [DESIGN.md](../../DESIGN.md). Use the ordinary feature heading. Do not add another outer width or horizontal inset.

Reuse [DataRow](../agents/ui-rows.md) for aligned villager and Study records, including its shell, spacing, and identity alignment. Reuse `ContentTabs`, `LeftNavButton`, `TextAndLabel`, `ComponentAndLabel`, `TipDisplay`, and existing number/resource helpers where appropriate. Cards are not a second default view. Keep full explanations in local disclosures, not hover-only text.

Relevant incumbent examples include [Divinity rows](../../app/world-5/divinity/content.tsx), [Forge](../../app/world-1/forge/content.tsx), [Research rows](../../app/world-7/research/researchContent.tsx), and [Atom Collider](../../components/world-3/construction/atomCollider.tsx). The selected shared-row API, not any example's field count, governs row composition.

Use `IconImage` with existing metadata: `Item.getImageData("Opal")`, `Item.getImageData("Quest90")`, and character class metadata beside an inspected character where useful. Both resource PNGs were reachable on the site's CDN. No villager or Study portrait accessor was found. Toolbox's portrait and Study-rate filenames were not reachable on this CDN. The preview therefore uses clear villager/Study names without invented portraits. Do not copy competitor assets, add public images, or silently invent metadata. Portraits are not required to understand these outcomes.

The browser-rendered [IdleonToolbox Hole page](https://idleontoolbox.com/account/world-5/hole?profile=liiiiiiiiiiiig) provides reference for artwork recognition, adjacent progression fields, and owned Study descriptions. Its **Explore / Engineer / Bonuses / Measure / Study** topology, ETA fields, time sorting, total villager rate, colors, cards, and calculations are not adopted. Follow the selected IE hierarchy and named character-rate contract instead.

## Data responsibilities and integration

Keep route metadata and the server wrapper in `app/world-5/hole/page.tsx`. Replace the existing placeholder client content with the approved read-only surface in the later implementation phase. Restore the existing World 5 Hole navigation entry then. Do not create another account owner, endpoint, or backend calculation layer.

Read the accepted Hole domain through `useAppDataStore`. Use `useShallow` for grouped selections and retain `lastUpdated` when reading the mutable domain map. Read the real save timestamp for snapshot text; do not use the refresh dependency as the save timestamp.

| Information | Accepted backend owner |
|---|---|
| Villager state, requirements, readiness, next unlock | `Villager` fields, `getExpRequirement()`, `claimReady`, `nextUnlock` |
| Named growth context and contributors | `Villager.characterRates`, matched by Player identity |
| Ledger and reconciliation adjustments | `Hole.opalLedger` |
| Allocation effects and reset facts | `Hole.allocationEffects`, `Hole.anotherTry` |
| Lantern locations, stock, and usage | `Hole.lanterns` |
| Saved Study target, neighbors, shared rate/contributors | `Hole.savedStudyTarget`, target availability, eligible neighbors, `studyRate`, `studyContributors` |
| Study progression, participation, effects, rules | `Study` fields, `getRequirement()`, `claimReady`, `getEffects()`, `ownedRule` |

The UI formats and filters these values. It does not recompute game requirements, rates, attribution, access, allocation effects, or reset costs. Resolve unlock identities through existing generated catalogue names. Do not create authored game-benefit descriptions.

Preserve meaningful decimal precision for multipliers, percentages, and ledger adjustments. Compact count formatting must not turn a cost multiplier into zero.

## States and verification

Keep account loading in the existing header/provider flow. Guard genuinely unavailable feature data locally. Distinguish game lock, unsupported website content, missing inputs, verified zero, and snapshot state. These states may coexist. Keep all identities available during partial support. Preserve independent values when another field is missing. Display each dependent unavailable value with its backend reason; do not publish a complete ledger or balance when attribution is incomplete.

In the later implementation phase, use the existing Docker Playwright workflow with a preserved real local save. Verify:

- Five villagers, every imported character selection, same-character contributor identity, readiness without claiming, and named unlock links.
- Complete ledger reconciliation, source/acquisition links, allocation context, all reset consequences, Lantern locations, and usage separation.
- All 18 Studies, target/neighbor/inactive states, owned numeric and discrete effects, contributor details, search/no-results/clear, and the initially unfiltered catalogue.
- All three top tabs, four upgrade identities, 18 cavern identities, exact owner links, unsupported explanations, and missing-versus-zero presentation.
- Desktop rendering at 1440×1000, loaded CDN imagery, readable wrapping, and relevant browser errors.

The planning preview evaluates actual component composition and imported backend display values. It does not add game-output parity or establish unobserved gameplay branches. Backend acceptance limits remain intact. Forecasts, import-to-now accrual, countdowns, simulations, recommendations, and game actions remain outside this part.

## Sources

- [Approved issue #441](https://github.com/Sludging/idleon-efficiency/issues/441), [specification](hole-spec-draft.md), and [canonical IA](hole-ui-information-architecture.md).
- [Accepted backend and evidence limits](hole-research-brief.md#backend-acceptance-and-local-commit), including retained game source and extraction results.
- [Research mechanics](hole-research-brief.md#2-camp-shared-progression-and-resource-competition) and [official Wiki revision 103847](https://idleon.wiki/index.php?title=The_Caverns&oldid=103847) for player actions and terminology.
- [UI work guide](../agents/ui-patterns.md), [row contract](../agents/ui-rows.md), and [UI verification](../agents/ui-verification.md).
- [Toolbox Hole reference](https://idleontoolbox.com/account/world-5/hole?profile=liiiiiiiiiiiig&t=Study), inspected in Chromium. Static reader output incorrectly presented the initial profile URL as a 404; the rendered route loaded.
