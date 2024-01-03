<script>

    import SavedAdventures from "$lib/components/SavedAdventures.svelte";
    import { db, user } from "$lib/firebase";
    import { doc, getDoc, deleteDoc } from "firebase/firestore";

    async function deleteAdventure(adventure) {
        let adventureRef = doc(db, "users", $user.uid, "adventures", adventure);
        let adventureSnap = await getDoc(adventureRef);
        let deleteId = adventure;
        
        deleteDoc(adventureRef)
        .then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }


</script>

<style>

    .fullScreen {
        width: 100%;
    }

</style>

<div class="fullScreen">
    <SavedAdventures {deleteAdventure}/>
</div>
