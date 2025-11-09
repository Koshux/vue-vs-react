## D3.4: Production & Deployment (Time: 45 mins)

branch: day-3/03-deployment

### Production Readiness

Before we deploy, we must optimize our app.

- **Code Splitting**: Vite does this automatically! Your routes (`/about`) are only loaded when a user visits them, making the initial app load much smaller.
- **Bundle Analysis**: Use a plugin like `rollup-plugin-visualizer` to see a map of your final bundle. This helps you find large libraries that are slowing down your app.

---

### The "Git-Based" Workflow

Modern platforms like **Netlify** (great for Vue/static sites) and **Vercel** (by the makers of Next.js, great for React) have perfected deployment.

1.  Push your code to a GitHub/GitLab repository.
2.  Connect your repo to Netlify or Vercel.
3.  Set the build command: `pnpm build`
4.  Set the output directory: `dist`
5.  **Done.**

Every time you `git push` to your `main` branch, your site will be automatically rebuilt and deployed.

---

### Your Task

1.  Create a new, empty repository on GitHub.
2.  Push one of your apps (Vue or React) to it.
3.  Sign up for a free Netlify or Vercel account.
4.  Connect your new repo and deploy it.
5.  Share the live URL!
