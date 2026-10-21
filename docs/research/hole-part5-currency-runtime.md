# Hole part 5: Fountain currency runtime parity

**Scope:** Read-only source/runtime comparison for Fountain currency ID 0. Runtime used offline server port 3205, character 3. No refresh, purchase, time advance, or fixture write occurred.

## Runtime readiness and result

Before evaluating, `GET http://127.0.0.1:3205/status` reported `source: offline`, `cdpConnected: true`, `injected: true`, `gameReady: true`, `character: 3`, and player `Sludgev4`. `GET /game-version` reported title `Luminous_Menagerie`, version `1.23`.

Exact read-only query:

```json
{"expression":"idleon.callFunction(\"Holes2\", \"Fount_CurrencyTotValue\", 0, 0)"}
```

The response was `{"result":15252139478210.553}`. This is the v1.23 game function result for Fountain currency ID 0 on the selected same-save runtime. The function's relevant input is currency ID `t=0`; second argument is `i=0`.

## Discrepancy diagnosis

At first, app currency ID 0 was `15252171498588.676` versus paired v1.23 game output `15252139478210.553`. Fresh `/cloud-save` and fixture JSON canonical hashes then matched at `376d9681816d837d43cbe37eb5bb53b80e6da1174704be814d9a4fb649001a1f`.

Source lines `241518–523` show ID-0 base formula uses `Fountain_BonTOT(0,2)` twice, `Fountain_BonTOT(0,19)`, and `_customBlock_getLOG(Holes[9][3])`. App bonuses match runtime exactly: 1005 and 333. Wallet also matches: `79509637685278920000`.

The mismatch came from logarithm conversion. Source `103818–820` defines `_customBlock_getLOG(e)` as `Math.log(Math.max(e,1))/2.30259`; app had used `Math.log10(wallet+1)`. For this wallet, source result is `19.900377365032917`; the app's old result was `19.900419774440724`. Fountain now uses the exact source operation, and the focused app test matches game currency value.

Both paths use `baseValue × allMultiplier × luckyMultiplier × duckMultiplier` for this non-desire ID. All multiplier, lucky, and duck helpers matched runtime before the log fix. ID0 is not selected desire; saved desire ID is 8. Game source and domain now agree on the observed currency ID0 output for this paired save.

No purchase, time advance, save refresh, or fixture write occurred. The earlier runtime calls that treated `Fount_BonTOT` or `_customBlock_getLOG` as public `Holes2` functions returned invalid values; do not use them as evidence. The exact public dispatcher query for game output was `idleon.callFunction("Holes2", "Fount_CurrencyTotValue", 0, 0)`.

## Fresh operand pairing (v1.23, 2026-10-19)

The offline server on port 3205 passed readiness checks: `source: offline`, `cdpConnected`, `injected`, and `gameReady` were true; selected character was 3 (`Sludgev4`). `/game-version` returned `Luminous_Menagerie`, version `1.23`.

Read-only `GET /cloud-save` returned HTTP 200. Parsing its JSON and hashing `JSON.stringify(parsedSave)` with SHA-256 produced `376d9681816d837d43cbe37eb5bb53b80e6da1174704be814d9a4fb649001a1f`. The fixture parsed and canonicalized the same way produced the same hash and length (605297 characters). Thus runtime cloud-save and fixture have matching canonical JSON content in this observation.

The exact v1.23 helper calls were issued serially as `idleon.callFunction("Holes2", "<name>", 0, 0)`:

| Helper | Runtime result |
|---|---:|
| `Fount_CurrencyBaseValue` | `747031.8068909959` |
| `Fount_CurrencyALLmulti` | `9735578.563348683` |
| `Fount_LuckyCoinValue` | `1` |
| `Fount_DuckMulti` | `2.0971520000000003` |
| `Fount_DesireMulti` | `34.75` |
| `Fount_CurrencyTotValue` | `15252139478210.553` |

Bare helper identifiers failed because `/exec` did not expose them as globals. The specified `idleon.callFunction` form succeeded for each helper. Source identifies signatures through dispatcher keys in `idleon1.23.txt:241504-241523,241565-241599`; `Fount_CurrencyBaseValue` and `Fount_CurrencyALLmulti` ignore argument `i` in these branches. Currency total calls desire only when requested ID equals saved `[11][82]`.

`/cloud-save` encodes `Holes` as a JSON string, so its parsed array is `JSON.parse(save.Holes)`. Runtime raw values were `Holes[11][82] = 8`, `Holes[9][3] = 79509637685278920000`, and `Holes[30][0] = 0`. Source shows duck count comes from `OptionsListAccount[601]`, not `Holes[11][82]`; do not interpret saved desire slot 8 as duck count.

## Pairing limit

At the initial comparison stage, app-domain operands and the direct log-helper result had not been paired, so the exact mismatching input was unproven. The focused latest-save probe below resolves this gap. Fresh canonical runtime/fixture identity and matching bonus operands exclude differing raw save content and these two bonus inputs as causes. No save mutation, refresh, or time advance occurred.

## Fountain bonus operand comparison

Port 3205 again passed the required checks before runtime evaluation: `source: offline`, `cdpConnected: true`, `injected: true`, `gameReady: true`, character 3 (`Sludgev4`). `/game-version` returned `Luminous_Menagerie`, version `1.23`.

