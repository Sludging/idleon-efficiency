# Spelunking Part 3 UI plan — Phase 6 revision

**Status:** Draft for human approval. This revision supersedes the prior Part 3 UI draft, including its locked-row boilerplate and no-price presentation. The accepted backend plan remains unchanged. Production UI work has not started.

## Player outcome

Players can scan their Amber and advanced progression, compare shop effects and Amber costs, and understand useful locked upgrades and unowned Elixirs without mistaking potential benefits for owned effects or purchase eligibility.

## Selected outcomes

1. Dim all text in locked Shop rows, including levels, requirements, effects, and prices; do not dim only upgrade names.
2. Keep each locked upgrade's real source description and potential benefit visible. Do not replace it with unlock boilerplate.
3. Keep Amber prominent, but reduce its value from 30px to a proportional 22–24px role.
4. Move Memorization Slots and Consumption Reduction out of the shared summary. Show both as simple values at the top of Elixirs.
5. Restore compact, 6px Overstim and Trackometer progress bars to the shared summary. Show saved fill and threshold; keep detailed meter information out of the summary.
6. Format Manic, Overstim, and Trackometer tooltips with headings, grouped details, aligned label/value pairs, and readable text. Omit redundant “Unlocked” text.
7. Keep potential benefits in disabled or unowned tooltips. Use opacity to signal state, not replacement boilerplate.
8. Emphasize source-backed Total Bonus/effect values inside the original Shop description. Do not add a separate Owned Bonus line or create description text.
9. Show next Amber cost and one bulk-cost value. Use cost-to-max for finite upgrades and next-10 for unbounded upgrades. Show exact purchase counts when a finite cap truncates the quote. Apply affordability color to the actual quote using raw Amber.
10. Do not add an “Owned” label to Elixirs. Keep unowned cards readable with whole-card opacity. Retain the memorized border and visible “Memorized” cue; show equipped state only if it adds useful context.

## Composition and behavior

- Preserve the current Spelunking page shell, shared summary, character context, Tunnels and Journal & Pages views, existing filters, and per-view scroll position. Keep Shop and Elixirs as sibling views. Do not reintroduce Tools, AUTO, or Advanced sections.
- In the summary, use the existing owned-Amber denomination and formatting path, with its game icon. Keep Manic mode and Overstim/Trackometer levels compact. Use the verified Wiki-labeled Overstim Meter and Stamina Trackometer icons. Put saved progress and effect details in nearby information-icon tooltips.
- Use the existing `UpgradeTable` shell and its Sushi/Grommet `DataTable` composition. Keep aligned feature-owned columns for Upgrade, Level, Effect, Next cost, and Bulk cost. Keep the established locked filter and default. Locked level cells retain only the prerequisite name; never show level `0`.
- Render each intrinsic Shop description once. Preserve source wording, punctuation, units, line breaks, and bound-value positions. Emphasize only values already present in the source-bound description; do not parse prose for game meaning, invent text, or add a second bonus line. Locked rows keep the same description and show the potential source value separately from their zero owned bonus when needed. Saved level `-1` to `0` unlocks the upgrade but does not grant its level-1 effect.
- Keep one bulk-cost column without a new toggle or calculator controls. Label finite quotes “To max · N purchases remain”; label unbounded quotes “Next 10.” Near-cap finite quotes use the actual truncated purchase count. At max, show a neutral dash or “Maxed,” never a green zero-cost action. Fixed-input bulk totals are projections, not live purchase forecasts; state this beside the column or in its existing-style detail.
- Reuse `UpgradeTable` rather than the `EfficiencyUpgradeTable` wholesale. `EfficiencyUpgradeTable` is the precedent for aligned next/goal cost columns, but its generic locked-goal behavior and `ResourceDisplay` formatting do not fit Spelunking's Amber semantics. Use the existing Amber denomination/image formatter for balances and quotes, canonical number formatting for large values, and compare the raw saved Amber amount with each raw quote. Match established affordability semantics: affordable quotes use the existing green state; unaffordable quotes keep normal text color. Locked-row dimming remains dominant and never implies buyability.
- Use source-backed metadata for potential locked effects, not `Upgrade.getBonus()` as an owned value. Make any distinction clear in the existing row tooltip; do not imply the first unlock purchase grants a level-one effect.
- Keep twelve Elixir cards in the dense existing-style grid, with their verified Wiki icons and resolved original descriptions. Put memorization-slot and consumption-reduction numbers above the grid. Unowned cards remain legible and show their real potential benefit in their tooltip. Keep memorized state distinct with the existing border and visible label. Do not add ownership prose or unsupported Elixir names.

