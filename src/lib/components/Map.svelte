<script>
    import { page } from '$app/stores';
    import { map, generateMap } from "$lib/mapGen";
    import { activeTileOptions, setActiveTileOptions } from "$lib/dashboardState";
    import { currentAdventure } from "$lib/adventureData";
    import { onMount } from 'svelte';
    import MapArray from './MapArray.svelte';

    let screenSize = 0;


    function deepCloneArray(arr) {
        return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
    }

    function setChosenTile(tile, rowIndex, columnIndex) {
        console.log(tile, rowIndex, columnIndex);
        let newMap = deepCloneArray($currentAdventure.map);
        newMap[rowIndex][columnIndex].chosenTile = tile;
        console.log(newMap[rowIndex][columnIndex])
        currentAdventure.set({ ...$currentAdventure, map: newMap});
        activeTileOptions.set({tileOptions: null, rowIndex: null, columnIndex: null});
    }

    // map.subscribe(value => {
    //     currentAdventure.update(adventure => {
    //         adventure.map = JSON.stringify(value);
    //         return adventure;
    //     })
    //     console.log('Map updated', value);
    //     console.log($currentAdventure);
    // })


    function handleMapGenerate() {
      generateMap();
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

  .mapToolbar {
        display: none;
        background-color: var(--batlas-white);
        display: flex;
        flex-direction: column;
    }

    .mapToolbarActive{
        display: block;
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
    bottom: calc(50% - 1.5em);
    left: calc(50% - 1.5em);
    height: 3em;
    width: 3em;
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
  }

  .mapSettings p {
    margin: 0px;
    padding: 0px;
  }

  .mapGenButton {
    height: 100%;
    cursor: pointer;
    background-color: var(--batlas-black);
    border-color: var(--batlas-white);
    border: 0.1em solid var(--batlas-white);
    border-radius: 0.6em;
    padding: 0.3em 0.6em;
    color: var(--batlas-white);
    font-family: var(--batlas-font);
    text-transform: uppercase;
    text-decoration: none;
    font-size: 1em;
    line-height: 1em;
  }

  .mapGenButton:hover {
    background-color: var(--batlas-white);
    color: var(--batlas-black);
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
      {#if $currentAdventure.title !== ""}
        <p style="color: var(--batlas-white); text-align: center;">You're editing: {$currentAdventure.title}</p>
      {/if} 
        <a on:click={handleMapGenerate} class="brutalismBorderWhite mapGenButton">Generate New Map</a>
        {#if $currentAdventure.map.length > 0 && !$page.route.id.includes("map-maker") && screenSize > 1500}
            <a href="map-maker" class="brutalismBorderWhite mapGenButton">Edit fullscreen</a>
        {:else if screenSize > 1500}
            <a href="create" class="brutalismBorderWhite mapGenButton">Edit in Adventure Planner</a>
        {/if}
    </div>
  {/if}
    <div class="map">
            {#each $currentAdventure.map as row, i}
                <div class="gridRow">
                    {#each row as cell, j}
                    <div class="gridTile" style="background-image: {cell.chosenTile?.img}; position: relative; bottom: 0em;">
                        {#if cell.tileOptions != null &&   !$page.route.id.includes("play")}
                            <div class="tileSelectorHoverDetector">
                                <div on:click={() => setActiveTileOptions(cell, i, j)} class="tileSelector"></div>
                            </div>
                        {/if}
                        <img src="/img/{cell.chosenTile?.img}" alt="{cell.chosenTile?.img}">
                    </div>
                    {/each}
                </div>
            {/each}
    </div>
    <div class="mapToolbar dungeonBorder" class:mapToolbarActive="{$activeTileOptions.tileOptions}" class:dungeonBorder="{$activeTileOptions.tileOptions}">
        <div class="tileOptions" class:hideScrollbar="{!$activeTileOptions.tileOptions}">
            {#if $activeTileOptions.tileOptions}
                {#each $activeTileOptions.tileOptions as tile}
                    <div on:click={() => setChosenTile(tile, $activeTileOptions.rowIndex, $activeTileOptions.columnIndex)} class="tileOption">
                        <img src="/img/{tile.img}" alt="{tile.img}" />
                    </div>
                {/each}
            {/if}
            </div>
        </div>
    </div>


