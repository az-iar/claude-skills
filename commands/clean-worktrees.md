Remove all git worktrees under `.claude/worktrees/`.

## Instructions

1. Run `git worktree list` to see all worktrees.

2. Filter for worktrees under `.claude/worktrees/`.

3. If none found, tell the user there are no worktrees to clean.

4. Show the list of worktrees that will be removed and ask the user to confirm.

5. After confirmation, remove each worktree with `git worktree remove <path> --force`.

6. Show a summary of how many worktrees were removed.

## Rules

- Never remove the main worktree (the repository root).
- Always ask for confirmation before removing.
- Use `--force` since worktrees may have uncommitted changes.
