<script>
  import TileNotesIndicator from './TileNotesIndicator.svelte';
  import DemoUserControls from './DemoUserControls.svelte';
  import DemoTileOptions from './DemoTileOptions.svelte';
  import { page } from '$app/stores';
  import { activeTile, setActiveTile, currentAdventureChange, activeTileSidebar, adventureNotesDisplayed } from "$lib/dashboardState";
  import { currentAdventure } from "$lib/adventureData";
  import { onMount } from 'svelte';
  import { generateMap } from "$lib/mapGen";

  export let role;

  let mapDisabled = false;
  let guideText = "As you click around helpful text will appear here";

  $: $currentAdventure, changeAlert();

  onMount(() => {
    console.log("onMount");
    generateMap();
  });

  function changeAlert() {
    currentAdventureChange.set(true);
  }

  function updateGuideText(newText) {
    guideText = newText;
  }

  function handleTileClick(e, cell, i, j){
    updateGuideText("Click on the tile to change it, or add notes to it.");
    mapDisabled = true;

      setActiveTile(cell, i, j)
      activeTileSidebar.set(true);
      adventureNotesDisplayed.set(false);
      let floatingTiles = document.getElementsByClassName("tileFloat");
      for (let i = 0; i < floatingTiles.length; i++) {
        floatingTiles[i].classList.remove("tileFloat");
      }
  }
  
  async function handleFogToggle(e, newAdventure, cell, i, j) {
    newAdventure.map[i][j].fogOfWar = !newAdventure.map[i][j].fogOfWar;
    currentAdventure.set(newAdventure);

  }

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
      max-height: 100lvh;
      min-height: 100lvh;
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
    max-width: 20rem;
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
        max-width: none;
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
  }

</style>

<div class="mapContainer">

  <div class="dialogueContainer">
    <DemoUserControls guideText={guideText} updateGuideText={updateGuideText} {role}/>
    {#if $activeTile.rowIndex !== null}s
    <DemoTileOptions handleFogToggle={handleFogToggle} tileOptions={true} {role}/>
    {/if}
  </div>
  <div class="map" > 
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
</div>

