<script>
    export let stepCount
    let translateStep = stepCount * -16.4;

</script>

<style>
    p, a, h1, h2 {
        margin: 0;
        color: var(--batlas-white)
    }

    .header div {
        width: 40%;
    }

    .header .about {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .header .logo {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .header .logo img {
        height: auto;
        max-width: 5em;
        object-fit: contain;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100dvh;
        width: 100%;
        background-color: var(--batlas-black);
        padding: 10em 0em;
    }

    .header {
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 10vh;
        width: calc(100% - 3em);
        background-color: var(--batlas-black);
    }

    .footer {
        position: fixed;
        bottom: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100vw;
        gap: 1em;
        background-color: var(--batlas-black);
        flex-wrap: wrap;
    }

    .footer .controls {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: calc(100% - 3em);
    }

    .controls .control {
        width: auto;
        padding: 1em;
        z-index: 999;
    }

    .footerButtons {
        width: calc(100% - 3em);
        display: grid;
        gap: 1em;
        grid-template-columns: 1fr 1fr;
    }

    .footerLinks {
        width: calc(100% - 3em);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 5vh;
        width: 100%;
        gap: 1em;
        padding: 1em 3em;
        background-color: var(--batlas-black);
        border: 1px solid var(--batlas-white);
        border-radius: 0.6em;
    }

    .button:hover {
        background-color: var(--batlas-white);
        border: 1px solid var(--batlas-black);
        cursor: pointer;
    }

    .button:hover a {
        color: var(--batlas-black);
    }

    .slide {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 1em;
    }

    .slider .slideImage {
        max-height: 30dvh;
        width: 100vw;
        overflow: visible;
    }

    .slider .slideImage img {
        width: 300%;
        transition: all 0.5s ease-in-out;
        z-index: 1;
    }

    .slideContent {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: calc(100% - 3em);
        gap: 1em;
        z-index: 2;
        display: flex;
    }

    .slideContent h1, h2, p {
        text-align: center;
    }

    .slideContent h2 {
        font-size: 2em;
    
    }

    .slideOverlay {
        position: absolute;
        top: 0%;
        left: calc(50% - 5em);
        height: 5em;
        max-width: 10em;
        z-index: 10;
    }

    .visibleContent {
        display: flex;
    }

    

</style>

{#if stepCount === 0}
<div class="slideContent">
    <div class="slideTitle"><h1>Batlas</h1></div>
    <div class="slideSubtitle"><h2>An isometric map-maker</h2></div>
    <div class="slideDescription"><p>An intuitive tool designed to strip away uneccessary prep work and allow Game Masters to dungeon delve without needing to spend hours hunched over their notebooks.</p></div>
</div>
{:else if stepCount === 1}
<div class="slideContent">
    <div class="slideTitle"><h1>Two</h1></div>
    <div class="slideSubtitle"><h2>An isometric map-maker</h2></div>
    <div class="slideDescription"><p>An intuitive tool designed to strip away uneccessary prep work and allow Game Masters to dungeon delve without needing to spend hours hunched over their notebooks.</p></div>
</div>
{/if}

