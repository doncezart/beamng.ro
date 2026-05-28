import type { PageServerLoad } from './$types'

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
