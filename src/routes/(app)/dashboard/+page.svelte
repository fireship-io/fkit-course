<script lang="ts">
    import type { PageData } from './$types';
    import { activeRule } from '$lib/dashboardState';
    import {currentAdventure} from "$lib/adventureData";
    import { map } from "$lib/mapGen";
    import { user } from "$lib/firebase";
    import { onMount } from 'svelte';
    
    export let data: PageData;

</script>