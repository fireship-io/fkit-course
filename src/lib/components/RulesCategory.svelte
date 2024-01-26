<script>
    import { currentAdventure } from "$lib/adventureData";
    import { activeRule, screenChoice } from "$lib/dashboardState";
    import Subsection from "./Subsection.svelte";

    $activeRule
    $currentAdventure
    export let category

    function setActive(e) {
        document.querySelectorAll('.savedAdventure').forEach((element) => {
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
        padding: 0.5rem;
        gap: 0.5rem;
        background: var(--batlas-white);
        cursor: pointer;
    }


    .savedAdventureOptions {
        display:none;
    }

    .savedAdventure h4 {
        font-size: 1.4rem;
    }

    .savedAdventure:hover h4 {
        text-decoration: underline;
    }

    .subsectionsContainer {
        width: 100%;
        display: none;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1rem;
        max-height: 0rem;
        transition: max-height 0.15s ease-out;
    }



    @media screen and (max-width: 1500px) {

        .savedAdventure {
            display: grid;
            grid-template-columns: 9fr 1fr;
            grid-template-rows: auto;
        }
        .savedAdventure h4{
            margin: 0.2rem;
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
        width: 0.5rem;
        background-color: var(--batlas-black);
        }
    }


</style>
<a class="rulesCategory savedAdventure brutalismBorder" on:click={(event) => handleCategoryClick(event, category)}>
    <div class="savedAdventureTitle"><h4>{category.title}</h4></div>
</a>
<div class="subsectionsContainer">
    {#each category.subsections as subsection}
        <Subsection {subsection} />
    {/each}
</div>



