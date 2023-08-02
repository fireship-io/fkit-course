<script lang="ts">
    import { user, userData } from "$lib/firebase";
    import { screenChoice } from "$lib/dashboardState";
    import "../app.css";
    
    $screenChoice
    $user;
    $userData; 
</script>

<style>
    .topContainer{
        height: 100vh;
    }
</style>

<div class="topContainer">
    <slot />
</div>
