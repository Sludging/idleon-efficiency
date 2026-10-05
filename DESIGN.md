---
name: IdleOn Efficiency
description: Practical, dense, game-grounded.
colors:
  brand: "#0376E3"
  pink-accent: "#FF3E82"
  text-dark: "#efefef"
  surface-dark-1: "#1E2127"
  surface-dark-2: "#1B1D24"
  surface-dark-3: "#1B1C22"
  accent-2: "#BEC2CC"
  accent-3: "#6B747F"
  accent-4: "#22252B"
  grey-1: "#30333A"
  placeholder: "#96979a"
typography:
  body:
    fontFamily: 'Rubik, "Rubik Fallback"'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "24px"
  feature-heading:
    fontFamily: 'Rubik, "Rubik Fallback"'
    fontSize: "34px"
    fontWeight: 400
    lineHeight: "40px"
spacing:
  small: "12px"
  medium: "24px"
  large: "48px"
  xlarge: "96px"
---

# Design System: IdleOn Efficiency

## Overview

**Creative North Star: "The Game Ledger"**

Practical, dense, game-grounded. The interface helps players read account state, compare upgrades, and identify useful actions. Preserve the incumbent Rubik typography, blue/pink accents, charcoal surfaces, and recognizable game artwork rather than introducing a new visual identity.

This document prioritizes desktop. Mobile/tablet and screen-reader or other assistive-technology support are not current product requirements; responsive measurements below describe existing behavior, not a support commitment or backlog.

**Key Characteristics:**
- Blue/pink accents, charcoal surfaces.
- Tonal surfaces with supporting shadows.
- Straightforward, compact, task-specific components.

**Evidence and authority:** Frontmatter records reusable values for this desktop snapshot. Actual appearance comes from [`customTheme`](lib/grommetTheme.tsx), its inherited Grommet dark/base defaults, and local component or route overrides, applied at the [app root](app/layout.tsx). Code remains authoritative as values evolve. The [UI work guide](docs/agents/ui-patterns.md) identifies approved reference traits for new work; an existing override, source anomaly, or runtime failure is not automatically a design standard. The sections below distinguish observed defaults, approved traits, and exceptions.

## Colors

Blue/pink accents, charcoal surfaces. Use the palette for navigation, actions, readable data, and surface separation; it is not a requirement to accent every component.

### Primary
- **Brand blue** (`brand`): navigation selection, active feature tabs, and brand-colored actions.

### Secondary
- **Pink accent** (`pink-accent`): the theme's `accent-1`, used by specific actions such as a Welcome sign-in provider; not a universal secondary-button assignment.

### Neutral
- **Pale text** (`text-dark`): maps to `global.colors.text.dark`; observed app-root text.
- **Charcoal surfaces** (`surface-dark-1`, `surface-dark-2`, `surface-dark-3`): map to `dark-1`, `dark-2`, `dark-3`. Dark-1 is the approved row/card reference surface; dark-2 also maps to `background` and supplies the app-root background. Dark-3 is an available theme surface, not an elevation tier.
- **Supporting greys** (`accent-2`, `accent-3`, `accent-4`): literal theme keys. Accent-2 supplies inactive navigation/tab labels; accent-3 appears in a Welcome provider action; accent-4 supplies selected sidebar rows.
- **Divider grey** (`grey-1`): header and notification borders.
- **Placeholder grey** (`placeholder`): the theme's placeholder role.

These are selected mappings from [`lib/grommetTheme.tsx`](lib/grommetTheme.tsx), not the complete palette. Game rarity, resource, affordability, and feature-specific state colors remain in their existing contexts. Unmodified semantic colors can come from Grommet's inherited dark theme; do not substitute brand or pink for every state.

The [.impeccable/design.json](.impeccable/design.json) sidecar carries tooling previews and extensions. Synthesized tonal ramps visualize swatches only; neither those ramps nor HTML/CSS preview snippets add React components, palette tokens, or new design standards.

## Typography

Rubik is loaded through `next/font` in weights 400, 500, and 700. The frontmatter family reflects the rendered app-root stack, including its generated fallback, rather than a literal family string set in `customTheme`.

