<script>
  
      import { page } from '$app/stores';
      import { currentAdventure } from "$lib/adventureData";
      import { onMount } from 'svelte';
      import { db, userData, user } from "$lib/firebase";
      import {
        arrayRemove,
        arrayUnion,
        doc,
        setDoc,
        getDocs,
        updateDoc,
        FieldValue,
        collection,
        addDoc,
      } from "firebase/firestore";
      import { v4 as uuidv4 } from "uuid";
      import { createAlert, premiumUser, userAdventureCount } from "$lib/dashboardState";
  
  
      
      let disabledSave = false;

  
  
  
      function deepCloneArray(arr) {
          return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
      }
  
      async function saveNewAdventureToFirebase(currentAdventure) {
      disabledSave = true;
  
      const adventuresRef = collection(db, "users", $user.uid, "adventures");
  
      if (currentAdventure.title === "") {
        createAlert("Please enter a title for your adventure.");
        return;
      }
  
      let uniqueId = uuidv4();
      currentAdventure.adventureId = uniqueId;
      const adventureRef = doc(adventuresRef, currentAdventure.adventureId);
      await setDoc(adventureRef, {
        ...currentAdventure,
        map : JSON.stringify(currentAdventure.map)
      });

      console.log("currentAdventure", currentAdventure)

      window.location.href = `/dashboard/create/${$user?.uid}/${currentAdventure.adventureId}`;
  }

  onMount(async() => {
    const adventuresCountRef = collection(db, "users", $user.uid, "adventures");
    const adventuresCountSnapshot = await getDocs(adventuresCountRef);
    userAdventureCount.set(adventuresCountSnapshot.size);
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
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
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
  
    .invisible {
      display: none;
    }

    .usageNotifier p{
      color: var(--batlas-white);
    }

    .upgradeButton {
      background-color: var(--batlas-black);
      color: var(--batlas-white);
      border-radius: 3em;
      cursor: pointer;
      padding: 0em 0.6em;
      font-size: 0.8em;
      font-family: var(--batlas-font);
      text-align: center;
    }
  
  </style>

<div class="userControlContainer">
        <div class="controlRow">
        {#if !$premiumUser && $userAdventureCount >= 5}
          <div class="upgradeButton">
            <p>Upgrade to save more adventures</p>
          </div>
        {:else}
        <div class="userControlNoHover labelledControl">
          <div class="controlLabel">
            <p>Title</p>
          </div>
          <textarea rows="1" class="titleBar" placeholder="Adventure title" maxlength="300" bind:value={$currentAdventure.title}/>
        </div>
        <div class="userControl" on:click={() => saveNewAdventureToFirebase($currentAdventure)}>
          <p>Create map</p>
        </div>
        {/if}
      </div>
</div>
{#if !$premiumUser}
<div class="usageNotifier">
  <p>You have used {$userAdventureCount}/5 of your free account adventure limit.</p>
</div>
{/if} 