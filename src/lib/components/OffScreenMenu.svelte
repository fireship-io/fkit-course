<script>
    import {page} from '$app/stores';
    import { currentAdventure } from '$lib/adventureData';
    import { screenChoice, offScreenMenu } from "$lib/dashboardState";
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
        <svg class="icon" viewBox="0 0 133 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M52.376,79.218l0,-19.043c-10.535,-5.152 -17.798,-15.977 -17.798,-28.486c-0,-17.49 14.199,-31.689 31.689,-31.689c17.489,-0 31.688,14.199 31.688,31.689c0,12.509 -7.263,23.334 -17.798,28.486l-0,19.043l52.376,-0l0,21.798l-34.578,-0l0,105.32l-31.688,53.158l-31.689,-53.158l-0,-105.32l-34.578,-0l0,-21.798l52.376,-0Zm2.112,19.889c0.059,0.629 0.09,1.265 0.09,1.909l-0,99.811c-0,0 11.689,19.608 11.689,19.608l11.688,-19.608l0,-99.811c0,-0.644 0.031,-1.28 0.09,-1.909c-4.556,-0.478 -8.656,-2.485 -11.778,-5.5c-3.123,3.015 -7.223,5.022 -11.779,5.5Zm11.779,-53.323c1.48,-1.429 3.195,-2.643 5.104,-3.576c3.893,-1.904 6.584,-5.898 6.584,-10.519c0,-6.451 -5.237,-11.689 -11.688,-11.689c-6.452,0 -11.689,5.238 -11.689,11.689c-0,4.621 2.691,8.615 6.584,10.519c1.909,0.933 3.624,2.147 5.105,3.576Z"/></svg>
    </a>
    <a href="/dashboard/create" class="iconBox" class:active="{$page.route.id.includes("create")}" on:click={() => handleMenuClick("create")}>
        <svg class="icon" viewBox="0 0 260 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M259.494,12.975l0,233.544c0,7.161 -5.814,12.975 -12.975,12.975l-233.544,0c-7.161,0 -12.975,-5.814 -12.975,-12.975l-0,-233.544c-0,-7.161 5.814,-12.975 12.975,-12.975l233.544,-0c7.161,-0 12.975,5.814 12.975,12.975Zm-239.494,7.025l-0,219.494l219.494,0l0.001,-219.494l-219.495,-0Zm95.444,95.444l0,-52.597c0,-0.79 0.641,-1.431 1.431,-1.431l25.745,0c0.789,0 1.43,0.641 1.43,1.431l-0,52.597l52.598,0c0.789,0 1.43,0.641 1.43,1.431l-0,25.745c-0,0.789 -0.641,1.43 -1.43,1.43l-52.598,-0l-0,52.598c-0,0.789 -0.641,1.43 -1.43,1.43l-25.745,-0c-0.79,-0 -1.431,-0.641 -1.431,-1.43l0,-52.598l-52.597,-0c-0.79,-0 -1.431,-0.641 -1.431,-1.43l0,-25.745c0,-0.79 0.641,-1.431 1.431,-1.431l52.597,0Z"/></svg>
    </a>
    <a href="/dashboard/map-maker" class="iconBox" class:active="{$page.route.id.includes('map-maker')}" on:click={() => handleMenuClick("map-maker")}>
        <svg class="icon" viewBox="0 0 438 264" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M20.128,96.249l198.683,-96.249l218.486,106l0.326,54l-219.068,103l-218.555,-103l-0,-54l19.257,-9.329l0.309,-0.678l0.562,0.256Zm368.949,10.809l-170.273,-82.609l-172.69,83.657l172.636,78.775l170.327,-79.823Zm-159.266,126.339l185.727,-87.324l-0.158,-26.254l-0.83,-0.402l-184.739,86.576l0,27.404Z"/></svg>
    </a>
    <a href="/dashboard/rules" class="iconBox" class:active="{$page.route.id.includes("rules")}" on:click={() => handleMenuClick("rules")}>
        <svg class="icon" viewBox="0 0 188 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M187.625,9.381l0,240.732c0,5.178 -4.203,9.381 -9.381,9.381l-168.863,0c-5.177,0 -9.381,-4.203 -9.381,-9.381l-0,-240.732c-0,-5.177 4.204,-9.381 9.381,-9.381l168.863,-0c5.178,-0 9.381,4.204 9.381,9.381Zm-19.759,126.492c0,-0.396 -0.321,-0.717 -0.718,-0.717l-146.671,-0c-0.396,-0 -0.718,0.321 -0.718,0.717l0,12.92c0,0.397 0.322,0.718 0.718,0.718l146.671,0c0.397,0 0.718,-0.321 0.718,-0.718l0,-12.92Zm-42.77,81.078c0,-0.396 -0.321,-0.718 -0.718,-0.718l-103.901,-0c-0.396,-0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.717 0.718,0.717l103.901,0c0.397,0 0.718,-0.321 0.718,-0.717l0,-12.92Zm42.77,-108.103c0,-0.397 -0.321,-0.718 -0.718,-0.718l-146.671,-0c-0.396,-0 -0.718,0.321 -0.718,0.718l0,12.92c0,0.396 0.322,0.717 0.718,0.717l146.671,0c0.397,0 0.718,-0.321 0.718,-0.717l0,-12.92Zm0,54.051c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,0c-0.396,0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Zm0,-135.358c0,-0.926 -0.752,-1.678 -1.678,-1.678l-144.75,-0c-0.927,-0 -1.679,0.752 -1.679,1.678l0,30.214c0,0.927 0.752,1.679 1.679,1.679l144.75,-0c0.926,-0 1.678,-0.752 1.678,-1.679l0,-30.214Zm0,54.281c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,-0c-0.396,-0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Zm0,108.103c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,0c-0.396,0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Z"/></svg>
    </a>
    <a href="/dashboard/account" class="iconBox" class:active="{$page.route.id.includes("account")}" on:click={() => handleMenuClick("account")}>
        <svg class="icon" viewBox="0 0 260 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M150.044,1.597c-13.447,-2.129 -27.146,-2.129 -40.594,0l-2.262,30.825c-10.725,2.486 -20.966,6.728 -30.309,12.554l-23.395,-20.197c-11.015,8.003 -20.702,17.69 -28.705,28.705l20.197,23.395c-5.826,9.343 -10.068,19.584 -12.554,30.309l-30.825,2.262c-2.129,13.448 -2.129,27.147 0,40.594l30.825,2.262c2.486,10.726 6.728,20.967 12.554,30.309l-20.197,23.396c8.003,11.014 17.69,20.701 28.705,28.704l23.395,-20.197c9.343,5.826 19.584,10.068 30.309,12.554l2.262,30.825c13.448,2.13 27.147,2.13 40.594,-0l2.262,-30.825c10.726,-2.486 20.967,-6.728 30.309,-12.554l23.396,20.197c11.014,-8.003 20.701,-17.69 28.704,-28.704l-20.197,-23.396c5.826,-9.342 10.068,-19.583 12.554,-30.309l30.825,-2.262c2.13,-13.447 2.13,-27.146 -0,-40.594l-30.825,-2.262c-2.486,-10.725 -6.728,-20.966 -12.554,-30.309l20.197,-23.395c-8.003,-11.015 -17.69,-20.702 -28.704,-28.705l-23.396,20.197c-9.342,-5.826 -19.583,-10.068 -30.309,-12.554l-2.262,-30.825Zm-20.297,76.251c28.644,0 51.899,23.255 51.899,51.899c-0,28.644 -23.255,51.899 -51.899,51.899c-28.644,-0 -51.899,-23.255 -51.899,-51.899c0,-28.644 23.255,-51.899 51.899,-51.899Z"/></svg>
    </a>
    <a href="/dashboard/logout" class="iconBox">
        <svg class="icon" viewBox="0 0 219 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M176.703,161.714l0,53.604c0,24.382 -19.794,44.176 -44.176,44.176l-88.351,0c-24.381,0 -44.176,-19.794 -44.176,-44.176l0,-171.142c0,-24.382 19.795,-44.176 44.176,-44.176l88.351,0c24.382,0 44.176,19.794 44.176,44.176l0,53.604l41.642,0l0,63.934l-41.642,-0Zm-20,-63.934l0,-53.604c0,-13.343 -10.833,-24.176 -24.176,-24.176l-88.351,0c-13.343,0 -24.176,10.833 -24.176,24.176l0,171.142c0,13.343 10.833,24.176 24.176,24.176l88.351,0c13.343,0 24.176,-10.833 24.176,-24.176l0,-53.604l-23.728,-0l0,59.366l-91.333,-91.333l91.333,-91.333l0,59.366l23.728,0Z"/></svg>
    </a>
</div>

