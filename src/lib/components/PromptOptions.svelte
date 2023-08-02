<script>
    import { currentAdventure } from "$lib/adventureData";
    import { screenChoice } from "$lib/dashboardState";
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


    function setActive(e) {
        currentAdventure.set({ ...adventureData});
        screenChoice.set("notes");

        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
        e.target.closest('a').classList.toggle("brutalismBorderInverted");
    };

    async function copyContent(targetId) {
        try {
            await navigator.clipboard.writeText(`${document.getElementById(targetId)?.textContent}`);
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    generateMultiplePrompts(["monster", "offensiveQuirk", "defensiveQuirk", "npc", "questLocation", "problem"]);
</script>

<style>

    .savedAdventure {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: auto;
    }


    .savedAdventureOptions {
        display: block;
        grid-column: 9 / 11;
        grid-row: 1 / 3;
        border: 0.2em solid var(--batlas-black);
        height: 100%;
        width: 0.5em;
        background-color: var(--batlas-black);
    }

    .savedAdventure h4 {
        font-size: 1.4em;
        text-decoration: underline;
    }

    .promptOptionContainer {
        background-color: var(--batlas-white);
        display: grid;
        grid-template-columns: 9fr 1fr;
        grid-template-rows: auto;
        padding: 1em;
        gap: 1em;
        width: 100%;
    }

    .icon {
        margin-top: 0.4em;
        max-height: 2em;
        cursor: pointer;
    }

    @media screen and (max-width: 1500px) {

        .savedAdventure {
            display: grid;
            grid-template-columns: 9fr 1fr;
            grid-template-rows: auto;
        }
        .savedAdventure h4{
            font-size: 1.4em;
            margin: 0.2em;
        }

        .savedAdventureTitle {
            grid-column: 1 / 9;
            grid-row: 1 / 2;
        }

        .savedAdventureDescription {
            grid-column: 1 / 9;
            grid-row: 2 / 3;
        }

        .savedAdventureOptions {
        display: block;
        grid-column: 9 / 11;
        grid-row: 1 / 3;
        border: 0.2em solid var(--batlas-black);
        height: 100%;
        width: 0.5em;
        background-color: var(--batlas-black);
        }
    }


</style>
<div class="promptOptionContainer brutalismBorder">
    <div class="savedAdventure">
        <div class="savedAdventureTitle"><h4>Monster</h4></div>
        <div class="savedAdventureDescription">
            <p id="monsterPromptText" class="firstLetter">You're fighting {((vowelCheck($monster.description) ? 'an ' : 'a '))} {$monster.description} with {$offensiveQuirk.description} and {$defensiveQuirk.description}.</p>
        </div>
    </div>
    <div class="icons">
        <svg on:click={() => generateMultiplePrompts(["monster", "offensiveQuirk", "defensiveQuirk"])} class="icon" viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M182.757,40.076c-16.532,-11.399 -36.566,-18.076 -58.147,-18.076c-56.632,0 -102.61,45.978 -102.61,102.61l-22,-0c-0,-68.774 55.836,-124.61 124.61,-124.61c28.705,0 55.157,9.727 76.235,26.062l23.897,-18.515l15.825,85.389l-78.73,-36.651l20.92,-16.209Zm-126.17,188.931l-20.213,20.213l-26.448,-82.717l82.717,26.448l-20.086,20.086c15.264,9.011 33.059,14.183 52.053,14.183c56.632,-0 102.61,-45.978 102.61,-102.61l22,-0c-0,68.774 -55.836,124.61 -124.61,124.61c-25.091,-0 -48.46,-7.432 -68.023,-20.213Z"/></svg>
        <svg on:click={() => copyContent('monsterPromptText')} class="icon" viewBox="0 0 258 329" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M207.992,285.064l-0,13.39c-0,16.337 -13.263,29.599 -29.599,29.599l-148.794,0c-16.336,0 -29.599,-13.262 -29.599,-29.599l0,-222.73c0,-16.336 13.263,-29.599 29.599,-29.599l21.53,0l0,-25.727c0,-11.258 9.235,-20.398 20.611,-20.398l164.884,0c11.375,0 20.61,9.14 20.61,20.398l0,244.268c0,11.258 -9.235,20.398 -20.61,20.398l-28.632,-0Zm-156.863,-216.939l-21.53,0c-4.194,0 -7.599,3.405 -7.599,7.599l-0,222.73c-0,4.194 3.405,7.599 7.599,7.599l148.794,0c4.194,0 7.599,-3.405 7.599,-7.599l-0,-13.39l-114.252,-0c-11.376,-0 -20.611,-9.14 -20.611,-20.398l0,-196.541Zm22,-46.125l0,241.064l162.105,-0l0,-241.064l-162.105,-0Z"/></svg>
    </div>
</div>
<div class="promptOptionContainer brutalismBorder">
    <div class="savedAdventure">
        <div class="savedAdventureTitle"><h4>Quest</h4></div>
        <div class="savedAdventureDescription">
            <p id="questPromptText" class="firstLetter">{$questLocation} {$problem}. They have noticed {$monster.clue}, {$offensiveQuirk.clue}, and {$defensiveQuirk.clue}.</p>
        </div>
    </div>
    <div class="icons">
        <svg on:click={() => generateMultiplePrompts(["questLocation", "problem"])} class="icon" viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M182.757,40.076c-16.532,-11.399 -36.566,-18.076 -58.147,-18.076c-56.632,0 -102.61,45.978 -102.61,102.61l-22,-0c-0,-68.774 55.836,-124.61 124.61,-124.61c28.705,0 55.157,9.727 76.235,26.062l23.897,-18.515l15.825,85.389l-78.73,-36.651l20.92,-16.209Zm-126.17,188.931l-20.213,20.213l-26.448,-82.717l82.717,26.448l-20.086,20.086c15.264,9.011 33.059,14.183 52.053,14.183c56.632,-0 102.61,-45.978 102.61,-102.61l22,-0c-0,68.774 -55.836,124.61 -124.61,124.61c-25.091,-0 -48.46,-7.432 -68.023,-20.213Z"/></svg>
        <svg on:click={() => copyContent('questPromptText')} class="icon" viewBox="0 0 258 329" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M207.992,285.064l-0,13.39c-0,16.337 -13.263,29.599 -29.599,29.599l-148.794,0c-16.336,0 -29.599,-13.262 -29.599,-29.599l0,-222.73c0,-16.336 13.263,-29.599 29.599,-29.599l21.53,0l0,-25.727c0,-11.258 9.235,-20.398 20.611,-20.398l164.884,0c11.375,0 20.61,9.14 20.61,20.398l0,244.268c0,11.258 -9.235,20.398 -20.61,20.398l-28.632,-0Zm-156.863,-216.939l-21.53,0c-4.194,0 -7.599,3.405 -7.599,7.599l-0,222.73c-0,4.194 3.405,7.599 7.599,7.599l148.794,0c4.194,0 7.599,-3.405 7.599,-7.599l-0,-13.39l-114.252,-0c-11.376,-0 -20.611,-9.14 -20.611,-20.398l0,-196.541Zm22,-46.125l0,241.064l162.105,-0l0,-241.064l-162.105,-0Z"/></svg>
    </div>
</div>
<div class="promptOptionContainer brutalismBorder">
    <div class="savedAdventure">
        <div class="savedAdventureTitle"><h4>NPC</h4></div>
        <div class="savedAdventureDescription">
            <p id="npcPromptText" class="firstLetter">A {$npc.descriptor} {$npc.sex} {$npc.race} whose {$npc.personality}.<br> They wear {$npc.clothes}, speak {$npc.speech}, and {$npc.idiosyncrasy}</p>
        </div>
    </div>
    <div class="icons">
        <svg on:click={() => generateMultiplePrompts(["npc"])} class="icon" viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M182.757,40.076c-16.532,-11.399 -36.566,-18.076 -58.147,-18.076c-56.632,0 -102.61,45.978 -102.61,102.61l-22,-0c-0,-68.774 55.836,-124.61 124.61,-124.61c28.705,0 55.157,9.727 76.235,26.062l23.897,-18.515l15.825,85.389l-78.73,-36.651l20.92,-16.209Zm-126.17,188.931l-20.213,20.213l-26.448,-82.717l82.717,26.448l-20.086,20.086c15.264,9.011 33.059,14.183 52.053,14.183c56.632,-0 102.61,-45.978 102.61,-102.61l22,-0c-0,68.774 -55.836,124.61 -124.61,124.61c-25.091,-0 -48.46,-7.432 -68.023,-20.213Z"/></svg>
        <svg on:click={() => copyContent('npcPromptText')} class="icon" viewBox="0 0 258 329" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M207.992,285.064l-0,13.39c-0,16.337 -13.263,29.599 -29.599,29.599l-148.794,0c-16.336,0 -29.599,-13.262 -29.599,-29.599l0,-222.73c0,-16.336 13.263,-29.599 29.599,-29.599l21.53,0l0,-25.727c0,-11.258 9.235,-20.398 20.611,-20.398l164.884,0c11.375,0 20.61,9.14 20.61,20.398l0,244.268c0,11.258 -9.235,20.398 -20.61,20.398l-28.632,-0Zm-156.863,-216.939l-21.53,0c-4.194,0 -7.599,3.405 -7.599,7.599l-0,222.73c-0,4.194 3.405,7.599 7.599,7.599l148.794,0c4.194,0 7.599,-3.405 7.599,-7.599l-0,-13.39l-114.252,-0c-11.376,-0 -20.611,-9.14 -20.611,-20.398l0,-196.541Zm22,-46.125l0,241.064l162.105,-0l0,-241.064l-162.105,-0Z"/></svg>
    </div>
</div>



