<script lang="ts">
  import { onMount } from 'svelte'
  import { enhance } from '$app/forms'
  import { notifyDialog } from '$lib/state/notify.svelte'

  interface Props { siteKey: string }
  const { siteKey }: Props = $props()

  let turnstileToken = $state('')
  let formError = $state('')
  let submitting = $state(false)
  let success = $state(false)
  let container: HTMLDivElement | undefined = $state()
  let widgetId: string | undefined

  function close() {
    notifyDialog.open = false
    success = false
    formError = ''
    turnstileToken = ''
  }

  onMount(() => {
    // Retry until the Turnstile script has loaded
    const tryRender = () => {
      const ts = (window as any).turnstile
      if (ts && container) {
        widgetId = ts.render(container, {
          sitekey: siteKey,
          callback: (token: string) => { turnstileToken = token },
          'expired-callback': () => { turnstileToken = '' },
          theme: 'light',
        })
      } else {
        setTimeout(tryRender, 150)
      }
    }
    tryRender()

    return () => {
      const ts = (window as any).turnstile
      if (widgetId !== undefined && ts) ts.remove(widgetId)
    }
  })
</script>

<!-- Backdrop -->
<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  role="presentation"
  onclick={(e) => { if (e.target === e.currentTarget) close() }}
>
  <!-- Panel -->
  <div
    class="relative w-full max-w-md rounded-2xl bg-white shadow-2xl"
    role="dialog"
    aria-modal="true"
    aria-labelledby="notify-title"
  >
    <!-- Close -->
    <button
      onclick={close}
      class="absolute right-4 top-4 cursor-pointer rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
      aria-label="Închide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <div class="p-6">
      {#if success}
        <!-- Success state -->
        <div class="py-8 text-center">
          <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-zinc-900">Te-am înregistrat!</h3>
          <p class="mt-2 text-sm text-zinc-500">Vei fi notificat prin email când lansăm serverul Discord</p>
          <button
            onclick={close}
            class="mt-6 cursor-pointer rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Închide
          </button>
        </div>
      {:else}
        <h2 id="notify-title" class="text-lg font-semibold text-zinc-900">Notifică-mă la lansare</h2>
        <p class="mt-1 text-sm text-zinc-500">Lasă emailul tău și te anunțăm când lansăm serverul Discord</p>

        <form
          method="POST"
          action="/?/notify"
          class="mt-5 space-y-4"
          use:enhance={() => {
            submitting = true
            formError = ''
            return async ({ result }) => {
              submitting = false
              if (result.type === 'success') {
                success = true
              } else if (result.type === 'failure') {
                formError = (result.data?.error as string) ?? 'A apărut o eroare'
                // Reset captcha on failure
                const ts = (window as any).turnstile
                if (widgetId !== undefined && ts) {
                  ts.reset(widgetId)
                  turnstileToken = ''
                }
              }
            }
          }}
        >
          <!-- Email -->
          <div>
            <label for="notify-email" class="block text-sm font-medium text-zinc-700">
              Email <span class="text-primary">*</span>
            </label>
            <input
              id="notify-email"
              name="email"
              type="email"
              required
              autocomplete="email"
              placeholder="adresa@email.com"
              class="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <!-- Message -->
          <div>
            <label for="notify-message" class="block text-sm font-medium text-zinc-700">
              Mesaj <span class="text-xs font-normal text-zinc-400">(opțional)</span>
            </label>
            <textarea
              id="notify-message"
              name="message"
              rows="3"
              placeholder="Spune-ne ceva despre tine sau ce vrei să vezi în comunitate…"
              class="mt-1 w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            ></textarea>
          </div>

          <!-- Turnstile widget -->
          <div bind:this={container}></div>
          <input type="hidden" name="cf-turnstile-response" value={turnstileToken} />

          <!-- Error -->
          {#if formError}
            <p class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{formError}</p>
          {/if}

          <!-- Disclaimer -->
          <p class="text-xs text-zinc-400">
            Prin trimiterea acestui formular ești de acord să te abonezi la newsletter-ul nostru și să fii anunțat la lansarea serverului Discord BeamNG România
          </p>

          <!-- Submit -->
          <button
            type="submit"
            disabled={submitting || !turnstileToken}
            class="w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Se trimite…' : 'Trimite'}
          </button>
        </form>
      {/if}
    </div>
  </div>
</div>
