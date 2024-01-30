<script>
    export let adventureData;
    export let deleteAdventure;
    import { currentAdventure, playAdventureCurrent } from "$lib/adventureData";
    import { screenChoice, createAlert } from "$lib/dashboardState";
    import { error } from "@sveltejs/kit";
    import { db, user } from "$lib/firebase";
    import Icons from '$lib/components/Icons.svelte';

    let deleteConfirmationDialogue = false;

    function deleteConfirmation(adventureData) {
        deleteConfirmationDialogue = true;
    }

    async function handleDeleteClick(adventureData) {
        try {
        await deleteAdventure(adventureData.adventureId);
        screenChoice.set('playHome');
        } catch {
            console.log (error)
        } finally {
            createAlert(`${adventureData.title} deleted`)
        }
        deleteConfirmationDialogue = false;
    }

    function setActive(e) {
        playAdventureCurrent.set(true);
        currentAdventure.set({ ...adventureData});
        console.log("currentAdventure on adventure set", $currentAdventure)
        screenChoice.set("playAdventureNotes");

        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
        e.target.closest('a').classList.toggle("brutalismBorderInverted");
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

    .savedAdventure {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: calc(25% - 1.5rem);
        min-width: 15em;
        height: 100%;
        padding: 1rem;
        gap: 1rem;
        background: var(--batlas-white);
        z-index: 5;
    }


    .savedAdventureOptions {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.6em;
        text-transform: uppercase;
    }

    .savedAdventureOptions div {
        margin: 0;
        border: 0.2em solid var(--batlas-black);
        width: 100%;
        padding: 0.2em 0.6em;
        border-radius: 0.6em;
        background-color: var(--batlas-white);
        color: var(--batlas-black);
        text-align:center;
        text-decoration: none;
        z-index: 100;
        gap: 0.6em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        transition: all 0.2s ease-in-out;
    }

    .savedAdventureOptions div:hover {
        transform: translateY(-0.2em);
    }

    .savedAdventureOptions div p{
        margin: 0;
        font-size: 0.8em;
        line-height: 0.8em;
    }

    .savedAdventureOptions div:hover {
        text-decoration: underline;
        cursor: pointer;
    }

        .savedAdventure h4{
            font-size: 1.3em;
        }

        .savedAdventureOptions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        height: 100%;
        width: 100%;
        order: 1;
        background-color: var(--batlas-white);
        }

        .savedAdventureOptions div {
            display: flex;
            flex-direction: row;
            min-width: 3em;
            width: 100%;
            height: 100%;
        }

        .adventureBlurb {
            width: 100%;
            max-height: 5em;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        div.play {
            grid-column: 2/3;
            grid-row: 1/3;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: var(--batlas-black);
            color: var(--batlas-white);
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

        @media (max-width: 735px) {
            .savedAdventure {
                width: 100%;
                max-width: 100%;
            }
        }

</style>
    
<a class="savedAdventure brutalismBorder">
    <div class="savedAdventureTitle">
        <h4>{adventureData.title}</h4>
    </div>
    <div class="savedAdventureOptions">
        <div on:click={editAdventure}>
            <Icons icon={"edit"} size={"small"} color={"black"} />
            <p>Edit</p>
        </div>
        <div on:click={playAdventure} class="play">
            <Icons icon={"d20"} size={"large"} color={"white"} />
            <p>Play</p>
        </div>
        <div on:click={() => deleteConfirmation(adventureData)}>
            <Icons icon={"remove"} size={"small"} color={"black"} />
            <p>Delete</p>
        </div>
    </div>
</a>

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
