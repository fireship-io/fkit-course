import { writable } from "svelte/store";
import { db, user } from "./firebase";
import { doc, setDoc, collection } from "firebase/firestore";

export const screenChoice = writable("adventures");
export const offScreenMenu = writable(true);
export const playMode = writable(false);
export const activeRule = writable({
  title: "Select a rule to know more.",
  content: "",
});

export const premiumUser = writable(false);
export const userAdventureCount = writable(0);
export const currentAdventureChange = writable(false);

export const activeTile = writable({
  rowIndex: null,
  columnIndex: null,
  tileOptions: null,
  tileTitle: "",
  tileNotes: "",
  fogOfWar: null,
});

export function setActiveTile(tile, rowIndex, columnIndex) {
  console.log("setActiveTileOptions", tile, rowIndex, columnIndex);
  activeTile.set({
    rowIndex: rowIndex,
    columnIndex: columnIndex,
    tileOptions: tile.tileOptions,
    tileTitle: tile.tileTitle,
    tileNotes: tile.tileNotes,
    fogOfWar: tile.fogOfWar,
  });
}

export function createAlert(message) {
  let alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("alertActive");
  alert.classList.add("slide-in-alert");
  alert.innerHTML = `<p>${message}</p>`;
  alert.id = "titleAlert";
  document.querySelector("body").appendChild(alert);
  setTimeout(() => {
    document.querySelector("body").removeChild(alert);
  }, 7000);
}
