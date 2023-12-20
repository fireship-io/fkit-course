<script>
  import { onMount } from 'svelte';
  import SlideContent from '../../../lib/components/SlideContent.svelte';
  import { fade, slide, fly } from 'svelte/transition';

    let aboutOpen = false;
    let screenSize = 0;


    let stepCount = 0;
    let stepPositions = [
        {
            x: 5,
            y: -5
        },
        {
            x: -10,
            y: -12
        },
        {
            x: -30,
            y: -30
        },
        {
            x: -46,
            y: -45
        },
        {
            x: -63,
            y: -55
        },
        {
            x: -78,
            y: -72
        }
    ]
    let translateStep = 0;


    function toggleAboutOpen() {
        aboutOpen = !aboutOpen;
    }

    function changeStep(step) {
        if (step === 'next' && stepCount < 5) {
            stepCount ++;
        } else if (step === 'previous' && stepCount !== 0) {
            stepCount --;
        }
        document.getElementById('heroSlider').style.transform = `translate(${stepPositions[stepCount].x}%, ${stepPositions[stepCount].y}%)`;
    }

    onMount(() => {
        document.getElementById('heroSlider').style.transform = `translate(${stepPositions[stepCount].x}%, ${stepPositions[stepCount].y}%)`;
    })

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
        z-index: 888;
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
        z-index: 5;
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
        top: calc(24% - 5em);
        left: calc(43% - 5em);
        max-height: 10em;
        width: auto;
        object-fit: contain;
        max-width: 10em;
        z-index: 10;
    }

    #heroSlider {
        z-index: 1;
        pointer-events: none;
    }

    .visibleContent {
        display: flex;
    }

    .transitionContainer {
        grid-area: 1/1/2/2;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 1em;
        padding-bottom: 2em;
    }

    .about {
        z-index: 99;
    }

    .aboutContainer {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: var(--batlas-black);
        z-index: 999;
        padding: 2em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
    }

    .aboutContainer .copy{
        height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 1em;
    }

    .aboutContainer h2 {
        color: var(--batlas-white);
    }

    .aboutContainer .close {
        position: absolute;
        top: 1em;
        right: 1em;
        width:auto;
        display: inline;
        padding: 0.5em 1em;
        height: auto;
    }

    .aboutContainer .aboutImage {
        height: auto;
        width: 80%;
        object-fit: contain;
    }

    @media only screen and (min-width: 460px) {

        .slideContent{
            z-index: 99;
        }
        .transitionContainer {
            padding-bottom: 2em;
            justify-content: flex-end;
        }

        .slider {
        }

        .slider .slideImage {
        max-height: 30dvh;
        width: 100vw;
        overflow: visible;
        z-index: 5;
    }

    .slider .slideImage img {
        width: 200%;
    }
    }

    @media only screen and (min-width: 700px) {
    
    .slide {
        flex-direction: column;
        justify-content:flex-start;
        align-items: flex-start;
    }

    .transitionContainer {
        width: 100%;
        padding-bottom: 2em;
        justify-content: flex-end;
        align-content: flex-start;
    }

    .slider .slideImage img {
        width: 150%;
    }

    .slideContent {
        max-width: 40%;
        justify-self: flex-start;
    }

    .slideTitle, .slideSubtitle, .slideDescription p, .slideSubtitle h3 {
        align-self: flex-start;
        text-align: left;
    }

    .footer {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        padding: 0em 1.5em;
    }

    .footerButtons {
        width: auto;
        justify-self: flex-start;
        align-self: flex-start;
    }

    .footerLinks {
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
        bottom: 1em;
        right: 1em;
        width: auto;
        background-color: var(--batlas-black);
        padding: 0.3em 0.6em;
        border-radius: 0.6em;
        z-index: 999;
    }

    @media only screen and (min-width: 900px) {
        .slider .slideImage img {
            max-width: 1920px;
            width: 100%;
        }
        .slideContent {
        max-width: 33%;
        justify-self: flex-start;
    }
    }
}

