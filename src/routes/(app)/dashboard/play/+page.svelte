<script>
    import SavedAdventures from "$lib/components/SavedAdventures.svelte";
    import { db, user } from "$lib/firebase";
    import { doc, deleteDoc } from "firebase/firestore";

    async function deleteAdventure(adventure) {
        try {
            let adventureRef = doc(db, "users", $user.uid, "adventures", adventure);
            await deleteDoc(adventureRef);
        } catch (error) {
        }
    }
</script>

<style>

    .fullScreen {
        width: 100%;
        height: 100%;
        }

</style>

<div class="fullScreen">
    <SavedAdventures {deleteAdventure}/>
</div>
