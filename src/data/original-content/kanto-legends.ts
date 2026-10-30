import type { PokemonOriginalEntry } from "./types";

/** Kanto's sleeping giant, the legendary birds, Dragonite, Mewtwo and Mew. */
export const kantoLegends: Record<number, PokemonOriginalEntry> = {
  143: {
    name: "Snorlax",
    tagline: "The Sleeping Giant Who Blocks the Road Until You Learn the Flute",
    overview: [
      "Snorlax, the Sleeping Pokémon, is the original 1996 roadblock: a 1,000-pound Normal-type that falls asleep in the middle of Routes 12 and 16 in Red and Blue, and cannot be moved by any strength, item, or cleverness — only by the Poké Flute, a quest item whose entire narrative purpose is waking one creature. Game design rarely commits that hard to a joke. And the joke deepens once you catch it: Snorlax is not an obstacle to be discarded but one of the strongest Pokémon in the generation, with a colossal 160 base HP and a metabolism that, per its Pokédex entries, requires roughly 900 pounds of food per day before it naps it all off.",
      "In the anime, Ash's Snorlax became a beloved recurring glutton who once fell asleep mid-battle and still won. In competitive play, Snorlax has been a defining wall since Generation I — the anchor of stall teams, the Rest-and-sleep-talk machine, the Curse user who gets faster as it gets heavier. Its Gigantamax form in Sword and Shield turned its belly into a mountain ecosystem with trees growing on it, which is exactly the correct amount of escalation.",
    ],
    battleGuide:
      "Snorlax's formula is the most trusted wall in competitive history: 160 base HP behind 65/110/65 defenses, Thick Fat halving Fire and Ice damage (or Immunity ignoring poison). Curse raises Attack and Defense at the cost of Speed it never uses, turning Snorlax into an unstoppable snowball; Rest + Sleep Talk keeps it alive forever; Body Slam and Earthquake or Heavy Slam provide the offense. The classic counterplay has always been strong Fighting coverage — Snorlax's one true weakness — and Toxic before it can Rest. In-game, one Snorlax with Body Slam, Rest, and two filler moves can solo half the Elite Four.",
    trivia: [
      "Snorlax blocks Routes 12 and 16 in Red and Blue and can only be woken with the Poké Flute quest item.",
      "Its 160 base HP was the highest of any Pokémon in the original games.",
      "The Pokédex says Snorlax eats roughly 900 pounds of food per day, then sleeps it off.",
      "It received a Gigantamax form in Sword and Shield with a small forest growing on its belly.",
      "Ash's Snorlax in the anime once won a battle by falling asleep mid-fight and rolling over the opposition.",
    ],
  },
  144: {
    name: "Articuno",
    tagline: "The Frost Bird of Kanto Whose Wings Freeze the Air Behind It",
    overview: [
      "Articuno, the Freeze Pokémon, is the ice of Kanto's legendary bird trio: a vast cryonic crane-like bird whose Pokédex entries say its wings are made of ice, and that it appears to travelers lost in frozen mountains — freezing the moisture in the air into snow as it flies, an ambivalent guardian that both haunts and saves. In the original games it waits in the deepest chamber of the Seafoam Islands, an optional detour whose freezing current maze felt, to a ten-year-old in 1998, like walking into a myth uninvited.",
      "As a design, Articuno set the template the whole trio follows: elemental mastery expressed as pure anatomy, no ornament, just a bird that has become its element. Its Galarian counterpart, introduced in the Crown Tundra of Sword and Shield, broke the mold deliberately — a Psychic/Flying reimagining that projects false visions and tests the observer's perception, proof that Game Freak knows exactly how much weight the original silhouette carries.",
    ],
    battleGuide:
      "Articuno's competitive identity is serene control: 90/85/125 bulk, Ice/Flying STAB, and Pressure, which drains double PP from anything targeting it (the hidden ability Snow Cloak adds evasion in snow). Its classic role is a specially defensive wall that spreads freezes — Ice Beam, Freeze-Dry to hit Water types super-effectively, Hurricane which reaches full accuracy in rain, and Roost to sustain it. In-game, Articuno at level 50 arrives with Ice Beam-tier power immediately and trivializes Lance's dragons. Its Rock and Fire weaknesses (4× to Rock) mean it must be played around Stealth Rock at all times.",
    trivia: [
      "Articuno's wings are described as made of actual ice; its flight freezes moisture in the air into snow.",
      "It dwells in the Seafoam Islands in Red and Blue, behind a freezing current maze.",
      "Galarian Articuno, introduced in the Crown Tundra, is a Psychic/Flying variant that projects illusions to test onlookers.",
      "It is the ice member of Kanto's legendary bird trio, alongside Zapdos and Moltres.",
      "Its hidden ability Snow Cloak makes it 20% harder to hit while hail is falling.",
    ],
  },
  145: {
    name: "Zapdos",
    tagline: "The Thunder Bird Who Lives Inside the Storm It Creates",
    overview: [
      "Zapdos, the Electric Pokémon, is the storm at the center of Kanto's legendary bird trio — and the strange one, because where Articuno is a crystalline apparition and Moltres a living conflagration, Zapdos is anatomy as static discharge: a bird of spiky black plumage that crackles, per the Pokédex, with electricity gained from thunderclouds it lives inside, gaining power from lightning strikes. The original games hid it in the Kanto Power Plant, an abandoned facility humming with electric Pokémon, so that finding Zapdos felt less like an encounter and more like discovering what the building had been drawing power from all along.",
      "Among the trio, Zapdos has historically been the competitor's choice — its Electric/Flying typing and stat spread made it a competitive staple for decades, the rare legendary that dominated standard play across multiple generations. Its Galarian form, introduced with the Crown Tundra, sprinted in an entirely different direction: a Fighting/Flying flightless ostrich-like runner whose kicks shatter boulders, trading the storm for the sprint.",
    ],
    battleGuide:
      "Zapdos has been a top-tier threat since Generation I, and the reason is offensive typing plus honest bulk: Electric/Flying gives it two strong STABs with complementary coverage (Thunderbolt, Drill Peck or Hurricane), 100 Special Attack, 90/85/90 defenses, and Pressure or the hidden Static, which punishes contact with a 30% paralysis chance. Its defining modern role is a specially defensive pivot: Discharge or Volt Switch, Hurricane in rain, Heat Wave coverage, Roost, and Defog — Zapdos is one of the only Electric types that can remove hazards. In-game, Thunderbolt alone deletes half of Kanto.",
    trivia: [
      "Zapdos gains power from thunderclouds and lightning strikes — the Pokédex says it lives inside thunderstorms.",
      "It hides in the abandoned Kanto Power Plant in Red and Blue.",
      "Galarian Zapdos, from the Crown Tundra, is a Fighting/Flying flightless sprinter whose kicks shatter boulders.",
      "It has remained a competitive staple since Generation I — rare among legendary Pokémon.",
      "Its hidden ability Static paralyzes attackers 30% of the time on contact.",
    ],
  },
  146: {
    name: "Moltres",
    tagline: "The Flame Bird Whose Ash Trail Rekindles It From Defeat",
    overview: [
      "Moltres, the Flame Pokémon, is the fire of Kanto's legendary bird trio and the series' first phoenix: a bird of living flame whose Pokédex entries describe it appearing to travelers lost in icy mountains, drowning the cold in orange. The original lore gives it the myth-cycle explicitly — when Moltres is injured, it immerses itself in volcanic magma and burns itself back to full strength, a resurrection detail that predates most of the franchise's mythology. In Red and Blue it nests on Victory Road, of all places: the final gauntlet before the Pokémon League, hiding a legend inside the last staircase.",
      "Its design taught a generation what elemental legendaries should look like — wings of fire, body of flame, no compromise — and its Galarian counterpart in the Crown Tundra took the opposite lesson: a Dark/Flying miasma of black flame whose aura spreads despair, the anti-phoenix. Between the two of them, Moltres brackets the whole emotional range a fire bird can carry.",
    ],
    battleGuide:
      "Moltres' kit is a classic special Fire attacker with unusual bulk: 125 Special Attack, 90/85/90 defenses, Fire/Flying STAB, and Flame Body, which burns attackers on 30% of contact hits — turning every physical duel into a gamble. Standard sets pair Flamethrower or Fire Blast with Hurricane or Air Slash and either Solar Beam or Roost, with Choice Scarf or Heavy-Duty Boots as the item (its 4× Stealth Rock weakness makes Boots near-mandatory in modern play). Sunny Day plus Solar Beam covers the Water and Rock counters that otherwise wall it.",
    trivia: [
      "Moltres heals itself by bathing in magma when injured — an explicit phoenix reference in its original Pokédex entries.",
      "It nests on Victory Road in Red and Blue, hiding inside the final route before the Pokémon League.",
      "Galarian Moltres, from the Crown Tundra, is a Dark/Flying bird of black flame that spreads despair.",
      "It takes 4× damage from Rock-type moves, making Stealth Rock its historical nemesis.",
      "Its Flame Body ability burns opponents 30% of the time they make physical contact.",
    ],
  },
  149: {
    name: "Dragonite",
    tagline: "The Gentle Orange Giant Who Saves Drowning Sailors",
    overview: [
      "Dragonite, the Dragon Pokémon, is Pokémon's first great subversion: the pseudo-legendary line that culminates in something kind. Dratini and Dragonair are serpents of escalating elegance, and then, at level 55 — the highest evolution level in the original games — the line lands not on a terror but on a plump orange guardian whose Pokédex entries say it circles the globe in sixteen hours and rescues drowning sailors, guiding lost ships to shore. The power is genuinely elite (600 base stat total, the template for every pseudo-legendary since), but the temperament is a rescue worker with wings.",
      "That contrast is the character. In the anime, a famous early episode featured a giant Dragonite that was less a monster than a lonely giant; in the games, Lance of the Elite Four rides three of them into battle as the final wall before the Champion, making the sea's gentle giant simultaneously the scariest thing in the building. Its design — small wings on a heavy body, antennae, and a rounded, friendly face — has been endlessly affectionate fan material since, a mascot of softness hiding one of the original 151's most elite stat lines.",
    ],
    battleGuide:
      "Dragonite's 600 total is distributed for war: 134 Attack, 100 Special Attack, and the hidden ability Multiscale, which halves incoming damage while at full HP — the single ability that defines its modern career. Its Dragon/Flying typing carries a brutal 4× Ice weakness, so Heavy-Duty Boots and careful switching keep Multiscale intact. Once set up, Dragon Dance fixes its Speed and Dual Wingbeat, Outrage, or Earthquake end games, while Extreme Speed picks off weakened foes with priority; Hurricane in rain or Fire Punch rounds out coverage. It has remained a premier setup sweeper in nearly every format it has ever entered.",
    trivia: [
      "Dragonite's Pokédex entries describe it circling the globe in sixteen hours and rescuing drowning sailors.",
      "It evolves from Dragonair at level 55 — the highest evolution level in the original Generation I games.",
      "Its 600 base stat total established the 'pseudo-legendary' standard copied by every generation after.",
      "The hidden ability Multiscale halves all incoming damage while Dragonite is at full HP.",
      "Lance of the Elite Four famously fields multiple Dragonite as his signature Pokémon in the original games.",
    ],
  },
  150: {
    name: "Mewtwo",
    tagline: "The Genetic Experiment That Outgrew Its Creators",
    overview: [
      "Mewtwo, the Genetic Pokémon, is the franchise's original sin: a Psychic-type clone spliced from the DNA of Mew by scientists bankrolled by Team Rocket, who pursued a weapon and produced a god. The games tell it through the abandoned journals of Pokémon Mansion on Cinnabar Island — a research log that goes from clinical to horrified as the subject grows. The finished creature, waiting at level 70 in Cerulean Cave, has 680 total stats with a monstrous 154 Special Attack, and for thirty years has been the benchmark of what 'overpowered' means: the first Pokémon ever banned from standard competitive play, permanently consigned to the Uber tier since 1996.",
      "The anime gave the story its soul in 1998's Mewtwo Strikes Back, still the highest-grossing Pokémon film: a newborn consciousness asking who its father is, being told it is a laboratory product, and deciding that created beings owe nothing to their creators. Ash's petrification and the tears of cloned Pokémon in the third act became the emotional core of a generation's childhood. Mewtwo's Mega Evolutions in X and Y — a Fighting-typed X and an even more powerful Y with 194 Special Attack — read as the creature still escalating away from its origins.",
    ],
    battleGuide:
      "Mewtwo's stats are a blunt instrument: 106/110/90/154/90/130 — power and speed with no real weak side. Its movepool is arguably the deepest in the game: Psystrike (its signature, a Psychic attack that hits the opponent's Defense), Aura Sphere, Ice Beam, Fire Blast, Focus Blast, Shadow Ball, Calm Mind, Recover, Taunt — it runs any role from wallbreaker to self-sufficient sweeper. Pressure or Unnerve for abilities. In restricted formats it competes with modern power creep (and often wins on raw flexibility); in-game, Calm Mind plus Psystrike and Recover ends most battles alone. It has no counter, only checks, and it has defined the Uber tier since the tier existed.",
    trivia: [
      "Mewtwo was created by splicing and enhancing Mew's DNA in experiments logged in the abandoned Pokémon Mansion on Cinnabar Island.",
      "It was the first Pokémon ever banned from standard competitive play, founding the Uber tier in Generation I.",
      "Mewtwo Strikes Back (1998) remains the highest-grossing Pokémon movie, centered on Mewtwo's search for its identity.",
      "Its 154 base Special Attack was the highest in the original games, and Mega Mewtwo Y raises it to 194.",
      "It waits at level 70 in Cerulean Cave in Red and Blue — the strongest wild encounter of the generation.",
    ],
  },
  151: {
    name: "Mew",
    tagline: "The Mythical Ancestor Whose DNA Runs Through Every Pokémon",
    overview: [
      "Mew, the New Species Pokémon, is the secret at the bottom of Generation I — literally: programmers hidden-carved it into the cartridge after debugging tools were locked out, 151st in a Pokédex that was supposed to end at 150, and the industry's most famous programming legend followed. Officially, Mew contains the genetic code of every Pokémon ever catalogued, which is why it can learn every Technical Machine and Hidden Machine in the original games — the entire movepool of a generation in one soft pink body. Only a handful of legitimate Mew were ever distributed in the West in those years, which made it the first 'mythical': real in the code, unreachable through play.",
      "The lore deepened retroactively: Mewtwo is its clone, making Mew both the ending and the beginning of the first generation's story — the gentle original whose stolen genes produced the angriest creature in the franchise. In Mewtwo Strikes Back, Mew's quiet insistence that cloning does not diminish either party is the film's whole thesis. Design-wise it is the anti-Mewtwo: a fetus-like cat embryo, 100 base stats in every direction, pink, floating, serene.",
    ],
    battleGuide:
      "Mew's competitive identity is total flexibility: 100 across all six stats means it is simultaneously bulky enough to wall, fast enough to outrun walls, and strong enough to hurt — and its movepool is functionally infinite (every TM and HM in Generation I, plus one of the widest tutoring pools since). It has run every archetype in competitive history: Swords Dance with Extreme Speed, Nasty Plot with Aura Sphere, utility hazard leads with Stealth Rock and Taunt, defensive Defog walls, and Transform-based impostor sets. Synchronize reflects status back at its cause. Its event-only availability has historically restricted Mew to special formats — where it has filled all six roles on a single team.",
    trivia: [
      "Mew was secretly added to Pokémon Red and Blue by programmer Shigeki Morimoto after debugging was locked — the most famous hidden content in game history.",
      "Its DNA is said to contain the genetic code of every Pokémon, which is why it learns every TM and HM in Generation I.",
      "A flat 100 base stat in every category — perfectly balanced, as legendary as it is unassuming.",
      "Mewtwo is a clone of Mew, making Mew both the origin and the counterpart of Generation I's most powerful creature.",
      "For years it was obtainable only through official events — the original 'mythical' Pokémon.",
    ],
  },
};
