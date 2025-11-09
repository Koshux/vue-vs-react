## ☀️ Day 3 Facilitator Guide (Revised)

**Goal:** Professionalize the apps with team tooling, write robust tests (unit and E2E), and deploy them to a live URL.
**Total Time:** 240 Minutes (4 Hours)

### D3.0: Team Workflows (15 mins)

- **Slide:** `public/slides/day3/D3-0-Branching.md`
- **Objective:** Introduce Trunk-Based Development as the "why" for automated tooling.

#### 🗣️ Key Talking Points

- "This is a concept-only slide, but it's crucial. How do we stop 10 developers from breaking the `main` branch?"
- "We're using **Trunk-Based Flow**. Everyone merges small, frequent pull requests back to `main`. This avoids the complex merge conflicts of long-running 'Git Flow' branches."
- "But this only works if you have a **strong safety net**. You must _block_ bad code from ever getting into the `main` trunk."
- "This is the 'why' for all of Day 3. Our safety net is:
  1.  **Local Tooling (Husky):** Blocks bad _commits_.
  2.  **CI Pipeline (GitHub Actions):** Blocks bad _merges_.
  3.  **Tests (Vitest, Playwright):** The rules that _define_ 'bad code'."

#### ✅ Live Checkpoints

- [ ] (Discussion only) Ask the group: "What tools have you used to enforce code quality on a team?"

---

### D3.1: Team Tooling & Automation (45 mins)

- **Slide:** `public/slides/day3/D3-1-Tooling.md`
- **Objective:** Enforce code quality automatically with ESLint, Prettier, and git hooks.

#### 🗣️ Key Talking Points

- "This is our **first line of defense**. How do we stop 'style debates' and prevent broken code from _ever leaving your machine_?"
- **ESLint:** This is a **linter**. It finds _problems_ in your code, like unused variables or broken rules.
- **Prettier:** This is a **formatter**. It _only_ cares about style (tabs, spaces, semicolons). It will reformat your code on save.
- **The Problem:** "What if someone ignores the linter and commits bad code?"
- **The Solution:** We automate it with **Git Hooks**. A git hook is a script that runs at a certain git event, like `pre-commit` (before you commit).
- **Husky:** A tool that makes it easy to set up git hooks.
- **lint-staged:** Makes the hook _fast_. We don't want to lint our _entire_ project on every commit. `lint-staged` runs our tools _only_ on the files that are _staged for commit_.
- **The Workflow:** (Show diagram/slide) "You run `git commit` -> Husky triggers `pre-commit` -> The hook runs `lint-staged` -> `lint-staged` runs `eslint --fix` on staged files -> If it passes, the commit is made. If it fails, the commit is blocked."

#### ✅ Live Checkpoints

- [ ] **Task:** "We will set this up in _one_ of the projects. Let's pick `vue-app`."
- [ ] `pnpm -F vue-app add -D husky lint-staged`
- [ ] `npx husky init` (in the `packages/vue-app` directory)
- [ ] **"We Do":** Show them how to edit the `package.json` to add the `lint-staged` config.
- [ ] **"We Do":** Show them how to edit `.husky/pre-commit` to run `npx lint-staged`.
- [ ] **"You Do":** "Your task: Go into a `.vue` file, make an obvious lint error (like `var foo = 'bar'`), save it, stage it, and try to `git commit`. Watch it fail. Then, fix it and commit successfully."

---

### D3.2: Unit Testing (75 mins)

- **Slide:** `public/slides/day3/D3-2-Testing.md`
- **Objective:** Introduce unit testing philosophies, tools (Vitest, VTU, RTL), and mocking.

#### 🗣️ Key Talking Points

- **The Testing Pyramid:** "This is the most famous model in testing.
  - **Unit Tests (Base):** Fast, cheap, and isolated. You should have _lots_ of these. They test one function or component.
  - **Integration Tests (Middle):** Test how multiple components work _together_ (e.g., "does clicking the button in the form add an item to the list?").
  - **E2E Tests (Top):** Slow, expensive, and brittle. They test the _full user journey_. You should have very few of these."
- **Test Runner:** "We're using **Vitest**. It's the modern, Vite-native replacement for Jest. It's incredibly fast and has a compatible API. We use it for _both_ apps."
- **Mocking:** "A key concept. Your unit test must be _isolated_. If your `Button` component's `onClick` prop calls a complex function, we don't want to run that function. We _mock_ it using `vi.fn()` (a "Vitest mock function"). Then, we just assert: 'Was our mock function _called_?'"
- **Vue - Vue Test Utils:**
  - "This is the _official_ library for testing Vue components."
  - "You `mount` the component, which gives you a `wrapper`."
  - "You use `wrapper.find()` to get elements and `wrapper.trigger('click')` to interact. To test events, you check `wrapper.emitted()`.
- **React - React Testing Library (RTL):**
  - "This is the _industry standard_ for React. It has a very important philosophy: **'Test your components the way a user would.'**"
  - "This means you DO NOT find elements by class or ID. You find them by _what the user sees_: their text (`getByText`), their label (`getByLabelText`), or their accessibility role (`getByRole`)."
  - "Why? This makes your tests resilient. You can refactor your CSS or component structure, and as long as the _text_ is the same, your test still passes. **Test behavior, not implementation.**"

