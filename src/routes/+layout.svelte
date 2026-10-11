<script lang="ts">
	import "../app.css";
	let { children } = $props();
</script>

<svelte:head>
	<title>Konan — links</title>
	<meta name="description" content="Working with tech. Watching media. Holy skill issues. Find Konan's writing and links." />
	<meta name="theme-color" content="#0b0e14" media="(prefers-color-scheme: dark)" />
	<meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
	<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
	<link rel="icon" href="/favicon.png" type="image/png" sizes="128x128" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
</svelte:head>

<a class="skip-link" href="#main">skip to links</a>
{@render children()}
