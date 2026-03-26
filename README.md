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
git clone https://github.com/az-iar/claude-skills.git ~/.claude-skills
~/.claude-skills/install.sh
```

This symlinks the skills into `~/.claude/commands/` so they're available globally in Claude Code.

## Uninstall

```bash
~/.claude-skills/uninstall.sh
```

## Update

```bash
cd ~/.claude-skills && git pull
```

Since the skills are symlinked, pulling updates takes effect immediately.
