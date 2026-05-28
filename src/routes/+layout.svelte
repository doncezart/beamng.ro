<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	const { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<SiteNav />
<main>
	{@render children()}
</main>
<SiteFooter />
