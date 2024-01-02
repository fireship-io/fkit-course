<script>
  import ActiveTileOptionsWindows from './ActiveTileOptionsWindows.svelte';

    import { page } from '$app/stores';
    import { map, generateMap } from "$lib/mapGen";
    import { activeTile, playMode, setActiveTile } from "$lib/dashboardState";
    import { currentAdventure } from "$lib/adventureData";
    import { onMount } from 'svelte';
    import MapArray from './MapArray.svelte';
    import Icons from './Icons.svelte';
    import { tiles } from '$lib/tiles';
    import { db, userData, user } from "$lib/firebase";
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

    let screenSize = 0;
    let mapDisabled = false;

    let disabledMapGenButton = false;

    
    let disabledSave = false;

    let blankTile = {
      tileOptions: null,
      rowIndex: null,
      columnIndex: null,
      tileNotes: "",
      tileTitle: "",
    };



    function deepCloneArray(arr) {
        return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
    }


    function handleMapGenerate(currentAdventure, user) {
      disabledMapGenButton = true;
      activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null, tileNotes: "", tileTitle: ""});
      generateMap();
      currentAdventure.adventureId = "";
      currentAdventure.title = "";
      currentAdventure.userId = user.uid;
      setTimeout(() => {
        disabledMapGenButton = false
      }, 500);
    }

    async function saveAdventureToFirebase(currentAdventure) {
    console.log("saveAdventureToFirebase fired", currentAdventure);

    disabledSave = true;

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
          disabledSave = false;
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
          disabledSave = false;
        }, 3000); 
    }
    
    if ($page.url.pathname !== `/dashboard/create/${currentAdventure.adventureId}`) {
      window.location.href === `/dashboard/create/${currentAdventure.adventureId}`;
    }
  }

  function enterPlayMode(currentAdventure) {
    playMode.set(true);
    window.location.href = `/dashboard/player/${$user.uid}/${currentAdventure.adventureId}`;
  }

    function addBottomRow() {
      let mapColumns = $currentAdventure.map[0].length;
      let newRow = [];
      let newRowIndex = $currentAdventure.map.length + 1;
      for (let i = 0; i < mapColumns; i++) {
        newRow.push({
          id: uuidv4(),
          zIndex: newRowIndex,
          chosenTile: tiles.type.blank[0],
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        }
        );
      }
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.push(newRow);
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function removeBottomRow() {
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.pop();
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function addTopRow() {
      let mapColumns = $currentAdventure.map[0].length;
      let newRow = [];
      let newRowIndex = $currentAdventure.map.length + 1;
      for (let i = 0; i < mapColumns; i++) {
        newRow.push({
          id: uuidv4(),
          zIndex: newRowIndex,
          chosenTile: tiles.type.blank[0],
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        }
        );
      }
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.unshift(newRow);
      newMap.unshift(newRow);
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function removeTopRow() {
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.shift();
      newMap.shift();
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function addColumnRight() {
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.push({
          id: uuidv4(),
          zIndex: 0,
          chosenTile: tiles.type.blank[0],
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        });
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function removeColumnRight() {
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.pop();
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function addColumnLeft() {
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.unshift({
          id: uuidv4(),
          zIndex: 0,
          chosenTile: tiles.type.blank[0],
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        });
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function removeColumnLeft() {
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.shift();
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function togglePlayMode() {
      if ($playMode === false) {
        playMode.set(true);
        activeTile.set(blankTile);
        let floatingTiles = document.getElementsByClassName("tileFloat");
        for (let i = 0; i < floatingTiles.length; i++) {
          floatingTiles[i].classList.remove("tileFloat");
        }
      } else {
        playMode.set(false);
      }
    }

    function togglePublic() {
      currentAdventure.set({ ...$currentAdventure, public: !$currentAdventure.public});
    }

</script>

<style>
  .userControlContainer, .mapControlsContainer {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: auto;
    min-width: 20em;
    height: auto;
    gap: 1em;
    padding: 1em;
    background-color: var(--batlas-white);
    border-radius: 2em;
    border: 0.25em solid var(--batlas-black);
  }

  .mapControlsContainer {
    min-width: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .userControl, .userControlNoHover {
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3em;
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    border-radius: 3em;
    cursor: pointer;
  }

  .userControlNoHover {
    cursor: default;
    background-color: var(--batlas-white);
    border: 0.25em solid var(--batlas-black);
  }

  .userControl:hover {
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    border-color: var(--batlas-white);
  }

  .titleBar {
    width: 100%;
    background-color: transparent;
    color: var(--batlas-black);
    cursor: pointer;
    border: none;
    outline: none;
    text-align: left;
    padding: 0.5em;
    font-size: 1em;
    font-family: var(--batlas-font);
  }

  .controlLabel {
    width: 33%;
    height: 100%;
    display: flex;
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    justify-content: center;
    align-items: center;
    font-family: var(--batlas-font);
    border-radius: 2em 0 0 2em;
    transform: translateX(-2px);
    padding: 0.5em;
  }

  .mapControls {
    width: 100%;
    height: 3em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;
    padding-right: 1em;
  }

  .mapControlLabel {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    justify-content: flex-start;
    align-items: center;
    font-family: var(--batlas-font);
    border-radius: 2em 0 0 2em;
    transform: translateX(-2px);
    padding: 0.5em;
    padding-left: 1em;
  }

  .iconContainer {
    cursor: pointer;
    display: flex;
    gap: 1em;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .controlRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    width: 100%;
  }

  .halfWidth {
    width: 50%;
  }

  :global(.iconContainer) {
    pointer-events: all;
  }

  .publicToggle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    width: 100%;
    height: 3em;
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    border-radius: 3em;
    cursor: pointer;
    opacity: 0.5;
  }

  .activeConnection {
    opacity: 1;
  }

</style>
{#if !$page.route.id.includes("/player/")}
<div class="mapControlsContainer">
  <div class="userControlNoHover labelledControl mapControls">
    <div class="mapControlLabel">
      <p>Bottom</p>
    </div>
    <div class="iconContainer" on:click={addBottomRow}>
      <Icons icon={"add"} size={"medium"} color={"black"}/>
    </div>
    <div class="iconContainer" on:click={removeBottomRow}>
      <Icons icon={"downChevron"} size={"medium"} color={"black"} />
    </div>
  </div>
  <div class="userControlNoHover labelledControl mapControls">
    <div class="mapControlLabel">
      <p>Top</p>
    </div>
    <div class="iconContainer" on:click={addTopRow}>
      <Icons icon={"add"} size={"medium"} color={"black"} />
    </div>
    <div class="iconContainer" on:click={removeTopRow}>
      <Icons icon={"downChevron"} size={"medium"} color={"black"} />
    </div>
  </div>
  <div class="userControlNoHover labelledControl mapControls">
    <div class="mapControlLabel">
      <p>Left</p>
    </div>
    <div class="iconContainer" on:click={addColumnLeft}>
      <Icons icon={"add"} size={"medium"} color={"black"} />
    </div>
    <div class="iconContainer" on:click={removeColumnLeft}>
      <Icons icon={"downChevron"} size={"medium"} color={"black"} />
    </div>
  </div>
  <div class="userControlNoHover labelledControl mapControls">
    <div class="mapControlLabel">
      <p>Right</p>
    </div>
    <div class="iconContainer" on:click={addColumnRight}>
      <Icons icon={"add"} size={"medium"} color={"black"} />
    </div>
    <div class="iconContainer" on:click={removeColumnRight}>
      <Icons icon={"downChevron"} size={"medium"} color={"black"} />
    </div>
  </div>
</div>
{/if}
<div class="userControlContainer">
  {#if !$page.route.id.includes("/player/")}
      <div class="userControlNoHover labelledControl">
        <div class="controlLabel">
          <p>Title</p>
        </div>
        <textarea rows="1" class="titleBar" placeholder="Adventure title" maxlength="300" bind:value={$currentAdventure.title}/>
      </div>
      <div class="controlRow">
          <div class="publicToggle" on:click={togglePublic} class:activeConnection="{$currentAdventure.public}">
              {#if $currentAdventure.public}
              <p>Public</p>
              {:else}
              <p>Private</p>
              {/if}
          </div>
      </div>
      <div class="controlRow">
      <div class="userControl halfWidth" on:click={() => handleMapGenerate($currentAdventure, $user)}>
        <p>New map</p>
      </div>
      <div class="userControl halfWidth" on:click={() => saveAdventureToFirebase($currentAdventure)}>
        <p>Save map</p>
      </div>
    </div>
    {/if}
  <div class="controlRow">
    {#if !$page.route.id.includes("/player/")}
      <div class="userControl halfWidth">
        <p>Export</p>
      </div>
      <div class="userControl halfWidth" on:click={() => enterPlayMode($currentAdventure)}>
          <a>Play</a>
      </div>
      {/if}
    </div>
  </div>
