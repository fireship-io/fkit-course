<script lang="ts">;
    import "../app.css";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { currentAdventure } from "$lib/adventureData";

    $: console.log('currentAdventure changed', $currentAdventure);

</script>


<slot />
