<script>
    import CreateMap from "$lib/components/CreateMap.svelte";
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
        margin: 0rem;
        }
    }
</style>

<div class="mapColumn">
    <CreateMap />
</div>
