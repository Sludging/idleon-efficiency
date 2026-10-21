# Menagerie artwork evidence

**Scope:** v1.23 game-art identification for revised Menagerie UI. This note records source/art evidence and published asset details; no generated data, runtime, or application code changed.

## Result

The matching v1.23 native UI actor establishes direct, standalone artwork for every Menagerie mission, unlock, and bonus record. It also establishes Shell meter images. Record IDs map directly to image suffixes; no atlas or frame mapping is involved. APK originals and representative configured-CDN images were decoded and visually checked.

| UI entity | Native source mapping | Record IDs | APK image dimensions | CDN basename pattern |
|---|---|---:|---:|---|
| Mission | `MenaIconY{ID}.png` | 0–32 in the generated mission catalog | 38×38 | `MenaIconY{ID}` |
| Unlock | `MenaIconO{ID}.png` | 0–24 | 44×55 | `MenaIconO{ID}` |
| Bonus | `MenaIconP{ID}.png` | 0–24 | 42×55 | `MenaIconP{ID}` |
| Shell meter | `MenaShell0.png` empty; `MenaShell1.png` filled | Not a catalog record | 54×52 | `MenaShell0`, `MenaShell1` |
| Lumi currency mark | Font 109 native glyph `纳` (U+7EB3, decimal 32435), atlas rectangle (134,166) | Not a catalog record | 14×14 | `LumiCurrency` |

Mission assets `MenaIconY33.png` and `MenaIconY34.png` also exist in the APK, but generated catalog IDs stop at 32. Their record relationship is not established here; do not assign them to extra records.

The native Menagerie actor names shell images explicitly and uses Y/O/P filename prefixes plus the current zero-based record index. Its scroll offsets are added to the local visible-row index before lookup. The Y/O/P images are standalone PNGs, not atlas crops. Thus application entities can expose the exact basenames through existing `ImageData` without frame fields or UI filename maps.

The v1.23 actor `scripts.ActorEvents_786` creates and attaches `LumiJel.png` and `LumiJelS.png` as personal images (lines 272317–324). These are character art, not currency marks. Native wordmark glyph `终` (font 221, atlas rectangle x=330, y=25, 47×18) is distinct from Lumi currency glyph `纳` (font 109, U+7EB3, decimal 32435; atlas rectangle (134,166), 14×14).

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

**Lumi currency mark originates as a native font glyph.** Matching v1.23 font 109 maps `纳` (U+7EB3, decimal 32435) to atlas rectangle (134,166), 14×14. The extracted asset `LumiCurrency` preserves that glyph at native size; its published URL is `https://cdn2.idleonefficiency.com/images/LumiCurrency.png`. `LumiJel` and `LumiJelS` are character artwork only.

### Lumi balance and purchase-cost rendering

`ActorEvents_786:297093–297097` reads `Menagerie[0][0]`, formats it, and draws Lumi balance; nearby `~` is separate. The hourly rate uses localized `Lumi_gains_rate:` and `/hr`, then draws glyph `纳` at `:297101–297107`. Purchase cost comes from `CustomLists.h.Research[52]`, with `{` replaced by the formatted cost at `:297128–297159`; special costs at indices 20 and 24 replace `$` with formatted amounts at `:297131–297142`. Native source uses `纳` for Lumi currency; in the accepted UI, purchase-cost icons render at scale 1 and the summary icon at scale 0.75.

### Native usable-resource caller associations

The existing balance helper exposes five keys; source support for their visual marks differs by caller and representation:

| Balance | Native caller and glyph | Exact crop or asset used |
|---|---|---|
| Black Stars | `ActorEvents:226955–226977`, `秤` (U+79E4, 31204) | font 259, x=487, y=125, 18×17 |
| Organic Labels | `247903–247906`, glyph `溜` with `ExoticOrganicsLEFT` count | `MenaOrganicLabelSeal` uses whole `準` rosette (font 564, 34,93; 29×29) as qualified count/label emblem, not proven inventory-currency art |
| Minehead Doublers | `288079–288108`, `纷` (U+7EB7, 32439) | font 336, x=136, y=213, 32×32 |
| Sushi Doublers | `291370–291378`, `疲` (U+75B2, 30130) | font 336, x=211, y=217, 32×22 |
| Jelly Operator Doublers | `293036–293044`, `彩` (U+5F69, 24425) | font 746, x=889, y=84, 40×36 crop |

Native caller `idleon1.23.txt:247947–247964` applies whole font-564 blue rosette `準`, atlas rectangle (34,93), 29×29, to Spelunk[50] entries as an applied/selected state; separate glyphs mark other states. Caller `247903–247906` draws `溜` with `ExoticOrganicsLEFT` when `OrganicLabelOwned > 0`; this supports a qualified Organic Labels count association, not proof that the rosette is a physical inventory-currency icon. `MenaOrganicLabelSeal.png` uses the rosette as a labeled emblem beside the numeric count, not as an entry-state badge. The rosette is source-backed applied-label art.

### CDN confirmation and limits

The executor uploaded `MenaOrganicLabelSeal.png`; source and CDN SHA-256 both equal `e9668dadaf5a159dc222d7bc0e472e08033adf8a5180b9215e04e4c0a9c36199`. CDN decoded as 29×29 RGBA PNG. Production Lumi asset sync completed; `https://cdn2.idleonefficiency.com/images/LumiCurrency.png` decoded to 14×14 and matched source SHA-256 `1ecce3ec1e09c1a99d480525c7a7969af20c3ece720b10453e7dcc9256f1612a`. In Toolbox comparisons, Black Star and Minehead are exact pixel matches after 2× downsampling; Sushi is 92.47% exact, with small differences, while IE's glyph remains source-backed native counter art. Jelly uses the native doubler-counter coin; Toolbox uses the `MenaIconP12` boost portrait, so this is not an icon-equivalence test. Organic's whole rosette is native applied-label art; its Toolbox match is visual evidence only, not proof of literal inventory currency.

Evidence is matching v1.23 source, font mappings, decoded atlas crops, executor-confirmed CDN asset bytes, and observed CDN content. No live game or runtime was used. Organic rosette is a qualified applied-label emblem beside a numeric count, not a proven physical inventory-currency item. No generated data, public asset infrastructure, or generic crop infrastructure was added; the two standalone assets above are published extracted assets.


### Source anchors

The five resource helper definitions occur at `idleon1.23.txt:118771–118778`. Display callers: Black Stars `226955–226977`; Organic Labels count/label association `247903–247906`, and applied-state rosette `247947–247964`; Minehead `288079–288108`; Sushi `291370–291378`; Jelly Operator `293036–293044`. These callers establish qualified displayed associations, not currency-mark equivalence.
