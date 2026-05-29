<script lang="ts">
  import { slide } from 'svelte/transition'
  import { config } from '$lib/config'
  import { Button } from '$lib/components/ui/button'
  import { notifyDialog } from '$lib/state/notify.svelte'

  const navLinks = [
    { label: 'Roadmap', href: '/#roadmap' },
    { label: 'Servere', href: '/#servere' },
    { label: 'Creatori', href: '/#creatori' },
    { label: 'Discord', href: '/#discord' },
  ]

  let mobileOpen = $state(false)

  function close() { mobileOpen = false }
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
      <Button onclick={() => (notifyDialog.open = true)} size="sm">
        Notifică-mă la lansare
      </Button>
    </nav>

    <!-- Mobile hamburger toggle -->
    <button
      class="md:hidden inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
      onclick={() => (mobileOpen = !mobileOpen)}
      aria-label={mobileOpen ? 'Închide meniu' : 'Deschide meniu'}
      aria-expanded={mobileOpen}
    >
      {#if mobileOpen}
        <!-- X icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      {:else}
        <!-- Hamburger icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      {/if}
    </button>
  </div>

  <!-- Mobile dropdown panel -->
  {#if mobileOpen}
    <div
      transition:slide={{ duration: 200 }}
      class="md:hidden border-t border-zinc-100 bg-white shadow-md"
    >
      <nav class="mx-auto flex max-w-6xl flex-col px-4 py-3">
        {#each navLinks as link}
          <a
            href={link.href}
            onclick={close}
            class="flex items-center py-3 text-base font-medium text-zinc-700 transition-colors hover:text-primary border-b border-zinc-100 last:border-0"
          >
            {link.label}
          </a>
        {/each}
        <Button
          onclick={() => { notifyDialog.open = true; close() }}
          class="mt-4 mb-2 w-full"
        >
          Notifică-mă la lansare
        </Button>
      </nav>
    </div>
  {/if}
</header>
