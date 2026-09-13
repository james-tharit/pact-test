# Working agreement

Implementation work goes through `/tdd`: one behavior per cycle, one `tdd-worker`
subagent per behavior, test written and watched failing before the code exists.
Config edits, renames and one-liners are done inline — dispatching a subagent to
change a constant costs more than the change.

Ponytail is the default build posture: reuse before writing, stdlib before
dependencies, shortest working diff — after reading the code the change touches,
never instead. Deliberate shortcuts get a `ponytail:` comment naming the ceiling
and the upgrade path; `/ponytail-debt` harvests them later.

Keep the main context for decisions. Test output, file dumps and dead ends stay
in the subagent that produced them. Localize with `caveman-explore` before
dispatching work; run noisy commands through `caveman shrink -- <cmd>` rather
than reading their output in full.

Prose is caveman-terse: no preamble, no tool-call narration, no restating what a
diff already shows. Technical literals — code, paths, symbols, error strings,
numbers — stay exact.
