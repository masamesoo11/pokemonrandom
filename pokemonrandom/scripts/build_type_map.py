#!/usr/bin/env python3
"""
Fetch the full list of Pokemon IDs per type from PokeAPI and write a JSON map.
We only care about Gen I-IX (Pokemon IDs 1-1025).
Run once to generate src/lib/type-pokemon-map.json
"""
import json
import urllib.request
import os

POKEAPI = "https://pokeapi.co/api/v2"
TYPES = [
    "normal","fire","water","electric","grass","ice","fighting","poison",
    "ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"
]

result = {}

for t in TYPES:
    print(f"Fetching type: {t}")
    url = f"{POKEAPI}/type/{t}"
    with urllib.request.urlopen(url, timeout=30) as resp:
        data = json.load(resp)
    # Each entry is like {"slot":1,"pokemon":{"name":"bulbasaur","url":".../pokemon/1/"}}
    ids = []
    for entry in data.get("pokemon", []):
        purl = entry["pokemon"]["url"]
        # url looks like https://pokeapi.co/api/v2/pokemon/1/
        pid = int(purl.rstrip("/").split("/")[-1])
        if 1 <= pid <= 1025:
            ids.append(pid)
    result[t] = sorted(ids)
    print(f"  {len(ids)} Pokemon of type {t}")

out_path = os.path.join(os.path.dirname(__file__), "..", "src", "lib", "type-pokemon-map.json")
with open(out_path, "w") as f:
    json.dump(result, f, separators=(",", ":"))
print(f"Wrote {out_path}")
print(f"Total types: {len(result)}")
