import type { PageLoad } from './$types'
import { getPosts } from '$lib/posts'

export const load: PageLoad = async ({ fetch }) => {
  let servers = []

  try {
    const response = await fetch('https://backend.beammp.com/servers-info')
    if (response.ok) {
      servers = await response.json()
    }
  } catch {
    servers = []
  }

  const posts = await getPosts()

  return {
    servers,
    latestPosts: posts.slice(0, 3),
  }
}
