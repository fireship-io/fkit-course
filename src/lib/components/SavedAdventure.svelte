<script>
    export let adventureData;
    export let deleteAdventure;
    import { currentAdventure } from "$lib/adventureData";
    import { screenChoice } from "$lib/dashboardState";

    function handleDeleteClick(adventureData) {
        deleteAdventure(adventureData.adventureId);
    }

    function setActive(e) {
        currentAdventure.set({ ...adventureData});
        screenChoice.set("notes");

        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
        e.target.closest('a').classList.toggle("brutalismBorderInverted");
    }
</script>

<style>

    .savedAdventure {
        display: grid;
        grid-template-columns: 4fr 1fr;
        width: 100%;
        height: auto;
        padding: 1em;
        gap: 0.5em;
        background: var(--batlas-white);
        cursor: pointer;
    }


    .savedAdventureOptions {
        grid-row: 1 / 3;
        grid-column: 2 / 3;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
    }

    .savedAdventureOptions a {
        margin: 0;
    }

    .savedAdventure:hover h4 {
        text-decoration: underline;
    }

    @media screen and (max-width: 1500px) {

        .savedAdventure {
            display: grid;
            grid-template-columns: 9fr 1fr;
            grid-template-rows: auto;
        }
        .savedAdventure h4{
            font-size: 1.4em;
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
        display: block;
        grid-column: 9 / 11;
        grid-row: 1 / 3;
        border: 0.2em solid var(--batlas-black);
        height: 100%;
        width: 0.5em;
        background-color: var(--batlas-black);
        }
    }


</style>
    
<a class="savedAdventure brutalismBorder" on:click={setActive}>
    <div class="savedAdventureTitle"><h4>{adventureData.title}</h4></div>
    <div class="savedAdventureOptions">
        <a href="/dashboard/create">Edit</a>
        <a on:click={() => handleDeleteClick(adventureData)}>Delete</a>
    </div>
    <div class="savedAdventureDescription">{adventureData.notes.enemy}</div>
</a>

