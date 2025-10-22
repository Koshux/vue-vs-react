Hour 3: Team Best Practices & Tooling

Goal: Consistency & Quality

When working in a team, consistent code is predictable, readable, and maintainable code. Tooling helps us enforce this automatically.

Version Control Workflow

<div class="d-flex">
<div class="col">
<h4>Git Flow</h4>
- Older, more rigid model.
- develop, feature, release, hotfix branches.
- Can be overly complex for web apps.
</div>
<div class="col">
<h4>Trunk-Based Flow</h4>
- Modern, simpler approach.
- Everyone commits to a single main branch.
- Relies on feature flags and strong CI/CD.
- Most common for CI/CD environments.
</div>
</div>

Code Quality Tooling

ESLint: A linter that finds and fixes problems in your JavaScript/TypeScript code.

Prettier: An opinionated code formatter. It formats your code for you on save, ending all debates about style.

stylelint: A linter for your CSS/SCSS.

--

Automating Quality Checks

Husky: A tool that makes it easy to run scripts on git hooks (e.g., pre-commit).

lint-staged: A tool that runs your linters only on the files you've changed (staged in git).

Workflow: On git commit, Husky triggers lint-staged, which runs ESLint and Prettier on your changes. Your commit is blocked if there are errors.

Commit Message Conventions

Conventional Commits: A specification for adding human and machine-readable meaning to commit messages.

Format: type(scope): subject (e.g., feat(auth): add password reset page)

Commitizen: A command-line tool that prompts you to fill out a commit message in the correct format.

Continuous Integration (CI)

GitHub Actions: A platform to automate your workflows right from GitHub.

Common Workflow:

On every Pull Request:

pnpm install

Run linters (eslint, prettier --check)

Run unit tests

Build the project

This ensures that broken code never gets merged to main.
