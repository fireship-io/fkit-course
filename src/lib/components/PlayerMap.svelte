<script>
    import {page} from '$app/stores';
    import { currentAdventure } from "$lib/adventureData";
    import { onMount } from 'svelte';
    import { collection, getDoc, limit, query, where, onSnapshot, doc } from "firebase/firestore";
    import { db, user } from "$lib/firebase";
    import TileNotesIndicator from './TileNotesIndicator.svelte';
    import UserControls from './UserControls.svelte';

  import ActiveTileOptionsWindows from './ActiveTileOptionsWindows.svelte';




    let screenSize = 0;
    let playingAdventure = {};
    let adventureId = $page.params.adventureId;
    let creatorId = $page.params.creatorId;




    function deepCloneArray(arr) {
        return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
    }

      let adventureData = {};

      onMount(async () => {
        onSnapshot(doc(db, "users", creatorId, "adventures", adventureId), (doc) => {
          if (doc.exists()) {
            adventureData = doc.data();
            adventureData.map = JSON.parse(adventureData.map);
            currentAdventure.set(adventureData);
          } else {
            console.log("No such document!");
          }
        });
      });

</script>

<style>

  .screenNotes {
    padding: 1rem;
  }


    .mapContainer {
        background-color: var(--batlas-black);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        height: 100%;
        width: 100%;
        position: relative;
    }

    .map::-webkit-scrollbar {
        color: var(--batlas-black);
        background-color: var(--batlas-black);
    }

    .map::-webkit-scrollbar-thumb {
        color: var(--batlas-black);
        background: var(--batlas-black);
        border: 0.1em solid var(--batlas-white);
    }

    .map::-webkit-scrollbar-corner {
        display: none;
    }




    .map {
        overflow:scroll;
        background-color: var(--batlas-black);
        height: 100%;
        max-height: calc(100lvh - 2em);
    }


    .gridTile{
    width: 10em;
    height: 7.5em;
    margin: 0px;
    padding: 0px;
    overflow: visible;
    background-size: cover;
    background-position: bottom ;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    pointer-events: none;
  }

  
  .gridTile img {
    width: 10em;
    object-fit: cover;
    object-position: bottom center;
    overflow: visible;
    pointer-events: none;
  }

  .gridRow {
    display: flex;
    flex-direction: row;
    padding: 0px;
    margin: 0px;
    overflow: visible;
    margin-top: -5em;
  }
  
  .gridRow:nth-child(1){
    margin-top: 3em;
  }
  
  .gridRow:nth-last-child(1){
    margin-bottom: 3em;
  }
  
  .gridRow:nth-child(even){
    transform: translateX(5em);
  }

    :global(.dialogueContainer *) {
      pointer-events: auto;
    }
    .addButton {
      position: absolute;
      bottom: 0em;
      right: 0em;
      width: 4em;
      height: 4em;
      border-radius: 2em;
      background-color: var(--batlas-black);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 999;
    }

    :global(.notesIndicatorIndex) {
      color: var(--batlas-white);
    }

    :global(.playerFoggedTile img) {
      filter: brightness(0);
      opacity: 0;
    }

    :global(.foggedTile) {
      filter: brightness(0.5);
      opacity: 1;
    }

  @media screen and (max-width: 1500px) {
    .mapSettings {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;
    }

    .tileOptions {
      height: 100%;
    }

    .tileOptionsBar {
      width: 100%;
      height: 100%;
      max-height: 25%;
    }

    .tileInfoBarActive {
      width: 100%;
      height: 100%;
      max-height: 75%;
    }

    .tileInfoBarActivePlay {
      max-height: 100%;
    }

    .disabledHoverSelector {
      pointer-events: none;
      display: none;
      visibility: hidden;
    }
  }

</style>

<svelte:window bind:innerWidth = {screenSize}/>

<div class="mapContainer">
  <div class="screenNotes">
    <h1 style="color:white;">Player Screen</h1>
  </div>
    <div class="map">
            {#each $currentAdventure.map as row, i}
                <div class="gridRow">
                    {#each row as cell, j}
                    <div class="gridTile" style="background-image: {cell.chosenTile?.img}; position: relative; bottom: 0em;" class:playerFoggedTile = {cell.fogOfWar}>
                      {#if cell.chosenTile?.img == "/tiles/dungeon/roomBlank.webp"}
                        <img class="foggedTile" src="/img/tiles/dungeon/roomBlankPlay.webp" alt="{cell.chosenTile?.img}">
                      {:else}
                        <img src="/img{cell.chosenTile?.img}" alt="{cell.chosenTile?.img}">
                      {/if}
                    </div>
                    {/each}
                </div>
            {/each}
    </div>
</div>


