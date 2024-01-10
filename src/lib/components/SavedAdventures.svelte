<script>
    import SavedAdventure from "./SavedAdventure.svelte";
    import { page } from '$app/stores';
    import { collection, getDocs, limit, query, where, onSnapshot } from "firebase/firestore";
    import { premiumUser } from "$lib/dashboardState";
    import { db, user } from "$lib/firebase";
    import { error } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import {adventureListStore, currentAdventure, playAdventureCurrent} from "$lib/adventureData";

    export let deleteAdventure;
    let userAdventures = [];

    adventureListStore.subscribe(value => {
        userAdventures = value;
    });


    const userAdventuresRef = collection(db, "users", $user.uid, "adventures");

    onMount(() => {
        playAdventureCurrent.set(false);
        let copiedAdventures = [];

        onSnapshot(collection(db, "users", $user.uid, "adventures"), (adventures) => {
            copiedAdventures = [];
            adventures.forEach((adventure) => {
                let currentAdventure = adventure.data();
                currentAdventure.map = JSON.parse(currentAdventure.map);
                copiedAdventures.push(currentAdventure);
            });
            if (!$premiumUser) {
                copiedAdventures = copiedAdventures.slice(0, 5);
            }
        adventureListStore.update(currentAdventures => {
            return [...copiedAdventures];
        });
        console.log("adventureListStore", $adventureListStore);
        });
        
    });

    


</script>

<style>
    .adventureList {
        gap: 2em;
        padding-right: 3em;
        width: 100%;
        height: 100%;
        max-height: calc(100lvh - 4em);
        overflow: scroll;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .adventureList::-webkit-scrollbar {
        display: none;
    }

    .freeAccountNotice {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        width: 100%;
        height: auto;
        padding: 1em;
        background-color: var(--color-dark);
        border-radius: 0.8em;
        background: var(--batlas-white);
        z-index: 5;
    }

    @media (max-width: 700px) {
        .adventureList {
            height: auto;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            margin-right: 0;
            padding-right: 0;
            width: 100%;
            flex-wrap: nowrap;
            flex: 1;
            overflow: auto;
            padding-bottom: 10em;
        }
    }

</style>
<div class="adventureList">
    {#if !$premiumUser}
    <div class="freeAccountNotice brutalismBorder">
        <p>On a free account you're limited to 5 saved adventures</p>
    </div>
    {/if}
    {#each $adventureListStore as adventure}
        <SavedAdventure adventureData={adventure} {deleteAdventure}/>
    {/each}
</div>