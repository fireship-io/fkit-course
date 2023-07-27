<script>
    export let adventureData;
    import { currentAdventure } from "$lib/adventureData";

    $currentAdventure

    function setActive(e) {
        currentAdventure.set({ ...adventureData});

        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
        e.target.closest('a').classList.toggle("brutalismBorderInverted");
    }
</script>

<style>

    .savedAdventure {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: auto;
        padding: 1em;
        gap: 0.5em;
        background: var(--batlas-white);
        cursor: pointer;
    }


    .savedAdventureOptions {
        display:none;
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
    <div class="savedAdventureDescription">{adventureData.description}</div>
    <div class="savedAdventureOptions"></div>
</a>

