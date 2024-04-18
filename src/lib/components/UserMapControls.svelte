<script>
    import { page } from '$app/stores';
    import { generateMap } from "$lib/mapGen";
    import { activeTile, currentAdventureChange, adventureNotesDisplayed } from "$lib/dashboardState";
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
  import { saveAdventureToFirebase, disabledSave } from '$lib/firebaseFunctions';
  import Divider from '$lib/components/Divider.svelte';


    let disabledMapGenButton = false;

    
    let maxRows = 12;
    let maxColumns = 6;
    let maxFreeHeight = false;
    let maxFreeWidth = false;
    let controlWindowMode = "adventure";

    let screenWidth;



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

    function addBottomRow() {
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
      maxFreeHeight = false;
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.shift();
      newMap.shift();
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function addColumnRight() {
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
      maxFreeWidth = false;
      let newMap = deepCloneArray($currentAdventure.map);
      newMap.forEach((row) => {
        row.pop();
      });
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function addColumnLeft() {
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

    async function upgradeToPremium(priceId) {
      // Reference to the Firestore document
    const checkoutSessionsRef = collection(db, "users", $user.uid, "checkout_sessions");

    try {
    // Create a new checkout session in Firestore
    const checkoutSessionRef = await addDoc(checkoutSessionsRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });

    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(checkoutSessionRef, (snap) => {
        const data = snap.data();
        if (data) {
        const { error, url } = data;
        if (error) {
            // Show an error to your customer and
            // inspect your Cloud Function logs in the Firebase console.
            alert(`An error occured: ${error.message}`);
        }
        if (url) {
            // We have a Stripe Checkout URL, let's redirect.
            window.location.assign(url);
        }
        }
    });
    } catch (e) {
    console.error("Error creating checkout session", e);
    }
    };

    function changeWindowMode(newMode){
        controlWindowMode = newMode;
    }

    function clearActiveTile(){
      activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null});
    }

    function toggleAdventureNotes() {
      console.log($currentAdventure)
      clearActiveTile();
      adventureNotesDisplayed.set(!$adventureNotesDisplayed);
      console.log($currentAdventure)
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
    min-width: 15rem;
    max-width: none;
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
      background: transparent;
      outline: none;
      border: none;
      text-align: center;
      color: var(--batlas-white);
      padding: 0.5rem;
      font-family: var(--batlas-font);
      font-size: 1rem;
      cursor: text;
  }

  .iconContainer {
    cursor: pointer;
    display: flex;
    gap: 1rem;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .controlRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .button {
    font-weight: 400;
  }

  .button p {
    margin: 0;
  }

  .controlRow .button {
    flex: 1;
  }

  .controlRow .whiteButton {
    border: 0.1rem solid var(--batlas-white);
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
    position: fixed;
    width: 20rem;
    top: 0.5rem;
    background-color: var(--batlas-black);
    left: calc(50% - 10rem);
    right: calc(50% - 10rem);
    color: var(--batlas-white);
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

    .adventureNotes {
      margin-bottom: 0.5rem;
    }

    .mapSizeControlRow {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      color: var(--batlas-white)
    }

    .blackBox {
      width: 100%;
    }

    .mapSizeIcons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
</style>

<svelte:window bind:innerWidth={screenWidth} />

  <div class="blackBox">
    {#if screenWidth <= 735}
    <div class="controlRow">
      <div class="button blackButton"
        class:active={controlWindowMode === 'adventure'}
        on:click={() => changeWindowMode("adventure")}
        on:keydown={() => changeWindowMode("adventure")}
        role="button"
        tabindex="0"
        >
        <p>Adventure</p>
      </div>

        <div class="button blackButton"
          class:active={controlWindowMode === 'size'}
          on:click={() => changeWindowMode("size")} 
          on:keydown={() => changeWindowMode("size")}
          role="button"
          tabindex="0" 
        >
            <p>Size</p>
            </div>
        </div>
        <Divider color={"white"}/>
    {/if}
      <div>
        <input type="text" rows="1" class="titleBar" placeholder="Adventure title" maxlength="300" bind:value={$currentAdventure.title}/>
      </div>
      {#if screenWidth > 735 || screenWidth <= 735 && controlWindowMode === "adventure"}
      <div class="button blackButton adventureNotes" 
          on:click={toggleAdventureNotes}
          on:keydown={toggleAdventureNotes}
          role="button"
          tabindex="0"
        >
        {#if $adventureNotesDisplayed}
          <p>Hide Notes</p>
          {:else}
          <p>Adventure Notes</p>
        {/if}
      </div>
      <div class="controlRow">
        <div class="button blackButton"
          on:click={fogAllTiles}
          on:keydown={fogAllTiles}
          role="button"
          tabindex="0"
          >
          <p>Fog all</p>
        </div>
          {#if $currentAdventure.public}
          <div class="button whiteButton"
            on:click={togglePublic} 
            on:keydown={togglePublic}
            role="button"
            tabindex="0" 
            class:activeConnection="{$currentAdventure.public}"
          >
              <p>Public</p>
              </div>
          {:else}
          <div class="button blackButton"
            on:click={togglePublic} 
            on:keydown={togglePublic}
            role="button"
            tabindex="0" 
            class:activeConnection="{$currentAdventure.public}"
          >
              <p>Private</p>
              </div>
            {/if}
          </div>
        <div class="controlRow">
          <div class="button blackButton"
            on:click={() => handleMapGenerate($currentAdventure, $user)}
            on:keydown={() => handleMapGenerate($currentAdventure, $user)}
            role="button"
            tabindex="0"
          >
            <p>Random</p>
          </div>
          <div class="button" class:whiteButton="{$currentAdventureChange}" 
            on:click={() => saveAdventureToFirebase($currentAdventure, $user)}
            on:keydown={() => saveAdventureToFirebase($currentAdventure, $user)}
            role="button"
            tabindex="0"
          >
            <p>Save</p>
          </div>
        </div>
        {#if $currentAdventureChange}
          <p class="changeAlert">Remember to save your changes</p>
        {/if}      

    {/if}
        <div>
  {#if screenWidth > 735 || screenWidth <= 735 && controlWindowMode === "size"}
  {#if screenWidth > 735}
  <Divider color={"white"}/>
  {/if}
  <div class="mapSizeControlRow">
    <p>Top</p>
    <div class="mapSizeIcons">
    <div class="iconContainer"
        on:click={addTopRow}
        on:keydown={addTopRow}
        role="button"
        tabindex="0"
        class:mapControlDisabled = {maxFreeHeight}
      >
        <Icons icon={"add"} size={"small"} color={"white"}/>
      </div>
      <div class="iconContainer"
        on:click={removeTopRow}
        on:keydown={removeTopRow}
        role="button"
        tabindex="0"
      >
        <Icons icon={"minus"} size={"small"} color={"white"} />
      </div>
    </div>
  </div>
  <div class="mapSizeControlRow">
    <p>Bottom</p>
    <div class="mapSizeIcons">
    <div class="iconContainer"
        on:click={addBottomRow}
        on:keydown={addBottomRow}
        role="button"
        tabindex="0"
        class:mapControlDisabled = {maxFreeHeight}
      >
        <Icons icon={"add"} size={"small"} color={"white"}/>
      </div>
      <div class="iconContainer"
        on:click={removeBottomRow}
        on:keydown={removeBottomRow}
        role="button"
        tabindex="0"
      >
        <Icons icon={"minus"} size={"small"} color={"white"} />
      </div>
    </div>
  </div>
  <div class="mapSizeControlRow">
    <p>Left</p>
    <div class="mapSizeIcons">
    <div class="iconContainer"
        on:click={addColumnLeft}
        on:keydown={addColumnLeft}
        role="button"
        tabindex="0"
        class:mapControlDisabled = {maxFreeHeight}
      >
        <Icons icon={"add"} size={"small"} color={"white"}/>
      </div>
      <div class="iconContainer"
        on:click={removeColumnLeft}
        on:keydown={removeColumnLeft}
        role="button"
        tabindex="0"
      >
        <Icons icon={"minus"} size={"small"} color={"white"} />
      </div>
    </div>
  </div>
  <div class="mapSizeControlRow">
    <p>Right</p>
    <div class="mapSizeIcons">
    <div class="iconContainer"
        on:click={addColumnRight}
        on:keydown={addColumnRight}
        role="button"
        tabindex="0"
        class:mapControlDisabled = {maxFreeHeight}
      >
        <Icons icon={"add"} size={"small"} color={"white"}/>
      </div>
      <div class="iconContainer"
        on:click={removeColumnRight}
        on:keydown={removeColumnRight}
        role="button"
        tabindex="0"
      >
        <Icons icon={"minus"} size={"small"} color={"white"} />
      </div>
    </div>
  </div>
{/if}
</div>
</div>