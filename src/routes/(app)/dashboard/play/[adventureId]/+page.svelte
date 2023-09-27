<script>

import { error } from '@sveltejs/kit';
import {adventureListStore, currentAdventure, playAdventureCurrent} from "$lib/adventureData";
import { collection, getDocs, limit, query, where, onSnapshot } from "firebase/firestore";
import { onMount } from "svelte";
import { page } from '$app/stores';
import { db, user } from "$lib/firebase";
import Map from '$lib/components/Map.svelte';
import AdventureContent from "$lib/components/AdventureContent.svelte";

let playingAdventure = {};
let pageId = $page.params.adventureId;

onMount(() => {
    pageId = $page.params.adventureId;
    playingAdventure = $adventureListStore.find(adventure => adventure.adventureId === pageId);
    console.log(pageId, playingAdventure);

    currentAdventure.set({
        ...playingAdventure
    });
});

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
    grid-column: 4/17;
    grid-row: auto / span 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100%);
}

@media screen and (max-width: 1500px) {

.options, .content, .map {
    grid-column: 1/3;
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



}



</style>

<div class="options dungeonBorder">
    <AdventureContent />
</div>

<div class="map">
    <Map />
</div>