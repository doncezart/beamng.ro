<script lang="ts">
  import type { PageData } from './$types'
  import PostCard from '$lib/components/PostCard.svelte'

  const { data }: { data: PageData } = $props()
</script>

<svelte:head>
  <title>Noutăți — BeamNG România</title>
  <meta name="description" content="Ultimele știri și noutăți din comunitatea BeamNG România." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-16">
  <div class="mb-10">
    <a href="/" class="mb-4 inline-block text-sm text-zinc-500 hover:text-primary">← Înapoi acasă</a>
    <h1 class="text-4xl font-bold">Noutăți</h1>
    <p class="mt-2 text-zinc-500">Tot ce se întâmplă în comunitatea BeamNG România.</p>
  </div>

  {#if data.posts.length === 0}
    <p class="text-center text-zinc-400">Nicio noutate disponibilă încă.</p>
  {:else}
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each data.posts as post (post.slug)}
        <PostCard {post} />
      {/each}
    </div>
  {/if}
</div>
