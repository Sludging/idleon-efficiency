# UI work guide

This is the practical entry for planning, implementing, reviewing, or critiquing UI. Follow
existing patterns unless the user approves a change. Keep review scoped to the requested
surface and supported behavior; report actionable findings, not broad redesign proposals.

For new UI pages or changes to visual composition, use the `impeccable` skill for the scoped
task. Critiques and audits stay within supported behavior; they are not permission for broad
redesign or repeated polish passes.
The [product context](../../PRODUCT.md) and [visual context](../../DESIGN.md) record project
facts and visual references. Use the [UI verification guide](ui-verification.md) for private
Docker Playwright feature checks and screenshots during mockup planning.

## Workflow

1. Define the player task and the exact page, component, or interaction in scope. Identify
   relevant existing pages and examples before proposing a new composition.
2. Choose the information hierarchy and composition below. Match a reference's named
   aspects; its fields, columns, filters, calculations, and other behavior are not universal.
   Record meaningful choices the examples do not cover.
3. For planning, use a browser-rendered small preview with existing theme/components and
   representative display data when composition needs evaluation. A focused mockup route
   and scenario can render an existing component or store-backed surface; a whole page is
   not required. Use the [UI verification guide](ui-verification.md) for the preview loop.
   Use wireframes when only structure matters. Image generation is optional exploration,
   not the default fidelity authority. Never present illustrative data as game evidence or
   implement a feature's backend in a preview.
4. Implement only the requested surface and behavior. Keep game calculations in the domain.
5. Verify the changed paths with a real save, then fix actionable issues in one bounded
   pass and confirm once. Stop when the scoped behavior works; do not enter repeated polish
   loops. Preserve the save, stop the owned stack, and remove temporary scenarios/previews.

## Composition references

Choose rows, cards, tables, or icon grids according to what players need to read or compare;
field count, collection size, filtering, or artwork alone does not decide. Match an existing
feature family's pattern where applicable.

- **Rows:** [Atom Collider](../../components/world-3/construction/atomCollider.tsx) is an
  approved row reference: dark-1 surface, medium padding, small field gaps, and related
  values grouped with `TextAndLabel`. Its field sizes and percentage tracks fit that feature;
  do not copy its exact columns or tracks as a universal schema.
- **Cards:** [Sneaking upgrades](../../components/world-6/sneaking/sneakingUpgrades.tsx)
  keeps identity and details together on a dark-1 surface with medium padding and small
  gaps. Its image beside the name and level is a useful composition reference, not a
  requirement for every card's fields.
- **Tables:** Reuse [EfficiencyUpgradeTable](../../components/account/shared/EfficiencyUpgradeTable.tsx)
  for a compatible elite-class feature and preserve that family's controls. Its columns
  and filters remain feature-specific. [StampsTableView](../../components/world-1/stampTableView.tsx)
  is an example of a feature-specific table with search, filter, and sort; Stamps also
  retains its icon grid rather than adding another view by default.
- **Icon grids:** [Stamps](../../app/world-1/stamps/content.tsx) prioritizes game-art
  recognition and a compact overview, with details disclosed separately. Use this only
  when the overview serves the player task.

These are alternatives, not a ranking or blanket approval of their source files. Small
primitives and theme tokens do not enforce composition consistency: repeated rows, cards,
resource displays, image/title groups, and grids can still drift in padding, widths,
columns, gaps, image inset, and grid behavior. Choose a concrete reference for the
container, spacing, image/title inset, and grid behavior, then keep those details consistent.

## Page and data display conventions

- Ordinary feature-page title:
  ```tsx
  <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>
  ```
  This does not prescribe subsection, document, authentication, or intentionally different
  hierarchies. See [Legend Talents](../../app/world-7/legendTalents/content.tsx) and
  established account/world pages.
- Ordinary feature pages inherit outer width, centering, and horizontal padding from the
  shared app layout. Do not add another page-content max-width, centering, or horizontal
  padding; add padding within sections and rows when their chosen composition calls for it.
- Use `TextAndLabel` for a label with a text value and `ComponentAndLabel` for a complex
  value. They are not mandatory wrappers for every text, image, status, or currency display.
  `TextAndLabel` supplies small labels by default; choose value size to suit its role.
- Use `TipDisplay` when an explanation or exact count should not crowd the main display.
  Existing forms include the `TextAndLabel` information icon, details on a game image, and
  exact resource counts behind compact values. Tooltips are optional; do not make every
  explanation hover-only.
- Check [data/utility.tsx](../../data/utility.tsx) before adding a number helper. `nFormatter`
  is a compatibility adapter; `notateNumber` is the canonical game formatter, and
  `commaNotation` groups without suffixes. They have distinct behavior.
- Render coins with [CoinsDisplay](../../components/coinsDisplay.tsx) and
  `getCoinsArray(amount)`, as in [Upgrade Vault](../../components/account/upgradeVaultDisplay.tsx).
  Render Gaming Bits with [BitsDisplay](../../components/bitsDisplay.tsx), passing a numeric
  amount or canonical formatted Bits string. Use `scale` and `textSize` for compact contexts,
  as in [Tome](../../app/account/tome/content.tsx). Use
  [ResourceDisplay](../../components/account/shared/ResourceDisplay.tsx) for other resources
  when its image, compact quantity, optional affordability color, or exact-count detail fits.
- Pass entity image metadata to [IconImage](../../components/base/IconImage.tsx), e.g.
  `data={upgrade.getImageData()}`. Do not construct feature-specific asset URLs or dimensions.
- Show all real entries, including locked and maxed ones, in new upgrade lists; exclude
  filler records. Optional hide-locked/maxed controls start off unless a different default
  is approved. Existing lists retain current behavior, including shared-table defaults.
  Dim inactive, locked, or unowned entries only where state matters, following the selected
  example's actual opacity and affordability treatment; those values are not site-wide rules.
- Keep route metadata and the server wrapper in `page.tsx`; put store hooks and interactions
  in client content/components where needed. Avoid a redundant content file when a route
  already delegates to a suitable shared client component. For grouped Zustand selections,
  use `useShallow` and select only displayed values. A view reading the mutable domain `Map`
  retains its `lastUpdated` refresh dependency. This is separate from the save timestamp used
  for elapsed-time displays; preserve established account loading behavior.
- Filtering and sorting are view work. Keep game formulas in the backend. For a changed
  calculation, use the existing
  [calculation-correctness workflow](../../skills/calculation-correctness/SKILL.md); previews
  are not evidence.

## Desktop verification and review

The Docker Playwright runner uses a 1440×1000 viewport. This is a repeatable review surface,
not a responsive test matrix or a requirement to implement mobile/tablet behavior. Existing
responsive code stays in place; new UI work has no mobile/tablet requirement.

Check only what the change touches:

- A real local save is loaded and the page has expected data. Confirm shown values and units
  are presented coherently; do not infer or invent game calculations.
- Relevant artwork loads and sits consistently with titles; long labels/effects wrap without
  clipping, and repeated fields, cards, and columns align as intended.
- Exercise changed tabs, filters, sorting, tooltips, navigation, loading and empty states as
  applicable. Observe runtime errors on those paths.
- Preserve real saves. Keep screenshots, traces, logs, and other run output under the
  private ignored artifact directory; inspect and redact before sharing.
- Follow the [UI verification guide](ui-verification.md) to start Docker, run a focused
  scenario, inspect the screenshot and relevant errors, and stop/remove throwaways.