- **Body:** observed themed app-root default. The custom theme sets the base size; inherited typography supplies the line height. This is not a rule that every value or control uses body sizing.
- **Ordinary feature heading:** use `<Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>`, as specified by the [UI work guide](docs/agents/ui-patterns.md) and shown in [Legend Talents](app/world-7/legendTalents/content.tsx). The frontmatter records its observed desktop rendering. Subsections, documents, authentication, and intentionally different hierarchies are exceptions, not additional display roles defined here.
- **Component-specific text:** desktop navigation labels use medium weight (500); `TextAndLabel` supplies small labels by default and accepts value sizes suited to their role. Welcome primary actions use larger text (16px); `SmallButton` uses compact text (12px). Preserve each component's own hierarchy.

At the sampled mobile viewport, ordinary feature headings rendered at 26px/32px. This is descriptive only. The unthemed HTML body is not the typography authority; inspect the Grommet app root or the actual component.

## Layout

**Observed outer layout:** [`ContentWrapper`](components/contentWrapper.tsx) centers ordinary routes at a **maximum** width of 1440px, with `large` horizontal padding and `xlarge` bottom padding. Those desktop values are recorded in frontmatter; do not add a second page-content max-width, centering rule, or horizontal inset. Internal sections and rows may still need their chosen reference's padding.

**Exact exceptions:** `/`, `/players`, and `/account/task-board` bypass the shared wrapper's max-width and horizontal padding; its bottom padding remains. They delegate layout to route content, which can provide its own centered max-width and inset. See [Welcome](components/welcome.tsx), [Players](app/players/content.tsx), and [Task Board](app/account/task-board/content.tsx). Wrapper bypass does not mean edge-to-edge content.

**Spacing source:** the frontmatter uses Grommet's existing `global.edgeSize` names. Installed `grommet/themes/base.js` derives them from a 24px base spacing; the custom theme does not replace them. Grommet's small breakpoint changes responsive edge sizes; sampled mobile wrapper padding was 24px horizontally and 48px at the bottom. These are observations, not a new density scale or device requirement.

**Approved reference traits:**
- **Atom Collider rows:** dark-1 surface, `medium` padding, `small` field gaps, and related values grouped with `TextAndLabel`. Its fields, widths, and percentage tracks are feature-specific. The rendered construction section also adds a `large` inset; that is not an ordinary page-wrapper rule. [Source](components/world-3/construction/atomCollider.tsx).
- **Sneaking upgrade cards:** keep identity and details together; put the game image beside the name/level, on dark-1 with `medium` padding and `small` inner gaps. The outer card gap is `medium`, not universally small. Three columns at the sampled 1440px desktop viewport describe this feature, not a universal grid. [Source](components/world-6/sneaking/sneakingUpgrades.tsx).
- **Tables and icon grids:** choose the named patterns in the [UI work guide](docs/agents/ui-patterns.md) for the player task. Their columns, controls, image inset, and disclosure behavior remain feature-specific.

Tome's 12px-padded score cards and Stamps' compact tiles are observed local compositions, not approved site-wide density standards. Named references approve specific traits, not entire pages or one universal card/row schema.

## Elevation & Depth

Tonal surfaces with supporting shadows. Dark surfaces provide the foundation; shadows support existing containers, navigation headers, and dropdowns rather than defining a mandatory elevation ladder.

- **Shared container/navigation shadow:** `-7px 8px 16px 0 rgba(0,0,0,0.17)`. Used by [`ShadowBox`](components/base/ShadowBox.tsx), the theme's dark `navigation` elevation, and the `CustomTabs` header.
- **Dropdown shadow:** `rgb(1, 4, 9) 0px 8px 24px 0px`. Defined separately by the theme's dark `dropdown` elevation.

A `ShadowBox` supplies a shadow, not a complete card style: its background, padding, and other composition choices come from its caller.

## Shapes

Shapes are component-specific. Sampled dark-1 `ShadowBox` containers, feature tab boxes, and Welcome primary actions have square corners. Sampled Welcome fields and Stamps Search have softly rounded corners (4px). The custom button radius override is `undefined`, not a declaration that every control is square.

Retain the selected component's borders and shape. There is no established universal radius scale, card outline, or rounded-container policy to apply across the site.

## Components

Straightforward, compact, task-specific. Reuse shared primitives where they fit, then preserve the chosen reference's composition traits.

### Buttons and fields

