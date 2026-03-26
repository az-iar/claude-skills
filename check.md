Run the pre-push checklist to verify code quality before pushing.

## Instructions

Run the following commands in order. Stop and report if any step fails.

1. `vendor/bin/pint --dirty --format agent` — PHP code formatting
2. `composer stan` — PHPStan static analysis
3. `bun format` — Frontend formatting
4. `bun lint:fix` — Frontend lint fixes
5. `php artisan test --compact` — Run tests

After all steps pass, show a summary of results.

## Rules

- If pint or lint:fix made changes, list the modified files so the user can review and stage them.
- If tests fail, show the failing test names and relevant error output.
- If a command is not applicable (e.g. no PHP files changed, no frontend files changed), skip it and note that it was skipped.
- Do not commit or push anything — this is a read-only check.
