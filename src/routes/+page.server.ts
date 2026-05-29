import type { PageServerLoad, Actions } from './$types'
import { fail } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

export const load: PageServerLoad = async ({ fetch }) => {
  let servers = []

  try {
    const response = await fetch('https://backend.beammp.com/servers-info')
    if (response.ok) {
      servers = await response.json()
    }
  } catch {
    servers = []
  }

  return { servers }
}

export const actions: Actions = {
  notify: async ({ request }) => {
    const form = await request.formData()
    const email = form.get('email')?.toString().trim() ?? ''
    const message = form.get('message')?.toString().trim() ?? ''
    const token = form.get('cf-turnstile-response')?.toString() ?? ''

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail(400, { error: 'Adresa de email este invalidă' })
    }

    // Verify Turnstile
    if (env.TURNSTILE_SECRET_KEY) {
      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token }),
      })
      const data: { success: boolean } = await res.json()
      if (!data.success) {
        return fail(400, { error: 'Verificarea CAPTCHA a eșuat. Încearcă din nou' })
      }
    }

    const timestamp = new Date().toISOString()

    // Discord webhook notification (fire-and-forget — failure is non-blocking)
    if (env.DISCORD_WEBHOOK_URL) {
      fetch(env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '📧 Nouă înregistrare newsletter',
            color: 0xf97316,
            fields: [
              { name: 'Email', value: email, inline: true },
              { name: 'Mesaj', value: message || '_(fără mesaj)_', inline: false },
            ],
            timestamp,
          }],
        }),
      }).catch((e) => console.error('[notify] Discord webhook error:', e))
    }

    return { success: true }
  },
}
