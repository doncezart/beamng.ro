<div class="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 text-white shadow-xl">
  <!-- Server header -->
  <div class="flex items-center gap-2 border-b border-zinc-700 px-4 py-3">
    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">B</div>
    <span class="font-semibold">BeamNG România</span>
    <svg class="ml-auto h-4 w-4 text-zinc-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
  </div>

  <!-- Sidebar channels -->
  <div class="p-3">
    <!-- Text channels section -->
    <div class="mb-1 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">Text</div>
    {#each ['general', 'reguli', 'anunțuri', 'showcase-masini', 'off-topic'] as channel}
      <div class="flex cursor-default items-center gap-2 rounded px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700">
        <span class="text-zinc-400">#</span>
        {channel}
      </div>
    {/each}

    <!-- Voice channels section -->
    <div class="mb-1 mt-3 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">Voce</div>
    {#each ['Lobby', 'Racing', 'Cruise'] as channel}
      <div class="flex cursor-default items-center gap-2 rounded px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700">
        <svg class="h-4 w-4 text-zinc-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        {channel}
      </div>
    {/each}
  </div>
</div>
