# Calculation-correctness pilot — iteration 2

## Goal and review point

Evaluate whether the process leads to correct calculations, suitable website implementations, clear dependency decisions, and useful test coverage.

Use pilot [#368](https://github.com/Sludging/idleon-efficiency/issues/368). Review iteration two after **five distinct closed cases**, including resolved and aborted outcomes. Mark each record `Iteration 2`; preserve earlier records. Count cases by issue number. If a case reopens, exclude it from the closed count and update its existing entry when it closes again.

## Capture useful observations

Use the [case working note](PLAYBOOK.md#shared-case-working-note) to retain useful observations when work passes between stages or a progress report is due. Examples include:

- A configuration change triggered extraction, or existing matching results were reused.
- Plan approval corrected the proposed design before tests or implementation; later evidence required a plan change.
- Tests established a selected mismatch or exposed a direct dependency before implementation; implementation order or a human exception was recorded.
- Parameter coverage, scope, or ownership was corrected.
- A timed stop/report exposed a stall or drift, or enabled a concrete next action.
- Findings were reused by the next worker/reviewer, had to be re-established, or were unavailable.
- A continuing context stayed useful, or a fresh context resumed the case successfully.
- The human clarified meaning, redirected work, or completed implementation side work.

Workers and reviewers return these facts with ordinary results. The coordinator records them before the next handoff or context reset. Record the event and consequence as facts. Routine progress needs no separate entry. Use `not recorded` when a fact is unavailable; absence is not proof that the event did not occur.

## Case outcome

At resolution or abort, summarize the selected calculation's result and process path using the fields below. Keep detailed findings and test results in the Case working note and link them instead of copying command logs into the tracker.

```md
### Iteration 2 — Case #<issue>: <domain> / <aspect>
- Outcome: resolved | aborted
- Completion path: normal completion | human-directed exception | human abort
- Tests before implementation: satisfied | violated | not established
- Review: PASS | no PASS — <not run, incomplete, or actual review outcome>
- Correction rounds: <count of CHANGES_REQUIRED results, or not recorded>
- Human intervention: <clarification, corrective steering, side work and effect; none observed or not recorded>
- Timed reports: <number of deadline-triggered reports and useful effects; missed reports if any>
- Research/context reuse: <useful reuse, repeated discovery, context reset, or not exercised>
- Observations: <what helped, what failed, unresolved improvement suggestions; none observed is acceptable>
- Case details: <working-note/outcome link with actual tests and final verification scope>
```

Mark **Tests before implementation** as `satisfied` when core and parameter tests ran before domain edits, parameter tests passed, and the coordinator approved the tests-stage result. Passing core tests can proceed directly to review. Use `violated` when domain edits came first, and `not established` when the earlier test result is unavailable.

Use the [playbook's completion requirements](PLAYBOOK.md#6-complete-the-case). An exception states what was omitted or supplied through human work. Record review that ran but did not pass separately from review that never ran. Correction rounds count observed `CHANGES_REQUIRED` results.

## Tracker maintenance

After the case closes, create or update its one iteration-two comment in #368. Read existing iteration-two entries first and match by issue number. Update a resumed case's existing entry in place; do not count it twice. If duplicate iteration-two entries or an uncertain record owner prevent a clear update, ask the human rather than adding another entry. Preserve iteration-one records.

After the fifth distinct closed case, post one iteration-two review-ready notice with the five case links and present the findings to the human. Check for an existing notice before posting. The human decides whether to change the process or continue the pilot.

## Questions for the five-case review

1. **Extraction:** Did conditional refreshes supply the needed values without unnecessary extraction or runtime waits?
2. **Test-first:** Did the tests-only assignment establish meaningful results before implementation and reveal direct dependencies early?
3. **Parameters and scope:** Did each case compare all direct cross-domain/aspect calculations without recursively investigating or implementing their inputs? Did core cases cover the selected behavior-changing branches and values?
4. **Worker context:** Did a continuing worker context reduce handoff work while staying focused? When was a fresh context more useful?
5. **Reviewer independence:** Did the recorded findings help the reviewer locate the relevant code while still checking game behavior, implementation, and tests independently?
6. **Timed reports:** Did ten-minute reports expose stalls or drift early enough to act, and were stop requests honored?
7. **Coordination and outcomes:** Did plan approval settle the website design before changes? Did workers follow it, and did later corrections repeat decisions already made? Which cases completed the process, and which used an exception or abort?

Compare the calculation results, process observations, exceptions, and coverage limits recorded in the cases. Use timed reports to discuss the work they describe; overall claims about speed or cost need measurements of those quantities.
