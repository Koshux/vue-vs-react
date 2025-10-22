Hour 4: Testing & Production Readiness

The Testing Pyramid

A model for thinking about testing strategy.

E2E Tests (Top): Few, slow, expensive. Simulate a full user journey.

Integration Tests (Middle): Test how multiple components work together.

Unit Tests (Base): Many, fast, cheap. Test a single function or component in isolation.

Unit Testing

<div class="d-flex">
<div class="col">
<h4>Vue</h4>
- Vue Test Utils: The official unit testing library for Vue components.
- Jest / Vitest: The test runner that provides the test environment and assertion functions (expect, toBe, etc.).
</div>
<div class="col">
<h4>React</h4>
- React Testing Library (RTL): The most popular library for testing React components.
- Focuses on testing from the user's perspective.
- Jest / Vitest: The same test runners are used.
</div>
</div>

End-to-End (E2E) Testing

Goal: Test the application as a real user would, by controlling a browser.

Cypress: An all-in-one E2E testing framework. Great developer experience.

Playwright: A newer alternative from Microsoft. Known for its speed and cross-browser capabilities.

Both are excellent choices.

Performance & Production

Goal: Ship the smallest, fastest application possible to users.

Bundle Analysis: Using a tool like vite-bundle-visualizer to see what's inside your production bundle. Helps find large dependencies.

Code Splitting / Lazy Loading:

Vue: defineAsyncComponent

React: React.lazy and Suspense

The router is the most common place to do this. Only load the code for a page when the user actually visits it.
