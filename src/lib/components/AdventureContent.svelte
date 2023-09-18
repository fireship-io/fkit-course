<script>
  import AdventureTools from './AdventureTools.svelte';

    import { currentAdventure } from '$lib/adventureData';
    $currentAdventure;

    let screenSize = 0;

    function emptyCurrentAdventure() {
        currentAdventure.set({});
    };

</script>

<style>
    * {
        border: 0.1em soid black;
    }

    .adventureContentGrid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: 3em auto;
        width: 100%;
        height: 100%;
        max-height: calc(100lvh - 4em);
        gap: 2em;
        padding: 1em;
        overflow: scroll;
    }

    .adventureContentGrid::-webkit-scrollbar {
        display: none;
    }

    .adventureTitle {
        grid-column: 1 / 7;
        grid-row: 1 / 2;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 2em;
    }

    .adventureTitle h2 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .adventureOptionsBar {
        grid-column: 5 / 7;
        grid-row: 1 / 2;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .adventureOption {
        aspect-ratio: 1/1;
        background-color: var(--batlas-black);
        height: 2.5em;
    }

    .adventureNotes {
        grid-column: 1 / 7;
        grid-row: 2 / 3;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 2em;
        padding: 0.5em;
        padding-top: 1em;
    }

    .adventureNotes::-webkit-scrollbar {
        display: none;
    }

    .notesSection {
        padding: 1em;
        width: 100%;
    }

    .notesSection h3 {
        font-size: 1.4em;
        margin-bottom: 0.4em;
        text-decoration: underline;
    }

    .adventureTools {
        grid-column: 5 / 7;
        grid-row: 2 / 3;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        padding: 0.5em;
        padding-top: 1em;
        height: calc(100lvh - 15em);
        position: sticky;
        top: 0;
    }
    .tool {
        width: 100%;
        padding: 1em;
        cursor: pointer;
        background-color: var(--batlas-white);
    }

    .icon {
        fill: var(--batlas-black);
        width: 100%;
        height: 2em;
    }

    @media screen and (max-width:1500px) {
        .adventureNotes {
            grid-column: 1 / 7;
        }
    }
</style>

<svelte:window bind:innerWidth={screenSize} />

<div class="adventureContentGrid">

    <div class="adventureTitle">
        <h2>{$currentAdventure.title}</h2>
    </div>

    <div class="adventureNotes">
        <div class="notesSection brutalismBorder">
            <h3>The Enemy</h3>
            <p>{$currentAdventure.notes.enemy}</p>
        </div>
        <div class="notesSection brutalismBorder">
            <h3>The Quest</h3>
            <p>{$currentAdventure.notes.quest}</p>
        </div>
        <div class="notesSection brutalismBorder">
            <h3>NPC</h3>
            <p>{$currentAdventure.notes.npc}</p>
        </div>
        <div class="notesSection brutalismBorder">
            <h3>The Goal</h3>
            <p>{$currentAdventure.notes.goal}</p>
        </div>
        <div class="notesSection brutalismBorder">
            <h3>The Scene</h3>
            <p>{$currentAdventure.notes.scene}</p>
        </div>
        <div class="notesSection brutalismBorder">
            <h3>The Push</h3>
            <p>{$currentAdventure.notes.push}</p>
        </div>
        <div class="notesSection brutalismBorder">
            <h3>The Gimmick</h3>
            <p>{$currentAdventure.notes.gimmick}</p>
        </div>
    </div>
</div>