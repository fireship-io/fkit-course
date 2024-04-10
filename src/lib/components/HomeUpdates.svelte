<script lang="ts">
  import HomeTutorial from './HomeTutorial.svelte';

    import type { PageData } from '../../routes/(app)/dashboard/$types';
        import { screenChoice, offScreenMenu, activeRule, activeTile, premiumUser, createAlert } from "$lib/dashboardState";
    import { db, userData, auth, user, app } from "$lib/firebase";
    import { collection, query, orderBy, limit, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
  import { onMount } from 'svelte';
  import Divider from './Divider.svelte';
  
  let mostRecentPoll = {options: []};
  let chosenPollOption = null;

  $: userVoted = null;

  const pollsCollection = collection(db, 'polls');




  onMount(async () => {
    mostRecentPoll = await getMostRecentPoll();
    let userVoteData = await checkUserVote();
    console.log(userVoteData);
    userVoted = userVoteData ? userVoteData.option : null;
    chosenPollOption = userVoted;
    console.log(userVoted);
});




async function getMostRecentPoll() {
  const q = query(pollsCollection, orderBy('startDate', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  }

  return null;
}

async function checkUserVote() {
    if (mostRecentPoll && mostRecentPoll.id) {
        const pollVotesRef = collection(db, 'polls', mostRecentPoll.id, 'votes');
        const querySnapshot = await getDocs(pollVotesRef);
        const userVote = querySnapshot.docs.find(doc => doc.id === $user?.uid)?.data();
        return userVote;
    }
    return false;
}

async function createPollVote(optionChosen, userId) {
    const pollVotesRef = collection(db, 'polls', mostRecentPoll.id, 'votes');
    const vote = doc(pollVotesRef, userId);
      await setDoc(vote, {
        option: optionChosen
      });
      createAlert(`Vote saved!`)
}

export let data: PageData;

</script>

<style>
    .updates {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1rem;
        width: 100%;
    }
    

</style>

        <div class="updates">
            <div class="updateHeader">
            <h2>Latest updates</h2>
            <h5>Beta Version 1.0.0</h5>
        </div>
            <Divider />
            <div class="updateBody">
            <p>If you're seeing this please play around and break things.</p>
            <p>I'll be releasing version 1.0 shortly which will put the premium user paywall in place.</p>
            <p>Until then there's an easy toggle in the 'beta bar' at the top of your page that you can use to toggle it in and off. So go crazy and thanks for being here so early on.</p>
        </div>
    </div>

