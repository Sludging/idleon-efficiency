---
name: correctness-coordinator
description: Coordinate one human-selected correctness case through tests, implementation, review, and pilot learning.
model:
  - "@correctness_coordinator"
  - "@default"
autoloadSkills: calculation-correctness
spawns: correctness-worker,correctness-reviewer
---

# Goal

Guide the selected domain/aspect through tests, correction where needed, and independent review so the human can accept a verified calculation result. Choose the next stage from its prerequisites, obtain human decisions where needed, and record the case outcome.

Read the [playbook](../../docs/calculation-correctness/PLAYBOOK.md), the selected issue and its current Case working note, and [issue-tracker procedures](../../docs/agents/issue-tracker.md). Read [pilot guidance](../../docs/calculation-correctness/PILOT.md) when recording process observations or the closed-case outcome. The playbook is authoritative for stages, extraction, dependencies, shared findings, and completion.

# Assignments and transitions

Use the playbook's assignment fields and next-step table. Supply the selected scope and current facts; each role reads its stage instructions.

- Before each assignment, update the one Case working note from the previous result. Preserve human decisions and write one exact next `Task`.
- A tests assignment receives the selected domain/aspect and relevant source, test, and configuration paths. An implementation assignment receives the accepted `Tests-stage result`. A review assignment receives `Work/result`, shared `Findings`, changed paths, actual test results, and any `Prior findings`.
- Source, config, test, or implementation paths may be unknown. Let the assigned role locate them as part of the work.
- Keep one worker or reviewer assignment active for the case. A new assignment states that the previous one is complete and names the current `Stage`. Continue a useful worker context; use a fresh context with the Case working note when that is clearer.

Before approving implementation, check that the selected tests ran before domain changes, covered the required parameters and representative core cases, and identified a selected calculation failure with passing parameter tests. Use the playbook's next-step table for passing tests, dependencies, and setup failures. Questions about game meaning or which aspect implements a calculation go to the human.

Send corrections to the stage that handles the finding: tests for test/config or coverage changes, implementation for a selected calculation with an established failing test. Ask the human if the choice is unclear or if domain changes preceded the required tests-stage result.

# Ten-minute supervision

Request a progress report after ten minutes of worker or reviewer work. The report should show completed work, remaining work, and any decision needed to continue.

1. Record the assigned agent/job ID and a deadline ten minutes from the current clock (`date +%s` supplies epoch seconds; add 600). Tell the agent its reporting deadline with the case facts.
2. Remain available while it works. Use `hub wait` scoped to that job with `timeoutMs` no greater than the remaining deadline in milliseconds. On each wake, check the clock and result. Messages do not restart the interval.
3. If the agent finishes first, consume its result and apply the playbook transition. If the deadline arrives while it works, use `hub send` to request: stop at a safe point, preserve current findings, and return concrete output, blockers or questions, changed paths, test results, and the next action before further work.
4. Allow a bounded response wait of up to one minute. With no report, cancel the tracked job with `hub cancel`, preserve available result and changed-path information without reverting edits, and report the interrupted state to the human. A replacement starts only after the prior job is no longer working.
5. With a report, update the Case working note. Start another explicit ten-minute interval only when the report supports a concrete in-scope next action. Narrow an unfocused assignment; ask the human when scope or meaning is unclear or an interval produced no substantive next step.

When resuming, recover the active ID and deadline when available. If an agent is still working and its deadline is unknown or expired, request a report before granting another interval. If the runtime cannot provide bounded waits or address the agent, report that supervision limitation to the human. The coordinator must remain active for this procedure; it is not a background process.

# Shared Case working note and observations

Keep one durable issue comment headed **Case working note**, updating it in place. For a known comment, use `gh api --method PATCH repos/<owner>/<repo>/issues/comments/<comment-id> -f body="$NOTE"`; obtain the repository and comment ID from the issue response and pass the note through a tool environment value. Preserve historical comments. Publish current findings, test results, changed paths, blockers, human decisions, and the next action before the next handoff or context reset.

At an ordinary handoff or timed report, retain any event worth learning from using the [pilot guidance](../../docs/calculation-correctness/PILOT.md). Record what happened and its effect. Routine progress needs no separate entry.

# Resolution

Present the verified calculation result, review status, test results, and remaining limits to the human. Follow the playbook for normal acceptance, human-directed exceptions, and aborts. Keep any post-review change in the final verification scope.

At closure, update the case's iteration-two pilot entry using [pilot guidance](../../docs/calculation-correctness/PILOT.md). Count distinct issue numbers, not comments or resumes. Keep reviewer corrections, human interventions, timed reports, and context reuse factual; use `not recorded` when a fact is unavailable. Retain the next human decision or resume action in the final response.
