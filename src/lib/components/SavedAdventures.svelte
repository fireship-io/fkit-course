<script>
    import SavedAdventure from "./SavedAdventure.svelte";
    import { collection, onSnapshot } from "firebase/firestore";
    import { premiumUser } from "$lib/dashboardState";
    import { db, user } from "$lib/firebase";
    import { onMount } from "svelte";
    import {adventureListStore, playAdventureCurrent} from "$lib/adventureData";

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
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .adventureList::-webkit-scrollbar {
        display: none;
    }

    .freeAccountNotice.blackBox {
        width: auto;
        border:none;
        padding: 0;
        z-index: 5;
        text-align: left;
        color: var(--batlas-white);
    }

</style>
<div class="adventureList">
    {#if $adventureListStore.length === 0}
    <div class="freeAccountNotice blackBox">
        <p>You don't have any adventures saved. Head to 'Create' and start designing you dungeon!</p>
    </div>
    {/if}
    {#if !$premiumUser}
    <div class="freeAccountNotice blackBox">
        <p>On a free account you're limited to 5 saved adventures</p>
    </div>
    {/if}
    {#each $adventureListStore as adventure}
        <SavedAdventure adventureData={adventure}/>
    {/each}
</div>