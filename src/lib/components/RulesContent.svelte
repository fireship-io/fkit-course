<script>
  import AdventureTools from './AdventureTools.svelte';
    import { screenChoice } from '$lib/dashboardState';
    import { currentAdventure } from '$lib/adventureData';
    import { activeRule } from '$lib/dashboardState';
    import { batlasRules } from '$lib/rules';
    $currentAdventure;
    $activeRule
    $screenChoice

</script>

<style>
    .rulesContainer {
        padding: 1em;
    }

    .rulesSection {
        padding: 1em;
        margin-top: 2em;
    }
</style>


<div class="rulesContainer">

    <div class="ruleTitle">
        <h2>{$activeRule?.title}</h2>
    </div>
    {#if $activeRule.content}
        {#each $activeRule?.content as section}
            <div class="rulesSection brutalismBorder">
                <h3>{section.title}</h3>
                <p>{section.content}</p>
            </div>
        {/each}
    {/if}
</div>