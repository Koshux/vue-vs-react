D3.4: Deployment

branch: day-3/03-deployment

Goal: Ship your production-ready app to the world.

Platforms: Vercel (by the makers of Next.js, great for React) and Netlify (pioneered the Git-based workflow, great for all).

Both offer generous free tiers.

Production Readiness

Code Splitting: Vite does this automatically! Your routes (/about) are only loaded when a user visits them.

Bundle Analysis: Use rollup-plugin-visualizer to see a map of your final bundle. Find out what libraries are taking up the most space.

--

The Workflow

Push your code to a GitHub/GitLab repository.

Connect your repo to Vercel or Netlify.

Set the build command: pnpm build

Set the output directory: dist

Done.

Every time you git push to your main branch, your site will be rebuilt and deployed automatically.

Your Task

Create a new, empty repository on GitHub.

Push one of your apps (Vue or React) to it.

Sign up for a free Netlify account.

Connect your new repo and deploy it.

Share the live URL!
