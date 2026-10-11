<script lang="ts">
	import type { Component } from "svelte";
	import type { IconProps } from "@lucide/svelte";

	interface Props {
		link: string;
		name: string;
		description: string;
		icon: Component<IconProps>;
		external?: boolean;
	}
	let { link, name, description, icon: Icon, external = true }: Props = $props();
</script>

<a href={link} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
	<Icon size={20} strokeWidth={1.5} aria-hidden="true" />
	<span class="link-copy"><strong>{name}</strong><span>{description}</span></span>
	<span class="link-arrow" aria-hidden="true">{external ? "↗" : "→"}</span>
	{#if external}<span class="sr-only"> (opens in a new tab)</span>{/if}
</a>

<style>
	a {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		min-height: 76px;
		padding: 0.9rem 0.25rem;
		border-bottom: 1px solid hsl(var(--border));
		transition: color 160ms ease, background-color 160ms ease;
	}
	a:hover { color: hsl(var(--primary)); background: hsl(var(--accent) / 0.35); }
	.link-copy { display: grid; flex: 1; min-width: 0; gap: 0.1rem; }
	.link-copy strong { font-size: 0.9375rem; font-weight: 500; }
	.link-copy > span { color: hsl(var(--muted)); font-size: 0.6875rem; overflow-wrap: anywhere; }
	.link-arrow { color: hsl(var(--primary)); font-size: 1rem; }
	.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
</style>
