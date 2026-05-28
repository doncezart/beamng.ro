<script lang="ts">
  import { roadmapItems } from '$lib/data/roadmap'
  import type { RoadmapStatus } from '$lib/data/roadmap'

  const statusConfig: Record<RoadmapStatus, { label: string; dotClass: string; badgeClass: string }> = {
    'Planificat': {
      label: 'Planificat',
      dotClass: 'bg-zinc-300',
      badgeClass: 'bg-zinc-100 text-zinc-600',
    },
    'În lucru': {
      label: 'În lucru',
      dotClass: 'bg-primary',
      badgeClass: 'bg-orange-50 text-primary',
    },
    'Finalizat': {
      label: 'Finalizat',
      dotClass: 'bg-green-500',
      badgeClass: 'bg-green-50 text-green-700',
    },
  }
</script>

<div class="relative space-y-6 pl-8">
  <!-- Vertical line -->
  <div class="absolute left-3 top-0 h-full w-px bg-zinc-200" aria-hidden="true"></div>

  {#each roadmapItems as item}
    {@const cfg = statusConfig[item.status]}
    <div class="relative">
      <!-- Timeline dot -->
      <div class="absolute -left-5 top-1.5 h-3 w-3 rounded-full ring-2 ring-white {cfg.dotClass}"></div>

      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="font-semibold text-zinc-900">{item.title}</h3>
          <span class="rounded-full px-2 py-0.5 text-xs font-medium {cfg.badgeClass}">{cfg.label}</span>
        </div>
        {#if item.description}
          <p class="mt-1 text-sm text-zinc-600">{item.description}</p>
        {/if}
      </div>
    </div>
  {/each}
</div>
