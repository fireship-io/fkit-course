<script>
    import { userData } from "$lib/firebase";
    import { redirect } from "@sveltejs/kit";
    import UserDashboard from "$lib/components/UserDashboard.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import CycleTile from "$lib/components/CycleTile.svelte";

    let isDropdownOpen = false;
    let screenWidth;

function toggleDropdown() {
  isDropdownOpen = !isDropdownOpen;
}

    function redirectToDashboard() {
        goto("/dashboard");
    }

    let monsterChoices = ['goblin', 'dragon', 'wolf', 'bugbear', 'salamander', 'flying carpet', 'giant', 'troll', 'giant spider', 'rat'];
    let offensiveChoices = ['lightning eyes', 'super speed', 'a hypnotic gaze', 'a poisonous bite', 'fiery breath', 'rusty iron claws', 'fairy minions', 'an extra pair of arms', 'telekinesis', 'a swarm of killer bees'];
    let defensiveChoices = ['a crystal shield', 'a set of mirror armour', 'a poisonous shroud', 'a psychic barrier', 'an illusory maze', 'spatial distortion', 'camoflauge', 'invisibility', 'stone skin', 'a protective whirlwind'];


  function startRandomlyAssigning() {
    setInterval(() => {
      let newMonster = monsterChoices[Math.floor(Math.random() * 10)];
      let newOffensive = offensiveChoices[Math.floor(Math.random() * 10)];
      let newDefensive = defensiveChoices[Math.floor(Math.random() * 10)];
      monster = newMonster;
      offensive = newOffensive;
      defensive = newDefensive;
    }, 4000);
  }

  let monster = 'goblin'
  let offensive = 'lightning eyes'
  let defensive = 'a crystal shield'


  let topTiles = ['r1-v3', 'r4-v2', 'r11-v2']
  let leftTiles = ['r10-v2', 'r3-v3', 'c9-v3']
  let rightTiles = ['c5-v2', 'r8-v2', 'r1-v2']
  let bottomTiles = ['c1-v1', 'c2-v3', 'd12-v1']

  onMount(() => {
    startRandomlyAssigning();
  });


  </script>

<style>

    a:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  
    .header {
      background-color: var(--batlas-black);
      text-transform: uppercase;
      width: 100%;
      position: fixed;
      top:0rem;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 900;
    }

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0rem 2rem;
      width: 100%;
      max-width: 1000px;
    }

    .header a {
      color: var(--batlas-white);
      text-decoration: none;
      font-weight: 600;
      letter-spacing: 0.1rem;
      align-self: center;
    }

    .header a:hover{
      text-decoration: underline;
      cursor: pointer;
    }

    .header a:visited {
      text-decoration: none;
    }

    .headerCenter {
      display: flex;
      justify-content: center;
    }

    .headerCenter img {
      width: 10rem;
      max-height: 1rem;
      object-fit: cover;
      object-position: top center;
      overflow: visible;
    }

    .headerLeft {
      display: flex;
      justify-content: flex-start;
      padding: 0.5rem;
      gap: 3rem;
    }

    .headerRight {
      display: flex;
      justify-content: flex-end;
      padding: 0.5rem;
      gap: 3rem;
    }

    
    .header .headerButton {
        background-color: var(--batlas-white);
        padding: 0.5rem 2rem;
        border-radius: 1rem;
        font-size: 1rem;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.2s ease-in-out;
        margin-top: 0rem;
        color: var(--batlas-black);
        text-decoration: none;
    }


    .headerButton:hover {
        background-color: var(--batlas-black);
        color: var(--batlas-white);
    }

    .dropdown {
    position: relative;
  }

  .dropdown-content {
    display: none;
    position: fixed;
    top: 5rem;
    left: 1rem;
    width: 100%;
    max-width: calc(100% - 2rem);
    background-color: var(--batlas-white);
    padding: 1rem;
    border-radius: 1rem;
  }

  .dropdown-content.dropdownActive {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
  }

  .dropdown-item {
    display: block;
    padding: 0.5rem 1rem;
    color: var(--batlas-black);
    border-radius: 1rem;
    width: 100%;
    border: 0.2rem solid var(--batlas-black);
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;
  }

  .header a.dropdown-item {
    color: var(--batlas-black);
    text-decoration: none;
  }

  .dropdown-item:first-child {
    margin-top: 0.5rem;
  }

  a.dropdown-item:hover {
    background-color: var(--batlas-black);
    color: var(--batlas-white);
  }


  @keyframes expandLine {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }

    @media screen and (max-width: 900px) {


      a {
        font-size: 1rem;
      }

      img {
        max-height: 3rem;
      }

    }

  </style>

  <svelte:window bind:innerWidth={screenWidth} />

  {#if screenWidth > 900}

<nav class="header">
  <div class="container">
    <div class="headerLeft">
      <a href="/#about">About</a>
      <a href="/#pricing">Pricing</a>
    </div>
    <div class="headerCenter">
      <a href="/">
        <img src="/img/batlasLogo_white_outline.webp" alt="Batlas Logo" />
      </a>
    </div>
    <div class="headerRight">
      <a class="headerButton" href="/login">Login / Register</a>
    </div>
  </div>
  </nav>

{:else}
<nav class="header">
  <div class="container">
    <div class="headerLeft">
      <a href="/">
        <img src="/img/batlasLogo_white_outline.webp" alt="Batlas Logo" />
      </a>
    </div>
    <div class="headerRight">
      <div class="dropdown">
        <a href="#" on:click={toggleDropdown}>Menu</a>
        <div class="dropdown-content" class:dropdownActive={isDropdownOpen}>
          <a on:click={toggleDropdown} class="dropdown-item" href="/login">Login</a>
          <a on:click={toggleDropdown} class="dropdown-item" href="/#about">About</a>
          <a on:click={toggleDropdown} class="dropdown-item" href="/#pricing">Pricing</a>
          <a on:click={toggleDropdown} class="dropdown-item" href="/legalities">Legalities</a>
        </div>
      </div>
    </div>
  </div>
</nav>
{/if}

