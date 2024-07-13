// Helper function to capitalize the first letter of a string
export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Function to get evolutions
export const getEvolutions = async (pokemonId) => {
  try {
    // Fetch Pokémon species data to get the evolution chain URL
    const speciesResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
    );
    const speciesData = await speciesResponse.json();

    // Fetch the evolution chain data using the URL from the species data
    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();

    // Extract the evolution details
    const evolutions = [];
    let currentEvolution = evolutionChainData.chain;

    while (currentEvolution) {
      evolutions.push({
        id: currentEvolution.species.url.split("/").filter(Boolean).pop(), // Get the Pokémon ID from the URL
        name: currentEvolution.species.name,
      });
      currentEvolution = currentEvolution.evolves_to[0]; // Move to the next evolution in the chain
    }

    return evolutions;
  } catch (error) {
    console.error("Error fetching evolutions:", error);
    return [];
  }
};

// function to get encounters
export const getEncounters = async (pokemonId) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`
  );
  const data = await response.json();
  return data;
};

// function to get move details
export const getMoveDetails = async (moveUrl) => {
  const response = await fetch(moveUrl);
  const data = await response.json();
  return data;
};