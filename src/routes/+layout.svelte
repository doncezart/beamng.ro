<script lang="ts">
	import './layout.css';
	import type { LayoutData } from './$types';
	import favicon from '$lib/assets/favicon.svg';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import NotifyDialog from '$lib/components/NotifyDialog.svelte';
	import { notifyDialog } from '$lib/state/notify.svelte';

	const { children, data }: { children: import('svelte').Snippet; data: LayoutData } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>
<SiteNav />
{#if notifyDialog.open}
	<NotifyDialog siteKey={data.turnstileSiteKey} />
{/if}
<main>
	{@render children()}
</main>
<SiteFooter />
