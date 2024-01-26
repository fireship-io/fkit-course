<script>
  import { currentAdventure } from "$lib/adventureData";
import Map from "$lib/components/Map.svelte";
  import { onMount } from "svelte";
    onMount(() => {
        console.log("Create ID page", $currentAdventure);
    });
</script>

<style>
    .mapColumn {
        grid-column: 1/18;
        grid-row: 1/3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    @media (max-width: 700px){
        .mapColumn {
        margin: 0em;
        }
    }

</style>

<div class="mapColumn">
    <Map />
</div>
