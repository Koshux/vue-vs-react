## D1.4: Our Monorepo Stack (Layer 1: PNPM)

**branch:** `day-1/03-workspaces`
<br />
<br />

### Layer 1: The Package Manager

#### What is a Monorepo?

A single repository containing multiple, distinct projects (or "packages").

- **Why?**
  - Simplified dependency management (via `pnpm workspaces`)
  - Easy code sharing (e.g., a shared `ui-library` package).
- **Our Structure:**
  - `vue-app`, `react-app`, and `presentation` all live in one repo.

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
    (We'll test this out later for data fetching, including fetch).

---

## D1.4: Our Monorepo Stack (Layer 2: Turborepo)

### Layer 2: The Task Orchestrator

**Turborepo** is our "smart" task runner. It sits _on top_ of PNPM.

- **Why?** It's built for **speed**.
- **Caching:** If we run `turbo build` and the code hasn't changed, it restores the `dist` folder from cache instantly.
- **Pipelining:** It understands task dependencies (e.g., `build` must finish before `test`).
- **Parallelism:** It runs tasks like `lint` for all packages at the same time.

We define all our tasks in a single `turbo.json` at the root.
