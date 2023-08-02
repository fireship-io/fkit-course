<script>
    import { map, generateMap } from "$lib/mapGen";
    import { activeTileOptions, setActiveTileOptions } from "$lib/dashboardState";

    function deepCloneArray(arr) {
        return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
    }

    function setChosenTile(tile, rowIndex, columnIndex) {
        console.log(tile, rowIndex, columnIndex);
        let newMap = deepCloneArray($map);
        newMap[rowIndex][columnIndex].chosenTile = tile;
        console.log(newMap[rowIndex][columnIndex])
        map.set(newMap);
        activeTileOptions.set({tileOptions: null, rowIndex: null, columnIndex: null});
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
    justify-content: space-between;
    padding: 1em;
  }

  .mapGenButton {
    cursor: pointer;
    background-color: var(--batlas-black);
    border-color: var(--batlas-white);
    padding: 0.5em;
    color: var(--batlas-white);
    font-family: var(--batlas-font);
    text-transform: uppercase;
    font-size: 1em;
  }

  .mapGenButton:hover {
    background-color: var(--batlas-white);
    color: var(--batlas-black);
  }

</style>

<div class="mapContainer dungeonBorder">
    <div class="mapSettings">
        <div>
            <h4 style="display:inline; padding-right: 0.5em;">Settings:</h4>
            <select>
                <option value="dungeon">Dungeon</option>
                <option value="forest">Forest</option>
                <option value="cave">Cave</option>
            </select>
            <select>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
        </div>
        <button on:click={generateMap} class="brutalismBorderWhite mapGenButton">Generate Map</button>
    </div>
    <div class="map">
        
        {#if $map}
            {#each $map as row, i}
                <div class="gridRow">
                    {#each row as cell, j}
                    <div class="gridTile" style="background-image: {cell.chosenTile?.img}; position: relative; bottom: 0em;">
                        {#if cell.tileOptions != null}
                            <div class="tileSelectorHoverDetector">
                                <div on:click={() => setActiveTileOptions(cell, i, j)} class="tileSelector"></div>
                            </div>
                        {/if}
                        <img src="/img/{cell.chosenTile?.img}" alt="{cell.chosenTile?.img}">
                    </div>
                    {/each}
                </div>
            {/each}
        {/if}
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


