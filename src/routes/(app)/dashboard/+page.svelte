<script lang="ts">
  import HomeUpdates from '$lib/components/HomeUpdates.svelte';
    import HomeTutorial from '$lib/components/HomeTutorial.svelte';
    import HomePoll from '$lib/components/HomePoll.svelte';

</script>

<style>
    .dashboardContainer {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        gap: 1rem;
        padding: 1rem;
    }

    .column {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1rem;
        background-color: var(--batlas-white);
    }

</style>

<div class="dashboardContainer">
    <div class="whiteBox thirdsColumn column">
        <HomeTutorial />
    </div>
    <div class="whiteBox thirdsColumn column">
        <HomeUpdates />
    </div>
    <div class="whiteBox thirdsColumn column">
        <HomePoll/>
    </div>
</div>
