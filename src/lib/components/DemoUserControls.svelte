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
      addDoc,
      onSnapshot
    } from "firebase/firestore";
    import { v4 as uuidv4 } from "uuid";
    import { createAlert, premiumUser } from "$lib/dashboardState";
  import { onMount } from 'svelte';
  import LoginDialogue from './LoginDialogue.svelte';

  export let guideText;
  export let updateGuideText;

    let disabledMapGenButton = false;

    
    let disabledSave = false;
    let maxRows = 12;
    let maxColumns = 6;
    let maxFreeHeight = false;
    let maxFreeWidth = false;
    let controlWindowMode = "options";
    let loginDialogueVisible = false;

    let screenWidth;


    function deepCloneArray(arr) {
        return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
    }

    function displayLoginDialogue() {
      loginDialogueVisible = true;
    }


    function handleMapGenerate(currentAdventure, user) {
      updateGuideText("Randomly generates a map for your adventure. This overwrites your current map.")
      disabledMapGenButton = true;
      activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null, tileNotes: "", tileTitle: ""});
      generateMap();
      currentAdventure.adventureId === "";
      currentAdventure.userId = user.uid;
      setTimeout(() => {
        disabledMapGenButton = false
      }, 500);
    }

    function addBottomRow() {
      updateGuideText("Adds a row to the bottom of the map. You can have up to 12 rows with a free account.");
      if ($currentAdventure.map.length >= maxRows && !$premiumUser) {
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
      updateGuideText("Removes a row from the bottom of the map.");
      maxFreeHeight = false;
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.pop();
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function createTopRow(){
      updateGuideText("Adds a row to the top of the map. You can have up to 12 rows with a free account.");
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
      if ($currentAdventure.map.length >= maxRows && !$premiumUser) {
        maxFreeHeight = true;
        return;
      }
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.unshift(createTopRow());
      newMap.unshift(createTopRow());
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function removeTopRow() {
      updateGuideText("Removes a row from the top of the map.");
      maxFreeHeight = false;
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.shift();
      newMap.shift();
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function addColumnRight() {
      updateGuideText("Adds a column to the right of the map. You can have up to 12 columns with a free account.");
      if ($currentAdventure.map[0].length >= maxColumns && !$premiumUser) {
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
      updateGuideText("Removes a column from the right of the map.");
      maxFreeWidth = false;
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.pop();
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function addColumnLeft() {
      updateGuideText("Adds a column to the left of the map. You can have up to 12 columns with a free account.");
      if ($currentAdventure.map[0].length >= maxColumns && !$premiumUser) {
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
      updateGuideText("Removes a column from the left of the map.");
      maxFreeWidth = false;
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.shift();
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function togglePublic() {
      updateGuideText("With an account, you can set an adventure to be public or private. Private adventures are visible only by the creator. Public adventures are visible to anyone with the link.");
      currentAdventure.set({ ...$currentAdventure, public: !$currentAdventure.public});
    }

    function fogAllTiles() {
      updateGuideText("Fogs all tiles on the map. This hides the map from players until they explore it.");
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.forEach((tile) => {
          tile.fogOfWar = true;
        });
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }


    function handleVisibilityToggle() {
      updateGuideText("With an account, you can set an adventure to be public or private. Private adventures are visible only by the creator. Public adventures are visible to anyone with the link.");
      togglePublic();
    }

    function changeWindowMode(newMode){
        controlWindowMode = newMode;
    }

    function demoSaveAttempt() {
      updateGuideText("Saves your adventure. You need an account to save your adventures.");
      createAlert("You need an account to save your adventures.");
    }

    onMount(() => {
      $currentAdventure.title = "Demo";
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
    min-width: 15rem;
    max-width: 15rem;
    height: auto;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--batlas-white);
    border-radius: 2rem;
    border: 0.25rem solid var(--batlas-black);
    font-size: clamp(0.8rem, 2vw + 0.4rem, 0.8rem);
  }



  .mapControlsContainer {
    min-width: 15rem;
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
    height: 3rem;
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    border-radius: 3rem;
    cursor: pointer;
  }

  .userControlNoHover {
    cursor: default;
    background-color: var(--batlas-white);
    border: 0.25rem solid var(--batlas-black);
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
    padding: 0.5rem;
    font-size: 1rem;
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
    font-size: 0.8rem;
    font-family: var(--batlas-font);
    border-radius: 2rem 0 0 2rem;
    transform: translateX(-2px);
    padding: 0.5rem;
  }

  .mapControls {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.2rem;
    padding-right: 0.5rem;
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
    border-radius: 2rem 0 0 2rem;
    transform: translateX(-2px);
    padding: 0.8rem;
    font-size: 0.8rem;
  }

  .iconContainer {
    cursor: pointer;
    display: flex;
    gap: 1rem;
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
    gap: 1rem;
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
    gap: 0.5rem;
    width: 100%;
    height: 3rem;
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    border-radius: 3rem;
    cursor: pointer;
    opacity: 0.5;
  }

  .activeConnection {
    opacity: 1;
  }

  .changeAlert {
    margin: 0rem;
    text-align: center;
  }

  .mapControlDisabled,   .mapControlDisabled .iconContainer {
    opacity: 0.5;
    pointer-events: none;
  }

  .sizingControls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .sizingControlRow {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .mapSizeControls {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .vertical {
    flex-direction: column;
  }

  .roomOptionsToggleActive {
      background-color: var(--batlas-black);
      color: var(--batlas-white);
    }

    .roomOptionsToggle {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      background-color: var(--batlas-white);
      text-align: center;
      font-size: 1rem;
      gap: 1rem;
      padding-bottom: 1rem;
      border-bottom: 0.25rem solid var(--batlas-black);
    }

    .roomOptionsToggle a {
      width: 50%;
      margin: 0px;
      padding: 0.5rem 2rem;
      font-weight: 600;
      line-height: 1;
      border: 0.25rem solid var(--batlas-black);
      border-radius: 2rem;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }

    .guideContainer {
      display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    text-align: center;
  }

  .loginDialogueContainer {
    position: fixed;
    top: calc(50vh - 25vh);
    left: calc(50vw - 25vw);
    width: 50vw;
    height: 50vh;
    background-color: var(--batlas-black);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    border: 0.5rem solid var(--batlas-white);
    border-radius: 3rem;
  }
</style>

<svelte:window bind:innerWidth={screenWidth} />

{#if !$page.route.id.includes("/player/")}
  <div class="userControlContainer">
    {#if !$page.route.id.includes("/player/")}
    {#if screenWidth <= 735} 
      <div class="roomOptionsToggle">
        <a class:roomOptionsToggleActive="{controlWindowMode === "options"}" on:click={() => changeWindowMode('options')} >Options</a>
        <a class:roomOptionsToggleActive="{controlWindowMode === "size"}"  on:click={() => changeWindowMode('size')} >Size</a>
    </div>
    {/if}
    {#if controlWindowMode === "options" || screenWidth > 735}
      <div class="userControlNoHover labelledControl">
        <div class="controlLabel">  
          <p>Title</p>
        </div>
        <textarea rows="1" class="titleBar" placeholder="Demo" maxlength="300" bind:value={$currentAdventure.title}/>
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
            on:click={handleVisibilityToggle} 
            on:keydown={handleVisibilityToggle}
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
            <p>Random</p>
          </div>
          <div class="userControl" 
            on:click={demoSaveAttempt}
            role="button"
            tabindex="0"
          >
            <p>Save</p>
          </div>
        </div>
      {/if}
      {/if}
      {#if controlWindowMode === "size" && screenWidth <= 735}
      <div class="mapControlsContainer sizingControls">
        <div class="sizingControlRow">
          <div class="mapSizeControls">
            <div class="iconContainer"
              on:click={addTopRow}
              on:keydown={addTopRow}
              role="button"
              tabindex="0"
              class:mapControlDisabled = {maxFreeHeight}
            >
              <Icons icon={"add"} size={"medium"} color={"black"}/>
            </div>
            <div class="iconContainer"
              on:click={removeTopRow}
              on:keydown={removeTopRow}
              role="button"
              tabindex="0"
            >
              <Icons icon={"minus"} size={"medium"} color={"black"} />
            </div>
          </div>
        </div>
        <div class="sizingControlRow">
          <div class="mapSizeControls vertical">
            <div class="iconContainer"
              on:click={addColumnLeft}
              on:keydown={addColumnLeft}
              role="button"
              tabindex="0"
              class:mapControlDisabled = {maxFreeHeight}
            >
              <Icons icon={"add"} size={"medium"} color={"black"}/>
            </div>
            <div class="iconContainer"
              on:click={removeColumnLeft}
              on:keydown={removeColumnLeft}
              role="button"
              tabindex="0"
            >
              <Icons icon={"minus"} size={"medium"} color={"black"} />
            </div>
          </div>
          <div class="mapSizeControlImage">
            <img src="/img/tiles/dungeon/c1-v2.webp" width="auto" height="50px">
          </div>
          <div class="mapSizeControls vertical">
            <div class="iconContainer"
              on:click={addColumnRight}
              on:keydown={addColumnRight}
              role="button"
              tabindex="0"
              class:mapControlDisabled = {maxFreeHeight}
            >
              <Icons icon={"add"} size={"medium"} color={"black"}/>
            </div>
            <div class="iconContainer"
              on:click={removeColumnRight}
              on:keydown={removeColumnRight}
              role="button"
              tabindex="0"
            >
              <Icons icon={"minus"} size={"medium"} color={"black"} />
            </div>
          </div>
        </div>
        <div class="sizingControlRow">
          <div class="mapSizeControls">
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
              <Icons icon={"minus"} size={"medium"} color={"black"} />
            </div>
          </div>
        </div>
        {#if maxFreeHeight && maxFreeWidth && !$premiumUser}
        <p class="changeAlert">Free account max map size limit reached</p>
      {:else if maxFreeHeight && !$premiumUser}
        <p class="changeAlert">Free account max height reached</p>
      {:else if maxFreeWidth && !$premiumUser}
        <p class="changeAlert">Free account max width reached</p>
      {/if}
      </div>
      {/if}
      </div>
  {/if}
{#if !$page.route.id.includes("/player/")}

{#if screenWidth > 735}
<div class="mapControlsContainer sizingControls">
  <div class="sizingControlRow">
    <div class="mapSizeControls">
      <div class="iconContainer"
        on:click={addTopRow}
        on:keydown={addTopRow}
        role="button"
        tabindex="0"
        class:mapControlDisabled = {maxFreeHeight}
      >
        <Icons icon={"add"} size={"medium"} color={"black"}/>
      </div>
      <div class="iconContainer"
        on:click={removeTopRow}
        on:keydown={removeTopRow}
        role="button"
        tabindex="0"
      >
        <Icons icon={"minus"} size={"medium"} color={"black"} />
      </div>
    </div>
  </div>
  <div class="sizingControlRow">
    <div class="mapSizeControls vertical">
      <div class="iconContainer"
        on:click={addColumnLeft}
        on:keydown={addColumnLeft}
        role="button"
        tabindex="0"
        class:mapControlDisabled = {maxFreeHeight}
      >
        <Icons icon={"add"} size={"medium"} color={"black"}/>
      </div>
      <div class="iconContainer"
        on:click={removeColumnLeft}
        on:keydown={removeColumnLeft}
        role="button"
        tabindex="0"
      >
        <Icons icon={"minus"} size={"medium"} color={"black"} />
      </div>
    </div>
    <div class="mapSizeControlImage">
      <img src="/img/tiles/dungeon/c1-v2.webp" width="auto" height="50px">
    </div>
    <div class="mapSizeControls vertical">
      <div class="iconContainer"
        on:click={addColumnRight}
        on:keydown={addColumnRight}
        role="button"
        tabindex="0"
        class:mapControlDisabled = {maxFreeHeight}
      >
        <Icons icon={"add"} size={"medium"} color={"black"}/>
      </div>
      <div class="iconContainer"
        on:click={removeColumnRight}
        on:keydown={removeColumnRight}
        role="button"
        tabindex="0"
      >
        <Icons icon={"minus"} size={"medium"} color={"black"} />
      </div>
    </div>
  </div>
  <div class="sizingControlRow">
    <div class="mapSizeControls">
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
        <Icons icon={"minus"} size={"medium"} color={"black"} />
      </div>
    </div>
  </div>
  {#if maxFreeHeight && maxFreeWidth && !$premiumUser}
  <p class="changeAlert">Free account max map size limit reached</p>
{:else if maxFreeHeight && !$premiumUser}
  <p class="changeAlert">Free account max height reached</p>
{:else if maxFreeWidth && !$premiumUser}
  <p class="changeAlert">Free account max width reached</p>
{/if}
</div>
{/if}
{/if}

  <div class="mapControlsContainer guideContainer">
    <h4>Guide</h4>
    {guideText}
  </div>

  <div class="mapControlsContainer guideContainer">
    <h4>Create an account</h4>
    <a class="userControl" href="#" on:click={displayLoginDialogue}>Sign up</a>
  </div>

  {#if loginDialogueVisible}
  <div class="loginDialogueContainer">
    <LoginDialogue />
  </div>
  {/if}

