# Hole part 4: v1.23 artwork research

**Scope:** Source and asset mapping for Well, Bell, Harp, and Lamp identities selected in [Hole part 4](../plans/hole-part-4-ui-plan.md). The initial research below predates the completed asset integration; see **Current integration** for superseding metadata, CDN, and browser evidence.

## Findings

### Historical research snapshot — before crop integration

The native client uses font-atlas glyphs for Hole currencies rather than standalone PNGs. Initial research found atlas frames for all ten Sediment and ten Harp-note currency marks. At that time, the repository's Hole-currency item metadata supplied standalone PNGs only for Fountain currency IDs 31–38.

This snapshot's initial conclusion that no website metadata or CDN equivalence existed for the atlas glyphs is superseded by the current integration below. The native-source mappings and frame coordinates remain valid.

### Well: ten sediment identities and marks

| ID | Player-facing identity | `HoleCurrencyRepo` token | `font-675.png` frame (x,y,w,h) | Website/CDN equivalent |
|---:|---|---|---|---|
| 0 | Gravel | `` ` `` | (2,402,28,28) | No HoleCurrency image metadata; font glyph only |
| 1 | Goldust | `@` | (30,402,28,28) | No HoleCurrency image metadata; font glyph only |
| 2 | Redstone | `#` | (58,402,28,28) | No HoleCurrency image metadata; font glyph only |
| 3 | Mythril | `$` | (86,402,28,28) | No HoleCurrency image metadata; font glyph only |
| 4 | Cobaltine | `%` | (114,402,28,28) | No HoleCurrency image metadata; font glyph only |
| 5 | Bruntine | `^` | (142,402,28,28) | No HoleCurrency image metadata; font glyph only |
| 6 | Freezium | `&` | (170,402,28,28) | No HoleCurrency image metadata; font glyph only |
| 7 | Sweetium | `*` | (198,402,28,28) | No HoleCurrency image metadata; font glyph only |
| 8 | Rad Coral | `(` | (226,402,28,28) | No HoleCurrency image metadata; font glyph only |
| 9 | Hyper Coral | `)` | (254,402,28,28) | No HoleCurrency image metadata; font glyph only |

Identity/order/capacity source: `data/domain/data/SedimentRepo.ts:7–19`. Currency token mapping: `data/domain/data/HoleCurrencyRepo.ts:7–30`. Font frames: `apk/assets/assets/graphics/1x/font-675.fnt:101,65,29,31–35,38,37` (individual entries are the `id` values matching each token). Native Well drawing shows ten sediment rows and labels them through `HolesInfo[22]` (`idleon1.23.txt:261663–261678`). That separate display glyph path uses font 650; it does not prove that its level-banded glyphs are the same ten currency marks listed above. The exact level-to-`HolesInfo[22]` visual mapping remains unresolved.

**Bucket / gold bucket / Opal:** Client assets include `HoleWellBucket0.png` and `HoleWellBucket1.png`, both 62×128; visual inspection confirms ordinary wood and gold bucket artwork. Existing `data/icons/assets/data/` files are served at `https://cdn2.idleonefficiency.com/images/HoleWellBucket0.png` and `https://cdn2.idleonefficiency.com/images/HoleWellBucket1.png`; both exact URLs returned HTTP 200. Their basenames and artwork identify these bucket types, although the native source caller uses separate font-109 `Bucket_1` cell labels and does not directly link either PNG to a displayed count. The website uses the exact named PNG metadata for its corresponding bucket counts. Native Well drawing renders bucket assignment/fill (`idleon1.23.txt:261631–261658`) and updates bucket cells (`261680–261689`).

Client also includes `Opal.png` (30×31), visually a multicolor opal, and `OpalGive.png` (64×32), visually a “GIVE OPAL” button, plus `HoleUIbgOpal.png` as separate background art. The Well expansion-cost caller draws a font-675 backtick glyph (`idleon1.23.txt:261618–261623`); that is the same character as Sediment currency ID 0 in `HoleCurrencyRepo`, not evidence that the standalone `Opal.png` is attached there. Source-backed exact usage of `Opal.png` in the selected page was not found. No matching IE metadata or CDN evidence was found.

The separate Well row marker uses font 650 and `HolesInfo[22]` level-band characters (`idleon1.23.txt:261663–261670`). The decoded `font-650.png` is the actual 256×1024 client atlas and visibly contains Well/Hole UI elements, but the generated repositories expose sediment capacity values, not the six source glyph characters. The file has 177 character frames; without the corresponding `HolesInfo[22]` values, no exact row-icon frame can be assigned to Gravel–Hyper Coral. The ten font-675 currency marks above are exact, but are not a substitute for this distinct native row-art mapping.

