import {writable} from 'svelte/store';
	
export const monster = writable({
  description: "default monster store",
  clue: "default clue store",
  environment: "default environment store"
});

export const offensiveQuirk = writable({
  description: "default monster store",
  clue: "default clue store"
});

export const defensiveQuirk = writable({
  description: "default monster store",
  clue: "default clue store"
});

export const npc = writable({
  sex: "",
  race: "",
  descriptor: "",
  personality: "",
  clothes: "",
  speech: "",
  idiosyncrasy: ""
});


export const questLocation = writable("");
export const problem = writable("");




const prompts = {
    'monster':
    [
        {
          "description": "Air Elemental",
          "clue": "whirlwinds",
          "environment": "Dungeon, Airborne"
        },
        {
          "description": "Animated Armor",
          "clue": "clanking echoes",
          "environment": "Dungeon, Urban"
        },
        {
          "description": "awakened plant",
          "clue": "leaves that move without a breeze",
          "environment": "Forest, Mountain, Swamp, Cavern"
        },
        {
          "description": "Bandit",
          "clue": "Hushed whispers and the glint of hidden weapons",
          "environment": "Urban, Forest, Mountain"
        },
        {
          "description": "Banshee",
          "clue": "Eerie wailing and the sense of foreboding",
          "environment": "Dungeon, Cavern, Swamp"
        },
        {
          "description": "Basilisk",
          "clue": "Petrified statues and the scent of calcified stone",
          "environment": "Dungeon, Cavern, Urban"
        },
        {
          "description": "Black Dragon",
          "clue": "Acrid smoke and the deep rumble of a growl",
          "environment": "Dungeon, Swamp, Cavern"
        },
        {
          "description": "Blink Dog",
          "clue": "Teleporting woofs and the flicker of disappearing",
          "environment": "Forest, Dungeon"
        },
        {
          "description": "Blue Dragon",
          "clue": "Crackling electricity and the faint odor of ozone",
          "environment": "Dungeon, Desert, Cavern"
        },
        {
          "description": "Bugbear",
          "clue": "Low growls and the faint rustle of fur",
          "environment": "Dungeon, Cavern, Forest"
        },
        {
          "description": "Centaur",
          "clue": "Hoofbeats and the rustle of leaves",
          "environment": "Forest, Field"
        },
        {
          "description": "Chimera",
          "clue": "Roaring roars and a mix of distinct animal scents",
          "environment": "Mountain, Field"
        },
        {
          "description": "Cloud Giant",
          "clue": "Distorted voices and a floating sensation",
          "environment": "Mountain, Airborne"
        },
        {
          "description": "Cultist",
          "clue": "Chanting voices and the scent of incense",
          "environment": "Dungeon, Urban, Cavern"
        },
        {
          "description": "Dire Wolf",
          "clue": "Deep growls and the sound of snapping jaws",
          "environment": "Forest, Mountain"
        },
        {
          "description": "Displacer Beast",
          "clue": "Flickering shadows and the illusion of multiple forms",
          "environment": "Forest, Dungeon"
        },
        {
          "description": "Djinni",
          "clue": "Whirling winds and the sweet smell of spices",
          "environment": "Desert, Dungeon, Urban"
        },
        {
          "description": "Doppleganger",
          "clue": "Mirrored reflections and the flicker of shadows",
          "environment": "Dungeon, Urban"
        },
        {
          "description": "Drow Elf",
          "clue": "Quiet footsteps and the hushed rustle of silk",
          "environment": "Dungeon, Urban, Cavern"
        },
        {
          "description": "Druid",
          "clue": "footprints that change",
          "environment": "Forest, Cavern, Mountain, Swamp, Arctic, Desert"
        },
        {
          "description": "Dryad",
          "clue": "Whispers in the wind and the scent of blossoms",
          "environment": "Forest"
        },
        {
          "description": "Earth Elemental",
          "clue": "Grinding stones and the faint tremor of the ground",
          "environment": "Dungeon, Cavern, Mountain"
        },
        {
          "description": "Efreeti",
          "clue": "Crackling flames and the acrid scent of smoke",
          "environment": "Desert, Dungeon, Urban"
        },
        {
          "description": "Ettercap",
          "clue": "thick spiderwebs",
          "environment": "Cavern, Forest, Dungeon"
        },
        {
          "description": "Fire Elemental",
          "clue": "Crackling flames and the scent of burning embers",
          "environment": "Dungeon, Urban, Desert"
        },
        {
          "description": "Flesh Golem",
          "clue": "Wet slaps and the odor of rotting flesh",
          "environment": "Dungeon, Urban"
        },
        {
          "description": "Flumph",
          "clue": "Popping noises and a faint aroma of spices",
          "environment": "Dungeon, Urban, Forest"
        },
        {
          "description": "flying snake",
          "clue": "lots of dead birds",
          "environment": "Forest, Mountain, Field"
        },
        {
          "description": "Frost Giant",
          "clue": "Frosty breath and the sound of cracking ice",
          "environment": "Arctic, Mountain"
        },
        {
          "description": "Gargoyle",
          "clue": "Stone scraping on stone and an eerie silence",
          "environment": "Dungeon, Urban, Cavern"
        },
        {
          "description": "Gelatinous Cube",
          "clue": "Squelching noises and the tangy scent of acid",
          "environment": "Dungeon, Cavern"
        },
        {
          "description": "Ghost",
          "clue": "pockets of cold air",
          "environment": "Dungeon, Urban, Forest, Mountain, Desert, Cavern, Arctic, Field"
        },
        {
          "description": "Ghoul",
          "clue": "Eerie moans and the stench of decayed flesh",
          "environment": "Dungeon, Cavern, Urban"
        },
        {
          "description": "Giant",
          "clue": "Tremors in the ground and a looming shadow",
          "environment": "Mountain, Field"
        },
        {
          "description": "Giant Bat",
          "clue": "Flapping wings and echoes bouncing off the walls",
          "environment": "Dungeon, Cavern, Urban"
        },
        {
          "description": "giant beetle",
          "clue": "chittering",
          "environment": null
        },
        {
          "description": "giant cat",
          "clue": "hissing and mewling in the night",
          "environment": null
        },
        {
          "description": "Giant Centipede",
          "clue": "Chittering",
          "environment": "Dungeon, Cavern, Forest"
        },
        {
          "description": "Giant Crab",
          "clue": "Clicking claws and the salty smell of seawater",
          "environment": "Underwater, Coastal"
        },
        {
          "description": "Giant Eagle",
          "clue": "Piercing cries and the sound of powerful wingbeats",
          "environment": "Mountain, Airborne"
        },
        {
          "description": "giant lizard",
          "clue": "repitillian footprints",
          "environment": null
        },
        {
          "description": "Giant Octopus",
          "clue": "Suction cup sounds and the smell of oceanic musk",
          "environment": "Underwater"
        },
        {
          "description": "Giant Owl",
          "clue": "Silent wings and the hoot of nocturnal hunting",
          "environment": "Forest, Dungeon, Mountain"
        },
        {
          "description": "Giant Rat",
          "clue": "Squeaking noises and chewed-up scraps of food",
          "environment": "Dungeon, Urban, Cavern"
        },
        {
          "description": "Giant Scorpion",
          "clue": "Clicking pincers and the sound of scuttling claws",
          "environment": "Dungeon, Cavern, Desert"
        },
        {
          "description": "Giant Shark",
          "clue": "Rushing water and the ominous shadow beneath the waves",
          "environment": "Underwater, Coastal"
        },
        {
          "description": "Giant Snake",
          "clue": "large pairs of puncture wounds",
          "environment": "Dungeon, Forest, Swamp"
        },
        {
          "description": "Giant Spider",
          "clue": "Sticky webs",
          "environment": "Dungeon, Forest, Cavern"
        },
        {
          "description": "Giant Toad",
          "clue": "Wet croaking and the slurping of a long tongue",
          "environment": "Swamp, Forest"
        },
        {
          "description": "Gibbering Mouther",
          "clue": "Gurgling sounds and an unsettling cacophony",
          "environment": "Dungeon, Cavern"
        },
        {
          "description": "Gnoll",
          "clue": "Howling laughter and the smell of wet fur",
          "environment": "Dungeon, Cavern, Desert"
        },
        {
          "description": "Goblin",
          "clue": "High-pitched laughter and the smell of rotting food",
          "environment": "Dungeon, Urban, Forest"
        },
        {
          "description": "Golem",
          "clue": "Creaking joints and the grinding of stone",
          "environment": "Dungeon, Urban, Cavern"
        },
        {
          "description": "Gorgon",
          "clue": "Metallic clinking and the scent of rust",
          "environment": "Dungeon, Cavern, Field"
        },
        {
          "description": "Green Dragon",
          "clue": "Lingering scent of acid and the rustling of leaves",
          "environment": "Forest, Swamp"
        },
        {
          "description": "Grell",
          "clue": "Squelching suction and the sound of a beak snapping",
          "environment": "Dungeon, Cavern"
        },
        {
          "description": "Harpy",
          "clue": "Haunting melodies and the sound of beating wings",
          "environment": "Mountain, Forest"
        },
        {
          "description": "Harpy",
          "clue": "Haunting melodies and the sound of beating wings",
          "environment": "Mountain, Forest"
        },
        {
          "description": "Hellhound",
          "clue": "Guttural growls and the smell of sulfur",
          "environment": "Dungeon, Urban, Swamp"
        },
        {
          "description": "Hill Giant",
          "clue": "Earthquaking footfalls and deep, rumbling laughter",
          "environment": "Mountain, Field"
        },
        {
          "description": "hobgoblin",
          "clue": "the stink of garbage",
          "environment": null
        },
        {
          "description": "homunculus",
          "clue": "rumors of something almost human",
          "environment": null
        },
        {
          "description": "Hook Horror",
          "clue": "Echoing clicks and the scratching of talons",
          "environment": "Dungeon, Cavern"
        },
        {
          "description": "Imp",
          "clue": "Sinister chuckling and the faint whiff of brimstone",
          "environment": "Dungeon, Urban, Cavern"
        },
        {
          "description": "Intellect Devourer",
          "clue": "Strange buzzing and a metallic taste in the air",
          "environment": "Dungeon, Urban"
        },
        {
          "description": "Invisible Stalker",
          "clue": "Whispering winds and the feeling of being watched",
          "environment": "Dungeon, Urban"
        },
        {
          "description": "Iron Golem",
          "clue": "Heavy footfalls and the metallic clang of movement",
          "environment": "Dungeon, Urban"
        },
        {
          "description": "knight",
          "clue": "an armoured stranger",
          "environment": null
        },
        {
          "description": "Kobold",
          "clue": "Flickering torchlight and faint skittering sounds",
          "environment": "Dungeon, Cavern, Urban"
        },
        {
          "description": "Kraken",
          "clue": "Deep rumbling and the sound of crashing waves",
          "environment": "Underwater, Coastal"
        },
        {
          "description": "Lamia",
          "clue": "Seductive whispers and the faint aroma of perfume",
          "environment": "Dungeon, Urban"
        },
        {
          "description": "Lich",
          "clue": "Whispers of forbidden knowledge and a cold aura",
          "environment": "Dungeon, Cavern, Urban"
        },
        {
          "description": "mage",
          "clue": "a stranger asking for strange ingredients and curios",
          "environment": null
        },
        {
          "description": "Manticore",
          "clue": "Roaring growls and the sound of flapping wings",
          "environment": "Mountain, Desert"
        },
        {
          "description": "Medusa",
          "clue": "The sound of slithering scales and a lingering hiss",
          "environment": "Dungeon, Cavern, Urban"
        },
        {
          "description": "Merfolk",
          "clue": "Soft singing and the scent of sea breeze",
          "environment": "Underwater, Coastal"
        },
        {
          "description": "mimic",
          "clue": "objects appearing and disappearing",
          "environment": null
        },
        {
          "description": "Minotaur",
          "clue": "Heavy footsteps and the distant sound of snorting",
          "environment": "Dungeon, Cavern, Urban"
        },
        {
          "description": "myconid",
          "clue": "fungal growths on the walls",
          "environment": null
        },
        {
          "description": "naga",
          "clue": "scraps of snake skin",
          "environment": null
        },
        {
          "description": "Nymph",
          "clue": "Enchanting melodies and the fragrance of flowers",
          "environment": "Forest, Swamp"
        },
        {
          "description": "Ochre Jelly",
          "clue": "Squishy movements and the sound of dissolving matter",
          "environment": "Dungeon, Cavern, Swamp"
        },
        {
          "description": "Ogre",
          "clue": "Deep grunts and the thud of heavy footsteps",
          "environment": "Dungeon, Cavern, Urban"
        },
        {
          "description": "ooze",
          "clue": "trails of hissing slime",
          "environment": null
        },
        {
          "description": "Orc",
          "clue": "Grunts and the stench of unwashed bodies",
          "environment": "Dungeon, Urban, Mountain"
        },
        {
          "description": "Owlbear",
          "clue": "Deep hoots and the rustling of underbrush",
          "environment": "Forest, Mountain"
        },
        {
          "description": "Pegasus",
          "clue": "Hooves on clouds and the soft flutter of wings",
          "environment": "Airborne, Mountain"
        },
        {
          "description": "Pixie",
          "clue": "Musical laughter and the faint glimmer of fairy dust",
          "environment": "Forest, Urban"
        },
        {
          "description": "quaggoth",
          "clue": "mint coloured fur and claw marks",
          "environment": null
        },
        {
          "description": "Red Dragon",
          "clue": "Sulphurous fumes and the heat of an approaching fire",
          "environment": "Dungeon, Mountain"
        },
        {
          "description": "revenant",
          "clue": "a mysterious stranger in the night",
          "environment": null
        },
        {
          "description": "Rust Monster",
          "clue": "all their tools rusting away",
          "environment": "Dungeon, Urban, Cavern"
        },
        {
          "description": "Sahuagin",
          "clue": "Bubbling and the smell of saltwater",
          "environment": "Underwater"
        },
        {
          "description": "Satyr",
          "clue": "Lively flute tunes and the smell of nature",
          "environment": "Forest"
        },
        {
          "description": "scarecrow",
          "clue": "tufts of straw",
          "environment": null
        },
        {
          "description": "scout",
          "clue": "a nimble stranger in the outskirts",
          "environment": null
        },
        {
          "description": "Sea Hag",
          "clue": "Cackling laughter and the pungent odor of decay",
          "environment": "Underwater, Coastal, Swamp"
        },
        {
          "description": "Skeleton",
          "clue": "Fragments of bone and a clattering noise",
          "environment": "Dungeon, Cavern, Urban"
        },
        {
          "description": "Specter",
          "clue": "Wisps of ethereal mist and a chilling touch",
          "environment": "Dungeon, Cavern, Urban"
        },
        {
          "description": "specter",
          "clue": "a plague of nightmares",
          "environment": null
        },
        {
          "description": "Sprite",
          "clue": "Faint tinkling sounds and the scent of flowers",
          "environment": "Forest, Dungeon"
        },
        {
          "description": "Storm Giant",
          "clue": "Crackling thunder and the scent of ozone",
          "environment": "Mountain, Airborne"
        },
        {
          "description": "Treant",
          "clue": "Creaking wood and the aroma of fresh soil",
          "environment": "Forest"
        },
        {
          "description": "troglodyte",
          "clue": "an ancient fishy smell",
          "environment": null
        },
        {
          "description": "troll",
          "clue": "the stink of rotting vegetation",
          "environment": null
        },
        {
          "description": "Unicorn",
          "clue": "Distant whinnies and the aroma of purity",
          "environment": "Forest"
        },
        {
          "description": "Vampiric Mist",
          "clue": "Whispers in the air and a cold misty presence",
          "environment": "Dungeon, Swamp, Cavern"
        },
        {
          "description": "Water Elemental",
          "clue": "Dripping water and the rhythmic sound of waves",
          "environment": "Dungeon, Underwater"
        },
        {
          "description": "Werewolf",
          "clue": "Eerie howls carried on the wind and the smell of fur",
          "environment": "Forest, Mountain"
        },
        {
          "description": "White Dragon",
          "clue": "Icy breath and the sound of cracking ice",
          "environment": "Arctic, Mountain"
        },
        {
          "description": "wight",
          "clue": "the stink of rotting flesh and wisps of mysterious light",
          "environment": null
        },
        {
          "description": "Winter Wolf",
          "clue": "Frosty breath and the howl of an icy wind",
          "environment": "Arctic, Forest"
        },
        {
          "description": "Wraith",
          "clue": "Whispering voices and a chilling breeze",
          "environment": "Dungeon, Cavern, Swamp"
        },
        {
          "description": "Wyvern",
          "clue": "Fierce screeches and the sound of beating wings",
          "environment": "Mountain, Desert"
        },
        {
          "description": "Yeti",
          "clue": "Roaring growls and the crunch of snow underfoot",
          "environment": "Arctic, Mountain"
        },
        {
          "description": "Yuan-Ti",
          "clue": "Serpentine hissing and the flicker of forked tongues",
          "environment": "Dungeon, Cavern, Swamp"
        },
        {
          "description": "Zombie",
          "clue": "Shuffling footsteps and a putrid smell",
          "environment": "Dungeon, Cavern, Swamp"
        },
        {
          "description": "Zombie Dragon",
          "clue": "Rotting flesh and the faint sound of wings flapping",
          "environment": "Dungeon, Swamp, Cavern"
        },
        {
          "description": "zombie knight",
          "clue": "the stink of rotten flesh and the clank of armour",
          "environment": null
        }
        ],
    'offensiveQuirk':
    [
        {
          "description": "Acidic blood",
          "clue": "Corrosive and bubbling liquid"
        },
        {
          "description": "Acidic breath",
          "clue": "Dissolved and corroded materials"
        },
        {
          "description": "Acidic cloud",
          "clue": "Corroded and damaged surfaces"
        },
        {
          "description": "Acidic eruption",
          "clue": "Dissolved and sizzling eruptions"
        },
        {
          "description": "Acidic excretion",
          "clue": "Dissolving and sizzling substances"
        },
        {
          "description": "Acidic fog",
          "clue": "Corroded and eroded surroundings"
        },
        {
          "description": "Acidic gas",
          "clue": "Corrosive and choking vapor"
        },
        {
          "description": "Acidic ground",
          "clue": "Dissolved and corroded terrain"
        },
        {
          "description": "Acidic mists",
          "clue": "Corroded and disintegrated matter"
        },
        {
          "description": "Acidic rain",
          "clue": "Dissolving and corroded surfaces"
        },
        {
          "description": "Acidic rain of fire",
          "clue": "Dissolving and charred objects"
        },
        {
          "description": "Acidic rain of projectiles",
          "clue": "Dissolving and corroded objects"
        },
        {
          "description": "Acidic saliva",
          "clue": "Corroded and melted objects"
        },
        {
          "description": "Acidic shockwave",
          "clue": "Dissolved and melted surroundings"
        },
        {
          "description": "Acidic shockwaves",
          "clue": "Dissolved and corroded surroundings"
        },
        {
          "description": "Acidic skin",
          "clue": "Corroded and peeling flesh"
        },
        {
          "description": "Acidic slime trail",
          "clue": "Dissolving footprints"
        },
        {
          "description": "Acidic spikes",
          "clue": "Dissolved and eroded surfaces"
        },
        {
          "description": "Acidic spittle",
          "clue": "Melting and eroding substances"
        },
        {
          "description": "Acidic spores",
          "clue": "Corroded and withered vegetation"
        },
        {
          "description": "Acidic storm",
          "clue": "Dissolved and corroded surroundings"
        },
        {
          "description": "Acidic talons",
          "clue": "Dissolved and disfigured surfaces"
        },
        {
          "description": "Acidic tears",
          "clue": "Dissolved and eroded surfaces"
        },
        {
          "description": "Acidic tentacles",
          "clue": "Dissolved and eroded objects"
        },
        {
          "description": "Acidic tentacles",
          "clue": "Dissolved and eroded objects"
        },
        {
          "description": "Acidic vomit",
          "clue": "Corroded and bubbling substances"
        },
        {
          "description": "Acidic vortex",
          "clue": "Dissolved and corroded matter"
        },
        {
          "description": "Acidic waves",
          "clue": "Corroded and eroded surfaces"
        },
        {
          "description": "Acidic webbing",
          "clue": "Dissolved and weakened structures"
        },
        {
          "description": "Armored carapace",
          "clue": "Impenetrable shell and deflecting blows"
        },
        {
          "description": "Astral chains",
          "clue": "Restrained and immobilized victims"
        },
        {
          "description": "Astral disruption",
          "clue": "Distorted reality and fractured existence"
        },
        {
          "description": "Astral disruption field",
          "clue": "Disrupted energies and chaotic effects"
        },
        {
          "description": "Astral drain",
          "clue": "Weakened energy and fading life force"
        },
        {
          "description": "Astral duplicates",
          "clue": "Translucent copies and confusion"
        },
        {
          "description": "Astral manipulation",
          "clue": "Phasing through objects and ethereal presence"
        },
        {
          "description": "Astral manipulation",
          "clue": "Phasing through objects and ethereal presence"
        },
        {
          "description": "Astral phasing",
          "clue": "Intangible and ghostly appearances"
        },
        {
          "description": "Astral possession",
          "clue": "Controlled and manipulated bodies"
        },
        {
          "description": "Astral projection",
          "clue": "Translucent figures and ethereal essence"
        },
        {
          "description": "Astral shields",
          "clue": "Impenetrable barriers and deflected attacks"
        },
        {
          "description": "Astral vortex",
          "clue": "Distorted space and turbulent energies"
        },
        {
          "description": "Blinding flash",
          "clue": "Temporary blindness and disorientation"
        },
        {
          "description": "Blinding flash",
          "clue": "Temporary blindness and disorientation"
        },
        {
          "description": "Blinding glare",
          "clue": "Temporary blindness"
        },
        {
          "description": "Blood-boiling aura",
          "clue": "Scalding and steam around the monster"
        },
        {
          "description": "Blood-coagulating touch",
          "clue": "Clotted and congealed wounds"
        },
        {
          "description": "Blood-consuming tendrils",
          "clue": "Drained and pale victims"
        },
        {
          "description": "Blood-curdling howl",
          "clue": "Bloodied ears and paralyzing fear"
        },
        {
          "description": "Blood-draining fangs",
          "clue": "Pale and lifeless bodies"
        },
        {
          "description": "Blood-drinking proboscis",
          "clue": "Drained and pale victims"
        },
        {
          "description": "Blood-freezing gaze",
          "clue": "Frostbite and icy breath"
        },
        {
          "description": "Blood-fueled regeneration",
          "clue": "Rapid healing and clotting wounds"
        },
        {
          "description": "Blood-infused armor",
          "clue": "Enhanced defenses and unstoppable force"
        },
        {
          "description": "Blood-obsidian skin",
          "clue": "Dark and obsidian-like complexion"
        },
        {
          "description": "Blood-replenishing bite",
          "clue": "Rapid healing and vitality"
        },
        {
          "description": "Blood-thirsting maw",
          "clue": "Savage bites and gory remains"
        },
        {
          "description": "Bloodthirsty frenzy",
          "clue": "Savagely torn and mutilated victims"
        },
        {
          "description": "Bone-chilling breath",
          "clue": "Frost-covered surfaces and icy air"
        },
        {
          "description": "Bone-chilling touch",
          "clue": "Numbness and icy sensations"
        },
        {
          "description": "Bone-cracking tail whip",
          "clue": "Fractured bones and injured victims"
        },
        {
          "description": "Bone-crumbling grasp",
          "clue": "Fragile and shattered skeletons"
        },
        {
          "description": "Bone-crushing grip",
          "clue": "Crushed bones and flattened objects"
        },
        {
          "description": "Bone-crushing jaws",
          "clue": "Crushed skulls and shattered bones"
        },
        {
          "description": "Bone-devouring maw",
          "clue": "Cracked and gnawed bones"
        },
        {
          "description": "Bone-eroding touch",
          "clue": "Dissolving and crumbling skeletons"
        },
        {
          "description": "Bone-liquefying acid",
          "clue": "Dissolving skeletons and sizzling bones"
        },
        {
          "description": "Bone-liquefying touch",
          "clue": "Dissolving and sizzling bones"
        },
        {
          "description": "Bone-piercing gaze",
          "clue": "Perforated skeletons and shattered bones"
        },
        {
          "description": "Bone-piercing projectiles",
          "clue": "Impaled and shattered objects"
        },
        {
          "description": "Bone-piercing shriek",
          "clue": "Perforated skeletons and shattered bones"
        },
        {
          "description": "Bone-rending screech",
          "clue": "Shattered and fractured bones"
        },
        {
          "description": "Bone-shattering blows",
          "clue": "Fractured skeletons and shattered bones"
        },
        {
          "description": "Bone-shattering grip",
          "clue": "Crushed bones and shattered objects"
        },
        {
          "description": "Bone-shattering kicks",
          "clue": "Fractured skeletons and shattered bones"
        },
        {
          "description": "Bone-shattering roar",
          "clue": "Cracked structures and shattered windows"
        },
        {
          "description": "Bone-shattering roars",
          "clue": "Cracked structures and shattered windows"
        },
        {
          "description": "Bone-shattering strikes",
          "clue": "Fractured skeletons and shattered bones"
        },
        {
          "description": "Bone-snapping strikes",
          "clue": "Fractured bones and mangled limbs"
        },
        {
          "description": "Bone-spiked exoskeleton",
          "clue": "Pierced and impaled victims"
        },
        {
          "description": "Chameleon-like camouflage",
          "clue": "Disappearing and blending with surroundings"
        },
        {
          "description": "Corrosive aura",
          "clue": "Dissolving and corroded objects"
        },
        {
          "description": "Corrosive bite",
          "clue": "Dissolving and eroding flesh"
        },
        {
          "description": "Corrosive fog",
          "clue": "Dissolved and disintegrated materials"
        },
        {
          "description": "Corrosive mist",
          "clue": "Dissolving and corroded surroundings"
        },
        {
          "description": "Corrosive touch",
          "clue": "Eroded and deteriorated objects"
        },
        {
          "description": "Cursed touch",
          "clue": "Unfortunate events and misfortune"
        },
        {
          "description": "Cursed touch",
          "clue": "Unfortunate events and misfortune"
        },
        {
          "description": "Decay-inducing aura",
          "clue": "Rotting and crumbling surroundings"
        },
        {
          "description": "Decaying touch",
          "clue": "Rotting and withering vegetation"
        },
        {
          "description": "Desiccating touch",
          "clue": "Withered and dried-out bodies"
        },
        {
          "description": "Disemboweling claws",
          "clue": "Torn and eviscerated victims"
        },
        {
          "description": "Disintegrating energy beams",
          "clue": "Vaporized and obliterated objects"
        },
        {
          "description": "Disintegrating essence",
          "clue": "Vanishing and evaporating presence"
        },
        {
          "description": "Disintegrating shadows",
          "clue": "Fading and vanishing darkness"
        },
        {
          "description": "Disintegrating touch",
          "clue": "Vanished and crumbling objects"
        },
        {
          "description": "Dismembering appendages",
          "clue": "Severed limbs and torn bodies"
        },
        {
          "description": "Ear-piercing screech",
          "clue": "Eardrums ruptured and disoriented"
        },
        {
          "description": "Ectoplasmic projection",
          "clue": "Transparent figures and ethereal essence"
        },
        {
          "description": "Ectoplasmic tendrils",
          "clue": "Translucent and ethereal appendages"
        },
        {
          "description": "Electric shock touch",
          "clue": "Convulsions and tingling sensations"
        },
        {
          "description": "Erupting boils",
          "clue": "Painful and infectious wounds"
        },
        {
          "description": "Eviscerating whirlwind",
          "clue": "Mangled and disemboweled victims"
        },
        {
          "description": "Exploding projectiles",
          "clue": "Explosions and shattered debris"
        },
        {
          "description": "Exploding touch",
          "clue": "Shattered and disintegrated objects"
        },
        {
          "description": "Fear-inducing presence",
          "clue": "Trembling and fleeing victims"
        },
        {
          "description": "Fire-absorbing skin",
          "clue": "Flames extinguished and scorched marks"
        },
        {
          "description": "Flame-spewing mouth",
          "clue": "Scorch marks and charred surroundings"
        },
        {
          "description": "Flesh-disintegrating acid",
          "clue": "Melting and dissolving flesh"
        },
        {
          "description": "Flesh-dissolving touch",
          "clue": "Melting and dissolving skin"
        },
        {
          "description": "Flesh-eating acid",
          "clue": "Dissolved and disfigured flesh"
        },
        {
          "description": "Flesh-eating tentacles",
          "clue": "Torn and devoured flesh"
        },
        {
          "description": "Flesh-liquefying gaze",
          "clue": "Melting and dissolving tissue"
        },
        {
          "description": "Flesh-melding touch",
          "clue": "Merged and fused limbs"
        },
        {
          "description": "Flesh-melting aura",
          "clue": "Melting and dissolving skin"
        },
        {
          "description": "Flesh-melting spittle",
          "clue": "Melting and dissolving substances"
        },
        {
          "description": "Flesh-rotting spores",
          "clue": "Rotten and decayed flesh"
        },
        {
          "description": "Flesh-searing gaze",
          "clue": "Burned and blistered skin"
        },
        {
          "description": "Flesh-shredding whirlwind",
          "clue": "Torn and lacerated victims"
        },
        {
          "description": "Flesh-twisting tendrils",
          "clue": "Writhing and contorted victims"
        },
        {
          "description": "Foul-smelling secretion",
          "clue": "Repulsive odor and nauseated victims"
        },
        {
          "description": "Hallucination-inducing scent",
          "clue": "Disoriented and confused victims"
        },
        {
          "description": "Hypersonic shriek",
          "clue": "Shattered glass and ruptured eardrums"
        },
        {
          "description": "Hypnotic gaze",
          "clue": "Dazed and entranced victims"
        },
        {
          "description": "Illusionary affliction",
          "clue": "Misleading senses and false sensations"
        },
        {
          "description": "Illusionary disorientation",
          "clue": "Disoriented senses and false perceptions"
        },
        {
          "description": "Illusionary terrain",
          "clue": "Disoriented and misled victims"
        },
        {
          "description": "Illusionary transformation",
          "clue": "Altered appearance and confusion"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Multiple copies and confusion"
        },
        {
          "description": "Illusory nightmares",
          "clue": "Terrifying dreams and sleepless nights"
        },
        {
          "description": "Illusory phantoms",
          "clue": "Ghostly figures and spectral illusions"
        },
        {
          "description": "Illusory torment",
          "clue": "Distorted perceptions and tormenting visions"
        },
        {
          "description": "Illusory whispers",
          "clue": "Misleading information and confusion"
        },
        {
          "description": "Inflammable fur",
          "clue": "Engulfed in flames"
        },
        {
          "description": "Invisible presence",
          "clue": "Displaced objects and cold gusts"
        },
        {
          "description": "Lethal spiky scales",
          "clue": "Impaled victims and punctured armor"
        },
        {
          "description": "Lightning strikes",
          "clue": "Burn marks and static in the air"
        },
        {
          "description": "Magma-filled veins",
          "clue": "Molten trails and scorching heat"
        },
        {
          "description": "Magma-infused breath",
          "clue": "Molten rock and scorch marks"
        },
        {
          "description": "Melting gaze",
          "clue": "Melted and distorted objects"
        },
        {
          "description": "Melting touch",
          "clue": "Dissolved and liquefied substances"
        },
        {
          "description": "Mind control",
          "clue": "Controlled and manipulated behavior"
        },
        {
          "description": "Mind-controlling spores",
          "clue": "Controlled thoughts and manipulated behavior"
        },
        {
          "description": "Mind-shattering blasts",
          "clue": "Concussed victims and shattered thoughts"
        },
        {
          "description": "Mind-shredding screech",
          "clue": "Bleeding ears and mental distress"
        },
        {
          "description": "Mind-twisting illusions",
          "clue": "Hallucinations and distorted reality"
        },
        {
          "description": "Necrotic aura",
          "clue": "Decaying and rotting flesh"
        },
        {
          "description": "Necrotic touch",
          "clue": "Decaying and festering wounds"
        },
        {
          "description": "Necrotic whispers",
          "clue": "Decaying and rotting sounds"
        },
        {
          "description": "Pain-inducing aura",
          "clue": "Writhing in agony and weakened bodies"
        },
        {
          "description": "Paralyzing shriek",
          "clue": "Stiffened and immobile victims"
        },
        {
          "description": "Paralyzing touch",
          "clue": "Stiff and immobile victims"
        },
        {
          "description": "Paralyzing venom",
          "clue": "Immobilized and stiff victims"
        },
        {
          "description": "Petrifying gaze",
          "clue": "Statuesque victims"
        },
        {
          "description": "Phantasmal apparitions",
          "clue": "Ghostly figures and spectral movements"
        },
        {
          "description": "Phantasmal duplicates",
          "clue": "Illusory copies and confusion"
        },
        {
          "description": "Phantasmal whispers",
          "clue": "Haunting and eerie voices"
        },
        {
          "description": "Plant manipulation",
          "clue": "Ensnared victims and overgrown areas"
        },
        {
          "description": "Poisonous breath",
          "clue": "Nausea and vomiting"
        },
        {
          "description": "Poisonous pollen",
          "clue": "Coughing and respiratory distress"
        },
        {
          "description": "Poisonous thorns",
          "clue": "Prick marks and poisonous secretions"
        },
        {
          "description": "Psychic backlash",
          "clue": "Mental pain and confusion"
        },
        {
          "description": "Psychic bombardment",
          "clue": "Wracked with pain and migraines"
        },
        {
          "description": "Psychic disintegration",
          "clue": "Fragmented consciousness and madness"
        },
        {
          "description": "Psychic dissonance",
          "clue": "Mental distress and confusion"
        },
        {
          "description": "Psychic domination",
          "clue": "Controlled actions and loss of free will"
        },
        {
          "description": "Psychic feedback",
          "clue": "Mental anguish and disorientation"
        },
        {
          "description": "Psychic fragmentation",
          "clue": "Shattered thoughts and fragmented memories"
        },
        {
          "description": "Psychic fragmentation",
          "clue": "Shattered thoughts and fragmented memories"
        },
        {
          "description": "Psychic overload",
          "clue": "Mental strain and excruciating pain"
        },
        {
          "description": "Psychic paralysis",
          "clue": "Motionless and catatonic victims"
        },
        {
          "description": "Psychic screams",
          "clue": "Writhing in pain and clutching ears"
        },
        {
          "description": "Pyrokinetic explosions",
          "clue": "Fiery detonations and scorching flames"
        },
        {
          "description": "Pyrokinetic powers",
          "clue": "Ignited objects and scorching heat"
        },
        {
          "description": "Razor-edged tail",
          "clue": "Deep lacerations and slashed objects"
        },
        {
          "description": "Razor-edged wings",
          "clue": "Deep lacerations and shredded objects"
        },
        {
          "description": "Razor-sharp claws",
          "clue": "Deep gouges and shredded surfaces"
        },
        {
          "description": "Razor-sharp feathers",
          "clue": "Deep cuts and bloodied wounds"
        },
        {
          "description": "Reality-distorting screams",
          "clue": "Distorted surroundings and disorientation"
        },
        {
          "description": "Reality-manipulating illusions",
          "clue": "Distorted perception and false realities"
        },
        {
          "description": "Reality-warping powers",
          "clue": "Distorted surroundings and surreal phenomena"
        },
        {
          "description": "Rot-inducing touch",
          "clue": "Rotten and decaying flesh"
        },
        {
          "description": "Rotting breath",
          "clue": "Decayed and putrid odor"
        },
        {
          "description": "Rotting tendrils",
          "clue": "Decayed and withering appendages"
        },
        {
          "description": "Rotting touch",
          "clue": "Decayed and putrefied flesh"
        },
        {
          "description": "Sanguineous explosion",
          "clue": "Blood splatters and gory remains"
        },
        {
          "description": "Shadow manipulation",
          "clue": "Darkened areas and shifting shadows"
        },
        {
          "description": "Shadow tentacles",
          "clue": "Writhing and entangled victims"
        },
        {
          "description": "Shadowy tendrils",
          "clue": "Writhing and ensnared victims"
        },
        {
          "description": "Shadowy whispers",
          "clue": "Eerie voices and sinister messages"
        },
        {
          "description": "Sonic wave generation",
          "clue": "Shattered glass and disoriented victims"
        },
        {
          "description": "Soul-constricting chains",
          "clue": "Hindered movement and suffocation"
        },
        {
          "description": "Soul-consuming tendrils",
          "clue": "Emptiness and drained life force"
        },
        {
          "description": "Soul-consuming vortex",
          "clue": "Vanished spirits and emptiness"
        },
        {
          "description": "Soul-corroding gaze",
          "clue": "Hollow and lifeless eyes"
        },
        {
          "description": "Soul-corrupting touch",
          "clue": "Haunting nightmares and despair"
        },
        {
          "description": "Soul-crushing presence",
          "clue": "Overwhelming despair and hopelessness"
        },
        {
          "description": "Soul-devouring maw",
          "clue": "Emotionless and hollow-eyed victims"
        },
        {
          "description": "Soul-devouring vortex",
          "clue": "Emptiness and loss of spiritual essence"
        },
        {
          "description": "Soul-draining mist",
          "clue": "Weakened life force and lethargy"
        },
        {
          "description": "Soul-draining tendrils",
          "clue": "Weakened and lifeless victims"
        },
        {
          "description": "Soul-draining touch",
          "clue": "Weak and lifeless victims"
        },
        {
          "description": "Soul-extinguishing touch",
          "clue": "Emptiness and loss of vitality"
        },
        {
          "description": "Soul-manipulating whispers",
          "clue": "Compromised willpower and erratic behavior"
        },
        {
          "description": "Soul-rending claws",
          "clue": "Torn and shattered spiritual essence"
        },
        {
          "description": "Soul-stealing claws",
          "clue": "Lifeless husks and drained vitality"
        },
        {
          "description": "Supernatural agility",
          "clue": "Blurred movements and acrobatic feats"
        },
        {
          "description": "Telekinetic powers",
          "clue": "Levitating objects and disturbed air"
        },
        {
          "description": "Telekinetic throws",
          "clue": "Levitating objects and disturbed air"
        },
        {
          "description": "Telepathic invasion",
          "clue": "Intrusive thoughts and mental anguish"
        },
        {
          "description": "Teleportation",
          "clue": "Mysterious disappearances"
        },
        {
          "description": "Tentacles with barbed hooks",
          "clue": "Lacerations and bloodied surfaces"
        },
        {
          "description": "Tentacles with bone hooks",
          "clue": "Impaled and skewered victims"
        },
        {
          "description": "Tentacles with suction cups",
          "clue": "Bruised and hickey-like marks"
        },
        {
          "description": "Time manipulation",
          "clue": "Time freezes and temporal anomalies"
        },
        {
          "description": "Time-slowing aura",
          "clue": "Sluggish movements and distorted time"
        },
        {
          "description": "Toxic spines",
          "clue": "Painful welts and numbness"
        },
        {
          "description": "Vampiric drain",
          "clue": "Weak and emaciated victims"
        },
        {
          "description": "Vampiric tendrils",
          "clue": "Drained life force and weakened victims"
        },
        {
          "description": "Venomous bite",
          "clue": "Swelling and discoloration"
        },
        {
          "description": "Venomous blades",
          "clue": "Lacerations with greenish hue"
        },
        {
          "description": "Venomous breath",
          "clue": "Blisters and necrotic tissue"
        },
        {
          "description": "Venomous claws",
          "clue": "Infected wounds and greenish hue"
        },
        {
          "description": "Venomous cloud",
          "clue": "Nausea and disorientation"
        },
        {
          "description": "Venomous darts",
          "clue": "Puncture wounds with greenish hue"
        },
        {
          "description": "Venomous embrace",
          "clue": "Painful constriction and envenomed wounds"
        },
        {
          "description": "Venomous essence",
          "clue": "Toxic residue and noxious fumes"
        },
        {
          "description": "Venomous essence",
          "clue": "Toxic residue and noxious fumes"
        },
        {
          "description": "Venomous fumes",
          "clue": "Nausea and asphyxiation"
        },
        {
          "description": "Venomous gas",
          "clue": "Choking and asphyxiation"
        },
        {
          "description": "Venomous gaze",
          "clue": "Blurred vision and stinging sensation"
        },
        {
          "description": "Venomous net",
          "clue": "Entrapped and paralyzed victims"
        },
        {
          "description": "Venomous quills",
          "clue": "Prick marks and painful rashes"
        },
        {
          "description": "Venomous shadow tendrils",
          "clue": "Writhing and ensnared victims"
        },
        {
          "description": "Venomous spits",
          "clue": "Burn marks and melting substances"
        },
        {
          "description": "Venomous spurs",
          "clue": "Stinging wounds and paralyzing venom"
        },
        {
          "description": "Venomous spurs",
          "clue": "Stinging wounds and paralyzing venom"
        },
        {
          "description": "Venomous stinger",
          "clue": "Puncture wounds with greenish hue"
        },
        {
          "description": "Venomous swarm",
          "clue": "Bites and venomous secretions"
        },
        {
          "description": "Venomous tail spike",
          "clue": "Puncture wounds with greenish hue"
        },
        {
          "description": "Venomous tendrils",
          "clue": "Writhing and painful entanglement"
        },
        {
          "description": "Venomous tendrils with serrated edges",
          "clue": "Lacerations and greenish venom"
        },
        {
          "description": "Venomous tendrils with suction cups",
          "clue": "Bruises and immobilizing venom"
        },
        {
          "description": "Venomous touch",
          "clue": "Burning pain and necrotic flesh"
        },
        {
          "description": "Venomous vapor",
          "clue": "Nausea and poison-filled air"
        },
        {
          "description": "Venomous whispers",
          "clue": "Whispering death and paralyzing fear"
        },
        {
          "description": "Volatile blood",
          "clue": "Explosions and fiery eruptions"
        },
        {
          "description": "Vortex of destruction",
          "clue": "Whirling chaos and obliterated objects"
        },
        {
          "description": "Tentacles made of barbed wire",
          "clue": "Piercing wounds and shredded flesh"
        },
        {
          "description": "Acidic bile projectiles",
          "clue": "Dissolving and corroded armor"
        },
        {
          "description": "Telekinetic dismemberment",
          "clue": "Severed limbs floating in mid-air"
        },
        {
          "description": "Rotting touch",
          "clue": "Decaying and festering skin"
        },
        {
          "description": "Venomous tendrils",
          "clue": "Stinging and paralyzing toxins"
        },
        {
          "description": "Psychokinetic puppetry",
          "clue": "Controlled movements of manipulated adventurers"
        },
        {
          "description": "Symbiotic parasites that drain life energy",
          "clue": "Weakened adventurers and withered vitality"
        },
        {
          "description": "Corrosive shockwave",
          "clue": "Dissolving and crumbling surroundings"
        },
        {
          "description": "Illusory traps",
          "clue": "False spikes and pitfalls"
        },
        {
          "description": "Acidic venomous bites",
          "clue": "Corroded and sizzling wounds"
        },
        {
          "description": "Soul-sucking whispers",
          "clue": "Drained life force and weakened spirits"
        },
        {
          "description": "Disorienting hallucinations",
          "clue": "Distorted perceptions and false threats"
        },
        {
          "description": "Acidic vortex",
          "clue": "Corroded and sizzling cyclone"
        },
        {
          "description": "Bone-crushing hug",
          "clue": "Crushed bones and shattered ribcages"
        },
        {
          "description": "Shapeshifting mimicry",
          "clue": "Assumed forms of trusted allies"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Psychokinetic turbulence",
          "clue": "Thrown adventurers and chaotic movement"
        },
        {
          "description": "Telepathic nightmares",
          "clue": "Tormented dreams and sleep deprivation"
        },
        {
          "description": "Acidic tendrils",
          "clue": "Dissolving and corroded appendages"
        },
        {
          "description": "Rotting aura",
          "clue": "Decaying and putrid stench"
        },
        {
          "description": "Venomous spores",
          "clue": "Poisonous cloud causing weakness and paralysis"
        },
        {
          "description": "Reality-warping illusions",
          "clue": "Distorted perceptions and false realities"
        },
        {
          "description": "Acidic breath",
          "clue": "Corroded and sizzling exhaled vapor"
        },
        {
          "description": "Tentacles made of razor-sharp blades",
          "clue": "Slashed and mutilated bodies"
        },
        {
          "description": "Psychic domination",
          "clue": "Controlled actions and lost free will"
        },
        {
          "description": "Corrosive blood",
          "clue": "Melting and disintegrating flesh"
        },
        {
          "description": "Hallucinogenic miasma",
          "clue": "Distorted senses and terrifying visions"
        },
        {
          "description": "Acidic tentacles",
          "clue": "Dissolving and corroded appendages"
        },
        {
          "description": "Rotting touch",
          "clue": "Decaying and festering skin"
        },
        {
          "description": "Venomous gaze",
          "clue": "Paralyzing or weakening eye contact"
        },
        {
          "description": "Telekinetic projectile manipulation",
          "clue": "Manipulated objects striking adventurers"
        },
        {
          "description": "Symbiotic insects that devour life force",
          "clue": "Weakened adventurers and drained vitality"
        },
        {
          "description": "Corrosive fog",
          "clue": "Dissolving and corroded surroundings"
        },
        {
          "description": "Illusory labyrinth",
          "clue": "Disorienting maze and shifting corridors"
        },
        {
          "description": "Acidic saliva",
          "clue": "Corroded and sizzling liquid"
        },
        {
          "description": "Soul-draining tendrils",
          "clue": "Drained life force and weakened spirits"
        },
        {
          "description": "Disorienting phantasmal duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Acidic whirlwind",
          "clue": "Corroded and sizzling cyclone"
        },
        {
          "description": "Bone-crushing grip",
          "clue": "Crushed bones and shattered structures"
        },
        {
          "description": "Shapeshifting deception",
          "clue": "Assumed forms of trusted allies"
        },
        {
          "description": "Acidic mist",
          "clue": "Dissolving and corroded fog"
        },
        {
          "description": "Psychokinetic turbulence",
          "clue": "Thrown adventurers and chaotic movement"
        },
        {
          "description": "Telepathic terror",
          "clue": "Manipulated fears and overwhelming dread"
        },
        {
          "description": "Acidic tendrils",
          "clue": "Dissolving and corroded appendages"
        },
        {
          "description": "Rotting aura",
          "clue": "Decaying and putrid stench"
        },
        {
          "description": "Venomous spines",
          "clue": "Puncture wounds with toxic effects"
        },
        {
          "description": "Reality-bending hallucinations",
          "clue": "Distorted perceptions and nightmarish sights"
        },
        {
          "description": "Acidic breath",
          "clue": "Corroded and sizzling exhaled vapor"
        },
        {
          "description": "Tentacles made of serrated blades",
          "clue": "Lacerations and deep gashes"
        },
        {
          "description": "Psychic enslavement",
          "clue": "Controlled actions and loss of autonomy"
        },
        {
          "description": "Corrosive blood",
          "clue": "Melting and disintegrating flesh"
        },
        {
          "description": "Hallucinogenic fog",
          "clue": "Distorted senses and disorientation"
        },
        {
          "description": "Acidic tentacles",
          "clue": "Dissolving and corroded appendages"
        },
        {
          "description": "Rotting touch",
          "clue": "Decaying and festering skin"
        },
        {
          "description": "Venomous whispers",
          "clue": "Paralyzing or hallucinatory effects"
        },
        {
          "description": "Telekinetic upheaval",
          "clue": "Manipulated terrain and upheaved obstacles"
        },
        {
          "description": "Symbiotic leeches that drain life energy",
          "clue": "Weakened adventurers and withered vitality"
        },
        {
          "description": "Corrosive mist",
          "clue": "Dissolving and corroded surroundings"
        },
        {
          "description": "Illusory phantasmal assailants",
          "clue": "False attackers and distracting mirages"
        },
        {
          "description": "Acidic spittle",
          "clue": "Corroded and sizzling residue"
        },
        {
          "description": "Soul-devouring grip",
          "clue": "Drained life force and weakened spirits"
        },
        {
          "description": "Disorienting kaleidoscope",
          "clue": "Distorted perceptions and vertigo"
        },
        {
          "description": "Acidic whirlpool",
          "clue": "Corroded and sizzling vortex"
        },
        {
          "description": "Bone-shattering strikes",
          "clue": "Fractured and shattered skeletal structures"
        },
        {
          "description": "Shapeshifting duplicity",
          "clue": "Assumed forms of trusted allies"
        },
        {
          "description": "Acidic fog",
          "clue": "Dissolving and corroded mist"
        },
        {
          "description": "Psychokinetic turmoil",
          "clue": "Thrown adventurers and chaotic forces"
        },
        {
          "description": "Telepathic terror",
          "clue": "Manipulated fears and overwhelming dread"
        },
        {
          "description": "Acidic tendrils",
          "clue": "Dissolving and corroded appendages"
        },
        {
          "description": "Rotting aura",
          "clue": "Decaying and putrid stench"
        },
        {
          "description": "Venomous thorns",
          "clue": "Puncture wounds with toxic effects"
        },
        {
          "description": "Reality-bending hallucinations",
          "clue": "Distorted perceptions and nightmarish sights"
        },
        {
          "description": "Acidic breath",
          "clue": "Corroded and sizzling exhaled vapor"
        },
        {
          "description": "Tentacles made of serrated blades",
          "clue": "Lacerations and deep gashes"
        },
        {
          "description": "Psychic domination",
          "clue": "Controlled actions and lost free will"
        },
        {
          "description": "Corrosive blood",
          "clue": "Melting and disintegrating flesh"
        },
        {
          "description": "Hallucinogenic fog",
          "clue": "Distorted senses and disorientation"
        },
        {
          "description": "Acidic tentacles",
          "clue": "Dissolving and corroded appendages"
        },
        {
          "description": "Rotting touch",
          "clue": "Decaying and festering skin"
        },
        {
          "description": "Venomous whispers",
          "clue": "Paralyzing or hallucinatory effects"
        },
        {
          "description": "Telekinetic upheaval",
          "clue": "Manipulated terrain and upheaved obstacles"
        },
        {
          "description": "Symbiotic leeches that drain life energy",
          "clue": "Weakened adventurers and withered vitality"
        },
        {
          "description": "Corrosive mist",
          "clue": "Dissolving and corroded surroundings"
        },
        {
          "description": "Illusory phantasmal assailants",
          "clue": "False attackers and distracting mirages"
        },
        {
          "description": "Acidic spittle",
          "clue": "Corroded and sizzling residue"
        },
        {
          "description": "Soul-devouring grip",
          "clue": "Drained life force and weakened spirits"
        },
        {
          "description": "Disorienting kaleidoscope",
          "clue": "Distorted perceptions and vertigo"
        },
        {
          "description": "Acidic whirlpool",
          "clue": "Corroded and sizzling vortex"
        },
        {
          "description": "Bone-shattering strikes",
          "clue": "Fractured and shattered skeletal structures"
        },
        {
          "description": "Shapeshifting duplicity",
          "clue": "Assumed forms of trusted allies"
        },
        {
          "description": "Acidic fog",
          "clue": "Dissolving and corroded mist"
        },
        {
          "description": "Psychokinetic turmoil",
          "clue": "Thrown adventurers and chaotic forces"
        },
        {
          "description": "Telepathic invasion",
          "clue": "Manipulated thoughts and loss of sanity"
        },
        {
          "description": "Acidic tendrils",
          "clue": "Dissolving and corroded appendages"
        },
        {
          "description": "Rotting aura",
          "clue": "Decaying and putrid stench"
        },
        {
          "description": "Venomous thorns",
          "clue": "Puncture wounds with toxic effects"
        },
        {
          "description": "Reality-bending hallucinations",
          "clue": "Distorted perceptions and nightmarish sights"
        },
        {
          "description": "Acidic breath",
          "clue": "Corroded and sizzling exhaled vapor"
        },
        {
          "description": "Tentacles made of serrated blades",
          "clue": "Lacerations and deep gashes"
        },
        {
          "description": "Psychic domination",
          "clue": "Controlled actions and lost free will"
        },
        {
          "description": "Corrosive blood",
          "clue": "Melting and disintegrating flesh"
        },
        {
          "description": "Hallucinogenic fog",
          "clue": "Distorted senses and disorientation"
        },
        {
          "description": "Acidic tentacles",
          "clue": "Dissolving and corroded appendages"
        },
        {
          "description": "Rotting touch",
          "clue": "Decaying and festering skin"
        },
        {
          "description": "Venomous whispers",
          "clue": "Paralyzing or hallucinatory effects"
        },
        {
          "description": "Telekinetic upheaval",
          "clue": "Manipulated terrain and upheaved obstacles"
        },
        {
          "description": "Symbiotic leeches that drain life energy",
          "clue": "Weakened adventurers and withered vitality"
        },
        {
          "description": "Corrosive mist",
          "clue": "Dissolving and corroded surroundings"
        },
        {
          "description": "Illusory phantasmal assailants",
          "clue": "False attackers and distracting mirages"
        },
        {
          "description": "Acidic spittle",
          "clue": "Corroded and sizzling residue"
        },
        {
          "description": "Soul-devouring grip",
          "clue": "Drained life force and weakened spirits"
        },
        {
          "description": "Disorienting kaleidoscope",
          "clue": "Distorted perceptions and vertigo"
        }
        ],
    'defensiveQuirk': [
        {
          "description": "Reflective scales",
          "clue": "Blinding glare and mirrored surface"
        },
        {
          "description": "Defensive force field",
          "clue": "Distorted energy barrier"
        },
        {
          "description": "Sonic disorientation",
          "clue": "Disrupted hearing and balance"
        },
        {
          "description": "Venomous spines",
          "clue": "Puncture wounds with toxic effects"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Electromagnetic interference",
          "clue": "Disrupted magical and technological devices"
        },
        {
          "description": "Shadow camouflage",
          "clue": "Blending into darkness"
        },
        {
          "description": "Telekinetic barrier",
          "clue": "Repelled projectiles and obstacles"
        },
        {
          "description": "Toxic cloud",
          "clue": "Choking and poisoned air"
        },
        {
          "description": "Hardened exoskeleton",
          "clue": "Impenetrable armor and tough exterior"
        },
        {
          "description": "Psychic backlash",
          "clue": "Mental confusion and disorientation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Illusory projections",
          "clue": "Distracting and misleading images"
        },
        {
          "description": "Teleportation",
          "clue": "Disappearing and reappearing instantly"
        },
        {
          "description": "Invisibility",
          "clue": "Vanishing from sight"
        },
        {
          "description": "Forceful gusts",
          "clue": "Knockback and disoriented movement"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        },
        {
          "description": "Protective energy shield",
          "clue": "Repelled projectiles and magical attacks"
        },
        {
          "description": "Illusory clones",
          "clue": "Distracting and misleading duplicates"
        },
        {
          "description": "Teleportation displacement",
          "clue": "Shifting positions to avoid harm"
        },
        {
          "description": "Phantasmal projections",
          "clue": "Illusory creatures to confuse attackers"
        },
        {
          "description": "Elemental resistance",
          "clue": "Reduced damage from specific elements"
        },
        {
          "description": "Illusory duplicates",
          "clue": "Confusion and difficulty discerning real from fake"
        },
        {
          "description": "Energy absorption",
          "clue": "Neutralizing and absorbing attacks"
        },
        {
          "description": "Psychic barrier",
          "clue": "Mental shield against manipulation"
        },
        {
          "description": "Acidic mist",
          "clue": "Corroded and sizzling fog"
        },
        {
          "description": "Reactive camouflage",
          "clue": "Mimicking surroundings for stealth"
        },
        {
          "description": "Telekinetic manipulation",
          "clue": "Manipulated objects as shields and weapons"
        },
        {
          "description": "Mirror reflection",
          "clue": "Redirected attacks and misdirection"
        },
        {
          "description": "Acidic barrier",
          "clue": "Corroded and sizzling force field"
        },
        {
          "description": "Illusory maze",
          "clue": "Disorienting paths and shifting corridors"
        },
        {
          "description": "Insubstantial form",
          "clue": "Intangible and incorporeal presence"
        },
        {
          "description": "Spatial distortion",
          "clue": "Disrupted perception of distance and space"
        },
        {
          "description": "Venomous fog",
          "clue": "Poisonous vapor causing weakness and paralysis"
        }
    ],
    'questLocation': [
        "A nearby town",
        "The local Baron's castle",
        "A riverside logging camp",
        "A nomadic caravan",
        "A small village",
        "A large city",
        "A small town",
        "A large town",
        "A druidic commune",
        "A monastery",
        "A temple",
        "Squatters in some castle ruins",
        "A band of travellers",
        "A band of mercenaries",
        "A military outpost",
        "A militia force",
        "A group of adventurers",
        "A tribe of goblins",
        "Residents of an abandoned mine",
        "Artists living in an abandoned manor",
        "A lonely wizard in a tower",
        "A shanty town",
        "A tent city",
        "A bizarre commune living in an abandoned lumber mill",
        "A fortress in a mountain pass",
        "A wilderness outpost",
        "A hidden monastery",
        "A makeshift town beneath a large bridge",
        "A hodgepodge town built on a cliff face",
        "A town built on a bridge",
        "A military controlled gate",
        "A floating house on a river",
        "A floating estate on a lake",
        "A floating town on an ocean",
        "A floating fortress on a sea",
        "A secret settlement built into a cave",
        "A drudic sanctuary",
        "A religious sanctuary",
        "The watchers of ancient tombs",
        "The guardians of a sacred grove",
        "The guardians of a sacred mountain",
        "The guardians of a sacred lake",
        "A small group of pilgrims on a holy trek",
        "Common folk travelling between towns",
        "A band of travelling merchants who have become lost",
        "A town on stilts in the middle of a swamp",
        "A village of treehouses",
        "An underground village in the desert",
        "A village of underground tunnels",
        "A village of underground caverns",
        "A crystal town in the depths of a mountain",
        "A town built on the back of a giant turtle",
        "A settlement built beneath the shade of giant mushrooms",
        "A majestic castle",
    "A forgotten graveyard",
    "A humble farmhouse",
    "A secluded cottage",
    "A lively tavern",
    "A treacherous canyon",
    "A sacred temple",
    "A hidden oasis",
    "A bustling port",
    "A crumbling bridge",
    "A peaceful village",
    "A grand cathedral",
    "A dark dungeon",
    "A majestic palace",
    "A vibrant garden",
    "A quiet monastery",
    "A sandy desert",
    "A snow-capped peak",
    "A serene island",
    "A lively circus",
    "A sacred shrine",
    "A secluded waterfall",
    "A bustling city square",
    "A hidden grotto",
    "A dilapidated watchtower",
    "A serene orchard",
    "A lively festival grounds",
    "A hidden treasure trove",
    "A charming inn",
    "A rocky coastline",
    "A secluded glen",
    "A vibrant bazaar",
    "A hidden valley",
    "A crumbling fortress",
    "A magical library",
    "A peaceful graveyard",
    "A humble blacksmith's forge",
    "A hidden cavern",
    "A bustling marketplace",
    "A forgotten battlefield",
    "A tranquil fishing village",
    "A secret hideout",
    "A majestic waterfall",
    "A lively theater",
    "A sacred burial ground",
    "A hidden garden",
    "A mysterious shipwreck",
    "A bustling trade route",
    "A secluded hermit's hut",
    "A grand colosseum",
    "A haunted mansion",
    "A serene meditation garden",
    "A hidden alchemist's laboratory",
    "A bustling guildhall",
    "A forgotten catacomb",
    "A tranquil vineyard",
    "A sacred standing stones circle",
    "A hidden smuggler's den",
    "A bustling market square",
    "A hidden cave system",
    "A crumbling tower",
    "A tranquil waterfall",
    "A vibrant masquerade ball",
    "A secret meeting place",
    "A majestic observatory",
    "A lively circus tent",
    "A hidden treasure map location",
    "A charming roadside inn",
    "A rocky mountain pass",
    "A secluded hot spring",
    "A vibrant fairground",
    "A hidden fairy glen",
    "A crumbling ruins of an ancient city",
    "A tranquil bird sanctuary",
    "A bustling artisan's workshop",
    "A forgotten secret society headquarters",
    "A sacred mountain shrine",
    "A hidden underground city",
    "A bustling harbor",
    "A serene butterfly garden",
    "A hidden smuggler's cove",
    "A grand wizard's tower",
    "A haunted forest clearing",
    "A tranquil lakeside retreat",
    "A bustling carnival",
    "A hidden pirate's treasure stash",
    "A crumbling stone bridge",
    "A vibrant music festival",
    "A secret thieves' guild hideout",
    "A majestic celestial observatory",
    "A lively marketplace square",
    "A hidden druid grove",
    "A forgotten ancient battleground",
    "A tranquil tea garden",
    "A bustling clockwork workshop",
    "A secluded fairy ring",
    "A vibrant masquerade ballroom",
    "A hidden underground labyrinth",
    "A crumbling mage's tower",
    "A serene bamboo forest",
    "A hidden smuggler's tunnel",
    "A grand king's throne room",
    "A haunted marshland",
    "A tranquil cherry blossom orchard",
    "A bustling wizard's academy",
    "A secret rebel base",
    "A sacred crystal cave",
    "A hidden gnome's workshop",
    "A bustling coliseum",
    "A serene lily pond",
    "A hidden werewolf den",
    "A crumbling ancient library",
    "A vibrant street market",
    "A secret dragon's lair",
    "A majestic unicorn sanctuary",
    "A lively carnival parade",
    "A hidden treasure vault",
    "A tranquil waterfall grotto",
    "A bustling trade outpost",
    "A secluded hermit's garden",
    "A grand queen's throne room",
    "A haunted graveyard crypt",
    "A serene cherry blossom grove",
    "A hidden underground resistance hideout",
    "A crumbling mage's laboratory",
    "A vibrant butterfly conservatory",
    "A hidden smuggler's marketplace",
    "A tranquil moonlit glade",
    "A bustling clockwork factory",
    "A secret mermaid's cove",
    "A sacred ancient stone circle",
    "A hidden gnome's workshop",
    "A grand jester's performance hall",
    "A haunted abandoned asylum"
    ],
    'problem': [
        "have had their cattled slaughtered",
        "have been raided",
        "have been burgaled",
        "have had a precious item stolen",
        "have had a young boy go missing",
        "have had a young girl go missing",
        "have been on lockdown",
        "have been under attack",
        "have had an inexplicable murder",
        "have found a mysterious doorway",
        "have been surrounded by disturbances in the night",
        "have had their supplies regularly go missing",
        "have recently come into wealth",
        "have found a precious natural resource",
        "have made a discovery",
        "have just finished some important work",
        "have found themselves without a leader",
        "have been cut off from communication"
    ],
    'sex': [
        "male",
        "female"
    ],
    'race': [
        "human",
        "elf",
        "dwarf",
        "halfling",
        "gnome",
        "orc",
        "half-orc",
        "half-elf",
        "tiefling",
        "dragonborn",
        "aasimar",
        "genasi",
        "goliath",
        "tabaxi",
        "triton",
        "yuan-ti",
        "firbolg",
        "goblin"
    ],
    'descriptor': [
        "tall",
        "short",
        "fat",
        "skinny",
        "muscular",
        "scrawny",
        "bulky",
        "bloated",
        "broad",
        "chubby",
        "curvaceous",
        "doughy",
        "full-figured",
        "heavy-set",
        "hefty",
        "obese",
        "portly",
        "squat",
        "stout",
        "stocky",
        "thick",
        "well-built",
        "wide",
        "lean",
        "slender",
        "lanky",
        "long",
        "narrow",
        "petite",
        "puny",
        "angular",
        "delicate",
        "gaunt",
        "haggard",
        "lithe",
        "skeletal",
        "spindly",
        "willowy",
        "wiry",
        "atheletic",
        "beefy",
        "brawny",
        "burly",
        "chiseled",
        "hulking",
        "husky",
        "lumbering",
        "durable",
        "hardy",
        "robust",
        "mighty",
        "rugged",
        "strapping",
        "toned",
        "ailing",
        "battered",
        "bruised",
        "decrepit",
        "disfigured",
        "hunched",
        "lame",
        "limping",
        "fragile",
        "frail",
        "hollow",
        "pale",
        "rickety",
        "sickly",
        "blocky",
        "broad-shouldered",
        "broad-chested",
        "broad-hipped",
        "serpentine",
        "top-heavy",
        "bottom-heavy",
        "little",
        "big",
        "small",
        "large",
        "colossal",
        "gigantic",
        "giant",
        "towering",
        "elderly",
        "young",
        "youthful",
        "baby-faced",
        "childish"
    ],
    'personality': [
        "eyes pierce your soul",
        "warm smile lights up the room",
        "ears look like they could hear a butterfly sneeze",
        "teeth could chew through a tree",
        "eyes are as big as dinner plates",
        "hands have seen a lot of hard work",
        "skin has seen many days in the sun",
        "cheeks are scarred",
        "hair whips around like fire",
        "eyes sparkle like the sea",
        "skin is smooth as glass",
        "skin is like treebark",
        "hair is like weeds",
        "hands could crush coal",
        "legs could drag kingdoms",
        "ears are like parachutes",
        "nose points to the sky",
        "breath could wilt leaves",
        "presence could quiet a storm",
        "mannerisms are quite fancy",
        "voice is like gravel",
        "hair is like silk",
        "fashion sense is questionable",
        "fashion sense is impeccable",
        "stare could make a statue blink",
        "stare could make a courtesan blush",
        "beauty could blow trees over",
        "face could make a mirror break",
        "hands could make a ring get homesick",
        "voice could make a mountain sing",
        "presence could make flowers bloom",
        "youthfulness makes skeletons jealous",
        "wisdom is beyond their years"
    ],
    'clothes': [
        "a tattered cloak",
        "a fancy suit",
        "a set of armour",
        "traveller's gear",
        "commoner's clothes",
        "a set of robes",
        "a set of leather armour",
        "a set of chainmail",
        "magician's robes",
        "bard's clothes",
        "monk's robes",
        "a set of plate armour",
        "explorer's gear",
        "scholar's robes",
        "noble's finery",
        "unseasonable clothing",
        "rags",
        "farmer's clothes",
        "fisherman's gear",
        "fine clothes that have seen many days",
        "clothes that are too big",
        "clothes that are too small",
        "armour that was not smithed for them",
        "a new shirt, but old pants",
        "a new pair of pants, but old shirt",
        "a new pair of shoes but old everything else",
        "protective leathers",
        "a fine cloak with someone else's crest",
        "a fine cloak with their own crest",
        "a matching set of outlandish clothes"
    ],
    'speech': [
        "quickly",
        "slowly",
        "loudly",
        "softly",
        "with a stutter",
        "with a lisp",
        "with a drawl",
        "with a thick accent",
        "in metaphor",
        "with raw cracks in their voice",
        "with a raspy voice",
        "with a high pitched voice",
        "with a low pitched voice",
        "with a booming voice",
        "with a whisper",
        "crisply",
        "with a slur",
        "conspiritorially",
        "emphatically",
        "with flowery diction",
        "gossipy",
        "incoherently",
        "learnedly",
        "lyrically",
        "poetically",
        "journalistically",
        "with punchy words",
        "with a lot of hand gestures",
        "with a lot of head nods",
        "with a lot of preamble",
        "with a lot of pauses",
        "with a lot of ums and ahs",
        "with a lot of 'you know's",
        "succinctly",
        "roughly",
        "vaguely",
        "verbosely",
    ],
    'idiosyncrasy': [
        "always have a smile on their face",
        "dress all in one colour",
        "always have a book in their hand",
        "always have a drink in their hand",
        "wear strange eyeglasses",
        "have a strange tattoo",
        "are often sick",
        "always have a faceful of makeup",
        "are constantly itching",
        "are always tapping their foot",
        "are always humming a tune",
        "breath loudly",
        "scratch their head",
        "pinch their nose",
        "tug their ear",
        "mutter to themselves",
        "always say 'sorry'",
        "are always coughing",
        "are always sneezing",
        "play with their hair",
        "bob their head",
        "chew gum",
        "are always chewing on something",
        "click their tongue",
        "sweat, a lot",
        "bite the inside of their cheek",
        "stick their tongue out while they think",
        "glance sideways",
        "never look straight at you",
        "always look straight at you",
        "always look at the ground",
        "always look at the sky",
        "rapidly blink",
        "can't maintain eye contact",
        "always drift off into daydreams",
        "get distracted easily",
        "click their fingers",
        "clasp their hands together",
        "bite their fingernails",
        "are always absently doodling",
        "are always wiping their hands",
        "trace their fingers over old scars",
        "braid their hair",
        "flex their fingers",
        "drum on surfaces",
        "absent mindedly dance",
        "shrug",
        "stand with the their feet wide apart",
        "drag their feet",
        "stand too close when talking",
        "stand too far away when talking",
        "alway drops things",
        "are disasterously clumsy",
        "always clean their glasses",
        "chew on the earpiece of their glasses",
        "button and unbutton their coat",
        "always have their pipe in their mouth, smoking or not",
        "have a random assortment of items in their pockets",
        "always have a handkerchief",
        "touch up their makeup constantly",
        "always adjust their hat",
        "always adjust their glasses",
        "twist the ring on their finger"
    ]
};


