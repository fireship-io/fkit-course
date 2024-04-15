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
    let controlWindowMode = "options";

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
      clearActiveTile();
      adventureNotesDisplayed.set(!$adventureNotesDisplayed);
    }

</script>

<style>

  .blackBox {
    position: fixed;
    top: 1rem;
    width: auto;
    gap: 1.5rem;
    max-width: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
  }

  .button {
    font-weight: 400;
    margin: 0;
  }

  .button p {
    margin: 0;
  }

  .adventureTitle p {
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--batlas-white);
    text-align: center;
    margin: 0;
  }

  @media (max-width: 735px) {
    .blackBox {
      top: 3.5rem;
      z-index: 150;
      width: calc(100% - 1rem);
      left: 0.5rem;
      right: auto;
      justify-content: space-between;
    }

    .adventureTitle p {
      font-size: 1rem;
    }
  }


</style>

<svelte:window bind:innerWidth={screenWidth} />

  <div class="blackBox">
      <div class="adventureTitle">
      <p>{$currentAdventure.title}</p>  
      </div>
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
          </div>