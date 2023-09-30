<script>

import { error } from '@sveltejs/kit';
import {adventureListStore, currentAdventure, playAdventureCurrent} from "$lib/adventureData";
import { collection, getDocs, limit, query, where, onSnapshot, doc } from "firebase/firestore";
import { onMount } from "svelte";
import { page } from '$app/stores';
import { db, user } from "$lib/firebase";
import Map from '$lib/components/Map.svelte';
import AdventureContent from "$lib/components/AdventureContent.svelte";
import Icons from '$lib/components/Icons.svelte';
import { screenChoice } from '$lib/dashboardState';

let pageId = $page.params.adventureId;
let playingAdventure = {};
let adventuresNotesCollapsed = false;

let screenSize = 0;




onMount(() => {
    try {
        screenChoice.set("playAdventureNotes");
        onSnapshot(doc(db, "users", $user.uid, "adventures", pageId), (adventure) => {
            playingAdventure = adventure.data();
            playingAdventure.map = JSON.parse(playingAdventure.map);
            console.log("adventure", adventure.data());
            console.log("adventure", playingAdventure);
            currentAdventure.set({
            ...playingAdventure
        });
    });
    } catch {
        console.log(error);
    }
});

function toggleActive(e) {
    adventuresNotesCollapsed = !adventuresNotesCollapsed;
    }

</script>

<style>
    .options {
        grid-column: 1/4;
        grid-row: auto / span 2;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        width: 100%;
        height: 100%;
        max-height: calc(100lvh - 4em);

        overflow: scroll;

    }

    .options::-webkit-scrollbar {
        display: none;
    }

    .optionsCollapsed {
        grid-column: 1/2;
        grid-row: 1/2;
        padding: 0.4em;
    }

    .optionsCollapsed + .map {
        grid-column: 2/17;
        grid-row: auto / span 2;
    }

    .content {
        width: 100%;
        grid-column: 5/11;
        height: 100%;
        max-height: calc(100lvh - 4em);
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
    padding: 0em;
    grid-column: 4/17;
    grid-row: auto / span 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100%);
}

.icon   {
    width: 2em;
    height: 2em;
    fill: var(--batlas-black);
    cursor: pointer;
}

@media screen and (max-width: 1500px) {

.options, .content, .map {
    height: 100%;
}
.options {
    height: 100%;
    padding: 1em;
}

.invisible {
    display: none;
}

.map {
    overflow-x: hidden;
}

.currentScreen {
    grid-template-columns: 1;
}



}



</style>

<svelte:window bind:innerWidth = {screenSize}/>

{#if adventuresNotesCollapsed === true}
    <div class="optionsCollapsed dungeonBorder">
        <div on:click={(e) => toggleActive(e)} class="iconContainer brutalismBorderWhite mapGenButton">
            <Icons icon={"rightChevron"} size={"medium"} color={"black"} />
        </div>
    </div>
{:else}
    <div class="options dungeonBorder" class:invisible={screenSize < 1500 && $screenChoice != "playAdventureNotes"}>
        <AdventureContent {toggleActive}/>
    </div>
{/if}

<div class="map" class:invisible={screenSize < 1500 && $screenChoice != "playAdventureMap"}>
    <Map />
</div>