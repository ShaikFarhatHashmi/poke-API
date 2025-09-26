// render.js - Handles rendering of UI elements

export function renderPokemonCard(pokemon) {
  const image = pokemon.sprites?.front_default || "https://via.placeholder.com/100?text=No+Image";

  return `
    <div class="pokemon-card">
      <h3>${pokemon.name.toUpperCase()} (#${pokemon.id})</h3>
      <img src="${image}" alt="${pokemon.name}">
      <p><b>Type:</b> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
      <p><b>Abilities:</b> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
      <p><b>Base Exp:</b> ${pokemon.base_experience}</p>
    </div>
  `;
}
