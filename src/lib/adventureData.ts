import { writable } from "svelte/store";
import { v4 as uuidv4 } from 'uuid';
import { onMount } from "svelte";
import { db, user } from "./firebase";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";


export const currentAdventure = writable({
    title: "",
    notes:
    {
        enemy: "",
        quest: "",
        npc: "",
        goal: "",
        scene: "",
        push: "",
        gimmick: ""
    },
    map: "",
    userId: "",
    adventureId: "",
});


export const playAdventureCurrent = writable(false);
export const adventureListStore = writable([]);