<script>
    import { fly} from "svelte/transition";
    import { page } from "$app/stores";
</script>

{#key $page.url}
  <div in:fly={{  x:'-100%', duration: 500 }}>
    <slot  />
  </div>
{/key}