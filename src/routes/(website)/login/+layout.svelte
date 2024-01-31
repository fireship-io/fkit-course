<script lang="ts">
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<AnimatedRoute>
  <Header />
      <slot />
  <Footer />
</AnimatedRoute>