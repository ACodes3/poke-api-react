import PropTypes from "prop-types";
import React from "react";
import { ProgressBar } from "react-bootstrap";

const PokemonBaseStats = ({ stats }) => {
  return (
    <div className="mt-3">
      {stats.map((stat) => (
        <div key={stat.stat.name} className="mb-3">
          <div className="d-flex justify-content-between">
            <strong className="text-capitalize">{stat.stat.name}</strong>
            <span>{stat.base_stat}</span>
          </div>
          <ProgressBar
            now={stat.base_stat}
            label={`${stat.base_stat}`}
            className="mt-2"
            variant="warning"
          />
        </div>
      ))}
    </div>
  );
};

PokemonBaseStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      stat: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      base_stat: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PokemonBaseStats;
