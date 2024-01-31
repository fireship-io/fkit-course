<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { page } from '$app/stores';

    let landing = $page.url.pathname === '/new-landing';

</script>

{#if landing}
    <slot />
{:else}
    <slot />
{/if}