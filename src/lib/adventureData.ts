import { writable } from "svelte/store";
import { v4 as uuidv4 } from 'uuid';


export const currentAdventure = writable(null);

export const userAdventures = writable(
    [
        {
            "id": uuidv4(),
            "title": "My first adventure",
            "description": "This is the first description.",
            "notes": {
                "title": "This is the title.",
                "enemy": "This is the enemy.",
                "quest": "This is the quest.",
                "npc": "This is the npc.",
                "goal": "This is the goal.",
                "scene": "This is the scene.",
                "push": "This is the push.",
                "gimmick": "This is the gimmick."
            },
            "map": []
        },
    ]);