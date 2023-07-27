<script>
    import SavedAdventure from "./SavedAdventure.svelte";
    import { userAdventures } from "$lib/adventureData";
    import { page } from '$app/stores';

    $userAdventures

    

</script>

<style>


</style>
    <h2>Your Adventures</h2>
    {#each $userAdventures as adventure}
        <SavedAdventure adventureData={adventure} />
    {/each}
