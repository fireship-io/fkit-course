<script>
    import { userData } from "$lib/firebase";
    import { redirect } from "@sveltejs/kit";
    import UserDashboard from "$lib/components/UserDashboard.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import CycleTile from "$lib/components/CycleTile.svelte";


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
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;
      color: var(--batlas-white);
      background-color: var(--batlas-black);
      border: 0.2em solid var(--batlas-white);
      padding: 0em 1em;
      text-transform: uppercase;
      position: fixed;
      top: 0em;
      width: 100%;
    }

    .header a {
      color: var(--batlas-white);
      text-decoration: none;
      font-weight: 600;
      letter-spacing: 0.1em;;
    }

    .header a:hover{
      text-decoration: underline;
      cursor: pointer;
    }

    .header a:visited {
      color: var(--batlas-white);
      text-decoration: none;
    }

    .headerCenter {
      display: flex;
      justify-content: center;
    }

    .headerCenter img {
      width: 10rem;
      max-height: 1em;
      object-fit: cover;
      object-position: top center;
      overflow: visible;
    }

    .headerLeft {
      display: flex;
      justify-content: flex-start;
      padding: 0.5em;
      gap: 3em;
    }

    .headerRight {
      display: flex;
      justify-content: flex-end;
      padding: 0.5em;
      gap: 3em;
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
        font-size: 1.7em;
      }

    }

  </style>

<nav class="header">
    <div class="headerLeft">
      <a href="/about">About</a>
      <a href="/pricing">Pricing</a>
    </div>
    <div class="headerCenter">
      <a href="/">
        <img src="/img/batlasLogo_white_outline.webp" alt="Batlas Logo" />
      </a>
    </div>
    <div class="headerRight">
      <a href="/login">Login / Register</a>
    </div>
  </nav>

