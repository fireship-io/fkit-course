<script>

    import { page } from '$app/stores';
    import { user } from "$lib/firebase";
    import PlayerMap from '$lib/components/PlayerMap.svelte';
    import Map from '$lib/components/Map.svelte';
    
</script>
    
<style>

    .mapScreen {
        padding: 0em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: calc(100%);
        width: 100%;
    }   
    
</style>
        
<div class="mapScreen">
    {#if $user?.uid === $page.params.creatorId}
        <Map role={"gameMaster"}/>
    {:else}
        <PlayerMap role={"player"}/>
    {/if}
</div>