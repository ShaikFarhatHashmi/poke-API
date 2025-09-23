const pokemonInput = document.getElementById("pokemonInput");
const searchPokemonBtn = document.getElementById("searchPokemon");
const typeInput = document.getElementById("typeInput");
const abilityInput = document.getElementById("abilityInput");
const moveInput = document.getElementById("moveInput");
const searchTypeBtn = document.getElementById("searchType");
const searchAbilityBtn = document.getElementById("searchAbility");
const searchMoveBtn = document.getElementById("searchMove");
const pokemonInfo = document.getElementById("pokemonInfo");
const loading = document.getElementById("loading");

function showLoading() {
  loading.classList.remove("hidden");
}
function hideLoading() {
  loading.classList.add("hidden");
}

// 1. Fetch Pokémon by Name/ID
async function getPokemon(identifier) {
  showLoading();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
    if (!res.ok) throw new Error("Pokémon not found");
    const data = await res.json();

    pokemonInfo.innerHTML = `
      <h2>${data.name.toUpperCase()} (#${data.id})</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p><b>Type:</b> ${data.types.map(t => t.type.name).join(", ")}</p>
      <p><b>Abilities:</b> ${data.abilities.map(a => a.ability.name).join(", ")}</p>
    `;
  } catch (err) {
    pokemonInfo.innerHTML = `<p class="error">${err.message}</p>`;
  } finally {
    hideLoading();
  }
}

// 2. Fetch by Type
async function getPokemonByType(type) {
  showLoading();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    if (!res.ok) throw new Error("Type not found");
    const data = await res.json();

    pokemonInfo.innerHTML = `
      <h2>Pokémon with type: ${type}</h2>
      <ul>${data.pokemon.slice(0, 10).map(p => `<li>${p.pokemon.name}</li>`).join("")}</ul>
      <p>(Showing first 10 results)</p>
    `;
  } catch (err) {
    pokemonInfo.innerHTML = `<p class="error">${err.message}</p>`;
  } finally {
    hideLoading();
  }
}

// 3. Fetch by Ability
async function getPokemonByAbility(ability) {
  showLoading();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`);
    if (!res.ok) throw new Error("Ability not found");
    const data = await res.json();

    pokemonInfo.innerHTML = `
      <h2>Pokémon with ability: ${ability}</h2>
      <ul>${data.pokemon.slice(0, 10).map(p => `<li>${p.pokemon.name}</li>`).join("")}</ul>
      <p>(Showing first 10 results)</p>
    `;
  } catch (err) {
    pokemonInfo.innerHTML = `<p class="error">${err.message}</p>`;
  } finally {
    hideLoading();
  }
}

// 4. Fetch Move Info
async function getMove(move) {
  showLoading();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
    if (!res.ok) throw new Error("Move not found");
    const data = await res.json();

    pokemonInfo.innerHTML = `
      <h2>Move: ${data.name}</h2>
      <p><b>Power:</b> ${data.power || "N/A"}</p>
      <p><b>Accuracy:</b> ${data.accuracy || "N/A"}</p>
      <p><b>PP:</b> ${data.pp}</p>
      <p><b>Type:</b> ${data.type.name}</p>
    `;
  } catch (err) {
    pokemonInfo.innerHTML = `<p class="error">${err.message}</p>`;
  } finally {
    hideLoading();
  }
}

// Event Listeners
searchPokemonBtn.addEventListener("click", () => getPokemon(pokemonInput.value.trim().toLowerCase()));
searchTypeBtn.addEventListener("click", () => getPokemonByType(typeInput.value.trim().toLowerCase()));
searchAbilityBtn.addEventListener("click", () => getPokemonByAbility(abilityInput.value.trim().toLowerCase()));
searchMoveBtn.addEventListener("click", () => getMove(moveInput.value.trim().toLowerCase()));
