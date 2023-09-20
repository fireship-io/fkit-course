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
    import { createAlert } from "$lib/dashboardState";
    
    export let clearAdventureData;

    let screenSize = 0;
    let disabledSave = false;

  async function saveAdventureToFirebase(currentAdventure) {
    console.log("saveAdventureToFirebase fired", currentAdventure);

    disabledSave = true;

    const adventuresRef = collection(db, "users", $user.uid, "adventures");

    if (currentAdventure.title === "") {
      createAlert("Please enter a title for your adventure.");
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
      createAlert(`${currentAdventure.title} saved!`)
      setTimeout(() => {
          disabledSave = false;
        }, 3000);      
    } else {
      console.log("updating new adventure to firebase", currentAdventure);
      const adventureRef = doc(adventuresRef, currentAdventure.adventureId);
      await setDoc(adventureRef, {
        ...currentAdventure,
        map : JSON.stringify(currentAdventure.map)
      });
      createAlert(`${currentAdventure.title} updated!`)
      setTimeout(() => {
          disabledSave = false;
        }, 3000); 
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
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        gap: 1em;
        font-size: 1.2em;
    }

    .titleBar input[type="text"] {
        width: 100%;
        border: none;
        font-size: 1.2em;
        text-transform: uppercase;
        color: var(--batlas-black);
        font-weight: 600;
    }

    .titleBar input:focus {
        outline: none;
    }
    
    .titleBar input::placeholder {
        font-style: italic;
        color: var(--batlas-black);
        opacity: 0.6;
    }


    .saveBar {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 1em;
    }

    .saveBar a {
        margin: 0;
        border: 0.1em solid var(--batlas-white);
        width: 100%;
        padding: 0.2em 0.6em;
        border-radius: 0.6em;
        background-color: var(--batlas-black);
        color: var(--batlas-white);
        text-align:center;
        text-decoration: none;
        text-wrap: none;
        white-space: nowrap;
    }

    .saveBar a:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .savedAdventure:hover h4 {
        text-decoration: underline;
    }

    .mobileCreateSaveBar {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        font-size: 1em;
        height: auto;
        padding: 0em;
        padding-bottom: 3em;;
    }

    .mobileCreateSaveBar input{
      overflow: visible;
      height: 3em;
    }

    .mobileCreateSaveBar input::placeholder {
        font-size: 0.8em;
        text-wrap: wrap;
        white-space: normal;
    }

    @media screen and (max-width: 1500px) {

    }

</style>

<svelte:window bind:innerWidth = {screenSize}/>


<div class="createSaveBar" class:dungeonBorder = "{screenSize > 1500}" class:mobileCreateSaveBar = "{screenSize < 1500}">
    <div class="titleBar">
        <input type="text" class="createAdventureTextArea" placeholder="Give your adventure a title to save it" maxlength="300" bind:value={$currentAdventure.title}/>
        <div class="alert" id="titleAlert">You're adventure needs a title.</div>
    </div>
    <div class="saveBar">
        <a  on:click={clearAdventureData} class="brutalismBorder">New Adventure</a>
        {#if $currentAdventure.title != "" && $currentAdventure.adventureId === ""}
        <a  on:click={() => saveAdventureToFirebase($currentAdventure)} class="brutalismBorder" class:disabledButton = "{disabledSave}">Save Adventure</a>
        {:else if $currentAdventure.adventureId != ""}
        <a  on:click={() => saveAdventureToFirebase($currentAdventure)} class="brutalismBorder" class:disabledButton = "{disabledSave}">Update Adventure</a>
        {/if}
    </div>
</div>