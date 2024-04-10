import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import { onMount } from "svelte";
import { db, user } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

export const currentAdventure = writable({
  title: "",
  notes: {
    enemy: "",
    quest: "",
    npc: "",
    goal: "",
    scene: "",
    push: "",
    gimmick: "",
    primer: "",
    notes: "",
  },
  map: [],
  userId: "",
  adventureId: "",
  public: false,
  updateDate: "",
});

export const premadeAdventures = [
  {
    title: "Witches Coven",
    notes:
      "The adventure takes place in a witches' lair. The witch has made a pact with a patron of vermin and disease to gain her power. She is capturing victims and transforming them into wandering headless zombies filled  with rats to unleash plague onto the world.",
    updatedDate: 1712558786801,
    primer:
      "A small town has been plagued by vermin-sickness and missing persons for a year. Now the town's healer has gone missing and things look dire. Townsfolk talk off a witch in the woods nearby but all those foolish enough to enter her domain never return.",
    userId: null,
    dungeonId: "witches-coven",
    map: [
      [
        {
          id: "cfac8554-5c64-45de-9caf-80f77ab710a3",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "effa6bda-13dc-4875-8f70-b18a5534cc22",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "e9da93be-b5ea-44d0-8dbb-0391146cb764",
          zIndex: 1,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/c4-v4.webp",
            edges: {
              NW: {
                connection: false,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c4-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c4-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c4-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c4-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "bf0de0e3-4b81-4b7f-9dad-cdb5a52f38ed",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
      ],
      [
        {
          id: "301f3ed0-1f91-4361-86ba-3281b53e2a94",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r14-v5.webp",
            edges: {
              NW: {
                connection: false,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes:
            "A small, dry cave stagnant with the faint odour of mould. Low enough that the average person needs to crouch to move about, there is a broken wooden door set into the south-east wall.\n\nA sigil has been painted onto the door but it's definition and colour have been lost to time and decay.",
          tileTitle: "Entrance",
          interestPoints: [
            {
              title: "The sunlight",
              info: "The entrance to this cave is from a small hole that leads 30ft up to the surface. Sunlight filters down through this gap.",
            },
            {
              title: "The growling den",
              info: "On the north-east wall is a small hole that extends into shadow. From it a growling can be heard.\n\nIf there's a commotion in the room this giant vermin will emerge, attack, and retreat.",
            },
            {
              title: "The door sigil",
              info: "An arcane symbol that acts as a simple alarm spell. It sends out the loud church bell if the door is opened while the spell remain intact.",
            },
          ],
          fogOfWar: false,
        },
        {
          id: "745987ec-21b7-42c7-a917-01bde6f22506",
          zIndex: 2,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/c10-v3.webp",
            edges: {
              NW: {
                connection: false,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-pillar.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes:
            "A stone bridge crosses a pool of rippling black water. Voices drift from the water's edge.",
          tileTitle: "Whispering Waters",
          interestPoints: [
            {
              title: "The pool",
              info: "The pool of water is 60ft deep, it's bottom is strewn with skulls whose words are drown out by the water.",
            },
            {
              title: "The skulls",
              info: "Remnants from rituals passed, these skulls are what becomes of those who are offered up to the witches' patron.",
            },
            {
              title: "Rune rat",
              info: "A rat swims through the water. On it's belly is a small, glowing blue rune. (This is one of the runes linked to the sacrificial prison)",
            },
          ],
          fogOfWar: false,
        },
        {
          id: "cc582850-7e1b-4c48-ab79-c863e9648eb0",
          zIndex: 2,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/c7-v5.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/d7-v1.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/d7-v2.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "77101a96-d06e-4695-8cca-728144d9b195",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r15-v2.webp",
            edges: {
              NW: {
                connection: false,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: false,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "A shimmering magic portal swirls where the room ends.",
          tileTitle: "Portal to the Heart",
          interestPoints: [
            {
              title: "Portal sickness",
              info: "Anyone that uses the portal who isn't able to use magic will be challenged by a crippling nausea that can last hours.",
            },
          ],
          fogOfWar: false,
        },
      ],
      [
        {
          id: "6c1e769a-3d50-45cf-a433-e4cd3327f8bf",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "88c0bcee-7fa9-452e-9b24-c2a7c26c14b0",
          zIndex: 3,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r1-v3.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-pillar.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes:
            "The smell of mould and filth grows intense. The air is chilly and a draught moves about the room, flowing up from the central pit. The sound of scuffling and commotion echoes up from the darkness of the pit.",
          tileTitle: "Darling's Pit",
          interestPoints: [
            {
              title: "The pit",
              info: "The pit is 90ft deep and the walls and rough stone the whole way down.\n\nAt the bottom is a huge cavern that is home to Darling and Precious, two gigantic rats that act the progenitors for the witches' vermin hoards.\n\nDarling and Precious are chained to opposite walls to keep them from endlessly spawning vermin.",
            },
          ],
          fogOfWar: false,
        },
        {
          id: "2902cc9e-0e09-4f03-9b24-6c1a4a058c98",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/d7-v1.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "968a86b8-b8a7-46da-8dd3-f8469fc8fe2a",
          zIndex: 3,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r1-v5.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/d11-v1.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/d11-v2.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes:
            "A bridge crosses over a room whose floor cannot be seen through the teeming ocean of vermin that covers it.\n\nThousands and thousands of rats fill each inch of this room. Ranging in size from a standard rat to those the size of a cattle dog.",
          tileTitle: "The Vermin Swarm",
          interestPoints: [
            {
              title: "The Vermin Swarm",
              info: "The vermin swarm exists to protect the portal at the far end of room which leads to the heart of the coven.\n\nIt will attack anything that isn't the witch herself, though it's stupid and easily tricked.",
            },
            {
              title: "Rune rat",
              info: "Within the swarm is a rat with a glowing blue rune on its belly. (This is one of the runes linked to the sacrificial prison) ",
            },
          ],
          fogOfWar: false,
        },
      ],
      [
        {
          id: "362c5ecb-d490-4293-afd7-f45d6c6ab615",
          zIndex: 4,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/c10-v1.webp",
            edges: {
              NW: {
                connection: false,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-pillar.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "8ced1f88-367b-4ff7-93ff-ba46ad69b563",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/c7-v1.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "e1fb25a4-9765-4dd9-a5ed-d4063f65db35",
          zIndex: 4,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r8-v4.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: false,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes:
            "A huge cauldrons bubbles away in the middle of this study. The smell of spice,  wine, and apples hugs the space.\nThe shelves contain all kinds of books of potion-craft written in an infernal language. Between the books are all sorts of preserves and ingredients in bowls, bottles, and jars.",
          tileTitle: "The Potion Study",
          interestPoints: [
            {
              title: "The bubbling potion",
              info: "A draught of pustules brews within the cauldron. A potion that causes horrible boils, rashes, and blisters upon skin contact. When consumed it causes the same effects body-wide. Any fluid from an afflicted person causes the same skin contact effects as the potion itself. It's a nasty brew designed to smell appetising in order to trick victims into drinking it.",
            },
            {
              title: "The books",
              info: "The books on the shelf contain volumes that outline poisons and draughts meant to cause ailment and harm.",
            },
          ],
          fogOfWar: false,
        },
        {
          id: "5ae34a2c-0155-4ccf-ada4-1efaab305db6",
          zIndex: 4,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r5-v2.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: false,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r7-pillar.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r7-v1.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r7-v2.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r7-v3.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes:
            "Two coffins lay sealed within the wall. There are clear signs that they have been moved recently.",
          tileTitle: "Servant's Quarters",
          interestPoints: [
            {
              title: "The servants",
              info: "Sleeping within the coffins are two headless zombies whose bodies are teeming with rats.",
            },
            {
              title: "Rune rat",
              info: "Within one of the coffins is a rat with a glowing blue rune on its belly. (This is one of the runes linked to the sacrificial prison) ",
            },
          ],
          fogOfWar: false,
        },
      ],
      [
        {
          id: "9ddbe0fa-e301-45c4-a927-3eac7f492fe2",
          zIndex: 5,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r3-v4.webp",
            edges: {
              NW: {
                connection: false,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c3-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c3-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c3-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c3-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes:
            "A room filled with bones and the smell of faeces. A huge slumbering feral feline lays in sunshine that finds it's way into the room through a break in the wall.",
          tileTitle: "Familiar's Rest",
          interestPoints: [
            {
              title: "The sunlight",
              info: "A broken ravine that leads to the surface allows sunlight to filter down into the room.\n\nThis is a secondary entrance into the witches' lair.",
            },
            {
              title: "The feline",
              info: "A huge, mangy feline with filth-matted fur sleeps in the sunlight. (If the party set off the door alarm or made a large noise before they find the cat it will be awake).\n\nIf the cat becomes aware of the party it will first try to flee to the witch and warn her. Then it will try to pounce on the party as they navigate the dungeon. Making surprise attacks then fleeing once more.\n\nIt will only fight to the death if the witch is locked in combat.",
            },
            {
              title: "The bone pile",
              info: "Within the pile of bones a few pieces of jewellery can be found, crusted in filth.",
            },
          ],
          fogOfWar: false,
        },
        {
          id: "4932c53b-8aca-438d-a0ce-d3ff5e7145e7",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/d7-v1.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "3adc6676-2c73-4cf7-bfb8-55226fdd0432",
          zIndex: 5,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/c1-v5.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-pillar.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r6-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes:
            "The smell of mould and filth grows intense. The air is chilly and a draught moves about the room, flowing up from the central pit. The sound of scuffling and commotion echoes up from the darkness of the pit.\n\nA bloodstained bridge crosses above the pit.",
          tileTitle: "Precious' Pit",
          interestPoints: [
            {
              title: "The pit",
              info: "The pit is 90ft deep and the walls and rough stone the whole way down.\n\nAt the bottom is a huge cavern that is home to Darling and Precious, two gigantic rats that act the progenitors for the witches' vermin hoards.\n\nDarling and Precious are chained to opposite walls to keep them from endlessly spawning vermin.",
            },
            {
              title: "The bridge",
              info: "The bridge is illusory. A trap set by the witch to catch those that enter her lair. The portion of the bridge that crosses over the center of the pit isn't real and victims will plummet to their deaths below.",
            },
          ],
          fogOfWar: false,
        },
        {
          id: "63cc5bad-2eae-462d-afd3-3e34c3cdd328",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/c6-v1.webp",
            edges: {
              NW: {
                connection: false,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: false,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
      ],
      [
        {
          id: "0cf6d262-24a1-4e87-9e32-754a342eecda",
          zIndex: 6,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/c7-v3.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/d7-v1.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/d7-v2.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "2fa57756-8ead-4566-bc07-f3182328df7d",
          zIndex: 6,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/c2-v4.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: false,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "50f0f579-6784-4c03-964f-d5ce6866e4f0",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/c1-v4.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes:
            "The hallways bend and twist into flames leaving only a black space between them.",
          tileTitle: "The Winding Ways",
          interestPoints: [
            {
              title: "Getting through",
              info: "The space between the flames is just open air and can be navigated the same, though the flames will burn the same too.",
            },
            {
              title: "The chicken's foot",
              info: "The witch has a chicken's foot on a necklace that brings the hallway back to normal when she approaches.",
            },
          ],
          fogOfWar: false,
        },
        {
          id: "6ff01d65-461e-4c5b-9e5b-988ff14ab0e3",
          zIndex: 6,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
      ],
      [
        {
          id: "cd0a8e6c-6dbf-4487-aeb1-c3fa0f8f4f10",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "be69b4e3-59fe-465a-b5c1-666c85338c85",
          zIndex: 7,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r9-v5.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/d9-v1.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/d9-v2.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes:
            "A square ditch lined with glowing runes fills the center of this room.\n\nLaying down within the ditch is an elderly woman dressed in clerical robes that would have once been white but are now covered in dirt and grimes. Her hair has been shorn close and uneven with a knife.",
          tileTitle: "Sacrificial Prison",
          interestPoints: [
            {
              title: "The prisoner",
              info: "The prisoner is Hagra Pool, the healer for a nearby town who have been plagued by vermin-sickness for over a year.",
            },
            {
              title: "The prison",
              info: "There is a barrier above the prison that stops anything passing through. One can walk across the top of the prison, floating a few feet off the ground, but not pass through it.",
            },
            {
              title: "The runes",
              info: "There are three runes glowing around it's edge. Each of these is bound to the life of a rat somewhere within the witches' lair.\n\nIf the 3 rats are killed the prison will open.",
            },
          ],
          fogOfWar: false,
        },
        {
          id: "95df194c-0f12-43b7-84d3-1e208b06bfc5",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r6-v4.webp",
            edges: {
              NW: {
                connection: false,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: false,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes:
            "A huge stone engraved in an infernal language with burning braziers either side.",
          tileTitle: "The Ritual Stone",
          interestPoints: [
            {
              title: "The inscription",
              info: "The stone outlines a ritual sacrifice to a deity of disease and vermin. One of beheading a sacrifice and allowing vermin to inhabit the host.",
            },
          ],
          fogOfWar: false,
        },
        {
          id: "d3eb6f62-7dbf-428f-8fe1-90f9c44dc9ad",
          zIndex: 7,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r12-v1.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: false,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c10-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c10-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c10-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c10-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
      ],
      [
        {
          id: "2ab00680-e5c3-4224-9c83-276047193ad1",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "117f9239-d5ee-499f-945a-ed592393775c",
          zIndex: 8,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r9-v3.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r7-pillar.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r7-v1.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r7-v2.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r7-v3.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes:
            "A gigantic statue of a woman with a rat's head sits against the south-west wall. Coals burns dimly and gongs sit either side of the statue.\n\nLayers of blood stains marks the ground before the statue.\n\nA foul chill ripples through the air.",
          tileTitle: "Ritual Room",
          interestPoints: [
            {
              title: "The gongs",
              info: "Ringing either gong will call the vermin swarm to the ritual room.  It will also alert the witch and the witches' familiar.\n\nThe vermin swarm won't leave the portal unguarded if, when they get to the ritual room, the witch isn't there. They will attack anyone other than the witch on site.",
            },
            {
              title: "The statue",
              info: "The statue is cast from bronze and stands 20ft tall. The head is covered in the stitched together pelts of hundreds of rats. The two front teeth are made of solid silver.",
            },
          ],
          fogOfWar: false,
        },
        {
          id: "9a923565-095c-4d11-8408-33d86e426e15",
          zIndex: 8,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v1.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v2.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v3.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/c6-v4.webp",
              edges: {
                NW: {
                  connection: false,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: true,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "4b985e9d-4089-4ccb-bb06-9faee8b4b2cf",
          zIndex: 8,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/d7-v1.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/d7-v2.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: false,
                  type: "tile",
                },
                SE: {
                  connection: true,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
      ],
      [
        {
          id: "ffb316ee-11e2-4a43-b8a4-520802cb6a35",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "c7b69081-8283-426e-8107-305532801bf8",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "c5e7852a-3713-4557-8dd0-239cbd631e47",
          zIndex: 9,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: [
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r2-pillar.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r2-v1.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r2-v2.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
            {
              set: "simplified_shapeset",
              img: "/tiles/dungeon/r2-v3.webp",
              edges: {
                NW: {
                  connection: true,
                  type: "tile",
                },
                NE: {
                  connection: true,
                  type: "tile",
                },
                SE: {
                  connection: false,
                  type: "tile",
                },
                SW: {
                  connection: false,
                  type: "tile",
                },
              },
            },
          ],
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
        {
          id: "471f203c-83b5-4dca-b0a2-e285208448ad",
          zIndex: 0,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        },
      ],
      [
        {
          id: "25dbc2a4-1ea0-45a9-9421-66c3d343992d",
          zIndex: 10,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        },
        {
          id: "89bee205-c563-4197-a7d9-7f4b550b36ff",
          zIndex: 10,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        },
        {
          id: "517a53b4-7d69-4d51-8f42-5ee0e951a13d",
          zIndex: 10,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r15-v2.webp",
            edges: {
              NW: {
                connection: false,
                type: "tile",
              },
              NE: {
                connection: false,
                type: "tile",
              },
              SE: {
                connection: false,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        },
        {
          id: "15719bf4-3aad-432b-a4bc-b550add8b109",
          zIndex: 10,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        },
      ],
      [
        {
          id: "e1e2ffa1-679c-4888-a193-a6b89cfbd2fb",
          zIndex: 11,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        },
        {
          id: "98fea939-b28d-4946-8d13-41a630a90f58",
          zIndex: 11,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        },
        {
          id: "1054bb84-c91e-4362-8bf7-d82c43d227a7",
          zIndex: 11,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/r3-v3.webp",
            edges: {
              NW: {
                connection: false,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: false,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes:
            "A gnarled and ancient tree stands in the corner of the room. Sap drips from the broken shards of grey bark that armour the trunk. It pools in a large puddle around the roots.\nWhite lights float about the dead branches leaving trails of luminescent mist.\nA rhythmic thumping comes from within the tree.",
          tileTitle: "The Coven's Heart",
          interestPoints: [
            {
              title: "The sap",
              info: "The sap is adhesive and diseased. Anything that touches the sap will become stuck and must struggle to break free.\nAny with a weak constitution who touch the sap will find themselves prone to illness for the next few weeks.",
            },
            {
              title: "The thumping",
              info: "Within the tree is a beating heart the size of a human head. Destroying this heart will break the witches' coven with their patron. The witch will be transformed into a rat and all magic within the lair will cease, including the portal out of the room.",
            },
            {
              title: "The lights",
              info: "The lights will not attack until the tree is approached. Once it is they will swarm the person closest to death and electrify them.\nIf the lights kill someone, that person will not die but instead become a sleeper agent for the witches' patron.",
            },
          ],
        },
        {
          id: "b6058851-a096-4fb9-8236-f14e3e5f08cc",
          zIndex: 11,
          chosenTile: {
            set: "simplified_shapeset",
            img: "/tiles/dungeon/roomBlank.webp",
            edges: {
              NW: {
                connection: true,
                type: "tile",
              },
              NE: {
                connection: true,
                type: "tile",
              },
              SE: {
                connection: true,
                type: "tile",
              },
              SW: {
                connection: true,
                type: "tile",
              },
            },
          },
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
        },
      ],
    ],
  },
];

export const playAdventureCurrent = writable(false);
export const adventureListStore = writable([]);
