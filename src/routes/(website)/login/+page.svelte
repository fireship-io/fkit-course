<script lang="ts">
  import LoginDialogue from '../../../lib/components/LoginDialogue.svelte';

  import { db, userData, auth, user } from "$lib/firebase";
  import { doc, getDoc, writeBatch, deleteDoc } from "firebase/firestore";

  import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, deleteUser, reauthenticateWithCredential, reauthenticateWithPopup } from "firebase/auth";
    import { error } from "@sveltejs/kit";
    import { currentAdventure } from "$lib/adventureData";
    import { screenChoice, createAlert } from "$lib/dashboardState";
  import { onMount } from "svelte";

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

    // setInterval(() => {
    //   if ($user) {
    //     window.location.href = "/dashboard";
    //   }
    // }, 1000)

    let legalToggle = false;

    function alignLegalToggle() {
      let currentLegalToggle = document.getElementById('legalToggleCheckbox');
      legalToggle = currentLegalToggle.checked;
    }

    

</script>

<style>
  .loginScreen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
</style>




<div class="loginScreen">
    <LoginDialogue />
</div>
