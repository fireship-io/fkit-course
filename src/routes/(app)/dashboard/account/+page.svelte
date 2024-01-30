<script lang="ts">
    import type { PageData } from './$types';
        import { premiumUser } from "$lib/dashboardState";
        import { screenChoice } from "$lib/dashboardState";
    import RulesCategory from '$lib/components/RulesCategory.svelte';
    import RulesContent from '$lib/components/RulesContent.svelte';
    import { rules } from '$lib/rules';
    import { onMount } from 'svelte';
    import { activeRule } from '$lib/dashboardState';
    import RulesExamplesList from '$lib/components/RulesExamplesList.svelte';
    import {user} from "$lib/firebase";
    

    import { getAuth, deleteUser } from "firebase/auth";

    export let data: PageData;
    let deleteConfirmationDialogue = false;

    function deleteConfirmation() {
        deleteConfirmationDialogue = true;
    }


function deleteCurrentUser() {
  deleteUser($user).then(() => {
    // User deleted.
    console.log("user deleted");
  }).catch((error) => {
    // An error ocurred
    // ...
    console.log("error deleting user", error);
  });
}


</script>

<style>

    .dashboardContainer {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto auto;
        width: 100%;
        gap: 2em;
        padding: 2em;
    }

    .column {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        padding: 1rem;
        border-radius: 1em;
        background-color: var(--batlas-white);
        width: 100%;
        max-width: 33%;
        overflow-y: scroll;
    }

    .column::-webkit-scrollbar {
        display: none;
    }

    .firstColumn {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
    }
    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    .categories {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0rem;
        width: 100%;
    }

    .categories h3 {
        margin-top: 2rem;
    }

    .button {
        transition: all 0.2s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      height: 3rem;
      padding: 1rem 2rem;
      background-color: var(--batlas-black);
      color: var(--batlas-white);
      border-radius: 3rem;
      cursor: pointer;
      text-decoration: none;
      border: 0.25rem solid var(--batlas-black);
    }

    .button:hover {
        background-color: var(--batlas-white);
        color: var(--batlas-black);
        border: 0.25rem solid var(--batlas-black);
    }

    .deleteConfirmation {
            position: fixed;
            top: calc(50% - 5em);
            left: calc(50% - 10em);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1em;
            width: 20em;
            height: auto;
            background-color: var(--batlas-white);
            color: var(--batlas-black);
            padding: 1em;
            border-radius: 1em;
            z-index: 100;
            text-align: center;
        }

        .deleteConfirmationButtons {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 1em;
            width: 100%;
            height: 100%;
        }

        .deleteConfirmationButtons div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 1em;
            width: 100%;
            height: 3em;
            background-color: var(--batlas-black);
            color: var(--batlas-white);
            padding: 0.5em;
            border-radius: 0.6em;
            text-transform: uppercase;
            font-size: 0.8em;
            line-height: 0.8em;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }

        .deleteConfirmationButtons div:hover {
            transform: translateY(-0.2em);
        }

    @media (max-width: 1400px){

        .dashboardContainer {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            width: 100%;
            height: 100%;
            max-height: none;
            gap: 2em;
            padding: 2em;
            overflow-y: unset;
        }

        .column {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 2rem;
            padding: 1rem;
            border-radius: 1rem;
            background-color: var(--batlas-white);
            width: 100%;
            max-width: 100%;
            overflow-y:unset;
            max-height: none;
        }

    }

</style>

<div class="dashboardContainer">
    <div class="column firstColumn">
        <div class="categories">
            <h2>Account</h2>
            <h3>Manage Subscription</h3>
            <p>Batlas Subscriptions are managed through the Stripe customer portal</p>
            <a href="https://billing.stripe.com/p/login/test_28ocO10E86Gx4Qo4gg" target="_blank" class="button">You Stripe Customer Portal</a>
            <h3>Manage Account</h3>
            {#if !premiumUser}
            <p>You must cancel your subscription before deleting your account. Otherwise you may continue to be charged.</p>
            {/if}
            <a href="#" class="button" class:disabled={!premiumUser} on:click={deleteConfirmation}>Delete your account</a>
            <h3>Support</h3>
            <p>If you have any issues with your account please reach out to tanner@promptedweb.com and I'll assist you as best as I can.</p>
        </div>
    </div>
</div>

{#if deleteConfirmationDialogue}
    <div class="deleteConfirmation brutalismBorder">
        <p>Are you sure you want to delete your account?</p>
        <p>You will lose all of your adventures.</p>
        <div class="deleteConfirmationButtons">
            <div on:click={deleteCurrentUser}>
                <p>Yes</p>
            </div>
            <div on:click={() => deleteConfirmationDialogue = false}>
                <p>No</p>
            </div>
        </div>
    </div>
{/if}
