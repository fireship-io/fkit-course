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

    function compare(a, b) {
        if (a.updatedDate > b.updatedDate) {
            return -1;
        }
        if (a.updatedDate < b.updatedDate) {
            return 1;
        }
        return 0;
    }

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

            let sortedCopiedAdventures = copiedAdventures.sort(compare);
            console.log("sortedCopiedAdventures", sortedCopiedAdventures);

        adventureListStore.update(currentAdventures => {
            return [...sortedCopiedAdventures];
        });
        console.log("adventureListStore", $adventureListStore);
        });
        
    });

    


</script>

<style>
    .adventureList {
        padding: 1rem;
        gap: 1em;
        width: 100%;
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
        max-width: 20em;
        height: auto;
        padding: 1em;
        background-color: var(--color-dark);
        border-radius: 0.8em;
        background: var(--batlas-white);
        z-index: 5;
        text-align: center;
    }

</style>
<div class="adventureList">
    {#if $adventureListStore.length === 0}
    <div class="freeAccountNotice">
        <p>You don't have any adventures saved. Head to 'Create' and start designing you dungeon!</p>
    </div>
    {/if}
    {#if !$premiumUser}
    <div class="freeAccountNotice">
        <p>On a free account you're limited to 5 saved adventures</p>
    </div>
    {/if}
    {#each $adventureListStore as adventure}
        <SavedAdventure adventureData={adventure} {deleteAdventure}/>
    {/each}
</div>