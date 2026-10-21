# Clamworks pearl MultikillTOTAL ownership — v1.23 evidence

## Answer

Index 3 is a pearl work-upgrade, not a Worker Class reward. Its description says pearl value depends on “your Multikill.” Native v1.23 computes index 3 from the active game context; the helper call itself passes no character or map arguments.

Retract the earlier `Player.getStat(...)` / `Player.getStats()` claim. `Player` has no such public methods. IE exposes calculated ordinary character stats as `player.stats` (`PlayerStats`), including fields such as `strength`, `defence`, and methods such as `getSkillPower(...)`. These are not `MultiKillTOTAL` and do not provide map-keyed multikill totals.

The normal save records each character’s current map, but not a distinct Clamworks-worker assignment. Do not select a character by invented policy, current map, highest multikill, or account-wide maximum. IE’s saved character list alone does not identify which character the player intends as worker.

Map 306 is The Clamworks; map 324 is Molten Edge (`MapNameRepo.ts:315,333`). Any offline observation made while a character is on map 324 describes Molten Edge context, not Clamworks. It cannot establish the map-dependent Clamworks result. No map-324 observation is reused as a Clamworks value here.

## Source and code citations

- `data/domain/data/ClamworksBonusRepo.ts:24–28`: index 3 description: “Boosts pearl value based on your Multikill! Currently gives }x”; value 1, cost 1.4. This establishes catalog identity and wording, not the formula.
- Native source is local v1.23: `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt`. At lines 172999–173000, `WorkbenchStuff("MultiKillTOTAL", 0, 0)` returns `floor(MultiKill_base + OverkillStuffs("2") * MultiKill_perTier)`. At 239988–239992, `Thingies("ClamBonuses", 3, 0)` multiplies `CustomLists.Spelunky[28][3]`, `OptionsListAccount[458]`, and `MultiKillTOTAL / 1000`. At 239993–240000, pearl value applies `1 + ClamBonuses(3) / 100`. `MultiKill_base` reads global `CurrentMap` at 172981 and applies a transformation for maps ≥300 at 172981–172997. These calls pass no explicit character or map arguments.
- `data/domain/player.tsx:105–120`: `Player` owns ordinary character properties, including `stats`, `currentMap`, and `currentMapId`. `player.tsx:649–660` maps `CurrentMap_<playerID>` through `parseMap`; `:814–819` stores the numeric map ID and resolves its display name.
- `data/domain/player-stats.ts:250–317`: `PlayerStats` exposes calculated ordinary statistics and methods. `updatePlayerStats` at `:734–762` builds its inputs and updates each player’s `stats`; it does not calculate native `MultiKillTOTAL`.
- `data/domain/idleonData.tsx:196–198`: `Clamworks` is an account domain. `data/domain/world-7/clamworks.tsx:52–83` parses account Clamworks pearl/work upgrade and promotion state from `OptLacc`; it has no worker-character assignment.
- `data/domain/world-7/clamworks.tsx:27–34`: IE explicitly leaves index 3 as an ordinary level-times-value calculation and comments that its multikill dependency is not modeled. This is not equivalent to native behavior.
- `data/domain/data/MapNameRepo.ts:315`: map 306 is The Clamworks. The player parser above represents each saved character’s `CurrentMap_<playerID>`; current map is not a saved worker assignment.
- `docs/game-snippets/players/TotalStats.1.23.js` records native `TotalStats`, not the `MultiKillTOTAL` function or Clamworks caller. It cannot support an IE multikill API claim.

## Exact input boundary and required native data

The exact pearl-upgrade dataflow in v1.23 is: `Thingies("ClamBonuses", 3, 0)` = `CustomLists.Spelunky[28][3] * OptionsListAccount[458] * MultiKillTOTAL / 1000`. Pearl value then multiplies by `1 + ClamBonuses(3) / 100`. `MultiKillTOTAL` is floored from `MultiKill_base + OverkillStuffs("2") * MultiKill_perTier`. Thus immediate native inputs are active-context `MultiKillTOTAL`, catalog coefficient `CustomLists.Spelunky[28][3]`, and saved upgrade level `OptionsListAccount[458]`.

To reproduce `MultiKillTOTAL`, producer must match active-game `MultiKill_base`, `OverkillStuffs("2")`, and `MultiKill_perTier`. `MultiKill_base` incorporates character/account bonuses and a map-dependent transformation at `CurrentMap >= 300`; overkill tier and per-tier bonus also require their native producer logic. Do not substitute ordinary IE stats, a saved map alone, highest tier, or Death Note kill counts. The v1.23 excerpts establish these inputs and operation order, but do not provide decoded save-field mappings for every helper.

The context needed to associate an observed result is game version, active native character/context, global map context, and exact output. Saved `CurrentMap_<playerID>` cannot prove which character is the active worker or reconstruct all native helper inputs. A character-wide bonus, highest tier, account aggregate, or Death Note kill count alone is insufficient.

## Evidence boundary and gaps

IE’s catalog establishes the upgrade description. Its code parses account-level upgrade state, ordinary per-character stats, and saved current maps. Native v1.23 establishes the formula, which reads active game state through global attributes, including `CurrentMap`. IE does not model that native helper call.

Offline v1.23 server observation: character 3 (`Sludgev4`) on map 324 (Molten Edge) returned `MultiKillTOTAL=231` and Clam bonus index 3 `10.395` in active context. This is not map 306 (The Clamworks) and does not confirm its map-dependent pearl value. No same-version result for map 306 was captured. The normal save does not identify a specific Clamworker, so save-only data cannot resolve player selection. Do not claim ordinary stats provide exact pearl multikill or that every save has populated usable values.

The Wiki page [The Clamworks](https://idleon.wiki/wiki/The_Clamworks) provides player-facing context, not formula authority.