</style>

<svelte:window bind:innerWidth = {screenSize}/>

<div class="container">
    <div class="header">
        <div class="about" on:click={toggleAboutOpen}><p>About</p></div>
        <div class="logo"><img src="/img/batlasLogo_white_outline.webp"></div>
    </div>
    {#if aboutOpen}
    <div class="aboutContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
        <div class="copy">
            <h2>About Batlas</h2>
            <p>Batlas is a map-making and game-prep tool for fantasy tabletop roleplaying games like D&D and Pathfinder.</p>
            <p>With the advent of 'D&D shows' these kinds of games have become almost a production, which can be fine (and fun) but it's also a huge amount of work and pressure.</p>
            <p>Batlas aims to let tables recapture the magic of just a few friends sharing their imagination and rolling dice.</p>
        </div>
        <div class="button"><a>Log in</a></div>
        <img class="aboutImage" src="/img/warrior.webp">
        <div class="button close" on:click={toggleAboutOpen}><a>X</a></div>
    </div>
    {/if}
    <div class="footer">
        <div class="footerButtons controls">
            <div class="control" on:click={() => changeStep('previous')}>
                {#if stepCount !== 0}
                <img src="/img/previousControl.webp">
                {/if}
            </div>
            <div class="control" on:click={() => changeStep('next')}>
                {#if stepCount !== 5}
                <img src="/img/nextControl.webp">
                {/if}
            </div>
        </div>
        <div class="slider">
            <div class="slide">
                <div class="slideImage">
                    <img id="heroSlider" src="/img/landingPageSlider.webp">
                </div>   
        <div class="slideContent">    
            {#if stepCount === 0}
            <div class="transitionContainer slide1" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                    <div class="slideTitle"><h1>Batlas</h1></div>
                    <div class="slideSubtitle"><h2>Take the pain out of prep</h2></div>
                    <div class="slideDescription"><p>Being a Game Master takes a lot of prep. Too much. Wouldn't it be nice if there was a tool that let you plan tense and intricate dungeon crawls in minutes, not hours?</p></div>
            </div>
            {:else if stepCount === 1}
            <div class="transitionContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                    <div class="slideTitle"><h2>Isometric maps made simple!</h2></div>
                    <div class="slideSubtitle"><h3>Point & Click hand drawn maps</h3></div>
                    <div class="slideDescription"><p>Build out a map that has hours worth of playtime in just a few minutes.</p></div>
            </div>
            {:else if stepCount === 2}
            <div class="transitionContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                <div class="slideTitle"><h2>On-map notes</h2></div>
                <div class="slideSubtitle"><h3>No more folders full of loose sheets or sprawling online wikis</h3></div>
                <div class="slideDescription"><p>Batlas lets you attach notes to the tile that make up your map, keeping your prep simple and singular.</p></div>
            </div>
            {:else if stepCount === 3}
            <div class="transitionContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                <div class="slideTitle"><h2>Pre-made dungeon library</h2></div>
                <div class="slideSubtitle"><h3>For the nights where even 10 minutes is too much prep</h3></div>
                <div class="slideDescription"><p>Dungeon adventures designed to be dropped into any campaign.</p></div>
            </div>
            {:else if stepCount === 4}
            <div class="transitionContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                <div class="slideTitle"><h2>Regular updates</h2></div>
                <div class="slideSubtitle"><h3>There's always something new in the dungeon</h3></div>
                <div class="slideDescription"><p>With a features roadmap, premium user forum, and fortnightly dungeon additions, Batlas is always improving.</p></div>
            </div>
            {:else if stepCount === 5}
            <div class="transitionContainer" in:fade={{delay:300, duration:150}} out:fade={{delay:0, duration:150}}>
                <div class="slideTitle"><h2>Your long rest is over</h2></div>
                <div class="slideSubtitle"><h3>Delve into the dungeon!</h3></div>
                <div class="button"><a>Login</a></div>
            </div>
            {/if}
        </div>
        </div>
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