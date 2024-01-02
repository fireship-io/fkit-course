import { writable } from "svelte/store";
import { randomChoice } from "./promptGen";
import { v4 as uuidv4 } from "uuid";
import { tiles } from "./tiles";
import { activeTile } from "./dashboardState";
import { currentAdventure } from "./adventureData";

export let map = writable([]);
export let mapColumns = writable(4);
export let mapRows = writable(4);
export let mapSettings = writable({
  columns: 4,
  rows: 8,
});

let sourceTemplates = [
  [
    [["R", "SE"], ["-"], ["R", "SE", "SW"], ["-"]],
    [["C", "NW", "SE"], ["C", "NE", "SW"], ["C", "NW", "SE"], ["-"]],
    [["-"], ["C", "NW", "NE", "SE"], ["-"], ["R", "NW", "SW"]],
    [["-"], ["R", "NW", "SE", "SW"], ["C", "NE", "SW"], ["-"]],
    [["-"], ["C", "NE", "SW"], ["C", "NE", "NW"], ["-"]],
    [["C", "NE", "SE"], ["-"], ["-"], ["-"]],
    [["-"], ["R", "NW"], ["-"], ["-"]],
    [["-"], ["-"], ["-"], ["-"]],
  ],
  [
    [["R", "SE"], ["-"], ["-"], ["-"]],
    [["C", "NW", "SE"], ["-"], ["-"], ["-"]],
    [["-"], ["C", "NW", "SE"], ["-"], ["-"]],
    [["-"], ["R", "NW", "SE", "SW"], ["-"], ["-"]],
    [["-"], ["C", "NE", "SW"], ["C", "NW", "SE"], ["-"]],
    [["C", "NE", "SW"], ["-"], ["C", "NW", "SE"], ["-"]],
    [["R", "NE"], ["-"], ["-"], ["R", "NW"]],
    [["-"], ["-"], ["-"], ["-"]],
  ],
  [
    [["-"], ["-"], ["-"], ["-"]],
    [["-"], ["R", "SE", "SW"], ["-"], ["-"]],
    [["-"], ["R", "NE", "SW"], ["C", "NW", "SE"], ["-"]],
    [["R", "NE"], ["-"], ["C", "NW", "SW", "SE"], ["-"]],
    [["-"], ["-"], ["C", "NE", "SW"], ["C", "NW", "SW"]],
    [["-"], ["C", "NE", "SW"], ["R", "NE"], ["-"]],
    [["-"], ["R", "NE"], ["-"], ["-"]],
    [["-"], ["-"], ["-"], ["-"]],
  ],
  [
    [["-"], ["R", "SE"], ["-"], ["-"]],
    [["-"], ["C", "NW", "SE"], ["-"], ["-"]],
    [["-"], ["-"], ["C", "NW", "SE", "SW"], ["R", "SW"]],
    [["-"], ["C", "NE", "SW"], ["C", "NW", "SE", "NE"], ["-"]],
    [["-"], ["R", "NE"], ["-"], ["C", "NW", "SW"]],
    [["-"], ["-"], ["C", "NE", "SW"], ["-"]],
    [["-"], ["-"], ["R", "NE"], ["-"]],
    [["-"], ["-"], ["-"], ["-"]],
  ],
  [
    [["-"], ["R", "SE"], ["-"], ["-"]],
    [["-"], ["C", "NW", "SE"], ["R", "SW"], ["-"]],
    [["-"], ["-"], ["R", "NW", "SE", "SW", "NE"], ["R", "SW"]],
    [["-"], ["C", "NE", "SW"], ["C", "NW", "SE", "NE"], ["-"]],
    [["-"], ["R", "NE"], ["-"], ["C", "NW", "SW"]],
    [["-"], ["-"], ["C", "NE", "SW"], ["-"]],
    [["-"], ["-"], ["R", "NE"], ["-"]],
    [["-"], ["-"], ["-"], ["-"]],
  ],
  [
    [["-"], ["R", "SE"], ["-"], ["-"]],
    [["-"], ["C", "NW", "SE"], ["R", "SW"], ["-"]],
    [["-"], ["-"], ["R", "NW", "SE", "SW", "NE"], ["R", "SW"]],
    [["-"], ["C", "NE", "SW", "SE"], ["C", "NW", "SE", "NE"], ["-"]],
    [["-"], ["R", "NE"], ["R", "SE", "NW"], ["C", "NW", "SW"]],
    [["-"], ["-"], ["C", "NE", "SW", "NW"], ["-"]],
    [["-"], ["-"], ["R", "NE"], ["-"]],
    [["-"], ["-"], ["-"], ["-"]],
  ],
  [
    [["-"], ["R", "SE"], ["-"], ["-"]],
    [["-"], ["D", "NW", "SE"], ["R", "SW"], ["-"]],
    [["-"], ["-"], ["R", "NW", "SE", "SW", "NE"], ["R", "SW"]],
    [["-"], ["C", "NE", "SW", "SE"], ["C", "NW", "SE", "NE"], ["-"]],
    [["-"], ["R", "NE"], ["R", "SE", "NW"], ["C", "NW", "SW"]],
    [["-"], ["-"], ["D", "NE", "SW", "NW"], ["-"]],
    [["-"], ["-"], ["R", "NE"], ["-"]],
    [["-"], ["-"], ["-"], ["-"]],
  ],
  [
    [["-"], ["R", "SE"], ["-"], ["-"]],
    [["-"], ["C", "SE", "NW"], ["-"], ["-"]],
    [["-"], ["-"], ["R", "SW", "NW"], ["-"]],
    [["-"], ["R", "NE", "SW", "SE"], ["-"], ["-"]],
    [["-"], ["D", "NE", "SE", "SW"], ["C", "SE", "NW"], ["C", "SE", "SW"]],
    [
      ["C", "NE", "SW"],
      ["C", "NW", "SE"],
      ["R", "NE", "SW", "NW", "SE"],
      ["C", "NW", "SW"],
    ],
    [["C", "NE", "SE"], ["-"], ["R", "NW", "NE"], ["R", "NW", "NE", "SE"]],
    [["R", "NW", "SE"], ["R", "SW"], ["-"], ["R", "NW"]],
    [["-"], ["R", "NW", "NE", "SE"], ["-"], ["R", "SW"]],
    [["-"], ["R", "NW", "SE"], ["D", "NE", "SW"], ["-"]],
    [["-"], ["-"], ["C", "NE", "NW"], ["-"]],
  ],
  [
    [["-"], ["R", "SE"], ["-"], ["-"]],
    [["-"], ["D", "NW", "SE"], ["R", "SW"], ["-"]],
    [["-"], ["-"], ["R", "NW", "SE", "SW", "NE"], ["R", "SW"]],
    [["-"], ["C", "NE", "SW", "SE"], ["C", "NW", "SE", "NE"], ["-"]],
    [["-"], ["R", "NE"], ["R", "SE", "NW"], ["C", "NW", "SW"]],
    [["-"], ["-"], ["D", "NE", "SW", "NW"], ["-"]],
    [["-"], ["-"], ["D", "NE", "SE"], ["-"]],
    [["-"], ["-"], ["D", "NW", "SW", "SE"], ["R", "SW"]],
    [["-"], ["-"], ["R", "NE"], ["C", "NW", "NE"]],
  ],
  [
    [["-"], ["-"], ["C", "SE", "SW"], ["-"], ["-"]],
    [["-"], ["R", "NE", "SW"], ["D", "NW", "SE"], ["-"], ["-"]],
    [["-"], ["R", "NE", "SW"], ["-"], ["D", "NW", "SE", "SW"], ["-"]],
    [["R", "SW", "NE"], ["-"], ["C", "NE", "SW"], ["R", "NW", "SE"], ["-"]],
    [["C", "NE", "SE"], ["-"], ["R", "NE", "SW"], ["-"], ["R", "SW", "NW"]],
    [["D", "NW", "SE"], ["C", "SW", "NE"], ["-"], ["C", "SW", "NE"], ["-"]],
    [["-"], ["D", "NW", "NE", "SE"], ["-"], ["C", "NE", "SW", "SE"], ["-"]],
    [["-"], ["R", "NW", "SE"], ["C", "NE", "SW"], ["D", "NW", "SE"], ["-"]],
    [["-"], ["-"], ["R", "NE", "NW"], ["-"], ["R", "NW"]],
  ],
  [
    [["-"], ["R", "SE"], ["-"], ["-"], ["-"]],
    [["-"], ["D", "NW", "SE"], ["-"], ["-"], ["-"]],
    [["-"], ["-"], ["R", "NW", "SW", "SE"], ["-"], ["-"]],
    [["-"], ["D", "NE", "SW"], ["D", "NW", "SE"], ["-"], ["-"]],
    [["-"], ["C", "NE", "SW"], ["-"], ["R", "NW", "SE"], ["-"]],
    [["C", "NE", "SE"], ["-"], ["-"], ["D", "NW", "SE"], ["-"]],
    [["-"], ["D", "NW", "SE"], ["R", "SW"], ["-"], ["C", "NW", "SW"]],
    [["-"], ["D", "NW", "SE", "NE"], ["-"], ["C", "NE", "SW"], ["-"]],
    [["-"], ["-"], ["C", "NW", "SE"], ["D", "NE", "SW"], ["-"]],
    [["-"], ["-"], ["C", "NE", "NW", "SE", "SW"], ["-"], ["-"]],
    [["-"], ["-"], ["R", "NE", "SE"], ["R", "NW", "SW"], ["-"]],
    [["-"], ["-"], ["R", "NE", "NW"], ["-"], ["-"]],
  ],
  [
    [["R", "SE"], ["R", "SW"], ["-"], ["-"], ["-"]],
    [["C", "NW", "NE", "SW", "SE"], ["-"], ["D", "SW", "SE"], ["-"], ["-"]],
    [
      ["R", "NE"],
      ["C", "NW", "SE"],
      ["R", "NE", "SW"],
      ["C", "NW", "SE"],
      ["R", "SW", "SE"],
    ],
    [
      ["-"],
      ["C", "NW", "NE", "SW", "SE"],
      ["-"],
      ["C", "NE", "NW"],
      ["R", "NW"],
    ],
    [["-"], ["R", "NE", "SW"], ["D", "NW", "SE"], ["-"], ["-"]],
    [["D", "NE", "SE"], ["-"], ["C", "NW", "SE"], ["-"], ["-"]],
    [["-"], ["C", "NW", "SE"], ["-"], ["R", "NW"], ["-"]],
    [["-"], ["C", "NW", "SW"], ["-"], ["-"], ["-"]],
    [["-"], ["R", "NE", "SE"], ["-"], ["-"], ["-"]],
    [["-"], ["R", "NW"], ["-"], ["-"], ["-"]],
  ],
  [
    [["-"], ["R", "SE"], ["-"], ["-"]],
    [["-"], ["D", "SE", "NW"], ["R", "SE", "SW"], ["-"]],
    [["-"], ["-"], ["R", "NE", "NW", "SW"], ["R", "NW"]],
    [["-"], ["D", "NE", "SW"], ["-"], ["-"]],
    [["-"], ["R", "SE", "NE"], ["-"], ["-"]],
    [["-"], ["D", "NW", "SE"], ["R", "SW"], ["-"]],
    [["-"], ["-"], ["R", "NW", "NE", "SW"], ["-"]],
    [["R", "SE"], ["R", "NE", "SW"], ["-"], ["-"]],
    [["-"], ["D", "NW", "NE", "SW", "SE"], ["-"], ["-"]],
    [["R", "NE"], ["R", "NW", "SE"], ["R", "SW"], ["-"]],
    [["-"], ["-"], ["C", "NE", "NW"], ["-"]],
  ],
  [
    [["-"], ["R", "SW", "SE"], ["-"], ["R", "SW", "SE"], ["-"]],
    [
      ["R", "NE", "SW", "SE"],
      ["C", "NW", "SE"],
      ["C", "NE", "SW"],
      ["R", "NW", "SW", "SE"],
      ["-"],
    ],
    [
      ["R", "NE"],
      ["D", "NW", "SE"],
      ["D", "NE", "NW"],
      ["D", "NE", "SW"],
      ["R", "NW"],
    ],
    [["-"], ["C", "NW", "SE"], ["C", "NE", "SW"], ["-"], ["-"]],
    [["-"], ["-"], ["D", "NW", "NE", "SW", "SE"], ["-"], ["-"]],
    [["-"], ["D", "NE", "SW"], ["D", "NW", "SE"], ["-"], ["-"]],
    [["-"], ["C", "NE", "SW"], ["-"], ["C", "NW", "SE"], ["-"]],
    [["C", "NE", "SE"], ["-"], ["-"], ["C", "NW", "SW"], ["-"]],
    [["-"], ["R", "NW", "SE"], ["R", "SW", "SE"], ["R", "NE", "SW"], ["-"]],
    [["-"], ["R", "NE", "NW"], ["R", "NW", "NE"], ["-"], ["-"]],
  ],
  [
    [["-"], ["R", "SE"], ["R", "SW"], ["-"], ["-"], ["-"], ["-"]],
    [
      ["-"],
      ["R", "NE", "NW", "SE"],
      ["R", "SE", "SW"],
      ["-"],
      ["-"],
      ["-"],
      ["-"],
    ],
    [
      ["-"],
      ["-"],
      ["R", "NE", "NW", "SE", "SW"],
      ["R", "NW", "SW", "SE"],
      ["-"],
      ["-"],
      ["-"],
    ],
    [
      ["-"],
      ["R", "NE", "SE", "SW"],
      ["R", "NE", "SE", "NW"],
      ["R", "NW"],
      ["-"],
      ["-"],
      ["-"],
    ],
    [["-"], ["D", "NE", "SW"], ["R", "NE", "NW"], ["-"], ["-"], ["-"], ["-"]],
    [["D", "NE", "SE"], ["-"], ["-"], ["-"], ["-"], ["-"], ["-"]],
    [["-"], ["R", "NW", "SE"], ["-"], ["-"], ["-"], ["-"], ["-"]],
    [["-"], ["R", "NW", "SW"], ["-"], ["-"], ["-"], ["-"], ["-"]],
    [["-"], ["R", "NE"], ["-"], ["-"], ["-"], ["-"], ["-"]],
  ],
];

