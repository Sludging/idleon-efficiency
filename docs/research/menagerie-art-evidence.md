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

Use verified static basenames and dimensions in the existing Menagerie record/entity `getImageData()` methods: missions map index `i` to `MenaIconYi` and 38×38; unlocks map `i` to `MenaIconOi` and 44×55; bonuses map `i` to `MenaIconPi` and 42×55. Use Shell image location `MenaShell1` and dimensions 54×52 for the summary icon; the empty-state `MenaShell0` is specifically meter state. `LumiJel`/28×53 is source-backed character art on the native `LilMena` Menagerie actor, not a currency icon.

**Lumi currency mark is a font glyph, not standalone image.** Matching v1.23 font 221 maps `终` (U+7EC8, decimal 32456) to atlas rectangle x=330, y=25, 47×18. The decoded glyph is the stylized LUMI wordmark. It is not `終`; the two characters differ. The production UI uses the verified glyph crop for the main balance and costs.

### Lumi balance and purchase-cost rendering

`ActorEvents_786:297093–297097` reads `Menagerie[0][0]`, formats it, appends `终`, and draws with font 221; nearby `~` is separate. The hourly rate uses localized `Lumi_gains_rate:` and `/hr`, then draws `纳` at `:297101–297107`. Purchase cost comes from `CustomLists.h.Research[52]`, with `{` replaced by the formatted cost at `:297128–297159`; special costs at indices 20 and 24 replace `$` with formatted amounts at `:297131–297142`.

### Verified usable-resource marks

The five usable balance keys come from existing `getResourceBalances`. Native v1.23 display callers establish these marks and labels:

| Balance | Native caller and glyph | Exact crop or asset used |
|---|---|---|
| Black Stars | `ActorEvents:226955–226977`, `秤` (U+79E4, 31204) | font 259, x=487, y=125, 18×17 |
| Organic Labels | `247904–247906`, `溜` (U+6E9C, 28316), full banner glyph | font 564, x=1, y=70, 21×20 crop |
| Minehead Doublers | `288079–288108`, `纷` (U+7EB7, 32439) | font 336, x=136, y=213, 32×32 |
| Sushi Doublers | `291370–291378`, `疲` (U+75B2, 30130) | font 336, x=211, y=217, 32×22 |
| Jelly Operator Doublers | `293036–293044`, `彩` (U+5F69, 24425) | font 746, x=889, y=84, 40×36 crop |

The full Organic Labels banner (`font-564`, x=1, y=70, 180×22) and Jelly Operator banner glyph (`font-746`, x=889, y=84, 128×36) were inspected; the UI uses the smaller cropped icon illustrations above, not shrunk banners. Crop files were extracted with the existing command `node data/extract-icon.js font221 32456 LumiMark.png` (and corresponding font IDs/code points: `font259 31204 MenaBlackStar.png`, `font336 32439 Minehead.png`, `font336 30130 Sushi.png`; Organic Labels uses `font564` crop `2,71,21,20`, Jelly Operator uses `font746` crop `889,84,40,36`). `LumiJel` is native character art, not currency; neither standalone orbs nor the text “Lumi” are currency marks.

### CDN confirmation and limits

After explicit authorization, the normal S3 sync ran with profile `idleons`. The six final asset URLs were decoded and matched the extracted dimensions: `LumiMark.png` 47×18, `MenaBlackStar.png` 18×17, `MenaOrganicLabelIcon.png` 21×20, `MenaMineheadDoubler.png` 32×32, `MenaSushiDoubler.png` 32×22, and `MenaJellyOperatorDoublerIcon.png` 40×36. This sync also uploaded pre-existing changed local assets; it performed no deletes and no app deployment.

Evidence is matching v1.23 source, font mappings and decoded atlas crops, plus decoded CDN content. No live game or runtime was used. No generated image data, public assets, or generic crop infrastructure were added. No standalone Lumi currency PNG or atlas-frame website API is claimed.


### Source anchors

The five resource helper definitions occur at `idleon1.23.txt:118771–118778`. Their display callers are Black Stars `226955–226977`, Organic Labels `247904–247906`, Minehead `288079–288108`, Sushi `291370–291378`, and Jelly Operator `293036–293044`. These callers establish the displayed resources and marks. The production balances use the existing `getResourceBalances` output; no owned/used history was added.
