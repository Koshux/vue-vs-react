## D1.2: Vite in Vue & React

<!-- branch: day-1/01-vite-basics -->

### Build Tools: The "Why"

_Browsers don't understand Vue SFCs, JSX, or TypeScript._

We need a build tool to compile, transpile, and bundle our code into standard HTML, CSS, and JS.

---

### Legacy vs. Modern

<div class="d-flex">
<div class="col">
<h4>Legacy (webpack-based)</h4>

- Vue CLI / Create React App (CRA)
- **Process:** Bundles the _entire app_ before starting.
- **Result:** Slower dev server start, slower updates.
</div>
<div class="col">
<h4>Modern (Native ESM)</h4>
- **Vite**
- **Process:** Serves files on demand using native browser ESM.
- **Result:** Near-instant dev server start, lightning-fast HMR.
</div>
</div>

---

### Your Task

**Demo:** Let's look at the `vite.config.ts` in both the `vue-app` and `react-app` to see the minimal plugin setup.
