<script lang="ts">
    import Divider from '$lib/components/Divider.svelte';
</script>

<style>

    .tutorial {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        width: 100%;
    }

    .tutorialRow {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.25em;
        width: 100%;
    }

    .tutorialRow h3 {
        font-size: 1.25rem;
        font-weight: 600;
    }

    .tutorialRow p {
        width: 100%;
        margin: 0em;
    }        
</style>

<div class="tutorial">
            <h2>How to use Batlas</h2>
            <Divider />
            <div class="tutorialRow">
                <h3>Adventures:</h3>
                <p>Edit or play your saved adventures.</p>
            </div>
            <div class="tutorialRow">
                <h3>Create:</h3>
                <p>Create new adventures using the map editor.</p>
            </div>
            <div class="tutorialRow">
                <h3>Dungeons:</h3>
                <p>Pre-made adventures for you to use in any game system.</p>
            </div>
            <div class="tutorialRow">
                <h3>Batlas RPG:</h3>
                <p>A rules-light fantasy role playing game for you to try.</p>
            </div>
            <div class="tutorialRow">
                <h3>Account:</h3>
                <p>Manage your account settings and preferences.</p>
            </div>
        </div>

