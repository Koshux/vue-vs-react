D3.1: Team Tooling

branch: day-3/00-tooling

Goal: Enforce code quality and consistency before it gets committed.

The Toolchain

ESLint: Finds syntax and style errors in JavaScript/TypeScript.

Prettier: An opinionated code formatter. It formats your code on save.

Husky: Runs scripts (like tests or linters) at different git stages (e.g., pre-commit).

lint-staged: Runs linters only on the files you've staged for commit. This is fast and efficient.

--

How It Works

You run git commit.

Husky triggers the pre-commit hook.

The hook runs lint-staged.

lint-staged runs eslint --fix and prettier --write on all staged .vue and .tsx files.

If there are no errors, the commit proceeds.

Your Task

In both projects:

Install husky and lint-staged.

Configure husky to run lint-staged on pre-commit.

Configure lint-staged to run eslint on all staged files.

Make an intentional lint error in a file, try to commit it, and watch it fail.
