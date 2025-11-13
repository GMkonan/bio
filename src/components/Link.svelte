<script>
    export let link = "";
    export let name = "";
    export let icon = null;
</script>

<a
    target="_blank"
    class="flex justify-center items-center gap-x-2 p-2 w-[350px] bg-(--color-accent1) rounded-lg text-white font-bold"
    href={link}
>
    {#if icon}
        <!-- Render Lucide component here -->
        <svelte:component this={icon} size="20" stroke-width="2" />
    {/if}
    <span>
        {name}
    </span>
</a>
