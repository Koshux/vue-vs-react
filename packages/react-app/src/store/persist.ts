// Minimal selective localStorage persistence (like your Pinia plugin)
type PersistCfg = { key?: string; version?: number; paths?: string[] }

export function createPersistor<T extends object>(cfg: PersistCfg = {}) {
  const version = cfg.version ?? 1
  const key = (cfg.key ?? 'redux-root') + `@v${version}`

  function load(): Partial<T> | undefined {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return
      const parsed = JSON.parse(raw) as Record<string, unknown>
      if (cfg.paths?.length) {
        const subset: Record<string, unknown> = {}
        for (const k of cfg.paths) if (k in parsed) subset[k] = parsed[k]
        return subset as Partial<T>
      }
      return parsed as Partial<T>
    } catch {
      return
    }
  }

  function save(state: T) {
    try {
      const toSave = cfg.paths?.length
        ? cfg.paths!.reduce<Record<string, unknown>>((acc, k) => {
            acc[k] = (state as any)[k]
            return acc
          }, {})
        : state
      localStorage.setItem(key, JSON.stringify(toSave))
    } catch {}
  }

  return { load, save }
}
