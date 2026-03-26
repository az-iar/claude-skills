Identify business logic in Laravel controllers, services, or other classes and refactor it into the Action class pattern.

## Action Pattern Reference

```php
<?php

namespace App\Actions\{Domain};

use App\Actions\AsAction;

class {VerbNoun}
{
    use AsAction;

    public function handle(/* typed params */): mixed
    {
        // Business logic here
    }
}
```

- Invoked via `ActionClass::run(...$args)`
- The `AsAction` trait resolves the class from the service container and calls `handle()`
- Constructor injection is supported for service dependencies
- Organize under `app/Actions/{Domain}/` (e.g. User, Document, Project, Folder)

## AsAction Trait

If `app/Actions/AsAction.php` does not exist in the project, create it before any refactoring:

```php
<?php

namespace App\Actions;

trait AsAction
{
    public static function run(...$args)
    {
        abort_if(! method_exists(static::class, 'handle'), 400, 'Method handle not found: '.static::class);

        return app(static::class)->handle(...$args);
    }
}
```

## Instructions

0. **Check for AsAction trait.** Before any refactoring, verify `app/Actions/AsAction.php` exists. If it doesn't, create it using the definition above.

1. **Identify the target.** The user will either:
   - Point to a specific file/method to refactor
   - Ask you to scan a controller or directory for business logic

2. **Scan for business logic.** Look for code that should be extracted into actions:
   - Controller methods with more than validation + delegation (fat controllers)
   - Inline business rules, calculations, or domain decisions
   - Duplicated logic across multiple controllers or methods
   - Complex conditionals that encode business rules
   - Direct model manipulation that represents a business operation
   - Service class methods that are single-purpose (good action candidates)

3. **For each identified piece of business logic, report:**
   - **Location**: file path and line numbers
   - **Current behavior**: what the code does
   - **Suggested action name**: using VerbNoun convention (e.g. `CheckUserAccess`, `CreateProject`)
   - **Domain**: which subdirectory it belongs in (User, Document, Project, etc.)
   - **Dependencies**: any services needed via constructor injection
   - **Signature**: proposed `handle()` method signature with types

4. **Present the findings** as a numbered list and ask the user which ones to refactor.

5. **When refactoring:**
   - Create the action class file in the correct domain directory
   - Extract the business logic into the `handle()` method
   - Replace the original code with `ActionClass::run(...)` call
   - Keep controllers thin: validate, authorize, delegate to action, return response
   - Preserve existing tests — update them to test the action directly if needed
   - If logic is duplicated, consolidate into the single action

## Rules

- Never change behavior during refactoring. The output must be identical before and after.
- One action = one business operation. Don't create god-actions that do multiple things.
- Use the `AsAction` trait — create it if missing, but do not create a new base class.
- Name actions as VerbNoun: `CreateProject`, `CheckStorageLimit`, `AttachDocumentsToProject`.
- Place actions in the appropriate domain directory under `app/Actions/`.
- If a suitable domain directory doesn't exist, create one.
- Keep `handle()` parameters explicit and typed — avoid passing request objects into actions.
- If the argument is a file or directory path, read and analyze it before reporting.
- If no argument is given, ask the user which file or directory to analyze.
