<script>
    import { currentAdventure } from "$lib/adventureData";
    import { onMount } from "svelte";
    import CreateSaveBar from "./CreateSaveBar.svelte";
    import { 
        generateMultiplePrompts,
        vowelCheck, 
        monster, 
        offensiveQuirk, 
        defensiveQuirk, 
        npc,
        questLocation,
        problem
    } from "$lib/promptGen";
    import { map } from "$lib/mapGen";
    import { db, userData, user } from "$lib/firebase";
    import {
      arrayRemove,
      arrayUnion,
      doc,
      setDoc,
      updateDoc,
      FieldValue,
      collection,
      addDoc,
    } from "firebase/firestore";
    import { v4 as uuidv4 } from "uuid";
    import { createAlert } from "$lib/dashboardState";
    

    let disabledSave = false;

    export let clearAdventureData;

    let screenSize = 0;
    
    let titleChange = false;
    let enemyChange = false;
    let questChange = false;
    let npcChange = false;
    let goalChange = false;
    let sceneChange = false;
    let pushChange = false;
    let gimmickChange = false;


    function promptGen(prompts) {
        generateMultiplePrompts(prompts);
        let monsterString = `You're fighting ${((vowelCheck($monster.description) ? 'an ' : 'a '))} ${$monster.description} with ${$offensiveQuirk.description} and ${$defensiveQuirk.description}. It's left behind ${$monster.clue}, ${$offensiveQuirk.clue}, and ${$defensiveQuirk.clue}.`;
        let questString = `${$questLocation} ${$problem}.`;
        let npcString = `A ${$npc.descriptor} ${$npc.sex} ${$npc.race} whose ${$npc.personality}. They wear ${$npc.clothes}, speak ${$npc.speech}, and ${$npc.idiosyncrasy}.`
        let titleString = $currentAdventure.title

        if ($currentAdventure.adventureId === "") {
            let uniqueId = uuidv4();
            currentAdventure.set ({
                ...$currentAdventure,
                adventureId: uniqueId
            })
        }

        if (prompts.includes("monster")) {
            enemyChange = false;
        }

        if (prompts.includes("questLocation")) {
            questChange = false;
        }

        if (prompts.includes("npc")) {
            npcChange = false;
        }

        if (titleChange) {
            titleString = $currentAdventure.title;
        }

        if (enemyChange) {
            monsterString = $currentAdventure.notes.enemy;
        }
        if (questChange) {
            questString = $currentAdventure.notes.quest;
        }
        if (npcChange) {
            npcString = $currentAdventure.notes.npc;
        }

        currentAdventure.set({
            ...$currentAdventure,
            title: titleString,
            notes: {
                ...currentAdventure.notes,
                enemy: monsterString,
                quest: questString,
                npc: npcString,
            },
        });

        console.log("currentAdventure", $currentAdventure);
    }

  async function saveAdventureToFirebase(currentAdventure) {
    console.log("saveAdventureToFirebase fired", currentAdventure);

    disabledSave = true;

    const adventuresRef = collection(db, "users", $user.uid, "adventures");

    if (currentAdventure.title === "") {
      createAlert("Please enter a title for your adventure.");
      return;
    }

    if (currentAdventure.adventureId === "") {
      let uniqueId = uuidv4();
      currentAdventure.adventureId = uniqueId;
      console.log("saving new adventure to firebase", currentAdventure);
      const adventureRef = doc(adventuresRef, currentAdventure.adventureId);
      await setDoc(adventureRef, {
        ...currentAdventure,
        map : JSON.stringify(currentAdventure.map)
      });
      createAlert(`${currentAdventure.title} saved!`)
      setTimeout(() => {
          disabledSave = false;
        }, 3000);      
    } else {
      console.log("updating new adventure to firebase", currentAdventure);
      const adventureRef = doc(adventuresRef, currentAdventure.adventureId);
      await setDoc(adventureRef, {
        ...currentAdventure,
        map : JSON.stringify(currentAdventure.map)
      });
      createAlert(`${currentAdventure.title} updated!`)
      setTimeout(() => {
          disabledSave = false;
        }, 3000); 
    }
    }


</script>

