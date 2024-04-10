<script lang="ts">
    import type { LayoutData } from './$types';
    import { premiumUser } from "$lib/dashboardState";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
    import { map } from "$lib/mapGen";
    import { user } from "$lib/firebase";
    import { currentAdventure } from '$lib/adventureData';
    
    export let data: LayoutData;

    let mapArray;
    let mapString;

    map.subscribe(value => {
        mapArray = value;
        mapString = JSON.stringify(mapArray);
    })



</script>


<style>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
        width: 100%;
   }

    .batlasDashboard {
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
    }

    .batlasDashboard::-webkit-scrollbar {
        display: none;
    }

    .navigation {
        gap: 2rem;
        display: flex;
        position: sticky;
        top: 0rem;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        max-height: 100lvh;
        background-color: var(--batlas-black);
        border: 1px solid lime;
    }
    
    .contentSlot {
        height: 100%;
        display: block;
        border: 1px solid fuchsia;
    }


    @media (max-width: 1400px) {
        .container {
            max-height: none;
        }
    }


    @media (max-width: 735px) {

        .container {
            max-height: none;
            overflow: visible;
            height: 100%;
            min-height: 50vh;
        }

        .navigation {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
            margin-top: 0;
            width: 100%;
            max-width: 100%;
            max-height: none;
            position: fixed;
            top: 0rem;
            z-index: 999;
        }

        .contentSlot {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
            margin-top: 0rem;
            max-height: none;
            min-height: auto;
            height: 100%;
            overflow-y: scroll;
            width: 100%;
            max-width: 100%;
            margin-top: 75px;
        }

        .navigation {
            width: 100%;
            height: 100%;
            max-height: 75px;
        }


        .contentSlot {
            padding: 0rem;
            height: 100%;
            max-height: none;
        }
    }
</style>

<AuthCheck>
    <div class="container">
        <main class="batlasDashboard">
            {#if $user}
            <section class="navigation">
                <NavigationBar />
            </section>
            {/if}
            <section class="contentSlot noScrollbar">
                <slot />
            </section>
        </main>
    </div>
</AuthCheck>