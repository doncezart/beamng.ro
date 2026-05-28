<script lang="ts">
  import type { PageData } from './$types'
  import type { BeamMPServer } from '$lib/types'
  import { config } from '$lib/config'
  import { creators } from '$lib/data/creators'
  import { filterRoServers, paginateServers } from '$lib/server-utils'
  import ServerCard from '$lib/components/ServerCard.svelte'
  import PostCard from '$lib/components/PostCard.svelte'
  import VideoCard from '$lib/components/VideoCard.svelte'
  import DiscordPreview from '$lib/components/DiscordPreview.svelte'
  import RoadmapTimeline from '$lib/components/RoadmapTimeline.svelte'
  import { Button } from '$lib/components/ui/button'

  const { data }: { data: PageData } = $props()

  const PAGE_SIZE = 20

  // Server state
  let servers = $state<BeamMPServer[]>(data.servers ?? [])
  let page = $state(1)

  const roServers = $derived(filterRoServers(servers))
  const otherServers = $derived(servers.filter(s => s.location !== 'RO'))
  const sortedServers = $derived([...roServers, ...otherServers])
  const pagedServers = $derived(paginateServers(sortedServers, page, PAGE_SIZE))
  const totalPages = $derived(Math.ceil(sortedServers.length / PAGE_SIZE))
</script>

<svelte:head>
  <title>{config.brandName} — Comunitatea română de BeamNG.drive</title>
  <meta name="description" content="Comunitatea română de BeamNG.drive multiplayer. Servere, Discord, creatori și evenimente." />
</svelte:head>

<!-- ─── HERO ──────────────────────────────────────────────────────────── -->
<section class="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 pb-24 pt-32 text-white">
  <div class="mx-auto max-w-4xl px-4 text-center">
    <div class="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
      🇷🇴 Comunitate BeamNG.drive
    </div>
    <h1 class="mt-4 text-5xl font-bold leading-tight md:text-6xl">
      BeamNG <span class="text-primary">România</span>
    </h1>
    <p class="mx-auto mt-6 max-w-xl text-lg text-zinc-300">
      Cea mai nouă comunitate română de BeamNG.drive multiplayer. Servere, Discord, turnee și creatori de conținut.
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <Button href={config.discordInvite} target="_blank" rel="noopener noreferrer" size="lg">
        Alătură-te Discord
      </Button>
      <Button href="/#servere" variant="outline" size="lg" class="border-white/30 text-white hover:bg-white/10">
        Servere BeamMP
      </Button>
    </div>
  </div>
</section>

<!-- ─── SERVERE ───────────────────────────────────────────────────────── -->
<section id="servere" class="py-20">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mb-10 text-center">
      <h2 class="text-3xl font-bold">Servere BeamMP</h2>
      <p class="mt-2 text-zinc-500">Servere active la acest moment. Serverele românești apar primele.</p>
    </div>

    {#if sortedServers.length === 0}
      <p class="text-center text-zinc-400">Nu s-au putut încărca serverele. Încearcă mai târziu.</p>
    {:else}
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each pagedServers as server (server.ident)}
          <ServerCard {server} />
        {/each}
      </div>

      {#if totalPages > 1}
        <div class="mt-8 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onclick={() => (page = Math.max(1, page - 1))}
          >
            ← Anterior
          </Button>
          <span class="text-sm text-zinc-500">Pagina {page} din {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onclick={() => (page = Math.min(totalPages, page + 1))}
          >
            Următor →
          </Button>
        </div>
      {/if}
    {/if}
  </div>
</section>

<!-- ─── DISCORD ───────────────────────────────────────────────────────── -->
<section id="discord" class="bg-zinc-50 py-20">
  <div class="mx-auto max-w-6xl px-4">
    <div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
      <div>
        <h2 class="text-3xl font-bold">Comunitatea Discord</h2>
        <p class="mt-4 text-zinc-600">
          Intră pe serverul nostru de Discord și conectează-te cu alți jucători români de BeamNG.drive. Discuții, showcase, anunțuri evenimente și multe altele.
        </p>
        <ul class="mt-6 space-y-2 text-sm text-zinc-600">
          <li>✅ Canale dedicate showcase de mașini</li>
          <li>✅ Anunțuri turnee și evenimente</li>
          <li>✅ Suport tehnic și modding</li>
          <li>✅ Canal off-topic și socializare</li>
        </ul>
        <Button
          href={config.discordInvite}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-6"
        >
          Alătură-te acum
        </Button>
      </div>
      <div class="mx-auto w-full max-w-xs">
        <DiscordPreview />
      </div>
    </div>
  </div>
</section>

<!-- ─── CREATORI ──────────────────────────────────────────────────────── -->
<section id="creatori" class="py-20">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mb-10 text-center">
      <h2 class="text-3xl font-bold">Creatori de conținut</h2>
      <p class="mt-2 text-zinc-500">Creatori români de BeamNG.drive care fac parte din comunitate.</p>
    </div>

    {#if creators.length === 0}
      <div class="rounded-xl border border-dashed border-zinc-300 py-16 text-center text-zinc-400">
        <p class="text-lg">Încă nu avem creatori înregistrați.</p>
        <p class="mt-1 text-sm">Ești creator BeamNG? Alătură-te pe Discord!</p>
        <Button
          href={config.discordInvite}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          class="mt-4"
        >
          Contactează-ne
        </Button>
      </div>
    {:else}
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each creators as creator (creator.videoId)}
          <VideoCard {creator} />
        {/each}
      </div>
    {/if}
  </div>
</section>

<!-- ─── ROADMAP ───────────────────────────────────────────────────────── -->
<section id="roadmap" class="bg-zinc-50 py-20">
  <div class="mx-auto max-w-3xl px-4">
    <div class="mb-10 text-center">
      <h2 class="text-3xl font-bold">Roadmap</h2>
      <p class="mt-2 text-zinc-500">Ce pregătim pentru comunitate.</p>
    </div>
    <RoadmapTimeline />
  </div>
</section>

<!-- ─── NOUTĂȚI ───────────────────────────────────────────────────────── -->
<section id="noutati" class="py-20">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mb-10 flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold">Noutăți</h2>
        <p class="mt-1 text-zinc-500">Ultimele știri din comunitate.</p>
      </div>
      <a href="/noutati" class="text-sm font-medium text-primary hover:underline">
        Toate noutățile →
      </a>
    </div>

    {#if data.latestPosts.length === 0}
      <p class="text-center text-zinc-400">Nicio noutate disponibilă.</p>
    {:else}
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.latestPosts as post (post.slug)}
          <PostCard {post} />
        {/each}
      </div>
    {/if}
  </div>
</section>
