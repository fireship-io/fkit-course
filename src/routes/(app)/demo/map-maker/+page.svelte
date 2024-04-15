<script>
    import { currentAdventure } from "$lib/adventureData";
  import DemoMap from "$lib/components/DemoMap.svelte";
  import Map from "$lib/components/Map.svelte";
    import { onMount } from "svelte";
    import { user } from "$lib/firebase";
//     onMount(async () => {

// if ($user) {
//     window.location.href = '/dashboard/create';
// }
// });
  </script>
  
  <style>
      .mapColumn {
          grid-column: 1/18;
          grid-row: 1/3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          max-width: 100%;
      }
  
      @media (max-width: 700px){
          .mapColumn {
          margin: 0em;
          }
      }
  
  </style>
  
  <div class="mapColumn">
      <DemoMap role={"editor"}/>
  </div>
  