- **Welcome actions — observed:** primary buttons render at 16px/24px, weight 400, height 36px, padding 4px 22px, with square corners and a 2px colored border. Brand, pink, and accent-3 fills distinguish specific sign-in providers; they are not a universal primary/secondary/tertiary trio. [Source](components/welcome.tsx).
- **SmallButton — shared compact variant:** 12px text, padding 4px 8px, height/min-height 24px, line-height 1. Use this existing variant when appropriate rather than flattening all buttons to one size. [Source](components/base/SmallButton.tsx).
- **Text fields — observed:** Welcome inputs and desktop Stamps Search render at 14px, weight 700, height 41px, transparent fill, 4px corners, and a 1px `rgba(255,255,255,0.33)` border. Welcome padding is 11px; Stamps Search reserves a 48px left inset for its icon. These are component measurements, not a universal field contract. [Welcome](components/welcome.tsx), [Stamps](app/world-1/stamps/content.tsx).
- **Interaction scope:** inherit the chosen control's actual behavior and local overrides. Grommet retains a yellow focus/control default (`#FFCA58`), but sampled Welcome/Stamps focused fields had no visible ring. Neither fact establishes a global focus or hover doctrine, nor an assistive-technology compliance claim.

### Navigation and tabs

- **Desktop shell — observed:** header height 56px, dark-1 background, grey-1 bottom border; navigation height 48px. Navigation labels use 14px/500, inactive accent-2, and active brand with a 2px bottom underline. Its local hover treatment uses brand. [Source](components/navigation.tsx).
- **Feature TabButton:** a separate plain/hover-indicator button with a 40px inner box, `small` padding, and active brand text/2px bottom underline; inactive text is accent-2. [Source](components/base/TabButton.tsx).
- **CustomTabs:** a distinct Grommet tab theme with 56px tabs, `small` top/horizontal padding, brand active text, and a dark-2 shadowed header. Its local tab background/border behavior differs from `TabButton` and the global tab theme; reuse the matching variant. [Source](components/base/CustomTabs.tsx).
- **LeftNavButton:** a 40px sidebar row with accent-4 selected background versus dark-2 inactive background, accent-2 text, and selected bold text/arrow. It is not the shell's underline pattern. [Source](components/base/LeftNavButton.tsx).

### Labeled values, resources, artwork, and details

- Use [`TextAndLabel` / `ComponentAndLabel`](components/base/TextAndLabel.tsx) for a label with a simple or complex value, not as mandatory wrappers for every text or image.
- Use [`CoinsDisplay`](components/coinsDisplay.tsx) with `getCoinsArray`, [`BitsDisplay`](components/bitsDisplay.tsx) for Gaming Bits, and [`ResourceDisplay`](components/account/shared/ResourceDisplay.tsx) when its image, compact quantity, affordability treatment, or exact-count detail fits. Their formatting and feature-specific states are not interchangeable.
- Pass entity image metadata to [`IconImage`](components/base/IconImage.tsx); preserve the selected reference's image/name placement instead of inventing asset URLs or dimensions.
- Use [`TipDisplay`](components/base/TipDisplay.tsx) for an explanation or exact count that would crowd the main display. Existing patterns attach details to a label information icon, game image, or compact resource value. Tooltips are optional; explanations need not all be hover-only.
- Reuse [`EfficiencyUpgradeTable`](components/account/shared/EfficiencyUpgradeTable.tsx) for compatible elite-class features and preserve that family's controls. [`StampsTableView`](components/world-1/stampTableView.tsx) is a feature-specific search/filter/sort table; Stamps' icon grid remains its recognition-oriented alternative, not a generic tile standard.

For context-specific image, value, tooltip, and inactive/affordability treatments, follow the [UI work guide](docs/agents/ui-patterns.md) rather than promoting a single local implementation into a site-wide API.

## Do's and Don'ts

### Do:
- **Do** preserve the incumbent Rubik typography, blue/pink accents, charcoal surfaces, and game artwork.
- **Do** use the ordinary feature heading and shared outer wrapper for ordinary feature routes.
- **Do** choose a named reference for rows, cards, tables, or icon grids and preserve its approved spacing and placement traits.
- **Do** let the player task and feature data determine fields, columns, controls, and details.
- **Do** distinguish inherited defaults and local observations from approved reusable traits.

### Don't:
- **Don't** add duplicate page-content width, centering, or horizontal padding to ordinary wrapped routes.
- **Don't** turn reference-specific fields, percentage tracks, column counts, or compact local tiles into universal requirements.
- **Don't** apply one radius, button hierarchy, tab treatment, focus treatment, or hover treatment to every component.
- **Don't** treat source anomalies, runtime failures, or every incumbent page setting as design standards.
