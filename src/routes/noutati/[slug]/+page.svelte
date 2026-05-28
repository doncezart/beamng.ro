<script lang="ts">
  import type { PageData } from './$types'

  const { data }: { data: PageData } = $props()

  const formattedDate = $derived(
    new Date(data.metadata.date).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  )
</script>

<svelte:head>
  <title>{data.metadata.title} — BeamNG România</title>
  <meta name="description" content={data.metadata.excerpt} />
</svelte:head>

<article class="mx-auto max-w-3xl px-4 py-16">
  <a href="/noutati" class="mb-6 inline-block text-sm text-zinc-500 hover:text-primary">← Înapoi la noutăți</a>

  <header class="mb-8">
    <time datetime={data.metadata.date} class="text-sm text-zinc-400">{formattedDate}</time>
    <h1 class="mt-2 text-4xl font-bold">{data.metadata.title}</h1>
    <p class="mt-3 text-lg text-zinc-600">{data.metadata.excerpt}</p>
  </header>

  <div class="prose prose-zinc max-w-none">
    <svelte:component this={data.content} />
  </div>
</article>
