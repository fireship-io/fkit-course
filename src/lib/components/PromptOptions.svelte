<script>
    import { currentAdventure } from "$lib/adventureData";
    import { screenChoice } from "$lib/dashboardState";

    $currentAdventure

    function setActive(e) {
        currentAdventure.set({ ...adventureData});
        screenChoice.set("notes");

        document.querySelectorAll('.savedAdventure').forEach((element) => {
            element.classList.remove("brutalismBorderInverted");
        });
        e.target.closest('a').classList.toggle("brutalismBorderInverted");
    }
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
        grid-template-columns: 1fr 8fr 1fr;
        grid-template-rows: auto;
        padding: 1em;
        gap: 1em;
        width: 100%;
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
    <svg class="icon" viewBox="0 0 133 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M52.376,79.218l0,-19.043c-10.535,-5.152 -17.798,-15.977 -17.798,-28.486c-0,-17.49 14.199,-31.689 31.689,-31.689c17.489,-0 31.688,14.199 31.688,31.689c0,12.509 -7.263,23.334 -17.798,28.486l-0,19.043l52.376,-0l0,21.798l-34.578,-0l0,105.32l-31.688,53.158l-31.689,-53.158l-0,-105.32l-34.578,-0l0,-21.798l52.376,-0Zm2.112,19.889c0.059,0.629 0.09,1.265 0.09,1.909l-0,99.811c-0,0 11.689,19.608 11.689,19.608l11.688,-19.608l0,-99.811c0,-0.644 0.031,-1.28 0.09,-1.909c-4.556,-0.478 -8.656,-2.485 -11.778,-5.5c-3.123,3.015 -7.223,5.022 -11.779,5.5Zm11.779,-53.323c1.48,-1.429 3.195,-2.643 5.104,-3.576c3.893,-1.904 6.584,-5.898 6.584,-10.519c0,-6.451 -5.237,-11.689 -11.688,-11.689c-6.452,0 -11.689,5.238 -11.689,11.689c-0,4.621 2.691,8.615 6.584,10.519c1.909,0.933 3.624,2.147 5.105,3.576Z"/></svg>
    <div class="savedAdventure">
        <div class="savedAdventureTitle"><h4>Monster</h4></div>
        <div class="savedAdventureDescription">The prompt is generated here.</div>
    </div>
    <svg class="icon" viewBox="0 0 133 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M52.376,79.218l0,-19.043c-10.535,-5.152 -17.798,-15.977 -17.798,-28.486c-0,-17.49 14.199,-31.689 31.689,-31.689c17.489,-0 31.688,14.199 31.688,31.689c0,12.509 -7.263,23.334 -17.798,28.486l-0,19.043l52.376,-0l0,21.798l-34.578,-0l0,105.32l-31.688,53.158l-31.689,-53.158l-0,-105.32l-34.578,-0l0,-21.798l52.376,-0Zm2.112,19.889c0.059,0.629 0.09,1.265 0.09,1.909l-0,99.811c-0,0 11.689,19.608 11.689,19.608l11.688,-19.608l0,-99.811c0,-0.644 0.031,-1.28 0.09,-1.909c-4.556,-0.478 -8.656,-2.485 -11.778,-5.5c-3.123,3.015 -7.223,5.022 -11.779,5.5Zm11.779,-53.323c1.48,-1.429 3.195,-2.643 5.104,-3.576c3.893,-1.904 6.584,-5.898 6.584,-10.519c0,-6.451 -5.237,-11.689 -11.688,-11.689c-6.452,0 -11.689,5.238 -11.689,11.689c-0,4.621 2.691,8.615 6.584,10.519c1.909,0.933 3.624,2.147 5.105,3.576Z"/></svg>
