<script lang="ts">
  import { config } from '$lib/config'

  const year = new Date().getFullYear()
</script>

<footer class="bg-zinc-900 text-zinc-400">
  <div class="mx-auto max-w-6xl px-4 py-12">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <!-- Brand -->
      <div>
        <a href="/" class="text-xl font-bold text-white">{config.brandName}</a>
        <p class="mt-1 text-sm">Comunitatea română de BeamNG.drive multiplayer.</p>
      </div>

      <!-- Discord CTA -->
      <a
        href={config.discordInvite}
        target="_blank"
        rel="noopener noreferrer"
        class="shrink-0 text-sm text-primary hover:underline"
      >
        Alătură-te pe Discord →
      </a>
    </div>

    <!-- Bottom: copyright + disclaimer -->
    <div class="mt-8 flex flex-col gap-1 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <span class="text-xs">© {year} {config.brandName}</span>
      <span class="text-xs text-zinc-500">Neafiliat cu BeamNG GmbH. BeamNG.drive este marcă înregistrată a BeamNG GmbH.</span>
    </div>
  </div>
</footer>
