// api.js

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  return res.json();
}

export async function fetchPokemonDetails(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch Pokémon details");
  return res.json();
}

// 🔹 New: Fetch Pokémon by name or ID
export async function fetchPokemonByNameOrId(nameOrId) {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId.toLowerCase()}`);
  if (!res.ok) throw new Error(`No Pokémon found for "${nameOrId}"`);
  return res.json();
}
