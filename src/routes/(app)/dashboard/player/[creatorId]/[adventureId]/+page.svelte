<script>

    import { page } from '$app/stores';
    import { user } from "$lib/firebase";
    import PlayerMap from '$lib/components/PlayerMap.svelte';
    import Map from '$lib/components/Map.svelte';
  import { onMount } from 'svelte';
  import { currentAdventure } from '$lib/adventureData';
    
</script>
    
<style>

    .map {
        padding: 0em;
        grid-column: 1/17;
        grid-row: auto / span 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100%);
        width: 100%;
    }   
    
</style>
        
<div class="map">
    {#if $user?.uid !== $page.params.creatorId}
        <PlayerMap />
    {:else}
        <Map />
    {/if}
</div>