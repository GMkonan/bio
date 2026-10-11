<script lang="ts">
	import type { Component } from "svelte";
	import type { IconProps } from "@lucide/svelte";

	interface Props {
		link: string;
		name: string;
		icon: Component<IconProps>;
		external?: boolean;
	}
	let { link, name, icon: Icon, external = true }: Props = $props();
</script>

<a href={link} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
	<Icon size={18} strokeWidth={1.5} aria-hidden="true" />
	<span class="link-copy"><strong>{name}</strong></span>
	<span class="link-arrow" aria-hidden="true">{external ? "↗" : "→"}</span>
	{#if external}<span class="sr-only"> (opens in a new tab)</span>{/if}
</a>

<style>
	a { display: grid; grid-template-columns: 24px minmax(0, 1fr) 24px; align-items: center; gap: 0.75rem; width: 100%; min-height: 52px; padding: 0.6rem 0.85rem; border: 1px solid hsl(var(--primary) / 0.35); border-radius: 8px; background: hsl(var(--primary)); color: hsl(var(--button-foreground)); transition: transform 160ms ease, filter 160ms ease; }
	a:hover { filter: brightness(1.08); transform: translateY(-2px); }
	a:focus-visible { outline: 2px solid hsl(var(--foreground)); outline-offset: 4px; }
	.link-copy { display: grid; min-width: 0; gap: 0.1rem; text-align: center; }
	.link-copy strong { font-size: 0.8125rem; font-weight: 600; }
	.link-arrow { justify-self: end; font-size: 1rem; }
	.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
</style>
