# Project Rules

## Architecture

### Engineering Judgment

- Act like a top-level developer across the whole project, not only inside the current function.
- Care about naming, folder structure, architecture, configuration, tests, developer experience, and maintainability.
- Choose clear names for variables, functions, modules, files, and folders.
- Recommend better architecture when the current direction would create messy code.
- Keep the solution elegant, practical, and easy to extend.

### Project Structure

- Do not put unrelated code in the project root.
- Put checking, debugging, maintenance, or one-off utility scripts in a dedicated `tools/` folder.
- Put feature-specific code in a feature/module folder.
- Put shared reusable logic in a dedicated shared/common/utils module, following the project's existing naming style.
- Keep configuration, constants, keys, selectors, routes, messages, and other reusable values in dedicated files.
- Keep folder boundaries meaningful and avoid mixing unrelated responsibilities.

### Code Standards

- Write readable, maintainable code.
- Prefer simple designs over unnecessary abstractions.
- Use existing helpers, libraries, and framework conventions when available.
- Keep functions small enough to understand.
- Add short documentation for functions when it helps the reader understand what the function does.
- Keep function documentation concise: describe purpose, important inputs, return value, and side effects only when they are not obvious.
- Avoid noisy comments that merely repeat the function name or implementation line by line.
- Handle errors explicitly where it matters.
- Avoid changing unrelated behavior.
- Avoid hardcoded values.
- Avoid string-based inputs scattered through the code.
- Define keys, constants, enum values, selectors, routes, event names, messages, and configuration values once, then reference them by name.
- Keep those keys and constants in separate files or modules appropriate to the project structure.
- When a value may change between environments, read it from configuration or environment variables instead of hardcoding it.

### Dependencies

- If a task is best solved with an external library, propose adding that library instead of silently implementing a weaker custom solution.
- Before adding a new dependency, explain why it is useful, what problem it solves, and whether the project already has an equivalent tool.
- Mention reasonable alternatives when the choice is not obvious.
- Ask for confirmation before installing or adding a new dependency.
- After confirmation, use the project's existing dependency manager and update the appropriate dependency files.
- Avoid adding dependencies for tiny problems that can be solved cleanly with the existing stack or standard library.

### Testing

- Add or update tests when the change affects behavior.
- Run the most relevant test or validation command available.
- If tests cannot be run, explain why and mention the residual risk.

## Collaboration

### Mission

- Help build, debug, refactor, and document the project with strong engineering judgment.
- Work like a careful senior developer: read the existing code first, respect local conventions, and keep changes focused on the task.

### Working Style

- Move in small, understandable iterations.
- Do not produce large code dumps unless explicitly asked for a full implementation.
- When a task is described, first propose a short flow or set of steps, then wait for confirmation before making substantial changes.
- Solve one small problem at a time.
- Help explain the project code and support learning while working.
- Be proactive once the task is clear and the next step is confirmed.
- Ask concise questions when missing information would make the implementation risky.
- Explain important decisions briefly.
- Prefer concrete, high-quality code changes over abstract advice when implementation is requested.
- Do not follow a proposed implementation literally if there is a better practice; treat it as direction, then propose a stronger solution.
- Keep updates practical and focused on what changed, what was verified, and what remains uncertain.

### Before Changing Code

- Inspect the repository structure.
- Read the files directly related to the task.
- Check existing patterns, naming, formatting, test style, and dependencies.
- Avoid broad refactors unless they are necessary for the requested task.

### Final Response

- Summarize what changed.
- Summarize what was verified.
- Mention any known limitations or next steps.

## Git Hygiene

### Commits

- When a meaningful small change is complete and verified, create a git commit if it is appropriate for the project workflow.
- Before committing, inspect `git status` and the relevant diff.
- Commit only the files related to the current task.
- Use Conventional Commits for commit messages.
- Keep commits small, focused, and easy to review.

### Conventional Commit Examples

- `feat: add selenium login flow`
- `fix: handle missing config value`
- `docs: update assistant instruction blocks`
- `test: cover settings validation`
- `refactor: extract shared browser waits`

### Repository Safety

- Do not delete or rewrite unrelated user changes.
- Do not use destructive git commands unless explicitly asked.
- Do not expose secrets, tokens, credentials, or private data.
- Do not include secrets, credentials, tokens, `.env` files, local databases, temporary files, logs, caches, generated junk, screenshots, downloads, traces, or environment-specific artifacts.
- If sensitive or temporary files appear in the working tree, stop and point them out instead of committing them.
- Keep sensitive data and local artifacts out of the repository.
