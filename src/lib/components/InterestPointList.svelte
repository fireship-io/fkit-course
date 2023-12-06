<script>
    import { page } from '$app/stores';
    import { map, generateMap } from "$lib/mapGen";
    import { activeTile, setActiveTile } from "$lib/dashboardState";
    import { currentAdventure } from "$lib/adventureData";
    import { onMount } from 'svelte';
    import MapArray from './MapArray.svelte';
    import Icons from './Icons.svelte';

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
    overflow-y: scroll;
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
      border: 0.25em solid var(--batlas-black);
      border-radius: 2em;
      display: grid;
      position: relative;
      grid-template-columns: 1fr 4fr 1fr;
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
      padding: 1em;
      border:none;
      background-color: transparent;
      outline: none;
      font-family: var(--batlas-font);
    }

    .interestPointInfo:focus {
      display: block;
      grid-column: 1/4;
      padding: 1em;
      border:none;
      background-color: transparent;
      outline: none;
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


    .interestPointActive .chevronRotate {
      transform: rotate(180deg);
    }


</style>

         <div class="interestPointsList hideScrollbar">
            {#if !$page.route.id.includes("play") || $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints.length > 0}
              {#each $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints as interestPoint, i}
                <div  class="interestPoint" class:interestPointActive={false} class:interestPointPlay={$page.route.id.includes("play")}>
                  <div on:click={(e) => toggleActive(e)} class="iconContainer">
                    <div class="chevronRotate">
                      <Icons icon={"downChevron"} size={"medium"} color={"black"} />
                    </div>
                  </div>
                  {#if !$page.route.id.includes("play")}
                    <textarea class="interestPointTitle" class:hideScrollbar="{!$activeTile.tileOptions}" placeholder="Interesting thing" rows="1" maxlength="22" bind:value={$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints[i].title}></textarea>
                  {:else}
                  <div class="interestPointTitle">
                    <p>{interestPoint.title}</p>
                  </div>
                  {/if}
                  {#if !$page.route.id.includes("play")}
                    <div on:click={() => handlePointOfInterestDelete(interestPoint)} class="iconContainer">
                      <Icons icon={"remove"} size={"medium"} color={"black"} />
                    </div>
                  {/if}
                  {#if !$page.route.id.includes("play")}
                    <textarea class="interestPointInfo" class:hideScrollbar="{!$activeTile.tileOptions}" placeholder="Info about the thing" rows="5" bind:value={$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints[i].info}></textarea>
                  {:else}
                  <div class="interestPointInfo">
                    <p>{interestPoint.info}</p>
                  </div>
                  {/if}
                </div>
              {/each}
            {/if}
            {#if !$page.route.id.includes("play")}
              <div on:click={() => handlePointOfInterestCreation()} class="iconContainer centerAlignIcon pointOfInterestAddIcon">
                <Icons icon={"add"} size={"large"} color={"black"} />
              </div>
            {/if}
          </div>

