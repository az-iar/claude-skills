Sync branches by merging main into dev (or vice versa) and pushing.

## Instructions

1. Run `git branch --show-current` to check the current branch.

2. Determine the sync direction:
   - If on `dev`: pull latest `dev`, then pull latest `main`, merge `main` into `dev`, and push `dev`.
   - If on `main`: pull latest `main`, then pull latest `dev`, merge `dev` into `main`, and push `main`.
   - If an argument is provided (e.g. `/sync main-to-dev`), use that direction regardless of current branch.

3. Before merging, show the user what commits will be merged.

4. If there are merge conflicts, stop and list the conflicting files. Do not auto-resolve.

5. After a successful merge and push, show a summary.

## Rules

- Always pull both branches before merging to ensure they're up to date.
- Never force-push.
- If the current branch is not `main` or `dev`, ask the user which direction to sync.
