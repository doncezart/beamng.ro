export interface Post {
  slug: string
  title: string
  date: string       // ISO date string: '2026-05-28'
  excerpt: string
}

export async function getPosts(): Promise<Post[]> {
  // import.meta.glob is a Vite built-in — paths are relative to the project root
  const modules = import.meta.glob('/src/content/posts/*.md')
  const posts: Post[] = []

  for (const path in modules) {
    const mod = (await modules[path]()) as { metadata: Omit<Post, 'slug'> }
    const filename = path.split('/').pop()!
    const slug = filename.replace('.md', '')
    posts.push({ slug, ...mod.metadata })
  }

  // Sort newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
