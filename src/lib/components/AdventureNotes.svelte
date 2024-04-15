<script>
  import { page } from '$app/stores';
  import { activeTile, setActiveTile, currentAdventureChange, adventureNotesDisplayed } from "$lib/dashboardState";
  import { currentAdventure } from "$lib/adventureData";
  import { db, user } from "$lib/firebase";
  import {
    doc,
    setDoc,
    getDoc,
    collection,
  } from "firebase/firestore";
  import { v4 as uuidv4 } from "uuid";
  import { createAlert } from "$lib/dashboardState";
  import { onMount } from 'svelte';

  export let role;

  let mapDisabled = false;

  $: $currentAdventure, changeAlert();

  function changeAlert() {
    console.log("change alert");
    currentAdventureChange.set(true);
  }

  function deepCloneArray(arr) {
      return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
  }

  function handleTileClick(e, cell, i, j){
    mapDisabled = true;

      setActiveTile(cell, i, j)
      adventureNotesDisplayed.set(false);
      let floatingTiles = document.getElementsByClassName("tileFloat");
      for (let i = 0; i < floatingTiles.length; i++) {
        floatingTiles[i].classList.remove("tileFloat");
      }
  }
  
  async function handleFogToggle(e, newAdventure, cell, i, j) {
    newAdventure.map[i][j].fogOfWar = !newAdventure.map[i][j].fogOfWar;
    currentAdventure.set(newAdventure);

    const adventuresRef = collection(db, "users", $user.uid, "adventures");

    if (newAdventure.title === "") {
      createAlert("Please enter a title for your adventure.");
      return;
    }

    if (newAdventure.adventureId === "") {
      let uniqueId = uuidv4();
      newAdventure.adventureId = uniqueId;
      console.log("saving new adventure to firebase", newAdventure);
      const adventureRef = doc(adventuresRef, newAdventure.adventureId);
      await setDoc(adventureRef, {
        ...newAdventure,
        map : JSON.stringify(newAdventure.map)
      });
      createAlert(`${newAdventure.title} saved!`)
      setTimeout(() => {
        }, 3000);    
    } else {
      console.log("updating new adventure to firebase", newAdventure);
      const adventureRef = doc(adventuresRef, newAdventure.adventureId);
      await setDoc(adventureRef, {
        ...newAdventure,
        map : JSON.stringify(newAdventure.map)
      });
      createAlert(`${newAdventure.title} updated!`)
      setTimeout(() => {
        }, 3000); 
    }
  }

async function setCurrentAdventureFromFirebase(creatorId, adventureId) {
  const adventureRef = doc(db, "users", creatorId, "adventures", adventureId);
  const adventureSnapshot = await getDoc(adventureRef);
  if (adventureSnapshot.exists()) {
    const adventureData = adventureSnapshot.data();
    currentAdventure.set({
      ...adventureData,
      map: JSON.parse(adventureData.map)
    });
  } else {
    console.log("Adventure document does not exist");
  }
}

  let adventureData = {};
  let adventureId = $page.params.adventureId;
  let creatorId = $page.params.creatorId;

  onMount(async () =>{
    console.log($currentAdventure)
    await setCurrentAdventureFromFirebase(creatorId, adventureId);
  });


</script>

