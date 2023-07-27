<script>
    import { userData } from "$lib/firebase";
    import { redirect } from "@sveltejs/kit";
    import UserDashboard from "$lib/components/UserDashboard.svelte";
    import { goto } from "$app/navigation";

    function redirectToDashboard() {
        goto("/dashboard");
    }

  </script>
  
  <svelte:head>
    <title>Batlas - Isometric Adventures</title>
    <meta name="description" content="Isometric Adventure Generator and TTRPG" />
  </svelte:head>

  {#if $userData?.username}
    {redirectToDashboard()}
  {:else}
  
  <main class="flex w-full min-h-screen">
  
    <div class="hero bg-base-200">
      <div class="hero-content text-center">
        <div class="w-full">
          <h1 class="text-7xl font-bold">Batlas</h1>
          <p>You're missing out, Batlas is really great!</p>
          <p>This is where the marketing site will go.</p>
          <p>I want the site to give off this vibe:</p>
          <img src="https://i.pinimg.com/564x/91/84/4a/91844ac9ee26ebc219188f79bd61e9fb.jpg" alt="Aesthetic" />
            <a href="/login" class="btn btn-primary">Get Started</a>
          </div>
        </div>
      </div>
      
    </main>
  {/if}
  
  