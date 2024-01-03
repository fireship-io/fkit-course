<script>
  import TileNotesIndicator from './TileNotesIndicator.svelte';
  import UserControls from './UserControls.svelte';
  import ActiveTileOptionsWindows from './ActiveTileOptionsWindows.svelte';
  import { page } from '$app/stores';
  import { activeTile, setActiveTile, currentAdventureChange } from "$lib/dashboardState";
  import { currentAdventure } from "$lib/adventureData";
  import { db, user } from "$lib/firebase";
  import {
    doc,
    setDoc,
    collection,
    onSnapshot,
  } from "firebase/firestore";
  import { v4 as uuidv4 } from "uuid";
  import { createAlert } from "$lib/dashboardState";
  import { onMount } from 'svelte';

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
      let floatingTiles = document.getElementsByClassName("tileFloat");
      for (let i = 0; i < floatingTiles.length; i++) {
        floatingTiles[i].classList.remove("tileFloat");
      }
  }
  
  async function handleFogToggle(e, currentAdventure, cell, i, j) {
    console.log("Fog toggle", currentAdventure.map[i][j].fogOfWar);
    currentAdventure.map[i][j].fogOfWar = !currentAdventure.map[i][j].fogOfWar;

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
        }, 3000); 
    }
  }

  let adventureData = {};
  let adventureId = $page.params.adventureId;
  let creatorId = $page.params.creatorId;

onMount(async () => {
  onSnapshot(doc(db, "users", creatorId, "adventures", adventureId), (doc) => {
    if (doc.exists()) {
      adventureData = doc.data();
      adventureData.map = JSON.parse(adventureData.map);
      currentAdventure.set(adventureData);
    } else {
      console.log("No such document!");
    }
  });
});

</script>

<style>

  .mapContainer {
      background-color: var(--batlas-black);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      height: 100%;
      width: 100%;
      position: relative;
  }

  .map::-webkit-scrollbar {
      color: var(--batlas-black);
      background-color: var(--batlas-black);
  }

  .map::-webkit-scrollbar-thumb {
      color: var(--batlas-black);
      background: var(--batlas-black);
      border: 0.1em solid var(--batlas-white);
  }

  .map::-webkit-scrollbar-corner {
      display: none;
  }

  .map {
        overflow:scroll;
        background-color: var(--batlas-black);
        height: 100%;
        max-height: calc(100lvh - 2em);
  }


  .gridTile{
    width: 10em;
    height: 7.5em;
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
    width: 10em;
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
    overflow: visible;
    margin-top: -5em;
  }
  
  .gridRow:nth-child(1){
    margin-top: 3em;
  }
  
  .gridRow:nth-last-child(1){
    margin-bottom: 3em;
  }
  
  .gridRow:nth-child(even){
    transform: translateX(5em);
  }

  .tileSelectorHoverDetector {
    height: 4em;
    width: 4em;
    border-radius: 2em;
    position: absolute;
    bottom: 25%;
    pointer-events: auto;
    z-index: 998;
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
    transform: translate(0em, -0.5em);
  }

  .tileSelector {
    visibility: hidden;
    position: absolute;
    bottom: calc(50% - 2.5em);
    left: calc(50% - 2.5em);
    height: 5em;
    width: 5em;
    border: 0em solid var(--batlas-white);
    background: rgba(0, 0, 0, 0);
    border-radius: 3em;
    pointer-events: auto;
    cursor: pointer;
    z-index: 999;
  }

  .dialogueContainer {
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    height: 100%;
    max-height: calc(100lvh - 4em);
    width: 100%;
    position: absolute;
    bottom: 2em;
    right: 2em;
    pointer-events: none;
    gap: 2em;
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

</style>

<div class="mapContainer">
    <div class="map">
      {#each $currentAdventure.map as row, i}
          <div class="gridRow">
              {#each row as cell, j}
                <div class="gridTile" style="background-image: {cell.chosenTile?.img}; position: relative; bottom: 0em;" class:masterFoggedTile = {cell.fogOfWar}>
                  {#if cell.tileNotes != "" || cell.interestPoints.length > 0 || cell.tileTitle != ""}
                    <TileNotesIndicator/>
                  {/if}
                  {#if cell.chosenTile?.img !== "/tiles/dungeon/roomBlank.webp" || !$page.route.id.includes("/player/")}
                    <div class="tileSelectorHoverDetector">
                      <div
                        on:click={(e) => handleTileClick(e, cell, i, j)}
                        class="tileSelector"
                        class:disabledHoverSelector = {mapDisabled}
                        on:keydown={(e) => handleTileClick(e, cell, i, j)}
                        role="button"
                        tabindex="0">
                      </div>
                    </div>
                  {/if}
                  {#if cell.chosenTile?.img === "/tiles/dungeon/roomBlank.webp" && $page.route.id.includes("/player/")}
                    <img src="/img/tiles/dungeon/roomBlankPlay.webp" alt="{cell.chosenTile?.img}">
                  {:else}
                    <img src="/img{cell.chosenTile?.img}" alt="{cell.chosenTile?.img}">
                  {/if}
                </div>
              {/each}
          </div>
      {/each}
    </div>
    <div class="dialogueContainer">
      <UserControls/>
      {#if $activeTile.rowIndex !== null}s
        <ActiveTileOptionsWindows handleFogToggle={handleFogToggle} />
      {/if}
    </div>
</div>

