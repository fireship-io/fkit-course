<script>
import DungeonMap from "$lib/components/DungeonMap.svelte";    
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
        <DungeonMap />
</div>