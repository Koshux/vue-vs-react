## D3.1: Team Tooling & Automation (Time: 30 mins)

branch: day-3/00-tooling

### Goal: Code Consistency

When working in a team, consistent code is readable and maintainable. We use tools to enforce quality _automatically_ before code is ever committed.

---

### The Toolchain

- **ESLint**: A linter that finds syntax errors and style issues in your code.
- **Prettier**: An opinionated code _formatter_. It ends all debates about tabs vs. spaces by automatically reformatting your code on save.
- **Husky**: A tool that runs scripts during `git` hooks (like `pre-commit`).
- **lint-staged**: Runs your linters _only_ on the files you've staged for commit, making the check extremely fast.

---

### How It Works

1.  You run `git commit`.
2.  **Husky** intercepts this and triggers a `pre-commit` hook.
3.  The hook runs **lint-staged**.
4.  `lint-staged` runs `eslint --fix` and `prettier --write` on all your staged `.vue` and `.tsx` files.
5.  If there are no errors, the commit proceeds. If there are, the commit is blocked.

---

### Your Task

In both projects:

1.  Install `husky` and `lint-staged`.
2.  Configure `husky` to run `lint-staged` on `pre-commit`.
3.  Configure `lint-staged` in `package.json` to run `eslint --fix` on staged files.
4.  Make an intentional lint error in a file, try to commit it, and watch it fail.
