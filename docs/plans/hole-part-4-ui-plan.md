# The Hole part 4: UI plan

- **Status:** Production UI revision accepted under the user's standing delegation on 2026-10-18 and committed locally. Evidence and check limits remain in the current handoff; user personal review and longer smoke testing remain outstanding.
- **Scope:** Issue [#444 — Well, Bell, Harp, and Lamp progression](https://github.com/Sludging/idleon-efficiency/issues/444), selected part 4 only. Use the [accepted backend plan](hole-part-4-backend-plan.md) and [selected Hole IA](hole-ui-information-architecture.md#caverns). Preserve human-accepted parts 1–3, all other 14 support states, and the existing 18-entry rail.

## Player outcome

Players inspect saved Well production/expansion, Bell mode and permanent progression, Harp settings and permanent string effects, and Lamp wishes/costs/resets without changing game state or mistaking unknown data for zero.

## UI plan

- Keep `/world-5/hole` shell, shared account summary, centered **Villagers → Upgrades → Caverns** tabs, selected cavern art, and complete ordered 18-entry unnumbered rail unchanged. Add no new navigation, comparison dashboard, repeated cavern heading, or duplicate Opal summary.
- Use compact dark-1 cards with the Jelly Operator Cell grey heading/body composition. Keep grey only in card headers and focused highlights; leave grouped metrics on the card body. Use valid owner/item image metadata and preserve selected cavern art where per-record art is unavailable.
- **Well:** remove bucket records and duplicate expansion level/count. Show total buckets and gold buckets with acquisition tooltips, one gold multiplier, and ten sediment cards with shared stock/capacity progress, assigned-bucket count, and grouped rate. Show assigned-bucket counts only when ownership and assignments for all owned buckets are known. Automatic expansion timing is an explicitly approximate snapshot current-rate estimate to the next capacity threshold, shown only when source-confirmed saved gates, stock, capacity, and positive rate are known. Show unavailable stock distinctly; state disabled, level-capped, zero-production, and unknown gates separately. Never present a countdown or predict future rate changes/update cadence.
- **Bell:** combine current/required XP in selected mode and each bank. Show six improvement identities, levels, account-wide current/required currency pairs, and affordability color. Render both current and required Coins with `CoinsDisplay`, and both Bits values with `BitsDisplay`. Money uses `Account.totalMoney` as rendered by the dashboard, including storage and every character; never render per-character money. Keep each expanded bonus effect once under a token-free numbered heading; preserve all seven bonuses and Renew consequences.
- **Harp:** keep power/rate, tune, and active slots compact. Show ten note balances, access through dimming for known locked notes, and an explicit unavailable state when access is unknown. Keep seven strings and their permanent passive effects; dim known unowned strings, retain unavailable ownership distinctly, and show saved assignment order once, including an explicit unavailable state when layout is missing.
- **Lamp:** keep wish stock and fractional daily gain, all twelve authentic names/descriptions/levels/effects/costs, **A Moderate Discount**, and all four imported **Another Try** consequences. Use the selected cavern art; do not invent wish image metadata.
- Preserve read-only behavior and distinguish known zero from unavailable. Use real currency images from owner metadata or existing item image APIs; do not guess asset URLs or fallback art.


The source-supported current-rate estimate is `max(0, capacity - current stock) / grouped rate` hours. `capacity = 100 × 1.5^level × (1 + unlockRequirement / 100)`. Source `idleon1.23.txt:265588–604` adds assigned-bucket production by elapsed hours before testing capacity, then clamps stock. Auto-expansion requires `Holes[11][10] == 1`; level 14+ is capped unless `B_UPG(13,1)` is owned. Successful expansion subtracts `capacity / round(2 + 2 × StudyBolaiaBonuses(0,99))` stock and increments the level. An already reached threshold waits for the next qualifying game update; tick cadence is not known. Missing stock/gate/rate remains unknown; negative mapped stock is unavailable. See `docs/research/hole-part-4-source-review.md:39–49`.

## Research and design evidence

- Issue #444 and the accepted backend plan define read-only outcomes and data boundaries; selected Hole IA assigns the four systems to existing Caverns entries.
- Pattern research inspected Sushi, Spelunking, `components/world-7/jelly-operator/jellyOperator.tsx`, and Research's source-value tooltip. Match Jelly's grey identity header/dark body hierarchy, Research's hoverable source disclosure, and Sushi/Spelunking compact details.
- `HoleCurrency` supplies explicit artwork only for Fountain currencies; valid item images use `Item.getImageData`. Sediment, Harp-string, and Lamp-wish models have no per-record image metadata. Keep the existing selected-cavern art rather than invent per-record assets.
- Impeccable context loaded successfully. Preserve “The Game Ledger”: Rubik, blue/pink accents, charcoal surfaces, shared wrapper, and game artwork. Do not change project context or design tokens.

## Verification

Use the normal `/world-5/hole` route with the configured local save. Check Well timing and bucket states, Bell token-free bonuses and Coins/Bits current/cost images, Harp assignment visibility, one bucket tooltip, and one loaded detail image. Keep the save unchanged. Longer smoke testing remains with the user. Record exact route, artifacts, errors, and check limits in the current handoff.