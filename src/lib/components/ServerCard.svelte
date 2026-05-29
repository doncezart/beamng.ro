<script lang="ts">
  import type { BeamMPServer } from '$lib/types'
  import { countryCodeToFlag, playerBadgeColor, parseBeamMPName, getMapName } from '$lib/server-utils'

  const { server }: { server: BeamMPServer } = $props()

  const badgeColor = $derived(playerBadgeColor(server.players, server.maxplayers))
  const flag = $derived(countryCodeToFlag(server.location))
  const nameSegments = $derived(parseBeamMPName(server.sname))
  const mapName = $derived(getMapName(server.map))
  const isModded = $derived(parseInt(server.modstotal, 10) > 0)
  const playerList = $derived(
    server.playerslist
      .split(';')
      .map((p: string) => p.trim())
      .filter(Boolean)
  )
  const modList = $derived(
    server.modlist
      .split(';')
      .map((m: string) => m.replace(/^\//, '').trim())
      .filter(Boolean)
  )

  let copied = $state(false)
  let expanded = $state(false)

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(`${server.ip}:${server.port}`)
      copied = true
      setTimeout(() => (copied = false), 2000)
    } catch {
      // clipboard not available
    }
  }
</script>

<div class="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm transition-all hover:border-zinc-700 hover:shadow-md hover:shadow-zinc-950/50">
  <!-- Card header: content top, action buttons bottom on mobile; right on sm+ -->
  <div class="flex flex-col sm:flex-row sm:min-h-[80px] sm:items-stretch">
    <!-- Name + meta -->
    <div class="min-w-0 flex-1 p-4">
      <!-- Formatted name -->
      <p class="mb-2 text-sm font-medium leading-snug">
        {#each nameSegments as seg}
          <span
            style="color:{seg.color ?? '#e4e4e7'}; font-weight:{seg.bold ? '700' : 'inherit'}"
          >{seg.text}</span>
        {/each}
      </p>

      <!-- Meta: flag, map, player count, badges -->
      <div class="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <span title={server.location}>{flag}</span>
        <span>🗺 {mapName}</span>
        <!-- Player count inline with meta -->
        <span class="rounded-full px-1.5 py-0.5 font-semibold tabular-nums
          {badgeColor === 'green'
            ? 'bg-green-900/50 text-green-400 ring-1 ring-inset ring-green-700'
            : badgeColor === 'orange'
            ? 'bg-orange-900/50 text-orange-400 ring-1 ring-inset ring-orange-700'
            : 'bg-red-900/50 text-red-400 ring-1 ring-inset ring-red-700'}">
          👥 {server.players}/{server.maxplayers}
        </span>
        {#if isModded}
          <span class="rounded-full bg-purple-900/40 px-1.5 py-0.5 text-purple-400 ring-1 ring-inset ring-purple-700">{server.modstotal} moduri</span>
        {/if}
        {#if server.official}
          <span class="rounded-full bg-blue-900/40 px-1.5 py-0.5 text-blue-400 ring-1 ring-inset ring-blue-700">Oficial</span>
        {/if}
        {#if server.password}
          <span class="rounded-full bg-zinc-700 px-1.5 py-0.5 text-zinc-300 ring-1 ring-inset ring-zinc-600">🔒 Parolat</span>
        {/if}
      </div>
    </div>

    <!-- Action buttons: row along bottom on mobile, stacked column on sm+ -->
    <div class="flex shrink-0 flex-row border-t border-zinc-800 sm:w-24 sm:flex-col sm:border-l sm:border-t-0">
      <button
        onclick={copyAddress}
        class="cursor-pointer flex flex-1 items-center justify-center border-r border-zinc-800 px-2 py-3 text-center text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 active:bg-zinc-700 sm:border-b sm:border-r-0 sm:py-0"
      >
        {copied ? '✓ Copiat' : '📋 IP'}
      </button>
      <button
        onclick={() => (expanded = !expanded)}
        class="cursor-pointer flex flex-1 items-center justify-center px-2 py-3 text-center text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 active:bg-zinc-700 sm:py-0"
      >
        {expanded ? '▲' : '▼'} Detalii
      </button>
    </div>
  </div>

  <!-- Expanded details -->
  {#if expanded}
    <div class="space-y-3 border-t border-zinc-800 px-4 pb-4 pt-3">
      {#if server.sdesc}
        <p class="text-sm text-zinc-400">{server.sdesc}</p>
      {/if}

      <!-- Connection info -->
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
        <span>IP: <code class="font-mono text-zinc-300">{server.ip}:{server.port}</code></span>
        <span>Versiune BeamMP: {server.version}</span>
        {#if server.owner}
          <span>Owner: {server.owner}</span>
        {/if}
      </div>

      <!-- Players online -->
      {#if playerList.length > 0}
        <div>
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">Jucători ({playerList.length})</p>
          <div class="flex flex-wrap gap-1">
            {#each playerList as player}
              <span class="rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-300">{player}</span>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Tags -->
      {#if server.tags}
        <div>
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">Tags</p>
          <div class="flex flex-wrap gap-1">
            {#each server.tags.split(',').map((t: string) => t.trim()).filter(Boolean) as tag}
              <span class="rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-300">{tag}</span>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Mods -->
      {#if modList.length > 0}
        <div>
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">Moduri ({modList.length})</p>
          <div class="flex flex-wrap gap-1">
            {#each modList as mod}
              <span class="rounded bg-purple-900/40 px-1.5 py-0.5 text-xs text-purple-400">{mod}</span>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>