</div>
<div class="promptOptionContainer brutalismBorder">
    <svg class="icon" viewBox="0 0 133 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M52.376,79.218l0,-19.043c-10.535,-5.152 -17.798,-15.977 -17.798,-28.486c-0,-17.49 14.199,-31.689 31.689,-31.689c17.489,-0 31.688,14.199 31.688,31.689c0,12.509 -7.263,23.334 -17.798,28.486l-0,19.043l52.376,-0l0,21.798l-34.578,-0l0,105.32l-31.688,53.158l-31.689,-53.158l-0,-105.32l-34.578,-0l0,-21.798l52.376,-0Zm2.112,19.889c0.059,0.629 0.09,1.265 0.09,1.909l-0,99.811c-0,0 11.689,19.608 11.689,19.608l11.688,-19.608l0,-99.811c0,-0.644 0.031,-1.28 0.09,-1.909c-4.556,-0.478 -8.656,-2.485 -11.778,-5.5c-3.123,3.015 -7.223,5.022 -11.779,5.5Zm11.779,-53.323c1.48,-1.429 3.195,-2.643 5.104,-3.576c3.893,-1.904 6.584,-5.898 6.584,-10.519c0,-6.451 -5.237,-11.689 -11.688,-11.689c-6.452,0 -11.689,5.238 -11.689,11.689c-0,4.621 2.691,8.615 6.584,10.519c1.909,0.933 3.624,2.147 5.105,3.576Z"/></svg>
    <div class="savedAdventure">
        <div class="savedAdventureTitle"><h4>Quest</h4></div>
        <div class="savedAdventureDescription">The prompt is generated here.</div>
    </div>
    <svg class="icon" viewBox="0 0 133 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M52.376,79.218l0,-19.043c-10.535,-5.152 -17.798,-15.977 -17.798,-28.486c-0,-17.49 14.199,-31.689 31.689,-31.689c17.489,-0 31.688,14.199 31.688,31.689c0,12.509 -7.263,23.334 -17.798,28.486l-0,19.043l52.376,-0l0,21.798l-34.578,-0l0,105.32l-31.688,53.158l-31.689,-53.158l-0,-105.32l-34.578,-0l0,-21.798l52.376,-0Zm2.112,19.889c0.059,0.629 0.09,1.265 0.09,1.909l-0,99.811c-0,0 11.689,19.608 11.689,19.608l11.688,-19.608l0,-99.811c0,-0.644 0.031,-1.28 0.09,-1.909c-4.556,-0.478 -8.656,-2.485 -11.778,-5.5c-3.123,3.015 -7.223,5.022 -11.779,5.5Zm11.779,-53.323c1.48,-1.429 3.195,-2.643 5.104,-3.576c3.893,-1.904 6.584,-5.898 6.584,-10.519c0,-6.451 -5.237,-11.689 -11.688,-11.689c-6.452,0 -11.689,5.238 -11.689,11.689c-0,4.621 2.691,8.615 6.584,10.519c1.909,0.933 3.624,2.147 5.105,3.576Z"/></svg>
</div>
<div class="promptOptionContainer brutalismBorder">
    <svg class="icon" viewBox="0 0 133 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M52.376,79.218l0,-19.043c-10.535,-5.152 -17.798,-15.977 -17.798,-28.486c-0,-17.49 14.199,-31.689 31.689,-31.689c17.489,-0 31.688,14.199 31.688,31.689c0,12.509 -7.263,23.334 -17.798,28.486l-0,19.043l52.376,-0l0,21.798l-34.578,-0l0,105.32l-31.688,53.158l-31.689,-53.158l-0,-105.32l-34.578,-0l0,-21.798l52.376,-0Zm2.112,19.889c0.059,0.629 0.09,1.265 0.09,1.909l-0,99.811c-0,0 11.689,19.608 11.689,19.608l11.688,-19.608l0,-99.811c0,-0.644 0.031,-1.28 0.09,-1.909c-4.556,-0.478 -8.656,-2.485 -11.778,-5.5c-3.123,3.015 -7.223,5.022 -11.779,5.5Zm11.779,-53.323c1.48,-1.429 3.195,-2.643 5.104,-3.576c3.893,-1.904 6.584,-5.898 6.584,-10.519c0,-6.451 -5.237,-11.689 -11.688,-11.689c-6.452,0 -11.689,5.238 -11.689,11.689c-0,4.621 2.691,8.615 6.584,10.519c1.909,0.933 3.624,2.147 5.105,3.576Z"/></svg>
    <div class="savedAdventure">
        <div class="savedAdventureTitle"><h4>NPC</h4></div>
        <div class="savedAdventureDescription">The prompt is generated here.</div>
    </div>
    <svg class="icon" viewBox="0 0 133 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M52.376,79.218l0,-19.043c-10.535,-5.152 -17.798,-15.977 -17.798,-28.486c-0,-17.49 14.199,-31.689 31.689,-31.689c17.489,-0 31.688,14.199 31.688,31.689c0,12.509 -7.263,23.334 -17.798,28.486l-0,19.043l52.376,-0l0,21.798l-34.578,-0l0,105.32l-31.688,53.158l-31.689,-53.158l-0,-105.32l-34.578,-0l0,-21.798l52.376,-0Zm2.112,19.889c0.059,0.629 0.09,1.265 0.09,1.909l-0,99.811c-0,0 11.689,19.608 11.689,19.608l11.688,-19.608l0,-99.811c0,-0.644 0.031,-1.28 0.09,-1.909c-4.556,-0.478 -8.656,-2.485 -11.778,-5.5c-3.123,3.015 -7.223,5.022 -11.779,5.5Zm11.779,-53.323c1.48,-1.429 3.195,-2.643 5.104,-3.576c3.893,-1.904 6.584,-5.898 6.584,-10.519c0,-6.451 -5.237,-11.689 -11.688,-11.689c-6.452,0 -11.689,5.238 -11.689,11.689c-0,4.621 2.691,8.615 6.584,10.519c1.909,0.933 3.624,2.147 5.105,3.576Z"/></svg>
</div>