### Harp: ten notes and seven strings

| ID | Player-facing identity | Currency token | `font-675.png` frame (x,y,w,h) | Website/CDN equivalent |
|---:|---|---|---|---|
| 0 | Crotchet Note | `:` | (0,431,28,28) | Font glyph only |
| 1 | Natural Note | `;` | (29,431,28,28) | Font glyph only |
| 2 | Bass Note | `<` | (57,431,28,28) | Font glyph only |
| 3 | Treble Note | `,` | (85,431,28,28) | Font glyph only |
| 4 | Eighth Note | `>` | (114,431,28,28) | Font glyph only |
| 5 | Quaver Note | `.` | (141,431,28,28) | Font glyph only |
| 6 | Sharp Note | `?` | (170,431,28,28) | Font glyph only |
| 7 | (F)Clef Note | `{` | (198,431,28,28) | Font glyph only |
| 8 | (G)Clef Note | `[` | (225,431,28,28) | Font glyph only |
| 9 | Sixteenth Note | `}` | (253,431,28,28) | Font glyph only |

Identity/token source: `data/domain/data/HarpNotesRepo.ts:7–19` and `data/domain/data/HoleCurrencyRepo.ts:31–100`. Exact atlas frames: `apk/assets/assets/graphics/1x/font-675.fnt:58,60–62,40,62–64,136,97,139`. Decoded atlas visually confirms ten distinct musical-note glyphs in these frames. Native Harp UI uses the Hole note sequence in its note balance display (`idleon1.23.txt:261942–261953`); its dedicated slot/icon caller is not evidence of an additional standalone PNG.

The generated item records identify only five note-item relationships: `HoleHarpNote0`, `HoleHarpNote2`, `HoleHarpNote4`, `HoleHarpNote6`, and `HoleHarpNote7` (`data/domain/data/MeasurementRepo.ts:20–21, 36–37, 44–45, 60–61, 76–77`). These are records for five note items, not a complete 10-note icon catalog. The currency glyph mapping covers all ten and remains the complete verified art mapping.

Seven string identities are generated in order C, D, E, F, G, A, B (`HarpStringsRepo.ts:7–51`). The native caller does not draw uppercase identity characters directly. It draws `Number2Letter[13+n]` in font 675 (`idleon1.23.txt:261923–261928,261955–261961`). Read-only v1.23 runtime observation resolved those indices as lowercase `m`–`s`; each atlas glyph renders a colored, beveled C/D/E/F/G/A/B letter:

| String ID | Identity | `Number2Letter` index | Codepoint | `font-675.png` frame (x,y,w,h) |
|---:|:---:|---:|---|---|
| 0 | C | 13 | `m` U+006D | (218,834,25,28) |
| 1 | D | 14 | `n` U+006E | (245,834,25,28) |
| 2 | E | 15 | `o` U+006F | (274,834,25,28) |
| 3 | F | 16 | `p` U+0070 | (299,834,25,28) |
| 4 | G | 17 | `q` U+0071 | (323,834,25,28) |
| 5 | A | 18 | `r` U+0072 | (350,834,25,28) |
| 6 | B | 19 | `s` U+0073 | (378,834,25,28) |

The codepoints were observed with offline `/exec` expression `idleon.engine.getGameAttribute("Number2Letter").slice(13,20)`; result was `["m","n","o","p","q","r","s"]`. Client frames are matching `font-675.fnt` entries for these seven lowercase codepoints (lines 125–134); individual crops were decoded and visually confirmed. Thus font 675 does contain the native per-string label artwork, but its source codepoints are m–s, not C–I or A–G. No separate string-item sprite or website string-art metadata exists.

### Bell: currencies and seven bonuses
The six improvement methods use these generated resource names (`data/domain/data/BellImprovementRepo.ts:7–50`). Existing component mappings are in `components/world-5/hole/part4Caverns.tsx:40–45`:

| Method | Resource | Verified art mapping |
|---:|---|---|
| 0 | Coins | Existing `Item.getImageData("Coins1")` / `CoinsDisplay` |
| 1 | Mythril | Hole currency index 3, token `$`, font-675 frame (86,402,28,28) |
| 2 | Bits | Existing `Item.getImageData("Bits")` / `BitsDisplay` |
| 3 | Eighth Note | Hole currency index 14, token `>`, font-675 frame (114,431,28,28) |
| 4 | Atoms | `AtomCollider.getParticleImageData()` → `Particle` |
| 5 | Turquoise Rupie | No verified match: `HoleCurrencyRepo` names Rupie records only by index 0–9, without a color mapping |

