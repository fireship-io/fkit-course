<script>
    import { currentAdventure } from "$lib/adventureData";
    import { screenChoice } from "$lib/dashboardState";

    $currentAdventure

    function setActive(e) {
        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
        e.target.closest('a').classList.toggle("brutalismBorderInverted");
    }

    function handleCategoryClick(event, categoryChoice){
        setActive(event);
        screenChoice.set(categoryChoice);
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
<h2>Rules</h2>
<a class="savedAdventure brutalismBorder" on:click={(event) => handleCategoryClick(event, "rulesOverview")}>
    <div class="savedAdventureTitle"><h4>Overview</h4></div>
    <div class="savedAdventureOptions"></div>
</a>
<a class="savedAdventure brutalismBorder" on:click={(event) => handleCategoryClick(event, "rulesCharacterCreation")}>
    <div class="savedAdventureTitle"><h4>Character Creation</h4></div>
    <div class="savedAdventureOptions"></div>
</a>
<a class="savedAdventure brutalismBorder" on:click={(event) => handleCategoryClick(event, "rulesClasses")}>
    <div class="savedAdventureTitle"><h4>Classes</h4></div>
    <div class="savedAdventureOptions"></div>
</a>
<a class="savedAdventure brutalismBorder" on:click={(event) => handleCategoryClick(event, "rulesContests")}>
    <div class="savedAdventureTitle"><h4>Contests</h4></div>
    <div class="savedAdventureOptions"></div>
</a>
<a class="savedAdventure brutalismBorder" on:click={(event) => handleCategoryClick(event, "rulesInjury")}>
    <div class="savedAdventureTitle"><h4>Injury & Death</h4></div>
    <div class="savedAdventureOptions"></div>
</a>

