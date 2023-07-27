<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;

    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { user, userData, storage, db } from "$lib/firebase";
    import Content from "$lib/components/AdventureContent.svelte";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
    import Options from "$lib/components/SavedAdventures.svelte";

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
    
    .content {
        grid-column: 2 / 19;
        grid-row: 1 / 2;
        gap: 2em;
        display: grid;
        grid-template-columns: repeat(17, 1fr);
        grid-template-rows: auto;
        max-height: calc(100lvh - 4em);
    }

    @media screen and (max-width: 1500px) {
        .batlasDashboardGrid {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
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
        
        .content {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
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
    <main class="batlasDashboardGrid">
        <section class="navigation">
            <NavigationBar />
        </section>
        <section class="content"><slot /></section>
    </main>
</AuthCheck>