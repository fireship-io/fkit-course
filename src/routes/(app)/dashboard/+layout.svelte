<script lang="ts">
    import type { LayoutData } from './$types';
    import { premiumUser } from "$lib/dashboardState";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
    import OffScreenMenu from "$lib/components/OffScreenMenu.svelte";
    import { map } from "$lib/mapGen";
    import { user } from "$lib/firebase";
    
    export let data: LayoutData;

    let mapArray;
    let mapString;

    map.subscribe(value => {
        mapArray = value;
        mapString = JSON.stringify(mapArray);
    })

    function togglepremiumUser() {
        premiumUser.set(!$premiumUser);
        console.log($user)
    }


</script>


<style>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
   }

    .batlasDashboardGrid {
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        grid-template-columns: (10em, auto);
        grid-template-rows: auto;
        gap: 2em;
        width: 100%;
        overflow-y: scroll;
    }

    .batlasDashboardGrid::-webkit-scrollbar {
        display: none;
    }

    .navigation {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        gap: 2em;
        padding: 0.8em;
        display: flex;
        position: sticky;
        top: 0em;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: calc(100% - 4em);
        max-height: 100lvh;
        background-color: var(--batlas-black);

    }
    
    .contentSlot {
        grid-column: 3 / 19;
        grid-row: 1 / 2;
        gap: 2em;
        margin-top: 0em;
        max-height: none;
        min-height: 800px;
        height: auto;
        width:100%;
        padding: 2em 0em;
        overflow-y: unset;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .contentSlot::-webkit-scrollbar {
        display: none;
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
        gap: 2em;
    }

    .betaBanner p {
        padding: 0em;
        margin: 0em;
        font-size: 0.9em;
        text-transform: uppercase;
    }

    .halfOpacity {
        opacity: 0.5;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    @media (max-width: 1400px) {
        .container {
            max-height: none;
        }
    }


    @media (max-width: 700px) {

        .container {
            max-height: none;
            overflow-y: unset;
        }

        .batlasDashboardGrid {
            flex-direction: column;
            gap:0em;
        }

        .navigation {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
            margin-top: 0;
        }

        .contentSlot {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
            margin-top: 0em;
            max-height: none;
            min-height: auto;
            height: auto;
            overflow-y: scroll;
        }

        .navigation {
            width: 100%;
            height: 100%;
            max-height: 75px;
        }

        .betaBanner {
            position: static;
        }

        .contentSlot {
            padding: 0em;
            margin: 0em;
            height: 100%;
        }
    }
</style>

<AuthCheck>
    <div class="container">
        <div class="betaBanner">
            <p>Batlas is still in beta testing. There will be bugs.</p>
            <div
                class:halfOpacity={!$premiumUser}
                on:click={togglepremiumUser}
                on:keydown={togglepremiumUser}
                role="button"
                tabindex="0">
                <p>|| premium user toggle ||</p>
            </div>
        </div>
        <main class="batlasDashboardGrid">
            <section class="navigation">
                <NavigationBar />
            </section>
            <section class="contentSlot">
                <slot />
            </section>
        </main>
        <OffScreenMenu />
    </div>
</AuthCheck>