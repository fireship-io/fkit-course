import { writable } from "svelte/store";

export const screenChoice = writable("notes");
export const offScreenMenu = writable(true);