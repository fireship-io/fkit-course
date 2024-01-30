<script>
    import {page} from '$app/stores';
    import { currentAdventure } from '$lib/adventureData';
    import { screenChoice, offScreenMenu, premiumUser } from "$lib/dashboardState";
    import { user } from '$lib/firebase';
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
        font-size: 0.5rem;
        text-align: center;
        color: var(--batlas-black);
        width: 100%;
        padding: 0.8rem;
        display: grid;
        grid-template-columns: 1fr 3fr;
        align-items: center;
        border-radius: 1rem;
        border: 0.1rem solid var(--batlas-black);
        text-decoration: none;
        transition: all 0.3s ease-in-out;
    }

    .iconBox p {
        margin: 0rem;
        margin-left: 1rem;
        text-align: left;
        font-size: clamp(0.8rem, 2vw + 0.4rem, 0.8rem);
        text-transform: uppercase;
    }

    .active {
        border: 0.3rem solid var(--batlas-white)
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
        top: 5rem;
        right: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        gap: 2rem;
        width: auto;
        max-width: calc(100% - 2rem);
        padding: 2rem 1rem;
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

    .topSection, .bottomSection {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        gap: 1rem;
        width: 100%;
        height: auto;
    }


</style>

    <div class="offScreenMenu brutalismBorder navigationColumn" class:offScreen={$offScreenMenu}>
        <div class="topSection">
            {#if !$premiumUser}
            <a href="#" class="iconBox premiumButton" on:click={() => upgradeToPremium("price_1OVqLtJBUqZ2A3eLxjmGdXhE")}>
                <Icons icon={"d20"} size={"full"} color={"black"} />
                    <p>Upgrade to premium</p>
            </a>
            {/if}
            <a href="/dashboard/play" class="iconBox" class:active="{$page.route.id.includes("play")}">
                <Icons icon={"sword"} size={"full"} color={"black"} />
                <p>Adventures</p>
            </a>
            <a href="/dashboard/create" class="iconBox" class:active="{$page.route.id.includes("create")}">
                <Icons icon={"add"} size={"full"} color={"black"} />
                <p>Create</p>
            </a>
            <p class:invisible={$premiumUser}>Premium features</p>
            <a href="/dashboard/dungeons" class="iconBox" class:active="{$page.route.id.includes("dungeons")}" class:disabled={!$premiumUser}>
                <Icons icon={"rules"} size={"full"} color={"black"} />
                <p>Pre-made</p>
            </a>
            <a href="/dashboard/rules" class="iconBox" class:active="{$page.route.id.includes("rules")}" class:disabled={!$premiumUser}>
                <Icons icon={"d20"} size={"full"} color={"black"} />
                <p>Batlas RPG</p>
            </a>
        </div>
        <div class="bottomSection">
            <a href="/dashboard/account" class="iconBox" class:active="{$page.route.id.includes("account")}">
                <Icons icon={"gear"} size={"full"} color={"black"} />
                <p>Account</p>
            </a>
            <a href="/" class="iconBox" on:click={signOutSSR}>
                <Icons icon={"logOut"} size={"full"} color={"black"} />
                <p>Log Out</p>
            </a>
        </div>
</div>

