D1.4: Monorepo with pnpm

branch: day-1/03-workspaces

pnpm-workspace.yaml defines the monorepo.

Root package.json scripts can run tasks across all packages.

Key Commands:

# Run 'build' in all packages (-r is recursive)
pnpm -r build

# Add a dependency to one package (-F is --filter)
pnpm -F vue-app add axios