export function randomChoice(array) {
    let randNum = Math.floor(Math.random() * array.length);
    let randChoice = array[randNum];
    return randChoice;
}

function generatePrompt(promptCategory) {
  let promptArray = prompts[promptCategory];
  if (promptCategory === 'npc') {
    let prompt = {
      "sex": randomChoice(prompts.sex),
      "race": randomChoice(prompts.race),
      "descriptor": randomChoice(prompts.descriptor),
      "personality": randomChoice(prompts.personality),
      "clothes": randomChoice(prompts.clothes),
      "speech": randomChoice(prompts.speech),
      "idiosyncrasy": randomChoice(prompts.idiosyncrasy)
    };
    return prompt;
  } else {
    let prompt = randomChoice(promptArray);
    return prompt;
  }
}

export function vowelCheck(word) {
    var vowels = ("aeiouAEIOU"); 
    return vowels.indexOf(word[0]) !== -1;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateMultiplePrompts(arrayOfRequiredPrompts) {
  for (let i = 0; i < arrayOfRequiredPrompts.length; i++) {
    let promptCategory = arrayOfRequiredPrompts[i];
    let prompt = generatePrompt(promptCategory);
    switch (promptCategory) {
      case 'monster':
        monster.set({
          "description": prompt.description.toLowerCase(),
          "clue": prompt.clue.toLowerCase()
        });
        break;
      case 'offensiveQuirk':
        offensiveQuirk.set({
          "description": prompt.description.toLowerCase(),
          "clue": prompt.clue.toLowerCase()
        });
        break;
      case 'defensiveQuirk':
        defensiveQuirk.set({
          "description": prompt.description.toLowerCase(),
          "clue": prompt.clue.toLowerCase()
        });
        break;
      case 'npc':
        npc.set({
          "sex": prompt.sex.toLowerCase(),
          "race": prompt.race.toLowerCase(),
          "descriptor": prompt.descriptor.toLowerCase(),
          "personality": prompt.personality.toLowerCase(),
          "clothes": prompt.clothes.toLowerCase(),
          "speech": prompt.speech.toLowerCase(),
          "idiosyncrasy": prompt.idiosyncrasy.toLowerCase()
        });
        break;
      case 'questLocation':
        questLocation.set(capitalizeFirstLetter(prompt.toLowerCase()));
        break;
      case 'problem':
        problem.set(prompt.toLowerCase());
        break;

      
    }
  }
}


