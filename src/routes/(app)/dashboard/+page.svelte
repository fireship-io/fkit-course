<script lang="ts">
    import type { PageData } from './$types';
        import { screenChoice, offScreenMenu, activeRule, activeTile, premiumUser } from "$lib/dashboardState";
    import { db, userData, auth, user, app } from "$lib/firebase";
    
    export let data: PageData;

</script>

<style>
    .dashboardContainer {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto auto;
        width: 100%;
        height: 100%;
        max-height: calc(100lvh - 4em);
        gap: 2em;
        padding: 2em;
    }

    .column {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        padding: 2em;
        border-radius: 1em;
        background-color: var(--batlas-white);
        max-width: 33%;
    }

    .firstColumn {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
    }
    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    .votingOptions {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        width: 100%;
    }

    .poll {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        width: 100%;
    }

    .votingOption {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1em;
        border: 0.25em solid var(--batlas-black);
        padding: 0.5em 1em;
        width: 100%;
        border-radius: 1em;
        cursor: pointer;
    }



    .votingOption input, .votingOption label {
        cursor: pointer;
    }

    .votingOption input {
        display: none;
    }

    .votingOption::selection {
        background-color: var(--batlas-black);
        color: var(--batlas-white);
    }

    .votingOption:hover {
        background-color: var(--batlas-black);
        color: var(--batlas-white);
    }

    .votingOption:has(input:checked) {
        background-color: var(--batlas-black);
        color: var(--batlas-white);
    }

    .votingSubmit {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
        width: 100%;
        background-color: var(--batlas-black);
        color: var(--batlas-white);
    }

    .votingSubmit input {
        display: flex;
        background-color: var(--batlas-black);
        color: var(--batlas-white);
        border: none;
        padding: 0.5em 1em;
        border-radius: 1em;
        cursor: pointer;
        font-size: 1em;
    }

    .tutorial {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        width: 100%;
    }

    .tutorialRow {
        display: grid;
        grid-template-columns: 1fr 3fr;
        gap: 1em;
        width: 100%;
    }

    .tutorialRow p {
        width: 100%;
        margin: 0em;
    }

    @media (max-width: 1400px){
        .dashboardContainer {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            width: 100%;
            height: 100%;
            max-height: none;
            gap: 2em;
            padding: 2em;
            overflow-y: scroll;
        }

        .dashboardContainer::-webkit-scrollbar{
            display: none;
        }

        .column {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 2em;
            padding: 2em;
            border-radius: 1em;
            background-color: var(--batlas-white);
            width: 100%;
            max-width: 100%;
        }
    }

</style>

<div class="dashboardContainer">
    <div class="column firstColumn">
        <div class="tutorial">
            <h2>How to use Batlas</h2>
            <div class="tutorialRow">
                <h3>Play:</h3>
                <p>Edit or play your saved adventures.</p>
            </div>
            <div class="tutorialRow">
                <h3>Create:</h3>
                <p>Create new adventures using the map editor.</p>
            </div>
            <div class="tutorialRow">
                <h3>Pre-made:</h3>
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
            <div class="tutorialCheckbox">
                <input type="checkbox" id="tutorialCheckbox" name="tutorialCheckbox" value="tutorialCheckbox">
                <label for="tutorialCheckbox">Don't show this again</label>
            </div>
        </div>
    </div>
    <div class="column secondColumn">
        <div class="updates">
            <h2>Latest updates</h2>
            <h3>Beta Version 1.0.0</h3>
            <p>If you're seeing this please play around and break things.</p>
            <p>I'll be releasing version 1.0 shortly which will put the premium user paywall in place.</p>
            <p>Until then there's an easy toggle in the 'beta bar' at the top of your page that you can use to toggle it in and off. So go crazy and thanks for being here so early on.</p>
        </div>
    </div>
    <div class="column thirdColumn">
        <div class="poll" class:disabled={!$premiumUser}>
            <h2>Current Poll</h2>
            {#if !$premiumUser}
            <p>Only premium users can vote on polls.</p>
            {/if}
            <h3>What should be added next?</h3>
            <form class="votingOptions">
                <div class="votingOption">
                    <input type="radio" id="votingOption1" name="votingOption" value="votingOption1">
                    <label for="votingOption1">More pre-made dungeons</label>
                </div>
                <div class="votingOption">
                    <input type="radio" id="votingOption2" name="votingOption" value="votingOption2">
                    <label for="votingOption2">More dungeon elements</label>
                </div>
                <div class="votingOption">
                    <input type="radio" id="votingOption3" name="votingOption" value="votingOption3">
                    <label for="votingOption3">A world map creator</label>
                </div>
                <div class="votingOption">
                    <input type="radio" id="votingOption4" name="votingOption" value="votingOption4">
                    <label for="votingOption4">A character creator for the Batlas rules</label>
                </div>
                <div class="votingOption">
                    <input type="radio" id="votingOption5" name="votingOption" value="votingOption5">
                    <label for="votingOption5">Drop and drag 'tokens' for play mode</label>
                </div>
                <div class="votingOption votingSubmit">
                    <input type="submit" value="Cast your vote!" />
                </div>
            </form>
            <p>Voting closes at the end of March</p>
        </div>
    </div>
</div>
