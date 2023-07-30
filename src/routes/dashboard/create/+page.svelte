<script>
  import Map from '../../../lib/components/Map.svelte';
    import { currentAdventure } from '$lib/adventureData';
    import AdventureContent from "$lib/components/AdventureContent.svelte";
    import SavedAdventures from "$lib/components/SavedAdventures.svelte";
    import { screenChoice } from "$lib/dashboardState";
    import PromptOptions from '$lib/components/PromptOptions.svelte';

</script>

<style>
    .options {
        grid-column: 1/5;
        grid-row: 1/2;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        width: 100%;
        padding: 0.8em;
        height: 100%;
        margin-top:2em;
        overflow: scroll;;

    }

    .options::-webkit-scrollbar {
        display: none;
    }

    .content {
        width: 100%;
        grid-column: 5/11;
        height: 100%;
        margin-top:2em;
        padding: 0.8em;
        overflow-y: scroll;
    }

    .dungeon {
    border: 1em solid white;;
    border-image-slice: 103 107 107 111;
    border-image-width: 1em;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: repeat repeat;
    border-style: solid;
    border-image-source: url('/img/border_full.png');
    background-color: var(--batlas-white);
}
.map {
    grid-column: 11/17;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 4em);
}

.createAdventureTextArea {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 2em;;
}

@media screen and (max-width: 1500px) {

.options, .content, .map {
    grid-column: 1/2;
    margin-top: 0em;
    height: 100%;
}

.options {
    height: 100%;
    padding: 2em;
    margin: 0em;
}

.invisible {
    display: none;
}



}



</style>

<div class="options dungeonBorder" class:invisible={$currentAdventure != null}>
    <h2>Get some ideas</h2>
    <PromptOptions />
</div>
<div class="content dungeonBorder" >
    <h2>Flesh out the Adventure</h2>
    <div class="createAdventureNotesSection">
        <h4>Title</h4>
        <textarea class="createAdventureTextArea brutalismBorder" placeholder="The monster" rows="2"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>The Enemy</h4>
        <textarea class="createAdventureTextArea brutalismBorder" placeholder="Details the antoganist of this adventure. What is it? Does it have minions? What signs of it couuld be found throughout the dungeon?" rows="6"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>The Quest</h4>
        <textarea class="createAdventureTextArea brutalismBorder" placeholder="Detail the hook and context of the adventure. Why is the party doing this? What parties are involved?" rows="6"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>The NPC</h4>
        <textarea class="createAdventureTextArea brutalismBorder" placeholder="Detail the NPC the party will be spending the most time with. What do they look like? How do they speak and act? Why are they in their current situation?" rows="6"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>Set the party's goal</h4>
        <textarea class="createAdventureTextArea brutalismBorder" placeholder="Clearly define what the party is trying to achieve this game. Give them deirection, but don't restrain them." rows="4"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>Describe the scene</h4>
        <textarea class="createAdventureTextArea brutalismBorder" placeholder="Describe the location in broad strokes. Try to give an atmosphere and allow the specifics to emerge during the game." rows="8"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>Push the party forward</h4>
        <textarea class="createAdventureTextArea brutalismBorder" placeholder="Force the party to action. Make something chase them, limit their time to plan, raise the stakes. Make the situation worse." rows="6"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>Give them a gimmick</h4>
        <textarea class="createAdventureTextArea brutalismBorder" placeholder="Put something fun throughout the adventure. Give the party something to play with." rows="5"/>
    </div>
</div>
<div class="map" class:invisible={$screenChoice != "map"}>
    <Map />
</div>
