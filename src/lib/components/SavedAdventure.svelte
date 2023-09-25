<script>
    export let adventureData;
    export let deleteAdventure;
    import { currentAdventure, playAdventureCurrent } from "$lib/adventureData";
    import { screenChoice, createAlert } from "$lib/dashboardState";
    import { error } from "@sveltejs/kit";

    async function handleDeleteClick(adventureData) {
        try {
        await deleteAdventure(adventureData.adventureId);
        screenChoice.set('playHome');
        } catch {
            console.log (error)
        } finally {
            createAlert(`${adventureData.title} deleted`)
        }
    }

    function setActive(e) {
        playAdventureCurrent.set(true);
        currentAdventure.set({ ...adventureData});
        screenChoice.set("playAdventureNotes");

        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
        e.target.closest('a').classList.toggle("brutalismBorderInverted");
    }
</script>

<style>

    .savedAdventure {
        display: grid;
        grid-template-columns: 2fr 1fr;
        width: 100%;
        height: auto;
        padding: 1em;
        gap: 0.5em;
        background: var(--batlas-white);
        z-index: 5;
    }


    .savedAdventureOptions {
        grid-row: 1 / 3;
        grid-column: 2 / 3;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.6em;
        text-transform: uppercase;
    }

    .savedAdventureOptions a {
        margin: 0;
        border: 0.1em solid var(--batlas-white);
        width: 100%;
        padding: 0.2em 0.6em;
        border-radius: 0.6em;
        background-color: var(--batlas-black);
        color: var(--batlas-white);
        text-align:center;
        text-decoration: none;
        z-index: 100;
    }

    .savedAdventureOptions a:hover {
        text-decoration: underline;
    }

        .savedAdventure {
            display: flex;
            flex-direction: column;
            grid-template-columns: 9fr 1fr;
            grid-template-rows: auto;
            z-index: 5;
        }
        .savedAdventure h4{
            font-size: 1.3em;
            margin: 0.2em;
        }

        .savedAdventureTitle {
            grid-column: 1 / 9;
            grid-row: 1 / 2;
        }

        .savedAdventureDescription {
            grid-column: 1 / 9;
            grid-row: 2 / 3;
        }

        .savedAdventureOptions {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100% !important;
        width: 0.5em;
        order: 1;
        background-color: var(--batlas-white);
        }

        .savedAdventureOptions a {
            display: block;
            min-width: 3em;
            width: 100%;
        }


</style>
    
<a class="savedAdventure brutalismBorder">
    <div class="savedAdventureTitle"><h4>{adventureData.title}</h4></div>
    <div class="savedAdventureOptions">
        <a href="#" on:click={setActive}>Play</a>
        <a href="/dashboard/create" on:click={setActive}>Edit</a>
        <a href="#" on:click={() => handleDeleteClick(adventureData)}>Delete</a>
    </div>
</a>

