## D3.0: Team Workflows

**branch:** `(N/A - Concept)`

### Goal: Predictable, Safe Code Integration

How do we prevent 10 developers working on the same project from breaking each other's code? We use a **branching strategy**.

---

### Two Main Strategies

<div class="d-flex">
<div class="col">
<h4>🌳 Trunk-Based</h4>

- **Default:** The `main` (or "trunk") branch.
- **Workflow:**
  1. Create a short-lived feature branch (e.g., `feat/add-login`).
  2. Commit and push to that branch.
  3. Open a Pull Request (PR) to merge back into `main`.
  4. CI/Tests pass, it's merged.
- **Result:** Everyone is always < 1 day out of sync with `main`.
- **Relies On:** Strong automated testing and CI/CD.
</div>
<div class="col">
<h4>🔀 Git Flow</h4>

- **Default:** The `develop` branch.
- **Workflow:**
  1. Create a `feature/` branch from `develop`.
  2. When done, merge back into `develop`.
  3. To deploy, you create a `release/` branch from `develop`.
  4. After testing, `release/` is merged into `main` (for prod) AND back into `develop`.
- **Result:** Very rigid, structured, and complex.
- **Relies On:** Strict processes; good for versioned software (e.g., v1.0, v2.0).
</div>
</div>

---

### Our Choice: Trunk-Based Flow

- For modern web apps with CI/CD (like Vercel/Netlify deploy-on-push), **Trunk-Based Flow is the standard.**
- **Git Flow** is too complex for our needs.

### Your Task

- **(Discussion):** If everyone merges to `main` constantly, how do we protect it?
- **Answer:** We automate our quality checks. This is the "why" for the rest of today.
- We will use **Husky** and **lint-staged** to _block_ bad code from _ever_ being committed, protecting our trunk.