<style>

    

    .plannerContent {
        padding: 0.8em;
    }

    .plannerContent h2 {
        font-size: 2.2em;
    }

    .options {
        grid-column: 1/5;
        grid-row: 1/2;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2em;
        width: 100%;
        padding: 0.8em;
        height: 100%;
        margin-top:2em;
        overflow: scroll;;

    }

    .options::-webkit-scrollbar {
        display: none;
    }

    .content {
        width: 100%;
        grid-column: 5/11;
        height: 100%;
        margin-top:2em;
        padding: 0.8em;
        overflow-y: scroll;
    }


    .dungeon {
    border: 1em solid white;;
    border-image-slice: 103 107 107 111;
    border-image-width: 1em;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: repeat repeat;
    border-style: solid;
    border-image-source: url('/img/border_full.png');
    background-color: var(--batlas-white);
}
.map {
    grid-column: 11/17;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 4em);
}

.createAdventureTextArea {
    width: 100%;
    margin-bottom: 0em;
    padding: 0.4em;
}

.createAdventureNotesSection {
    margin-bottom: 2em;;
}

.createAdventureNotesSection h4 {
    text-transform: uppercase;
    font-family: 'Poppins', sans-serif;
    font-size: 1.2em;
}

textarea {
    font-size: 1em;
    font-family: var(--batlas-font);
}



    .plannerSectionHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.3em;
    }

    .plannerSectionTitle {
        margin: 0;
        display: inline;
        width: 80%;
    }

    .createSaveBar {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: auto;
        padding: 0em;
        gap: 0.4em;
        padding: 0.8em;
        padding-bottom: 1em;
        background-color: var(--batlas-white);
        position: sticky;
        top: 0em;
        border-bottom: 0.2em solid var(--batlas-black);
    }

    .titleBar {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        gap: 1em;
        font-size: 1em;
    }

    .titleBar textarea {
        width: 100%;
        border: none;
        font-size: 1.2em;
        text-transform: uppercase;
        color: var(--batlas-black);
        font-weight: 600;
    }

    .titleBar textarea:focus {
        outline: none;
    }
    
    .titleBar textarea::placeholder {
        font-style: italic;
        color: var(--batlas-black);
        opacity: 0.6;
    }

    .titleBar textarea::-webkit-scrollbar {
        display: none;
    }


    .saveBar {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 1em;
        width: 100%;
    }

    .saveBar a {
        margin: 0;
        border: 0.1em solid var(--batlas-white);
        width: auto;
        padding: 0.2em 0.6em;
        border-radius: 0.6em;
        background-color: var(--batlas-black);
        color: var(--batlas-white);
        text-align:center;
        text-decoration: none;
        text-wrap: none;
        white-space: nowrap;
    }

    .saveBar a:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .savedAdventure:hover h4 {
        text-decoration: underline;
    }

    .mobileCreateSaveBar {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1em;
        font-size: 1em;
        height: auto;
        padding: 0em;
        padding-bottom: 3em;;
    }

    .mobileCreateSaveBar input{
      overflow: visible;
      height: 3em;
    }

    .mobileCreateSaveBar input::placeholder {
        font-size: 0.8em;
        text-wrap: wrap;
        white-space: normal;
    }

    .icon {
        margin-top: 0.4em;
        max-height: 1.3em;
        cursor: pointer;
        display: inline;
        width: 2em;
        fill: var(--batlas-black);
    }

    .saveBar .icon {
        margin-top: 0.4em;
        max-height: 1.3em;
        cursor: pointer;
        display: inline;
        fill: var(--batlas-white);
    }


@media screen and (max-width: 1500px) {

.options, .content, .map {
    grid-column: 1/2;
    margin-top: 0em;
    height: 100%;
}

.options {
    height: 100%;
    padding: 2em;
    margin: 0em;
}

.invisible {
    display: none;
}



}



</style>

<svelte:window bind:innerWidth = {screenSize}/>


