<script>
  import InterestPointList from './InterestPointList.svelte';

    import { page } from '$app/stores';
    import { map, generateMap } from "$lib/mapGen";
    import { activeTile, playMode, setActiveTile, activeTileSidebar } from "$lib/dashboardState";
    import { currentAdventure } from "$lib/adventureData";
    import { onMount } from 'svelte';
    import MapArray from './MapArray.svelte';
    import Icons from './Icons.svelte';
    import { tiles } from '$lib/tiles';
    import { fly } from 'svelte/transition';
  import Divider from '$lib/components/Divider.svelte';


    export let handleFogToggle;
    export let tileOptions;
    export let role;

    let screenSize = 0;
    let mapDisabled = false;

    let disabledMapGenButton = false;

    let tileMode = "rooms";
    let windowMode = "notes";


    let chosenTileOptions = {
      type: tileMode,
      connections: {
        NE: true,
        SE: true,
        NW: true,
        SW: true
      }
    }

    let controlTile = tiles.type.rooms[0];
    let controlTiles = tiles.type.rooms;


    function updateChosenTileOptionImage(chosenTileOptions){
      let newControlTiles = tiles.type[chosenTileOptions.type].filter(tile => tile.edges.NE.connection === chosenTileOptions.connections.NE && tile.edges.SE.connection === chosenTileOptions.connections.SE && tile.edges.NW.connection === chosenTileOptions.connections.NW && tile.edges.SW.connection === chosenTileOptions.connections.SW);
      controlTile = newControlTiles[0];
      controlTiles = newControlTiles;
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
        let floatingTiles = document.getElementsByClassName("tileFloat");
        for (let i = 0; i < floatingTiles.length; i++) {
          floatingTiles[i].classList.remove("tileFloat");
        }
    }

    function handleTileClick(cell, i, j){
      mapDisabled = true;
      setActiveTile(cell, i, j)
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
      e.target.closest('.tileOptionToggle').classList.toggle("interestPointActive");
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

    function changeWindowMode(newMode){
        windowMode = newMode;
    }
    
    function changeTileMode(newMode){
      tileMode = newMode;
      chosenTileOptions.type = tileMode;
      updateChosenTileOptionImage(chosenTileOptions);
    }

    function toggleActiveConnection(direction) {
      chosenTileOptions.connections[direction] = !chosenTileOptions.connections[direction];
      updateChosenTileOptionImage(chosenTileOptions);
    }

    function toggleInfoBarActive() {
      activeTileOptionsWindow = !activeTileOptionsWindow;
    }

    onMount(() => {
      if($playMode === true){
        windowMode = "notes";
      }
      else {
        windowMode = "notes";
      }
    });

    function toggleFogOfWar(e){
        $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar = !$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar;
        console.log("Fog toggle", $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar);
    }

    function clearTileInfo(e){
        console.log("Clearing tile info", "ActiveTile:", $activeTile, "Current Adventure:", $currentAdventure, tiles);
        let newMap = deepCloneArray($currentAdventure.map);
        newMap[$activeTile.rowIndex][$activeTile.columnIndex].tileTitle = "";
        newMap[$activeTile.rowIndex][$activeTile.columnIndex].tileNotes = "";
        newMap[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints = [];
        newMap[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar = false;
        newMap[$activeTile.rowIndex][$activeTile.columnIndex].chosenTile = tiles.type.blank[0];
        currentAdventure.set({ ...$currentAdventure, map: newMap});
        clearActiveTile();
    }

    function handleClose() {
      activeTileSidebar.set(false);
        setTimeout(() => {
          clearActiveTile();
        }, 500);
    }

</script>

<style>


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



   

  .tileOptionsColumn {
    display: flex;
    height: auto;
    max-height: 100%;
    width: 50%;
    overflow-y: scroll;
    border-radius: 0.25rem;
    border: 0.1rem solid var(--batlas-white)
  }

  .tileOptionsColumn::-webkit-scrollbar {
    display: none;
  }

  .tileInfoBar {
    overflow-y: hidden;
    z-index: 100;
    transform: translateX(130%);
    transition: transform 0.5s ease-in-out, max-width 0.3s ease-in-out 0.3s;
    will-change: transform, max-width;
    position: fixed;
    right: 0.5rem;
    top: 1rem;
    left: auto;
    bottom: auto;
    display: block;
    width: 18rem;
    max-width: 0rem;
    height: calc(100% - 3rem);
    max-height: 100lvh;
    border-radius: 0.25rem;
    border: 0.1rem solid var(--batlas-white);
  }

  .tileInfoBar.active {
    transform: translateX(0%);
    max-width: 24rem;
    transition: transform 0.3s ease-in-out 0.3s, max-width 0.3s ease-in-out;
  }

  .tileInfoBar::-webkit-scrollbar {
    display:none;
  }

  .tileInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1.5em;
    height: 100%;
    margin-top: 1rem;
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
    min-height: 20rem;
    height: 100%;
    padding: 1rem;
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    border: 0.1rem solid var(--batlas-white);
    border-radius: 0.25em;
    font-size: 1rem;
    font-family: var(--batlas-font);
  }

  .tileInfoText::-webkit-scrollbar {
    display: none;
  }

  p.roomDescription {
    margin-bottom: 2em;
  }


  .tileOptions {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: scroll;
    background-color: var(--batlas-black);
    gap: 0.5rem;
    width: 100%;
  }

  .tileOption {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    aspect-ratio: 3/2;
    transition: all 0.1s ease-in-out;
    border: 0.1rem solid var(--batlas-white);
    border-radius: 0.25rem;
    background-color: var(--batlas-black);
    width: 100%; 
  }

  .tileOption:hover {
    cursor: pointer;
  }

  .hideScrollbar::-webkit-scrollbar {
    display: none;
  }

  .hideScrollbar {
    padding: 0em;
  }


  .tileOption img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
  }

  .tileOption img:hover {
    transform: scale(1.1);
  }


    .roomOptionsToggle {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      width: 100%;
      background-color: var(--batlas-white);
      text-align: center;
      font-size: 0.8em;
    }

    .roomOptionsToggle a {
      width: 35%;
      margin: 0px;
      padding: 0.5em 2em;
      font-weight: 600;
      line-height: 1;
      border: 0.25em solid var(--batlas-black);
      border-radius: 2em;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }

    .tileOptionsToggle {
      width: 100%;
    }


    .tileOptionsToggleContainer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      gap: 0.5rem;
      background-color: var(--batlas-black);
      text-align: center;
    }

    .tileOptionsToggleContainer .active {
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.8em;
        line-height: 100%;
        height: 100%;
    }

    .roomTitle {
      background: transparent;
      outline: none;
      border: none;
      color: var(--batlas-black);
      margin: 0px;
      padding: 0.25em 0.5em;
      font-weight: 600;
      font-size: 1em;
      border-radius: 0.5em 0em 0em 0.5em;
      font-family: var(--batlas-font);
    }

    .roomOptionsTitle p {
      background-color: var(--batlas-black);
      color: var(--batlas-white);
      margin: 0px;
      padding: 0.25em;
      font-weight: 600;
      border-radius: 0.5em 0em 0em 0.5em;
    }

    .connectionsControls {
      display: flex;
      gap: 2em;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      text-align: center;
      color: var(--batlas-white);
    }

    .connectionsController {
      position: relative;
      display: block;
      width: 100%;
      height: auto;
    }

    p.control {
      width: 2rem;
      height: 2rem;
      position: absolute;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .NEControl {
      top: 0;
      right: 0;
    }
    .SEControl {
      bottom: 0;
      right: 0;
    }
    .NWControl {
      top: 0;
      left: 0;
    }
    .SWControl {
      bottom: 0;
      left: 0;
    }


    .centralControl {
      width: 100%;
      height: auto;
      object-fit: contain;
    }

    .roomTitlePlay {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        font-size: 1.8em;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--batlas-white);
        text-align: left;
    }

    .roomTitlePlay p:hover {
        cursor: default;
    }

    p.roomDescription {
        width: 100%;
        font-size: 1em;
        color: var(--batlas-white);
        text-align: left;
    }

    .closeButton {
        width: auto;
        height: 100%;
        display: flex;
        padding: 0.5rem;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        align-self: center;
        justify-self: center;
        border: none;
    }

    .closeButton:hover {
        transform: translateY(-0.05em);
    }

    .fogOfWar {
        opacity: 0.5;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    .clearTileInfo {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    .activeConnection {
      opacity: 1;
    }

    .tileInfoTopbar {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        background-color: var(--batlas-black);
        color: var(--batlas-white);
        text-align: center;
    }

    .roomOptionsToggles {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        text-align: center;
        gap: 0.5rem;
    }

    .titleBar {
    width: 100%;
      background: transparent;
      outline: none;
      border: none;
      text-align: left;
      color: var(--batlas-white);
      padding: 1rem;
      font-family: var(--batlas-font);
      font-size: 1rem;
      cursor: text;
  }

  .tileWindowContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;
    height: calc(100% - 6rem);
    overflow-y: hidden;
  }

  .leftColumn {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    width: 50%;
  }

  .tileInfoNotes {
    overflow-y: scroll;
  }

  .tileInfoNotes .tileInfo {
    height: auto;
  }

  .tileInfoNotes .tileInfoText {
    height: auto;
    max-height: 20rem;
    overflow-y: scroll;
  }

  @media screen and (max-width: 735px) {
    .tileInfoBar {
      max-width: 0rem;
      width: 100%;
      height: auto;
      top: 20lvh;
      bottom: auto;
      right: 1rem;
      left: auto;
      padding: 1rem;
      transform: translateX(150%);
    }

    .tileInfoBar.active {
      transform: translateX(0%);
      max-width: calc(100% - 2rem);
      transition: transform 0.3s ease-in-out 0.3s, max-width 0.3s ease-in-out;
      overflow-y: scroll;
      height: 100%;
      max-height: calc(80lvh - 1rem);
    }

    .tileOptions {
      max-height: 30rem;
    }

    .tileWindowContainer {
      height: auto;
    }
  }

</style>
<div class="tileInfoBar blackBox" class:tileInfoNotes="{windowMode==="notes"}" class:active="{$activeTileSidebar}">
  {#if $activeTile.rowIndex !== null && $activeTileSidebar}
  <div class="tileInfoTopbar">
      {#if tileOptions}
      <div class="roomOptionsToggles">
        {#if $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar}
        <div class="fogOfWar" on:click={(e) => handleFogToggle(e, $currentAdventure, $activeTile, $activeTile.rowIndex, $activeTile.columnIndex)} class:activeConnection="{$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar}">
              <p class="button whiteButton">Unfog</p>
          </div>
              {:else}
              <div class="fogOfWar" on:click={(e) => handleFogToggle(e, $currentAdventure, $activeTile, $activeTile.rowIndex, $activeTile.columnIndex)} class:activeConnection="{$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar}">
              <p class="button blackButton">Fog</p>
            </div>
              {/if}
          {#if role === "editor"}
          <div class="clearTileInfo" on:click={(e) => clearTileInfo(e, $currentAdventure, $activeTile, $activeTile.rowIndex, $activeTile.columnIndex)} class:activeConnection="{$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar}">
              <p class="button blackButton">Clear</p>
          </div>
          {/if}
      </div>
      {/if}
      <div class="closeButton button blackButton" on:click={handleClose}>
        <Icons icon={"remove"} size={"small"} color={"white"}/>
    </div>
  </div>
  <Divider color={"white"}/>
  <div class="tileInfo" class:hideScrollbar="{!$activeTile.tileOptions}">
    {#if role === "editor"}
        <div class="">
            <a class="button blackButton" class:whiteButton="{windowMode === "notes"}" on:click={() => changeWindowMode('notes')} >Notes</a>
            <a class="button blackButton" class:whiteButton="{windowMode === "tile"}"  on:click={() => changeWindowMode('tile')} >Tile</a>
        </div>
    {/if}
        {#if windowMode === "notes"}
            {#if role==="gameMaster" || role==="player"}
                {#if $activeTile.tileTitle !== ""}
                  <div class="roomTitlePlay">
                      <p>{$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileTitle}</p>
                  </div>
                {/if}
            {:else if role === "editor"}
                    <input type="text" class="titleBar" placeholder="Room title" bind:value={$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileTitle}>
            {/if}
            {#if role==="editor"}
              <textarea class="tileInfoText" class:hideScrollbar="{!$activeTile.tileOptions}" placeholder="Room notes" rows="40" bind:value={$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileNotes}></textarea>
            {:else if $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileNotes != ""}
              <p class="roomDescription">{$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileNotes}</p>
            {/if}
            <InterestPointList {role}/>
        {:else if windowMode === "tile"}
        <div class="tileWindowContainer">
          <div class="leftColumn">
        <div class="connectionsControls">
          <div class="connectionsController">
            <p class="NWControl control button blackButton" on:click={() => toggleActiveConnection("NW")} class:whiteButton={chosenTileOptions.connections.NW}>NW</p>
            <p class="NEControl control button blackButton" on:click={() => toggleActiveConnection("NE")} class:whiteButton={chosenTileOptions.connections.NE}>NE</p>
            <p class="SWControl control button blackButton" on:click={() => toggleActiveConnection("SW")} class:whiteButton={chosenTileOptions.connections.SW}>SW</p>
            <p class="SEControl control button blackButton" on:click={() => toggleActiveConnection("SE")} class:whiteButton={chosenTileOptions.connections.SE}>SE</p>
            <img class="centralControl activeConnection" src="/img/{controlTile.img}" alt="Empty Square"/>
          </div>
          <div class="tileOptionsToggleContainer">
            <p class="tileOptionsToggle button blackButton" class:whiteButton="{tileMode === 'rooms'}" on:click={() => changeTileMode('rooms')}>Room</p>
            <p class="tileOptionsToggle button blackButton" class:whiteButton="{tileMode === 'connectors'}" on:click={() => changeTileMode('connectors')}>Hall</p>
            <p class="tileOptionsToggle button blackButton" class:whiteButton="{tileMode === 'descenders'}" on:click={() => changeTileMode('descenders')}>Descent</p>
          </div>
        </div>
      </div>
        <div class="tileOptionsColumn">
          <div class="tileOptions hideScrollbar">
              {#if $activeTile.rowIndex != null}
                  {#each controlTiles as tile}
                      <div on:click={() => setChosenTile(tile, $activeTile.rowIndex, $activeTile.columnIndex)} class="tileOption">
                          <img src="/img/{tile.img}" alt="{tile.img}" />
                      </div>
                  {/each}
              {/if}
          </div>
        </div>
      </div>
        {/if}
          </div>
  {/if}
</div>
