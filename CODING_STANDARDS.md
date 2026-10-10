# Coding standards

These rules are mandatory for new or changed handwritten code, developer comments, and user-facing text, and for reviewing those changes. They do not require rewriting generated code or migrating unrelated legacy code.

## LANG-01 — Simplified Technical English (STE)

Apply [STE principles](https://asd-ste100.org/about_STE.html) in developer comments and user-facing text. Full ASD-STE100 dictionary compliance is not required. Write short, direct sentences with one topic per sentence. Use active voice for instructions. Use terms and word meanings consistently. Give useful actions or information and the context needed to understand unfamiliar mechanics. Avoid jargon and fluff. Do not assume knowledge of game internals.

## VOCAB-01 — Game vocabulary

Use game terminology, informed by the Wiki and established repository/domain vocabulary. Keep obfuscated identifiers only in raw-data mappings or source-boundary references. Research meaning first; ask the developer before choosing when meaning remains unresolved or game, Wiki, and repository terms meaningfully conflict.

## RESEARCH-01 — Understand the player and mechanic

Before implementation, learn how the mechanic works, how players interact with it, and what information the website should provide. Reading repository code alone is not enough; use game evidence and player-facing sources as appropriate.

## MODEL-01 — Model responsible concepts

Use classes for game concepts with state and behavior. Keep behavior with the concept responsible for it. Pure calculations and shared utilities may remain functions; simple value shapes may use types or interfaces.

Put an aspect’s parsing, update logic and game-specific calculations on its class. Let the parent domain call those methods instead of changing all its aspects in one large function.

## PARSE-01 — Translate at the boundary

Accept raw save input only at the parsing boundary. Translate it into named state and objects rather than retaining raw structures, keys, positions, or encoding in downstream domain logic.

## READ-01 — Prefer clarity

Use explicit steps and descriptive names instead of compact, clever code. Extra lines are welcome when they make the intent easier to understand.

Use blank lines to separate groups of related statements. Add short comments to explain non-obvious game rules and calculation order. Do not add comments that only repeat what the code says.

## CONSIST-01 — Research and reuse patterns

Research broadly across relevant domains and shared utilities. Examine multiple relevant examples beyond the first two or three before choosing a pattern. Reuse suitable established patterns and functionality rather than creating a parallel approach.

## UPDATE-01 — Calculate values before they are needed

Run each calculation after the values it uses are ready. Distinguish values read during parsing from values calculated by an update. Reading another domain’s parsed state does not require that domain’s update to run first. Put bonuses that other domains can use in `postProcessingMap`, after their required updates. Keep UI-only calculations in `postPostProcessingMap`.

## DATA-01 — Treat required objects as required

Use direct access for domains and objects that initialization always creates. Do not add `| undefined`, optional chaining or default values to handle objects that cannot be missing. Keep checks and defaults for data that can actually be missing, such as optional save fields.

