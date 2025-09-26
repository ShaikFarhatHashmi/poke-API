// app.js
import { fetchPokemonList, fetchPokemonDetails, fetchPokemonByNameOrId } from "./api.js";
import { renderPokemonCard } from "./render.js";
import { showLoading, hideLoading } from "./utils.js";

const loadPokemonsBtn = document.getElementById("list-pokemon");
const pokemonList = document.getElementById("pokemonList");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

let offset = 0;
const limit = 20;

// Fetch list of Pokémon with details
async function listPokemonWithDetails(limit, offset) {
  showLoading();
  try {
    const data = await fetchPokemonList(limit, offset);

    const details = await Promise.all(
      data.results.map(p => fetchPokemonDetails(p.url))
    );

    pokemonList.innerHTML = details.map(renderPokemonCard).join("");
    prevPageBtn.disabled = offset === 0;
  } catch (err) {
    pokemonList.innerHTML = `<p class="error">${err.message}</p>`;
  } finally {
    hideLoading();
  }
}

// 🔹 Search Pokémon by name or ID
async function searchPokemon() {
  const query = searchInput.value.trim();
  if (!query) return;

  showLoading();
  try {
    const pokemon = await fetchPokemonByNameOrId(query);
    pokemonList.innerHTML = renderPokemonCard(pokemon);
  } catch (err) {
    pokemonList.innerHTML = `<p class="error">${err.message}</p>`;
  } finally {
    hideLoading();
  }
}

// Event Listeners
loadPokemonsBtn.addEventListener("click", () => listPokemonWithDetails(limit, offset));

nextPageBtn.addEventListener("click", () => {
  offset += limit;
  listPokemonWithDetails(limit, offset);
});

prevPageBtn.addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    listPokemonWithDetails(limit, offset);
  }
});

searchBtn.addEventListener("click", searchPokemon);

// Enter key triggers search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchPokemon();
});
