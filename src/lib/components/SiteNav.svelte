<script lang="ts">
  import { config } from '$lib/config'
  import { Button } from '$lib/components/ui/button'
  import { Sheet, SheetContent, SheetTrigger } from '$lib/components/ui/sheet'

  const navLinks = [
    { label: 'Servere', href: '/#servere' },
    { label: 'Discord', href: '/#discord' },
    { label: 'Creatori', href: '/#creatori' },
    { label: 'Roadmap', href: '/#roadmap' },
    { label: 'Noutăți', href: '/#noutati' },
  ]

  let mobileOpen = $state(false)
</script>

<header class="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
  <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
    <!-- Brand -->
    <a href="/" class="text-xl font-bold text-primary">
      {config.brandName}
    </a>

    <!-- Desktop nav -->
    <nav class="hidden items-center gap-6 md:flex">
      {#each navLinks as link}
        <a href={link.href} class="text-sm font-medium text-zinc-600 transition-colors hover:text-primary">
          {link.label}
        </a>
      {/each}
      <Button href={config.discordInvite} target="_blank" rel="noopener noreferrer" size="sm">
        Alătură-te Discord
      </Button>
    </nav>

    <!-- Mobile hamburger -->
    <div class="md:hidden">
      <Sheet bind:open={mobileOpen}>
        <SheetTrigger>
          <Button variant="ghost" size="sm" aria-label="Deschide meniu">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" class="w-72">
          <nav class="mt-8 flex flex-col gap-4">
            {#each navLinks as link}
              <a
                href={link.href}
                onclick={() => (mobileOpen = false)}
                class="text-base font-medium text-zinc-700 hover:text-primary"
              >
                {link.label}
              </a>
            {/each}
            <Button href={config.discordInvite} target="_blank" rel="noopener noreferrer" class="mt-2">
              Alătură-te Discord
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</header>
