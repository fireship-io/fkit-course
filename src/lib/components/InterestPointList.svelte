<script>
    import { page } from '$app/stores';
    import { map, generateMap } from "$lib/mapGen";
    import { activeTile, setActiveTile } from "$lib/dashboardState";
    import { currentAdventure } from "$lib/adventureData";
    import { onMount } from 'svelte';
    import MapArray from './MapArray.svelte';
    import Icons from './Icons.svelte';

    export let role;

    let screenSize = 0;
    let mapDisabled = false;

    let disabledMapGenButton = false;



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


</script>

<style>


  .interestPointsList {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.4em;
    height: 100%;
    width: 100%;
  }

  .interestPointsList::-webkit-scrollbar {
    display:none;
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
      border: 0.1em solid var(--batlas-white);
      border-radius: 0.25em;
      display: flex;
      flex-direction: column;
      position: relative;
      cursor: pointer;
      padding: 0.5rem ;
    }

    .interestPointTopBar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: nowrap;
      gap: 0.5rem
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
      padding-top: 0.5rem;
      margin-top: 0.5rem;
      display: none;
      border:none;
      border-top: 0.1rem dashed var(--batlas-white);
      background-color: transparent;
      outline: none;
      color: var(--batlas-white);
      font-family: var(--batlas-font);
    }

  

    .interestPointPlay {
      grid-template-columns: 1fr 5fr;
      font-size: 1.2em;
      line-height: 0em;
    }

    .interestPointPlay .interestPointInfo p {
      margin: 0em;
      font-size: 0.8em;
      line-height: 1.2rem;
    }

    .interestPointTitle p{
      margin: 0px;
      padding: 0px;
      color: var(--batlas-white);
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


    .interestPointActive .chevronRotate {
      transform: rotate(180deg);
    }

    .titleBar {
    width: 100%;
      background: transparent;
      outline: none;
      border: none;
      text-align: left;
      color: var(--batlas-white);
      padding: 0rem;
      font-family: var(--batlas-font);
      font-size: 1rem;
      cursor: text;
  }


</style>

         <div class="interestPointsList hideScrollbar">
            {#if $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints.length > 0}
              {#each $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints as interestPoint, i}
                <div  class="interestPoint" class:interestPointActive={false} class:interestPointPlay={$page.route.id.includes("play")}>
                  <div class="interestPointTopBar">
                    {#if role === "editor"}
                      <input type="text" class="titleBar" class:hideScrollbar="{!$activeTile.tileOptions}" placeholder="Interesting thing" maxlength="22" bind:value={$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints[i].title}>
                    {:else}
                    <div class="interestPointTitle">
                      <p>{interestPoint.title}</p>
                    </div>
                    {/if}
                      <div on:click={(e) => toggleActive(e)} class="iconContainer">
                        <div class="chevronRotate">
                          <Icons icon={"add"} size={"medium"} color={"white"} />
                        </div>
                      </div>
                      {#if role==="editor"}
                        <div on:click={() => handlePointOfInterestDelete(interestPoint)} class="iconContainer">
                          <Icons icon={"remove"} size={"small"} color={"white"} />
                        </div>
                    {/if}
                  </div>
                  {#if role==="editor"}
                    <textarea class="interestPointInfo" class:hideScrollbar="{!$activeTile.tileOptions}" placeholder="Info about the thing" rows="5" bind:value={$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints[i].info}></textarea>
                  {:else}
                  <div class="interestPointInfo">
                    <p>{interestPoint.info}</p>
                  </div>
                  {/if}
                </div>
              {/each}
            {/if}
            {#if role === "editor"}
              <div on:click={() => handlePointOfInterestCreation()} class="iconContainer centerAlignIcon pointOfInterestAddIcon button blackButton">
                <Icons icon={"add"} size={"medium"} color={"white"} />
              </div>
            {/if}
          </div>

