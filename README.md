# Claude Code Skills

Custom slash commands for [Claude Code](https://claude.ai/code).

## Skills

| Command | Description |
|---|---|
| `/tag` | Create and push a semver git tag. Auto-detects bump type from conventional commits. |
| `/pr` | Create a pull request with auto-generated title and summary from commits. |
| `/check` | Run pre-push quality checks (pint, stan, format, lint, tests). |
| `/sync` | Sync `main` and `dev` branches by merging and pushing. |
| `/clean-worktrees` | Remove all git worktrees under `.claude/worktrees/`. |

## Install

```bash
bunx @az-iar/claude-skills
```

or

```bash
npx @az-iar/claude-skills
```

## Uninstall

```bash
bunx @az-iar/claude-skills uninstall
```

## Update

Re-run the install command to update to the latest version:

```bash
bunx @az-iar/claude-skills@latest
```
