import type { PiniaPluginContext } from "pinia";

type PersistOptions = {
  key?: string;
  paths?: string[];
  version?: number;
}

export function createPersistPlugin(opts: PersistOptions = {}) {
  const version = opts?.version ?? 1

  return ({ store }: PiniaPluginContext) => {
    const persistKey = (opts?.key ?? `pinia-${store.$id}`) + `@v${version}`

    try {
      const raw = localStorage.getItem(persistKey)

      if (raw) {
        const saved = JSON.parse(raw)

        if (Array.isArray(opts?.paths) && opts!.paths!.length) {
          const patch: Partial<typeof store.$state> = {}
          const keys = opts.paths as (keyof typeof store.$state)[]

          for (const k of keys) {
            if (k in saved) {
              patch[k] = (saved as Partial<typeof store.$state>)[k]
            }
          }

          store.$patch(patch)
        } else {
          store.$patch(saved)
        }
      }
    } catch (e) {
      console.warn('[persist] restore failed:', e)
    }

    store.$subscribe((_mutation, state) => {
      try {
        const toSave = Array.isArray(opts?.paths) && opts!.paths!.length
          ? opts!.paths!.reduce<Record<string, unknown>>((acc, k) => {
            acc[k] = state[k]
            return acc
          }, {})
          : state

        localStorage.setItem(persistKey, JSON.stringify(toSave))
      } catch (e) {
        console.warn('[persist] save failed', e)
      }
    })
  }
}
