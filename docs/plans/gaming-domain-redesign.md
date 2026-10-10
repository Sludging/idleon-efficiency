# Gaming backend

The approved backend is implemented. The existing Gaming page retains its layout and reads the new domain objects; a UI redesign remains separate.

`Gaming` owns the account's Gaming level, Bits, plants, upgrades, imports, Superbits and Palette. Each game object owns its saved progress and calculated results, so the page and other domains read named fields instead of interpreting Gaming save arrays. Names and descriptions come from the supplied WikiBot repositories; page layout and number formatting stay with the UI.

## Existing patterns to follow

Follow [Meal](../../data/domain/world-4/cooking.tsx) and [MainframeBonus](../../data/domain/world-4/lab.tsx) when copying static fields into an object, and [FriendBonus](../../data/domain/friends.tsx) for `fromBase` initialization and account state. Imports follow the more specific **shared base class plus selective specialization** convention:

- [`Artifact.fromBase`](../../data/domain/world-5/sailing/artifacts.tsx#L24-L67) dispatches repository identities to ordinary `Artifact` instances or subclasses. `GenieLampArtifact` adds `sailingLevel` and overrides `getBonus` (lines 204–213); `SlabInfluencedArtifact` shares one specialization across four identities (lines 216–233). `updateArtifacts` prepares those entity-specific inputs (lines 403–422).
- [`Jewel.fromBase`](../../data/domain/world-4/lab.tsx#L160-L212) likewise selects subclasses only where behavior differs. `SapphireRhinestoneJewel` adds `numberOfActiveBlue` and overrides `getBonus` (lines 215–225); `FixedHundredRangeJewel` serves three identities with one range override (lines 203–205, 227–231). The updater attaches prepared inputs directly to specialized instances (lines 634–639).

Thus different labels or constants remain repository data, while genuinely different state and rules belong directly on an appropriate subclass—not on an optional mechanic bag, and not automatically in a new class for every identity. Garden slots and stage relationships remain named records, following [Sushi](../../data/domain/world-7/sushi.tsx). Stateful shops use upgrade entities with their own parse and update methods.

The TypeScript below illustrates the design's key fields and interfaces, not generated models or a complete runnable listing. The production interfaces live in [Gaming](../../data/domain/world-5/gaming.tsx), [garden](../../data/domain/world-5/gaming/garden.ts), [imports](../../data/domain/world-5/gaming/imports.ts) and [Palette/Superbits](../../data/domain/world-5/gaming/palette.ts).

## Account and garden

Gaming level is uniform across characters: parse it once into the scalar `Gaming.level`. There is no per-character Gaming-level collection or maximum-selection step. Bits remain the saved balance; calculating a rate never adds future income to it.

```typescript
declare class Gaming extends Domain {
  level: number;
  bits: number;
  metadata: GamingMetadataModel;
  plants: Plant[];
  fertilizer: FertilizerUpgrade[];
  imports: Import[];
  superbits: Superbit[];
  superbitBoards: SuperbitBoard[];
  paletteColors: PaletteColor[];
  garden: Garden;
  mutations: MutationProgress;
  logbook: Logbook;
  palette: PaletteProgress;
}
```

Plants represent species, while garden slots represent the plants currently growing. A species owns its identity, effect description and unlock state. A slot references that species and holds its current stage and growth progress. Historical stages belong to the Logbook rather than being duplicated on the species or slot.

```typescript
declare class Plant {
  constructor(data: GamingSpeciesModel);
  static fromBase(records: GamingSpeciesBase[]): Plant[];
  speciesId: number;
  name: string;
  description: string | undefined;
  unlocked: boolean;
  getBonusText(): string | undefined;
  getImageData(): ImageData;
}
interface GardenSlot {
  index: number;
  plant: Plant | null;
  stage: number | null;
  active: boolean;
  position: { x: number; y: number };
  paletteColor: PaletteColor | null;
  canEvolve: boolean;
  nextEvolutionProbability: number;
}
declare class Garden {
  slots: GardenSlot[];
  capacity: number;
  maximumStage: number;
  growthCycleSeconds: number;
  harvestBits: number;
  nonPlantBitsMultiplier: number;
  initialAppearanceProbability: number;
  evolutionUpgradeLevel: number;
  evolutionUpgradeCostBits: number;
  evolutionChances: { plant: Plant; fromStage: number; toStage: number; probability: number }[];
  parse(data: Map<string, any>): void;
  prepare(data: Map<string, any>): void;
  update(data: Map<string, any>): void;
}
```

An empty slot has no plant or stage; an existing plant's visible stage starts at 1. Parsing converts the game's stored stage and color encodings into these named values. Slot positions retain game-garden coordinates where plant effects need them, not website layout coordinates. Initial appearance and evolution are separate events.

Slots contain no saved per-plant elapsed-growth timer. `garden.harvestBits` is the standard stage-one Sprout payout including the current account and Kitsune multipliers, not an aggregate prediction of every species' randomized harvest. Fertilizer's speed effect reports average initial-growth time; `garden.growthCycleSeconds` reports the underlying cycle.

Growth time is in **seconds**, as confirmed by the native Gaming speed display's conversion into minutes, hours and seconds. Fields ending in `Probability` use 0–1, fields ending in `Percent` use percentage points, and multipliers use 1 as their neutral value. This needs ordinary field names and comments, not new numeric types.

## Fertilizer, mutations and Logbook

The three existing fertilizer records supply their names and descriptions. One `FertilizerUpgrade` class adds level, current Bits cost and its prepared effect. Garden calculations consume the saved upgrade levels; the updater also prepares fertilizer effects for display. The separate evolution upgrade remains garden progress rather than becoming a fourth fertilizer record.

```typescript
interface FertilizerEffect {
  harvestBits?: number;
  growthCycleSeconds?: number;
  additionalSlots?: number;
}
class FertilizerUpgrade {
  name: string;
  description: string;
  level = 0;
  costBits = 0;
  effect: FertilizerEffect = {};

  constructor(public index: number, data: GamingUpgradeModel) {
    this.name = data.name;
    this.description = data.desc;
  }
  static fromBase(records: GamingUpgradeBase[]): FertilizerUpgrade[] {
    return records.map(record => new FertilizerUpgrade(record.index, record.data));
  }
}
```

Mutation progress owns DNA, discoveries, spent-DNA pity and the next attempt's chance. Ordinary discoveries unlock their species; the Royale plant's unlock follows the actual King Rat purchase. The Logbook stores one highest recorded stage per species and prepares the total and Bits bonus once. Its historical maximum is independent of what currently occupies the garden.

```typescript
declare class MutationProgress {
  dna: number; discoveredCount: number; maximumDiscoveries: number;
  pityDna: number; canAttempt: boolean; attemptProbability: number;
  nextPlant: Plant | null;
  parse(data: Map<string, any>): void;
  update(data: Map<string, any>): void;
}
declare class Logbook {
  entries: { plant: Plant; highestStage: number | null; maximumStage: number }[];
  totalRecordedStages: number;
  bitsMultiplier: number;
  constructor(plants: Plant[]);
  parse(data: Map<string, any>): void;
  update(data: Map<string, any>): void;
}
```

## Imports and their shops

`Import` owns common identity, purchase state, level, costs and description/image behavior. `Import.fromBase` selects specializations for distinct mechanics, just as `Artifact.fromBase` and `Jewel.fromBase` do. Specialized instances own their counters, resources, prepared inputs and method overrides directly. No optional `sprinkler`/`shovel`/etc. records sit on the base class. A mechanic without a real upgrade has no upgrade cost.

`Import.fromBase` uses `GamingImportBase` records for purchased-item identity and text, then joins `GamingBoxBase` records by `boxId` for cost parameters. It copies `importId`, `name`, `effectText`, `upgradeBonusText` and `flavorText` from `GamingImportModel`; unopened-box text remains box metadata. The nine imports have IDs 0–8; Empty Box 9 has no import. POiNG's supplied “No bonus. It's all skill.” text is retained as text, not treated as proof of an upgrade mechanic.

```typescript
class Import {
  importId: number; boxId: number;
  name: string; description: string; upgradeBonusText: string; flavorText: string;
  costBase: number; costExponent: number;
  purchased = false; level = 0; accessible = false;
  purchaseCostBits = 0; upgradeCostBits: number | null = null;

  constructor(data: GamingImportModel, box: GamingBoxModel) {
    this.importId = data.importId;
    this.boxId = data.boxId;
    this.name = data.name;
    this.description = data.effectText;
    this.upgradeBonusText = data.upgradeBonusText;
    this.flavorText = data.flavorText;
    this.costBase = box.costA;
    this.costExponent = box.costB;
  }
  static fromBase(records: GamingImportBase[], boxes: GamingBoxBase[]): Import[] {
    const boxesById = new Map(boxes.map(box => [box.data.boxId, box.data]));
    return records.map(({ data }) => {
      const box = boxesById.get(data.boxId)!; // Supplied IDs 0–8 all have matching boxes.
      switch (data.importId) {
        case 0: return new SprinklerImport(data, box);
        case 1: return new ShovelImport(data, box);
        case 2: return new SquirrelImport(data, box);
        case 3: return new ShellImport(data, box);
        case 4: return new KitsuneImport(data, box);
        case 5: return new BogLogImport(data, box);
        case 6: return new HighScoreImport(data, box); // POiNG shares high-score state.
        case 7: return new SnailImport(data, box);
        case 8: return new KingRatImport(data, box);
        default: return new Import(data, box);
      }
    });
  }
  declare parse: (data: Map<string, any>) => void;
  declare update: (data: Map<string, any>) => void;
  getDescription = (): string => this.description;
  getBonusText = (): string => this.upgradeBonusText;
  getUpgradeCost = (): number | null => this.upgradeCostBits;
  declare getImageData: () => ImageData;
}

class SprinklerImport extends Import {
  accumulatedSeconds = 0; waterCharges = 0; nextChargeSeconds = 0;
  rechargeBonusPercent = 0; preservationProbability = 0;
  override getBonusText = (): string =>
    this.upgradeBonusText.replace("{", this.rechargeBonusPercent.toString());
}
```

These specialized instances expose the resources and results each mechanic actually uses. Shell's earned Bits multiplier is distinct from the next rank's advertised reward. Snail's failure-reset probability is conditional on failure; its reset result identifies protection consumption, a checkpoint or zero. Shovel's nugget range describes the game's draw bounds, not a guaranteed improvement. King Rat stores unique crown IDs even though that progress is saved under Research.

```typescript
declare class ShovelImport extends Import {
  accumulatedSeconds: number; digs: number; nextDigSeconds: number;
  bestNugget: number; bigNuggetLuck: number; nuggetRange: { minimum: number; maximum: number };
}
declare class SquirrelImport extends Import {
  acorns: number; acornsPerHour: number; shop: ShopUpgrade[];
}
declare class ShellImport extends Import {
  rank: number; completedRankUps: number; evolutionProgress: number;
  nextRankThreshold: number; remainingEvolutions: number; rankProgressFraction: number;
  earnedBitsMultiplier: number; nextRankBitsBonusPercent: number;
}
declare class KitsuneImport extends Import {
  active: boolean; canToggle: boolean; growthMultiplier: number; rewardMultiplier: number;
}
declare class HighScoreImport extends Import {
  highScore: number; bitsMultiplier: number;
}
declare class BogLogImport extends HighScoreImport {
  freeGameProbability: number;
}
declare class SnailImport extends Import {
  currentLevel: number; highestLevel: number; levelCap: number;
  mail: number; protectionLayers: number; mailDoubleProbability: number;
  levelUpMailCost: number; protectionMailCost: number;
  protectionAction: "encourage" | "consecrate";
  successProbability: number; resetOnFailureProbability: number;
  resetOutcome: "consume-protection" | "checkpoint" | "zero";
  resetDestinationLevel: number; bitsMultiplier: number;
}
declare class KingRatImport extends Import {
  crownIds: number[]; crownCount: number; remainingCrowns: number;
  tokens: number; tokensPerHour: number; bitsMultiplier: number;
  crownChances: { stage: number; probability: number }[];
  shop: ShopUpgrade[];
}
declare class ShopUpgrade {
  index: number; level: number; unlocked: boolean;
  currency: "acorns" | "tokens"; cost: number; affordable: boolean;
  effect: "bits-multiplier" | "growth" | "palette-luck" | "token-rate" | "crown-chance";
  bonusPercent: number | null; multiplier: number | null;
  parse(data: Map<string, any>): void;
  update(data: Map<string, any>): void;
}
```

`HighScoreImport` shares high-score and earned-multiplier state between Bog Log and POiNG; only Bog Log extends it with free-game probability. The other specializations reflect distinct mechanics, not merely nine different names. Each import owns its `parse(data)` and `update(data)` methods, and subclasses override these methods for their mechanic. Shared update behavior prepares ownership, bonus and costs; specialized behavior prepares the remaining results. The Sprinkler example overrides the existing-style `getBonusText` method using the authentic `+{%` placeholder; it illustrates customization, not a new recharge formula.

Both shops use upgrade entities with the same public fields. `AcornShopUpgrade` and `KingTokenShopUpgrade` own their saved levels and calculations. Their own currency, level, unlock and effect remain separate from the import's level. King Token labels come from `metadata.ratShopUpgrades`, joined by `upgradeId`; this table supplies labels, not price or effect coefficients. Saved levels and verified game rules supply the shop's progress and calculations.

## Superbits and Palette

One `Superbit` class wraps the existing Superbit records, copying `superbitId`, name, description and cost parameters into `costBase`/`costExponent`. Boards group the 69 actual entries, IDs 0–68, in groups of 24, 24 and 21; filler records 69–71 are excluded without renumbering. Purchased ownership, board access, affordability and the qualifying-neighbor requirement are separate states; board membership is game logic, not page geometry. **Superbits need no images or borders:** neither the domain interface nor planned asset usage includes Superbit artwork.

```typescript
declare class Superbit {
  superbitId: number; name: string; description: string;
  costBase: number; costExponent: number;
  static fromBase(records: GamingSuperbitBase[]): Superbit[];
  purchased: boolean; costBits: number; affordable: boolean;
  prerequisitesMet: boolean; canPurchase: boolean;
  getCost(): number;
  getBonusText(): string;
  parse(data: Map<string, any>): void;
  update(data: Map<string, any>): void;
}
declare class SuperbitBoard {
  index: number; accessible: boolean; superbits: Superbit[];
  requirements: { superbit: Superbit; isRoot: boolean; qualifyingNeighborSuperbitIds: number[] }[];
  constructor(index: number, superbits: Superbit[]);
  update(data: Map<string, any>): void;
}
```

One `PaletteColor` class wraps each existing color record, copying its name, RGB values, bonus text and numeric bonus/chance parameters. Its level determines earned bonus; equipped state determines participation in equipped-color mechanics, not whether every earned bonus exists. Palette progress owns activation, equipped colors, total levels, slot limit and Luck.

```typescript
declare class PaletteColor {
  index: number; name: string;
  red: number; green: number; blue: number;
  static fromBase(records: GamingPaletteBase[]): PaletteColor[];
  level: number; unlocked: boolean; equipped: boolean;
  bonus: number; unlockProbability: number; levelUpProbability: number;
  getBonus(): number;
  getBonusText(): string;
}
declare class PaletteProgress {
  active: boolean; equippedColorIds: number[]; slotLimit: number;
  totalLevels: number; totalLevelsBonus: number;
  bonusLuck: number; bonusMultiplier: number;
  parse(data: Map<string, any>): void;
  updateBonuses(data: Map<string, any>): void;
  update(data: Map<string, any>): void;
}
```

## Parsing and update order

- **Init:** initialize repository-backed objects using `fromBase`. Construct Garden, MutationProgress, Logbook, PaletteProgress and SuperbitBoard instances. Imports construct their shop upgrade entities.
- **Parse:** reset Gaming state, read the uniform level and Bits, then call each owner's `parse(data)` method: Imports → Superbits → Palette → Mutations → Plants → Fertilizer → Garden → Logbook. Palette also parses its colors. Keep the save's positional arrays and encoded strings local to parsing; do not construct per-character Gaming levels.
- **Main calculation:** prepare Farming sticker bonuses directly after Research Grid. Research supplies a calculated bonus; Event Shop ownership, Superbit ownership and sticker counts are parsed inputs. Prepare earned Palette bonuses after Legend Talents with `palette.updateBonuses(data)`.
- **Late calculation:** Imports → Plants → Mutations → Garden preparation → Logbook → Garden rates and harvest → Fertilizer display effects → Palette chances → Superbit Boards. `garden.prepare(data)` makes capacity, maximum stage and evolution readiness available to Logbook. Garden harvest then uses the prepared Logbook multiplier. Boards prepare access and prerequisites before updating their Superbits.
- Every lifecycle method uses `data: Map<string, any>`. Each receiver owns its state and behavior. Small internal pure calculations may accept the values they need. Repeated calculations replace previous results rather than stacking contributions.

Other domains already consume purchased Superbits and earned Palette bonuses during their own updates, while Tome reads saved Shell, Snail, nugget and Bits progress. Those values stay available at the existing dependency points. Only calculations whose results are used exclusively by the UI run in the dedicated post-postprocessing updater after their inputs settle.

Gaming-owned contributions to Construction, Collider and Equinox remain before those consumers. Later growth, mutation, import and Palette-chance calculations consume their settled inputs from the relevant domains, including Alchemy, Divinity, Farming, Sneaking, Votes, Arcade, Islands, Hole, Research and Sushi. Palette's earned bonuses must not wait for its later Luck calculation, and Sushi must not depend on that later result. Calculation bodies preserve the native game's arithmetic and rounding.

## Metadata, assets and backend integration

The supplied `GamingSpeciesRepo` and `GamingImportRepo` provide species and purchased-import names and descriptions; the [metadata coverage notes](gaming-static-metadata-request.md) summarize the available records. Plant initialization copies explicit `speciesId` values 1–10, not the wrapper's zero-based `index`; the parser maps saved identities once. Names are supplied for every species, while Sprout's optional `effectText` is absent. Existing fertilizer, box-cost, Superbit and Palette records remain the static sources, without website changes to generated directories.

The single `GamingMetadataRepo` record supplies `plantStagePaletteLuck`, `logMinigameRanks` and `ratShopUpgrades` on `Gaming.metadata`. Reuse those rows directly for stage Luck coefficients, Bog Log rank/death-card/progress-hour data and King Token labels; convert their stage meaning once where needed rather than duplicating literal tables.

The [Gaming asset notes](gaming-assets.md) cover the separately authorized read-only sprite and font investigation. Prepared images use the existing `ImageData` and CDN conventions; Palette colors retain their actual RGB swatches. Superbits have no artwork, image method or border assets. The Logbook has no image method without a prepared, verified asset. Asset extraction and upload remain separate; this backend change uploads no artwork.

The registered domain key remains `gaming`. Superbit contributions are prepared before Research, Construction and Collider consumers; earned Palette bonuses are prepared after Legend Talents and before their consumers. Farming owns repository-backed stickers and prepares their bonuses in the main calculation phase after Research Grid, including the Gaming Bits bonus consumed by Garden. Farming's late callback prepares only display data. Root Gaming methods orchestrate aspect-owned calculations instead of containing their formulas.

The shared `number2letterArray` and `letterToNumber` helpers decode the complete save alphabet needed by Superbits 0–68, including the non-Latin characters. No Gaming-specific alphabet or metadata duplicate is introduced.

Verification uses the offline 1.22 game runtime and the unchanged paired real save. Ordinary comparisons remain exact. Explicit, human-approved bounds apply only to demonstrated Chromium/Node `Math.pow` differences for Shell thresholds, Snail success, Squirrel Luck, Superbit 48 cost and Carbon atom cost; native formulas, extracted expectations and global matcher defaults are unchanged.

### Prior implementation verification

The following record predates the ownership and sticker-order review. It does not report verification of those later edits.

- `yarn tsc --noEmit --incremental false`: passed.
- Gaming, Farming and Collider regression suites: **208 tests passed across 9 suites**, including reparsing and repeated-update coverage.
- Full `updateIdleonData` account smoke: native growth time, the complete non-plant Bits multiplier, Palette Luck, Imports, Divinity and all seven Farming sticker bonuses matched; repeating the Gaming updates preserved results.
- Existing Gaming page exercised in the UI harness and visually inspected: water **430**, digs **4**, nugget range **511K–810M**; no Gaming processing or hydration errors. A separate external NitroPay `browsingTopics` exception was recorded, not suppressed in the application.

The approved numerical bounds are absolute `2e-14` for Squirrel Luck, `7e-11` for the Shell threshold, `6e-16` for Snail success and `6e-8` for Carbon atom 5 cost; Superbit 48 cost uses relative `2e-16`. All other comparisons remain exact.

Coverage uses one real saved state, not synthetic game mutations. Royale garden slots, unobserved upper-stage transitions, first-discovery mutation, early Snail states and alternate board/selector states are source-grounded but not claimed as exercised runtime branches.

### Ownership and sticker-order verification

- `yarn tsc --noEmit --incremental false`: passed after the refactor.
- Gaming, Farming and Collider regression suites: **208 tests passed across 9 suites**. Extracted expectations and approved numerical bounds were unchanged.
- The real account pipeline observed sticker bonus **2750** inside the early earned-Palette update, before UI-only processing. Four observations passed across initial and repeated processing.
- Full-account growth time **157.88196577997837 seconds**, non-plant Bits multiplier **7.49053478826947e54** and Palette Luck **1691.187396753388** matched the retained native results. Import progress, all Farming stickers, reparsing, repeated aspect updates and repeated full-account processing also passed. No processing failures were recorded.
- The ownership refactor did not change UI code. The page smoke above belongs to the prior implementation; this revision was exercised through the actual account pipeline.

