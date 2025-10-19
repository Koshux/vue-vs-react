<template>
  <section>
    <section data-markdown>
      <textarea data-template>
## Hour 1: Project Setup & Architecture
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
### Build Tools: The "Why"
- **Challenge:** Browsers don't understand Vue SFCs, JSX, TypeScript, or modern JS syntax out-of-the-box.
- **Solution:** We need a build tool to compile, transpile, and bundle our code into standard HTML, CSS, and JS.
      </textarea>
    </section>
    <section data-markdown>
      <textarea data-template>
### The Old Way vs. The New Way
<div class="d-flex">
    <div class="col">
        <h4>Legacy (webpack-based)</h4>
        - Vue CLI
        - Create React App (CRA)
        - **Process:** Bundles the *entire app* before starting.
        - **Result:** Slower dev server start, slower updates (HMR).
    </div>
    <div class="col">
        <h4>Modern (Native ESM)</h4>
        - **Vite**
        - **Process:** Serves files on demand using native browser ESM support.
        - **Result:** Near-instant dev server start, lightning-fast HMR.
    </div>
</div>
      </textarea>
    </section>
      <section data-markdown>
      <textarea data-template>
### Monorepo Strategy
- **What:** Managing multiple projects/packages in one single repository.
- **Tools:** `pnpm workspaces`, Turborepo, Nx.
- **Why?**
    - Simplified dependency management (pnpm is great for this).
    - Easy to share code (UI components, utils).
    - Consistent tooling (ESLint, Prettier).
- **Our Structure:** `presentation`, `vue-app`, `react-app`.
      </textarea>
    </section>
  </section>
</template>
