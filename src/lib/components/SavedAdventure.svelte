<script>
    export let adventureData;
    export let deleteAdventure;
    import { currentAdventure, playAdventureCurrent } from "$lib/adventureData";
    import { screenChoice, createAlert } from "$lib/dashboardState";
    import { error } from "@sveltejs/kit";
    import Icons from '$lib/components/Icons.svelte';


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
        console.log("currentAdventure on adventure set", $currentAdventure)
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
        grid-template-rows: 1fr;
        width: 100%;
        height: auto;
        padding: 1em;
        gap: 0.5em;
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
            display: grid;
            grid-template-columns: 4fr 1fr;
            grid-template-rows: 1fr;
            z-index: 5;
        }
        .savedAdventure h4{
            font-size: 1.3em;
            margin: 0.2em;
        }

        .savedAdventureOptions {
        display: flex;
        flex-direction: column;
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

        .adventureBlurb {
            width: 100%;
            max-height: 5em;
            text-overflow: ellipsis;
            overflow: hidden;
        }


</style>
    
<a class="savedAdventure brutalismBorder">
    <div class="savedAdventureTitle">
        <h4>{adventureData.title}</h4>
        <p class="adventureBlurb">{adventureData.notes.quest}</p>
    </div>
    <div class="savedAdventureOptions">
        <a href={`/dashboard/play/${adventureData.adventureId}`}>
            <Icons icon={"d20"} size={"small"} color={"white"} />
        </a>
        <a href="/dashboard/create" on:click={setActive}>
            <Icons icon={"edit"} size={"small"} color={"white"} />
        </a>
        <a href="#" on:click={() => handleDeleteClick(adventureData)}>
            <Icons icon={"remove"} size={"small"} color={"white"} />
        </a>
    </div>
</a>

