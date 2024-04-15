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
  import Divider from './Divider.svelte';
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
        offScreenMenu.set(false);
        window.location.href = "/dashboard/create";
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

    function navigateTo(route) {
        clearCurrentAdventureAndScreenChoice();
        clearActiveTile();
        offScreenMenu.set(false);
        setScreenChoice(route);
        window.location.href = `/dashboard/${route}`;
    }

</script>

<style>

    .navigationColumn {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        padding: 0.5rem;
        color: var(--batlas-white);
        text-align: center;
    }

    .topSection {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .bottomSection {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        cursor: pointer;
        border: 0.1rem solid var(--batlas-black);
    }

    .button.active {
        border: 0.1rem solid var(--batlas-white);
    }

    .premiumButton {
        background-color: var(--batlas-white);
        color: var(--batlas-black)
    }

    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    .responsiveNav {
        display: none;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        height: 3rem;
        background-color: var(--batlas-black);
        width: 100%;
        border-bottom: 0.1rem solid var(--batlas-white);
    }

    .siteLogo {
        height: 2rem;
        width: auto;
    }

    @media (max-width: 735px) {
        .navigationColumn {
            position: fixed;
            top: 3rem;
            z-index: 999;
            right: 0;
            background-color: var(--batlas-black);
            transform: translateX(100%);
            will-change: transform;
            transition: transform 0.3s ease-in-out;
            height: calc(100% - 3rem);
        }

        .navigationColumn.active {
            transform: translateX(0);
        }

        .responsiveNav {
            display: flex;
        }
    }

</style>

<svelte:window bind:innerWidth = {screenSize}/>
<div class="responsiveNav">
    <a href="/dashboard/" on:click={returnHome}>
        <img src="/img/batlasLogo_white.webp" alt="BATLAS" width="auto" height="auto" class="siteLogo">
    </a>
    <a href="#" class="menuIcon" on:click={toggleOffScreenMenu}>
        <Icons icon={"rules"} size={"medium"} color={"white"} />
    </a>
</div>
<div class="navigationColumn" class:active={!$offScreenMenu}>
<div class="topSection">
    {#if !$premiumUser}
    <a href="#" class="iconBox button blackButton premiumButton" on:click={() => upgradeToPremium("price_1OVqLtJBUqZ2A3eLxjmGdXhE")}>
        <Icons icon={"d20"} size={"medium"} color={"black"} />
        <p>Go premium</p>
    </a>
    {/if}
    <a href="#" class="iconBox button blackButton" class:active="{$page.route.id.includes("play")}" on:click={() => navigateTo("play")}>
        <Icons icon={"sword"} size={"medium"} color={"white"} />
        <p>Adventures</p>
    </a>
    <a href="/dashboard/create" class="iconBox button blackButton" class:active="{$page.route.id.includes("create")}" on:click={navigateToCreate}>
        <Icons icon={"add"} size={"medium"} color={"white"} />
        <p>Create</p>
    </a>
    {#if !$premiumUser}
    <Divider color={"white"} />
    <p>Premium features</p>
    {/if}
    <a href="#" class="iconBox button blackButton" class:active="{$page.route.id.includes("dungeons")}" class:disabled={!$premiumUser} on:click={() => navigateTo("dungeons")}>
        <Icons icon={"rules"} size={"medium"} color={"white"} />
        <p>Dungeons</p>
    </a>
    <a href="#" class="iconBox button blackButton disabled" class:active="{$page.route.id.includes("rules")}" on:click={() => navigateTo("rules")}>
        <Icons icon={"d20"} size={"medium"} color={"white"} />
        <p>Batlas RPG</p>
    </a>
</div>
<div class="bottomSection">
    <a href="#" class="iconBox button blackButton" class:active="{$page.route.id.includes("account")}" on:click={() => navigateTo("account")}>
        <Icons icon={"gear"} size={"medium"} color={"white"} />
        <p>Account</p>
    </a>
    <a href="/" class="iconBox button blackButton" on:click={signOutSSR}>
        <Icons icon={"logOut"} size={"medium"} color={"white"} />
        <p>Log Out</p>
    </a>
</div>
</div>

