<script lang="ts">
    import type { PageData } from './$types';
        import { premiumUser } from "$lib/dashboardState";
        import { screenChoice } from "$lib/dashboardState";
    import RulesCategory from '$lib/components/RulesCategory.svelte';
    import RulesContent from '$lib/components/RulesContent.svelte';
    import { rules } from '$lib/rules';
    import { onMount } from 'svelte';
    import { activeRule } from '$lib/dashboardState';
    import RulesExamplesList from '$lib/components/RulesExamplesList.svelte';
    
    export let data: PageData;


</script>

<style>

    .dashboardContainer {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto auto;
        width: 100%;
        height: 100%;
        max-height: calc(100lvh - 6em);
        gap: 2em;
        padding: 2em;
    }

    .column {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        padding: 2em;
        border-radius: 1em;
        background-color: var(--batlas-white);
        width: 100%;
        max-width: 33%;
        overflow-y: scroll;
        max-height: calc(100lvh - 6em);
    }

    .column::-webkit-scrollbar {
        display: none;
    }

    .firstColumn {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
    }
    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    .votingOptions {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        width: 100%;
    }

    .examples {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        width: 100%;
    }

    .votingOption {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1em;
        border: 0.25em solid var(--batlas-black);
        padding: 0.5em 1em;
        width: 100%;
        border-radius: 1em;
        cursor: pointer;
    }



    .votingOption input, .votingOption label {
        cursor: pointer;
    }

    .votingOption input {
        display: none;
    }

    .votingOption::selection {
        background-color: var(--batlas-black);
        color: var(--batlas-white);
    }

    .votingOption:hover {
        background-color: var(--batlas-black);
        color: var(--batlas-white);
    }

    .votingOption:has(input:checked) {
        background-color: var(--batlas-black);
        color: var(--batlas-white);
    }

    .votingSubmit {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
        width: 100%;
        background-color: var(--batlas-black);
        color: var(--batlas-white);
    }

    .votingSubmit input {
        display: flex;
        background-color: var(--batlas-black);
        color: var(--batlas-white);
        border: none;
        padding: 0.5em 1em;
        border-radius: 1em;
        cursor: pointer;
        font-size: 1em;
    }

    .category {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        width: 100%;
    }

    .categoryRow {
        display: grid;
        grid-template-columns: 1fr 3fr;
        gap: 1em;
        width: 100%;
    }

    .categoryRow p {
        width: 100%;
        margin: 0em;
    }

    .categories {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        width: 100%;
    }

    @media (max-width: 1400px){

        .dashboardContainer {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            width: 100%;
            height: 100%;
            max-height: none;
            gap: 2em;
            padding: 2em;
            overflow-y: unset;
        }

        .column {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 2em;
            padding: 2em;
            border-radius: 1em;
            background-color: var(--batlas-white);
            width: 100%;
            max-width: 100%;
            overflow-y:unset;
            max-height: none;
        }

        .firstColumn {
        }
    }

</style>

<div class="dashboardContainer">
    <div class="column firstColumn">
        <div class="categories">
            <h2>Rules</h2>
            {#each rules as category}
                <RulesCategory {category} />
            {/each}
        </div>
    </div>
    <div class="column secondColumn">
        <div class="subcategories">
            <RulesContent rule={$activeRule}/>
        </div>
    </div>
    {#if $activeRule.content !== ""}
    <div class="column thirdColumn">
        <div class="examples">
            <RulesExamplesList rule={$activeRule}/>
        </div>
    </div>
    {/if}
</div>
