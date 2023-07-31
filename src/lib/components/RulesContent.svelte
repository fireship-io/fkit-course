<script>
  import AdventureTools from './AdventureTools.svelte';

    import { currentAdventure } from '$lib/adventureData';
    $currentAdventure;

</script>

<style>
    .rulesContainer {
        padding: 1em;
    }

    .rulesSection {
        padding: 1em;
    }
</style>


<div class="rulesContainer">

    <div class="ruleTitle">
        <h2>Overview</h2>
    </div>

        <div class="rulesSection brutalismBorder">
            <h3>The Gameplay Loop</h3>
            <p>Rules text.</p>
        </div>
</div>