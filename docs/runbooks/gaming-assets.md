# Gaming assets: provenance and extraction

Use this reference to identify Gaming artwork and reproduce the seven dedicated currency, Logbook and Fertilizer icons. Asset identities, dimensions and rectangles below were verified during the 2026-10-11 asset work. They describe that source version, not a fresh check of later game releases.

## Source locations and interpretation

- Renderer: `../IdleonWikiBot/codefiles/idleon1.22.txt`. All `:line` references below refer to that original file.
- Standalone images: `apk/assets/assets/data/`. The listed standalone Gaming files also existed in `data/icons/assets/data/`.
- Bitmap fonts: `apk/assets/assets/graphics/1x/font-<id>.fnt`. Resolve each PNG page through the font's `<page>` element.
- Identity catalogs: read-only `data/domain/data/GamingImportRepo.ts`, `GamingSpeciesRepo.ts` and `GamingSuperbitsRepo.ts`. These contain game IDs, not sprite IDs.
- `apk/assets/assets/data/game.mbs` confirms `Number2Letter[0..10] = ["_", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]`. The attribute starts at byte 4775, followed by count 53 and list references `(type=3,index=18..70)`. The associated length-prefixed literals at bytes 5220–5484 are `_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.

The loading chain uses `getExternalImage(...).clone()` or `_customBlock_addImgInst(...)`, then `attachImageToActor(...)`. Attaching an image to a UI actor does not make it an actor animation or sprite sheet. Plants and Imports use separate PNGs, not actor IDs, animation names or frame grids.

## Imports

All import PNGs are 84×75. Import IDs are game `importId`/`boxId` values 0–8, not combined plant/import array positions. Source `:230331–230365` builds filenames with the same `s` that tests import ownership. Catalog names appear at `:307015`; box/display identity appears at `:225857–225889`.

| Import ID | Name | Representative artwork | Other verified states |
| --- | --- | --- | --- |
| 0 | Little Sprinkler | `GamingItem0.png` | `GamingItem0b.png` when `GemItemsPurchased[131] > 0.5` (`:230350–230352`) |
| 1 | Dirty Shovel | `GamingItem1.png` | No alternate selected by this loader |
| 2 | Autumn Squirrel | `GamingItem2.png` | No alternate selected by this loader |
| 3 | Elegant Seashell | `GamingItem3_0.png` | `GamingItem3_0.png` through `GamingItem3_15.png`, selected by shell rank; no plain `GamingItem3.png` |
| 4 | Kitsune Roxie | `GamingItem4.png` | `GamingItem4.png` when `GamingSprout[29][1] == 1`; otherwise `GamingItem4b.png` (`:230346–230349`, also `:230755–230756`) |
| 5 | Bog Log | `GamingItem5.png` | Distinct from the Logbook button |
| 6 | POiNG Controller | `GamingItem6.png` | No alternate selected by this loader |
| 7 | Immortal Snail | `GamingItem7.png` | Mail uses a separate bitmap-font glyph |
| 8 | King Rat of Olde | `GamingItem8.png` | Crowns and King Tokens use separate assets |

For import 3, stored zero-based shell rank `r = GamingSprout[28][2]` selects suffix `min(15, min(9, r) + floor(max(0, (r - 9) / 5)))` (`:230338–230344`). All 16 files were verified at 84×75. A representative import image does not imply that every saved state uses that variant.

## Plant species and evolution stages

Source `:230296–230304` builds each filename from `GamingPlant`, `Number2Letter[GamingSprout[slot][1]]`, `min(GamingSprout[slot][3], SproutMaxEvo)` and `.png`.

The Logbook uses the same artwork at `:231165–231179`, with `Number2Letter[speciesIndex + 1]` and each recorded zero-based evolution stage. All 100 files, ten species × stages 0–9, were verified at 90×90 in both the APK and local icon directory. Stage 0 is an exact representative asset, not an invented sprite frame or the plant's current evolution stage.

| Species ID | Name | Stage-0 file | Verified stage family |
| --- | --- | --- | --- |
| 1 | Sprout | `GamingPlanta0.png` | `GamingPlanta0.png` … `GamingPlanta9.png` |
| 2 | Fungi | `GamingPlantb0.png` | `GamingPlantb0.png` … `GamingPlantb9.png` |
| 3 | Bonsai | `GamingPlantc0.png` | `GamingPlantc0.png` … `GamingPlantc9.png` |
| 4 | Cactus | `GamingPlantd0.png` | `GamingPlantd0.png` … `GamingPlantd9.png` |
| 5 | Blossom | `GamingPlante0.png` | `GamingPlante0.png` … `GamingPlante9.png` |
| 6 | Voraci | `GamingPlantf0.png` | `GamingPlantf0.png` … `GamingPlantf9.png` |
| 7 | Berri Bush | `GamingPlantg0.png` | `GamingPlantg0.png` … `GamingPlantg9.png` |
| 8 | Evergreen | `GamingPlanth0.png` | `GamingPlanth0.png` … `GamingPlanth9.png` |
| 9 | Chemical | `GamingPlanti0.png` | `GamingPlanti0.png` … `GamingPlanti9.png` |
| 10 | Royale | `GamingPlantj0.png` | `GamingPlantj0.png` … `GamingPlantj9.png` |

`GamingPlant0.png` through `GamingPlant4.png` also exist at 90×90. They are not the species-ID filenames chosen by this renderer. Species 1 uses `GamingPlanta0`, not `GamingPlant1`.

Palette colouring uses a runtime white-to-RGB image colour swap (`:230305–230315`). Crowns recolour discovered Logbook plants to RGB `(210,127,245)` (`:231170–231177`). This code does not imply a separate complete set of crowned plant PNGs.

## Logbook and Fertilizer crops

These icons are embedded raster artwork, not missing font or sprite metadata. Rectangles are `(x,y,width,height)` in the source PNG, not screen coordinates or declared animation frames.

| Icon | Source PNG | Native source size / crop | Source evidence |
| --- | --- | --- | --- |
| Logbook | `GamingBG.png` | 918×470; `(867,12,40,40)` | BG loaded `:233347`, attached at `(18,4)` at `:230198`. The raster contains the labelled LOG BOOK tile. Click toggles Logbook at `:224969–224978`; title and discovered-species display at `:225365–225402`. |
| Fertilizer 0 — Sprout Value | `GamingFert.png` | 597×235; `(48,43,108,69)` | Panel loaded `:230210–230212`; card `s=0` controls base value at `:225703–225705`; catalog `:306961`. |
| Fertilizer 1 — Sprout Speed | `GamingFert.png` | 597×235; `(244,35,100,78)` | Card `s=1` controls growth time at `:225706–225713`; catalog `:306962`. |
| Fertilizer 2 — Sprout Capacity | `GamingFert.png` | 597×235; `(437,38,113,76)` | Card `s=2` controls capacity at `:225714`; catalog `:306963`. |

Fertilizer bounds were measured as pixels differing from the panel's row-wise background in the three upper-card regions. Each crop includes the icon's dark shadow and retains the opaque grey panel background. The Logbook crop includes its labelled tile and border. None of these crops is a separate transparent source icon.

## Currencies, crowns and Bits

Font PNG dimensions differ from nominal `.fnt` `scaleW/scaleH` values. Font 585 is physically 500×1735, nominally 512×2048. Font 336 is physically 512×356, nominally 512×512. The rectangles below were checked against actual PNG bounds.

| Asset | Font/source | Glyph / decimal code point | Rectangle `(x,y,w,h)` | Native size | Semantic source |
| --- | --- | --- | --- | --- | --- |
| Acorns | 585 | `]` / 93 | `(225,28,15,17)` | 15×17 | Acorn shop costs `:225444–225449`; `Gaming[9]` counter `:225626–225633` |
| Snail mail | 585 | `7` / 55 | `(232,47,22,16)` | 22×16 | `Gaming[13]` counter `:225649–225656`; import 7 mail description `:307020` / generated import record |
| King Tokens | 585 | `앰` / 50544 | `(303,173,17,16)` | 17×16 | Rat shop costs `:225584–225589`; `Gaming[14]` counter `:225657–225664` |
| Crown | `GamingRatCrown.png` | — | Entire PNG | 26×22 | Logbook crown overlay uses `Research[11]` membership at `:231180–231185` |
| Crown-found banner | `GamingCrownGet.png` | — | Entire PNG | 240×45 | Crown-get notification loads it at `:231057` |

Font-585 snail panel glyph `6` / 54, rectangle `(0,1239,294,177)`, contains additional mail artwork. The small mail icon is glyph `7`, not panel/header glyph `었`. Rat King panel glyph `얄` is a 443×215 panel, not a token or crown icon. Font-585 `;` and `업` are acorn-shop panel pieces (`:225422–225432`), not currency icons.

Six Bits tier PNGs exist as `data/icons/assets/data/GamingBits<Colour>.png`, each 26×24. The renderer uses font 336 and `NotateNumber(...,"Bits")` (`:225352–225354`). The formatter selects `CoinStrings[5..10]` (`:102550–102559`); the string is defined at `:297413–297415`.

| Tier | Basename | Glyph | Decimal code point | Font-336 rectangle |
| --- | --- | --- | --- | --- |
| 0 | `GamingBitsWhite` | `₣` | 8355 | `(250,36,26,24)` |
| 1 | `GamingBitsGreen` | `¥` | 165 | `(277,36,26,24)` |
| 2 | `GamingBitsRed` | `£` | 163 | `(302,36,26,24)` |
| 3 | `GamingBitsPurple` | `€` | 8364 | `(286,67,26,24)` |
| 4 | `GamingBitsBlue` | `₹` | 8377 | `(315,67,26,24)` |
| 5 | `GamingBitsGold` | `迷` | 36855 | `(330,94,26,24)` |

## Superbits and Palette marker

Website Superbits use no per-upgrade images or borders. The game card renderer (`:226024–226099`) uses upgrade IDs for ownership, costs and text, not unique per-upgrade images. Shared card artwork does not require reproduction.

`GamingHexS.png` is a 23×23 Palette selection marker, loaded in tab 4 at `:230219–230270`. It is not Superbit artwork.

## Reproduce the seven dedicated icons

Follow [Extract Game Icons](extract-game-icons.md) for extractor usage and [Sync Game Assets](sync-game-assets.md) for APK preparation and AWS SSO login. Run commands from the repository root with an extracted APK and project dependencies installed through `yarn`.

| Output basename | Native size |
| --- | --- |
| `GamingAcorn` | 15×17 |
| `GamingMail` | 22×16 |
| `GamingKingToken` | 17×16 |
| `GamingLogbook` | 40×40 |
| `GamingFertilizer0` | 108×69 |
| `GamingFertilizer1` | 100×78 |
| `GamingFertilizer2` | 113×76 |

`ImageData.location` uses an extensionless basename and native size. `IconImage` supplies the CDN path and `.png`. Standalone Imports, plants and crowns require no font or atlas extraction. Local files alone do not prove CDN publication. `IconImage` has no atlas-crop API, so original panels cannot replace dedicated crops.

Extract the three currency glyphs:

```sh
node data/extract-icon.js font 585 93 GamingAcorn.png
node data/extract-icon.js font 585 55 GamingMail.png
node data/extract-icon.js font 585 50544 GamingKingToken.png
```

The crop command accepts plain filenames only under `graphics/1x`. Use temporary byte-identical source copies there. Ensure both temporary names below are unused before running these commands. Remove only those copies afterward:

```sh
cp apk/assets/assets/data/GamingBG.png apk/assets/assets/graphics/1x/GamingCropSource-GamingBG.png
cp apk/assets/assets/data/GamingFert.png apk/assets/assets/graphics/1x/GamingCropSource-GamingFert.png
node data/extract-icon.js crop GamingCropSource-GamingBG.png 867 12 40 40 GamingLogbook.png
node data/extract-icon.js crop GamingCropSource-GamingFert.png 48 43 108 69 GamingFertilizer0.png
node data/extract-icon.js crop GamingCropSource-GamingFert.png 244 35 100 78 GamingFertilizer1.png
node data/extract-icon.js crop GamingCropSource-GamingFert.png 437 38 113 76 GamingFertilizer2.png
rm apk/assets/assets/graphics/1x/GamingCropSource-GamingBG.png apk/assets/assets/graphics/1x/GamingCropSource-GamingFert.png
```

Publish only these seven files through the `idleon` AWS SSO profile and the normal image prefix:

```sh
aws --profile idleon s3 sync data/icons/assets/data/ s3://idleon-efficiency-images/images/ \
  --exclude '*' \
  --include GamingAcorn.png --include GamingMail.png --include GamingKingToken.png \
  --include GamingLogbook.png \
  --include GamingFertilizer0.png --include GamingFertilizer1.png --include GamingFertilizer2.png \
  --acl bucket-owner-full-control --cache-control max-age=2592000,public \
  --expires 2044-01-01T00:00:00Z --content-type image/png
```

## Historical publication evidence and limits

The following checks were recorded on 2026-10-11. They are historical evidence, not new verification during documentation cleanup:

- All seven dedicated PNGs decoded at the native sizes above. Their RGBA pixels matched the original APK font-page or raster rectangles. All seven crops were visually inspected.
- The exact seven-file-only sync command above succeeded. It reported one upload per prepared PNG and no other files. It preserved the listed ACL, cache control, expiry and content type. No other profile, bucket setting or CDN setting changed.
- Normal URLs of the form `https://cdn2.idleonefficiency.com/images/<basename>.png` returned HTTP 200 `image/png` for all seven outputs. Each response decoded at its listed size and matched both local output and source pixels. These requests used no query parameters or alternate URLs.
- The same CDN checks covered all 100 plant-stage files, 26 import variants, `GamingRatCrown` and six Bits tiers. All 133 responses decoded at expected sizes and matched local PNG pixels.
- Original CDN panels decoded as `GamingBG` at 918×470, `GamingFert` at 597×235 and `GamingCrownGet` at 240×45. `font-585.png` returned HTTP 403 XML rather than an accessible PNG atlas.

These checks prove historical publication and normal-URL image delivery. They do not prove website rendering or continued availability after that date.
