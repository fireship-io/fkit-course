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



  onMount(() => {
    startRandomlyAssigning();
  });


  </script>



  <style>

    h1{
      text-transform: uppercase;
    }

    h3 {
        font-size: 2em;
    }

    a:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    p {
      font-size: 1em;
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

    .footer {
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;
      color: var(--batlas-white);
      background-color: var(--batlas-black);
      border: 0.2em solid var(--batlas-white);
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

    .promptInvisible {
      display:none;
    }

    .promptVisible {
      display: inline;
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

  .priceText {
    text-transform: uppercase;
    color: var(--batlas-black);
    -webkit-text-stroke: 0.01em var(--batlas-white);
    font-size: 4em;
  }

    @media screen and (max-width: 1500px) {
    h2 {
      color: var(--batlas-white);
    }

  }

    @media screen and (max-width: 900px) {

        h3 {
        font-size: 4em;
    }

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

      .priceText {
    text-transform: uppercase;
    color: var(--batlas-black);
    -webkit-text-stroke: 0.03em var(--batlas-white);
    font-size: 4em;
  }
    }

  </style>
  
  <svelte:head>
    <title>Batlas - Pricing</title>
    <meta name="description" content="Isometric Adventure Generator and TTRPG" />
  </svelte:head>
  

  <main class="batlasSection batlasHero">
    <div class="batlasColumn">
          <h3>I care more about facilitating imagination and play more than money. But boy, does money make life less stressful.</h3>
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
          <h2>Always a free option</h2>
          <p>The free tier of Batlas will never be going away. Anyone can always get access to the dungeon tiles, the rules, and the basic digital tools free of charge. I will be adding to basic tile and templates so that even the free option grows more robust over time. There will however be a paid tier of the platform that will give users more tolls and options to play around with.</p>
    </div>
  </section>

  <section class="batlasSection">
    <div class="batlasColumn">
          <h2>Paid tier</h2>
          <span class="priceText">$3.99 AUD a month</span>
          <p>There is no paid tier available yet as I'm still working on the benefits of it. But these are the features that will be coming with it.</p>
    </div>
    <div class="batlasColumn imageColumn monsterGen">
      <p id="monsterPrompt">More maps: <br><span class="promptText">forest, cave, and town</span></p>
      <p id="offensivePrompt">In-game tools: <br><span class="promptText">Loot gen, quick-notes, NPC gen</span></p>
      <p id="defensivePrompt">Map-maker: <br><span class="promptText">non-templated layouts</span></p>
    </div>
  </section>

  <section class="batlasSection">
    <div class="batlasColumn">
          <h2>Just one guy</h2>
          <p>Batlas is my baby. It started as a map-drawing hobby then it mashed up with my web development background, and now I've learned business so I might make facilitaing fun and magic my main job. I'm one lone Aussie putting together everything and a I love it. What that means though is that I don't have the funding or man-power behind me that some of the huge companies have.</p>
          <p>On the flip-side this means that I have the chance to foster and be a real part of my community. I want to listen to Batlas players and create new tools, and maps, and rules that always stay on the core mission of Batlas; less prep, more moments.</p>          
    </div>
    <div class="batlasColumn imageColumn">
      <img src="/img/warrior.webp" alt="Batlas Logo"/>
    </div>
  </section>

  <section class="batlasSection singleColumn">
    <div class="batlasColumn">
          <h2>Make a free account and poke around.</h2>
          <a class="CTA">Create a free account</a>
    </div>
  </section>

  