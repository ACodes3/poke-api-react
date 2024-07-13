import PropTypes from "prop-types";
import React from "react";

const PokemonAbout = ({ height, weight }) => {
  return (
    <div className="text-start mt-3">
      <p>
        <strong>Height:</strong> {height * 10} cm
      </p>
      <p>
        <strong>Weight:</strong> {weight / 10} kg
      </p>
    </div>
  );
};

PokemonAbout.propTypes = {
  height: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
};

export default PokemonAbout;
