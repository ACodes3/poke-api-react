import PropTypes from "prop-types";
import React from "react";
import { Card } from "react-bootstrap";

const PokemonEncounters = ({ encounters }) => {
  return (
    <div className="mt-3">
      {encounters.length === 0 ? (
        <Card body>
          <p>No encounters found for this Pokemon.</p>
        </Card>
      ) : (
        encounters.map((encounter, index) => (
          <div key={index} className="mb-3">
            <Card body>
              <p className="text-capitalize">
                <strong>Location:</strong>{" "}
                {encounter.location_area.name}
              </p>
              <p className="text-capitalize">
                <strong>Method:</strong>{" "}
                {encounter.version_details[0].encounter_details[0].method.name}
              </p>
              <p>
                <strong>Level Range:</strong>{" "}
                {encounter.version_details[0].encounter_details[0].min_level} -{" "}
                {encounter.version_details[0].encounter_details[0].max_level}
              </p>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

PokemonEncounters.propTypes = {
  encounters: PropTypes.arrayOf(
    PropTypes.shape({
      location_area: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      version_details: PropTypes.arrayOf(
        PropTypes.shape({
          encounter_details: PropTypes.arrayOf(
            PropTypes.shape({
              method: PropTypes.shape({
                name: PropTypes.string.isRequired,
              }).isRequired,
              min_level: PropTypes.number.isRequired,
              max_level: PropTypes.number.isRequired,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default PokemonEncounters;
