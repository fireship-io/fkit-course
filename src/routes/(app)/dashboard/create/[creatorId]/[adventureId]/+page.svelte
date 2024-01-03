<script>
    import Map from "$lib/components/Map.svelte";
</script>

<style>
    .mapColumn {
        grid-column: 1/18;
        grid-row: 1/3;
        margin-right: 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        max-height: calc(100%);
    }

</style>

<div class="mapColumn">
    <Map />
</div>
