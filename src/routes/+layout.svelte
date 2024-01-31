<script lang="ts">;
    import "../app.css";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { currentAdventure } from "$lib/adventureData";

</script>

<style>
    .betaAnnoucement {
        text-align: center;
        font-size: 0.8rem;
        color: var(--batlas-white);
        margin-bottom: 0;
        width: 100%;
        background-color: var(--batlas-black);
        z-index: 999;
    }
</style>
<p class="betaAnnoucement">This is a beta version of the app. Payment is in test mode and there will be bugs. Please use at your own discretion.</p>

<slot />
