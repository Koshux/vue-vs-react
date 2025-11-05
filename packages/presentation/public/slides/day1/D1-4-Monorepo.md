D1.4: Monorepo with pnpm
branch: day-1/03-workspaces

### What is a Monorepo?

A single repository containing multiple, distinct projects (or "packages").

- **Why?** Simplified dependency management (via `pnpm workspaces`) and easy code sharing (e.g., a shared `ui-library` package).
- **Our Structure:** `vue-app`, `react-app`, and `presentation` all live in one repo.

---

### Key `pnpm` Commands

Our root `pnpm-workspace.yaml` file tells `pnpm` to manage the `packages/*` directory.

- `pnpm -r <command>`
  - Runs a command **r**ecursively in all packages (e.g., `pnpm -r build`).
- `pnpm -F <package-name> <command>`
  - **F**ilters the command to run in _only one_ package (e.g., `pnpm -F vue-app add axios`).

---

### Your Task

Let's practice. Run these commands from the **root** of the monorepo:

1.  `pnpm -F vue-app add axios`
2.  `pnpm -F react-app add axios`
    (We'll use this later for data fetching).
