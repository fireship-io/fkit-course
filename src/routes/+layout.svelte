<script lang="ts">
   import { user, userData } from "$lib/firebase";
    import "../app.css";
   interface Props {
      children?: import('svelte').Snippet;
   }

   let { children }: Props = $props();


   $user;
   $userData; 
</script>

<div class="min-h-screen flex flex-col">
    {@render children?.()}
</div>
