<script>
    import SavedAdventure from "./SavedAdventure.svelte";
    import { page } from '$app/stores';
    import { collection, getDocs, limit, query, where, onSnapshot } from "firebase/firestore";
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
        adventureListStore.update(currentAdventures => {
            return [...copiedAdventures];
        });
        console.log("adventureListStore", $adventureListStore);
        });
        
    });

    


</script>

<style>
    

</style>
    <h2>Your Adventures</h2>
    {#each $adventureListStore as adventure}
        <SavedAdventure adventureData={adventure} {deleteAdventure}/>
    {/each}
