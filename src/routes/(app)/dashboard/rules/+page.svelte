<script>

    import { screenChoice } from "$lib/dashboardState";
    import RulesCategory from '$lib/components/RulesCategory.svelte';
    import RulesContent from '$lib/components/RulesContent.svelte';
    import RulesExamplesList from '$lib/components/RulesExamplesList.svelte';
    import {activeRule } from '$lib/dashboardState';
    import { rules } from '$lib/rules';
    
    let screenSize = 0;

    screenChoice.set("rulesCategory");


</script>

<style>
    .options {
        grid-column: 1/5;
        grid-row: 1/2;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        width: 100%;
        padding: 0.8em;
        height: 100%;
        max-height: calc(100lvh - 4em);

        overflow: scroll;;

    }

    .options::-webkit-scrollbar {
        display: none;
    }

    .content {
        display: block;
        width: 100%;
        grid-column: 5/11;
        height: 100%;
        max-height: calc(100lvh - 4em);
        overflow-y: scroll;
    }

    .dungeon {
    border: 1em solid white;;
    border-image-slice: 103 107 107 111;
    border-image-width: 1em;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: repeat repeat;
    border-style: solid;
    border-image-source: url('/img/border_full.png');
    background-color: var(--batlas-white);
}
.examples {
    grid-column: 11/17;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    max-height: calc(100lvh - 2em);
    overflow-y: scroll;
}

@media screen and (max-width: 1500px) {

.options, .content, .examples {
    grid-column: 1/2;
    margin-top: 0em;
    height: 100%;
}

.options {
    height: 100%;
    padding: 1em;
    margin: 0em;
}

.invisible {
    display: none;
}



}



</style>

<svelte:window bind:innerWidth = {screenSize}/>


<div class="options dungeonBorder rules" class:invisible={screenSize < 1500 && $screenChoice != "rulesCategories"}>
    <h2>Rules</h2>
    {#each rules as category}
        <RulesCategory {category} />
    {/each}
</div>
{#if $activeRule}
    <div class="content dungeonBorder" class:invisible={screenSize < 1500 && $screenChoice != "rulesContent"}>
        <RulesContent rule={$activeRule}/>
    </div>
{/if}
<div class="examples dungeonBorder" class:invisible={screenSize < 1500 && $screenChoice != "rulesExamples"}>
    <RulesExamplesList rule={$activeRule}/>
</div>
