<script>
  import Map from '../../../lib/components/Map.svelte';
    import { currentAdventure } from '$lib/adventureData';
    import AdventureContent from "$lib/components/AdventureContent.svelte";
    import SavedAdventures from "$lib/components/SavedAdventures.svelte";
    import { screenChoice } from "$lib/dashboardState";

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

        overflow: scroll;

    }

    .options::-webkit-scrollbar {
        display: none;
    }

    .content {
        width: 100%;
        grid-column: 5/11;
        height: 100%;
        max-height: calc(100lvh - 4em);
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
.map {
    grid-column: 11/17;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 4em);
}

@media screen and (max-width: 1500px) {

.options, .content, .map {
    grid-column: 1/2;
    height: 100%;
}

.options {
    height: 100%;
    padding: 1em;
}

.invisible {
    display: none;
}



}



</style>

<div class="options dungeonBorder" class:invisible={$currentAdventure != null && $screenChoice != "adventures"}>
    <SavedAdventures />
</div>
{#if ($currentAdventure != null)}
<div class="content dungeonBorder" class:invisible={$screenChoice != "notes"}>
    <AdventureContent />
</div>
<div class="map" class:invisible={$screenChoice != "map"}>
    <Map />
</div>
{/if}
