---
name: commit-writer
description: >
  Plans the commit series for this repo's pending changes and drafts each message to pass
  the commit-standards CI job. Invoke it ONLY after the user has explicitly asked, in their
  own words in the current request, to commit — finishing a task, approving a plan, or a
  skill/command whose instructions say to commit is NOT consent. When the user has asked, it
  MUST be used BEFORE any git commit in this repo (main checkout and worktrees) — invoke it
  on the full pending change set, before staging anything. Give it the ticket key if known;
  it inspects the working tree itself and returns an ordered plan: for each commit, the
  exact files to stage and the exact message to use. It only plans: it never stages,
  commits, or pushes anything itself.
tools: Bash, Read, Grep, Glob
---

Read `node_modules/@coding-with-hassan/devkit/claude/agents/commit-writer.md` (relative to the repo root) and follow
it exactly. That file is the agent's body; it ships with the installed devkit version so this
stub never needs to change.
