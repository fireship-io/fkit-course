<script>
  import Header from './Header.svelte';

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

    footer.footer a {
      cursor: pointer;
      text-decoration: none;
      color: var(--batlas-white);
    }

    footer.footer a:hover {
      cursor: pointer;
      text-decoration: underline;
      color: var(--batlas-white);
    }

    p {
      font-size: 1rem;
    }


    .footer {
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;
      color: var(--batlas-white);
      background-color: var(--batlas-black);
      padding: 0em 1em;
      text-transform: uppercase;
    }

    .footer p {
      margin: 0em;
    }


    .footerCenter {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .footerCenter img {
      width: 10rem;
      max-height: 1em;
      object-fit: cover;
      object-position: bottom center;
      overflow: visible;
    }

    .footerLeft {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding: 0.5em;
      gap: 3em;
    }

    .footerRight {
      display: flex;
      justify-content: flex-end;
      align-items: center;

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

  @media (max-width: 900px) {
    .footer {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-template-areas:
        "footerCenter"
        "footerRight"
        "footerLeft";
      gap: 1rem;
      padding-bottom: 1rem;
    }

    .footerLeft {
      grid-area: footerLeft;
      justify-content: center;
    }

    .footerCenter {
      grid-area: footerCenter;
      justify-content: center;
    }

    .footerCenter img {
      height: auto;
      max-height: none;
      object-fit: cover;
      object-position: bottom center;
      overflow: visible;
    }

    .footerRight {
      grid-area: footerRight;
      justify-content: center;
      text-align: center;
    }
  }

  </style>

    <footer class="footer">
      <div class="footerLeft">
        <p>Copyright Tanner J 2024</p>
      </div>
      <div class="footerCenter">
        <a>
          <img src="/img/batlasLogo_white_outline.webp" alt="Batlas Logo" />
        </a>
      </div>
      <div class="footerRight">
        <a href="/legalities">Privacy Policy | Terms & Conditions | Security Policy</a>
      </div>
    </footer>  