let temporaryTemplates = sourceTemplates.map((template) =>
  template.map((tile) => tile.slice(0))
);

function readTileType(tile) {
  switch (tile) {
    case "R":
      return "rooms";
    case "C":
      return "connectors";
    case "D":
      return "descenders";
    default:
      return "blank";
  }
}

function returnTileOptions(connectedDirectionsArray, correctTileTypeArray) {
  let tileOptions = [];
  let directionChecker = [];

  connectedDirectionsArray.includes("NW")
    ? directionChecker.push(true)
    : directionChecker.push(false);
  connectedDirectionsArray.includes("NE")
    ? directionChecker.push(true)
    : directionChecker.push(false);
  connectedDirectionsArray.includes("SE")
    ? directionChecker.push(true)
    : directionChecker.push(false);
  connectedDirectionsArray.includes("SW")
    ? directionChecker.push(true)
    : directionChecker.push(false);

  correctTileTypeArray.filter((tile) => {
    let potentialTileDirectionChecker = [];

    potentialTileDirectionChecker.push(tile.edges.NW.connection);
    potentialTileDirectionChecker.push(tile.edges.NE.connection);
    potentialTileDirectionChecker.push(tile.edges.SE.connection);
    potentialTileDirectionChecker.push(tile.edges.SW.connection);

    if (
      JSON.stringify(directionChecker) ===
      JSON.stringify(potentialTileDirectionChecker)
    ) {
      tileOptions.push(tile);
    }
  });

  return tileOptions;
}

