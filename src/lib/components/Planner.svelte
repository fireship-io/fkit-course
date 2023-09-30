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
    import Icons from "./Icons.svelte";
    

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
        let monsterString = `You're fighting ${((vowelCheck($monster.description) ? 'an ' : 'a '))} ${$monster.description} with ${$offensiveQuirk.description} and ${$defensiveQuirk.description}. Signs of it include ${$monster.clue}, ${$offensiveQuirk.clue}, and ${$defensiveQuirk.clue}.`;
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

        if ($questLocation === "" && !questChange) {
            questString = "";
        }

        if ($npc.race === "" && !npcChange) {
            npcString = "";
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
        <a  on:click={clearAdventureData} class="brutalismBorder">
            <Icons icon={"remove"} size={"small"} color={"white"} />
        </a>
        {#if $currentAdventure.title != ""}
        <a  on:click={() => saveAdventureToFirebase($currentAdventure)} class="brutalismBorder" class:disabledButton = "{disabledSave}">
            <Icons icon={"save"} size={"small"} color={"white"} />
        </a>
        {/if}
    </div>
</div>
<div class="plannerContent">
    <div class="createAdventureNotesSection">
        <div class="plannerSectionHeader">
            <h4 class="plannerSectionTitle">The Enemy</h4>
            <div class="iconContainer" on:click={() => promptGen(["monster", "offensiveQuirk", "defensiveQuirk"])}>
                <Icons icon={"generate"} size={"medium"} color={"black"} />
            </div>
        </div>
        <textarea on:change={() => enemyChange = true} bind:value={$currentAdventure.notes.enemy} class="createAdventureTextArea brutalismBorder" placeholder="Details the antoganist of this adventure. What is it? Does it have minions? What signs of it couuld be found throughout the dungeon?" rows="6"/>
    </div>
    <div class="createAdventureNotesSection">
        <div class="plannerSectionHeader">
            <h4 class="plannerSectionTitle">The Quest</h4>
            <div class="iconContainer" on:click={() => promptGen(["questLocation", "problem"])}>
                <Icons icon={"generate"} size={"medium"} color={"black"} />
            </div>
        </div>

        <textarea on:change={() => questChange = true} bind:value={$currentAdventure.notes.quest} class="createAdventureTextArea brutalismBorder" placeholder="Detail the hook and context of the adventure. Why is the party doing this? What parties are involved?" rows="6"/>
    </div>
    <div class="createAdventureNotesSection">
        <div class="plannerSectionHeader">
            <h4 class="plannerSectionTitle">The NPC</h4>
            <div class="iconContainer" on:click={() => promptGen(["npc"])}>
                <Icons icon={"generate"} size={"medium"} color={"black"} />
            </div>
        </div>
        <textarea on:change={() => npcChange = true} bind:value={$currentAdventure.notes.npc} class="createAdventureTextArea brutalismBorder" placeholder="Detail the NPC the party will be spending the most time with. What do they look like? How do they speak and act? Why are they in their current situation?" rows="6"/>
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