<div class="createSaveBar">
    <div class="titleBar">
        <textarea rows="2" placeholder="Give your adventure a title to save it" maxlength="300" bind:value={$currentAdventure.title} on:change={() => titleChange = true}/>
        <div class="alert" id="titleAlert">You're adventure needs a title.</div>
    </div>
    <div class="saveBar">
        <a  on:click={clearAdventureData} class="brutalismBorder">Clear all</a>
        {#if $currentAdventure.title != "" && $currentAdventure.adventureId === ""}
        <a  on:click={() => saveAdventureToFirebase($currentAdventure)} class="brutalismBorder" class:disabledButton = "{disabledSave}">
            <svg class="icon" viewBox="0 0 188 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M187.625,9.381l0,240.732c0,5.178 -4.203,9.381 -9.381,9.381l-168.863,0c-5.177,0 -9.381,-4.203 -9.381,-9.381l-0,-240.732c-0,-5.177 4.204,-9.381 9.381,-9.381l168.863,-0c5.178,-0 9.381,4.204 9.381,9.381Zm-19.759,126.492c0,-0.396 -0.321,-0.717 -0.718,-0.717l-146.671,-0c-0.396,-0 -0.718,0.321 -0.718,0.717l0,12.92c0,0.397 0.322,0.718 0.718,0.718l146.671,0c0.397,0 0.718,-0.321 0.718,-0.718l0,-12.92Zm-42.77,81.078c0,-0.396 -0.321,-0.718 -0.718,-0.718l-103.901,-0c-0.396,-0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.717 0.718,0.717l103.901,0c0.397,0 0.718,-0.321 0.718,-0.717l0,-12.92Zm42.77,-108.103c0,-0.397 -0.321,-0.718 -0.718,-0.718l-146.671,-0c-0.396,-0 -0.718,0.321 -0.718,0.718l0,12.92c0,0.396 0.322,0.717 0.718,0.717l146.671,0c0.397,0 0.718,-0.321 0.718,-0.717l0,-12.92Zm0,54.051c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,0c-0.396,0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Zm0,-135.358c0,-0.926 -0.752,-1.678 -1.678,-1.678l-144.75,-0c-0.927,-0 -1.679,0.752 -1.679,1.678l0,30.214c0,0.927 0.752,1.679 1.679,1.679l144.75,-0c0.926,-0 1.678,-0.752 1.678,-1.679l0,-30.214Zm0,54.281c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,-0c-0.396,-0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Zm0,108.103c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,0c-0.396,0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Z"/></svg>
        </a>
        {:else if $currentAdventure.adventureId != ""}
        <a  on:click={() => saveAdventureToFirebase($currentAdventure)} class="brutalismBorder" class:disabledButton = "{disabledSave}">
            <svg class="icon" viewBox="0 0 188 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M187.625,9.381l0,240.732c0,5.178 -4.203,9.381 -9.381,9.381l-168.863,0c-5.177,0 -9.381,-4.203 -9.381,-9.381l-0,-240.732c-0,-5.177 4.204,-9.381 9.381,-9.381l168.863,-0c5.178,-0 9.381,4.204 9.381,9.381Zm-19.759,126.492c0,-0.396 -0.321,-0.717 -0.718,-0.717l-146.671,-0c-0.396,-0 -0.718,0.321 -0.718,0.717l0,12.92c0,0.397 0.322,0.718 0.718,0.718l146.671,0c0.397,0 0.718,-0.321 0.718,-0.718l0,-12.92Zm-42.77,81.078c0,-0.396 -0.321,-0.718 -0.718,-0.718l-103.901,-0c-0.396,-0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.717 0.718,0.717l103.901,0c0.397,0 0.718,-0.321 0.718,-0.717l0,-12.92Zm42.77,-108.103c0,-0.397 -0.321,-0.718 -0.718,-0.718l-146.671,-0c-0.396,-0 -0.718,0.321 -0.718,0.718l0,12.92c0,0.396 0.322,0.717 0.718,0.717l146.671,0c0.397,0 0.718,-0.321 0.718,-0.717l0,-12.92Zm0,54.051c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,0c-0.396,0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Zm0,-135.358c0,-0.926 -0.752,-1.678 -1.678,-1.678l-144.75,-0c-0.927,-0 -1.679,0.752 -1.679,1.678l0,30.214c0,0.927 0.752,1.679 1.679,1.679l144.75,-0c0.926,-0 1.678,-0.752 1.678,-1.679l0,-30.214Zm0,54.281c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,-0c-0.396,-0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Zm0,108.103c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,0c-0.396,0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Z"/></svg>
        </a>
        {/if}
    </div>
</div>
<div class="plannerContent">
    <div class="createAdventureNotesSection">
        <div class="plannerSectionHeader">
            <h4 class="plannerSectionTitle">The Enemy</h4>
            <svg on:click={() => promptGen(["monster", "offensiveQuirk", "defensiveQuirk"])} class="icon" viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M182.757,40.076c-16.532,-11.399 -36.566,-18.076 -58.147,-18.076c-56.632,0 -102.61,45.978 -102.61,102.61l-22,-0c-0,-68.774 55.836,-124.61 124.61,-124.61c28.705,0 55.157,9.727 76.235,26.062l23.897,-18.515l15.825,85.389l-78.73,-36.651l20.92,-16.209Zm-126.17,188.931l-20.213,20.213l-26.448,-82.717l82.717,26.448l-20.086,20.086c15.264,9.011 33.059,14.183 52.053,14.183c56.632,-0 102.61,-45.978 102.61,-102.61l22,-0c-0,68.774 -55.836,124.61 -124.61,124.61c-25.091,-0 -48.46,-7.432 -68.023,-20.213Z"/></svg>
        </div>
        <textarea on:change={() => enemyChange = true} bind:value={$currentAdventure.notes.enemy} class="createAdventureTextArea brutalismBorder" placeholder="Details the antoganist of this adventure. What is it? Does it have minions? What signs of it couuld be found throughout the dungeon?" rows="6"/>
    </div>
    <div class="createAdventureNotesSection">
        <div class="plannerSectionHeader">
            <h4 class="plannerSectionTitle">The Quest</h4>
            <svg on:click={() => promptGen(["questLocation", "problem"])} class="icon" viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M182.757,40.076c-16.532,-11.399 -36.566,-18.076 -58.147,-18.076c-56.632,0 -102.61,45.978 -102.61,102.61l-22,-0c-0,-68.774 55.836,-124.61 124.61,-124.61c28.705,0 55.157,9.727 76.235,26.062l23.897,-18.515l15.825,85.389l-78.73,-36.651l20.92,-16.209Zm-126.17,188.931l-20.213,20.213l-26.448,-82.717l82.717,26.448l-20.086,20.086c15.264,9.011 33.059,14.183 52.053,14.183c56.632,-0 102.61,-45.978 102.61,-102.61l22,-0c-0,68.774 -55.836,124.61 -124.61,124.61c-25.091,-0 -48.46,-7.432 -68.023,-20.213Z"/></svg>
        </div>

        <textarea on:change={() => enemyChange = true} bind:value={$currentAdventure.notes.quest} class="createAdventureTextArea brutalismBorder" placeholder="Detail the hook and context of the adventure. Why is the party doing this? What parties are involved?" rows="6"/>
    </div>
    <div class="createAdventureNotesSection">
        <div class="plannerSectionHeader">
            <h4 class="plannerSectionTitle">The NPC</h4>
            <svg on:click={() => promptGen(["npc"])} class="icon" viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M182.757,40.076c-16.532,-11.399 -36.566,-18.076 -58.147,-18.076c-56.632,0 -102.61,45.978 -102.61,102.61l-22,-0c-0,-68.774 55.836,-124.61 124.61,-124.61c28.705,0 55.157,9.727 76.235,26.062l23.897,-18.515l15.825,85.389l-78.73,-36.651l20.92,-16.209Zm-126.17,188.931l-20.213,20.213l-26.448,-82.717l82.717,26.448l-20.086,20.086c15.264,9.011 33.059,14.183 52.053,14.183c56.632,-0 102.61,-45.978 102.61,-102.61l22,-0c-0,68.774 -55.836,124.61 -124.61,124.61c-25.091,-0 -48.46,-7.432 -68.023,-20.213Z"/></svg>
        </div>
        <textarea bind:value={$currentAdventure.notes.npc} class="createAdventureTextArea brutalismBorder" placeholder="Detail the NPC the party will be spending the most time with. What do they look like? How do they speak and act? Why are they in their current situation?" rows="6"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>The party's goal</h4>
        <textarea bind:value={$currentAdventure.notes.goal} class="createAdventureTextArea brutalismBorder" placeholder="Clearly define what the party is trying to achieve this game. Give them deirection, but don't restrain them." rows="4"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>Describe the scene</h4>
        <textarea bind:value={$currentAdventure.notes.scene} class="createAdventureTextArea brutalismBorder" placeholder="Describe the location in broad strokes. Try to give an atmosphere and allow the specifics to emerge during the game." rows="8"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>Push the party forward</h4>
        <textarea bind:value={$currentAdventure.notes.push} class="createAdventureTextArea brutalismBorder" placeholder="Force the party to action. Make something chase them, limit their time to plan, raise the stakes. Make the situation worse." rows="6"/>
    </div>
    <div class="createAdventureNotesSection">
        <h4>Give them a gimmick</h4>
        <textarea bind:value={$currentAdventure.notes.gimmick} class="createAdventureTextArea brutalismBorder" placeholder="Put something fun throughout the adventure. Give the party something to play with." rows="5"/>
    </div>
</div>
