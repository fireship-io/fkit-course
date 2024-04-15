<script lang="ts">
import { page } from '$app/stores';
import { db, user } from "$lib/firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { writable } from "svelte/store";
import { premiumUser } from "$lib/dashboardState";
  import { onMount } from 'svelte';



let checkingUserStatus = false;

onMount(() => {
  setTimeout(() => {
    checkingUserStatus = true;
  }, 1000);
});

export async function checkPremiumStatus(user) {
  console.log("checking premium status", user.uid);
  const subscriptions = await getDocs(collection(db, "users", user.uid, "subscriptions"));
  subscriptions.forEach((doc) => {
    let document = doc.data();
    console.log(document);
    if (document.status === "active") {
      premiumUser.set(true);
    } else {
      premiumUser.set(false);
    }
  });
  console.log("premium status checked", $premiumUser);
};

$: {
  if ($user) {
    checkPremiumStatus($user);
  }
}

  </script>

<style>

  .authCheck {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    padding: 3rem;
    border-radius: 0.5rem;
    max-width: 600px;
    text-align: center;
  }

  .authCheck h1 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .userCheck {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    opacity: 0;
    transition: opacity 0.5s;
    will-change: opacity;
  }

  .userCheck.active {
    opacity: 1;
  }

  .doubleColumn {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    margin-top: 2rem;
  }

  .doubleColumn a {
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    border: 0.1rem solid var(--batlas-white);
    background-color: var(--batlas-black);
    color: var(--batlas-white);
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.3s;
  }

  .doubleColumn a:hover {
    background-color: var(--batlas-white);
    color: var(--batlas-black);
  }

</style>
  
  {#if $user}
    <slot />
  {:else if !$user}
    {#if $page.url.href.includes("/player/")}
    <section class="userCheck" class:active = {checkingUserStatus}>
      <div class="authCheck">
        <h1>403 unauthorised access</h1>
          <h2>You need an account to play</h2>
          <p>It's easy to sign up, just link your google account below.</p>
      </div>
      <div class="doubleColumn">
              <a href="/login" class="lostButton">Take up your sword<br>(Log in/Sign up)</a>
      </div>
    </section>
    {:else}
    <section class="userCheck" class:active = {checkingUserStatus}>
      <div class="authCheck">
        <h1>403 unauthorised access</h1>
          <h2>You need a different key for this door</h2>
          <p>You have tried to access a part of the site that requires authorisation that you do not have in your current browser session.</p>
      </div>
      <div class="doubleColumn">
              <a href="/" class="lostButton">Leave the dungeon<br>(Return home)</a>
              <a href="/login" class="lostButton">Take up your sword<br>(Log in/Sign up)</a>
      </div>
    </section>
    {/if}
  {/if}