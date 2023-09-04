<script>
    import Planner from "$lib/components/Planner.svelte";
    import Map from "$lib/components/Map.svelte";
    import CreateSaveBar from "$lib/components/CreateSaveBar.svelte";
    import { auth, user } from "$lib/firebase";
    import { v4 as uuidv4 } from 'uuid';



    import { screenChoice } from "$lib/dashboardState";
    import PromptOptions from '$lib/components/PromptOptions.svelte';
    import { map } from "$lib/mapGen";


    let screenSize = 0;

    let mapArray;

    map.subscribe(value => {
        mapArray = value;
    })

    let createAdventure = {
        title: "",
        notes: {
            enemy: "",
            quest: "",
            npc: "",
            goal: "",
            scene: "",
            push: "",
            gimmick: ""
        },
        map: mapArray,
        userId: $user?.uid,
        adventureId: uuidv4(),
    };

    let loadAdventure = {
        title: "Loaded Adventure",
        notes: {
            enemy: "This is a loaded adventure",
            quest: "This is a loaded adventure",
            npc: "This is a loaded adventure",
            goal: "This is a loaded adventure",
            scene: "This is a loaded adventure",
            push: "This is a loaded adventure",
            gimmick: "This is a loaded adventure"
        },
        map: mapArray,
        userId: $user?.uid,
        adventureId: uuidv4(),
    };

</script>

<style>

    .options {
        grid-column: 1/5;
        grid-row: 1/3;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        width: 100%;
        padding: 0.8em;
        height: 100%;
        overflow: scroll;
    }

    .options::-webkit-scrollbar {
        display: none;
    }

    .content {
        width: 100%;
        grid-column: 5/10;
        height: 100%;
        padding: 0.8em;
        overflow-y: scroll;
    }

    .dungeon {
    border: 1em solid white;
    border-image-slice: 103 107 107 111;
    border-image-width: 1em;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: repeat repeat;
    border-style: solid;
    border-image-source: url('/img/border_full.png');
    background-color: var(--batlas-white);
    max-height: calc(100% - 4em);

}
.mapColumn {
    grid-column: 10/17;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-height: calc(100%);
}

.createAdventureTextArea {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 2em;;
}

.saveBar {
    grid-column: 5/17;
    grid-template-rows: 1/2;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: var(--batlas-white);
}

@media screen and (max-width: 1500px) {

.options, .content, .mapColumn {
    grid-column: 1/2;
    margin-top: 0em;
    height: 100%;
    width: 100%;
}

.options {
    height: 100%;
    padding: 1em;
    margin: 0em;
}

.invisible {
    display: none;
}



}



</style>

<svelte:window bind:innerWidth = {screenSize}/>

<div class="options dungeonBorder" class:invisible={screenSize < 1500 && $screenChoice != "generator"}>
    <h2>Get some ideas</h2>
    <PromptOptions />
</div>
<div class="saveBar">
    <CreateSaveBar {createAdventure} />
</div>
<div class="content dungeonBorder" class:invisible={screenSize < 1500 && $screenChoice != "planner"} >
    <Planner {createAdventure} />
</div>
<div class="mapColumn" class:invisible={screenSize < 1500 && $screenChoice != "mapMaker"}>
    <Map {createAdventure} />
</div>
