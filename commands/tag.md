Create and push a new semver git tag based on conventional commits.

## Instructions

1. Run `git tag --sort=-version:refname | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1` to get the latest tag.

2. Run `git log --pretty=format:"%s" "<latest_tag>..HEAD"` to get all commits since the last tag.

3. Determine the bump type from commit messages:
   - **major**: any commit contains `BREAKING CHANGE` or uses `!:` (e.g. `feat!:`, `fix!:`)
   - **minor**: any commit starts with `feat:` or `feat(scope):`
   - **patch**: all other commits (e.g. `fix:`, `refactor:`, `chore:`, `docs:`)

4. Show the user:
   - Current latest tag
   - The detected bump type and why (list the relevant commits)
   - The new tag version

5. Ask the user to confirm before proceeding.

6. After confirmation, create the tag and push it:
   ```
   git tag <new_version>
   git push origin <new_version>
   ```

## Rules

- Always ensure you are on the `main` branch and up to date before tagging.
- If there are no new commits since the last tag, inform the user and stop.
- If there is no existing tag, start at `v0.1.0`.
- The user can override the bump type by passing an argument: `/tag patch`, `/tag minor`, `/tag major`, or `/tag v2.0.0` for a custom version.
- Custom versions must match the format `X.Y.Z` (with or without `v` prefix).
- Never force-push tags.
