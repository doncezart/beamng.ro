import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`/src/content/posts/${params.slug}.md`)
    return {
      content: post.default,
      metadata: post.metadata as { title: string; date: string; excerpt: string },
    }
  } catch {
    error(404, 'Articolul nu a fost găsit.')
  }
}
