import { writable } from "svelte/store";

export const screenChoice = writable("adventures");
export const offScreenMenu = writable(true);
export const activeRule = writable({
    "title": "Select a category to know more.",
    "content": ""
});
export const activeTileOptions = writable({
        "rowIndex": null,
        "columnIndex": null,
        "tileOptions": null
});

export function setActiveTileOptions(tile, rowIndex, columnIndex) {
    activeTileOptions.set({
        "rowIndex": rowIndex,
        "columnIndex": columnIndex,
        "tileOptions": tile.tileOptions
    });
};

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
