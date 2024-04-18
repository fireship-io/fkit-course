<script>

    import { page } from '$app/stores';
    import { user } from "$lib/firebase";
    import PlayerMap from '$lib/components/PlayerMap.svelte';
    import CombinedMap from '$lib/components/CombinedMap.svelte';
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
        <CombinedMap role={"gameMaster"}/>
    {:else}
        <CombinedMap role={"player"}/>
    {/if}
</div>