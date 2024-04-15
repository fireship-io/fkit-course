<script>
    import { onMount } from "svelte";
    import {playAdventureCurrent} from "$lib/adventureData";
  import PremadeAdventure from "./PremadeAdventure.svelte";
  import { premadeAdventures } from "$lib/adventureData";


    onMount(() => {
        playAdventureCurrent.set(false);
        console.log(premadeAdventures)
    });

    


</script>

<style>
    .adventureList {
        padding: 1rem;
        gap: 1em;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .adventureList::-webkit-scrollbar {
        display: none;
    }

</style>
<div class="adventureList">
    {#each premadeAdventures as adventure}
        <PremadeAdventure {adventure} />
    {/each}
</div>