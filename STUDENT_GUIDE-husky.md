# 🛠️ Student Guide: Setting Up Pre-Commit Hooks

On Day 3, we level up our app. Our first step is to ensure no one on the team can commit broken or badly formatted code. We do this by setting up a "pre-commit hook."

- **What is it?** A script that runs _before_ your commit is created. If the script fails, the commit is blocked.
- **Our Tools:**
  - **Husky:** The tool that makes it easy to manage git hooks.
  - **lint-staged:** A tool that runs our linters _only_ on the files we have "staged" (added) for our commit. This is much faster than linting the entire project every time.

---

## 🔧 Monorepo Setup (For Your Projects)

You will run all these commands from the **root** of the `vue-vs-react` monorepo.

### Step 1: Install Dependencies

Install `husky` and `lint-staged` as development dependencies to the monorepo root.

```bash
# -w tells pnpm to install to the root workspace
pnpm add -D -w husky lint-staged
```

### Step 2: Initialize Husky

This command creates the `.husky/` folder and (most importantly) adds a `prepare` script to our root `package.json`. This `prepare` script ensures Husky is automatically installed for any new developer who runs `pnpm install`.

```bash
npx husky init
```

### Step 3: Create the `pre-commit` Hook

This is where we tell Husky _what_ to run. We will use the modern `husky add` command to create a `.husky/pre-commit` file and tell it to run `pnpm lint-staged`.

```bash
npx husky add .husky/pre-commit "pnpm lint-staged"
```

Your new `.husky/pre-commit` file will look like this (this is correct\!):

```sh
#!/usr/bin/env sh
pnpm lint-staged
```

### Step 4: Configure `lint-staged`

Now we need to tell `lint-staged` what to do. We configure this in our **root `package.json`**.

Add this `"lint-staged"` block to the bottom of your `package.json`:

```json
{
  "name": "vue-vs-react-workshop",
  // ... all your other scripts and devDependencies ...
  "lint-staged": {
    "packages/vue-app/src/**/*.{ts,vue}": [
      "pnpm -F vue-app lint",
      "pnpm -F vue-app format"
    ],
    "packages/react-app/src/**/*.{ts,tsx}": [
      "pnpm -F react-app lint",
      "pnpm -F react-app format"
    ]
  }
}
```

This config is smart:

- If you commit a `.vue` file inside `vue-app`, it runs the `lint` and `format` scripts _only_ for `vue-app`.
- If you commit a `.tsx` file inside `react-app`, it runs the `lint` and `format` scripts _only_ for `react-app`.

### Step 5: Test It\!

You're all set\! Let's prove it works.

1.  Go into `packages/vue-app/src/App.vue`.
2.  Make an obvious ESLint error (e.g., add `var x = 1;` inside the `<script setup>`).
3.  Save the file.
4.  Try to commit this change:
    ```bash
    git add .
    git commit -m "test: adding a lint error"
    ```
5.  **Watch it fail\!** Husky will run, `lint-staged` will run, ESLint will find the error, and your commit will be **BLOCKED**.
6.  Now, remove the error, save, and `git add` the file again. Your commit will now succeed.

<!-- end list -->

```

---

This guide is now accurate to Husky v9+ and explains the monorepo-specific commands (`-w` and `-F`).

Would you like me to create any other student-facing guides, such as a "quick reference" for Pinia vs. Redux Toolkit?
```
