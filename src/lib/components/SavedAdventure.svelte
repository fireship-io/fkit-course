<script>
    export let adventureData;
    import { currentAdventure, playAdventureCurrent } from "$lib/adventureData";
    import { screenChoice, createAlert } from "$lib/dashboardState";
    import { error } from "@sveltejs/kit";
    import { db, user } from "$lib/firebase";
    import Icons from '$lib/components/Icons.svelte';
    import { deleteAdventure } from "$lib/firebaseFunctions";
  import OffScreenMenu from "./OffScreenMenu.svelte";


    let deleteConfirmationDialogue = false;

    function deleteConfirmation() {
        deleteConfirmationDialogue = true;
    }

    async function handleDeleteClick(adventureData) {
        try {
        await deleteAdventure(adventureData, $user);
        } catch {
            console.log (error)
        }
        deleteConfirmationDialogue = false;
    }

    function editAdventure() {
        window.location.href = `/dashboard/create/${$user.uid}/${adventureData.adventureId}`;
    }

    function playAdventure() {;
        currentAdventure.set({ ...adventureData});
        window.location.href = `/dashboard/player/${$user.uid}/${adventureData.adventureId}`;
    }
</script>

<style>


    .button p {
        text-align: left;
        margin: 0;
        align-self: center;
    }

    .button.whiteButton {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 2.2rem;
        padding: 0.1;
    }


    .button.blackButton {
        display: flex;
        flex-direction: row;
        flex: 1;
        height: 2.2rem;
        gap: 0.75rem;
        border: 0.1rem solid var(--batlas-black);
        padding: 0.5rem 0.75rem;
    }

    .savedAdventure {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 15em;
        max-width: 18rem;
        padding: 1rem;
        gap: 1rem;
        background: var(--batlas-white);
        z-index: 5;
    }


    .savedAdventureOptions {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
        text-transform: uppercase;
    }

    .savedAdventureTitle p {
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--batlas-black);
        margin: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
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
            height: 10em;
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


</style>
    
<div class="savedAdventure whiteBox">
    <div class="savedAdventureTitle">
        <p>{adventureData.title}</p>
    </div>
    <div class="savedAdventureOptions">
        <div on:click={() => deleteConfirmation(adventureData)} class="button whiteButton">
            <Icons icon={"remove"} size={"small"} color={"black"} />
        </div>
        <div on:click={editAdventure} class="button whiteButton">
            <Icons icon={"edit"} size={"small"} color={"black"} />
        </div>
        <div on:click={playAdventure} class="play button blackButton">
            <Icons icon={"d20"} size={"medium"} color={"white"} />
            <p>Play</p>
        </div>
    </div>
</div>

{#if deleteConfirmationDialogue}
    <div class="deleteConfirmation brutalismBorder">
        <p>Are you sure you want to delete {adventureData.title}?</p>
        <div class="deleteConfirmationButtons">
            <div on:click={() => handleDeleteClick(adventureData)}>
                <p>Yes</p>
            </div>
            <div on:click={() => deleteConfirmationDialogue = false}>
                <p>No</p>
            </div>
        </div>
    </div>
{/if}
