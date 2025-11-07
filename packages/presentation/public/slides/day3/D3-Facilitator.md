## Day 3: Ecosystem, Testing & Deployment

**Goal:** Professionalize the apps with team tooling, write robust tests (unit and E2E), and deploy them to a live URL.

### D3.1: Team Tooling & Automation

- **Slide:** `public/slides/day3/D3-1-Tooling.md`
- **Objective:** Enforce code quality automatically with ESLint, Prettier, and git hooks.

#### 🗣️ Key Talking Points

- "This is one of the most important lessons for working on a team. How do we enforce code quality and stop 'style debates'?"
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
- [ ] **"You Do":** "Your task: Go into a `.vue` file, make an obvious lint error (like `var foo = 'bar'`), save it, stage it, and try to `git commit`. Watch it fail."

---

### D3.2: Unit Testing

- **Slide:** `public/slides/day3/D3-2-Testing.md`
- **Objective:** Introduce unit testing philosophies and tools.

#### 🗣️ Key Talking Points

- **The Testing Pyramid:** "We're at the base of the pyramid: **Unit Tests**. These are fast, cheap, and you should have lots of them. They test one _thing_ in isolation."
- **Test Runner:** "We're using **Vitest**. It's the modern, Vite-native replacement for Jest. It's incredibly fast and has a compatible API. We use it for _both_ apps."
- **Vue - Vue Test Utils:**
  - "This is the _official_ library for testing Vue components."
  - "You `mount` the component, which gives you a `wrapper`."
  - "You use `wrapper.find()` to get elements and `wrapper.trigger('click')` to interact."
- **React - React Testing Library (RTL):**
  - "This is the _industry standard_ for React. It has a very important philosophy: **'Test your components the way a user would.'**"
  - "This means you DO NOT find elements by class or ID. You find them by _what the user sees_: their text (`getByText`), their label (`getByLabelText`), or their role (`getByRole`)."
  - "Why? This makes your tests resilient. You can refactor your CSS or component structure, and as long as the _text_ is the same, your test still passes."

#### ✅ Live Checkpoints

- [ ] **Vue Task:**
  - [ ] Open `vue-app/src/components/__tests__/HelloWorld.spec.ts` as an example.
  - [ ] **"You Do":** "Create a new test file for your `Button.vue` component. Write a test that `mount`s it with a `label` prop, and `expect` the `wrapper.text()` to contain the label."
  - [ ] "Bonus: Test that it `emits` the 'click' event when clicked."
- [ ] **React Task:**
  - [ ] Open `react-app/src/__tests__/tasksSlice.test.ts` as an example (this is a _reducer_ test, not a component test).
  - [ ] **"You Do":** "Create a new `Button.test.tsx` file. `render` your Button. Use `screen.getByText('...')` to find it by its label. Then, create a `vi.fn()` (a mock function), pass it as the `onClick` prop, `fireEvent.click()` the button, and `expect` your mock to have been called."

---

### D3.3: End-to-End (E2E) Testing

- **Slide:** `public/slides/day3/D3-3-E2E-Testing.md`
- **Objective:** Explain E2E testing and using Playwright.

#### 🗣️ Key Talking Points

- "This is the top of the pyramid. E2E tests simulate a _full user journey_ in a _real browser_."
- "The test will literally: 1. Launch Chrome. 2. Go to `localhost:5173`. 3. Click the 'Tasks' link. 4. Type 'My New Task' into the input. 5. Click 'Add'. 6. Assert that 'My New Task' appears in the list."
- **Cypress vs. Playwright:**
  - **Cypress:** The classic, runs _inside_ the browser. Famous for its time-travel debugger.
  - **Playwright:** The modern successor from Microsoft. Runs _outside_ the browser, giving it more control. It's faster and can control Chrome, Firefox, and Safari _all with one API_. We are using Playwright.
- **Syntax:** "The syntax is simple: `async ({ page }) => ...`. The `page` object is your controller for the browser."
  - `await page.goto('/')`
  - `await page.getByRole('link', { name: /about/i }).click()`
  - `await expect(page.getByText('pikachu')).toBeVisible()`

#### ✅ Live Checkpoints

- [ ] **Task:** "Choose _one_ app (e.g., `vue-app`)."
- [ ] Show them `packages/vue-app/e2e/tasks.spec.ts` as an example.
- [ ] **"You Do":** "Your task: Create a new test file `navigation.spec.ts`. Write a test that starts at the home page (`/`), clicks the 'About' link, and asserts that the Pokémon name 'pikachu' (from our D2-2 task) is visible on the page."
- [ ] Run `pnpm -F vue-app test:e2e` to run it.

---

### D3.4: Production & Deployment

- **Slide:** `public/slides/day3/D3-4-Deployment.md`
- **Objective:** Run a production build and deploy both apps to live URLs.

#### 🗣️ Key Talking Points

- "We're done! Now, how do we ship it?"
- **Production Build:**
  - "First, we run `pnpm build`. This tells Vite to _optimize_ our app. It will minify the code, tree-shake unused functions, and bundle it into a highly efficient `dist` folder."
  - "This `dist` folder is our final, static application."
- **Code Splitting:**
  - "Vite is smart. Look at your `router` file. That `() => import(...)` syntax? That's a dynamic import. Vite sees this and automatically **code-splits** your app.
  - "This means the user _only_ downloads the code for the homepage first. When they click 'About', it _then_ fetches the `about.js` chunk. This makes your initial page load incredibly fast."
- **Deployment (The 'Git-Based' Workflow):**
  - "In the old days, we had to FTP files or manage complex servers. Not anymore."
  - "Platforms like **Netlify** and **Vercel** have perfected this. We will deploy our Vue app to Netlify and our React app to Vercel."
  - "The flow is simple: You connect your GitHub repo, tell it the build command (`pnpm build`) and the output directory (`dist`). That's it. Every time you push to `main`, it auto-deploys."

#### ✅ Live Checkpoints

- [ ] **Task:** "Everyone, create a new, empty repository on GitHub called `ptl-workshop`."
- [ ] **Task:** "Push your _entire monorepo_ to this new repository."
- [ ] **Task:** "Sign up for a free Netlify account."
- [ ] **"We Do":** Walk them through "Add new site" -> "Import an existing project" -> Connect to GitHub -> Find the repo.
- [ ] **CRITICAL:** Show them where to set the "Base directory" to `packages/vue-app`, build command to `pnpm build`, and publish directory to `packages/vue-app/dist`.
- [ ] **Task:** "Now, do the same for the React app on Vercel. Connect your repo, set the 'Root Directory' to `packages/react-app`."
- [ ] "Congratulations! You have two live, deployed applications. Share your URLs in the chat!"
