<script>
  import OffScreenMenu from './OffScreenMenu.svelte';

    import {page} from '$app/stores';
    import { currentAdventure, playAdventureCurrent } from '$lib/adventureData';
    import { screenChoice, offScreenMenu, activeRule, activeTile } from "$lib/dashboardState";
    import { db, userData, auth, user } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup, signOut, deleteUser, reauthenticateWithCredential } from "firebase/auth";
    import Icons from './Icons.svelte';


    let screenSize = 0;

    function clearActiveTile() {
        activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null, tileNotes: ""});
    }

    function toggleOffScreenMenu() {
        offScreenMenu.set(!$offScreenMenu);
    }

    function setScreenChoice(choice){
        screenChoice.set(`${choice}`);
    }

    function emptyCurrentAdventure() {
        currentAdventure.set({
            title: "",
            notes:
            {
                enemy: "",
                quest: "",
                npc: "",
                goal: "",
                scene: "",
                push: "",
                gimmick: ""
            },
            map: "",
            userId: "",
            adventureId: "",
        });
        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
    };

    function backToRulesCategories() {
        currentAdventure.set(null);
        screenChoice.set('rulesCategories');
        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
    };

    function clearCurrentAdventureAndScreenChoice() {
        emptyCurrentAdventure();
        setScreenChoice(null);
    }

    function navigateFromPlay() {
        if($page.route.id?.includes('play') && $playAdventureCurrent){
        clearCurrentAdventureAndScreenChoice();
        clearActiveTile();
        setScreenChoice('');
        } else {
            return;
        }
    }

    function returnHome() {
        clearCurrentAdventureAndScreenChoice();
        setScreenChoice('adventures');
    }

    function returnToPlayHome() {
        clearCurrentAdventureAndScreenChoice();
        setScreenChoice('playHome');
    }

    async function signOutSSR() {
    const res = await fetch("/api/signin", { method: "DELETE" });
    await signOut(auth);
  }

</script>

<style>

    .iconBox {
        font-size: 0.5em;
        text-align: center;
        color: var(--batlas-white);
        width: 100%;
        height: 7em;
        padding: 0.8em;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1em;
        border: 0.3em solid var(--batlas-black)
    }

    .iconBox:hover {
        color: var(--batlas-black);
        cursor: pointer;
        border: 0.3em solid var(--batlas-white)

    }

    .active {
        border: 0.3em solid var(--batlas-white)
    }

    .currentScreen {
        text-decoration: underline;
    }

    .responsiveNav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0.5em;
        width: 100%;
        height: auto;
        padding: 0em 0.5em;
    }

    .responsiveNav * {
        margin: 0em;
    }

    .secondaryNavBar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0.5em;
        width: 100%;
        height: auto;
        padding: 0em 0.5em;
    }

    .secondaryNavBar * {
        margin: 0em;
        margin-top: 1em;
        cursor: pointer;
    }

    .icon {
        fill: var(--batlas-white);
        stroke: var(--batlas-white);
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .menuIcon svg{
        max-height: 30em;
        height: autop;
        width: 2em;
    }

    .backButton {
        height: 1em;
    }

    .secondaryNavLink:hover {
        text-decoration: underline;
    }

    .secondaryNavLink svg{
        margin: 0em;
    }

    .offScreenMenu {
        position: fixed;
        top: 7em;
        right: 1em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        gap: 2em;
        width: 6em;
        padding: 2em 1em;
        height: auto;
        background-color: var(--batlas-white);
        transition: all 0.3s ease-in-out;
        z-index: 999;
    }

    .offScreenMenu svg {
        fill: var(--batlas-black);
    }

    .offScreenMenu a {
        border: none;
    }

    .offScreenMenu .active {
        border: solid 0.3em var(--batlas-black);
    }


</style>

<svelte:window bind:innerWidth = {screenSize}/>

{#if screenSize > 1500}
    <a href="/dashboard/play" class="iconBox active" class:active="{$page.route.id.includes("play")}" on:click={setScreenChoice('adventures')}>
        <Icons icon={"sword"} size={"full"} color={"white"} />
    </a>
    <a href="/dashboard/create" class="iconBox" class:active="{$page.route.id.includes("create")}" on:click={navigateFromPlay}>
        <Icons icon={"add"} size={"full"} color={"white"} />
    </a>
    <a href="/dashboard/rules" class="iconBox" class:active="{$page.route.id.includes("rules")}">
        <Icons icon={"rules"} size={"full"} color={"white"} />
    </a>
    <a href="/dashboard/account" class="iconBox" class:active="{$page.route.id.includes("account")}">
        <Icons icon={"gear"} size={"full"} color={"white"} />
    </a>
    <a href="/" class="iconBox" on:click={signOutSSR}>
        <Icons icon={"logOut"} size={"full"} color={"white"} />
    </a>
{:else}
    <div class="responsiveNav">
        <a href="/dashboard/play" on:click={returnHome}><img src="/img/batlasLogo_white.webp" alt="BATLAS" height = "40em" ></a>
        <p style="text-transform: uppercase;">Beta testing</p>
        <a href="#" class="menuIcon" on:click={toggleOffScreenMenu}>
            <svg class="icon menuIcon" width="100%" height="100%" viewBox="0 0 188 159" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M187.625,134.08l0,20.221c0,2.391 -1.941,4.333 -4.333,4.333l-178.959,-0c-2.391,-0 -4.333,-1.942 -4.333,-4.333l0,-20.221c0,-2.391 1.942,-4.333 4.333,-4.333l178.959,0c2.392,0 4.333,1.942 4.333,4.333Zm0,-64.873l0,20.22c0,2.392 -1.941,4.333 -4.333,4.333l-178.959,0c-2.391,0 -4.333,-1.941 -4.333,-4.333l0,-20.22c0,-2.392 1.942,-4.333 4.333,-4.333l178.959,-0c2.392,-0 4.333,1.941 4.333,4.333Zm0,-64.874l0,20.221c0,2.391 -1.941,4.333 -4.333,4.333l-178.959,-0c-2.391,-0 -4.333,-1.942 -4.333,-4.333l0,-20.221c0,-2.391 1.942,-4.333 4.333,-4.333l178.959,-0c2.392,-0 4.333,1.942 4.333,4.333Z"/></svg>
        </a>
    </div>
    {#if $page.route.id.includes("play")}
    <div class="secondaryNavBar">
        {#if $currentAdventure != null}
            <a class="secondaryNavLink" class:currentScreen="{$screenChoice === 'playAdventureNotes'}" on:click={() => setScreenChoice("playAdventureNotes")}>Notes</a>
            <a class="secondaryNavLink" class:currentScreen="{$screenChoice === 'playMap'}" on:click={() => setScreenChoice("playAdventureMap")}>Map</a>
        {/if}
    </div>
    {:else if $page.route.id.includes("create")}
    <div class="secondaryNavBar">
        <a class="secondaryNavLink" class:currentScreen="{$screenChoice === 'createPlanner'}" on:click={() => setScreenChoice("createPlanner")}>Planner</a>
        <a class="secondaryNavLink" class:currentScreen="{$screenChoice === 'createMap'}" on:click={() => setScreenChoice("createMap")}>Map Maker</a>
    </div>
    {:else if $page.route.id.includes("rules") && $screenChoice !== "rulesHome"}
    <div class="secondaryNavBar">
        <a class="secondaryNavLink" on:click={() => setScreenChoice("rulesHome")}>Rules</a>
    </div>
    {/if}
{/if}


