import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = () => ({
  // Exposed to client via layout data — safe (this is the public Turnstile site key)
  turnstileSiteKey: process.env.PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA',
})
