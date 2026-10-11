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
	assert.match(page, /<nav aria-label="Konan's links">/);
	assert.doesNotMatch(page, /<h2|<hr|class="(?:category|divider)/);
	assert.match(page, /aria-label=\{theme === "dark" \? "Switch to light theme"/);
	assert.match(await text("src/components/Link.svelte"), /min-height: 72px/);
});
