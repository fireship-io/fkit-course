import { writable } from "svelte/store";
import { db, user } from "./firebase";

export const screenChoice = writable("adventures");
export const offScreenMenu = writable(true);
export const playMode = writable(false);
export const activeRule = writable({
  title: "Select a category to know more.",
  content: "",
});
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
  document.querySelector(".batlasDashboardGrid").appendChild(alert);
  setTimeout(() => {
    document.querySelector(".batlasDashboardGrid").removeChild(alert);
  }, 3000);
}
