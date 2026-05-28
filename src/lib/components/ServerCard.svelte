<script lang="ts">
  import type { BeamMPServer } from '$lib/types'
  import { Badge } from '$lib/components/ui/badge'
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card'
  import { countryCodeToFlag, playerBadgeColor, truncateName } from '$lib/server-utils'

  const { server }: { server: BeamMPServer } = $props()

  const badgeColor = $derived(playerBadgeColor(server.players, server.maxplayers))
  const flag = $derived(countryCodeToFlag(server.location))
  const displayName = $derived(truncateName(server.sname, 60))
  const isModded = $derived(parseInt(server.modstotal, 10) > 0)
</script>

<Card class="flex flex-col gap-2 p-4">
  <CardHeader class="p-0">
    <div class="flex items-start justify-between gap-2">
      <CardTitle class="text-base leading-snug">{displayName}</CardTitle>
      <span class="shrink-0 text-lg" title={server.location}>{flag}</span>
    </div>
  </CardHeader>
  <CardContent class="p-0">
    <p class="mb-2 truncate text-sm text-zinc-500">{server.map.split('/').pop()?.replace('.json', '') ?? server.map}</p>

    <div class="flex flex-wrap gap-1">
      <!-- Player count badge -->
      <Badge
        variant="outline"
        class={badgeColor === 'green' ? 'border-green-200 bg-green-50 text-green-700' : badgeColor === 'orange' ? 'border-orange-200 bg-orange-50 text-orange-700' : 'border-red-200 bg-red-50 text-red-700'}
      >
        {server.players}/{server.maxplayers}
      </Badge>

      {#if server.official}
        <Badge variant="secondary">Oficial</Badge>
      {/if}
      {#if isModded}
        <Badge variant="outline" class="border-purple-200 bg-purple-50 text-purple-700">Modded</Badge>
      {/if}
      {#if server.password}
        <Badge variant="outline" class="border-zinc-200 text-zinc-500">🔒 Parolat</Badge>
      {/if}
    </div>
  </CardContent>
</Card>
