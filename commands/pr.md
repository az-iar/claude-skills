Create a pull request for the current branch.

## Instructions

1. Run `git status` to check for uncommitted changes. If there are changes, ask the user if they want to commit first.

2. Determine the current branch name. If on `main` or `dev`, stop and tell the user to create a feature branch first.

3. Run `git log --oneline main..HEAD` to get all commits on this branch.

4. Analyze the commits to generate:
   - A short PR title (under 70 chars) based on the overall change
   - A summary with 1-3 bullet points
   - A test plan checklist

5. Check if the branch has been pushed to the remote. If not, push with `-u`.

6. Show the user the PR title and summary, and ask for confirmation.

7. Create the PR using `gh pr create` targeting `main` as the base branch.

8. Return the PR URL.

## Rules

- Base branch is `main` unless the user specifies otherwise via argument (e.g. `/pr dev`).
- Use conventional commit style for the PR title (e.g. `feat:`, `fix:`, `refactor:`).
- Always include the test plan section in the PR body.
- If there's only one commit, use its message as the PR title.
