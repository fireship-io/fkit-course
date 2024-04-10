<script lang="ts">
  import { db, userData, auth, user } from "$lib/firebase";
  import { doc, getDoc, writeBatch, deleteDoc, collection, addDoc, onSnapshot, setDoc } from "firebase/firestore";

  import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, deleteUser, reauthenticateWithCredential, reauthenticateWithPopup } from "firebase/auth";
    import { error } from "@sveltejs/kit";
    import { currentAdventure } from "$lib/adventureData";
    import { screenChoice, createAlert, currentAdventureChange } from "$lib/dashboardState";
  import { onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";


  let disabledSave = false;


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
    createUserDoc().then(() => {
      window.location.href = "/dashboard/play/";
    });
  }

  async function signOutSSR() {
    const res = await fetch("/api/signin", { method: "DELETE" });
    await signOut(auth);
  }

  async function createUserDoc() {
    console.log("creating doc");
    const batch = writeBatch(db);
    batch.set(doc(db, "users", $user!.uid), {
      published: true
    });

    await batch.commit();
  }

  async function promptForCredentials() {
    const credential = prompt(
      "Please enter your password to confirm account deletion."
    );
    return credential;
  }

  async function deleteThisUser(thisUser) {
        let userRef = doc(db, "users", thisUser.uid);
        let userSnap = await getDoc(userRef);
        let deleteId = userSnap.id;
        console.log(deleteId, userSnap.data())

        deleteDoc(userRef)
        .then(() => {
            console.log("User successfully deleted!");
            signOutSSR();
        }).catch((error) => {
            console.error("Error removing user: ", error);
        });
    }

  async function handleDeleteUser(thisUser) {
      try {
        await deleteThisUser(thisUser);
      } catch {
        console.log (error)
      } finally {
        createAlert(`Your account has been deleted`)
      }
    }

    setInterval(() => {
      if ($user && window.location.pathname.includes("/demo/map-maker")) {
            saveAdventureToFirebase($currentAdventure);
        } else if ($user) {
          window.location.href = "/dashboard";
        }
    }, 1000)

    let legalToggle = false;

    function alignLegalToggle() {
      let currentLegalToggle = document.getElementById('legalToggleCheckbox');
      legalToggle = currentLegalToggle.checked;
    }

    async function saveAdventureToFirebase(currentAdventure) {
    console.log("saveAdventureToFirebase fired", currentAdventure);

    disabledSave = true;

    const adventuresRef = collection(db, "users", $user.uid, "adventures");

    if (currentAdventure.title === "") {
      createAlert("Please enter a title for your adventure.");
      return;
    }

    if (currentAdventure.adventureId === "") {
      let uniqueId = uuidv4();
      currentAdventure.adventureId = uniqueId;
      console.log("saving new adventure to firebase", currentAdventure);
      const adventureRef = doc(adventuresRef, currentAdventure.adventureId);
      await setDoc(adventureRef, {
        ...currentAdventure,
        map : JSON.stringify(currentAdventure.map)
      });
      createAlert(`${currentAdventure.title} saved!`)
      setTimeout(() => {
          disabledSave = false;
        }, 3000);      
    } else {
      console.log("updating new adventure to firebase", currentAdventure);
      const adventureRef = doc(adventuresRef, currentAdventure.adventureId);
      let newUpdateDate = Date.now();
      await setDoc(adventureRef, {
        ...currentAdventure,
        map : JSON.stringify(currentAdventure.map),
        updatedDate: newUpdateDate
      });
      createAlert(`${currentAdventure.title} updated!`)
      if (window.location.pathname.includes("/demo/map-maker")) {
      window.location.href = "/dashboard/play/";
      }
      setTimeout(() => {
          disabledSave = false;
        }, 3000); 
    }    
    currentAdventureChange.set(false);
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
    color: var(--batlas-white);
  }

  .loginBox a {
    transition: all 0.3 ease;
    margin-top: 1em;
    font-family: 'Poppins', sans-serif;
    border: 0.1em solid var(--batlas-white);
    border-radius: 0.6em;
    font-size: 1em;
    font-weight: 400;
    background-color: var(--batlas-black);
    padding: 0.5em 1em;
    color: var(--batlas-white);
  }

  .loginBox a:hover {
    cursor: pointer;
    background-color: var(--batlas-white);
    color: var(--batlas-black);
  }

  .loginBox h2 {
    color: var(--batlas-white)
  }

  .loginBox p {
    font-size: 0.8em;
    text-align: center;
    margin-top: 3em;
    color: var(--batlas-white);

  }

  label {
    font-size: 1rem;
    text-align: center;
    margin-top: 3rem;
    color: var(--batlas-white);
  }

  a.simpleLink {
    border: none;
    text-decoration: underline;
    background-color: transparent;
    color: var(--batlas-white);
    padding: 0rem;
    text-align: center;
  }

  a.simpleLink:hover {
    cursor: pointer;
    color: var(--batlas-white);
    background-color: transparent;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .legal {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin-top: 1em;
  }

  .legalLabel {
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0rem;
    color: var(--batlas-white);
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

<div class=" loginBox">
      {#if $user}
      <h2>Welcome, {$user.displayName}</h2>
      <p>You will be redirected to your dashboard.</p>
      <a href="/dashboard" >If you aren't redirected, click here</a>
      <!-- <a on:click={signOutSSR}>Sign out</a>
      <a on:click={() => handleDeleteUser($user)}>Delete Account</a> -->
      {:else}
        <h2>Login / Register</h2>
        <a class:disabled={!legalToggle} on:click={signInWithGoogle}>Sign in with Google</a>
        <div class="legal">
          <input name="legal" type="checkbox" id="legalToggleCheckbox" on:change={alignLegalToggle}>
          <label class="legalLabel" for="legal">I agree to the Batlas <a class="simpleLink" href="/legalities" target="_blank">Terms & Conditions, Privacy Policy, and Cyber Security Policy.</a></label>
        </div>
        {/if}
        <p>By signing up or logging in you agree to the Batlas Terms & Conditions, Privacy Policy, and Cyber Security Policy.</p>
    </div>

