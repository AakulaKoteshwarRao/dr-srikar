/**
 * lib/config.ts
 *
 * HOW IT WORKS
 * ─────────────
 * At build time, Next.js runs this module once per deployment.
 * If NEXT_PUBLIC_CLINIC_SLUG is set, it fetches the clinic's config JSONB
 * from Supabase (configs table), transforms it into ClinicConfig, and caches it.
 * If not set (local dev / template preview), it falls back to data/default.json.
 *
 * All pages call getConfig() synchronously after awaiting initConfig() in layout.
 *
 * ENV VARS REQUIRED (set in Vercel per deployment):
 *   NEXT_PUBLIC_CLINIC_SLUG       e.g. "dr-arjun-neuro-care"
 *   NEXT_PUBLIC_SUPABASE_URL      e.g. "https://xyz.supabase.co"
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY e.g. "eyJ..."
 */

import type { ClinicConfig } from './types'
import { transformConfig }   from './transform'
import defaultConfig         from '../data/default.json'

const SLUG   = process.env.NEXT_PUBLIC_CLINIC_SLUG
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Module-level cache — resolved once per build/request cycle
let _config: ClinicConfig | null = null
let _fetchPromise: Promise<ClinicConfig> | null = null

async function fetchFromSupabase(): Promise<ClinicConfig> {
  if (!SLUG || !SB_URL || !SB_KEY) {
    console.log('[config] No CLINIC_SLUG — using default.json')
    return defaultConfig as unknown as ClinicConfig
  }

  try {
    // Fetch config_json for this clinic slug via Supabase REST API
    // configs table has a FK to clients; we filter by clients.slug
    const res = await fetch(
      `${SB_URL}/rest/v1/configs?select=data,clients!inner(slug)&clients.slug=eq.${encodeURIComponent(SLUG)}&limit=1`,
      {
        headers: {
          apikey:         SB_KEY,
          Authorization:  `Bearer ${SB_KEY}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // fresh on every build
      }
    )

    if (!res.ok) {
      console.error(`[config] Supabase error ${res.status} for slug: ${SLUG}`)
      return defaultConfig as unknown as ClinicConfig
    }

    const rows = await res.json()
    if (!rows?.length) {
      console.error(`[config] No config found for slug: ${SLUG}`)
      return defaultConfig as unknown as ClinicConfig
    }

    const configJson = rows[0]?.data
    if (!configJson || typeof configJson !== 'object') {
      console.error(`[config] config_json empty for slug: ${SLUG}`)
      return defaultConfig as unknown as ClinicConfig
    }

    console.log(`[config] Loaded Supabase config for: ${SLUG}`)
    return transformConfig(configJson)

  } catch (err) {
    console.error('[config] Fetch error:', err)
    return defaultConfig as unknown as ClinicConfig
  }
}

/** Initialise config once. Safe to call multiple times. */
export async function initConfig(): Promise<ClinicConfig> {
  if (_config) return _config
  if (!_fetchPromise) {
    _fetchPromise = fetchFromSupabase().then(cfg => {
      _config = cfg
      return cfg
    })
  }
  return _fetchPromise
}

/**
 * Synchronous getter — returns cached config after initConfig() resolves.
 * Falls back to default.json if called before cache is warm.
 */
export function getConfig(): ClinicConfig {
  return _config ?? (defaultConfig as unknown as ClinicConfig)
}

/** Async convenience: init + get in one call for Server Components. */
export async function loadConfig(): Promise<ClinicConfig> {
  return initConfig()
}
