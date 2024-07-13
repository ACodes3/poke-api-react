import PropTypes from "prop-types";
import React from "react";

const PokemonEvolutions = ({ evolutions }) => {
  return (
    <div className="mt-3 d-flex flex-wrap justify-content-evenly align-items-center">
      {evolutions.map((evolution, index) => (
        <div key={index} className="d-flex flex-column align-items-center mb-3">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
            alt={evolution.name}
            style={{ width: "100px", marginBottom: "10px" }}
          />
          <strong className="text-capitalize">{evolution.name}</strong>
        </div>
      ))}
    </div>
  );
};

PokemonEvolutions.propTypes = {
  evolutions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PokemonEvolutions;
