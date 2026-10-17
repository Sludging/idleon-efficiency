# Menagerie Lumi inputs: Crucible and Atom

Scope: v1.23 native inputs for `PetArenaCrucBonus("0",4)`, `PetArenaCrucBonus("0",14)`, and `AtomBonuses(16)`, plus current IE representation. Source: `../IdleonWikiBot/codefiles/idleon1.23.txt`. No live-server query, checks, or edits to implementation.

## Results

### `PetArenaCrucBonus("0",4)` and `PetArenaCrucBonus("0",14)`

The Menagerie Lumi formula calls these values at native source lines 118? [INCOMPLETE: exact consumer line was not established in this focused trace]. Direct inspection confirmed `PetArenaCrucBonus` is a Breeding-domain helper, but the helper's underlying save-array mapping and guards are not yet established. The only direct exact line located was a different generic talent-dispatch branch, source line 175409: it returns `1` when `DNSM.h.CalcTalentMAP.h.arenaCruc > i`, else `0`. This is not the requested Breeding helper definition and cannot establish either requested index's save input.

IE exposes `Breeding.upgrade`, an array of `PetUpgrade` models. Parser reads raw account `Breeding` array-of-arrays into `breedingData` at `data/domain/world-4/breeding.tsx:481-493`; upgrade levels are assigned from `breedingData[2]` by index at `514-516`. Raw `Breeding` default is `[]` and account-scoped at `463-469`. No exact mapping from native Crucible indices 4/14 to IE `PetUpgrade` indices is claimed without the native helper body.

### `AtomBonuses(16)`

Native helper definition: `idleon1.23.txt:236522-236554`. Tutorial-scene guard returns zero (`236523`). It initializes cached auxiliary calculations only if `DNSM.h.AtomBonCalc1` is absent: sums tower levels above 50 for `TowerInfo[9..17]` (`236524-236531`) and counts meals with level at least 30 in `Meals[0]` (`236532-236536`). General result starts as `Atoms[t] * CustomLists.h.AtomInfo[t][4]` (`236538-236541`). Special transformations apply only for indices 0, 5, and 8 (`236542-236551`); index 16 takes no special branch. Therefore `AtomBonuses(16) = Atoms[16] * CustomLists.h.AtomInfo[16][4]` outside Tutorial, without further transformation.

IE parser declares account-level raw key `Atoms` (`data/domain/world-3/construction/atomCollider.tsx:156-160`), reads it as an array (`167-170`), and assigns each modeled atom `atomsData[atom.index] ?? 0` (`172-174`). `AtomCollider.atoms` is built from the Atom Collider catalog (`144-147`); each Atom exposes `index`, `level`, and `getBonus() = level * data.bonusPerLv` (`data/domain/world-3/construction/atomCollider.tsx:18-45`). Thus saved `Atoms[16]` maps to `collider.atoms[16].level`; the native multiplier is catalog field `AtomInfo[16][4]`, corresponding to IE `atom.data.bonusPerLv` only if that catalog mapping is verified. This trace did not inspect generated catalog row 16 or establish its multiplier parity. Native scene guard has no visible direct IE API counterpart. `AtomCollider` does not retain current scene in its model.

## Evidence limits / next exact evidence needed

- Crucible: inspect actual `_customBlock_Breeding` implementation branch for `PetArenaCrucBonus`, then trace its guard and array accesses; compare against `breedingData[2]`/`PetUpgrade` mapping. Existing attempted searches: exact-name search in local v1.23 source, occurrences at offsets 7,332,082; 9,239,973; 9,240,095; 14,911,151; 14,911,214; 14,988,294; 15,006,128; 15,006,251; 15,006,378; 15,006,437; 21,534,726; 21,620,594; 21,917,265; 21,917,328; 22,011,531; 22,045,472; 22,045,659. Search found calls and generic talent-dispatch code, not helper body.
- Atom: current IE parser provides level at saved index 16. Exact output requires catalog row 16 multiplier; native helper also returns zero in Tutorial scene, while IE model does not expose scene status here.
- No runtime observations were made. Source version is the matched local v1.23 file; personalized runtime values and parity are unverified.
