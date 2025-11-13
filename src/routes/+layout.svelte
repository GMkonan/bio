<script lang="ts">
    import "../app.css";
    // import favicon from '$lib/assets/favicon.svg';
    import favicon from "$lib/assets/ryo.jpg";

    let { children } = $props();
</script>

<svelte:head>
    <title>Konan</title>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
