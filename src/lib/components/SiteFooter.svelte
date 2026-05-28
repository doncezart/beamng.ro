<script lang="ts">
  import { config } from '$lib/config'

  const navLinks = [
    { label: 'Servere', href: '/#servere' },
    { label: 'Discord', href: '/#discord' },
    { label: 'Creatori', href: '/#creatori' },
    { label: 'Roadmap', href: '/#roadmap' },
    { label: 'Noutăți', href: '/noutati' },
  ]

  const year = new Date().getFullYear()
</script>

<footer class="bg-zinc-900 text-zinc-400">
  <div class="mx-auto max-w-6xl px-4 py-12">
    <div class="grid grid-cols-1 gap-10 md:grid-cols-3">
      <!-- Brand column -->
      <div>
        <a href="/" class="text-xl font-bold text-white">{config.brandName}</a>
        <p class="mt-2 text-sm">Comunitatea română de BeamNG.drive multiplayer.</p>
        <a
          href={config.discordInvite}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-block text-sm text-primary hover:underline"
        >
          Alătură-te pe Discord →
        </a>
      </div>

      <!-- Navigation column -->
      <div>
        <h3 class="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-300">Navigare</h3>
        <ul class="space-y-2">
          {#each navLinks as link}
            <li>
              <a href={link.href} class="text-sm hover:text-white">{link.label}</a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Legal column -->
      <div>
        <h3 class="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-300">Legal</h3>
        <p class="text-sm">
          Site neoficial. Neafiliat cu BeamNG GmbH.
        </p>
        <p class="mt-2 text-sm">
          BeamNG.drive este marcă înregistrată a BeamNG GmbH.
        </p>
      </div>
    </div>

    <div class="mt-10 border-t border-zinc-800 pt-6 text-center text-sm">
      © {year} {config.brandName}. Neafiliat cu BeamNG GmbH.
    </div>
  </div>
</footer>
