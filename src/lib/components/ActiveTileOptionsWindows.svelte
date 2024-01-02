<script>
  import InterestPointList from './InterestPointList.svelte';

    import { page } from '$app/stores';
    import { map, generateMap } from "$lib/mapGen";
    import { activeTile, playMode, setActiveTile } from "$lib/dashboardState";
    import { currentAdventure } from "$lib/adventureData";
    import { onMount } from 'svelte';
    import MapArray from './MapArray.svelte';
    import Icons from './Icons.svelte';
    import { tiles } from '$lib/tiles';
    import { fly } from 'svelte/transition';


    let screenSize = 0;
    let mapDisabled = false;

    let disabledMapGenButton = false;

    let tileMode = "rooms";
    let windowMode = "tile";


    let chosenTileOptions = {
      type: tileMode,
      connections: {
        NE: true,
        SE: true,
        NW: true,
        SW: true
      }
    }

    let controlTilesArray = {
      "type": {
        "room": [
          {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r1-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r2-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r3-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r4-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r5-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r6-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r7-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r8-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r9-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r10-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r11-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r12-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r13-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r14-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/r15-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            }
          ],
        "hall": [
          {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c1-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c2-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c3-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c4-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c5-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c6-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c7-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c8-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c9-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c10-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c11-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c12-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c13-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c14-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/c15-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            }
          ],
          "descent": [
          {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d1-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d2-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d3-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d4-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d5-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d6-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d7-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d8-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d9-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d10-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d11-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d12-v1.webp",
                "edges": {
                    "NW": {
                        "connection": true,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d13-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d14-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": true,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": false,
                        "type": "tile"
                    }
                }
            },
            {
                "set": "simplified_shapeset",
                "img": "/tiles/dungeon/d15-v1.webp",
                "edges": {
                    "NW": {
                        "connection": false,
                        "type": "tile"
                    },
                    "NE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SE": {
                        "connection": false,
                        "type": "tile"
                    },
                    "SW": {
                        "connection": true,
                        "type": "tile"
                    }
                }
            }
          ]
      }
    }

    let controlTile = tiles.type.rooms[0];
    let controlTiles = tiles.type.rooms;


    function updateChosenTileOptionImage(chosenTileOptions){
      let newControlTiles = tiles.type[chosenTileOptions.type].filter(tile => tile.edges.NE.connection === chosenTileOptions.connections.NE && tile.edges.SE.connection === chosenTileOptions.connections.SE && tile.edges.NW.connection === chosenTileOptions.connections.NW && tile.edges.SW.connection === chosenTileOptions.connections.SW);
      controlTile = newControlTiles[0];
      controlTiles = newControlTiles;
    }



    function deepCloneArray(arr) {
        return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item);
    }

    function setChosenTile(tile, rowIndex, columnIndex) {
        let newMap = deepCloneArray($currentAdventure.map);
        newMap[rowIndex][columnIndex].chosenTile = tile;
        currentAdventure.set({ ...$currentAdventure, map: newMap});
        activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null});
        mapDisabled = false;
        let floatingTiles = document.getElementsByClassName("tileFloat");
        for (let i = 0; i < floatingTiles.length; i++) {
          floatingTiles[i].classList.remove("tileFloat");
        }
    }

    function handleTileClick(cell, i, j){
      mapDisabled = true;
      setActiveTile(cell, i, j)
    }

    function clearActiveTile(){
      activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null});
      mapDisabled = false;
    }


    function handleMapGenerate() {
      disabledMapGenButton = true;
      activeTile.set({tileOptions: null, rowIndex: null, columnIndex: null, tileNotes: ""});
      generateMap();
      setTimeout(() => {
        disabledMapGenButton = false
      }, 500);
    }

    function setActive(e) {
        document.querySelectorAll('.interestPoint').forEach((element) => {
            element.classList.remove("interestPointActive");
        });
        e.target.closest('div').classList.toggle("interestPointActive");
    }

    function toggleActive(e) {
      e.target.closest('.tileOptionToggle').classList.toggle("interestPointActive");
    }

    function handlePointOfInterestDelete(interestPoint){
      console.log(interestPoint);
      let newMap = deepCloneArray($currentAdventure.map);
      let interestPointIndex = newMap[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints.findIndex(point => point.title === interestPoint.title);
      newMap[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints.splice(interestPointIndex, 1);
      currentAdventure.set({ ...$currentAdventure, map: newMap});!$page.route.id.includes("play")
    }

    function handlePointOfInterestCreation(){
      let newMap = deepCloneArray($currentAdventure.map);
      newMap[$activeTile.rowIndex][$activeTile.columnIndex].interestPoints.push({title: "", info: ""});
      currentAdventure.set({ ...$currentAdventure, map: newMap});
    }

    function changeWindowMode(newMode){
        windowMode = newMode;
    }
    
    function changeTileMode(newMode){
      tileMode = newMode;
      chosenTileOptions.type = tileMode;
      updateChosenTileOptionImage(chosenTileOptions);
    }

    function toggleActiveConnection(e, direction) {
      e.target.closest('.control').classList.toggle("activeConnection");
      chosenTileOptions.connections[direction] = !chosenTileOptions.connections[direction];
      updateChosenTileOptionImage(chosenTileOptions);
    }

    function toggleInfoBarActive() {
      activeTileOptionsWindow = !activeTileOptionsWindow;
    }

    onMount(() => {
      if($playMode === true){
        windowMode = "notes";
      }
      else {
        windowMode = "tile";
      }
    });

    function toggleFogOfWar(e){
        $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar = !$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar;
        console.log("Fog toggle", $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar);
    }

</script>

<style>


    .tileOptions::-webkit-scrollbar {
        color: var(--batlas-black);
        background: var(--batlas-black);
    }

    .tileOptions::-webkit-scrollbar-thumb {
        color: var(--batlas-black);
        background: var(--batlas-black);
        border: 0.1em solid var(--batlas-white);
    }

    .tileOptions::-webkit-scrollbar-corner {
        display: none;
    }



   

  .tileOptionsBar {
    display: block;
    width: 100%;
    height: auto;
    overflow-y: scroll;
    border-radius: 2em;
  }

  .tileInfoBar {
    padding: 0.8em;
    display: none;
  }

  .tileInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1.5em;
    height: 100%;
  }

  .tileInfo p {
    margin: 0px;
    padding: 0px;
  }

  .tileInfo h4 {
    margin: 0em;
    margin-bottom: 0.3em;
    margin-top: 1em;
    font-size: 1.3em;
  }

  .tileInfoText {
    width: 100%;
    outline: none;
    border: 0.3em solid var(--batlas-black);
    border-radius: 2em;
    padding: 1em;
    font-size: 1em;
    font-family: var(--batlas-font);
  }

  p.roomDescription {
    margin-bottom: 2em;
  }


  .tileOptionsBarActive{
        display: block;
        position: absolute;
        bottom: 0em;
  }

  .tileInfoBarActive{
        display: block;
        width: 22em;
        height: calc(100% - 2em);
  }


  .tileOptions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-start;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: var(--batlas-white);
    gap: 2em;
    padding: 0em;
    width: 100%;
  }

  .tileOption {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    aspect-ratio: 3/2;
    transition: all 0.1s ease-in-out;
    border: 0.25em solid var(--batlas-black);
    border-radius: 2em;
    background-color: var(--batlas-black);
    width: calc(50% - 1em); 
  }

  .tileOption:hover {
    cursor: pointer;
  }

  .hideScrollbar::-webkit-scrollbar {
    display: none;
  }

  .hideScrollbar {
    padding: 0em;
  }


  .tileOption img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
  }

  .tileOption img:hover {
    transform: scale(1.1);
  }


  .tileSelectorHoverDetector {
    height: 4em;
    width: 4em;
    border-radius: 2em;
    position: absolute;
    bottom: 25%;
    pointer-events: auto;
    z-index: 998;
  }

  .tileSelectorHoverDetector:hover .tileSelector {
    visibility: visible;
    cursor: pointer;
  }

  .tileSelectorHoverDetector + img {
    transition: all 0.3s ease;
  }

  .tileSelectorHoverDetector:hover + img {
    transform: translate(0em, -0.5em);
  }

  .tileSelector {
    visibility: hidden;
    position: absolute;
    bottom: calc(50% - 2.5em);
    left: calc(50% - 2.5em);
    height: 5em;
    width: 5em;
    border: 0em solid var(--batlas-white);
    background: rgba(0, 0, 0, 0);
    border-radius: 3em;
    pointer-events: auto;
    cursor: pointer;
    z-index: 999;
  }

  .mapSettings {
    color: var(--batlas-white);
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 2em;
    padding: 1em;
    position: relative;
    top: 0em;
    left: 0em;
    background-color: transparent;
  }

  .mapSettings p {
    margin: 0px;
    padding-top: 0.3em;
  }

  .mapGenButton {
    cursor: pointer;
    background-color: var(--batlas-black);
    border-color: var(--batlas-white);
    border: 0.1em solid var(--batlas-white);
    border-radius: 0.6em;
    padding: 0.3em 1em;
    color: var(--batlas-white);
    font-family: var(--batlas-font);
    text-transform: uppercase;
    text-decoration: none;
    text-align: center;
    font-size: 1em;
  }

  .mapGenButton:hover {
    background-color: var(--batlas-white);
    color: var(--batlas-black);
  }

  .editingTitle {
    white-space: nowrap;
    width: 200px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }

  .tileNotesIndicator {
    min-width: 2em;
    min-height: 2em;
    padding: 0.2em;
    border: 0.2em solid var(--batlas-white);
    border-radius: 10em;
    aspect-ratio: 1/1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--batlas-black);
    top: 1em;
  }

  .icon {
        cursor: pointer;
        display: inline;
        width: 60%;        
        height: auto;
        fill: var(--batlas-white);
        position: relative;
        z-index: 100;
    }

    .interestPointContextMenu {
      display: none;
      position: absolute;
      top: 0em;
      left: 0em;
      width: 100%;
      height: 100%;
      background-color: var(--batlas-black);
      z-index: 999;
    }

    .interestPoint {
      width: 100%;
      padding: 0.4em 0em;;
      border-bottom: 0.1em solid var(--batlas-black);
      display: grid;
      position: relative;
      grid-template-columns: 4fr 1fr 1fr;
      grid-template-rows: auto;
      cursor: pointer;
    }



    .interestPointActive > .interestPointInfo {
      display: block;
    }

    .interestPoint>p {
      margin: 0px;
      padding: 0px;
      font-weight: 600;
    }

    .interestPoint .icon {
      width: 1.5em;
      height: 1.5em;
      fill: var(--batlas-white);
      background-color: var(--batlas-black);
    }

    .interestPointInfo {
      display: none;
      grid-column: 1/4;
      padding: 0.4em;
    }

    .interestPointPlay {
      grid-template-columns: 5fr 1fr;
    }

    .interestPointTitle {
      width: 100%;
      font-size: 0.8em;
      border: none;
      font-family: var(--batlas-font);
      font-weight: bold;
      padding: 0.4em;

    }

    .interestPointTitle::-webkit-scrollbar {
      display:none;
    }

    .centerAlignIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 0.4em;
    }

    .infoBox {
      background-color: var(--batlas-white);
      border: 0.25em solid var(--batlas-black);
      border-radius: 3em;
    }

    .roomOptionsToggle {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      width: 100%;
      background-color: var(--batlas-white);
      text-align: center;
    }

    .roomOptionsToggle a {
      width: 35%;
      margin: 0px;
      padding: 0.5em 2em;
      font-weight: 600;
      line-height: 1;
      border: 0.25em solid var(--batlas-black);
      border-radius: 2em;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }

    p.tileOptionsToggle{
      padding: 0.5em;
      width: auto;
      border: 0.25em solid var(--batlas-black);
      border-radius: 2em;
      padding: 0.5em 1em;
      cursor: pointer;
    }

    .tileOptionsToggleContainer {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      gap: 2em;
      background-color: var(--batlas-white);
      text-align: center;
    }

    .tileOptionsToggleContainer .active {
      background-color: var(--batlas-black);
      color: var(--batlas-white);
    }

    .roomOptionsToggleActive, .tileOptionsToggle:hover {
      background-color: var(--batlas-black);
      color: var(--batlas-white);
    }

    .roomOptionsTitle {
      display: grid;
      grid-template-columns: 1fr 3fr;
      width: 100%;
      background-color: var(--batlas-white);
      border: 0.25em solid var(--batlas-black);
      border-radius: 3em;
      text-align: center;
    }

    .roomTitle {
      background: transparent;
      outline: none;
      border: none;
      color: var(--batlas-black);
      margin: 0px;
      padding: 0.25em 0.5em;
      font-weight: 600;
      font-size: 1em;
      border-radius: 0.5em 0em 0em 0.5em;
      font-family: var(--batlas-font);
    }

    .roomOptionsTitle p {
      background-color: var(--batlas-black);
      color: var(--batlas-white);
      margin: 0px;
      padding: 0.25em;
      font-weight: 600;
      border-radius: 0.5em 0em 0em 0.5em;
    }

    .connectionsControls {
      display: flex;
      gap: 2em;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      background-color: var(--batlas-white);
      text-align: center;
    }

    .connectionsController {
      position: relative;
      display: block;
      width: calc(100% - 4em);
      height: auto;
    }

    .control {
      position: absolute;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      opacity: 0.5;
    }

    .control:hover {
      transform: translateY(-0.25em);
    }

    .NEControl {
      top: 1em;
      right: 1em;
    }
    .SEControl {
      bottom: 2em;
      right: 1em;
    }
    .NWControl {
      top: 1em;
      left: 1em;
    }
    .SWControl {
      bottom: 2em;
      left: 1em;
    }


    .centralControl {
      width: 100%;
      height: auto;
      object-fit: contain;
    }

    .roomTitlePlay {
        padding: 0.3em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        font-size: 1.8em;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--batlas-black);
        text-align: left;
    }

    .roomTitlePlay p:hover {
        cursor: default;
    }

    p.roomDescription {
        padding: 0.6em;
        width: 100%;
        font-size: 1em;
        color: var(--batlas-black);
        text-align: left;
    }

    .closeButton {
        position: static;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        padding: 0.3em 0.6em;
        transition: all 0.2s ease-in-out;
    }

    .closeButton:hover {
        transform: translateY(-0.05em);
    }

    .fogOfWar {
        opacity: 0.5;
    }

    .activeConnection {
      opacity: 1;
    }

  @media screen and (max-width: 1500px) {
    .mapSettings {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;
    }

    .tileOptions {
      height: 100%;
    }

    .tileOptionsBar {
      width: 100%;
      height: 100%;
      max-height: 25%;
    }

    .tileInfoBarActive {
      width: 100%;
      height: 100%;
      max-height: 75%;
    }

    .tileInfoBarActivePlay {
      max-height: 100%;
    }

    .disabledHoverSelector {
      pointer-events: none;
      display: none;
      visibility: hidden;
    }
  }

