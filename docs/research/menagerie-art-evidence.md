# Menagerie artwork evidence

**Scope:** v1.23 game-art identification for revised Menagerie UI. Research only; no generated data, public assets, runtime, or production files changed.

## Result

The matching v1.23 native UI actor establishes direct, standalone artwork for every Menagerie mission, unlock, and bonus record. It also establishes Shell meter images. Record IDs map directly to image suffixes; no atlas or frame mapping is involved. APK originals and representative configured-CDN images were decoded and visually checked.

| UI entity | Native source mapping | Record IDs | APK image dimensions | CDN basename pattern |
|---|---|---:|---:|---|
| Mission | `MenaIconY{ID}.png` | 0–32 in the generated mission catalog | 38×38 | `MenaIconY{ID}` |
| Unlock | `MenaIconO{ID}.png` | 0–24 | 44×55 | `MenaIconO{ID}` |
| Bonus | `MenaIconP{ID}.png` | 0–24 | 42×55 | `MenaIconP{ID}` |
| Shell meter | `MenaShell0.png` empty; `MenaShell1.png` filled | Not a catalog record | 54×52 | `MenaShell0`, `MenaShell1` |
| Lumi art candidate | `LumiJel.png`; separate `LumiJelS.png` also exists | Not a catalog record | `LumiJel` 28×53; `LumiJelS` 28×22 | Same basename |

Mission assets `MenaIconY33.png` and `MenaIconY34.png` also exist in the APK, but generated catalog IDs stop at 32. Their record relationship is not established here; do not assign them to extra records.

The native Menagerie actor names shell images explicitly and uses Y/O/P filename prefixes plus the current zero-based record index. Its scroll offsets are added to the local visible-row index before lookup. The Y/O/P images are standalone PNGs, not atlas crops. Thus application entities can expose the exact basenames through existing `ImageData` without frame fields or UI filename maps.

The exact Lumi relationship is now source-backed. In v1.23 actor `scripts.ActorEvents_786`, the `LilMena` Menagerie actor creates and attaches both `LumiJel.png` and `LumiJelS.png` as personal images (lines 272317–324). The actor initializes `LilMena` among its Menagerie-related animation names (lines 272274–279). Drawing code displays a native text value when `LilTownJellyUnlocked` is set (lines 271950–954). Therefore, `LumiJel` is truthful as Lumi-related decorative summary artwork, but it is not established as the exact currency glyph. `LumiJelS` is the small companion artwork attached to that same actor.

## Evidence

### Native UI actor

Matching source: `../IdleonWikiBot/codefiles/idleon1.23.txt`, actor `scripts.ActorEvents_786`, Menagerie UI ranges 296901–297451.

- Lines 297405–409 create `MenaIconY` + `visible row + mission scroll offset`, and blank the image if the corresponding mission index is locked.
- Lines 297415–19 create `MenaIconO` + unlock index, and blank locked entries.
- Lines 297425–29 create `MenaIconP` + bonus index, and blank locked entries.
- Lines 297391–99 choose `MenaShell0.png` or `MenaShell1.png` by shell progress, attach it to the Shell meter, and animate filled images.
- Lines 297453–69 initialize scroll offsets from native research-list lengths minus visible row counts; lines 297114–29, 297193–231, and 297255–90 use category indices as record indices.
- Lines 297094–106 render Shell balance, Lumi rate, and Lumi/hour text using game font glyphs. The inspected actor does not attach `LumiJel` as a currency icon.

Representative generated catalogs confirm IDs: `data/domain/data/MenagerieMissionRepo.ts:9–15` begins mission ID 0; `MenagerieUnlockRepo.ts:9–13` begins unlock ID 0; `MenagerieBonusRepo.ts:9–14` begins bonus ID 0. Their catalog counts are 33, 25, and 25 respectively. Catalogs lack art fields, but the native UI derives exact asset names from those `index` values.

### Offline APK image inspection

The delivered local client includes extracted originals under `apk/assets/assets/data/`. `file` confirms PNG format and exact dimensions at series endpoints: Y0/Y34 38×38; O0/O24 44×55; P0/P24 42×55; Shell0/Shell1 54×52; LumiJel 28×53; LumiJelS 28×22. Image reads decoded representative Y0, Y1, O0, O1, P0, P1, Shell0, Shell1, LumiJel, LumiJelS, and MenaOrb0 content. This confirms actual image content, not merely file presence.

### Configured CDN inspection

Decoded CDN image content matches corresponding APK art for these representative requests:

- `https://cdn2.idleonefficiency.com/images/MenaIconY0.png` — 38×38 mission emblem.
- `https://cdn2.idleonefficiency.com/images/MenaIconO0.png` — 44×55 unlock illustration.
- `https://cdn2.idleonefficiency.com/images/MenaIconP0.png` — 42×55 bonus jellyfish.
- `https://cdn2.idleonefficiency.com/images/MenaShell0.png` — 54×52 empty shell meter icon.
- `https://cdn2.idleonefficiency.com/images/LumiJel.png` — 28×53 Lumi jellyfish artwork.
- `https://cdn2.idleonefficiency.com/images/MenaOrb0.png` — 20×20 decorative orb; not established as the Lumi currency icon.

The requests returned decoded visual image content. This is stronger than an HTTP status check and confirms these basenames exist on the configured CDN. Series-wide CDN presence was not individually requested; pattern inference is source-backed, while exhaustive CDN availability is not independently confirmed.

## Implementation interface

`data/domain/imageData.tsx:1–5` defines `ImageData` as `{ location: string, width: number, height: number }`, with no frame field. `components/base/IconImage.tsx:7–27` resolves `location` through the configured CDN. Existing UI guidance (`docs/agents/ui-patterns.md:121–122`) requires entity-owned image metadata and `IconImage` rendering.

Use verified static basenames and dimensions in the existing Menagerie record/entity `getImageData()` methods: missions map index `i` to `MenaIconYi` and 38×38; unlocks map `i` to `MenaIconOi` and 44×55; bonuses map `i` to `MenaIconPi` and 42×55. Use Shell image location `MenaShell1` and dimensions 54×52 for the summary icon; the empty-state `MenaShell0` is specifically meter state. `LumiJel`/28×53 is source-backed Lumi-related decorative artwork on the native `LilMena` Menagerie actor, suitable as illustration but not proven to be the currency glyph. Do not map `MenaOrb0` to Lumi: actor uses MenaOrb images as ambient background decoration (296995–297003).

## Evidence limits

No live game or runtime was used. Asset meaning comes from the matching v1.23 actor and native basename references; visual content comes from decoded APK and CDN images. The `LilMena` actor attaches `LumiJel` and `LumiJelS` as character artwork, but the currency amount itself is shown through native text; exact currency-glyph semantics remain unproven. No CDN test was made for every series member; the actor-generated basename patterns and APK assets establish the expected filenames, but individual CDN availability beyond representative images remains unverified. No source evidence supports atlas frames or fabricated dimensions.
