<script>
    import { page } from '$app/stores';
    import { map, generateMap } from "$lib/mapGen";
    import { activeTile, setActiveTile } from "$lib/dashboardState";
    import { currentAdventure } from "$lib/adventureData";
    import { onMount } from 'svelte';
    import MapArray from './MapArray.svelte';

    let screenSize = 0;

    let disabledMapButton = false;


    function deepCloneArray(arr) {
        return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
    }

    function setChosenTile(tile, rowIndex, columnIndex) {
        console.log(tile, rowIndex, columnIndex);
        let newMap = deepCloneArray($currentAdventure.map);
        newMap[rowIndex][columnIndex].chosenTile = tile;
        console.log(newMap[rowIndex][columnIndex])
        currentAdventure.set({ ...$currentAdventure, map: newMap});
        activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null});
    }

    function handleTileClick(cell, i, j){
      setActiveTile(cell, i, j)
      console.log("cell", cell, i, j);
    }




    function handleMapGenerate() {
      disabledMapButton = true;
      activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null, tileNotes: ""});
      generateMap();
      setTimeout(() => {
        disabledMapButton = false
      }, 1000);
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
        grid-template-rows: auto;
        height: 100%;
        max-height: calc(100lvh - 4em);
        width: 100%;
        overflow-y: hidden;
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
    display: none;
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
        width: 16em;;
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
  }

  .tileSelectorHoverDetector:hover .tileSelector {
    visibility: visible;
  }

  .tileSelector {
    visibility: hidden;
    position: absolute;
    bottom: calc(50% - 2.5em);
    left: calc(50% - 2.5em);
    height: 5em;
    width: 5em;
    border: 0.2em solid var(--batlas-white);
    background: rgba(0, 0, 0, 0.4);
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
    }

  @media screen and (max-width: 1500px) {
    .mapSettings {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;
    }
  }

</style>

<svelte:window bind:innerWidth = {screenSize}/>

<div class="mapContainer dungeonBorder">
  {#if !$page.route.id.includes("play")}
    <div class="mapSettings">
        <a on:click={handleMapGenerate} class="brutalismBorderWhite mapGenButton" class:disabledButton = "{disabledMapButton}">New Map</a>
        <a on:click={() => console.log($currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileNotes)} class="brutalismBorderWhite mapGenButton" class:disabledButton = "{disabledMapButton}">Log Map</a>
    </div>
  {/if}
    <div class="map">
            {#each $currentAdventure.map as row, i}
                <div class="gridRow">
                    {#each row as cell, j}
                    <div class="gridTile" style="background-image: {cell.chosenTile?.img}; position: relative; bottom: 0em;">
                      {#if cell.tileNotes != "Default Notes"}
                      <div class="tileNotesIndicator">
                        <svg class="icon" viewBox="0 0 188 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M187.625,9.381l0,240.732c0,5.178 -4.203,9.381 -9.381,9.381l-168.863,0c-5.177,0 -9.381,-4.203 -9.381,-9.381l-0,-240.732c-0,-5.177 4.204,-9.381 9.381,-9.381l168.863,-0c5.178,-0 9.381,4.204 9.381,9.381Zm-19.759,126.492c0,-0.396 -0.321,-0.717 -0.718,-0.717l-146.671,-0c-0.396,-0 -0.718,0.321 -0.718,0.717l0,12.92c0,0.397 0.322,0.718 0.718,0.718l146.671,0c0.397,0 0.718,-0.321 0.718,-0.718l0,-12.92Zm-42.77,81.078c0,-0.396 -0.321,-0.718 -0.718,-0.718l-103.901,-0c-0.396,-0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.717 0.718,0.717l103.901,0c0.397,0 0.718,-0.321 0.718,-0.717l0,-12.92Zm42.77,-108.103c0,-0.397 -0.321,-0.718 -0.718,-0.718l-146.671,-0c-0.396,-0 -0.718,0.321 -0.718,0.718l0,12.92c0,0.396 0.322,0.717 0.718,0.717l146.671,0c0.397,0 0.718,-0.321 0.718,-0.717l0,-12.92Zm0,54.051c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,0c-0.396,0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Zm0,-135.358c0,-0.926 -0.752,-1.678 -1.678,-1.678l-144.75,-0c-0.927,-0 -1.679,0.752 -1.679,1.678l0,30.214c0,0.927 0.752,1.679 1.679,1.679l144.75,-0c0.926,-0 1.678,-0.752 1.678,-1.679l0,-30.214Zm0,54.281c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,-0c-0.396,-0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Zm0,108.103c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,0c-0.396,0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Z"/></svg>
                      </div>
                      {/if}
                        {#if cell.tileOptions != null &&   !$page.route.id.includes("play")}
                            <div class="tileSelectorHoverDetector">
                                <div on:click={() => handleTileClick(cell, i, j)} class="tileSelector"></div>
                            </div>
                        {/if}
                        <img src="/img/{cell.chosenTile?.img}" alt="{cell.chosenTile?.img}">
                    </div>
                    {/each}
                </div>
            {/each}
    </div>
    {#if $activeTile.rowIndex !== null}
    <div class="tileInfoBar dungeonBorder" class:tileInfoBarActive="{$activeTile.tileOptions}" class:dungeonBorder="{$activeTile.tileOptions}">
      <div class="tileInfo" class:hideScrollbar="{!$activeTile.tileOptions}">
          <textarea class="tileInfoText" class:hideScrollbar="{!$activeTile.tileOptions}" placeholder="Room notes" bind:value={$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileNotes}></textarea>
      </div>
    </div>
    {/if}
    <div class="tileOptionsBar dungeonBorder" class:tileOptionsBar="{$activeTile.tileOptions}" class:dungeonBorder="{$activeTile.tileOptions}">
        <div class="tileOptions" class:hideScrollbar="{!$activeTile.tileOptions}">
            {#if $activeTile.tileOptions}
                {#each $activeTile.tileOptions as tile}
                    <div on:click={() => setChosenTile(tile, $activeTile.rowIndex, $activeTile.columnIndex)} class="tileOption">
                        <img src="/img/{tile.img}" alt="{tile.img}" />
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>


