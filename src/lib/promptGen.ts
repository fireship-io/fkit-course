import { writable } from "svelte/store";

export const monster = writable({
  description: "default monster store",
  clue: "default clue store",
  environment: "default environment store",
});

export const offensiveQuirk = writable({
  description: "default monster store",
  clue: "default clue store",
});

export const defensiveQuirk = writable({
  description: "default monster store",
  clue: "default clue store",
});

export const npc = writable({
  sex: "",
  race: "",
  descriptor: "",
  personality: "",
  clothes: "",
  speech: "",
  idiosyncrasy: "",
});

export const questLocation = writable("");
export const problem = writable("");

const prompts = {
  monster: [
    {
      description: "Air Elemental",
      clue: "whirlwinds",
      environment: "Dungeon, Airborne",
    },
    {
      description: "Animated Armor",
      clue: "clanking echoes",
      environment: "Dungeon, Urban",
    },
    {
      description: "awakened plant",
      clue: "leaves that move without a breeze",
      environment: "Forest, Mountain, Swamp, Cavern",
    },
    {
      description: "Bandit",
      clue: "shattered booze bottles",
      environment: "Urban, Forest, Mountain",
    },
    {
      description: "Banshee",
      clue: "Eerie wailing",
      environment: "Dungeon, Cavern, Swamp",
    },
    {
      description: "Basilisk",
      clue: "Petrified statues and the scent of calcified stone",
      environment: "Dungeon, Cavern, Urban",
    },
    {
      description: "Black Dragon",
      clue: "Acrid smoke",
      environment: "Dungeon, Swamp, Cavern",
    },
    {
      description: "Blink Dog",
      clue: "the smell of singed fur",
      environment: "Forest, Dungeon",
    },
    {
      description: "Blue Dragon",
      clue: "the faint odor of ozone",
      environment: "Dungeon, Desert, Cavern",
    },
    {
      description: "Bugbear",
      clue: "the stink of a animal den",
      environment: "Dungeon, Cavern, Forest",
    },
    {
      description: "Centaur",
      clue: "Hoofprints",
      environment: "Forest, Field",
    },
    {
      description: "Chimera",
      clue: "traces of multiple distinct animals",
      environment: "Mountain, Field",
    },
    {
      description: "Cloud Giant",
      clue: "wisps of cloud",
      environment: "Mountain, Airborne",
    },
    {
      description: "Cultist",
      clue: "occult symbols",
      environment: "Dungeon, Urban, Cavern",
    },
    {
      description: "Dire Wolf",
      clue: "slaughtered wildlife",
      environment: "Forest, Mountain",
    },
    {
      description: "Displacer Beast",
      clue: "pawprints that vanish",
      environment: "Forest, Dungeon",
    },
    {
      description: "Djinni",
      clue: "the sweet smell of spices",
      environment: "Desert, Dungeon, Urban",
    },
    {
      description: "Doppleganger",
      clue: "rumors of people seeing themselves",
      environment: "Dungeon, Urban",
    },
    {
      description: "Drow Elf",
      clue: "talk of a black skinned stranger",
      environment: "Dungeon, Urban, Cavern",
    },
    {
      description: "Druid",
      clue: "ritualistic wooden carvings",
      environment: "Forest, Cavern, Mountain, Swamp, Arctic, Desert",
    },
    {
      description: "Dryad",
      clue: "trees that whisper in the wind",
      environment: "Forest",
    },
    {
      description: "Earth Elemental",
      clue: "tremors",
      environment: "Dungeon, Cavern, Mountain",
    },
    {
      description: "Efreeti",
      clue: "unseasonable heat",
      environment: "Desert, Dungeon, Urban",
    },
    {
      description: "Ettercap",
      clue: "thick spiderwebs",
      environment: "Cavern, Forest, Dungeon",
    },
    {
      description: "Fire Elemental",
      clue: "lingering smoke",
      environment: "Dungeon, Urban, Desert",
    },
    {
      description: "Flesh Golem",
      clue: "the stink of rotting flesh",
      environment: "Dungeon, Urban",
    },
    {
      description: "Flumph",
      clue: "Popping noises",
      environment: "Dungeon, Urban, Forest",
    },
    {
      description: "flying snake",
      clue: "dead birds",
      environment: "Forest, Mountain, Field",
    },
    {
      description: "Frost Giant",
      clue: "frozen craters",
      environment: "Arctic, Mountain",
    },
    {
      description: "Gargoyle",
      clue: "the feeling of being watched",
      environment: "Dungeon, Urban, Cavern",
    },
    {
      description: "Gelatinous Cube",
      clue: "trails of slime",
      environment: "Dungeon, Cavern",
    },
    {
      description: "Ghost",
      clue: "pockets of cold air",
      environment:
        "Dungeon, Urban, Forest, Mountain, Desert, Cavern, Arctic, Field",
    },
    {
      description: "Ghoul",
      clue: "Eerie moans",
      environment: "Dungeon, Cavern, Urban",
    },
    {
      description: "Giant",
      clue: "huge footprints",
      environment: "Mountain, Field",
    },
    {
      description: "Giant Bat",
      clue: "a shadow that blocks the moon",
      environment: "Dungeon, Cavern, Urban",
    },
    {
      description: "giant beetle",
      clue: "chittering",
      environment: null,
    },
    {
      description: "giant cat",
      clue: "deep hissing and mewling in the night",
      environment: null,
    },
    {
      description: "Giant Centipede",
      clue: "Chittering",
      environment: "Dungeon, Cavern, Forest",
    },
    {
      description: "Giant Crab",
      clue: "the smell of brine",
      environment: "Underwater, Coastal",
    },
    {
      description: "Giant Eagle",
      clue: "Piercing shrieks",
      environment: "Mountain, Airborne",
    },
    {
      description: "giant lizard",
      clue: "repitillian footprints",
      environment: null,
    },
    {
      description: "Giant Octopus",
      clue: "the smell of the ocean",
      environment: "Underwater",
    },
    {
      description: "Giant Owl",
      clue: "A silent shadow that glides through the night sky",
      environment: "Forest, Dungeon, Mountain",
    },
    {
      description: "Giant Rat",
      clue: "food stores have been raided",
      environment: "Dungeon, Urban, Cavern",
    },
    {
      description: "Giant Scorpion",
      clue: "poisoned cattle",
      environment: "Dungeon, Cavern, Desert",
    },
    {
      description: "Giant Shark",
      clue: "an ominous shadow beneath the waves",
      environment: "Underwater, Coastal",
    },
    {
      description: "Giant Snake",
      clue: "large pairs of puncture wounds",
      environment: "Dungeon, Forest, Swamp",
    },
    {
      description: "Giant Spider",
      clue: "Sticky webs",
      environment: "Dungeon, Forest, Cavern",
    },
    {
      description: "Giant Toad",
      clue: "giant tadpoles",
      environment: "Swamp, Forest",
    },
    {
      description: "Gibbering Mouther",
      clue: "Gurgling sounds",
      environment: "Dungeon, Cavern",
    },
    {
      description: "Gnoll",
      clue: "Howling laughter",
      environment: "Dungeon, Cavern, Desert",
    },
    {
      description: "Goblin",
      clue: "High-pitched laughter",
      environment: "Dungeon, Urban, Forest",
    },
    {
      description: "Golem",
      clue: "Deep footprints",
      environment: "Dungeon, Urban, Cavern",
    },
    {
      description: "Gorgon",
      clue: "petrified victims",
      environment: "Dungeon, Cavern, Field",
    },
    {
      description: "Green Dragon",
      clue: "air that hurts to breath",
      environment: "Forest, Swamp",
    },
    {
      description: "Grell",
      clue: "the broken bones of wildlife",
      environment: "Dungeon, Cavern",
    },
    {
      description: "Harpy",
      clue: "wailing shrieks",
      environment: "Mountain, Forest",
    },
    {
      description: "Hellhound",
      clue: "Ashen pawprints",
      environment: "Dungeon, Urban, Swamp",
    },
    {
      description: "Hill Giant",
      clue: "landslides",
      environment: "Mountain, Field",
    },
    {
      description: "hobgoblin",
      clue: "the stink of garbage",
      environment: null,
    },
    {
      description: "homunculus",
      clue: "rumors of something almost human",
      environment: null,
    },
    {
      description: "Hook Horror",
      clue: "Echoing clicks",
      environment: "Dungeon, Cavern",
    },
    {
      description: "Imp",
      clue: "the faint whiff of brimstone",
      environment: "Dungeon, Urban, Cavern",
    },
    {
      description: "Intellect Devourer",
      clue: "Strange buzzing",
      environment: "Dungeon, Urban",
    },
    {
      description: "Invisible Stalker",
      clue: "Whispering winds",
      environment: "Dungeon, Urban",
    },
    {
      description: "Iron Golem",
      clue: "Heavy footfalls",
      environment: "Dungeon, Urban",
    },
    {
      description: "knight",
      clue: "an armoured stranger",
      environment: null,
    },
    {
      description: "Kobold",
      clue: "Flickering torchlight and faint skittering sounds",
      environment: "Dungeon, Cavern, Urban",
    },
    {
      description: "Kraken",
      clue: "Deep rumbling",
      environment: "Underwater, Coastal",
    },
    {
      description: "Lamia",
      clue: "Seductive whispers and the faint aroma of perfume",
      environment: "Dungeon, Urban",
    },
    {
      description: "Lich",
      clue: "a plague of nightmares",
      environment: "Dungeon, Cavern, Urban",
    },
    {
      description: "mage",
      clue: "a stranger asking for curious things",
      environment: null,
    },
    {
      description: "Manticore",
      clue: "roars on the wind",
      environment: "Mountain, Desert",
    },
    {
      description: "Medusa",
      clue: "petrified victims",
      environment: "Dungeon, Cavern, Urban",
    },
    {
      description: "Merfolk",
      clue: "ethereal singing",
      environment: "Underwater, Coastal",
    },
    {
      description: "mimic",
      clue: "objects that move when nobody is looking",
      environment: null,
    },
    {
      description: "Minotaur",
      clue: "Snorting and violence",
      environment: "Dungeon, Cavern, Urban",
    },
    {
      description: "myconid",
      clue: "fungal growths on the walls",
      environment: null,
    },
    {
      description: "naga",
      clue: "scraps of snake skin",
      environment: null,
    },
    {
      description: "Nymph",
      clue: "Enchanting melodies and the fragrance of flowers",
      environment: "Forest, Swamp",
    },
    {
      description: "Ochre Jelly",
      clue: "dissolved trenches",
      environment: "Dungeon, Cavern, Swamp",
    },
    {
      description: "Ogre",
      clue: "scraps of meat and the stink of sweat",
      environment: "Dungeon, Cavern, Urban",
    },
    {
      description: "ooze",
      clue: "trails of hissing slime",
      environment: null,
    },
    {
      description: "Orc",
      clue: "Grunts and the stench of unwashed bodies",
      environment: "Dungeon, Urban, Mountain",
    },
    {
      description: "Owlbear",
      clue: "Deep hoots",
      environment: "Forest, Mountain",
    },
    {
      description: "Pegasus",
      clue: "a flying shimmer in the sunlight",
      environment: "Airborne, Mountain",
    },
    {
      description: "Pixie",
      clue: "glimmering dust in the air",
      environment: "Forest, Urban",
    },
    {
      description: "quaggoth",
      clue: "mint coloured fur",
      environment: null,
    },
    {
      description: "Red Dragon",
      clue: "ash falling from the sky",
      environment: "Dungeon, Mountain",
    },
    {
      description: "revenant",
      clue: "a mysterious stranger pursuing a local",
      environment: null,
    },
    {
      description: "Rust Monster",
      clue: "rusted metal",
      environment: "Dungeon, Urban, Cavern",
    },
    {
      description: "Sahuagin",
      clue: "the smell of saltwater",
      environment: "Underwater",
    },
    {
      description: "Satyr",
      clue: "Lively flute tunes",
      environment: "Forest",
    },
    {
      description: "scarecrow",
      clue: "tufts of straw",
      environment: null,
    },
    {
      description: "scout",
      clue: "a nimble stranger in the outskirts",
      environment: null,
    },
    {
      description: "Sea Hag",
      clue: "Cackling laughter and the pungent odor of low tide",
      environment: "Underwater, Coastal, Swamp",
    },
    {
      description: "Skeleton",
      clue: "Fragments of bone and a clattering noise",
      environment: "Dungeon, Cavern, Urban",
    },
    {
      description: "Specter",
      clue: "Wisps of ethereal mist",
      environment: "Dungeon, Cavern, Urban",
    },
    {
      description: "Sprite",
      clue: "Faint tinkling sounds",
      environment: "Forest, Dungeon",
    },
    {
      description: "Storm Giant",
      clue: "sudden storms",
      environment: "Mountain, Airborne",
    },
    {
      description: "Treant",
      clue: "Creaking wood and the scent of pine needles",
      environment: "Forest",
    },
    {
      description: "troglodyte",
      clue: "an ancient fishy smell",
      environment: null,
    },
    {
      description: "troll",
      clue: "the stink of rotting vegetation",
      environment: null,
    },
    {
      description: "Unicorn",
      clue: "Distant whinnies and a sense of calm",
      environment: "Forest",
    },
    {
      description: "Vampire",
      clue: "victims drained of blood",
      environment: "Dungeon, Swamp, Cavern",
    },
    {
      description: "Water Elemental",
      clue: "pools of water",
      environment: "Dungeon, Underwater",
    },
    {
      description: "Werewolf",
      clue: "Eerie howls carried on the wind",
      environment: "Forest, Mountain",
    },
    {
      description: "White Dragon",
      clue: "unseasonable snowfall",
      environment: "Arctic, Mountain",
    },
    {
      description: "wight",
      clue: "wisps of mysterious light",
      environment: null,
    },
    {
      description: "Winter Wolf",
      clue: "Frosty pawprints",
      environment: "Arctic, Forest",
    },
    {
      description: "Wraith",
      clue: "Whispering voices and a chilling breeze",
      environment: "Dungeon, Cavern, Swamp",
    },
    {
      description: "Wyvern",
      clue: "Fierce screeches and the sound of beating wings",
      environment: "Mountain, Desert",
    },
    {
      description: "Yeti",
      clue: "Roars and missing people",
      environment: "Arctic, Mountain",
    },
    {
      description: "Zombie",
      clue: "Shuffling footsteps and a putrid smell",
      environment: "Dungeon, Cavern, Swamp",
    },
    {
      description: "Zombie Dragon",
      clue: "dead skin falling from the sky",
      environment: "Dungeon, Swamp, Cavern",
    },
    {
      description: "zombie knight",
      clue: "the stink of rotten flesh and the clank of armour",
      environment: null,
    },
  ],
  offensiveQuirk: [
    {
      description: "Acidic blood",
      clue: "corrosion",
    },
    {
      description: "acidic breath",
      clue: "corrosion",
    },
    {
      description: "an acidic cloud",
      clue: "corrosion",
    },
    {
      description: "an acidic excretion",
      clue: "corrosion",
    },
    {
      description: "an acidic fog",
      clue: "corrosion",
    },
    {
      description: "an acidic trail",
      clue: "corrosion",
    },
    {
      description: "acidic saliva",
      clue: "corrosion",
    },
    {
      description: "an acidic shockwave",
      clue: "corrosion",
    },
    {
      description: "acidic skin",
      clue: "corrosion",
    },
    {
      description: "an acidic slime trail",
      clue: "corrosion",
    },
    {
      description: "Acidic spores",
      clue: "corrosion",
    },
    {
      description: "Acidic talons",
      clue: "corrosion",
    },
    {
      description: "Acidic tentacles",
      clue: "corrosion",
    },
    {
      description: "Acidic vomit",
      clue: "corrosion",
    },
    {
      description: "an armored carapace",
      clue: "chips of carapace",
    },
    {
      description: "astral chains",
      clue: "sourceless echoing clinks",
    },
    {
      description: "Astral disruption",
      clue: "warps in reality",
    },
    {
      description: "Astral draining",
      clue: "inability to focus",
    },
    {
      description: "Astral duplicates",
      clue: "hallucinatory duplicates",
    },
    {
      description: "Astral manipulation",
      clue: "warps in reality",
    },
    {
      description: "Blinding flashes",
      clue: "distant flashes of light",
    },
    {
      description: "a Blood-boiling aura",
      clue: "lingering steam and condensation",
    },
    {
      description: "Blood-consuming tendrils",
      clue: "Drained and pale victims",
    },
    {
      description: "Blood-curdling howl",
      clue: "Bloodied ears",
    },
    {
      description: "Blood-draining fangs",
      clue: "Pale and shrivelled bodies",
    },
    {
      description: "Blood-drinking proboscis",
      clue: "Drained and pale victims",
    },
    {
      description: "Blood-freezing gaze",
      clue: "shattered victims",
    },
    {
      description: "Blood-fueled regeneration",
      clue: "drained victims",
    },
    {
      description: "Obsidian skin",
      clue: "chips of obsidian",
    },
    {
      description: "a bloodthirsty frenzy",
      clue: "Savagely mutilated victims",
    },
    {
      description: "a Bone-chilling touch",
      clue: "Numbness",
    },
    {
      description: "Bone-crushing grip",
      clue: "Crushed bones and flattened objects",
    },
    {
      description: "Bone-crushing jaws",
      clue: "Crushed skulls and shattered bones",
    },
    {
      description: "a bone-eroding touch",
      clue: "Dissolved skeletons",
    },
    {
      description: "Bone-liquefying acid",
      clue: "Dissolved bones",
    },
    {
      description: "Bone-shattering blows",
      clue: "Fractured skeletons and shattered bones",
    },
    {
      description: "a bone-shattering roar",
      clue: "Cracked structures and shattered skeletons",
    },
    {
      description: "Bone-spiked exoskeleton",
      clue: "bone spikes",
    },
    {
      description: "Chameleon-like camouflage",
      clue: "rumors of a vanishing creature",
    },
    {
      description: "a Corrosive aura",
      clue: "corrosion",
    },
    {
      description: "a Corrosive bite",
      clue: "corrosion",
    },
    {
      description: "a Cursed touch",
      clue: "Unfortunate events and misfortune",
    },
    {
      description: "a Decay-inducing aura",
      clue: "Rotting and crumbling surroundings",
    },
    {
      description: "a Decaying touch",
      clue: "Rotting and withering vegetation",
    },
    {
      description: "a Desiccating touch",
      clue: "Withered and dried-out bodies",
    },
    {
      description: "Disemboweling claws",
      clue: "Torn and eviscerated victims",
    },
    {
      description: "Disintegrating energy beams",
      clue: "Vaporized and obliterated objects",
    },
    {
      description: "Disintegrating shadows",
      clue: "Vaporized and obliterated objects",
    },
    {
      description: "a Disintegrating touch",
      clue: "Vaporized and obliterated objects",
    },
    {
      description: "an Ear-piercing screech",
      clue: "bloodied ears",
    },
    {
      description: "Ectoplasmic projection",
      clue: "slime",
    },
    {
      description: "Ectoplasmic tendrils",
      clue: "slime",
    },
    {
      description: "an Electrifying touch",
      clue: "the smell of ozone",
    },
    {
      description: "Erupting boils",
      clue: "pools of pus",
    },
    {
      description: "an Eviscerating whirlwind",
      clue: "objects thrown about and torn to bits",
    },
    {
      description: "Exploding projectiles",
      clue: "shattered debris",
    },
    {
      description: "an explosive touch",
      clue: "Shattered and disintegrated objects",
    },
    {
      description: "a Fear-inducing presence",
      clue: "a sense of dread",
    },
    {
      description: "Fire-absorbing skin",
      clue: "fire moving in strange patterns",
    },
    {
      description: "a Flame-spewing mouth",
      clue: "Scorch marks and charred surroundings",
    },
    {
      description: "a Flesh-melding touch",
      clue: "Merged and fused animals",
    },
    {
      description: "a Flesh-melting aura",
      clue: "pools of liquid meat",
    },
    {
      description: "Flesh-melting spittle",
      clue: "pools of liquid meat",
    },
    {
      description: "Flesh-rotting spores",
      clue: "Rotten and decayed flesh",
    },
    {
      description: "a Flesh-searing gaze",
      clue: "Burned and blistered skin",
    },
    {
      description: "a Foul-smelling secretion",
      clue: "a repulsive odor",
    },
    {
      description: "Hallucinatory whispers",
      clue: "disorientation and confusion",
    },
    {
      description: "a Hallucinatory shroud",
      clue: "disorientation and confusion",
    },
    {
      description: "a Hypersonic shriek",
      clue: "Shattered glass and ruptured eardrums",
    },
    {
      description: "a Hypnotic gaze",
      clue: "Dazed and entranced victims",
    },
    {
      description: "Illusionary terrain",
      clue: "hallucinations",
    },
    {
      description: "Illusionary transformations",
      clue: "rumors of a shapeshifter",
    },
    {
      description: "Illusory duplicates",
      clue: "multiple coinciding sightings",
    },
    {
      description: "Illusory nightmares",
      clue: "Terrifying dreams and sleepless nights",
    },
    {
      description: "Illusory phantoms",
      clue: "Ghostly figures",
    },
    {
      description: "Illusory whispers",
      clue: "Misleading information and confusion",
    },
    {
      description: "Flaming fur",
      clue: "smoke in the air",
    },
    {
      description: "an Invisible presence",
      clue: "Displaced objects and cold gusts",
    },
    {
      description: "Lethal spiky scales",
      clue: "Impaled victims and punctured armor",
    },
    {
      description: "Lightning strikes",
      clue: "Burn marks and static in the air",
    },
    {
      description: "Magma-filled veins",
      clue: "Molten trails and scorching heat",
    },
    {
      description: "Magma-infused breath",
      clue: "Molten rock and scorch marks",
    },
    {
      description: "a Melting gaze",
      clue: "Melted and distorted objects",
    },
    {
      description: "a Melting touch",
      clue: "Dissolved and liquefied substances",
    },
    {
      description: "Mind control",
      clue: "rumors of lost time",
    },
    {
      description: "Mind-controlling spores",
      clue: "Controlled thoughts and manipulated behavior",
    },
    {
      description: "a Mind-shattering strike",
      clue: "Concussed victims",
    },
    {
      description: "a Mind-shredding screech",
      clue: "Bleeding ears and mental distress",
    },
    {
      description: "Mind-twisting illusions",
      clue: "Hallucinations and distorted reality",
    },
    {
      description: "a Necrotic aura",
      clue: "Decaying and rotting flesh",
    },
    {
      description: "a Necrotic touch",
      clue: "Decaying and festering wounds",
    },
    {
      description: "Necrotic whispers",
      clue: "Decaying and rotting minds",
    },
    {
      description: "a Pain-inducing aura",
      clue: "sourceless aches and pains",
    },
    {
      description: "a Paralyzing shriek",
      clue: "Stiffened and immobile victims",
    },
    {
      description: "a Paralyzing touch",
      clue: "Stiff and immobile victims",
    },
    {
      description: "Paralyzing venom",
      clue: "Immobilized and stiff victims",
    },
    {
      description: "a Petrifying gaze",
      clue: "Sstatues of terrified victims",
    },
    {
      description: "Phantasmal apparitions",
      clue: "Ghostly figures and spectral movements",
    },
    {
      description: "Phantasmal whispers",
      clue: "Haunting and eerie voices",
    },
    {
      description: "Plant manipulation",
      clue: "Overgrown areas",
    },
    {
      description: "Poisonous breath",
      clue: "Nausea and vomiting",
    },
    {
      description: "Poisonous pollen",
      clue: "Coughing and respiratory distress",
    },
    {
      description: "Poisonous thorns",
      clue: "sick and poisoned victims",
    },
    {
      description: "Psychic backlash",
      clue: "phantoms pains",
    },
    {
      description: "Psychic bombardment",
      clue: "intense and sudden migraines",
    },
    {
      description: "Psychic disintegration",
      clue: "Fragmented consciousness and madness",
    },
    {
      description: "Psychic domination",
      clue: "Controlled actions and loss of free will",
    },
    {
      description: "Psychic paralysis",
      clue: "Motionless and catatonic victims",
    },
    {
      description: "pyrokinesis",
      clue: "fiery detonations",
    },
    {
      description: "a Razor-edged tail",
      clue: "Deep lacerations and slashed objects",
    },
    {
      description: "Razor-edged wings",
      clue: "Deep lacerations and shredded objects",
    },
    {
      description: "Razor-sharp claws",
      clue: "Deep gouges and shredded surfaces",
    },
    {
      description: "Razor-sharp feathers",
      clue: "Deep cuts and bloodied wounds",
    },
    {
      description: "Reality-distorting screams",
      clue: "Distorted surroundings",
    },
    {
      description: "a Rot-inducing touch",
      clue: "Rotten and decaying flesh",
    },
    {
      description: "Rotting breath",
      clue: "Decayed and putrid odor",
    },
    {
      description: "Rotting tendrils",
      clue: "Decayed and withering appendages",
    },
    {
      description: "Sanguineous explosions",
      clue: "Blood splatters and gory remains",
    },
    {
      description: "Shadow manipulation",
      clue: "Darkened areas and shifting shadows",
    },
    {
      description: "Shadowy tendrils",
      clue: "Writhing and ensnared victims",
    },
    {
      description: "Sonic wave generation",
      clue: "Shattered glass and disoriented victims",
    },
    {
      description: "Soul-constricting chains",
      clue: "Hindered movement and suffocation",
    },
    {
      description: "a Soul-consuming vortex",
      clue: "Vanished spirits and emptiness",
    },
    {
      description: "a Soul-corroding gaze",
      clue: "an aura of despair and hopelessness",
    },
    {
      description: "Soul-corrupting touch",
      clue: "Haunting nightmares and despair",
    },
    {
      description: "Soul-crushing presence",
      clue: "Overwhelming despair and hopelessness",
    },
    {
      description: "Soul-devouring maw",
      clue: "Emotionless and hollow-eyed victims",
    },
    {
      description: "Soul-draining mist",
      clue: "Weakened life force and lethargy",
    },
    {
      description: "Supernatural agility",
      clue: "Blurred movements",
    },
    {
      description: "Telekinetic powers",
      clue: "Levitating objects",
    },
    {
      description: "Teleportation",
      clue: "Mysterious disappearances",
    },
    {
      description: "Tentacles with barbed hooks",
      clue: "Lacerations and bloodied surfaces",
    },
    {
      description: "Tentacles with suction cups",
      clue: "Bruised sunction marks",
    },
    {
      description: "Time manipulation",
      clue: "Time freezes and temporal anomalies",
    },
    {
      description: "a Time-slowing aura",
      clue: "Sluggish movements and distorted time",
    },
    {
      description: "Toxic spines",
      clue: "Painful welts and numbness",
    },
    {
      description: "a Vampiric drain",
      clue: "Weak and emaciated victims",
    },
    {
      description: "Vampiric tendrils",
      clue: "Drained life force and weakened victims",
    },
    {
      description: "a Venomous bite",
      clue: "swolen and discoloured wounds",
    },
    {
      description: "Venomous blades",
      clue: "Lacerations with greenish hue",
    },
    {
      description: "Venomous darts",
      clue: "Puncture wounds with greenish hue",
    },
    {
      description: "a Venomous embrace",
      clue: "Painful constriction and envenomed wounds",
    },
    {
      description: "Venomous fumes",
      clue: "Nausea and asphyxiation",
    },
    {
      description: "a Venomous stinger",
      clue: "Puncture wounds with greenish hue",
    },
    {
      description: "a Venomous insect swarm",
      clue: "Bites and venomous secretions",
    },
    {
      description: "Volatile blood",
      clue: "Explosions and fiery eruptions",
    },
    {
      description: "a Vortex of destruction",
      clue: "Whirling chaos and obliterated objects",
    },
    {
      description: "Tentacles made of barbed wire",
      clue: "shredded flesh",
    },
    {
      description: "Acidic bile projectiles",
      clue: "Dissolving and corroded armour",
    },
    {
      description: "Telekinetic dismemberment",
      clue: "Severed limbs floating in mid-air",
    },
    {
      description: "Psychokinetic puppetry",
      clue: "Controlled movements of manipulated victims",
    },
    {
      description: "Symbiotic parasites that drain life energy",
      clue: "Weakened victims and withered vitality",
    },
    {
      description: "Illusory traps",
      clue: "False spikes and pitfalls",
    },
    {
      description: "Shapeshifting mimicry",
      clue: "Assumed forms of trusted allies",
    },
    {
      description: "Symbiotic leeches that drain life energy",
      clue: "a plague of leeches",
    },
  ],
  defensiveQuirk: [
    {
      description: "Reflective scales",
      clue: "Blinding glare and mirrored surface",
    },
    {
      description: "Defensive force field",
      clue: "Distorted energy barrier",
    },
    {
      description: "Sonic disorientation",
      clue: "Disrupted hearing and balance",
    },
    {
      description: "Venomous spines",
      clue: "Puncture wounds with toxic effects",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Electromagnetic interference",
      clue: "Disrupted magical and technological devices",
    },
    {
      description: "Shadow camouflage",
      clue: "Blending into darkness",
    },
    {
      description: "Telekinetic barrier",
      clue: "Repelled projectiles and obstacles",
    },
    {
      description: "Toxic cloud",
      clue: "Choking and poisoned air",
    },
    {
      description: "Hardened exoskeleton",
      clue: "Impenetrable armor and tough exterior",
    },
    {
      description: "Psychic backlash",
      clue: "Mental confusion and disorientation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Illusory projections",
      clue: "Distracting and misleading images",
    },
    {
      description: "Teleportation",
      clue: "Disappearing and reappearing instantly",
    },
    {
      description: "Invisibility",
      clue: "Vanishing from sight",
    },
    {
      description: "Forceful gusts",
      clue: "Knockback and disoriented movement",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
    {
      description: "Protective energy shield",
      clue: "Repelled projectiles and magical attacks",
    },
    {
      description: "Illusory clones",
      clue: "Distracting and misleading duplicates",
    },
    {
      description: "Teleportation displacement",
      clue: "Shifting positions to avoid harm",
    },
    {
      description: "Phantasmal projections",
      clue: "Illusory creatures to confuse attackers",
    },
    {
      description: "Elemental resistance",
      clue: "Reduced damage from specific elements",
    },
    {
      description: "Illusory duplicates",
      clue: "Confusion and difficulty discerning real from fake",
    },
    {
      description: "Energy absorption",
      clue: "Neutralizing and absorbing attacks",
    },
    {
      description: "Psychic barrier",
      clue: "Mental shield against manipulation",
    },
    {
      description: "Acidic mist",
      clue: "Corroded and sizzling fog",
    },
    {
      description: "Reactive camouflage",
      clue: "Mimicking surroundings for stealth",
    },
    {
      description: "Telekinetic manipulation",
      clue: "Manipulated objects as shields and weapons",
    },
    {
      description: "Mirror reflection",
      clue: "Redirected attacks and misdirection",
    },
    {
      description: "Acidic barrier",
      clue: "Corroded and sizzling force field",
    },
    {
      description: "Illusory maze",
      clue: "Disorienting paths and shifting corridors",
    },
    {
      description: "Insubstantial form",
      clue: "Intangible and incorporeal presence",
    },
    {
      description: "Spatial distortion",
      clue: "Disrupted perception of distance and space",
    },
    {
      description: "Venomous fog",
      clue: "Poisonous vapor causing weakness and paralysis",
    },
  ],
  questLocation: [
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
    "A haunted abandoned asylum",
  ],
  problem: [
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
    "have been cut off from communication",
  ],
  sex: ["male", "female"],
  race: [
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
    "goblin",
  ],
  descriptor: [
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
    "childish",
  ],
  personality: [
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
    "wisdom is beyond their years",
  ],
  clothes: [
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
    "a matching set of outlandish clothes",
  ],
  speech: [
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
  idiosyncrasy: [
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
    "twist the ring on their finger",
  ],
};

export function randomChoice(array) {
  let randNum = Math.floor(Math.random() * array.length);
  let randChoice = array[randNum];
  return randChoice;
}

function generatePrompt(promptCategory) {
  let promptArray = prompts[promptCategory];
  if (promptCategory === "npc") {
    let prompt = {
      sex: randomChoice(prompts.sex),
      race: randomChoice(prompts.race),
      descriptor: randomChoice(prompts.descriptor),
      personality: randomChoice(prompts.personality),
      clothes: randomChoice(prompts.clothes),
      speech: randomChoice(prompts.speech),
      idiosyncrasy: randomChoice(prompts.idiosyncrasy),
    };
    return prompt;
  } else {
    let prompt = randomChoice(promptArray);
    return prompt;
  }
}

export function vowelCheck(word) {
  var vowels = "aeiouAEIOU";
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
      case "monster":
        monster.set({
          description: prompt.description.toLowerCase(),
          clue: prompt.clue.toLowerCase(),
        });
        break;
      case "offensiveQuirk":
        offensiveQuirk.set({
          description: prompt.description.toLowerCase(),
          clue: prompt.clue.toLowerCase(),
        });
        break;
      case "defensiveQuirk":
        defensiveQuirk.set({
          description: prompt.description.toLowerCase(),
          clue: prompt.clue.toLowerCase(),
        });
        break;
      case "npc":
        npc.set({
          sex: prompt.sex.toLowerCase(),
          race: prompt.race.toLowerCase(),
          descriptor: prompt.descriptor.toLowerCase(),
          personality: prompt.personality.toLowerCase(),
          clothes: prompt.clothes.toLowerCase(),
          speech: prompt.speech.toLowerCase(),
          idiosyncrasy: prompt.idiosyncrasy.toLowerCase(),
        });
        break;
      case "questLocation":
        questLocation.set(capitalizeFirstLetter(prompt.toLowerCase()));
        break;
      case "problem":
        problem.set(prompt.toLowerCase());
        break;
    }
  }
}
