<script lang="ts">
  import type { Creator } from '$lib/data/creators'

  const { creator }: { creator: Creator } = $props()

  const thumbnailUrl = $derived(`https://img.youtube.com/vi/${creator.videoId}/mqdefault.jpg`)
  const videoUrl = $derived(`https://www.youtube.com/watch?v=${creator.videoId}`)
</script>

<div class="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
  <!-- Thumbnail links to video -->
  <a href={videoUrl} target="_blank" rel="noopener noreferrer" aria-label={creator.title} class="relative block">
    <img
      src={thumbnailUrl}
      alt={creator.title}
      class="aspect-video w-full object-cover transition-opacity hover:opacity-90"
      loading="lazy"
    />
    {#if creator.duration}
      <span class="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium tabular-nums text-white">
        {creator.duration}
      </span>
    {/if}
  </a>

  <div class="p-3">
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="line-clamp-2 text-sm font-medium text-zinc-900 hover:text-primary"
    >
      {creator.title}
    </a>
    <a
      href={creator.channelUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="mt-1 block text-xs text-zinc-500 hover:text-primary"
    >
      {creator.creatorName}
    </a>
  </div>
</div>
