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

    .rulesSubsection {
        margin-top: 2em;
    }

    .ruleTitle{
        font-size: 0.5em;
    }
</style>

<div class="rulesContainer blackBox">
    <div class="ruleTitle">
        <h2>{rule.title}</h2>
    </div>
    <div class="rulesSubsection">
        <div id="subsectionContainer">
            {@html rule.content}
        </div>
    </div>
</div>


