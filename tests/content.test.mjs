import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url));
const text = async (path) => (await read(path)).toString();

test("local Ryo and favicons retain their source dimensions", async () => {
	for (const [name, size] of [["favicon-32.png", 32], ["favicon.png", 128], ["apple-touch-icon.png", 180]]) {
		const image = await read(`static/${name}`);
		assert.equal(image.subarray(1, 4).toString(), "PNG");
		assert.equal(image.readUInt32BE(16), size);
		assert.equal(image.readUInt32BE(20), size);
	}
	const ryo = await read("static/images/ryo.webp");
	assert.equal(ryo.subarray(0, 4).toString(), "RIFF");
	assert.equal(ryo.subarray(8, 12).toString(), "WEBP");
});

test("IBM Plex fonts and license are served locally, without Google Fonts", async () => {
	for (const weight of ["Regular", "Medium", "SemiBold"]) {
		const font = await read(`static/fonts/IBMPlexMono-${weight}.woff2`);
		assert.equal(font.subarray(0, 4).toString(), "wOF2");
	}
	assert.match(await text("static/fonts/IBM-Plex-LICENSE.txt"), /SIL OPEN FONT LICENSE/);
	assert.doesNotMatch(await text("src/app.css"), /fonts\.googleapis|fonts\.gstatic/);
});

test("links use the blog's identity and no LinkedIn", async () => {
	const page = await text("src/routes/+page.svelte");
	assert.match(page, /https:\/\/gmkonan\.dev/);
	assert.match(page, /mailto:konan@gmkonan\.dev/);
	assert.match(page, /https:\/\/github\.com\/GMkonan/);
	assert.match(page, /https:\/\/twitter\.com\/Konantt_/);
	assert.ok(page.includes("https://anilist.co/user/Konan12/"));
	assert.match(page, /\/ask\//);
	assert.match(page, /\/donate\//);
	assert.doesNotMatch(page, /linkedin/i);
	const link = await text("src/components/Link.svelte");
	assert.match(link, /noopener noreferrer/);
	assert.match(link, /opens in a new tab/);
});

test("theme bootstraps before application head and has no remote storage dependency", async () => {
	const html = await text("src/app.html");
	assert.ok(html.indexOf("localStorage.getItem") < html.indexOf("%sveltekit.head%"));
	assert.match(html, /konan-theme/);
	assert.match(html, /prefers-color-scheme: dark/);
	assert.match(html, /catch/);
	assert.match(await text("src/app.css"), /:root:not\(\[data-theme\]\)/);
});

test("avatar is keyboard-operable and animation has a reduced-motion override", async () => {
	const page = await text("src/routes/+page.svelte");
	assert.match(page, /<button class="avatar" type="button"/);
	assert.match(page, /aria-pressed=\{flipped\}/);
	assert.match(page, /\$state\(false\)/);
	assert.match(await text("src/app.css"), /prefers-reduced-motion: reduce/);
	assert.match(await text("src/routes/+layout.svelte"), /skip to links/);
});

test("reference layout has a centered circular portrait and one undivided button stack", async () => {
	const page = await text("src/routes/+page.svelte");
	assert.match(page, /flex-direction: column/);
	assert.match(page, /border-radius: 50%/);
	assert.match(page, /<nav class="primary-links" aria-label="Konan's links">/);
	assert.doesNotMatch(page, /<h2|<hr|class="(?:category|divider)/);
	assert.match(page, /aria-label=\{theme === "dark" \? "Switch to light theme"/);
	assert.match(await text("src/components/Link.svelte"), /min-height: 52px/);
});

test("simple identity, social icons and four title-only buttons", async () => {
	const page = await text("src/routes/+page.svelte");
	assert.match(page, /<h1 id="intro-heading">Konan<\/h1>/);
	assert.match(page, /Random Nerd on the internet stuck on multiple rabbit holes\. Check my work, ask me stuff, support me or just talk to me!/);
	assert.match(page, /aria-label="Social media"/);
	assert.ok(page.indexOf('class="socials"') < page.indexOf('aria-label="Konan\'s links"'));
	for (const title of ["Visit my website", "Send me an email", "Ask me a question", "Support me"]) assert.ok(page.includes(title));
	assert.doesNotMatch(page, /<footer|hi, i'm|class="rabbit-holes"|description:/);
	assert.doesNotMatch(await text("src/components/Link.svelte"), /description|<span>\{description\}/);
});

test("browser tab names the owner and the links page", async () => {
	assert.match(await text("src/routes/+layout.svelte"), /<title>Konan — links<\/title>/);
});


test("AniList uses its local brand mark alongside other socials; buttons stay compact", async () => {
	const page = await text("src/routes/+page.svelte");
	assert.match(page, /icon: AniListIcon/);
	assert.doesNotMatch(page, /BookOpen/);
	assert.match(await text("src/components/AniListIcon.svelte"), /viewBox="0 0 24 24"/);
	assert.match(await text("src/components/AniListIcon.svelte"), /fill="currentColor"/);
	assert.match(page, /max-width: 360px/);
	assert.match(await text("static/images/SOURCES.md"), /Simple Icons, CC0/);
});


test("bio sits slightly above center without a fixed content height", async () => {
	const page = await text("src/routes/+page.svelte");
	assert.match(page, /min-height: 100svh/);
	assert.match(page, /margin-block: auto/);
	assert.match(page, /padding-bottom: clamp\(2rem, 6svh, 4rem\)/);
	assert.match(page, /flex-shrink: 0/);
	const mainStyle = page.match(/\tmain \{([^}]+)\}/)?.[1];
	assert.ok(mainStyle);
	assert.doesNotMatch(mainStyle, /position: absolute|overflow: hidden|height:/);
});
