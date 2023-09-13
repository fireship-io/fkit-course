<script>
    import { db, userData, user } from "$lib/firebase";
    import {
      arrayRemove,
      arrayUnion,
      doc,
      setDoc,
      updateDoc,
      FieldValue,
      collection,
      addDoc,
    } from "firebase/firestore";
    import { v4 as uuidv4 } from "uuid";
    import { currentAdventure } from "$lib/adventureData";
    
    export let clearAdventureData;

  async function saveAdventureToFirebase(currentAdventure) {
    console.log("saveAdventureToFirebase fired", currentAdventure);

    const adventuresRef = collection(db, "users", $user.uid, "adventures");

    if (currentAdventure.title === "") {
      alert("Please enter a title for your adventure");
      return;
    }

    if (currentAdventure.adventureId === "") {
      let uniqueId = uuidv4();
      currentAdventure.adventureId = uniqueId;
      console.log("saving new adventure to firebase", currentAdventure);
      const adventureRef = doc(adventuresRef, currentAdventure.adventureId);
      await setDoc(adventureRef, {
        ...currentAdventure,
        map : JSON.stringify(currentAdventure.map)
      });
      alert ("Adventure saved!");
    } else {
      console.log("updating new adventure to firebase", currentAdventure);
      const adventureRef = doc(adventuresRef, currentAdventure.adventureId);
      await setDoc(adventureRef, {
        ...currentAdventure,
        map : JSON.stringify(currentAdventure.map)
      });
      alert ("Adventure updated!");
    }
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
        <textarea class="createAdventureTextArea" placeholder="What is your adventure called?" rows="1" bind:value={$currentAdventure.title}/>
    </div>
    <div class="saveBar">
        <button  on:click={clearAdventureData} class="brutalismBorder">New Adventure</button>
        <button  on:click={() => saveAdventureToFirebase($currentAdventure)} class="brutalismBorder">Save Adventure</button>
    </div>
</div>