<style>

  .mapContainer {
      background-color: var(--batlas-black);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: 2rem;
      align-items: stretch;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      height: 100%;
      width: 100%;
      max-width: 100%;
      position: static;
      overflow-x: scroll;
  }

  .map::-webkit-scrollbar {
      color: var(--batlas-black);
      background-color: var(--batlas-black);
  }

  .map::-webkit-scrollbar-thumb {
      color: var(--batlas-black);
      background: var(--batlas-black);
      border: 0.1rem solid var(--batlas-white);
  }

  .map::-webkit-scrollbar-corner {
      display: none;
  }

  .map {
        overflow: visible;
        background-color: var(--batlas-black);
        height: 100%;
        width: 100%;
        max-height: none;
  }


  .gridTile{
    width: 200px;
    min-width: 200px;
    height: 150px;
    min-height: 150px;
    margin: 0px;
    padding: 0px;
    overflow: visible;
    background-size: cover;
    background-position: bottom ;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    pointer-events: none;
  }

  
  .gridTile img {
    width: 100%;
    object-fit: cover;
    object-position: bottom center;
    overflow: visible;
    pointer-events: none;
  }

  .gridRow {
    display: flex;
    flex-direction: row;
    padding: 0px;
    margin: 0px;
    margin-top: -100px;
  }
  
  .gridRow:nth-child(1){
    margin-top: 3rem;
  }
  
  .gridRow:nth-last-child(1){
    margin-bottom: 3rem;
  }
  
  .gridRow:nth-child(even){
    transform: translateX(100px);
  }

  .tileSelectorHoverDetector {
    height: 75px;
    width: 75px;
    border-radius: 50px;
    position: absolute;
    bottom: 25%;
    pointer-events: auto;
    z-index: 50;
    opacity: 1;
  }

  .tileSelectorHoverDetector:hover .tileSelector {
    visibility: visible;
    cursor: pointer;
  }

  .tileSelectorHoverDetector + img {
    transition: all 0.3s ease;
  }

  .tileSelectorHoverDetector:hover + img, .tileFloat img {
    transform: translate(0em, -0.5rem);
  }

  .tileSelector {
    visibility: hidden;
    position: absolute;
    bottom: calc(50% - 38px);
    left: calc(50% - 38px);
    height: 75px;
    width: 75px;
    border: 0rem solid var(--batlas-white);
    background: rgba(0, 0, 0, 0);
    border-radius: 100px;
    pointer-events: auto;
    cursor: pointer;
    z-index: 999;
  }

  .dialogueContainer {
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: auto;
    position: sticky;
    left: 1rem;
    top: 0rem;
    pointer-events: none;
    gap: 2em;
    padding: 1.5rem;
    padding-right: 1rem;
    z-index: 100;
  }

  :global(.dialogueContainer *) {
    pointer-events: auto;
  }

  :global(.notesIndicatorIndex) {
    color: var(--batlas-white);
  }

  :global(.masterFoggedTile img) {
    filter: brightness(0.5);
  }

  :global(.mapDisabled){
    pointer-events: none;
  }

  .emptyMap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: var(--batlas-white);
    font-size: 1.5rem;
    padding: 2rem;
    border-radius: 1rem;
    background-color: var(--batlas-black);
    height: 100%;
    width: 80%;
  }

  .adventureNotesContainer {
    position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      overflow-y: scroll;
      right: 1rem;
        top: 0.5rem;
        left: auto;
        bottom: auto;
        width: 20rem;
        color: var(--batlas-white)
    }

    .adventureNotesContainer::-webkit-scrollbar {
      display: none;
    }

    .adventureNotesContainer textarea {
      width: 100%;
      height: 50%;
      padding: 1rem;
      border: 0.25em solid var(--batlas-black);
      border-radius: 1em;
      font-size: 1rem;
    }

  @media(max-width:735px){

    .mapContainer {
      height: 100%;
      width: 100%;
      margin: 0em;
      flex-direction: column;
    }

    .map {
      width: 100%;
      margin: 0rem;
      padding: 0rem;
      padding-right: 0rem;
      min-height: calc(100vh - 100px);
      padding-bottom: 400px;
    }
    .dialogueContainer {
        width: calc(100% - 2rem);
        height: 100%;
        top: auto;
        bottom: 1rem;
        left: 1rem;
        position: fixed;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        padding: 1rem;
    }

    .emptyMap {
      margin: 0em;
      padding: 2rem;
      border-radius: 0em;
      max-height: 100%;
      max-width: 100%;
      font-size: 1rem;
      justify-content: flex-start;
    }

    .adventureNotesContainer {
      top: 8rem;
      z-index: 999;
      width: calc(100% - 2rem);
    }
  }

</style>


{#if role==="editor"}
  <div class="adventureNotesContainer blackBox">
    <h5>Primer</h5>
    <textarea rows="5" class="primer" placeholder="Adventure primer" maxlength="3000" bind:value={$currentAdventure.notes.primer}/>
    <h5>Notes</h5>
    <textarea rows="5" class="notes" placeholder="Adventure notes" maxlength="10000" bind:value={$currentAdventure.notes.notes}/>
  </div>
{:else}
  <div class="adventureNotesContainer blackBox">
    <h5>Primer</h5>
    <p>{$currentAdventure.notes.primer}</p>
    <h5>Notes</h5>
    <p>{$currentAdventure.notes.notes}</p>
  </div>
{/if}
