<script>
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
  import LoginDialogue from './LoginDialogue.svelte';
  import Divider from '$lib/components/Divider.svelte';
    import { generateMap } from "$lib/mapGen";
    import {premadeAdventures} from "$lib/adventureData";

    
  import { saveAdventureToFirebase, disabledSave } from '$lib/firebaseFunctions';
  

  export let guideText;
  export let updateGuideText;
  export let role;

    let disabledMapGenButton = false;

    let controlsExpanded = true;
    
    let maxRows = 12;
    let maxColumns = 6;
    let maxFreeHeight = false;
    let maxFreeWidth = false;
    let loginDialogueVisible = false;
    let controlWindowMode = "adventure";
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

    
    function toggleAdventureNotes() {
      clearActiveTile();
      adventureNotesDisplayed.set(!$adventureNotesDisplayed);
    }

    function toggleMobileControls() {
      controlsExpanded = !controlsExpanded;
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


    function clearActiveTile(){
      activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null});
    }

    onMount(() => {
      if(role === "demo") {
      $currentAdventure.title = "Demo";
      };
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
    top: 1rem;
    padding: 0.5rem;
    background-color: var(--batlas-black);
    left: calc(50% - 10rem);
    right: calc(50% - 10rem);
    color: var(--batlas-white);
    margin: 0rem;
    text-align: center;
    border-radius: 1rem;
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

    .guideBox {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background-color: var(--batlas-black);
      color: var(--batlas-white);
      font-size: 1rem;
      text-align: center;
    }

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .row h4 {
      margin: 0;
    }

    .controlContainer {
      width: 100%;
      min-width: 18rem;
    }

    .blackButton.active {
      background-color: var(--batlas-white);
      color: var(--batlas-black);
    }

    .collapsedPadding {
        padding: 1rem;
        padding-bottom: 0.5rem;
      }

      .accordionRow input {
        padding: 0;
        text-align: left;
      }

      
      .accordionRow .button {
        margin: 0;
        padding: 0;
      }

    @media(max-width:735px){
      .changeAlert {
        background-color: transparent;
        position: static;
        border-top: 0.1rem solid var(--batlas-white);
        width: 100%;
        padding: 0;
        border-radius: 0rem;
        padding-top: 0.5rem;
      }

      .controlContainer {
        top: 4rem;
        position: absolute;
        width: calc(100% - 2rem);
      }

      .controlRow {
        margin-top: 0.5rem;
      }

      .adventureNotes {
        margin-top: 0.5rem;
      }

      .controlRow.accordionRow {
        margin: 0rem;
        margin-bottom: 0.5rem;
      }

      .accordionRow input {
        padding: 0;
        text-align: left;
      }

      .accordionRow .button {
        margin: 0;
        padding: 0;
      }

      .collapsedPadding {
        padding: 1rem;
        padding-bottom: 0.5rem;
      }
    }
</style>

<svelte:window bind:innerWidth={screenWidth} />

<div class="controlContainer blackBox" class:collapsedPadding={!controlsExpanded}>
    <div class="controlRow accordionRow">
    <div class="button">
      <input type="text" rows="1" class="titleBar" placeholder="Adventure title" maxlength="300" bind:value={$currentAdventure.title}/>
    </div>
    <div class="button blackButton"
  on:click={toggleMobileControls}
  on:keydown={toggleMobileControls}
  role="button"
  tabindex="0"
>

{#if controlsExpanded}
  <p>Hide</p>
  {:else}
  <p>Controls</p>
{/if}
</div>
</div>

{#if screenWidth <= 735 && controlsExpanded && role==="editor"}
<Divider color={"white"}/>
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
      {#if screenWidth > 735 && controlsExpanded || screenWidth <= 735 && controlWindowMode === "adventure" && controlsExpanded}
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
        {#if role==="editor"}
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
            {/if}
          </div>
          {#if role==="editor"}
        <div class="controlRow">
          <div class="button blackButton"
            on:click={() => handleMapGenerate($currentAdventure, $user)}
            on:keydown={() => handleMapGenerate($currentAdventure, $user)}
            role="button"
            tabindex="0"
          >
            <p>Random</p>
          </div>
          {#if role === "demo"}
          <div class="button" class:whiteButton="{$currentAdventureChange}" 
            on:click={demoSaveAttempt}
            on:keydown={demoSaveAttempt}
            role="button"
            tabindex="0"
          >
            <p>Save</p>
          </div>
          {:else if role === "editor"}
          <div class="button blackButton" class:whiteButton="{$currentAdventureChange}" 
          on:click={() => saveAdventureToFirebase($currentAdventure, $user)}
          on:keydown={() => saveAdventureToFirebase($currentAdventure, $user)}
          role="button"
          tabindex="0"
        >
          <p>Save</p>
        </div>
        {/if}
        </div>    
        {/if}
    {/if}
        <div>
  {#if screenWidth > 735 && controlsExpanded && role==="editor" || screenWidth <= 735 && controlWindowMode === "size" && controlsExpanded && role==="editor"}
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

{#if role==="demo"}
  <div class="blackBox guideBox">
    {#if screenWidth > 735}
    <div class="row">
    <h4>Guide</h4>
    <a class="button whiteButton" href="#" on:click={displayLoginDialogue}>Sign up</a>
  </div>
  {/if}
  <p>
    {guideText}

  </p>
  {#if $currentAdventureChange}
  <p class="changeAlert">You have unsaved changes</p>
{/if}  
  </div>

  {#if $currentAdventureChange}
  <p class="changeAlert">You have unsaved changes</p>
{/if} 

  {#if loginDialogueVisible}
  <div class="loginDialogueContainer">
    <LoginDialogue />
  </div>
  {/if}
{/if}