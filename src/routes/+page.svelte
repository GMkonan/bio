<script lang="ts">
	import { onMount } from "svelte";
	import MeImage from "$lib/assets/pixelart.png";
	import Link from "../components/Link.svelte";
	import { Github, Twitter, Globe, Mail, MessageCircle, Heart, Sun, Moon } from "@lucide/svelte";

	const site = "https://gmkonan.dev";
	const socials = [
		{ name: "Twitter", link: "https://twitter.com/Konantt_", icon: Twitter },
		{ name: "GitHub", link: "https://github.com/GMkonan", icon: Github },
	];
	const links = [
		{ name: "Visit my website", link: `${site}/`, icon: Globe },
		{ name: "Send me an email", link: "mailto:konan@gmkonan.dev", icon: Mail, external: false },
		{ name: "Ask me a question", link: `${site}/ask/`, icon: MessageCircle },
		{ name: "Support me", link: `${site}/donate/`, icon: Heart },
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
					<h1 id="intro-heading">Konan</h1>
					<p>Random Nerd on the internet stuck on multiple rabbit holes. Check my work, ask me stuff, support me or just talk to me!</p>
				</div>
			</div>
		</section>

		<nav class="socials" aria-label="Social media">
			{#each socials as social}
				<a href={social.link} target="_blank" rel="noopener noreferrer" aria-label={`${social.name} (opens in a new tab)`} title={social.name}>
					<social.icon size={22} strokeWidth={1.5} aria-hidden="true" />
				</a>
			{/each}
		</nav>

		<nav aria-label="Konan's links">
			<ul>{#each links as link}<li><Link {...link} /></li>{/each}</ul>
		</nav>

	</main>
</div>

<style>
	.bio-page { width: min(100% - 2.5rem, 480px); margin-inline: auto; }
	.topbar { display: flex; justify-content: space-between; align-items: center; min-height: 72px; gap: 1rem; }
	.wordmark { font-size: 0.75rem; font-weight: 600; }
	.wordmark span { color: hsl(var(--primary)); }
	.theme-toggle { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid hsl(var(--border)); border-radius: 50%; background: transparent; }
	.theme-toggle:hover { color: hsl(var(--primary)); background: hsl(var(--accent)); }
	main { padding-top: 0.5rem; padding-bottom: 2rem; }
	.intro { margin-bottom: 1rem; text-align: center; }
	.intro-row { display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
	.intro-copy { min-width: 0; }
	h1 { margin: 0; font-size: clamp(1.5rem, 5vw, 1.9rem); font-weight: 600; line-height: 1.3; letter-spacing: -0.06em; }
	h1 { color: hsl(var(--primary)); }
	.intro-copy p { margin: 0.75rem 0 0; color: hsl(var(--muted)); font-size: 0.8125rem; line-height: 1.8; }
	.socials { display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; }
	.socials a { display: grid; place-items: center; width: 44px; height: 44px; color: hsl(var(--foreground)); border-radius: 50%; }
	.socials a:hover { color: hsl(var(--primary)); background: hsl(var(--accent)); }
	.avatar { display: block; width: 136px; height: 136px; flex-shrink: 0; border: 2px solid hsl(var(--primary)); border-radius: 50%; padding: 4px; background: hsl(var(--background)); object-fit: cover; perspective: 800px; }
	.avatar-inner { display: block; position: relative; width: 100%; height: 100%; transition: transform 600ms ease; transform-style: preserve-3d; }
	.avatar-inner.flipped { transform: rotateY(180deg); }
	.avatar-face { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 50%; object-fit: cover; backface-visibility: hidden; }
	.avatar-back { transform: rotateY(180deg); image-rendering: pixelated; }
	ul { display: grid; gap: 0.75rem; list-style: none; padding: 0; margin: 0; }
	@media (max-width: 380px) { .bio-page { width: calc(100% - 2rem); } .avatar { width: 120px; height: 120px; } }
</style>
