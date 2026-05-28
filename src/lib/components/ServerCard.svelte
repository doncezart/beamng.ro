<script lang="ts">
  import type { BeamMPServer } from '$lib/types'
  import { countryCodeToFlag, playerBadgeColor, parseBeamMPName, getMapName, readableColor } from '$lib/server-utils'

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

<div class="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
  <!-- Card header: content left, action buttons right (fill full height) -->
  <div class="flex min-h-[80px] items-stretch">
    <!-- Name + meta -->
    <div class="min-w-0 flex-1 p-4">
      <!-- Formatted name -->
      <p class="flex flex-wrap items-baseline gap-0 text-sm font-medium leading-snug">
        {#each nameSegments as seg}
          <span
            style="color: {readableColor(seg.color) ?? 'inherit'}; font-weight: {seg.bold ? '700' : 'inherit'}"
          >{seg.text}</span>
        {/each}
      </p>

      <!-- Meta: flag, map, player count, badges -->
      <div class="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
        <span title={server.location}>{flag}</span>
        <span>🗺 {mapName}</span>
        <!-- Player count inline with meta -->
        <span class="rounded-full px-1.5 py-0.5 font-semibold tabular-nums
          {badgeColor === 'green'
            ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-200'
            : badgeColor === 'orange'
            ? 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200'
            : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200'}">
          👥 {server.players}/{server.maxplayers}
        </span>
        {#if isModded}
          <span class="rounded-full bg-purple-50 px-1.5 py-0.5 text-purple-600 ring-1 ring-inset ring-purple-200">Modded · {server.modstotal} moduri</span>
        {/if}
        {#if server.official}
          <span class="rounded-full bg-blue-50 px-1.5 py-0.5 text-blue-600 ring-1 ring-inset ring-blue-200">Oficial</span>
        {/if}
        {#if server.password}
          <span class="rounded-full bg-zinc-100 px-1.5 py-0.5 text-zinc-500 ring-1 ring-inset ring-zinc-200">🔒 Parolat</span>
        {/if}
      </div>
    </div>

    <!-- Action buttons: stacked vertically, fill full card height -->
    <div class="flex w-24 shrink-0 flex-col border-l border-zinc-100">
      <button
        onclick={copyAddress}
        class="cursor-pointer flex flex-1 items-center justify-center border-b border-zinc-100 px-2 text-center text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 active:bg-zinc-100"
      >
        {copied ? '✓ Copiat' : '📋 IP'}
      </button>
      <button
        onclick={() => (expanded = !expanded)}
        class="cursor-pointer flex flex-1 items-center justify-center px-2 text-center text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 active:bg-zinc-100"
      >
        {expanded ? '▲' : '▼'} Detalii
      </button>
    </div>
  </div>

  <!-- Expanded details -->
  {#if expanded}
    <div class="space-y-3 border-t border-zinc-100 px-4 pb-4 pt-3">
      {#if server.sdesc}
        <p class="text-sm text-zinc-600">{server.sdesc}</p>
      {/if}

      <!-- Connection info -->
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
        <span>IP: <code class="font-mono text-zinc-600">{server.ip}:{server.port}</code></span>
        <span>Versiune BeamMP: {server.version}</span>
        {#if server.owner}
          <span>Owner: {server.owner}</span>
        {/if}
      </div>

      <!-- Players online -->
      {#if playerList.length > 0}
        <div>
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">Jucători ({playerList.length})</p>
          <div class="flex flex-wrap gap-1">
            {#each playerList as player}
              <span class="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600">{player}</span>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Tags -->
      {#if server.tags}
        <div>
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">Tags</p>
          <div class="flex flex-wrap gap-1">
            {#each server.tags.split(',').map((t: string) => t.trim()).filter(Boolean) as tag}
              <span class="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600">{tag}</span>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Mods -->
      {#if modList.length > 0}
        <div>
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">Moduri ({modList.length})</p>
          <div class="flex flex-wrap gap-1">
            {#each modList as mod}
              <span class="rounded bg-purple-50 px-1.5 py-0.5 text-xs text-purple-600">{mod}</span>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>
