<script>
    import {page} from '$app/stores';
    import { currentAdventure } from '$lib/adventureData';
    import { screenChoice, offScreenMenu } from "$lib/dashboardState";
    import Icons from './Icons.svelte';
    $screenChoice
    $currentAdventure
    $offScreenMenu


    function toggleOffScreenMenu() {
        console.log("TOGGLE")
        offScreenMenu.set(!offScreenMenu);
    }

    function setScreenChoice(choice){
        screenChoice.set(`${choice}`);
    }

    function emptyCurrentAdventure() {
        currentAdventure.set(null);
        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
    };

    function forceMenuOffScreen() {
        offScreenMenu.set(true);
    };

    function clearCurrentAdventureAndScreenChoice() {
        emptyCurrentAdventure();
        setScreenChoice(null);
        forceMenuOffScreen();
    }

    function handleMenuClick(icon) {
        forceMenuOffScreen();
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
        transform: translateX(0vw);
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

    .offScreen {
        transform: translateX(100vw);
    }


</style>

<div class="offScreenMenu brutalismBorder" class:offScreen={$offScreenMenu}>
    <a href="/dashboard/play" class="iconBox active" class:active="{$page.route.id.includes("play")}" on:click={$page.route.id.includes("play") ? clearCurrentAdventureAndScreenChoice : () => handleMenuClick("play")}>
        <Icons icon={"sword"} size={"full"} color={"black"} />
    </a>
    <a href="/dashboard/create" class="iconBox" class:active="{$page.route.id.includes("create")}" on:click={() => handleMenuClick("create")}>
        <Icons icon={"add"} size={"full"} color={"black"} />
    </a>
    <a href="/dashboard/rules" class="iconBox" class:active="{$page.route.id.includes("rules")}" on:click={() => handleMenuClick("rules")}>
        <Icons icon={"rules"} size={"full"} color={"black"} />
    </a>
    <a href="/dashboard/account" class="iconBox" class:active="{$page.route.id.includes("account")}" on:click={() => handleMenuClick("account")}>
        <Icons icon={"gear"} size={"full"} color={"black"} />
    </a>
    <a href="/dashboard/logout" class="iconBox">
        <Icons icon={"logOut"} size={"full"} color={"black"} />
    </a>
</div>

