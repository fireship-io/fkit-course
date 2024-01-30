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
        width: 100%;
        overflow: hidden;
   }

    .batlasDashboardGrid {
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        grid-template-columns: (auto, auto);
        grid-template-rows: auto;
        width: 100%;
        overflow-y: scroll;
    }

    .batlasDashboardGrid::-webkit-scrollbar {
        display: none;
    }

    .navigation {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        gap: 2rem;
        display: flex;
        position: sticky;
        top: 0rem;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 100%;
        max-width: 12rem;
        max-height: 100lvh;
        background-color: var(--batlas-black);

    }
    
    .contentSlot {
        grid-column: 3 / 19;
        grid-row: 1 / 2;
        gap: 2rem;
        margin-top: 0rem;
        max-height: none;
        height: 100%;
        width:100%;
        max-width: calc(100vw - 12rem);
        overflow-y: unset;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .contentSlot::-webkit-scrollbar {
        display: none;
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

        .batlasDashboardGrid {
            flex-direction: column;
            gap: 0rem;
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
        <main class="batlasDashboardGrid">
            {#if $user}
            <section class="navigation">
                <NavigationBar />
            </section>
            {/if}
            <section class="contentSlot">
                <slot />
            </section>
        </main>
        <OffScreenMenu />
    </div>
</AuthCheck>