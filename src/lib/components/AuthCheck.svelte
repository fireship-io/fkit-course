<script lang="ts">
    import { user } from "$lib/firebase";
  </script>

<style>
  h1 {
    text-transform: uppercase;
  }

  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  p {
      color: var(--batlas-black);
      font-size: 1em;
  }

  .batlasSection {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    padding: 9em 2em;
    width: 100%;
    max-width: 1240px;
    margin-left: auto;
    margin-right: auto;
    gap: 3em;
  }

  .batlasColumn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .batlasColumn h1 {
    font-size: 2em;
    font-weight: 900;
    margin-bottom: 0.5em;
    color: var(--batlas-black)
  }

  .batlasColumn h2 {
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    line-height: 1.2em;
    letter-spacing: 0.05em;
    font-size: 2.8em;
    font-weight: 800;
    margin-bottom: 0.5em;
    color: var(--batlas-black);
    text-shadow: none;
  }

  .singleColumn {
    grid-template-columns: 1fr;
  }

  .doubleColumn {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3em;
  }

  .lostButton {
      font-size: 1.2em;
      font-weight: 600;
      padding: 0.5em 1em;
      text-align: center;
      border: 0.1em solid var(--batlas-white);
      border-radius: 0.3em;
      color: var(--batlas-white);
      text-decoration: none;
  }

  .lostButton:hover {
      text-decoration: underline;
  }

  .fillHeight {
      min-height: 110lvh;
  }

  @media screen and (max-width: 1500px) {
      h2 {
      color: var(--batlas-white);
      }
   }

   @media screen and (max-width: 900px) {
      p {
      font-size: 2.5em;
    }
    .batlasSection {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      padding: 3em 2em;
      max-width: 900px;
      gap: 2em;
    }

    .batlasColumn {
      align-items: center;
      padding: 1em;
    } 

    .batlasColumn h1 {
      font-size: 3em;
    }

    .batlasColumn h2 {
      font-size: 2em;
      text-align: center;
    }

    .batlasColumn p {
      font-size: 1.2em;
      text-align: center;
    }

    .doubleColumn {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: 2em;
    }

   }
</style>
  
  {#if $user}
    <slot />
  {:else}
  <section class="batlasSection singleColumn fillHeight">
    <div class="batlasColumn dungeonBorder">
        <h1>403</h1>
        <h2>What lies beyond was not meant for you</h2>
        <p>You have tried to access a part of the site that requires authorisation that you do not have in your current browser session.</p>
    </div>
    <div class="doubleColumn">
        <div class="batlasColumn">
            <a href="/" class="lostButton">Return home</a>
        </div>
        <div class="batlasColumn">
            <a href="/login" class="lostButton">Log in</a>
        </div>
    </div>
  </section>
  {/if}