<script>
    import { currentAdventure, playAdventureCurrent } from "$lib/adventureData";
    import { screenChoice, createAlert } from "$lib/dashboardState";
    import { error } from "@sveltejs/kit";
    import { db, user } from "$lib/firebase";
    import Icons from '$lib/components/Icons.svelte';
  import { saveNewAdventureToFirebase } from "$lib/firebaseFunctions";
  import { v4 as uuidv4 } from 'uuid';
    
    export let adventure;

    function setActive(e) {
        playAdventureCurrent.set(true);
        currentAdventure.set({ ...adventure});
        console.log("currentAdventure on adventure set", $currentAdventure)
        screenChoice.set("playAdventureNotes");

        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
        e.target.closest('a').classList.toggle("brutalismBorderInverted");
    }

    function playPremadeAdventure() {;
        currentAdventure.set({ ...adventure});
        window.location.href = `/dashboard/dungeons/${adventure.dungeonId}`;

    }

    async function handlePremadeCopy() {
        let newAdventureId = uuidv4();
        adventure.dungeonId = newAdventureId;
        await saveNewAdventureToFirebase(adventure, $user).then(() => {
            window.location.href = `/dashboard/play/`;
        }).catch((e) => {
        });
    }
</script>

<style>


    .button p {
        text-align: left;
        margin: 0;
        align-self: center;
    }


    .button.blackButton {
        display: flex;
        flex-direction: row;
        flex: 1;
        gap: 0.75rem;
        border: 0.1rem solid var(--batlas-white);
        padding: 0.5rem 0.75rem;
    }

    .savedAdventure {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex: 1;
        min-width: 15em;
        width: 100%;
        max-width: 30rem;
        padding: 1rem;
        gap: 1rem;
        z-index: 5;
        color: var(--batlas-white);
        padding: 0.25rem 1rem;
        font-weight: normal;
    }


    .savedAdventureOptions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        text-transform: uppercase;
    }

    .savedAdventureOptions .button.blackButton {
        border: none;
    }

    .savedAdventureTitle {
       display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex: 0;
        gap: 0.5rem;
        text-transform: uppercase;
    }

    .savedAdventureTitle:hover p{
        cursor: pointer;
        text-decoration: underline;
    }

    .savedAdventureTitle p {
        font-size: 1.2rem;
        text-transform: uppercase;
        color: var(--batlas-white);
        margin: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

        .deleteConfirmation {
            position: fixed;
            top: calc(50% - 5em);
            left: calc(50% - 10em);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1em;
            width: 20em;
            height: 10em;
            background-color: var(--batlas-white);
            color: var(--batlas-black);
            padding: 1em;
            border-radius: 1em;
            z-index: 100;
            text-align: center;
        }

        .deleteConfirmationButtons {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 1em;
            width: 100%;
            height: 100%;
        }

        .deleteConfirmationButtons div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 1em;
            width: 100%;
            height: 3em;
            background-color: var(--batlas-black);
            color: var(--batlas-white);
            padding: 0.5em;
            border-radius: 0.6em;
            text-transform: uppercase;
            font-size: 0.8em;
            line-height: 0.8em;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }

        .deleteConfirmationButtons div:hover {
            transform: translateY(-0.2em);
        }

        .copy:hover p{
            cursor: pointer;
            text-decoration: underline;
        }


</style>
    
<a class="savedAdventure blackBox">
    <div class="savedAdventureTitle" on:click={playPremadeAdventure}>
        <p>{adventure.title}</p>
    </div>
    <div class="savedAdventureOptions">
    <div class="copy" on:click={handlePremadeCopy}>
        <p>Copy</p>
    </div>
</a>
