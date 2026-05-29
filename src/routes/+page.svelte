<script lang="ts">
  import type { PageData } from './$types'
  import type { BeamMPServer } from '$lib/types'
  import { config } from '$lib/config'
  import { creators } from '$lib/data/creators'
  import { filterRomanianServers, paginateServers } from '$lib/server-utils'
  import ServerCard from '$lib/components/ServerCard.svelte'
  import VideoCard from '$lib/components/VideoCard.svelte'
  import RoadmapTimeline from '$lib/components/RoadmapTimeline.svelte'
  import { Button } from '$lib/components/ui/button'
  import { notifyDialog } from '$lib/state/notify.svelte'

  const { data }: { data: PageData } = $props()

  const PAGE_SIZE = 20

  // Server state
  const servers = $derived(data.servers ?? [] as BeamMPServer[])
  let page = $state(1)

  const sortedServers = $derived(filterRomanianServers(servers))
  const pagedServers = $derived(paginateServers(sortedServers, page, PAGE_SIZE))
  const totalPages = $derived(Math.ceil(sortedServers.length / PAGE_SIZE))
</script>

<svelte:head>
  <title>{config.brandName} · Comunitatea română de BeamNG.drive</title>
  <meta name="description" content="Comunitatea română de BeamNG.drive multiplayer. Servere, Discord, creatori și evenimente." />
</svelte:head>

<!-- ─── HERO ──────────────────────────────────────────────────────────── -->
<section class="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-zinc-950 text-white">
  <!-- Background image -->
  <div class="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat"></div>
  <!-- Dark overlay -->
  <div class="absolute inset-0 bg-zinc-950/75"></div>

  <div class="relative mx-auto w-full max-w-4xl px-4 py-24 text-center">
    <!-- Flag badge -->
    <div class="mb-5 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
      <!-- Romanian flag inline SVG -->
      <svg width="18" height="13" viewBox="0 0 18 13" class="shrink-0 rounded-[2px]" aria-hidden="true">
        <rect width="6" height="13" fill="#002B7F"/>
        <rect x="6" width="6" height="13" fill="#FCD116"/>
        <rect x="12" width="6" height="13" fill="#CE1126"/>
      </svg>
      <span>Comunitate BeamNG.drive</span>
    </div>

    <h1 class="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
      BeamNG <span class="text-primary">România</span>
    </h1>
    <p class="mx-auto mt-6 max-w-lg text-lg text-zinc-300">
      Cea mai nouă comunitate română de BeamNG.drive cu servere active, turnee și creatori de conținut
    </p>
    <div class="mt-10 flex flex-wrap justify-center gap-4">
      <Button onclick={() => (notifyDialog.open = true)} size="lg" class="shadow-lg shadow-primary/30">
        Notifică-mă la lansare
      </Button>
      <Button href="/#servere" variant="outline" size="lg" class="border-white/25 bg-black/20 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white">
        Servere BeamMP
      </Button>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-400">
    <span class="text-xs tracking-widest uppercase">Descoperă</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-bounce">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  </div>
</section>

<!-- ─── ROADMAP ───────────────────────────────────────────────────────── -->
<section id="roadmap" class="py-20">
  <div class="mx-auto max-w-5xl px-4">
    <div class="mb-10 text-center">
      <h2 class="text-3xl font-bold">Roadmap</h2>
      <p class="mt-2 text-zinc-500">Ce pregătim pentru comunitate</p>
    </div>
    <RoadmapTimeline />
  </div>
</section>

<!-- ─── SERVERE ───────────────────────────────────────────────────────── -->
<section id="servere" class="bg-zinc-950 py-20">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mb-10 text-center">
      <h2 class="text-3xl font-bold text-white">Servere BeamMP</h2>
      <p class="mt-2 text-zinc-400">Servere BeamMP active cu legătură cu România</p>
    </div>

    {#if sortedServers.length === 0}
      <p class="text-center text-zinc-500">Nu s-au putut încărca serverele. Încearcă mai târziu.</p>
    {:else}
      <div class="space-y-3">
        {#each pagedServers as server (`${server.ip}:${server.port}`)}
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
            class="border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-700 hover:text-white"
          >
            ← Anterior
          </Button>
          <span class="text-sm text-zinc-400">Pagina {page} din {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onclick={() => (page = Math.min(totalPages, page + 1))}
            class="border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-700 hover:text-white"
          >
            Următor →
          </Button>
        </div>
      {/if}
    {/if}
  </div>
</section>

<!-- ─── CREATORI ──────────────────────────────────────────────────────── -->
<section id="creatori" class="py-20">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mb-10 text-center">
      <h2 class="text-3xl font-bold">Creatori de conținut</h2>
      <p class="mt-2 text-zinc-500">Creatori români de conținut BeamNG.drive</p>
    </div>

    {#if creators.length === 0}
      <div class="rounded-xl border border-dashed border-zinc-300 py-16 text-center text-zinc-400">
        <p class="text-lg">Încă nu avem creatori înregistrați</p>
        <p class="mt-1 text-sm">Ești creator BeamNG? Anunță-ne!</p>
        <Button onclick={() => (notifyDialog.open = true)} variant="outline" class="mt-4">
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

<!-- ─── DISCORD ───────────────────────────────────────────────────────── -->
<section id="discord" class="bg-zinc-50 py-20">
  <div class="mx-auto max-w-2xl px-4 text-center">
    <div class="relative mb-10 inline-block">
      <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 127.14 96.36" fill="#5865F2">
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
        </svg>
      </div>
      <span class="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
        În curând
      </span>
    </div>
    <h2 class="mt-4 text-3xl font-bold">Server Discord BeamNG România</h2>
    <p class="mx-auto mt-4 max-w-md text-zinc-500">
      Pregătim un server Discord dedicat comunității, cu showcase de mașini, turnee, suport tehnic și o comunitate prietenoasă
    </p>
    <div class="mt-6 flex flex-wrap justify-center gap-2">
      {#each ['🚗 Showcase mașini', '🏆 Turnee', '🔧 Suport modding', '💬 Off-topic'] as feature}
        <span class="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600">{feature}</span>
      {/each}
    </div>
    <Button onclick={() => (notifyDialog.open = true)} size="lg" class="mt-8">
      Notifică-mă la lansare
    </Button>
  </div>
</section>

