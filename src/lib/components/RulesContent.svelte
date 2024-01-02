<script>
  import AdventureTools from './AdventureTools.svelte';
    import { screenChoice } from '$lib/dashboardState';
    import { currentAdventure } from '$lib/adventureData';
    import { activeRule } from '$lib/dashboardState';
    import { map } from '$lib/mapGen';
    $currentAdventure;
    $activeRule
    $screenChoice

    export let rule;

</script>

<style>
    .rulesContainer {
        padding: 1em;
    }

    .rulesSubsection {
        padding: 1em;
        margin-top: 2em;
    }
</style>

<div class="rulesContainer">
    <div class="ruleTitle">
        <h2>{rule.title}</h2>
    </div>
    <div class="rulesSubsection">
        <div id="subsectionContainer">
            {@html rule.content}
        </div>
    </div>
</div>


