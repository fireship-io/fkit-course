import { currentAdventureChange } from "$lib/dashboardState";
import { db, user } from "$lib/firebase";
import { doc, setDoc, collection, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { createAlert } from "$lib/dashboardState";

export let disabledSave = false;

export async function saveAdventureToFirebase(currentAdventure, user) {
  console.log("saveAdventureToFirebase fired", currentAdventure);

  const adventuresRef = collection(db, "users", user.uid, "adventures");

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
      map: JSON.stringify(currentAdventure.map),
    });
    createAlert(`${currentAdventure.title} saved!`);
    setTimeout(() => {
      disabledSave = false;
    }, 3000);
  } else {
    console.log("updating new adventure to firebase", currentAdventure);
    const adventureRef = doc(adventuresRef, currentAdventure.adventureId);
    let newUpdateDate = Date.now();
    await setDoc(adventureRef, {
      ...currentAdventure,
      map: JSON.stringify(currentAdventure.map),
      updatedDate: newUpdateDate,
    });
    createAlert(`${currentAdventure.title} updated!`);
    setTimeout(() => {
      disabledSave = false;
    }, 3000);
  }
  currentAdventureChange.set(false);
}

export async function savePremadeAdventureToAccount(currentAdventure, user) {
  console.log("saveAdventureToFirebase fired", currentAdventure);

  const adventuresRef = collection(db, "users", user.uid, "adventures");

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
      map: JSON.stringify(currentAdventure.map),
    });
    createAlert(`${currentAdventure.title} saved!`);
    setTimeout(() => {
      disabledSave = false;
    }, 3000);
  } else {
    console.log("updating new adventure to firebase", currentAdventure);
    const adventureRef = doc(adventuresRef, currentAdventure.adventureId);
    let newUpdateDate = Date.now();
    await setDoc(adventureRef, {
      ...currentAdventure,
      map: JSON.stringify(currentAdventure.map),
      updatedDate: newUpdateDate,
    });
    createAlert(`${currentAdventure.title} updated!`);
    setTimeout(() => {
      disabledSave = false;
    }, 3000);
  }
  currentAdventureChange.set(false);
}

export async function saveNewAdventureToFirebase(newAdventure, user) {
  disabledSave = true;

  const adventuresRef = collection(db, "users", user.uid, "adventures");

  if (newAdventure.title === "") {
    createAlert("Please enter a title for your adventure.");
    return;
  }

  let uniqueId = uuidv4();
  let newUpdateDate = Date.now();

  newAdventure.updatedDate = newUpdateDate;

  newAdventure.adventureId = uniqueId;
  const adventureRef = doc(adventuresRef, newAdventure.adventureId);
  await setDoc(adventureRef, {
    ...newAdventure,
    map: JSON.stringify(newAdventure.map),
  });

  window.location.href = `/dashboard/create/${user?.uid}/${newAdventure.adventureId}`;
}

export async function deleteAdventure(adventure, user) {
  console.log("deleteAdventure fired", adventure, user.uid);
  try {
    let adventureRef = doc(
      db,
      "users",
      user.uid,
      "adventures",
      adventure.adventureId
    );
    await deleteDoc(adventureRef).then(() => {
      createAlert(`${adventure.title} deleted!`);
    });
  } catch (error) {}
}
