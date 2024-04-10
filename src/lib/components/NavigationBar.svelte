<script>
  import OffScreenMenu from './OffScreenMenu.svelte';

    import {page} from '$app/stores';
    import { currentAdventure, playAdventureCurrent } from '$lib/adventureData';
    import { screenChoice, offScreenMenu, activeRule, activeTile, premiumUser } from "$lib/dashboardState";
    import { db, userData, auth, user, app } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup, signOut, deleteUser, reauthenticateWithCredential } from "firebase/auth";
    import Icons from './Icons.svelte';
    import {
      doc,
      setDoc,
      addDoc,
      collection,
      onSnapshot,
    } from "firebase/firestore";
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

    function navigateToCreate() {
        clearCurrentAdventureAndScreenChoice();
        clearActiveTile();
        setScreenChoice('');
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



  async function upgradeToPremium(priceId) {
      // Reference to the Firestore document
    const checkoutSessionsRef = collection(db, "users", $user.uid, "checkout_sessions");

    try {
    // Create a new checkout session in Firestore
    const checkoutSessionRef = await addDoc(checkoutSessionsRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });

    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(checkoutSessionRef, (snap) => {
        const data = snap.data();
        if (data) {
        const { error, url } = data;
        if (error) {
            // Show an error to your customer and
            // inspect your Cloud Function logs in the Firebase console.
            alert(`An error occured: ${error.message}`);
        }
        if (url) {
            // We have a Stripe Checkout URL, let's redirect.
            window.location.assign(url);
        }
        }
    });
    } catch (e) {
    console.error("Error creating checkout session", e);
    }
    };

</script>

<style>

    .iconBox {
        font-size: 0.5em;
        text-align: center;
        color: var(--batlas-white);
        width: 100%;
        height: 7em;
        padding: 0.8em;
        display: grid;
        grid-template-columns: 1fr 3fr;
        align-items: center;
        border-radius: 1em;
        border: 0.3em solid var(--batlas-black);
        text-decoration: none;
        transition: all 0.3s ease-in-out;
    }

    .iconBox:hover {
        color: var(--batlas-white);
        cursor: pointer;
        border: 0.3em solid var(--batlas-white);
        transform: translateX(0.5em);
    }

    .iconBox p {
        margin: 0em;
        margin-left: 1em;
        text-align: left;
        font-size: clamp(0.8rem, 2vw + 0.4rem, 0.8rem);
        text-transform: uppercase;
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

    .premiumButton {
        background-color: var(--batlas-white);
        color: var(--batlas-black);
        border: 0.3em solid var(--batlas-white);
    }

    .premiumButton:hover {
        color: var(--batlas-black)
    }

    .topSection, .bottomSection {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1em;
        width: 100%;
        height: auto;
    }

    .navigationColumn {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1em;
        width: 100%;
        height: 100%;
        background-color: var(--batlas-black);
        color: var(--batlas-white);
        padding: 1rem 0.5rem;
    }

    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    .invisible {
        display:none;
    }

    @media (max-width: 735px) {
        .siteLogo {
            width: auto;
            height: 4rem;
        }

        .menuIcon {
            max-width: none;
            width: 4rem;
        }
    }

</style>

<svelte:window bind:innerWidth = {screenSize}/>
{#if screenSize > 735}
<div class="navigationColumn">
<div class="topSection">
    {#if !$premiumUser}
    <a href="#" class="iconBox premiumButton" on:click={() => upgradeToPremium("price_1OVqLtJBUqZ2A3eLxjmGdXhE")}>
        <Icons icon={"d20"} size={"full"} color={"black"} />
            <p>Upgrade to premium</p>
    </a>
    {/if}
    <a href="/dashboard/play" class="iconBox" class:active="{$page.route.id.includes("play")}" on:click={setScreenChoice('adventures')}>
        <Icons icon={"sword"} size={"full"} color={"white"} />
        <p>Adventures</p>
    </a>
    <a href="/dashboard/create" class="iconBox" class:active="{$page.route.id.includes("create")}" on:click={navigateToCreate}>
        <Icons icon={"add"} size={"full"} color={"white"} />
        <p>Create</p>
    </a>
    <p class:invisible={$premiumUser}>Premium features</p>
    <a href="/dashboard/dungeons" class="iconBox" class:active="{$page.route.id.includes("dungeons")}" class:disabled={!$premiumUser}>
        <Icons icon={"rules"} size={"full"} color={"white"} />
        <p>Dungeons</p>
    </a>
    <a href="/dashboard/rules" class="iconBox" class:active="{$page.route.id.includes("rules")}" class:disabled={!$premiumUser}>
        <Icons icon={"d20"} size={"full"} color={"white"} />
        <p>Batlas RPG</p>
    </a>
</div>
<div class="bottomSection">
    <a href="/dashboard/account" class="iconBox" class:active="{$page.route.id.includes("account")}">
        <Icons icon={"gear"} size={"full"} color={"white"} />
        <p>Account</p>
    </a>
    <a href="/" class="iconBox" on:click={signOutSSR}>
        <Icons icon={"logOut"} size={"full"} color={"white"} />
        <p>Log Out</p>
    </a>
</div>
</div>
{:else}
<div class="responsiveNav">
    <a href="/dashboard/play" on:click={returnHome}>
        <img src="/img/batlasLogo_white.webp" alt="BATLAS" width="auto" height="auto" class="siteLogo">
    </a>
    <p style="text-transform: uppercase;">Beta testing</p>
    <a href="#" class="menuIcon" on:click={toggleOffScreenMenu}>
        <Icons icon={"rules"} size={"full"} color={"white"} />
    </a>
</div>
{/if}


