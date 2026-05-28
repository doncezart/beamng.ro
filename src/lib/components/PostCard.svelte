<script lang="ts">
  import type { Post } from '$lib/posts'
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card'

  const { post }: { post: Post } = $props()

  const formattedDate = $derived(
    new Date(post.date).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  )
</script>

<a href="/noutati/{post.slug}" class="group block">
  <Card class="h-full transition-shadow group-hover:shadow-md">
    <CardHeader>
      <time datetime={post.date} class="text-xs text-zinc-400">{formattedDate}</time>
      <CardTitle class="mt-1 text-lg group-hover:text-primary">{post.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p class="text-sm text-zinc-600">{post.excerpt}</p>
    </CardContent>
  </Card>
</a>
