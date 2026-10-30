import type { PokemonOriginalEntry } from "./types";

/** Johto: the Eevee twins, the pseudo-legendary, the tower legends and Celebi. */
export const johto: Record<number, PokemonOriginalEntry> = {
  196: {
    name: "Espeon",
    tagline: "The Sun Pokémon Whose Fur Reads the Future",
    overview: [
      "Espeon, the Sun Pokémon, is Eevee's daylight reward: evolve Eevee with maximum friendship during the morning or day and it becomes a slender lavender Psychic-type whose whole body is an instrument of foresight. The Pokédex is unusually specific about the mechanism — the fine fur across Espeon's skin is sensitive to air currents and shifting air pressure, letting it read the weather, and by extension predict its opponent's next move before it happens. The gem on its forehead, the forked tail, and the huge pupil-less eyes complete a design built entirely around the idea of perception: Espeon does not overpower you, it simply already knows what you were about to do.",
      "Introduced in Gold and Silver alongside its nocturnal twin Umbreon, Espeon established the friendship mechanic — a Pokémon that evolves because it trusts you, on the condition that it trusts you during the day. Its debut generation also gave it one of the great hidden abilities of the modern era: Magic Bounce, which reflects entry hazards and status moves back at the user, a competitive role so valuable that Espeon teams were built around that single slot.",
    ],
    battleGuide:
      "Espeon's competitive identity was defined by its hidden ability Magic Bounce: hazards, Taunt, Toxic, Thunder Wave, and Encore all bounce back at the opponent, making Espeon the premier anti-hazard lead of its era. Its 130 Special Attack and 110 Speed are genuine sweeper numbers — Calm Mind plus Stored Power is the classic snowball, with Psyshock or Psychic for immediate damage, Dazzling Gleam for coverage, and Morning Sun for recovery. Synchronize reflects status. It is frail on the physical side and folds to Dark, Ghost, and Bug priority, so the job is to reflect hazards early and win before those answers arrive.",
    trivia: [
      "Espeon's fur senses minute air currents and pressure shifts, letting it predict the weather and its opponent's next move.",
      "It evolves from Eevee through high friendship specifically during the day — its twin Umbreon evolves at night.",
      "The forehead gem is said to glow when Espeon's precognitive powers are active.",
      "Its hidden ability Magic Bounce reflects entry hazards and status moves back at the opponent.",
      "Espeon and Umbreon were the first Pokémon to evolve via the friendship mechanic, introduced in Gold and Silver.",
    ],
  },
  197: {
    name: "Umbreon",
    tagline: "The Moonlight Pokémon — Dark Type Born From Loyalty at Night",
    overview: [
      "Umbreon, the Moonlight Pokémon, is Eevee's nocturnal reward and the most beloved Dark-type of its generation: evolve Eevee with maximum friendship during the night and the result is a sleek black fox ringed with golden bands that, per the Pokédex, glow under moonlight — and, in its darker flavor entries, spray poisonous sweat from its pores when threatened. The design language is lunar and protective: where Espeon reads the future, Umbreon hunts in the dark and guards what it loves. It was the first flagship demonstration that the new Dark type of 1999 was not about evil, but about loyalty, cunning, and night.",
      "Umbreon's cultural footprint among fans is enormous — polls of favorite Eeveelutions have crowned it repeatedly, and its black-and-gold palette became one of the most merchandised color schemes in the franchise. In competitive play it built one of the longest-running defensive careers of any Eeveelution: a wall so stubborn that entire generations of players learned the phrase 'Umbreon outlasts you' the hard way.",
    ],
    battleGuide:
      "Umbreon is a textbook wall: 95 HP backed by 110 Defense and a towering 130 Special Defense. The classic set is Wish + Protect (passing healing to teammates), Toxic, and Foul Play — Foul Play being the masterstroke, since it uses the attacker's own Attack stat, punishing the physical sweepers Umbreon invites. Moonlight provides self-healing; Payback punishes the hits it absorbs. Synchronize punishes status attempts with a mirrored condition. Umbreon's weaknesses are Fighting, Bug, and Fairy — and its near-total lack of offensive presence means it wins by exhaustion, not damage.",
    trivia: [
      "Umbreon evolves from Eevee through high friendship during the night — the loyalty mechanic's dark twin.",
      "The golden rings on its body are said to glow faintly under moonlight.",
      "Its Pokédex entries mention spraying poisonous sweat from its pores when agitated as a defense.",
      "It has repeatedly won fan polls as the most popular Eeveelution.",
      "Foul Play lets Umbreon weaponize the opponent's own Attack stat, making physical hitters afraid of the wall.",
    ],
  },
  248: {
    name: "Tyranitar",
    tagline: "The Armor Pokémon Whose Rage Reshapes Entire Landscapes",
    overview: [
      "Tyranitar, the Armor Pokémon, is Johto's pseudo-legendary and one of the franchise's definitive monsters: a Rock/Dark colossus whose Pokédex entries read like a natural disaster report — it is so strong that it knocks down mountains to make its nest, and the resulting landslides are said to redraw entire maps. Its body is armored shell over armored shell, and its signature Sand Stream ability summons a sandstorm upon entry that rages until another weather replaces it, buffing its Rock-type special defense and chipping everything else on the field. Larvitar, its tiny mountain-dwelling first form, must eat a literal mountain's worth of soil before evolving — one of the great comedic contrasts in evolution lines.",
      "In the anime's fourth film, Pokémon 4Ever, a mind-controlled Tyranitar was the villain's siege engine — the creature audiences had known as an endgame boss rendered as a mountain that walks. In the games, Tyranitar arrived in Gold and Silver as the strongest non-legendary of its generation and has held elite competitive status ever since, one of very few Pokémon to remain relevant in standard play across every generation since its debut.",
    ],
    battleGuide:
      "Tyranitar's 600 total leans tanky: 134 Attack, 110/100 defenses, and Sand Stream giving it +50% Special Defense in its own sand. It has been a premier Stealth Rock setter, a Curse win-condition, and a Choice Band wallbreaker across different eras — Stone Edge and Crunch for STAB, with Knock Off, Earthquake, Ice Punch, Fire Blast, or Aqua Tail as coverage. The classic weakness is its typing: Rock/Dark carries a 4× Fighting weakness and seven total weaknesses, so Tyranitar lives and dies by prediction and teammates that absorb Fighting moves. In sand-centric teams, it is the sun the system orbits.",
    trivia: [
      "Tyranitar's Pokédex entries describe it knocking down mountains and causing landslides that redraw maps.",
      "Its Sand Stream ability summons a permanent-feeling sandstorm whenever it enters battle.",
      "Its first form, Larvitar, must eat an entire mountain of soil before it can evolve.",
      "It is Johto's pseudo-legendary, with a 600 base stat total matching Dragonite's template.",
      "A mind-controlled Tyranitar served as the antagonist's powerhouse in the film Pokémon 4Ever.",
    ],
  },
  249: {
    name: "Lugia",
    tagline: "The Guardian of the Seas Who Lives Where Storms Are Born",
    overview: [
      "Lugia, the Diving Pokémon, is the centerpiece of Gold and Silver's mythology: a Psychic/Flying leviathan that lives on the ocean floor, and whose restraint is the point of its legend — a single flap of its wings is said to be capable of leveling houses and kicking off forty-day storms, so Lugia isolates itself in the deep, sealing its own power away to protect the world. It is the trio master of Kanto's legendary birds, the one who quiets Articuno, Zapdos and Moltres when their elemental conflict threatens the climate, and the second film of the anime — The Movie 2000 — made that role its plot: a collector who tries to cage the birds learns what the guardian exists for.",
      "Its design inverts every expectation of a 'legendary bird': white, streamlined, dragon-like hands instead of talons, a body shaped for diving rather than soaring. Its hidden ability Multiscale — halving damage at full HP — matched the character perfectly: the guardian's first stand is its strongest.",
    ],
    battleGuide:
      "Lugia is one of the great walls of competitive history: 106/90/154 defenses behind a 680 total, Recover, and Multiscale halving any hit that lands while it is at full health. Aeroblast is its signature — a 100-power Flying attack with an elevated critical-hit ratio. Standard play is patient: Whirlwind to shuffle boosted sweepers away, Toxic to poison walls, Roost or Recover to undo everything, Reflect support for teammates, and Ice Beam or Aeroblast to be more than decoration. Calm Mind sets exist for stall-breaking. Its counters are few — Dark-types ignoring Psychic STAB and Taunt shutting down recovery are the main levers.",
    trivia: [
      "One flap of Lugia's wings is said to level houses and set off storms lasting forty days — which is why it lives in isolation on the ocean floor.",
      "It is the trio master of the Kanto legendary birds, calming their conflict in the film The Movie 2000.",
      "Lugia was the mascot of Pokémon Silver and its remake, SoulSilver.",
      "Its hidden ability Multiscale halves incoming damage while Lugia is at full HP.",
      "Aeroblast, its signature move, carries an elevated critical-hit ratio.",
    ],
  },
  250: {
    name: "Ho-Oh",
    tagline: "The Rainbow Phoenix Who Revived the Legendary Beasts",
    overview: [
      "Ho-Oh, the Rainbow Pokémon, carries the franchise's most elegant piece of inter-generational mythology: the Burned Tower of Ecruteak City. Long ago, a great tower burned and three Pokémon perished in the fire — and Ho-Oh descended through the flames and returned them to life as Raikou, Entei, and Suicune, the legendary beasts who roam Johto in Gold and Silver. The phoenix, the tower, the resurrection: it is a fully-formed myth cycle hidden inside a children's game, and it made Ho-Oh the first legendary many players ever saw — the anime's very first episode opens with Ash glimpsing a rainbow-winged silhouette in the sky, unidentified for years.",
      "Mechanically it is Fire/Flying, the mirror of Lugia: where the guardian of the seas is restraint, Ho-Oh is renewal — its feathers were said to glow in seven colors, it trails rainbows in flight, and its signature item Sacred Ash (a held item that revives the entire party once) encodes the resurrection theme directly into the inventory.",
    ],
    battleGuide:
      "Ho-Oh's hidden ability Regenerator — healing a third of its max HP every time it switches out — pairs beautifully with Heavy-Duty Boots to erase its 4× Stealth Rock weakness, turning a legendary glass profile into a restorative loop. Its 130 Attack powers Sacred Fire, the signature move with a 50% burn chance, and Brave Bird for raw power; 154 Special Defense makes it one of the sturdiest special walls ever printed. Substituting, Roost, and Whirlwind sets control pace; Earthquake or Iron Head handle Rock and Electric answers. The eternal caution: without Boots, half its health disappears the moment rocks are on the field.",
    trivia: [
      "Ho-Oh revived the three legendary beasts — Raikou, Entei and Suicune — after they perished in the burning of Ecruteak's tower.",
      "It appears in the very first anime episode as a rainbow-winged silhouette Ash glimpses but cannot identify.",
      "Its signature held item, Sacred Ash, revives the entire party once per battle — resurrection as inventory.",
      "Ho-Oh was the mascot of Pokémon Gold and its remake, HeartGold.",
      "Its Regenerator ability restores a third of its max HP each time it switches out.",
    ],
  },
  251: {
    name: "Celebi",
    tagline: "The Time-Traveling Guardian of the Forest",
    overview: [
      "Celebi, the Time Travel Pokémon, is Johto's mythical: a small green Psychic/Grass sprite that drifts out of a distant past (or future) through time itself, arriving in the present only when the Ilex Forest it guards is at peace. The Pokédex says it wanders across time, leaving behind forests flourished wherever it lands — its presence is fertility moving through history. Its shrine in Ilex Forest's deepest clearing became one of the series' quietest pilgrimage sites, and the GS Ball anime storyline that pointed at Celebi famously never resolved, leaving a generation of viewers with an unsolved mystery the games had answered all along.",
      "As the star of the film Pokémon 4Ever, Celebi carried the generation's emotional payload: a dying forest guardian revived across time by friendship, with Suicune racing alongside it. Design-wise it is a green onion-shaped fairy with transparent wings and eyes like closed clocks — small, silent, and impossibly old.",
    ],
    battleGuide:
      "Celebi's stat spread is balanced-strong (100 across the board, like Mew), and its typing gives it the tools: Giga Drain, Psychic or Psyshock, Recover, and the all-purpose utility it is famous for — Stealth Rock, Thunder Wave, Healing Wish, Baton Pass, Swords Dance or Nasty Plot passing. Natural Cure heals status on switch-out, encouraging pivot play. Its dangerous typing carries seven standard weaknesses — Ice, Fire, Flying, Poison, Dark, Ghost, and Steel — capped by a 4× vulnerability to Bug, the most famous 'Bug weakness' in the game, making U-turn and Megahorn its constant nemeses. It plays as the flexible glue of restricted formats: never the star, always the reason the star survives.",
    trivia: [
      "Celebi wanders through time, and forests are said to flourish wherever it arrives.",
      "Its shrine stands deep in Johto's Ilex Forest — the setting of its film, Pokémon 4Ever.",
      "The anime's GS Ball storyline pointed toward Celebi but was famously never resolved.",
      "It is a Mythical Pokémon, historically obtainable only through special distributions.",
      "Its 4× weakness to Bug-type moves is among the most famous type vulnerabilities in the franchise.",
    ],
  },
};
