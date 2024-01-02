<script>
    import Planner from "$lib/components/Planner.svelte";
    import Map from "$lib/components/Map.svelte";
    import { user } from "$lib/firebase";
    import {currentAdventure} from "$lib/adventureData";
    import { screenChoice, activeTile } from "$lib/dashboardState";
    import { onMount } from "svelte";


    let screenSize = 0;

    function clearAdventureData() {
    console.log("clearAdventureData fired")
    let emptyAdventureData = {
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
        map: [],
        userId: $user?.uid,
        adventureId: "",
    };

    currentAdventure.set(emptyAdventureData);
    activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null, tileNotes: ""});

}


    onMount(() => {
        screenChoice.set("createPlanner");
    });



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

    .planner {
        width: 100%;
        grid-column: 1/5;
        grid-row: 1/3;
        height: 100%;
        overflow-y: scroll;
    }

    .planner::-webkit-scrollbar {
        width: 0.2em;
        color: var(--batlas-black);
        background-color: var(--batlas-white);
    }

    .planner::-webkit-scrollbar-thumb {
        width: 0.4em;
        color: var(--batlas-white);
        background: var(--batlas-white);
        border: 0.2em solid var(--batlas-black);
    }

    .planner::-webkit-scrollbar-corner {
        display: none;
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
    grid-column: 1/18;
    grid-row: 1/3;
    margin-right: 2em;
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
<div class="mapColumn" class:invisible={screenSize < 1500 && $screenChoice != "createMap"}>
    <Map />
</div>
