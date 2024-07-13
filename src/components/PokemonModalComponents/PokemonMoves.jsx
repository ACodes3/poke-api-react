import PropTypes from "prop-types";
import React from "react";
import { ProgressBar } from "react-bootstrap";

const PokemonMoves = ({ moves }) => {
  return (
    <div className="mt-3">
      {moves.map((move, index) => (
        <div key={index} className="mb-3">
          <div className="d-flex justify-content-between">
            <strong className="text-capitalize">{move.name}</strong>
            <span>{move.power || "-"}</span>
          </div>
          <ProgressBar
            now={move.power || 50}
            label={`${move.power || "-"}`}
            className="mt-2"
            variant="danger"
          />
        </div>
      ))}
    </div>
  );
};

PokemonMoves.propTypes = {
  moves: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      power: PropTypes.number,
    })
  ).isRequired,
};

export default PokemonMoves;
