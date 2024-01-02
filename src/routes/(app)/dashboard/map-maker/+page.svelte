<script>
    import Planner from "$lib/components/Planner.svelte";
    import Map from "$lib/components/Map.svelte";
    import { onMount } from "svelte";


    import { screenChoice } from "$lib/dashboardState";
    import PromptOptions from '$lib/components/PromptOptions.svelte';

    onMount(() => {
        screenChoice.set("mapMaker");
    });

</script>

<style>
    .options {
        grid-column: 1/5;
        grid-row: 1/3;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        width: 100%;
        padding: 0.8em;
        height: 100%;
        overflow: scroll;
    }

    .options::-webkit-scrollbar {
        display: none;
    }

    .content {
        width: 100%;
        grid-column: 5/11;
        grid-row: 1/3;
        height: 100%;
        padding: 0.8em;
        overflow-y: scroll;
    }

    .dungeon {
    border: 1em solid white;
    border-image-slice: 103 107 107 111;
    border-image-width: 1em;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: repeat repeat;
    border-style: solid;
    border-image-source: url('/img/border_full.png');
    background-color: var(--batlas-white);
    max-height: calc(100% - 4em);

}
.mapColumn {
    grid-column: 1/17;
    grid-row: 1/3;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-height: calc(100%);
}

.createAdventureTextArea {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 2em;;
}

@media screen and (max-width: 1500px) {

.options, .content, .mapColumn {
    grid-column: 1/2;
    margin-top: 0em;
    height: 100%;
    width: 100%;
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

<div class="mapColumn">
    <Map />
</div>