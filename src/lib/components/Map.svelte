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
    getDoc,
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
        overflow:auto;
        background-color: var(--batlas-black);
        height: 100%;
        min-height: 100lvh;
        max-height: none;
        margin-left: 3em;
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
    flex-direction: column;
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

  :global(.mapDisabled){
    pointer-events: none;
  }

  .emptyMap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--batlas-white);
    font-size: 1.5em;
    padding: 2em;
    margin: 2em;
    border-radius: 1em;
    background-color: var(--batlas-black);
    height: 100%;
    max-height: 20em;
    width: 100%;
    max-width: 20em;
  }

  @media(max-width:700px){

    .mapContainer {
      height: 100%;
      width: 100%;
      margin: 0em;
    }

    .map {
      width: 100%;
      margin: 0em;
      padding: 0em;
      padding-right: 0em;;
    }
    .dialogueContainer {
        width: calc(100% - 2em);
        height: 100%;
        bottom: 1em;
        left: 1em;
        position: fixed;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    .emptyMap {
      margin: 0em;
      padding: 2em;
      border-radius: 0em;
      max-height: 100%;
      max-width: 100%;
      font-size: 1em;
      justify-content: flex-start;
    }
  }

</style>

<div class="mapContainer">

  <div class="map" >
    {#if $currentAdventure.map.length === 0 && $page.route.id.includes("/create/")}
      <div class="emptyMap" >
        <p>Hit 'random map' until you get a starting point that looks good to you. Then click the tiles to alter them and add notes. Happy dungeon delving!</p>
      </div>
    {/if}  
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

