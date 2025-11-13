<script lang="ts">
    import RyoImage from "$lib/assets/ryo-favicon.png";
    import MeImage from "$lib/assets/pixelart.png";
    import Link from "../components/Link.svelte";
    import { Github, Twitter, Linkedin, Globe, Mail } from "@lucide/svelte";

    const urls = {
        github: "https://github.com/GMkonan",
        linkedin: "https://www.linkedin.com/in/gmkonan/",
        blog: "https://gmkonan.dev/",
        twitter: "https://x.com/Konantt_",
        mail: "mailto:guilherme@gmkonan.dev",
    };

    let flipped = false;

    function toggleFlip() {
        flipped = !flipped;
    }
</script>

<div class="flex flex-col justify-center items-center h-full">
    <div class="flip-container" on:click={toggleFlip}>
        <div class="flex-inner" class:flipped>
            <img
                alt="ryo"
                src={RyoImage}
                class="flip-face front h-32 w-32 p-2 border border-[var(--color-accent1)] rounded-full"
            />
            <img
                alt="me"
                src={MeImage}
                class="flip-face back h-32 w-32 p-2 border border-[var(--color-accent1)] rounded-full"
            />
        </div>
    </div>
    <h1 class="text-3xl pt-2 pb-1 font-bold">Konan</h1>
    <p class="pb-4">
        Fullstack Developer. Reach out on any of the socials below
    </p>
    <section class="flex flex-col gap-y-4">
        <Link link={urls.github} name="Github" icon={Github} />
        <Link link={urls.blog} name="Blog" icon={Globe} />
        <Link link={urls.linkedin} name="Linkedin" icon={Linkedin} />
        <Link link={urls.twitter} name="Twitter" icon={Twitter} />
        <Link link={urls.mail} name="Mail Me" icon={Mail} />
    </section>
</div>

<style>
    .flip-container {
        perspective: 1000px;
        display: inline-block;
        cursor: pointer;
    }

    .flex-inner {
        position: relative;
        width: 8rem;
        height: 8rem;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .flipped {
        transform: rotateY(180deg);
    }

    .flip-face {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
    }

    .flip-face.back {
        transform: rotateY(180deg);
    }
</style>
