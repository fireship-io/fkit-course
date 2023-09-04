<script lang="ts">
  import { db, userData, auth, user } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

  import { GoogleAuthProvider, signInWithPopup, signOut, deleteUser, reauthenticateWithCredential } from "firebase/auth";

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);

    const idToken = await credential.user.getIdToken();

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
      },
      body: JSON.stringify({ idToken }),
    });
    createUserDoc();
  }

  async function signOutSSR() {
    const res = await fetch("/api/signin", { method: "DELETE" });
    await signOut(auth);
  }

  async function createUserDoc() {
    console.log("creating doc");
    const batch = writeBatch(db);
    batch.set(doc(db, "users", $user!.uid), {
      published: true,
      bio: "New User",
      adventures: [
        {
          title: "Test Adventure Title"
        },
      ],
    });

    await batch.commit();
  }


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

  .batlasSection h2 {
    text-align: center;
  }

  .batlasColumn {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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

  .loginBox {
    padding: 3em;
    padding-bottom: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 30em;

  }

  .loginBox a {
    margin-top: 1em;
    font-family: 'Poppins', sans-serif;
    border: 0.2em solid var(--batlas-black);
    font-size: 1.3em;
    font-weight: 600;
    background-color: var(--batlas-white);
    padding: 0.5em 1em;
    color: var(--batlas-black)
  }

  .loginBox a:hover {
    cursor: pointer;
    background-color: var(--batlas-black);
    color: var(--batlas-white);
  }

  .loginBox p {
    font-size: 0.8em;
    text-align: center;
    margin-top: 3em;
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
      align-items: center;
      font-size: 2em;
    } 
   }
</style>




<div class="batlasSection singleColumn fillHeight">
  <div class="batlasColumn">
    <div class=" loginBox dungeonBorder">
      {#if $user}
      <h2>Welcome, {$user.displayName}</h2>
      <p>You are logged in</p>
      <a href="/dashboard" >Dashboard</a>
      <a on:click={signOutSSR}>Sign out</a>
      <a on:click={() => deleteAccount(auth.currentUser)}>Delete Account</a>
      {:else}
        <h2>Login</h2>
        <a on:click={signInWithGoogle}>Sign in with Google</a>
      {/if}
        <p>By signing up or logging in you agree to the Batlas Terms & Conditions, Privacy Policy, and Cyber Security Policy.</p>
    </div>
  </div>
</div>
