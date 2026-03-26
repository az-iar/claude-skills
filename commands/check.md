Run the pre-push checklist to verify code quality before pushing.

## Instructions

### 0. Install dependencies if missing

- If `vendor/` directory is missing or `composer.lock` is newer than `vendor/`, run `composer install`
- If `node_modules/` directory is missing or `bun.lock` is newer than `node_modules/`, run `bun install`
- Check each tool is available and install if missing:
  - `vendor/bin/pint` — `composer require laravel/pint --dev`
  - `vendor/bin/phpstan` — `composer require larastan/larastan --dev`
  - `vendor/bin/pest` — `composer require pestphp/pest --dev`
  - `bunx oxlint --version` fails — `bun add -d oxlint`

### 1. Run checks in order. Stop and report if any step fails.

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