The game currency atlas visually confirms the two Hole-currency frames. No CDN fetch was made. Do not assign Turquoise Rupie to an indexed Rupie without a verified source mapping.

Native Bell UI names four modes and draws mode XP, bonus levels, and text effects; its bonus loop reads seven records from `HolesInfo[59]` (`idleon1.23.txt:262024–262057,262070–262103`). Website static bonus identities are indices 0–6 in `data/domain/data/BellBonusRepo.ts:7–15`. Neither the seven-record repository nor the cited game drawing caller supplies seven distinct bonus-art mappings. No distinct PNG, atlas frame, or item ID was verified for any of the seven bonuses. The effect text is the evidenced presentation; do not assign bonus-specific artwork based on effect meaning.

Currency marks are not Bell-bonus art. Existing website currency equivalences remain the appropriate source: `CoinsDisplay`/`Coins1` for Coins, `BitsDisplay`/`Bits` for Bits, and the owner/domain currency image API for other actual currencies. The accepted UI handoff confirms these current/required currency renderers and the account-wide Money meaning (`docs/plans/hole-part-4-ui-plan.md:15–16`; `docs/plans/hole-research-brief.md:21–22`). Do not infer that all Bell improvement methods share one currency or that each bonus has a currency icon.

### Lamp: stock, twelve wishes, and effects

Native Lamp renderer loads selected names and descriptions from `CustomLists.h.LampWishes` and displays stock, cost, and daily gain (`idleon1.23.txt:261779–261829,261850–261858`). Its stock display appends `{` in font 222 (`261850–261855`); exact atlas frame is `font-222.fnt` x=141, y=1, 91×18. The decoded atlas visually confirms this is the small gold-colored wish-stock mark shown beside “WISHES LEFT.” No matching website item/CDN metadata exists.
Client file `apk/assets/assets/data/HoleLampWish.png` is 99×48 and visually reads “Wish.” It identifies general Lamp wish-panel lettering, not an individual wish. No caller-to-file attachment was established here. Twelve generated wishes have no per-wish image metadata (`LampWishRepo.ts:7–94`; `Wish` model `data/domain/world-5/hole/hole.tsx:104–112`). Keep the existing Lamp cavern illustration for the UI; do not invent per-wish images.
The catalog's twelve identities and effect-resource words are:

| Wish ID | Name | Catalog effect/resource evidence | Art conclusion |
|---:|---|---|---|
| 0 | More Wishes | Adds wish capacity | Wish stock mark is separately mapped to font-222 `{` |
| 1 | Another Try | Source offers reset branches for Conjuror points, Opals, Jar collectible enchantment levels, Summoning Doublers; other branch choices reset Justice, Wisdom, or Bravery Monument | Consequence resources have no per-wish art mapping |
| 2 | 1000000 Opals | Opal | `Opal.png` is verified client art; its use as this wish's icon is unverified |
| 3 | Bring Them Back | Description offers 12 hours of respect | No distinct art linked |
| 4 | World 4 Stuff | Cooking Speed; Shiny Pet LV Up; Breedability Rate; Lab EXP | No distinct wish/effect-art mappings found |
| 5 | A Moderate Discount | Next Engineer Schematic creation discount | No distinct wish art; show existing schematic art only where the schematic itself is displayed |
| 6 | World 5 Things | Sailing Loot Value; Bits gain; Divinity Pts gain | Bits uses existing `BitsDisplay`/`Bits`; no per-wish art. No extra Divinity-point mapping established |
| 7 | Infinite Resources | Well and Harp resource gain | The ten Sediment and ten Harp-note currency glyphs above are available; no unique wish art |
| 8 | World 6 Majigers | Next Crop chance; Stealth for Ninja twins; All Essence gain | No distinct wish/effect-art mappings found |
| 9 | Knowledge of Future | Future-content wish | No distinct art mapping found |
| 10 | World 7 Stuff | Future-content wish | No distinct art mapping found |
| 11 | World 8 Stuff | Future-content wish | No distinct art mapping found |

Wish names/effect wording are generated records (`data/domain/data/LampWishRepo.ts:7–94`). The four `Another Try` reset targets and three Monument choices above are source-confirmed alternatives from the selected Lamp renderer (`idleon1.23.txt:261793–261811`); do not infer one branch's artwork as the wish's icon. Other effect-resource phrases describe outcomes, not asset links. In particular, effect resource names alone do not establish a corresponding icon in this wish panel.

