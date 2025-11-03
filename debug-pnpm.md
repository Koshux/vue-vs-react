## 📦 Installing PNPM (Reliable, Cross-Platform)

### ✅ Preferred: Use Corepack (Node ≥ 18.17 / 20.x)

Corepack ships with Node and manages package managers by version, so everyone uses the **same PNPM version**.

1. **Enable Corepack**

```bash
# macOS/Linux
corepack enable

# Windows PowerShell
corepack enable
```

2. **Activate a specific PNPM version** (recommended)

```bash
corepack prepare pnpm@9 --activate
```

3. **(Optional but recommended)** Pin the version in your repo to keep CI/devs in sync:
   Add this to your root `package.json`:

```json
{
  "packageManager": "pnpm@9"
}
```

> Now `pnpm -v` should print a 9.x version managed by Corepack:
>
> ```bash
> pnpm -v
> ```

---

### 🧯 Fallback: No Corepack available

If Corepack isn’t present (older Node or restricted environment):

**Option A – Install Corepack, then enable PNPM**

```bash
npm i -g corepack
corepack enable
corepack prepare pnpm@9 --activate
```

**Option B – Direct global PNPM (last resort)**

```bash
npm i -g pnpm@9
pnpm -v
```

> Use this only if Corepack cannot be used. Global installs can drift across machines/CI.

---

### 🔎 Verify & Common Fixes

- Check versions:

  ```bash
  node -v
  pnpm -v
  corepack -v   # should work on modern Node
  ```

- If `corepack` isn’t found, update Node or install Corepack globally.
- If `pnpm` isn’t found after `corepack enable`, run:

  ```bash
  corepack prepare pnpm@9 --activate
  ```

- If a previously **globally** installed PNPM is shadowing Corepack, remove it:

  ```bash
  npm rm -g pnpm
  corepack prepare pnpm@9 --activate
  ```

---

### 🛠 CI Notes (Netlify & Vercel)

- **Pin Node** to 20.x (via UI, `netlify.toml`, or `.nvmrc`) so Corepack is available.
- With `packageManager: "pnpm@9"` set, **Netlify** and **Vercel** automatically use PNPM via Corepack.
- Build commands stay the same:

  ```bash
  pnpm install
  pnpm build
  ```

---