The exact v1.23 helper identifier is `Fountain_BonTOT`, not `Fount_BonTOT`. Source at `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt:241521-523` calls `_customBlock_Holes2("Fountain_BonTOT", 0, 2)` twice and `_customBlock_Holes2("Fountain_BonTOT", 0, 19)` once in the ID-0 base formula. The log helper definition at `:103818-820` is `Math.log(Math.max(e, 1)) / 2.30259`.

Read-only `idleon.callFunction("Holes2", name, water, upgrade)` query results:

| Query | Runtime result |
|---|---:|
| `Fountain_BonTOT(0,2)` | `1005` |
| `Fountain_BonTOT(0,19)` | `333` |
| Misspelled/nonexistent `Fount_BonTOT(0,2)` or `(0,19)` queried through `idleon.callFunction` | `69` each; invalid helper result, not a bonus |
| `Math.log(Math.max(wallet,1))/2.30259` | `19.900377365032917` |

The paired latest-save app/domain probe returned `hole.fountain.getBonus(0,2) = 1005` and `getBonus(0,19) = 333`; both match the exact runtime `Fountain_BonTOT` results. The same paired wallet is `Holes[9][3] = 79509637685278920000`. A source-equivalent read-only runtime expression, `Math.log(Math.max(79509637685278920000,1))/2.30259`, returned `19.900377365032917`. The app expression `Math.log10(wallet + 1)` returns `19.900419774440724`.

## Currency IDs 4–8 dispatch follow-up (v1.23)

The surprising ID-6 result is explained by the game dispatch, not by an extraction-argument mismatch. Source is `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt:241565-583`. The `Fount_CurrencyTotValue` case receives `t` as currency ID and compares `t` with saved `Holes[11][82]` (`:241566`). For the selected branch, IDs 6+ use `sqrt(Fount_DesireMulti(0,0) * Fount_CurrencyBaseValue(t,0) * Fount_CurrencyALLmulti(0,0))`, then multiply lucky value and duck multiplier (`:241567-570`). The nonselected branch for IDs 6+ uses the exact same expression (`:241576-579`). Thus IDs 6, 7, and 8 always receive the desire multiplier inside the square root, irrespective of which ID is selected. The selected-ID comparison has no effect for IDs 6+.

For IDs below 6, the selected branch multiplies by `Fount_DesireMulti`; the nonselected branch omits it (`:241571-575`, `:241580-583`). Saved desire ID 8 is directly the currency ID convention: `t == Holes[11][82]` compares the supplied ID itself against the stored value. It is not zero-based/one-based-adjusted in this dispatch. Runtime observation in the preceding evidence section found saved `Holes[11][82] = 8`.

The function-call mapping is direct: `Fount_CurrencyTotValue(t, i)` dispatches on `t`, and ignores `i` in this calculation; every nested helper call passes the currency ID only to `Fount_CurrencyBaseValue(t,0)` and `Fount_LuckyCoinValue(t,0)`. Therefore the safe read-only query for any currency ID `id` is `idleon.callFunction("Holes2", "Fount_CurrencyTotValue", id, 0)`. In particular, querying ID 6 with second argument `0` is correct; do not pass saved desire ID in the second slot.

This also identifies an app mismatch for IDs 6–8: game source always uses `sqrt(desire × base × all)` for these IDs, while `data/domain/world-5/hole/fountain.tsx:354-361` sets desire multiplier to 1 unless `currencyId === desireCurrencyId`. With saved desire 8 and runtime `Fount_DesireMulti = 34.75`, ID 6 game value must exceed the app value by `sqrt(34.75)` when other operands match. The paired values in the handoff show exactly that factor. This conclusion is source-derived and matches the reported runtime pair; this follow-up did not make runtime calls.

For base-value mapping, source confirms currency 4 uses `Fountain_BonTOT(1,3)` and modifier `Fountain_BonTOT(1,5)` (`:241539-543`); currency 5 uses `(1,4)` and `(1,6)` (`:241544-548`). This confirms the corrected ID-4 modifier. Domain mapping at `data/domain/world-5/hole/fountain.tsx:332-334` agrees for IDs 4 and 5. IDs 6–8 source base bonus pairs are respectively `(2,2)/(1,7)`, `(2,3)/(2,5)`, `(2,4)/(2,6)` (`idleon1.23.txt:241549-563`); the domain mapping at `:334` matches.

Evidence limits: this follow-up inspected local v1.23 source and the previously recorded paired offline-runtime evidence. It did not issue new runtime queries or mutate state. The source establishes dispatch semantics; the exact reported ID-6 factor is a comparison of the handoff's paired observed values. No inference about map 216 follows.

Using the matched bonuses and wallet, the game source base formula gives `747031.8068909959`; the app formula gives `747033.3752113592`. The helper operands match. The discrepancy is accounted for by the log transformation: game uses `Math.log(Math.max(wallet,1))/2.30259`, while app uses `Math.log10(wallet+1)`. Neither bonus operand explains the delta. The separately attempted `_customBlock_getLOG` direct script-path call returned HTTP 500; the source-equivalent expression succeeded. The earlier `69` result from calling `_customBlock_getLOG` through `idleon.callFunction("Holes2", ...)` was not a valid log result and must not be interpreted as one.
