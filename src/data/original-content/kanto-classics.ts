import type { PokemonOriginalEntry } from "./types";

/** Kanto's most searched classics: the three starters, the mascot, and Gengar. */
export const kantoClassics: Record<number, PokemonOriginalEntry> = {
  1: {
    name: "Bulbasaur",
    tagline: "The Grass Starter That Kicks Off the Entire National Pokédex",
    overview: [
      "Bulbasaur holds a permanent place in Pokémon history as entry #001 in the National Pokédex — the very first Pokémon ever catalogued. This Grass/Poison-type Seed Pokémon carries a plant bulb on its back from the moment it hatches, and the bond between creature and plant is the whole concept: the bulb absorbs sunlight, converts it to energy, and in return grows into a massive flower as Bulbasaur matures into Ivysaur at level 16 and Venusaur at level 32. That symbiosis made it a favorite of trainers who wanted a starter that stays useful from the first route all the way to the Champion.",
      "In the anime, Ash's Bulbasaur became one of the series' most beloved characters by flat-out refusing to evolve — a decision that turned it into a symbol of self-acceptance for an entire generation of viewers. Its calm, dependable personality contrasted with Charmander's drama and Squirtle's swagger, and its Razor Leaf and Vine Whip attacks taught millions of kids what a utility movepool looked like before they knew the word for it.",
    ],
    battleGuide:
      "Bulbasaur's real strength is early-game tempo: Sleep Powder plus Razor Leaf handles the first three Kanto gyms (Brock, Misty, Lt. Surge is trickier) almost single-handedly. The hidden ability Chlorophyll doubles its Speed in harsh sunlight, pairing beautifully with Growth — in older games Growth raised both attacking stats by two stages under sun. Leech Seed adds passive recovery and lets it out-grind walls. In modern competitive formats it is mostly a Venusaur stepping stone, but in Little Cup rules, an Eviolite Bulbasaur with Giga Drain and Sleep Powder is a legitimately annoying tank.",
    trivia: [
      "Bulbasaur is #001 in the National Pokédex — the first Pokémon ever officially catalogued.",
      "Its bulb is a separate symbiotic plant that grows with it; the creature and the plant photosynthesize together.",
      "In the anime, Ash's Bulbasaur famously refused to evolve into Ivysaur and remained a fan-favorite for that choice.",
      "It is one of only three Kanto starters offered by Professor Oak, alongside Charmander and Squirtle.",
      "The name combines 'bulb' and 'saur' (from the Greek sauros, lizard) — a literal description of what it is.",
    ],
  },
  4: {
    name: "Charmander",
    tagline: "The Lizard Pokémon Whose Tail Flame Burns for Its Very Life",
    overview: [
      "Charmander is the Fire-type Lizard Pokémon and the most dramatic of Kanto's three starters — because for Charmander, the flame on its tail is literally a life meter. The Pokédex has said it for decades: if that flame goes out, the Pokémon dies. In healthy condition the fire wags gently and burns at a steady height, but rain becomes a genuine threat, and an anxious or weakened Charmander shows it immediately in the flame's sputter. It is one of the earliest examples of Pokémon design telling a story through a single visual detail.",
      "The anime turned that detail into one of the most memorable episodes of the original series: a young Charmander left abandoned on a rock in the rain by a careless trainer named Damian, refusing to move because it still believed he would come back. Ash carried it to a Pokémon Center and saved its life, and the fire that almost went out eventually grew into the Charizard that became the series' most iconic powerhouse. Generations of players picked Charmander in Red and Blue for exactly that arc.",
    ],
    battleGuide:
      "Charmander's journey is a slow burn: it struggles against Brock and Misty early, then evolves into Charmeleon at level 16 and the mighty Charizard at level 36, at which point the Fire-type payoff arrives. Its ability Blaze boosts Fire moves by 50% when HP drops below a third, rewarding players who ride the comeback line. The hidden ability Solar Power trades HP each turn for extra Special Attack in sun. Classic in-game sets lean on Flamethrower plus coverage like Dragon Rage early and Wing Attack later; competitively, Charmander itself is a Little Cup pick where Dragon Breath and Fire Blast keep it honest.",
    trivia: [
      "The flame on Charmander's tail indicates its health and mood — the Pokédex warns that the Pokémon dies if the flame is extinguished.",
      "The anime episode featuring an abandoned Charmander left in the rain is one of the most famous of the original series.",
      "It evolves into Charmeleon at level 16, then into Charizard at level 36 — the latest final evolution among the Kanto starters.",
      "Charmander line artwork by Ken Sugimori became the visual template for Fire starters across later generations.",
      "Its Japanese name, Hitokage, literally means 'fire lizard'.",
    ],
  },
  7: {
    name: "Squirtle",
    tagline: "The Tiny Turtle Behind Gaming's Most Famous Delinquents",
    overview: [
      "Squirtle, the Water-type Tiny Turtle Pokémon, completes Kanto's starter trio and has always carried a mischievous streak that its grassy and fiery rivals lack. Its shell is a fortified birthright — the rounded carapace hardens shortly after hatching, and Squirtle's signature trick is withdrawing into it to shrug off attacks before counterattacking with pressurized water jets fired from its mouth. It evolves into Wartortle at level 16 and the cannon-armed Blastoise at level 36, ending up as one of the most defensively reliable fully evolved starters in the franchise.",
      "What cemented Squirtle's legend, though, was the anime's Squirtle Squad: a gang of stray Squirtle wearing sunglasses, committing petty crimes across Kanto until their leader joined Ash's team and spent years donning those same shades whenever duty called. Between that swagger and Blastoise's role as the mascot of Pokémon Blue (the version that, alongside Red, launched the entire franchise in the West), Squirtle has never left the conversation.",
    ],
    battleGuide:
      "Squirtle offers the smoothest difficulty curve of the original Kanto starters: it beats Brock outright, holds its own against most mid-game threats, and its Torrent ability boosts Water moves by 50% when HP falls below a third. Withdraw plus Bite is the classic early combo; by the endgame, Surf, Ice Beam, and Body Slam make it a genuine all-rounder. In competitive Little Cup, Squirtle's Shell Armor ability (blocking critical hits) plus Eviolite makes it one of the format's premier physical walls, and its access to Rapid Spin gives it a support niche bigger than its size suggests.",
    trivia: [
      "Squirtle's shell is not decorative — its rounded shape deflects attacks, and it retreats inside as both defense and ambush tactic.",
      "The anime's 'Squirtle Squad' — sunglasses-wearing delinquent Squirtle — became one of the franchise's most beloved running gags.",
      "Blastoise, its final form, was the mascot of Pokémon Blue in Japan and the West's original Blue version.",
      "The name blends 'squirt' and 'turtle'; its Japanese name, Zenigame, means 'baby pond turtle'.",
      "The Squirtle line's design, particularly Blastoise's cannons, set the visual bar for every Water starter that followed.",
    ],
  },
  25: {
    name: "Pikachu",
    tagline: "The Electric Mouse That Became the Face of a Global Franchise",
    overview: [
      "Pikachu is not just a Pokémon — it is the Pokémon, the Electric-type Mouse Pokémon that has served as the franchise's mascot since the anime premiered in 1997. Its rise was accidental in the best way: the games' original mascot plans did not center on it, but an anime production looking for a creature that could express emotion in yellow against colorful backgrounds chose Pikachu over candidates like Clefairy, and the rest is history. Ash's Pikachu, refusing a Thunder Stone so it could win through effort rather than borrowed power, defined the spirit of the entire series.",
      "The design itself is a masterclass in iconography: lightning-bolt tail, red cheek pouches that store electricity, black ear tips that read as silhouettes even in motion, and a name built from onomatopoeia — 'pika' is the Japanese sound of an electric spark, and 'chu' the squeak of a mouse. Its voice actress Ikue Ōtani has performed the role for more than a quarter century using almost nothing but variations of the creature's own name. Female Pikachu can be identified by the heart-shaped notch at the end of their tails.",
    ],
    battleGuide:
      "Pikachu battles far above its modest 320 base stat total thanks to the Light Ball, a held item that doubles its Attack and Special Attack — turning a fragile mascot into a genuine wallbreaker. Volt Tackle, its signature move (bred onto it via a Light Ball-holding parent), is a 120-power physical Electric attack with recoil. Static punishes physical contact by paralyzing 30% of the time. Classic sets run Volt Tackle or Thunderbolt with Iron Tail, Quick Attack, and Extreme Speed for priority; the trade-off is stark — without the Light Ball, Pikachu is strictly outclassed by its own evolution.",
    trivia: [
      "Pikachu's name is pure onomatopoeia: 'pika' is the Japanese sound of an electric spark, and 'chu' is a mouse's squeak.",
      "Voice actress Ikue Ōtani has voiced Pikachu almost exclusively with variations of its own name since 1997.",
      "Ash's Pikachu famously rejected a Thunder Stone in an early episode — choosing effort over forced evolution.",
      "Female Pikachu have a heart-shaped notch in the end of their tails, a gender difference introduced in Generation IV.",
      "Pikachu is the only Pokémon with a permanent, dedicated role in every core anime season and received a Gigantamax form in Sword and Shield.",
    ],
  },
  39: {
    name: "Jigglypuff",
    tagline: "The Balloon Pokémon That Sings You to Sleep, Then Draws on Your Face",
    overview: [
      "Jigglypuff, the Balloon Pokémon, is Pokémon comedy in its purest form. A round pink Normal/Fairy-type (pure Normal until Generation VI reclassified it) with enormous hypnotic eyes, Jigglypuff's whole identity is its lullaby: it puffs itself up like a balloon and sings audiences into a dead sleep, then — and this is the crucial part — becomes furious that they fell asleep, and decorates their unconscious faces with the marker it carries. In the anime this bit ran for years and turned Jigglypuff into one of the most recognizable characters in the cast, permanently searching for an audience polite enough to stay awake.",
      "That comedic fame carried Jigglypuff into unusual places: it has been a playable fighter in every single Super Smash Bros. game since the 1999 original, where its Rest attack — the infamous instant-nap move that can KO opponents point-blank — is one of fighting games' most celebrated high-risk moves. In the Pokémon world itself, its song is serious business: trainers use it to pacify dangerous wild Pokémon, and its evolutionary line tops out with Wigglytuff via a Moon Stone.",
    ],
    battleGuide:
      "Jigglypuff's stats look comical until you notice the 115 base HP powering an enormous HP pool at level 100 — the body of a dedicated wall on a balloon. Its fairy-typing gives it a coveted immunity to Dragon attacks and resistance to Dark and Fighting. Competitive Jigglypuff in Little Cup runs an Eviolite set with Sing, Stealth Rock or Knock Off, and Body Slam fishing for paralysis; its hidden ability Friend Guard even reduces damage taken by its allies in doubles formats. The signature problem is speed and defenses: everything hinges on landing Sing's shaky 55% accuracy first.",
    trivia: [
      "Jigglypuff's anime running gag — scribbling on sleeping audiences with a marker after they nod off mid-song — ran across multiple series.",
      "It has been a playable fighter in every Super Smash Bros. game since the 1999 original.",
      "Its Sing lullaby is genuinely hypnotic in-universe, used to pacify wild Pokémon and even hostile crowds.",
      "Jigglypuff was reclassified from pure Normal to Normal/Fairy when the Fairy type was introduced in Generation VI.",
      "It inflates like a literal balloon, and can deflate and float on breezes when it needs to travel.",
    ],
  },
  59: {
    name: "Arcanine",
    tagline: "The 'Legendary' Pokémon That Isn't Actually a Legend",
    overview: [
      "Arcanine occupies the strangest taxonomic niche in the original 151: its official Pokédex classification is, verbatim, the Legendary Pokémon — yet it is neither legendary nor mythical in any mechanical sense. It is simply a 555-base-stat-total Fire-type quadruped so majestic, fast, and powerful that the Pokédex itself gave it legendary branding. Its design fuses lion, tiger, and the shisa guardian dogs of Okinawan folklore, and that pedigree reads instantly: Arcanine looks the way a myth feels, all flowing mane and confident stride, sprinting the equivalent of 6,200 miles in a single day according to its Pokédex entries.",
      "It evolves from Growlithe via a Fire Stone, making it one of the original games' first evolution-stone payoff moments, and its stat line outclasses several actual Kanto legends. The anime added poetry to it: Arcanine appears in the very first episode's title sequence fantasy and was established as a creature trainers dream of riding. In later generations it gained a Hisuian form in Legends: Arceus — a Rock/Fighting variant whose stone armor reimagined the legend for a different age.",
    ],
    battleGuide:
      "Arcanine's 555 total is elite for a non-legendary: 110 Attack, 95 Special Attack, and 80 Speed with solid 90/80/80 bulk mean it hits from either side of the stat sheet. Intimidate (cutting the foe's Attack on entry) makes it a superb pivot, while Flash Fire grants a Fire immunity that baits opposing Fire moves for a free boost. Its signature-speed move Extreme Speed, a +2 priority attack, lets it pick off weakened sweepers. Standard sets pair Flare Blitz with Close Combat or Wild Charge coverage; competitive staples also run Will-O-Wisp, Morning Sun, and Snarl for a specially defensive 'Bulky Dog' pivot set that has stayed viable for over a decade.",
    trivia: [
      "Arcanine's official Pokédex classification is literally 'the Legendary Pokémon' despite having no legendary status in game mechanics.",
      "Its base stat total of 555 is higher than several actual legendary Pokémon, including the Kanto legendary birds.",
      "The design draws from shisa — the lion-dog guardian statues of Okinawan tradition.",
      "It evolves from Growlithe with a Fire Stone, one of the original evolution items from Generation I.",
      "Pokémon Legends: Arceus introduced a Hisuian Arcanine, a Rock/Fighting form armored in stone.",
    ],
  },
  94: {
    name: "Gengar",
    tagline: "The Shadow Under Your Feet — Kanto's Deadliest Ghost",
    overview: [
      "Gengar, the Shadow Pokémon, is the franchise's definitive ghost: a purple spiky grin that, per its original Pokédex entry, pretends to be your shadow on a moonlit night and drains the warmth from the room when it nears. The lore is genuinely unsettling in the way only early Pokémon managed — Gengar is said to be the ghost of something, hiding in shadows, stealing heat from the air around it, and laughing when its victim shivers. It lives in the Pokémon Tower graveyard of Lavender Town in the original games, where catching one requires the Silph Scope just to see what is haunting you.",
      "Mechanically, Gengar is the payoff of the franchise's strangest evolution line: Gastly and Haunter evolve only through trading, making Gengar one of the first Pokémon that forced players to interact with each other. It has been a competitive powerhouse ever since — a blistering 110 Speed special attacker with Ghost/Poison STAB, an elite movepool, and in Generation VI a Mega Evolution so overwhelming it was banned from standard play entirely. Fans have also long noted that Gengar's silhouette is a near-perfect fit for Clefable's, feeding one of Pokémon's oldest fan theories that the ghost is haunting the fairy.",
    ],
    battleGuide:
      "Gengar's formula has been stable for decades: max out Speed and Special Attack, then fire off Shadow Ball and Sludge Bomb for dual STAB, with Focus Blast punishing the Steel and Normal types that resist. Its original ability Levitate gave it a free Ground immunity, later replaced by Cursed Body, which can disable an attacker's move on contact. In older generations, Hypnosis plus its speed made it a terrifying sleep inducer. The Mega Evolution that made it untouchable in Gen VI gained the true Shadow Tag ability; modern Gengar instead plays speed-control games with Icy Wind, Will-O-Wisp, and Destiny Bond — trading its life for the opponent's sweeper.",
    trivia: [
      "Gengar's original Pokédex entry describes it pretending to be a victim's shadow and draining the room's warmth.",
      "It evolves from Haunter only through trading — one of the first Pokémon requiring player-to-player interaction.",
      "Its silhouette closely matches Clefable's, inspiring one of the franchise's oldest fan theories.",
      "Gengar's Generation VI Mega Evolution was banned from standard competitive play for being too overwhelming.",
      "In the original games, Gastly's line haunts Lavender Town's Pokémon Tower, the series' first graveyard.",
    ],
  },
};
