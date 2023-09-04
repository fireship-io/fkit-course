<script>
    import { db, userData, user } from "$lib/firebase";
    import {
      arrayRemove,
      arrayUnion,
      doc,
      setDoc,
      updateDoc,
    } from "firebase/firestore";
    
    export let createAdventure;

    function logCreateAdventure() {
        console.log(createAdventure, "createAdventureTitle")
    };

  async function saveAdventureToFirebase(createAdventure) {
    console.log("saving adventure to firebase", createAdventure);
      const userRef = doc(db, "users", $user.uid);
  
      await updateDoc(userRef, {
        adventures: arrayUnion({
          ...createAdventure
        }),
      });
    }


</script>

<style>
    .createSaveBar {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding: 0em 0.8em;
    }

    .titleBar {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        gap: 1em;
        font-size: 1.2em;
    }

    .createAdventureTextArea {
        min-width: 30em;
    }

</style>
<div class="createSaveBar dungeonBorder">
    <div class="titleBar">
        <h4>Title</h4>
        <textarea class="createAdventureTextArea" placeholder="What is your adventure called?" rows="1" bind:value={createAdventure.title} />
    </div>
    <div class="saveBar">
        <button  on:click={logCreateAdventure} class="brutalismBorder">Load Adventure</button>
        <button  on:click={() => saveAdventureToFirebase(createAdventure)} class="brutalismBorder">Save Adventure</button>
    </div>
</div>