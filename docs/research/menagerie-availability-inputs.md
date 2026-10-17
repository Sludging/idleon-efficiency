# Menagerie availability inputs

Scope: source and current IE state/API audit for v1.23 factors in mission availability. No implementation, tests, or runtime call performed. Source: `../IdleonWikiBot/codefiles/idleon1.23.txt`.

## Supported answer

Mission availability uses a *boolean* Ninja Jade Emporium purchase and a *boolean* bundle flag, each multiplied by their source coefficient. Native expression is `round(min(available mission catalog length, 1 + Menagerie BoostQTY(0) + Research Grid_Bonus(164,1) + Ninja EmporiumBonus(47,0) + 3*Thingies Have_ban_k(0)))` at v1.23 lines 118689-118705. Thus Jade upgrade 47 contributes 0 or 1; the bank-related bundle contributes 0 or 3. The cap is `CustomLists.Research[52].length`; native source rounds after applying min.

## Ninja Emporium bonus 47

- Native function: `Ninja.EmporiumBonus(t,0)` checks whether `Number2Letter[t]` occurs in `Ninja[102][9]`, returning 1 if present and 0 otherwise. Exact source: `idleon1.23.txt:237837`.
- Saved input: account-wide `Ninja[102][9]`, a string of encoded purchased Jade Emporium upgrade IDs. IE's Sneaking parser reads `Ninja` array, takes `ninjaData[102][9]`, converts each letter with `letterToNumber`, and sets each existing `jadeUpgrade.purchased` by membership. Exact IE parser: `data/domain/world-6/sneaking.tsx:416-419,474-483`; field setup/default: `401-403`; model initialization: `376-380`.
- Existing named IE representation: `Sneaking.jadeUpgrades`; query `sneaking.jadeUpgrades.find(upgrade => upgrade.index === 47)?.purchased` (or direct indexed lookup consistent with existing call sites). JadeUpgrade owns `index` and `purchased`; source around model declaration is `data/domain/model/jadeUpgradeModel.ts` (the existing parser imports `JadeUpgradeModel`). This is already parsed, not a missing input. Do not re-decode raw Ninja state in Menagerie.
- Evidence limit: no check was made here that Jade upgrade catalog row 47's player-facing label is the same meaning as its native call; index mapping is direct and source-grounded.

## ThingiesHaveBank(0)

- Native Thingies branch: `Thingies("Have_ban_k",0,0)` returns `1` exactly when `BundlesReceived.h.ban_k == 1`, else `0`. Exact source: `idleon1.23.txt:240194`; adjacent family `Have_ban_i/j/l/m` checks analogous bundle fields at `240190-240196`.
- Save input is the account-level `BundlesReceived` object, key `ban_k`; native attribute projection is its exact numeric equality-to-one check. No array index or arithmetic transform applies. Availability multiplies resulting boolean by 3 (`118698-118699`).
- Existing IE parsing: `account.tsx:236-244` parses `rawData.BundlesReceived` and maps `bun_v`, `bun_p`, `bun_q`, and `bon_a` to named booleans. It does not map `ban_k`. `world-5/hole/hole.tsx:2197-2200` reads bundle object for `bun_u`, not this key. Repository search found no `ban_k` parser or named account property.
- Conclusion: IE has raw save `BundlesReceived` available in `rawData` and existing parsers for other bundle keys, but no modeled/API property for `ban_k`. The necessary source data is therefore potentially present in an imported raw save, but the required named value is unavailable through current IE domain APIs. Do not infer missing raw save key means false; public-profile/raw-field presence remains an account-data concern.

## Relevant ranges and evidence boundaries

- `idleon1.23.txt:118689-118705`: Menagerie availability expression and catalog cap.
- `idleon1.23.txt:237837-237838`: Ninja Emporium purchase-string predicate, followed by cost branch.
- `idleon1.23.txt:240189-240196`: bundle predicates, including `ban_k`.
- `data/domain/world-6/sneaking.tsx:416-419,474-483`: IE input retrieval and Jade purchase decoding.
- `data/domain/account.tsx:236-244`: IE bundle parsing coverage; `ban_k` absent.
- `data/domain/world-5/hole/hole.tsx:2197-2200`: another use of raw BundlesReceived, mapping `bun_u` only.

No runtime observation was needed: source defines both transformations, and IE parser/API presence can be inspected statically. No versioned snippet was captured because this is a bounded source/input trace, not a request to capture full game functions. Existing offline/live runtime status and personalized values were not queried.
