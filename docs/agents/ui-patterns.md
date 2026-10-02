# UI implementation patterns

Read [Implementation patterns](implementation-patterns.md) first for choosing an example
and understanding which parts are approved. A linked example is not approval of its entire file.

## Choose a presentation for the task

Choose among a horizontal row, independently composed cards, a table, and an icon-first
grid based on what the player needs to read or compare. Choose case by case: field count,
list size, filtering, or artwork alone does not decide the layout. Then follow the selected
example's composition consistently while keeping the feature's actual fields and game
meaning.

- **Rows** align related fields for each upgrade. Study [Atom Collider](../../components/world-3/construction/atomCollider.tsx)
  for the approved row composition. Its example uses a dark-1 surface, medium padding,
  and small field gaps. It groups relevant fields with `TextAndLabel`.
  - Labels are xsmall; bonus values are xsmall.
  - Names and levels are small; cost values are small.
  - Keep the fields required by the feature. Do not copy its exact columns or percentage
    tracks as a universal schema.
- **Cards** keep each upgrade's identity and details together. Study [Sneaking upgrades](../../components/world-6/sneaking/sneakingUpgrades.tsx).
  - Use a dark-1 surface with medium padding.
  - Place the image beside the name and level.
  - Use small labels, small name and cost values, and an xsmall effect value.
  - Leave small gaps between fields.
  - Do not require every card to use these exact fields.
- **Tables** suit collections where players need to compare the same information across
  entries. Reuse the existing [EfficiencyUpgradeTable](../../components/account/shared/EfficiencyUpgradeTable.tsx)
  for a compatible elite-class feature, preserving that family's established controls. Its
  columns and filters must fit the feature.
  - For a feature-specific table, [StampsTableView](../../components/world-1/stampTableView.tsx)
    is an example composed for its own search, filter, sort, and scenario needs.
  - Stamps also retains its icon grid. Do not add a second view by default.
- **Icon grids** put game-art recognition and a compact overview first. [Stamps](../../app/world-1/stamps/content.tsx)
  shows an icon/level grid with details disclosed separately. Use this when that overview
  fits the player task, not as a compressed substitute for details the feature needs
  visible.

These are alternatives, not a layout ranking. Approval of an example covers its named
composition aspects, not its filters, calculations, field schema, or every branch. Follow
existing feature-family patterns; the shared elite-class table is an example of that
consistency.

For context, Stamps' table was [added as an alternate view with filters](https://github.com/Sludging/idleon-efficiency/pull/259), while the elite-class pages were [deliberately unified](https://github.com/Sludging/idleon-efficiency/pull/278).

## Titles and field grouping

For an ordinary feature-page title, use:

```tsx
<Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>
```

This title recipe is not a rule for subsections, document pages, authentication screens,
or a deliberately different information hierarchy. See [Legend Talents](../../app/world-7/legendTalents/content.tsx)
and established account/world pages for context.

**Page spacing:** Ordinary feature pages inherit their outer width, centering, and
horizontal padding from the shared app layout. Keep the page-content container free
of additional horizontal padding, max-width, or centering. Apply padding within
sections and upgrade rows where the selected composition requires it.

For a header and value that belong together:

- Use `TextAndLabel` when the value is text.
- Use `ComponentAndLabel` when the value is a more complex component.

These components group a label with its value. They are not required wrappers for every
text, image, status, or currency display. The [shared implementation](../../components/base/TextAndLabel.tsx)
supplies small labels by default. Choose value sizing to suit its role and the selected
composition; row examples differ, so there is no universal effect, level, or cost size. In
the small responsive context, `TextAndLabel`'s string labels and text values become xsmall.

## Records and state

For new upgrade lists, show all real entries, including locked and maxed upgrades. Exclude
filler records that are not real game content. Optional hide-locked or hide-maxed controls
start **off** unless another default is deliberately approved.
For existing lists, preserve the current behavior, including the shared elite table's
defaults. A new list that follows a family's visual style does not automatically take on
that family's hide-filter defaults.

Give inactive, locked, or unowned entries reduced emphasis where that state matters.
Existing examples use different opacity values; use the selected example's actual
constants rather than treating one value as universal:

- [Atom Collider](../../components/world-3/construction/atomCollider.tsx) dims inactive entries.
- [Prayers](../../components/world-3/worship/prayers.tsx) dims level-zero entries.
- [Pristine Charms](../../components/world-6/sneaking/pristineCharmsSection.tsx) dims locked entries.

Follow the named example for related states such as affordability. Jade Emporium combines
distinct opacity with green cost text. This is a feature-specific refinement, not a reason
to create a new site-wide state system.

Use [TipDisplay](../../components/base/TipDisplay.tsx) for explanations or detail that
should not crowd the main display. Existing forms include:

- The information icon from the `TextAndLabel` `tooltip` prop.
- Details attached to a game image.
- Exact resource counts behind compact values.

Tooltips are optional; do not make every explanation hover-only.

## Small screens
The following is approved direction for **new work**, not a claim that current pages already
behave uniformly this way:

- Give text-rich cards one item per row.
- Stack horizontal item fields underneath one another; an image may remain beside its name.
- Keep multiple icons per row in compact icon grids, with fewer columns as the screen narrows.
- Keep table columns and allow horizontal scrolling within the table area, not across the
  page.

Use the existing small `ResponsiveContext` and these examples as starting points:

- [Farming market upgrades](../../components/world-6/farming/marketUpgrades.tsx) and
  [Worship Totems](../../components/world-3/worship/totem.tsx) show collections becoming
  one column at a small breakpoint.

Verify the actual surface at a narrow width. Propose an exception if the feature needs one;
do not assume the desktop layout works on mobile. This direction does not authorize
automatic redesign of old pages.

## Reuse existing UI utilities and data displays

- Check [data/utility.tsx](../../data/utility.tsx) before adding a helper.
  - Use `nFormatter` or `notateNumber` in the mode appropriate to the value.
  - They are separate helpers, not interchangeable names for one behavior.
- Render coin amounts with [CoinsDisplay](../../components/coinsDisplay.tsx) and
  `getCoinsArray(amount)`, as in [Upgrade Vault](../../components/account/upgradeVaultDisplay.tsx).
  This displays coin denominations and icons.
- For game artwork, pass the entity's image metadata to
  [IconImage](../../components/base/IconImage.tsx), for example
  `data={upgrade.getImageData()}`. Do not build feature-specific asset URLs or dimensions.
- [ResourceDisplay](../../components/account/shared/ResourceDisplay.tsx) is available for
  other resources when image, compact quantity, optional affordability colour, or exact-count
  detail fits.

## Page state and data refresh

Keep route metadata and the server wrapper in `page.tsx`; put store hooks and interaction in
client content/components where the route needs them. Do not add a redundant content file
when a route already delegates to a suitable shared client component.

When selecting several store values together, wrap the selector with `useShallow` and select
the fields the view uses rather than subscribing to the whole store. If the page reads the
mutable domain `Map`, retain the required `lastUpdated` refresh dependency even when it is
not printed.

This rerender signal differs from the save timestamp used for elapsed-time displays. Keep
the existing account refresh behavior for the page's loading path.

Filtering and sorting are view work; keep game formulas in the backend rather than
recalculating them as part of rendering. Follow [backend patterns](backend-patterns.md) for
calculation ownership and previews. If changing a game calculation, follow the existing
[calculation-correctness guidance](../../skills/calculation-correctness/SKILL.md) for its
evidence and checks.
