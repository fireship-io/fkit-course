import { writable } from "svelte/store";

export const currentAdventure = writable(null);

export const userAdventures = writable(
    [
        {
            "id": 1,
            "title": "My first adventure",
            "description": "This is the first description.",
            "notes": {
                "prompts": "This is the prompt text.",
                "beginning": "This is the beginning text.",
                "middle": "This is the middle text.",
                "end": "This is the end text."
            }
        },
        {
            "id": 2,
            "title": "Goblin Boblin'",
            "description": "This is the second description.",
            "notes": {
                "prompts": "This is the goblin prompt text.",
                "beginning": "This is the goblin beginning text.",
                "middle": "This is the goblin middle text.",
                "end": "This is the goblin end text."
            }
        },
        {
            "id": 3,
            "title": "Doctor fugglewumps party mansion",
            "description": "This is the third description.",
            "notes": {
                "prompts": "This is the doctor prompt text.",
                "beginning": "This is the doctor beginning text.",
                "middle": "This is the doctor middle text.",
                "end": "This is the doctor end text."
            }
        },
        {
            "id": 4,
            "title": "Ballistic bingo",
            "description": "This is the fourth description.",
            "notes": {
                "prompts": "This is the ballistic prompt text.",
                "beginning": "This is the ballistic beginning text.",
                "middle": "This is the ballistic middle text.",
                "end": "This is the ballistic end text."
            }
        },
        {
            "id": 5,
            "title": "Dim sum dum dum",
            "description": "This is the fifth description.",
            "notes": {
                "prompts": "This is the dim sum prompt text.",
                "beginning": "This is the dim sum beginning text.",
                "middle": "This is the dim sum middle text.",
                "end": "This is the dim sum end text."
            }
        }
    ]);