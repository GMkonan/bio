<script lang="ts">
	import { onMount } from "svelte";
	import MeImage from "$lib/assets/pixelart.png";
	import Link from "../components/Link.svelte";
	import { Github, Twitter, Globe, Mail, MessageCircle, Heart, Sun, Moon } from "@lucide/svelte";

	const site = "https://gmkonan.dev";
	const links = [
		{ name: "konan.md", description: "writing, rabbit holes & things i like", link: `${site}/`, icon: Globe },
		{ name: "github", description: "software & questionable experiments", link: "https://github.com/GMkonan", icon: Github },
		{ name: "twitter", description: "@Konantt_", link: "https://twitter.com/Konantt_", icon: Twitter },
		{ name: "mail", description: "konan@gmkonan.dev", link: "mailto:konan@gmkonan.dev", icon: Mail, external: false },
		{ name: "ask", description: "ask me a question. or draw something.", link: `${site}/ask/`, icon: MessageCircle },
		{ name: "support", description: "support THE idiot", link: `${site}/donate/`, icon: Heart },
	];

	let flipped = $state(false);
	let theme = $state<"light" | "dark">("light");
	let ready = $state(false);

	onMount(() => {
		theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
		ready = true;
		const preference = matchMedia("(prefers-color-scheme: dark)");
		const followSystem = () => {
			try {
				const stored = localStorage.getItem("konan-theme");
				if (stored === "light" || stored === "dark") return;
			} catch { /* Storage may be unavailable. */ }
			theme = preference.matches ? "dark" : "light";
			document.documentElement.dataset.theme = theme;
		};
		preference.addEventListener("change", followSystem);
		return () => preference.removeEventListener("change", followSystem);
	});

	function toggleTheme() {
		theme = theme === "dark" ? "light" : "dark";
		document.documentElement.dataset.theme = theme;
		try { localStorage.setItem("konan-theme", theme); } catch { /* Theme still works without persistence. */ }
	}
</script>

<div class="bio-page">
	<header class="topbar">
		<a class="wordmark" href={`${site}/`}>konan<span>.md</span></a>
		{#if ready}
			<button class="theme-toggle" type="button" onclick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
				{#if theme === "dark"}<Sun size={18} aria-hidden="true" />{:else}<Moon size={18} aria-hidden="true" />{/if}
			</button>
		{/if}
	</header>

	<main id="main" tabindex="-1">
		<section class="intro" aria-labelledby="intro-heading">
			<div class="intro-row">
				{#if ready}
					<button class="avatar" type="button" onclick={() => flipped = !flipped} aria-pressed={flipped} aria-label="Flip avatar between Ryo and Konan">
						<span class="avatar-inner" class:flipped>
							<img class="avatar-face" src="/images/ryo.webp" width="320" height="320" alt="Ryo Yamada from Bocchi the Rock" aria-hidden={flipped} />
							<img class="avatar-face avatar-back" src={MeImage} width="128" height="128" alt="Konan's pixel-art avatar" aria-hidden={!flipped} />
						</span>
					</button>
				{:else}
					<img class="avatar" src="/images/ryo.webp" width="320" height="320" alt="Ryo Yamada from Bocchi the Rock" />
				{/if}
				<div class="intro-copy">
					<h1 id="intro-heading">hi, i'm <span>konan.</span></h1>
					<p>Working with tech. Watching media.<br />Holy skill issues.</p>
				</div>
			</div>
			<p class="rabbit-holes">Rabbit holes: Nixos, Pi, Home labbing, Ricing</p>
		</section>

		<nav aria-label="Konan's links">
			<ul>{#each links as link}<li><Link {...link} /></li>{/each}</ul>
		</nav>

		<footer>
			<p>built slowly. updated irregularly.</p>
			<a class="text-link" href={`${site}/whoami/`}>about me</a>
		</footer>
	</main>
</div>

<style>
	.bio-page { width: min(100% - 3rem, 480px); margin-inline: auto; }
	.topbar { display: flex; justify-content: space-between; align-items: center; min-height: 88px; gap: 1rem; }
	.wordmark { font-size: 0.8125rem; font-weight: 600; }
	.wordmark span { color: hsl(var(--primary)); }
	.theme-toggle { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid hsl(var(--border)); border-radius: 6px; background: transparent; }
	.theme-toggle:hover { color: hsl(var(--primary)); background: hsl(var(--accent)); }
	main { padding-top: 2rem; padding-bottom: 2rem; }
	.intro { margin-bottom: 2rem; }
	.intro-row { display: flex; align-items: center; gap: 1.25rem; }
	.intro-copy { min-width: 0; }
	h1 { margin: 0; font-size: clamp(1.3rem, 4vw, 1.75rem); font-weight: 600; line-height: 1.3; letter-spacing: -0.06em; }
	h1 span { color: hsl(var(--primary)); }
	.intro-copy p { margin: 0.5rem 0 0; color: hsl(var(--muted)); font-size: 0.75rem; line-height: 1.8; }
	.rabbit-holes { margin: 1.25rem 0 0; color: hsl(var(--muted)); font-size: 0.6875rem; line-height: 1.9; }
	.avatar { display: block; width: 88px; height: 88px; flex-shrink: 0; border: 0; border-radius: 8px; padding: 0; background: transparent; object-fit: cover; perspective: 800px; }
	.avatar-inner { display: block; position: relative; width: 100%; height: 100%; transition: transform 600ms ease; transform-style: preserve-3d; }
	.avatar-inner.flipped { transform: rotateY(180deg); }
	.avatar-face { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 8px; object-fit: cover; backface-visibility: hidden; }
	.avatar-back { transform: rotateY(180deg); image-rendering: pixelated; }
	ul { list-style: none; padding: 0; margin: 0; border-top: 1px solid hsl(var(--border)); }
	footer { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.25rem 1rem; margin-top: 2rem; color: hsl(var(--muted)); font-size: 0.625rem; }
	footer p { margin: 0; }
	footer a { display: inline-flex; align-items: center; min-height: 44px; }
	@media (max-width: 380px) {
		.bio-page { width: calc(100% - 2rem); }
		.intro-row { gap: 0.875rem; }
		.avatar { width: 72px; height: 72px; }
		.intro-copy p { font-size: 0.6875rem; }
		main { padding-top: 1rem; }
	}
</style>
