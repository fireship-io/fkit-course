<script>
    import { currentAdventure } from "$lib/adventureData";
    import { activeRule, screenChoice } from "$lib/dashboardState";

    $activeRule
    $currentAdventure
    export let subsection

    function setActive(e) {
        document.querySelectorAll('.subsection').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
        e.target.closest('a').classList.toggle("brutalismBorderInverted");
    }

    function handleCategoryClick(event, categoryChoice){
        setActive(event);
        activeRule.set(categoryChoice);
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

    .subsection {
        margin-left: 2em;
        width: calc(100% - 2em);
        padding: 0.5em;
        padding-left: 1em;
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
<a class="subsection savedAdventure brutalismBorder" on:click={(event) => handleCategoryClick(event, subsection)}>
    <div class="savedAdventureTitle"><h4>{subsection.title}</h4></div>
</a>

