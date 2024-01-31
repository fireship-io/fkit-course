<script>
    import { userData } from "$lib/firebase";
    import { redirect } from "@sveltejs/kit";
    import UserDashboard from "$lib/components/UserDashboard.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import CycleTile from "$lib/components/CycleTile.svelte";
    import Header from "$lib/components/Header.svelte";


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

    h1{
      text-transform: uppercase;
    }

    a:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    p {
      font-size: 1em;
    }


    .batlasSection {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background-color: var(--batlas-black);
      color: var(--batlas-white);
      padding: 9em 2em;
      width: 100%;
      max-width: 1240px;
      margin-left: auto;
      margin-right: auto;
    }

    
    .batlasHero {
      padding-top: 18em;
    }


    .batlasColumn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    .batlasColumn img {
      width: 90%;
      max-width: 40em;
      object-fit: cover;
      object-position: right center;
      overflow: visible;
    }

    .batlasColumn video {
      width: 70%;
      max-width: 40em;
      object-fit: cover;
      object-position: right center;
      overflow: visible;
    }

    .batlasColumn h1 {
      font-size: 2em;
      font-weight: 900;
      margin-bottom: 0.5em;
    }

    .batlasColumn h2 {
      font-family: 'Poppins', sans-serif;
      text-transform: uppercase;
      line-height: 1.2em;
      letter-spacing: 0.05em;
      font-size: 4.8em;
      font-weight: 800;
      margin-bottom: 0.5em;
    }

    .singleColumn {
      grid-template-columns: 1fr;
    }

    .imageColumn {
      align-items: flex-end;
    }

    .CTA {
      font-size: 2em;
      border: 0.2em solid var(--batlas-white);
      padding: 1em;
      text-transform: uppercase;
    }

    .underline {
      border-bottom: 0.1em solid var(--batlas-white)
    }

    .monsterGen {
      justify-content: flex-start;
      align-items: flex-start;
      padding-left: 3em;
      font-size: 3em;
      font-weight: 600;
      text-transform: uppercase;
      line-height: 1em;
    }

    .monsterGen p {
      margin: 0.3em;
    }

    .monsterGen .promptText {
      color: var(--batlas-black);
      -webkit-text-stroke: 0.01em var(--batlas-white);
    }

    .line {
    width: 100%;
    height: 0.3em;
    background-color: white;
    overflow: hidden;
    animation: expandLine 4s linear infinite;
    }

  @keyframes expandLine {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }

  .mapMaker {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .mapMaker .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 3.025em;
  }

    @media screen and (max-width: 1500px) {
    h2 {
      color: var(--batlas-white);
    }

  }

    @media screen and (max-width: 900px) {

      .batlasHero h2{
        font-size: 8em;
      }

      .batlasHero video {
        width: 100%;
        max-width: 100%;
      }

      p {
        font-size: 2.5em;
      }
      .batlasSection {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        padding: 12em 2em;
        max-width: 900px;
        gap: 6em;
      }

      .batlasColumn {
        align-items: flex-start;
      }

      .imageColumn {
        justify-content: center;
        align-items: center;
      }

      .mapMaker {
        padding-top: 8em;
      }

      .mapMaker .row {
        height: 6.05em;

      }

      .monsterGen {
        width: 100%;
        padding-left: 0em;
        letter-spacing: 0.1em;
        text-align: center;
      }

      .monsterGen p, .promptText {
        font-size: 1em;
        line-height: normal;
      }

      .monsterGen .promptText {
      color: var(--batlas-black);
      -webkit-text-stroke: 0.03em var(--batlas-white);
      }
    }

  </style>
  
  <svelte:head>
    <title>Batlas - Isometric Adventures</title>
    <meta name="description" content="Isometric Adventure Generator and TTRPG" />
  </svelte:head>


  {#if $userData?.username}
    {redirectToDashboard()}
  {:else}
  
  <Header />

  <main class="batlasSection batlasHero">
    <div class="batlasColumn">
          <h1 >Batlas</h1>
          <h2>Prep Less<br>Play More</h2>
    </div>
    <div class="batlasColumn imageColumn">
      <video autoplay loop muted>
        <source src="/video/batlasHero.mp4" type="video/mp4">
        <track default kind="captions" srclang="en">
      </video>
    </div>
  </main>

  <section class="batlasSection singleColumn">
    <div class="batlasColumn">
          <h2>Simple rules & digital tools to <span class="underline">kill goblins, not time.</span></h2>
    </div>
  </section>

  <section class="batlasSection">
    <div class="batlasColumn">
          <h2>Isometric map-maker</h2>
          <p>Hand hand drawn isometric maps in minutes. Designed for Batlas but able to be used in any gaming system.</p>
    </div>
    <div class="batlasColumn imageColumn mapMaker">
      <div class="row">
        <CycleTile options={topTiles}/>
      </div>
      <div class="row">
        <CycleTile options={leftTiles}/>
        <CycleTile options={rightTiles}/>
      </div>
      <div class="row">
        <CycleTile options={bottomTiles}/>
      </div>
    </div>
  </section>

  <section class="batlasSection">
    <div class="batlasColumn">
          <h2>Beat writer's block</h2>
          <p>Creative monster, fantastic locations, and memorable NPC's are just a click away with Batlas' digital toolset.</p>
    </div>
    <div class="batlasColumn imageColumn monsterGen">
      <div class="line"></div>
      <p id="monsterPrompt">A <span class="promptText">{monster}</span></p>
      <p id="offensivePrompt">with <span class="promptText">{offensive}</span></p>
      <p id="defensivePrompt">and <span class="promptText">{defensive}</span></p>
    </div>
  </section>

  <section class="batlasSection">
    <div class="batlasColumn">
          <h2>Play in less than 10 minutes</h2>
          <p>Batlas removes the barriers to play, allowing fantasy adventures at the drop of a hat.</p>
          <p>With the map-maker, idea generators, and built-in adventure planner game master's can be ready to run in less time than it takes the rest of group to decide on dinner.</p>
          <p>Just get pizza.</p>
    </div>
    <div class="batlasColumn imageColumn">
      <img src="/img/pizza.webp" alt="Batlas Logo"/>
    </div>
  </section>

  <section class="batlasSection singleColumn">
    <div class="batlasColumn">
          <h2>Make a free account and poke around.</h2>
          <a href="/login" class="CTA">Create a free account</a>
    </div>
  </section>

  <section class="batlasSection">
    <div class="batlasColumn">
          <h2>Simple, fast, and fun</h2>
          <p>Batlas is designed to be planned and planned in around 2-3 hours. It cuts out rules that bog the story down in mathematics and numbers by using archetypes to determine strengths and weaknesses.</p>
          <p>Simple enough to pick up and play, complex enough to allow for creativity and ridiculous memories.</p>
    </div>
    <div class="batlasColumn imageColumn monsterGen">
      <p id="monsterPrompt">10 <span class="promptText">minutes prep</span></p>
      <p id="offensivePrompt">3 <span class="promptText">dice</span></p>
      <p id="defensivePrompt">90+ <span class="promptText">minutes of play</span></p>
      <p id="defensivePrompt">No <span class="promptText">maths (almost)</span></p>
    </div>
  </section>

  <section class="batlasSection">
    <div class="batlasColumn">
          <h2>Support the community</h2>
          <p class="batlasColumnSubtitle">(and me, please.)</p>
          <p>There will always be a free version of Batlas available to everyone but as time goes on I'll be adding more and more to a paid version of the platform.</p>
          <p>I'm just one guy, not a studio or big company. Batlas is a solo project that exists to get new people into the TTRPG community. And as a dream that I might one day get to enable fun and adventure as my main job.</p>
          <p>If you can spare a few bucks it'd go a long to keep the magic alive.</p>
    </div>
    <div class="batlasColumn imageColumn">
      <img src="/img/warrior.webp" alt="Batlas Logo" />
    </div>
  </section>

  <section class="batlasSection singleColumn">
    <div class="batlasColumn">
          <h2>Now, gather your party & make some memories.</h2>
          <a href="/login" class="CTA">Create a free account</a>
    </div>
  </section>
  {/if}
  
  