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
        gap: 2em;
        width: 100%;
        height: auto;
        overflow: scroll;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .adventureList::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 735px) {
        .adventureList {
            height: auto;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            margin-right: 0;
            padding-right: 0;
            width: 100%;
            flex-wrap: nowrap;
            flex: 1;
            overflow: auto;
            padding-bottom: 10em;
        }
    }

</style>
<div class="adventureList">
    {#each premadeAdventures as adventure}
        <PremadeAdventure {adventure} />
    {/each}
</div>