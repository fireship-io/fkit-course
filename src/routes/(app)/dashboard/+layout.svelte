<script lang="ts">
    import type { LayoutData } from './$types';
    import { screenChoice } from "$lib/dashboardState";
    
    export let data: LayoutData;

    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { user, userData, storage, db } from "$lib/firebase";
    import Content from "$lib/components/AdventureContent.svelte";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
    import OffScreenMenu from "$lib/components/OffScreenMenu.svelte";
    import { currentAdventure } from "$lib/adventureData";
    import { onMount } from 'svelte';
    import { map } from "$lib/mapGen";

    let mapArray;
    let mapString;


    map.subscribe(value => {
        mapArray = value;
        mapString = JSON.stringify(mapArray);
    })


</script>


<style>

    .batlasDashboardGrid {
        display: grid;
        grid-template-columns: repeat(18, 1fr);
        grid-template-rows: auto;
        height: 100lvh;
        gap: 2em;
    }

    .navigation {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        gap: 2em;
        padding: 0.8em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: calc(100% - 4em);
        margin-top:2em;

    }
    
    .contentSlot {
        grid-column: 2 / 19;
        grid-row: 1 / 2;
        gap: 2em;
        display: grid;
        grid-template-columns: repeat(17, 1fr);
        grid-template-rows: 1fr 9fr;
        margin-top: 2em;
        max-height: calc(100% - 2em);
        height: 100%;
    }

    .betaBanner {
        background-color: var(--batlas-black);
        color: var(--batlas-white);
        border: 0.1em solid var(--batlas-white);
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0em;
        left: 0em;
        width: 100%;
    }

    .betaBanner p {
        padding: 0em;
        margin: 0em;
        font-size: 0.9em;
        text-transform: uppercase;
    }

    @media screen and (max-width: 1500px) {
        .batlasDashboardGrid {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 12fr;
            height: 100lvh;
            width: 100%;
            gap: 0em;
            flex-grow: 1;
        }

        .navigation {
            position: sticky;
            top: 0;
            width: 100%;
            height: auto;
            color: var(--batlas-white);
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            gap: 0em;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            margin: 0em;
            background-color: var(--batlas-black);
        }
        
        .contentSlot {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            margin-top: 0em;
            grid-column: 1 / 2;
            grid-row: 2 / 3;
            gap: 2em;
            display: flex;
            max-height: 100%;
            height: 100%;
            overflow-y: hidden;
            }
    }

</style>

<AuthCheck>
    <div class="betaBanner"><p>Batlas is still in beta testing. There will be bugs.</p></div>
    <main class="batlasDashboardGrid">
        <section class="navigation">
            <NavigationBar />
        </section>
        <section class="contentSlot"><slot /></section>
    </main>
    <OffScreenMenu></OffScreenMenu>
</AuthCheck>