The native wish-stock mark is the font-222 `{` glyph mapped above. It is not a standalone item in the website's HoleCurrency catalog (`HoleCurrencyRepo.ts:146–175`), and no CDN equivalent was confirmed. Wish-effect names do not establish separate wish artwork. `Another Try` consequences are text outcomes, not per-wish asset identities.

## Evidence and visual limits

- Runtime context: canonical offline `http://127.0.0.1:3101` returned `source:"offline"` and readiness fields `cdpConnected`, `injected`, `gameReady` all true. `GET /game-version` returned `Luminous_Menagerie` 1.23. Read-only `/exec` expression `idleon.engine.getGameAttribute("Number2Letter").slice(13,20)` returned `["m","n","o","p","q","r","s"]`. Selected character was index 3, `Sludgev4`; only this global alphabet mapping was queried. No live server or save mutation was used.
- Primary client sources: `/home/sludge/Development/IdleonWikiBot/codefiles/idleon1.23.txt`, `apk/assets/assets/graphics/1x/font-675.png`/`.fnt`, `font-650.png`/`.fnt`, and `font-222.png`/`.fnt`; standalone images are under `apk/assets/assets/data/`.
- Visual confirmation decoded font-675, font-650, and font-222 atlas images. Font 675 visibly contains ten currency marks, ten note glyphs, and the seven colored string-letter glyphs at the listed frames. Font 222 shows the wish-stock mark; font 650 shows Hole UI artwork. `HoleWellBucket0.png`, `HoleWellBucket1.png`, `Opal.png`, `OpalGive.png`, and `HoleLampWish.png` were opened and visually checked. Frame rectangles come from matching BMFont manifests; string frames were cropped and inspected.
- The prior part 2 research confirms dedicated Fountain PNG crops and records their CDN naming/dimensions (`docs/plans/hole-part-2-ui-plan.md:38–71`). At initial research time, editable Hole currency metadata mapped only indices 31–38; current mappings are listed below.
- Initial research made no CDN fetch and did not establish CDN equivalence for atlas glyphs. That limitation is historical; see current publication evidence below.
- The unresolved exact image decisions recorded during initial research were: Well's separate font-650 sediment display glyphs; source/UI attachment and website metadata for the verified bucket, gold-bucket, Opal, and generic `HoleLampWish.png` assets; any per-wish art; and Turquoise Rupie's exact Rupie-index mapping. No distinct Bell bonus art was evidenced. Do not publish inferred names or URLs as verified mappings. The bucket and Lamp stock metadata/CDN evidence is now updated below; other unresolved mappings remain.

## Current integration — 2026-10-18

The initial metadata/CDN conclusions above are historical. Production metadata and 28 published crops now use the existing CDN naming pattern `https://cdn2.idleonefficiency.com/images/<filename>.png`. Every listed crop was published under `s3://idleon-efficiency-images/images/`; the minimal browser result recorded nonzero natural dimensions for all selected-page images.

- Editable currency metadata in `data/domain/world-5/hole/hole.tsx` maps HoleCurrency IDs 0–9 to `HoleSediment0.png`–`HoleSediment9.png` (28×28 each), and IDs 10–19 to `HoleHarpNote0.png`–`HoleHarpNote9.png` (28×28 each).
- Editable Harp string metadata in the same file maps string IDs 0–6 to `HoleHarpString0.png`–`HoleHarpString6.png` (25×28 each).
- Editable Lamp stock metadata maps its native stock glyph to `HoleLampWishStock.png` (91×18).
- Thus 28 published crops are: `HoleSediment0.png` through `HoleSediment9.png`, `HoleHarpNote0.png` through `HoleHarpNote9.png`, `HoleHarpString0.png` through `HoleHarpString6.png`, and `HoleLampWishStock.png`. Their CDN paths are the above base URL plus each exact filename.
- `HoleWellBucket0.png` and `HoleWellBucket1.png` remain existing 62×128 CDN originals, not part of the 28 new crops. Other mappings and unresolved decisions in this report remain unchanged.

Browser evidence: [image integration result](../../.ui-verification/runs/2026-10-18T04-16-54-930Z-76167/hole-part4-artwork-result.json) records 10 sediment, 2 bucket, 15 Bell, 17 Harp, and 1 Lamp images with nonzero natural dimensions. Screenshots and per-view detail are recorded in the [current handoff](../plans/hole-research-brief.md#part-4-actual-game-artwork-integration--2026-10-18). This evidence supersedes the historical statements above that no CDN availability or crop metadata was checked.
