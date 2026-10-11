# links — konan.md

A small Svelte 5 / SvelteKit link page, visually aligned with [konan.md](https://gmkonan.dev/).

- Same light/dark blue palette, local IBM Plex Mono, rounded Ryo avatar and favicons as the blog.
- Centered “Konan” heading and a single subtitle. Twitter/GitHub/AniList are icon-only links above four primary buttons: Visit my website, Send me an email, Ask me a question, Support me. No button subtitles or footer. LinkedIn stays removed.
- Native, keyboard-accessible avatar button flips between Ryo and the existing pixel-art portrait.
- Theme is applied before paint using `konan-theme`, with system preference and blocked-storage fallbacks. This key is shared by convention, **not synchronized between different domains**.
- Links remain available without JavaScript; decorative controls appear only when hydrated. Motion respects `prefers-reduced-motion`.
- No external font, analytics, live profile lookup or background audio requests.

## Development

Use the existing installed dependencies and package scripts (the original dependency record is `deno.lock`):

```sh
bun run dev
bun run check
bun run test
bun run build
bun run preview
```

`test` runs dependency-free Node checks for local assets and link/theme contracts. The redesign was also checked in Chromium on desktop/mobile, both themes, keyboard navigation, reduced motion, blocked storage and JavaScript disabled, with axe accessibility checks.

The project retains `adapter-auto`; a local build does not verify any hosting configuration. Publication is separate from the blog and has not been performed for this alignment.

## Assets

`static/images/ryo.webp` and the PNG favicons are copied from the approved local blog assets. Ryo is from *Bocchi the Rock*; those images remain copyrighted, not relicensed by this repository. Review reuse rights before publication. The original pixel-art portrait in `src/lib/assets/pixelart.png` is preserved, as are pre-existing unused assets.

Fonts are local IBM Plex Mono distributions copied from the blog. See [`static/fonts/IBM-Plex-LICENSE.txt`](static/fonts/IBM-Plex-LICENSE.txt) for the SIL Open Font License. Lucide icons come from the existing `@lucide/svelte` dependency (ISC).

## Centered link-page layout

Content sits slightly above center below the topbar using a 100svh flex column, auto margins and responsive bottom padding (32–64px); short screens scroll naturally instead of cropping controls. Circular Ryo/Konan avatar above centered identity text and a single stack of large blue link buttons; no category dividers or QR-code columns. The top-right dark/light toggle stays keyboard-accessible and persistent. Local-only iteration; no deploy performed.

The four primary buttons are compact (52px tall, up to 360px wide), with 44px social targets above. AniList uses a local inline brand mark from Simple Icons (CC0), not the generic book icon; see `static/images/SOURCES.md`.
