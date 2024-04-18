<script>
    import { currentAdventure } from "$lib/adventureData";
    import { activeRule, screenChoice } from "$lib/dashboardState";
    import Subsection from "./Subsection.svelte";

    $activeRule
    $currentAdventure
    export let category

    function setActive(e) {
        document.querySelectorAll('.categoryButton').forEach((element) => {
            element.classList.remove("active");
        });
        e.target.closest('a').classList.toggle("active");
    }

    function handleCategoryClick(event, categoryChoice){
        setActive(event);
        activeRule.set(categoryChoice);
    }

</script>

<style>

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 3rem;
        cursor: pointer;
        transition: background-color 0.15s ease-out;
    }

    .subsectionsContainer {
        width: 100%;
        overflow: hidden;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        gap: 0.5rem;
        max-height: 0rem;
        transition: max-height 0.3s ease-out;
        will-change: max-height;
    }


</style>
<a class="categoryButton button blackButton" on:click={(event) => handleCategoryClick(event, category)}>
    <p>{category.title}</p>
</a>
<div class="subsectionsContainer">
    {#each category.subsections as subsection}
        <Subsection {subsection} />
    {/each}
</div>



