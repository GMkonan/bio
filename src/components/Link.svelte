<script>
    export let link = "";
    export let name = "";
    export let icon = null;
</script>

<a
    target="_blank"
    class="flex justify-center items-center text-lg gap-x-2 p-2 w-[320px] xs:w-[350px] bg-(--color-accent1) rounded-lg text-white font-bold transform transition-transform duration-200 hover:scale-105"
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
