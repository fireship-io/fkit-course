<script>
    import { page } from '$app/stores';
    import { generateMap } from "$lib/mapGen";
    import { activeTile, currentAdventureChange } from "$lib/dashboardState";
    import { currentAdventure } from "$lib/adventureData";
    import Icons from './Icons.svelte';
    import { tiles } from '$lib/tiles';
    import { db, user } from "$lib/firebase";
    import {
      doc,
      setDoc,
      collection,
    } from "firebase/firestore";
    import { v4 as uuidv4 } from "uuid";
    import { createAlert, premiumUser } from "$lib/dashboardState";
  import { onMount } from 'svelte';

    let disabledMapGenButton = false;

    
    let disabledSave = false;
    let maxRows = 12;
    let maxColumns = 6;
    let maxFreeHeight = false;
    let maxFreeWidth = false;



    function deepCloneArray(arr) {
        return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
    }


    function handleMapGenerate(currentAdventure, user) {
      disabledMapGenButton = true;
      activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null, tileNotes: "", tileTitle: ""});
      generateMap();
      currentAdventure.adventureId === "";
      currentAdventure.userId = user.uid;
      setTimeout(() => {
        disabledMapGenButton = false
      }, 500);
      console.log(currentAdventure.adventureId)
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
    currentAdventureChange.set(false);
  }

    function addBottomRow() {
      if ($currentAdventure.map.length >= maxRows) {
        maxFreeHeight = true;
        return;
      }
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
      maxFreeHeight = false;
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.pop();
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function createTopRow(){
      let mapColumns = $currentAdventure.map[0].length;
      let newRow = [];
      for (let i = 0; i < mapColumns; i++) {
        newRow.push({
          id: uuidv4(),
          zIndex: $currentAdventure.map.length + 1,
          chosenTile: tiles.type.blank[0],
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: true,
        }
        );
      }
      return newRow;
    }

    function addTopRow() {
      if ($currentAdventure.map.length >= maxRows) {
        maxFreeHeight = true;
        return;
      }
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.unshift(createTopRow());
      newMap.unshift(createTopRow());
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function removeTopRow() {
      maxFreeHeight = false;
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.shift();
      newMap.shift();
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function addColumnRight() {
      if ($currentAdventure.map[0].length >= maxColumns) {
        maxFreeWidth = true;
        return;
      }
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
      maxFreeWidth = false;
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.pop();
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function addColumnLeft() {
      if ($currentAdventure.map[0].length >= maxColumns) {
        maxFreeWidth = true;
        return;
      }
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
      maxFreeWidth = false;
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.shift();
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function togglePublic() {
      currentAdventure.set({ ...$currentAdventure, public: !$currentAdventure.public});
    }

    function fogAllTiles() {
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.forEach((tile) => {
          tile.fogOfWar = true;
        });
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    onMount(() => {
      console.log("onMount fired");
      console.log("Current Title", $currentAdventure);
    })

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
    max-width: none;
    height: auto;
    gap: 1em;
    padding: 1em;
    background-color: var(--batlas-white);
    border-radius: 2em;
    border: 0.25em solid var(--batlas-black);
  }

  .mapControlsContainer {
    min-width: 20em;
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
    gap: 0.2em;
    padding-right: 0.5em;
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
    padding: 0.8em;
    font-size: 0.8em;
  }

  .iconContainer {
    cursor: pointer;
    display: flex;
    gap: 1em;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .controlRow {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    width: 100%;
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

  .changeAlert {
    margin: 0em;
  }

  .mapControlDisabled,   .mapControlDisabled .iconContainer {
    opacity: 0.5;
    pointer-events: none;
  }



</style>
{#if !$page.route.id.includes("/player/")}
  <div class="userControlContainer">
    {#if !$page.route.id.includes("/player/")}
      <div class="userControlNoHover labelledControl">
        <div class="controlLabel">
          <p>Title</p>
        </div>
        <textarea rows="1" class="titleBar" placeholder="Adventure title" maxlength="300" bind:value={$currentAdventure.title}/>
        </div>
        <div class="controlRow">
          <div class="userControl"
            on:click={fogAllTiles}
            on:keydown={fogAllTiles}
            role="button"
            tabindex="0"
            >
            <p>Fog all</p>
          </div>
          <div class="publicToggle"
            on:click={togglePublic} 
            on:keydown={togglePublic}
            role="button"
            tabindex="0" 
            class:activeConnection="{$currentAdventure.public}"
          >
              {#if $currentAdventure.public}
              <p>Public</p>
              <Icons icon={"rules"} size={"small"} color={"white"}/>
              {:else}
              <p>Private</p>
              {/if}
          </div>
        </div>
        <div class="controlRow">
          <div class="userControl"
            on:click={() => handleMapGenerate($currentAdventure, $user)}
            on:keydown={() => handleMapGenerate($currentAdventure, $user)}
            role="button"
            tabindex="0"
          >
            <p>Random map</p>
          </div>
          <div class="userControl" 
            on:click={() => saveAdventureToFirebase($currentAdventure)}
            on:keydown={() => saveAdventureToFirebase($currentAdventure)}
            role="button"
            tabindex="0"
          >
            <p>Save map</p>
          </div>
        </div>
        {#if $currentAdventureChange}
          <p class="changeAlert">Remember to save your changes</p>
        {/if}
      {/if}
    </div>
  {/if}
{#if !$page.route.id.includes("/player/")}
<div class="mapControlsContainer">
  <div class="userControlNoHover labelledControl mapControls">
    <div class="mapControlLabel">
      <p>Bottom</p>
    </div>
    <div class="iconContainer"
      on:click={addBottomRow}
      on:keydown={addBottomRow}
      role="button"
      tabindex="0"
      class:mapControlDisabled = {maxFreeHeight}
    >
      <Icons icon={"add"} size={"medium"} color={"black"}/>
    </div>
    <div class="iconContainer"
      on:click={removeBottomRow}
      on:keydown={removeBottomRow}
      role="button"
      tabindex="0"
    >
      <Icons icon={"downChevron"} size={"medium"} color={"black"} />
    </div>
  </div>
  <div class="userControlNoHover labelledControl mapControls">
    <div class="mapControlLabel">
      <p>Top</p>
    </div>
    <div class="iconContainer"
      on:click={addTopRow}
      on:keydown={addTopRow}
      role="button"
      tabindex="0"
    >
      <Icons icon={"add"} size={"medium"} color={"black"} />
    </div>
    <div class="iconContainer"
      on:click={removeTopRow}
      on:keydown={removeTopRow}
      role="button"
      tabindex="0"
      >
      <Icons icon={"downChevron"} size={"medium"} color={"black"} />
    </div>
  </div>
  <div class="userControlNoHover labelledControl mapControls">
    <div class="mapControlLabel">
      <p>Left</p>
    </div>
    <div class="iconContainer"
      on:click={addColumnLeft}
      on:keydown={addColumnLeft}
      role="button"
      tabindex="0"
      >
      <Icons icon={"add"} size={"medium"} color={"black"} />
    </div>
    <div class="iconContainer"
      on:click={removeColumnLeft}
      on:keydown={removeColumnLeft}
      role="button"
      tabindex="0"
    >
      <Icons icon={"downChevron"} size={"medium"} color={"black"} />
    </div>
  </div>
  <div class="userControlNoHover labelledControl mapControls">
    <div class="mapControlLabel">
      <p>Right</p>
    </div>
    <div class="iconContainer"
      on:click={addColumnRight}
      on:keydown={addColumnRight}
      role="button"
      tabindex="0"
    >
      <Icons icon={"add"} size={"medium"} color={"black"} />
    </div>
    <div class="iconContainer"
      on:click={removeColumnRight}
      on:keydown={removeColumnRight}
      role="button"
            tabindex="0"
      >
      <Icons icon={"downChevron"} size={"medium"} color={"black"} />
    </div>
  </div>
  {#if maxFreeHeight && maxFreeWidth && !$premiumUser}
    <p class="changeAlert">Free account max map size limit reached</p>
    <a>Upgrade to premium</a>
  {:else if maxFreeHeight && !$premiumUser}
    <p class="changeAlert">Free account max height reached</p>
    <a>Upgrade to premium</a>
  {:else if maxFreeWidth && !$premiumUser}
    <p class="changeAlert">Free account max width reached</p>
    <a>Upgrade to premium</a>
  {/if}
</div>
{/if}