## Backend and content contract

Bind the UI to accepted backend fields only: `Upgrade.nextCost`, `costToMax`, `costNext10`, and `remainingCap`; and `Spelunking.canAffordUpgrade(upgrade, cost?)`. Use `costToMax` only for a finite cap. Use `costNext10` for the `99,999` unbounded sentinel. Do not calculate quotes, simulate purchases, add APIs, or conflate price, affordability, visibility, and buyability in the UI.

The accepted cost-to-max and next-10 totals are fixed-input derived projections, not native aggregate outputs. Current price parity is evidenced for one offline Jelly_Operator v1.22 account and representative rows only. This preview does not expand those evidence limits. Use the existing verified Elixir quantity resolution and static descriptions. Do not change generated data, create authored mechanic descriptions, or add a new static-data exception.

## IdleonToolbox reference

Reference only: [public Spelunking profile](https://idleontoolbox.com/account/misc/general?profile=liiiiiiiiiiiig). The public Spelunking view exposes account-summary metrics, upgrade progression, and Elixir navigation. Use relevant content grouping and game-art recognition only. Keep IdleOn Efficiency's shell, Rubik typography, charcoal surfaces, blue active states, compact aligned values, and existing game-image conventions; do not copy Toolbox navigation, colors, layout, or upgrade-tree presentation.

## Rendered preview

The disposable desktop/narrow preview uses the site's dark palette and real CDN game art. Its data is illustrative, not a real account, complete production data, or game evidence. The final Docker Playwright scenario passed with no page errors; earlier disposable interaction attempts and their raw receipts remain in the private run directory.

- [Shop and shared summary](../../.ui-verification/runs/2026-10-16T07-18-48-026Z-83221/shop-summary.png)
- [Narrow layout capture (1024px)](../../.ui-verification/runs/2026-10-16T07-18-48-026Z-83221/narrow-layout.png)
- [Locked potential-benefit tooltip](../../.ui-verification/runs/2026-10-16T07-18-48-026Z-83221/locked-benefit-tooltip.png)
- [Manic tooltip](../../.ui-verification/runs/2026-10-16T07-18-48-026Z-83221/manic-tooltip.png)
- [Overstim tooltip](../../.ui-verification/runs/2026-10-16T07-18-48-026Z-83221/overstim-tooltip.png)
- [Trackometer tooltip](../../.ui-verification/runs/2026-10-16T07-18-48-026Z-83221/trackometer-tooltip.png)
- [Elixir cards](../../.ui-verification/runs/2026-10-16T07-18-48-026Z-83221/elixirs.png)
- [Unowned Elixir potential-benefit tooltip](../../.ui-verification/runs/2026-10-16T07-18-48-026Z-83221/unowned-elixir-tooltip.png)
- Scenario source: `../../.ui-verification/runs/2026-10-16T07-18-48-026Z-83221/scenario.cjs.source`
- Preview result and diagnostics: `../../.ui-verification/runs/2026-10-16T07-18-48-026Z-83221/result.json` and `errors.json`

This is a composition preview only. It does not bind the actual Spelunking route or prove all 68 Shop rows, production data integration, connected-game parity, responsive behavior, keyboard behavior, or runtime cleanliness. The 1440px and 1024px captures are visual planning references, not responsive acceptance. No production code, backend data, tests, build, lint, formatter, issue state, or commit changed.

## Approval boundary

Approve or revise this UI plan and preview before Phase 7 production UI work. No production implementation is authorized by this draft or the accepted backend plan.
