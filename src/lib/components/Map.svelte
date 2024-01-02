<script>
  import TileNotesIndicator from './TileNotesIndicator.svelte';

  import UserControls from './UserControls.svelte';

  import ActiveTileOptionsWindows from './ActiveTileOptionsWindows.svelte';

    import { page } from '$app/stores';
    import { map, generateMap } from "$lib/mapGen";
    import { activeTile, playMode, setActiveTile } from "$lib/dashboardState";
    import { currentAdventure } from "$lib/adventureData";
    import { db, user } from "$lib/firebase";
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
    import { createAlert } from "$lib/dashboardState";
    import { onMount } from 'svelte';
    import MapArray from './MapArray.svelte';
    import Icons from './Icons.svelte';
    import { fly } from 'svelte/transition';


    let screenSize = 0;
    let mapDisabled = false;

    let disabledMapGenButton = false;

    function notesOrder() {
      let tileNotesIndicators = document.getElementsByClassName("tileNotesIndicator");
      for (let i = 0; i < tileNotesIndicators.length; i++) {
        tileNotesIndicators[i].removeChild(tileNotesIndicators[i].firstChild);
        let index = document.createElement("p");
        index.style = "margin: 0px; padding: 0px; font-size: 0.8em; font-weight: 600; color: white;";
        index.innerHTML = i + 1;
        tileNotesIndicators[i].appendChild(index);
      }
    }



    function deepCloneArray(arr) {
        return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
    }

    function setChosenTile(tile, rowIndex, columnIndex) {
        let newMap = deepCloneArray($currentAdventure.map);
        newMap[rowIndex][columnIndex].chosenTile = tile;
        currentAdventure.set({ ...$currentAdventure, map: newMap});
        activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null});
        mapDisabled = false;
    }

    function handleTileClick(e, cell, i, j){
      mapDisabled = true;

        setActiveTile(cell, i, j)
        let floatingTiles = document.getElementsByClassName("tileFloat");
        for (let i = 0; i < floatingTiles.length; i++) {
          floatingTiles[i].classList.remove("tileFloat");
        }
    }

    function openTileContextMenu(i, j){
      currentAdventure.set(...$currentAdventure, currentAdventure.map[i][j].contextMenu = true);
    }

    function clearActiveTile(){
      activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null});
      mapDisabled = false;
    }


    function handleMapGenerate() {
      disabledMapGenButton = true;
      activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null, tileNotes: ""});
      generateMap();
      setTimeout(() => {
        disabledMapGenButton = false
      }, 500);
    }

    function setActive(e) {
        document.querySelectorAll('.interestPoint').forEach((element) => {
            element.classList.remove("interestPointActive");
        });
        e.target.closest('div').classList.toggle("interestPointActive");
    }

    function toggleActive(e) {
      e.target.closest('.interestPoint').classList.toggle("interestPointActive");
    }

    function handlePointOfInterestDelete(interestPoint){
      console.log(interestPoint);
      let newMap = deepCloneArray($currentAdventure.map);
      let interestPointIndex = newMap[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints.findIndex(point => point.title === interestPoint.title);
      newMap[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints.splice(interestPointIndex, 1);
      currentAdventure.set({ ...$currentAdventure, map: newMap});!$page.route.id.includes("play")
    }

    function handlePointOfInterestCreation(){
      let newMap = deepCloneArray($currentAdventure.map);
      newMap[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints.push({title: "", info: ""});
      currentAdventure.set({ ...$currentAdventure, map: newMap});
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

    .tileOptions::-webkit-scrollbar {
        color: var(--batlas-black);
        background: var(--batlas-black);
    }

    .tileOptions::-webkit-scrollbar-thumb {
        color: var(--batlas-black);
        background: var(--batlas-black);
        border: 0.1em solid var(--batlas-white);
    }

    .tileOptions::-webkit-scrollbar-corner {
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

  .tileOptionsBar {
    display: block;
    width: calc(100% - 16em);
  }

  .tileInfoBar {
    padding: 0.8em;
    display: none;
  }

  .tileInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1.5em;
    height: 100%;
  }

  .tileInfo p {
    margin: 0px;
    padding: 0px;
  }

  .tileInfo h4 {
    margin: 0em;
    margin-bottom: 0.3em;
    margin-top: 1em;
    font-size: 1.3em;
  }

  .tileInfoText {
    width: 100%;
    outline: none;
    border: 0.3em solid var(--batlas-black);
    border-radius: 2em;
    padding: 1em;
    font-size: 1em;
    font-family: var(--batlas-font);
  }

  p.roomDescription {
    margin-bottom: 2em;
  }

  .interestPointsList {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.4em;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }

  .tileOptionsBarActive{
        display: block;
        position: absolute;
        bottom: 0em;
  }

  .tileInfoBarActive{
        display: block;
        position: absolute;
        top: 0em;
        right: 0em;
        width: 22em;
        height: 100%;
  }


  .tileOptions {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    overflow-x: scroll;
    overflow-y: hidden;
    background-color: var(--batlas-black);
    gap: 1em;
    padding: 0em 1em;
    padding-top: 1em;
  }

  .tileOption {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    aspect-ratio: 1/1;
    transition: all 0.1s ease-in-out;
    border: 0.2em solid var(--batlas-black);  
  }

  .tileOption:hover {
    cursor: pointer;
    border: 0.2em solid var(--batlas-white);
  }

  .hideScrollbar::-webkit-scrollbar {
    display: none;
  }

  .hideScrollbar {
    padding: 0em;
  }


  .tileOption img {
    height: 100%;
    width: 6em;
    object-fit: contain;
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

  .gridTile:hover .fogToggler {
    visibility: visible;
    cursor: pointer;
    opacity: 1;
  }

  .fogToggler {
    visibility: visible;
    opacity: 0;
    position: absolute;
    background-color: var(--batlas-white);
    bottom: 0em;
    right: 2em;
    height: auto;
    width: auto;
    border-radius: 3em;
    pointer-events: auto;
    cursor: pointer;
    z-index: 999;
  }

  .mapSettings {
    color: var(--batlas-white);
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 2em;
    padding: 1em;
    position: relative;
    top: 0em;
    left: 0em;
    background-color: transparent;
  }

  .mapSettings p {
    margin: 0px;
    padding-top: 0.3em;
  }

  .mapGenButton {
    cursor: pointer;
    background-color: var(--batlas-black);
    border-color: var(--batlas-white);
    border: 0.1em solid var(--batlas-white);
    border-radius: 0.6em;
    padding: 0.3em 1em;
    color: var(--batlas-white);
    font-family: var(--batlas-font);
    text-transform: uppercase;
    text-decoration: none;
    text-align: center;
    font-size: 1em;
  }

  .mapGenButton:hover {
    background-color: var(--batlas-white);
    color: var(--batlas-black);
  }

  .editingTitle {
    white-space: nowrap;
    width: 200px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }

  .tileNotesIndicator {
    min-width: 2em;
    min-height: 2em;
    padding: 0.2em;
    border: 0.2em solid var(--batlas-white);
    border-radius: 10em;
    aspect-ratio: 1/1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--batlas-black);
    top: 1em;
  }

  .icon {
        cursor: pointer;
        display: inline;
        width: 60%;        
        height: auto;
        fill: var(--batlas-white);
        position: relative;
        z-index: 100;
    }

    .interestPointContextMenu {
      display: none;
      position: absolute;
      top: 0em;
      left: 0em;
      width: 100%;
      height: 100%;
      background-color: var(--batlas-black);
      z-index: 999;
    }

    .interestPoint {
      width: 100%;
      padding: 0.4em 0em;;
      border-bottom: 0.1em solid var(--batlas-black);
      display: grid;
      position: relative;
      grid-template-columns: 4fr 1fr 1fr;
      grid-template-rows: auto;
      cursor: pointer;
    }



    .interestPointActive > .interestPointInfo {
      display: block;
    }

    .interestPoint>p {
      margin: 0px;
      padding: 0px;
      font-weight: 600;
    }

    .interestPoint .icon {
      width: 1.5em;
      height: 1.5em;
      fill: var(--batlas-white);
      background-color: var(--batlas-black);
    }

    .interestPointInfo {
      display: none;
      grid-column: 1/4;
      padding: 0.4em;
    }

    .interestPointPlay {
      grid-template-columns: 5fr 1fr;
    }

    .interestPointTitle {
      width: 100%;
      font-size: 0.8em;
      border: none;
      font-family: var(--batlas-font);
      font-weight: bold;
      padding: 0.4em;

    }

    .interestPointTitle::-webkit-scrollbar {
      display:none;
    }

    .centerAlignIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 0.4em;
    }

    .infoBox {
      background-color: var(--batlas-white);
      border: 0.25em solid var(--batlas-black);
      border-radius: 3em;
    }

    .roomOptionsToggle {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      background-color: var(--batlas-white);
      border: 0.25em solid var(--batlas-black);
      border-radius: 3em;
      text-align: center;
    }

    .roomOptionsToggle p {
      margin: 0px;
      padding: 0.25em;
      font-weight: 600;
      border-radius: 0.5em 0em 0em 0.5em;
    }

    .roomOptionsToggleActive {
      background-color: var(--batlas-black);
      color: var(--batlas-white);
    }

    .roomOptionsTitle {
      display: grid;
      grid-template-columns: 1fr 3fr;
      width: 100%;
      background-color: var(--batlas-white);
      border: 0.25em solid var(--batlas-black);
      border-radius: 3em;
      text-align: center;
    }

    .roomOptionsTitle p {
      background-color: var(--batlas-black);
      color: var(--batlas-white);
      margin: 0px;
      padding: 0.25em;
      font-weight: 600;
      border-radius: 0.5em 0em 0em 0.5em;
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
    .addButton {
      position: absolute;
      bottom: 0em;
      right: 0em;
      width: 4em;
      height: 4em;
      border-radius: 2em;
      background-color: var(--batlas-black);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 999;
    }

    :global(.notesIndicatorIndex) {
      color: var(--batlas-white);
    }

    :global(.masterFoggedTile img) {
      filter: brightness(0.5);
    }

  @media screen and (max-width: 1500px) {
    .mapSettings {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;
    }

    .tileOptions {
      height: 100%;
    }

    .tileOptionsBar {
      width: 100%;
      height: 100%;
      max-height: 25%;
    }

    .tileInfoBarActive {
      width: 100%;
      height: 100%;
      max-height: 75%;
    }

    .tileInfoBarActivePlay {
      max-height: 100%;
    }

    .disabledHoverSelector {
      pointer-events: none;
      display: none;
      visibility: hidden;
    }
  }

</style>

<svelte:window bind:innerWidth = {screenSize}/>

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
                        <div on:click={(e) => handleTileClick(e, cell, i, j)} class="tileSelector" class:disabledHoverSelector = {mapDisabled}></div>
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
      {#if $activeTile.rowIndex !== null}
        <ActiveTileOptionsWindows handleFogToggle={handleFogToggle} />
      {/if}
    </div>
</div>
<div class="tileFloat"><img></div>