function returnMapArray(template) {
  for (let i = 0; i < template.length; i++) {
    for (let j = 0; j < template[i].length; j++) {
      let tileType = readTileType(template[i][j][0]);
      if (tileType === "blank") {
        template[i][j] = {
          id: uuidv4(),
          zIndex: 0,
          chosenTile: tiles.type.blank[0],
          tileOptions: null,
          tileNotes: "",
          tileTitle: "",
          interestPoints: [],
          fogOfWar: false,
        };
        continue;
      }
      let connectedDirections = template[i][j].slice(1);
      let correctTileTypeArray = [...tiles.type[tileType]];
      let tileOptions = returnTileOptions(
        connectedDirections,
        correctTileTypeArray
      );
      let chosenTile = randomChoice(tileOptions);
      template[i][j] = {
        id: uuidv4(),
        zIndex: i + 1,
        chosenTile: chosenTile,
        tileOptions: tileOptions,
        tileNotes: "",
        tileTitle: "",
        interestPoints: [],
        fogOfWar: false,
      };
    }
  }
  return template;
}

export function generateMap() {
  let mapArray = returnMapArray(randomChoice(temporaryTemplates));
  currentAdventure.update((adventure) => {
    adventure.map = mapArray;
    return adventure;
  });
  // map.set(mapArray);
  temporaryTemplates = sourceTemplates.map((template) =>
    template.map((tile) => tile.slice(0))
  );
  activeTile.set({
    tileOptions: null,
    rowIndex: null,
    columnIndex: null,
    tileNotes: "",
    tileTitle: "",
    fogOfWar: null,
  });
}
