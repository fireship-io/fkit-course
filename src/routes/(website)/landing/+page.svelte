<script>
  import SlideContent from '../../../lib/components/SlideContent.svelte';
  import { fade, slide, fly } from 'svelte/transition';

    let stepCount = 0;
    let translateStep = 0;

    function changeStep(step) {
        if (step === 'next' && stepCount < 4) {
            stepCount ++;
            translateStep === stepCount * 16.4;
        } else if (step === 'previous' && stepCount !== 0) {
            stepCount --;
            translateStep === stepCount * 16.4;
        }
        console.log(stepCount, translateStep)
        document.getElementById('heroSlider').style.transform = `translate(${stepCount * -16.4}%, ${stepCount * -16.4}%)`;
    }

</script>
<style>
    p, a, h1, h2, h3 {
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

    .slider{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .slide {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
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
        justify-self: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: calc(100% - 3em);
        gap: 1em;
        z-index: 2;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }

    .slideContent h1, h2, h3, p {
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

    .transitionContainer {
        grid-area: 1/1/2/2;
    }

    

</style>
<div class="container">
    <div class="header">
        <div class="about"><p>About</p></div>
        <div class="logo"><img src="/img/batlasLogo_white_outline.webp"></div>
    </div>
    <div class="footer">
        <div class="slider">
            <div class="slide">
                <img class="slideOverlay" src="/img/warrior.webp">
                <div class="slideImage">
                    <img id="heroSlider" src="/img/tileTest.png">
                </div>   
        <div class="slideContent">    
        {#if stepCount === 0}
        <div class="transitionContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                <div class="slideTitle"><h1>Batlas</h1></div>
                <div class="slideSubtitle"><h2>An isometric map-maker</h2></div>
                <div class="slideDescription"><p>An intuitive tool designed to strip away uneccessary prep work and allow Game Masters to dungeon delve without needing to spend hours hunched over their notebooks.</p></div>
        </div>
        {:else if stepCount === 1}
        <div class="transitionContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                <div class="slideTitle"><h2>Ready to play in minutes</h2></div>
                <div class="slideSubtitle"><h3>not hours</h3></div>
                <div class="slideDescription"><p></p></div>
        </div>
            {:else if stepCount === 2}
            <div class="transitionContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                <div class="slideTitle"><h1>Three</h1></div>
                <div class="slideSubtitle"><h2>An isometric map-maker</h2></div>
                <div class="slideDescription"><p>An intuitive tool designed to strip away uneccessary prep work and allow Game Masters to dungeon delve without needing to spend hours hunched over their notebooks.</p></div>
            </div>
            {:else if stepCount === 3}
        <div class="transitionContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                <div class="slideTitle"><h1>Four</h1></div>
                <div class="slideSubtitle"><h2>An isometric map-maker</h2></div>
                <div class="slideDescription"><p>An intuitive tool designed to strip away uneccessary prep work and allow Game Masters to dungeon delve without needing to spend hours hunched over their notebooks.</p></div>
            </div>
            {:else if stepCount === 4}
        <div class="transitionContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                <div class="slideTitle"><h1>Five</h1></div>
                <div class="slideSubtitle"><h2>An isometric map-maker</h2></div>
                <div class="slideDescription"><p>An intuitive tool designed to strip away uneccessary prep work and allow Game Masters to dungeon delve without needing to spend hours hunched over their notebooks.</p></div>
            </div>
            {/if}
        </div>
        </div>
        </div>
        <div class="footerButtons controls">
            <div class="button control" on:click={() => changeStep('previous')}><a>P</a></div>
            <div class="button control" on:click={() => changeStep('next')}><a>N</a></div>
        </div>
        <div class="footerButtons">
            <div class="button patreon"><a>Patreon</a></div>
            <div class="button login"><a>Login</a></div>
        </div>
        <div class="footerLinks">
            <div class="footerLink"><a>Legalities & Policies</a></div>
            <div class="footerLink"><a>Made by Tanner J</a></div>
        </div>
    </div>
</div>