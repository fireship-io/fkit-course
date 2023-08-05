import { writable } from "svelte/store";

export const screenChoice = writable("adventures");
export const offScreenMenu = writable(true);
export const activeRule = writable("Overview");
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
