<script>
    import Map from '$lib/components/Map.svelte';
    import { currentAdventure, adventureListStore, playAdventureCurrent } from '$lib/adventureData';
    import AdventureContent from "$lib/components/AdventureContent.svelte";
    import SavedAdventures from "$lib/components/SavedAdventures.svelte";
    import { screenChoice } from "$lib/dashboardState";
    import { db, userData, user } from "$lib/firebase";
    import {onMount} from "svelte";
    import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayRemove, onSnapshot, deleteDoc } from "firebase/firestore";
    import { writable } from 'svelte/store';



    async function deleteAdventure(adventure) {
        let adventureRef = doc(db, "users", $user.uid, "adventures", adventure);
        let adventureSnap = await getDoc(adventureRef);
        let deleteId = adventure;
        console.log(deleteId, adventureSnap.data())

        deleteDoc(adventureRef)
        .then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    onMount(() => {
        screenChoice.set("playHome");
    });


</script>

<style>
    .options {
        grid-column: 1/5;
        grid-row: auto / span 2;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        width: 100%;
        padding: 0.8em;
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
    grid-column: 11/17;
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

<div class="options dungeonBorder" class:invisible={$currentAdventure != null && $screenChoice != "playHome"}>
    <SavedAdventures {deleteAdventure}/>
</div>
{#if $currentAdventure != null && $screenChoice == "playAdventureNotes"}
<div class="content dungeonBorder">
    <AdventureContent />
</div>
{:else if $currentAdventure != null && $screenChoice == "playAdventureMap"}
<div class="map">
    <Map />
</div>
{/if}
