<script>

    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { user, userData, storage, db } from "$lib/firebase";
    import Content from "./AdventureContent.svelte";
    import NavigationBar from "./NavigationBar.svelte";
    import Options from "./SavedAdventures.svelte";

</script>

<style>

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

    .batlasDashboardGrid {
        display: grid;
        grid-template-columns: repeat(18, 1fr);
        grid-template-rows: auto;
        height: 100lvh;
        gap: 2em;
    }

    .navigation {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        gap: 2em;
        padding: 0.8em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    
    .options {
        grid-column: 3 / 7;
        grid-row: 1 / 2;
        gap: 2em;
        padding: 0.8em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .content {
        grid-column: 6 / 19;
        grid-row: 1 / 2;
        gap: 2em;
        padding: 0.8em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

</style>

<main class="batlasDashboardGrid">
    <section class="navigation">
        <NavigationBar />
    </section>
    <section class="options dungeon"><Options/></section>
    <section class="content"><Content/></section>
</main>