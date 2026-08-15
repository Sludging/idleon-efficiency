# Minimal agentic workflow patterns for v0

## Question and scope

Which primary-source workflow patterns validate or challenge a deliberately minimal first pilot built around supervised execution, durable tracker checkpoints across sessions, explicit human escalation, evaluator feedback, and deliberate learning promotion?

This note evaluates only those five choices. It does not compare agent frameworks, prescribe libraries, or redesign the repository workflow.

## Sourced findings

### 1. Prefer a bounded workflow until autonomy earns its complexity

Anthropic distinguishes **workflows**, whose LLM/tool paths are predefined, from **agents**, which dynamically direct their own process. It recommends the simplest viable solution, says workflows give predictable and consistent behavior for well-defined tasks, and warns that autonomous agents add cost and the risk of compounding errors. It also says complexity should be added only when it demonstrably improves outcomes.[^anthropic-effective-agents]

**What this validates:** a supervised, bounded workflow is an appropriate v0 when the target and success evidence can be stated up front.

**What this challenges:** “agentic” should not imply an open-ended loop or speculative multi-agent choreography. The first pilot should gather evidence before adding either.

### 2. Cross-session continuity needs explicit durable state

Anthropic reports that a new long-running-agent session begins without memory of previous sessions, and that compaction alone did not reliably carry a clean handoff. Its experiment used a progress file plus git history, incremental one-feature sessions, descriptive commits, and an end-of-session progress update so the next session could recover current state without guessing.[^anthropic-long-running]

The same source explicitly limits the strength of that evidence: the demonstration was optimized for full-stack web development, and whether its findings generalize to other domains remains an open question.[^anthropic-long-running]

**What this validates:** a durable tracker checkpoint is not administrative duplication; it is the cross-session handoff. The tracker and repository proof have different jobs: the tracker records work state and unresolved evidence, while commits/tests record repository state and verified outcomes.

**What this challenges:** copying Anthropic's exact files or initializer/coding-agent split would outrun the evidence. Preserve the pattern—small increments and explicit handoff artifacts—not its example scaffolding.

### 3. Escalation should have named triggers, not depend on model discretion alone

OpenAI identifies human intervention as especially important early in deployment and names two primary triggers: exceeding a retry/action failure threshold, and attempting sensitive, irreversible, or high-stakes actions. It recommends gracefully transferring control when the agent cannot complete the task.[^openai-guide]

Anthropic similarly says an executing agent should obtain ground truth from the environment, may pause for human judgment at checkpoints or blockers, and should have stopping conditions such as a maximum iteration count.[^anthropic-effective-agents]

**What this validates:** stop-and-ask behavior is part of the control loop, not an exceptional failure path.

**What this challenges:** “ask when uncertain” is too vague. A pilot needs observable escalation conditions, while avoiding approval gates on routine reversible work.

### 4. Evaluator feedback is useful only against explicit criteria and observable outcomes

Anthropic's evaluator-optimizer pattern is a feedback loop between generation and evaluation. Anthropic says it fits when evaluation criteria are clear and iterative refinement has measurable value—not merely whenever a second opinion is available.[^anthropic-effective-agents]

For agent evals, Anthropic distinguishes the transcript from the outcome and gives the example that an agent's claim that a booking succeeded is not proof that the reservation exists. It recommends deterministic graders where possible, model graders where necessary, and human judgment for subjective cases; model-based grading requires calibration against human graders.[^anthropic-evals]

**What this validates:** evaluator feedback should check the changed calculation against independently observable evidence, not accept the worker's completion narrative.

**What this challenges:** adding an evaluator role by itself does not improve correctness. Without a clear root target, stable evidence, and a pass/fail rule, evaluator feedback is ungrounded ceremony.

### 5. Learning should be recorded freely but promoted conservatively

Anthropic notes that agent behavior varies between trials and recommends multiple trials when estimating performance. It separates capability evals from regression evals and says a capability eval can “graduate” into a continuously run regression suite after the agent is optimized and the eval reaches a high pass rate.[^anthropic-evals]

**What this validates:** captured pilot observations and durable methodology are different states. Recording every completed or aborted pilot is compatible with requiring stronger evidence before changing the standing method.

**What this challenges:** one successful or failed run is not enough to infer a general rule from a nondeterministic system. Automatic promotion from a single review would turn anecdotes into policy.

## Recommendations for the first pilot

The following are **recommendations derived from the cited findings**, not claims made verbatim by the sources:

1. **Keep one supervised case active.** Give it a named root target, explicit success evidence, and a bounded execution loop. Do not add coded orchestration or specialist roles before a pilot exposes a real need.
2. **Make the issue the resumable checkpoint.** At each pause or session boundary, record the target, current state, evidence checked, last verified outcome, unresolved question or blocker, and the next safe action. Keep passing tests and commits as proof rather than reproducing their detail in the tracker.
3. **Define escalation before execution.** Stop for missing evidence or authority, contradictory live/static sources, an action outside the approved target, an irreversible/high-impact action, or a small fixed threshold of repeated failed attempts. The human resolves the decision; the agent resumes from the durable checkpoint.
4. **Evaluate outcomes, not narratives.** Compare the root calculation with the current coherent live/save snapshot and relevant tests. Use deterministic checks where available; reserve model critique for diagnosis and human judgment for ambiguous authority or acceptance decisions.
5. **Separate observation from promotion.** Append a short learning review after every outcome. Mark a proposed workflow change as a candidate until it is supported by repeated pilots or by independent evidence plus human review; when promoted, preserve a regression check or explicit standing rule where feasible.

## Answer

The primary-source patterns validate the proposed minimal v0 with two qualifications: checkpoints must carry enough state to resume without guessing, and escalation/evaluation must be tied to explicit triggers and observable outcomes. They challenge adding autonomy, agent roles, or automatic learning promotion before measured pilot evidence shows value. The only pre-pilot additions worth adopting are a compact checkpoint schema, named escalation triggers including a retry bound, outcome-based evaluation criteria, and a reviewed candidate-to-durable learning step.

## Primary sources

[^anthropic-effective-agents]: Anthropic, [“Building effective agents”](https://www.anthropic.com/engineering/building-effective-agents), December 19, 2024. See “What are agents?”, “When (and when not) to use agents”, “Evaluator-optimizer”, “Agents”, and “Combining and customizing these patterns”.
[^anthropic-long-running]: Anthropic, [“Effective harnesses for long-running agents”](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), November 26, 2025. See “The long-running agent problem”, “Incremental progress”, “Getting up to speed”, and “Future work”.
[^openai-guide]: OpenAI, [“A practical guide to building agents”](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/), see “Plan for human intervention”.
[^anthropic-evals]: Anthropic, [“Demystifying evals for AI agents”](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), January 9, 2026. See “The structure of an evaluation”, “Types of graders for agents”, “Capability vs. regression evals”, and “How to think about non-determinism in evaluations for agents”.
