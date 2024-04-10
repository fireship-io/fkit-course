<script>
    import { currentAdventure, playAdventureCurrent } from "$lib/adventureData";
    import { screenChoice, createAlert } from "$lib/dashboardState";
    import { error } from "@sveltejs/kit";
    import { db, user } from "$lib/firebase";
    import Icons from '$lib/components/Icons.svelte';
    
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
        window.location.href = `/dashboard/player/${$user.uid}/${adventure.adventureId}`;
    }
</script>

<style>

    .savedAdventure {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 12rem;
        min-width: 10rem;
        height: 100%;
        padding: 1rem;
        gap: 1rem;
        background: var(--batlas-white);
        z-index: 5;
    }


    .savedAdventureOptions {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.6em;
        text-transform: uppercase;
    }

    .savedAdventureOptions div {
        margin: 0;
        border: 0.2em solid var(--batlas-black);
        width: 100%;
        padding: 0.2em 0.6em;
        border-radius: 0.6em;
        background-color: var(--batlas-white);
        color: var(--batlas-black);
        text-align:center;
        text-decoration: none;
        z-index: 100;
        gap: 0.6em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        transition: all 0.2s ease-in-out;
    }

    .savedAdventureOptions div:hover {
        transform: translateY(-0.2em);
    }

    .savedAdventureOptions div p{
        margin: 0;
        font-size: 0.8em;
        line-height: 0.8em;
    }

    .savedAdventureOptions div:hover {
        text-decoration: underline;
        cursor: pointer;
    }

        .savedAdventure h4{
            font-size: 1.3em;
        }

        .savedAdventureOptions {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        height: 100%;
        width: 100%;
        order: 1;
        background-color: var(--batlas-white);
        }

        .savedAdventureOptions div {
            display: flex;
            flex-direction: row;
            min-width: 3em;
            width: 100%;
            height: 100%;
        }

        .adventureBlurb {
            width: 100%;
            max-height: 5em;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        div.copy {
            grid-column: 1/2;
            grid-row: 2/3;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            background-color: var(--batlas-black);
            color: var(--batlas-white);
        }

        div.preview {
            grid-column: 1/2;
            grid-row: 1/2;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            background-color: var(--batlas-black);
            color: var(--batlas-white);
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

        @media (max-width: 735px) {
            .savedAdventure {
                width: 100%;
                max-width: 100%;
            }
        }

</style>
    
<a class="savedAdventure brutalismBorder">
    <div class="savedAdventureTitle">
        <h4>{adventure.title}</h4>
    </div>
    <div class="savedAdventureOptions">
    <div class="preview">
        <Icons icon={"d20"} size={"large"} color={"white"} />
        <p>Preview</p>
    </div>
    <div class="copy">
        <Icons icon={"rules"} size={"large"} color={"white"} />
        <p>Copy</p>
    </div>
</a>