#### ✅ Live Checkpoints

- [ ] **Vue Task:**
  - [ ] Open `vue-app/src/components/__tests__/HelloWorld.spec.ts` as an example.
  - [ ] **"You Do":** "Create a new test file for your `Button.vue` component.
    1.  Write a test that `mount`s it with a `label` prop, and `expect` the `wrapper.text()` to contain the label.
    2.  Write a second test that `trigger`s a 'click' and `expect` the `wrapper.emitted()` to have a 'click' event."
- [ ] **React Task:**
  - [ ] Open `react-app/src/__tests__/tasksSlice.test.ts` as an example (this is a _reducer_ test, not a component test).
  - [ ] **"You Do":** "Create a new `Button.test.tsx` file.
    1.  `render` your Button with a `label`. Use `screen.getByText('...')` to assert the label is in the document.
    2.  Create a `vi.fn()` (a mock function), pass it as the `onClick` prop.
    3.  `fireEvent.click()` the button.
    4.  `expect` your mock `onClick` to have been `toHaveBeenCalled()`."

---

### D3.3: End-to-End (E2E) Testing (60 mins)

- **Slide:** `public/slides/day3/D3-3-E2E-Testing.md`
- **Objective:** Explain E2E testing and using Playwright.

#### 🗣️ Key Talking Points

- "This is the top of the pyramid. E2E tests are our **second line of defense** (in CI). They simulate a _full user journey_ in a _real browser_."
- "The test will literally: 1. Launch Chrome. 2. Go to `localhost:5173`. 3. Click the 'About' link. 4. Assert that the text 'pikachu' is on the page."
- **Cypress vs. Playwright:**
  - **Cypress:** The classic, runs _inside_ the browser. Famous for its time-travel debugger.
  - **Playwright:** The modern successor from Microsoft. Runs _outside_ the browser, giving it more control. It's faster and can control Chrome, Firefox, and Safari _all with one API_. We are using Playwright.
- **Selectors:** "How do we find elements? Playwright prefers user-facing selectors, just like RTL. The best way is `getByRole` (e.g., `page.getByRole('link', { name: /about/i })`). This is robust, accessible, and not tied to implementation."

#### ✅ Live Checkpoints

- [ ] **Task:** "Choose _one_ app (e.g., `vue-app`)."
- [ ] Show them `packages/vue-app/e2e/tasks.spec.ts` as an example.
- [ ] **"You Do":** "Your task: Create a new test file `navigation.spec.ts`. Write a test that starts at the home page (`/`), clicks the 'About' link, and asserts that the Pokémon name 'pikachu' (from our D2-2 task) is visible on the page."
- [ ] Run `pnpm -F vue-app test:e2e` to run it. Show the Playwright report.

---

### D3.4: Production & Deployment (45 mins)

- **Slide:** `public/slides/day3/D3-4-Deployment.md`
- **Objective:** Run a production build and deploy both apps to live URLs.

#### 🗣️ Key Talking Points

- "We're done! Now, how do we ship it?"
- **Production Build:**
  - "First, we run `pnpm build`. This tells Vite to _optimize_ our app. It will minify the code, tree-shake unused functions, and bundle it into a highly efficient `dist` folder."
  - "This `dist` folder is our final, static application."
- **Deployment (The 'Git-Based' Workflow):**
  - "In the old days, we had to FTP files or manage complex servers. Not anymore."
  - "Platforms like **Netlify** (great for Vue) and **Vercel** (great for React) have perfected this. We will deploy our Vue app to Netlify and our React app to Vercel."
  - "The flow is simple: You connect your GitHub repo, tell it the build command (`pnpm build`) and the output directory (`dist`). That's it. Every time you push to `main`, it auto-deploys."
- **Environment Variables:**
  - "What about secret keys or API URLs? You _never_ hard-code them. You use Environment Variables (e.g., `VITE_API_URL`)."
  - "In deployment, you don't use a `.env` file. You set these variables in the Netlify or Vercel project settings UI. They are securely injected _at build time_."

#### ✅ Live Checkpoints

- [ ] **Task:** "Everyone, create a new, empty repository on GitHub called `ptl-workshop`."
- [ ] **Task:** "Push your _entire monorepo_ to this new repository."
- [ ] **Task:** "Sign up for a free Netlify account."
- [ ] **"We Do":** Walk them through "Add new site" -> "Import an existing project" -> Connect to GitHub -> Find the repo.
- [ ] **CRITICAL:** Show them where to set the "Base directory" to `packages/vue-app`, build command to `pnpm build`, and publish directory to `packages/vue-app/dist`.
- [ ] **Task:** "Now, do the same for the React app on Vercel. Connect your repo, set the 'Root Directory' to `packages/react-app`." (Vercel is usually smart enough to figure out the build settings).
- [ ] **"The Win":** "Congratulations! You have two live, deployed applications. Share your URLs in the chat!"
