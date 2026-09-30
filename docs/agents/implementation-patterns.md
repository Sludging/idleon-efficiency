# Implementation patterns

These are the user-selected patterns for backend and UI work. They apply to new features and changes to existing features.

## Read the relevant guide

- **Adding or changing domain objects, parsing, calculations, or purchase planning:** read [Backend patterns](backend-patterns.md).
- **Adding or changing a page, component, or account-data display:** read [UI patterns](ui-patterns.md).
- **Adding calculations for a page:** read both. A calculation used only by the UI still belongs with the relevant game feature's calculations.

## Choose before implementing

1. Identify the relevant pattern and example in the guide. In the task's existing plan or proposal, state which parts apply: for example, a bonus class's calculation ownership or an upgrade row's field layout and text sizes.
2. Follow the approved parts. An example is not approval of its entire file, every formula, its exact fields, or all its existing behaviour. Check game calculations through the existing evidence and testing workflow.
3. If a choice is not covered, or the guidance conflicts with the code being changed, raise it before implementing that part. Batch the open choices, give concrete examples, and recommend an answer. Include small visual choices when no approved example covers them; do not ask again about routine choices already settled here.
4. Keep changes within the task. Following these guides does not require redesigning old pages, refactoring unrelated domains, or changing existing filter defaults.

**Ready to implement:** the applicable pattern is identified and any uncovered choices or conflicts affecting the work have been resolved with the user. If no existing example is suitable, explain the gap rather than building a new pattern and presenting it as an existing convention.

## Maintaining the guidance

Keep each rule in its backend or UI guide and link to it from other instructions. Use simple technical English, concrete game scenarios, and names already used by the game or project. Record later changes from ordinary user feedback; no separate evaluation process is required.
