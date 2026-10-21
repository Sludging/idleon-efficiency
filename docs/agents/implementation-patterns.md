# Implementation patterns

For any UI planning, implementation, change, scoped review, critique, or audit, start with
the [UI work guide](ui-patterns.md). It is the practical entry for project UI context and
desktop smoke expectations; its linked product and visual context are sufficient for UI work.

## Read the relevant guide

- **Adding or changing domain objects, parsing, calculations, or purchase planning:** read
  [Backend patterns](backend-patterns.md).
- **Adding or changing a page, component, or account-data display:** read the
  [UI work guide](ui-patterns.md).
- **Adding calculations for a page:** read both. A calculation used only by the UI still
  belongs with the relevant game feature's calculations.

Before pattern discovery or comparison, follow the shared [research specialists rule](../../AGENTS.md#research-specialists).

## Choose before implementing

1. Identify the relevant pattern and example. State which aspects apply, such as calculation
   ownership or row composition.
2. Follow only those aspects. An example does not approve its whole file, formulas, exact
   fields, or existing behavior. Check game calculations through the established evidence
   workflow.
3. Raise uncovered choices or conflicts affecting the work before implementing them. Batch
   open choices, give concrete examples, and recommend an answer; routine UI choices are
   already covered by the UI work guide.
4. Keep changes within scope. These guides do not require redesigning old pages, refactoring
   unrelated domains, or changing existing filter defaults.

**Ready to implement:** applicable patterns are identified and uncovered choices affecting
the work are resolved. If no example fits, explain the gap instead of presenting a new pattern
as an existing convention.

Keep backend and UI rules in their respective guides; link rather than duplicate them.
