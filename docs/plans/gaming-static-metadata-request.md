# Gaming static metadata coverage

The required Gaming metadata and its Farming sticker dependency are available in the current export. No static metadata request remains open.

- **[GamingSpeciesRepo](../../data/domain/data/GamingSpeciesRepo.ts):** 10 species, IDs 1–10, names and optional specialized effect text. The Sprout has no effect text. Use `speciesId`, not the repository position.
- **[GamingImportRepo](../../data/domain/data/GamingImportRepo.ts):** nine imports, IDs 0–8, names, effect text, upgrade-bonus text, flavor text and `boxId`. Join purchase costs from `GamingBoxRepo` by `boxId`; its Empty Box is not an import.
- **[GamingMetadataRepo](../../data/domain/data/GamingMetadataRepo.ts):** plant-stage Palette Luck multipliers, Bog Log rank data and King Token shop labels. Shop prices and effects remain game calculations.

Existing fertilizer, Superbits and Palette records continue to supply their metadata. Sprite discovery is handled in this repository.

## Farming sticker metadata

The supplied [FarmingStickerRepo](../../data/domain/data/FarmingStickerRepo.ts) contains all seven real stickers, IDs 0–6, with `index`, `name`, `description` and numeric `bonusPerSticker`. Nonexistent filler entries are excluded.

Gaming consumes ID **3**, **UWU Kawaii Rice Sticker**, whose `bonusPerSticker` is **250**. Farming owns the saved sticker counts and prepares the bonus using Research, Event Shop and Superbit inputs; Gaming consumes the prepared result for the garden's Bits multiplier. No sticker table or calculation belongs in Gaming.

The export maps the native names, descriptions and coefficients from `CustomLists.Research[23–25]`. The separate [FarmingMetadataRepo](../../data/domain/data/FarmingMetadataRepo.ts) supplies Crop Scientist descriptions and unlock IDs; it is not a substitute for the sticker records.