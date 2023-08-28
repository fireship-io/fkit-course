<script>
    import Footer from "$lib/components/Footer.svelte";
import Header from "$lib/components/Header.svelte";

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
        font-size: 1.3em;
        font-weight: 600;
        padding: 1em 2em;
    }

    .lostButton a {
        color: var(--batlas-white);
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
        padding: 12em 2em;
        max-width: 900px;
        gap: 6em;
      }

      .batlasColumn {
        align-items: flex-start;
      } 
     }
</style>

<section class="batlasSection singleColumn fillHeight">
    <div class="batlasColumn dungeonBorder">
        <h1>404</h1>
        <h2>You seem to have lost your way</h2>
        <p>You enter a web page with nothing in it but two buttons. You have a mouse, a keyboard, and a brave heart.</p>
    </div>
    <div class="doubleColumn">
        <div class="batlasColumn lostButton">
            <a href="/">"I want to find my way home"</a>
        </div>
        <div class="batlasColumn lostButton">
            <a href="/login">"I want to log in"</a>
        </div>
    </div>
  </section>
