<script lang="ts">
  import { roadmapItems } from '$lib/data/roadmap'
  import type { RoadmapStatus } from '$lib/data/roadmap'

  const statusConfig: Record<RoadmapStatus, { label: string; badgeClass: string; stepClass: string }> = {
    'Planificat': {
      label: 'Planificat',
      badgeClass: 'bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200',
      stepClass: 'bg-zinc-100 text-zinc-400',
    },
    'În lucru': {
      label: 'În lucru',
      badgeClass: 'bg-orange-100 text-primary ring-1 ring-orange-200',
      stepClass: 'bg-primary text-white',
    },
    'Finalizat': {
      label: 'Finalizat',
      badgeClass: 'bg-green-100 text-green-700 ring-1 ring-green-200',
      stepClass: 'bg-green-500 text-white',
    },
  }
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
  {#each roadmapItems as item, i}
    {@const cfg = statusConfig[item.status]}
    <div class="relative overflow-hidden rounded-2xl border p-6 transition-shadow hover:shadow-md
      {item.status === 'Finalizat'
        ? 'border-green-200 bg-gradient-to-br from-green-50 to-white shadow-sm'
        : item.status === 'În lucru'
        ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-white shadow-sm'
        : 'border-zinc-200 bg-white'}">

      <div class="mb-4 flex items-center justify-between">
        <!-- Step circle -->
        <div class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold {cfg.stepClass}">
          {#if item.status === 'Finalizat'}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          {:else}
            {i + 1}
          {/if}
        </div>
        <!-- Status badge -->
        <span class="rounded-full px-2.5 py-0.5 text-xs font-semibold {cfg.badgeClass}">{cfg.label}</span>
      </div>

      <h3 class="font-semibold text-zinc-900">{item.title}</h3>
      {#if item.description}
        <p class="mt-1.5 text-sm text-zinc-500">{item.description}</p>
      {/if}
    </div>
  {/each}
</div>