</style>
<div class="tileInfoBar" class:tileInfoBarActive="{$activeTile.rowIndex != null}" class:tileInfoBarActivePlay="{$activeTile.rowIndex != null && $page.route.id.includes("play ")}" class:infoBox="{$activeTile.rowIndex != null}" in:fly={{ x: 0, y: 0, duration: 500 }}>
    <div class="closeButton" on:click={() => clearActiveTile()}>
        <Icons icon={"remove"} size={"medium"} color={"black"}/>
    </div>
    <div class="tileInfo" class:hideScrollbar="{!$activeTile.tileOptions}">
    {#if !$page.route.id.includes("/player/")}
        <div class="roomOptionsToggle">
          <a class:roomOptionsToggleActive="{windowMode === "tile"}"  on:click={() => changeWindowMode('tile')} >Tile</a>
          <a class:roomOptionsToggleActive="{windowMode === "notes"}" on:click={() => changeWindowMode('notes')} >Notes</a>
        </div>
    {/if}
        {#if windowMode === "notes" || $page.route.id.includes("/player/")}
            {#if $page.route.id.includes("/player/")}
            <div class="roomTitlePlay">
                <p>{$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileTitle}</p>
            </div>
            {:else}
                <div class="roomOptionsTitle">
                    <p>Title</p>
                    <input class="roomTitle" placeholder="Room title" bind:value={$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileTitle}>
                </div>
                <div class="roomOptionsToggles">
                    <div class="fogOfWar" on:click={(e) => toggleFogOfWar(e)} class:activeConnection="{$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].fogOfWar}">
                        <Icons icon={"d20"} size={"medium"} color={"black"}/>
                        <p>Fog of War</p>
                    </div>
                </div>
            {/if}
          {#if !$page.route.id.includes("play") || $currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileNotes != ""}
            {#if !$page.route.id.includes("play")}
              <textarea class="tileInfoText" class:hideScrollbar="{!$activeTile.tileOptions}" placeholder="Room notes" rows="40" bind:value={$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileNotes}></textarea>
            {:else}
              <p class="roomDescription">{$currentAdventure.map[$activeTile.rowIndex][$activeTile.columnIndex].tileNotes}</p>
            {/if}
          {/if}
            <InterestPointList/>
        {:else if windowMode === "tile"}
        <div class="connectionsControls">
          <p>Connections</p>
          <div class="connectionsController">
            <img class="NEControl control activeConnection" src="/img/tileOptionsArrowNorthEast.webp" alt="North East Control" on:click={(e) => toggleActiveConnection(e, "NE")}/>
            <img class="SEControl control activeConnection" src="/img/tileOptionsArrowSouthEast.webp" alt="South East Control" on:click={(e) => toggleActiveConnection(e, "SE")}/>
            <img class="NWControl control activeConnection" src="/img/tileOptionsArrowNorthWest.webp" alt="North West Control" on:click={(e) => toggleActiveConnection(e, "NW")}/>
            <img class="SWControl control activeConnection" src="/img/tileOptionsArrowSouthWest.webp" alt="North West Control" on:click={(e) => toggleActiveConnection(e, "SW")}/>
            <img class="centralControl activeConnection" src="/img/{controlTile.img}" alt="Empty Square"/>
          </div>
          <div class="tileOptionsToggleContainer">
            <p class="tileOptionsToggle" class:active="{tileMode === 'rooms'}" on:click={() => changeTileMode('rooms')}>Room</p>
            <p class="tileOptionsToggle" class:active="{tileMode === 'connectors'}" on:click={() => changeTileMode('connectors')}>Hall</p>
            <p class="tileOptionsToggle" class:active="{tileMode === 'descenders'}" on:click={() => changeTileMode('descenders')}>Descent</p>
          </div>
        </div>
        <div class="tileOptionsBar">
          <div class="tileOptions hideScrollbar">
              {#if $activeTile.rowIndex != null}
                  {#each controlTiles as tile}
                      <div on:click={() => setChosenTile(tile, $activeTile.rowIndex, $activeTile.columnIndex)} class="tileOption">
                          <img src="/img/{tile.img}" alt="{tile.img}" />
                      </div>
                  {/each}
              {/if}
          </div>
        </div>
        {/if}
          </div>
    </div>
