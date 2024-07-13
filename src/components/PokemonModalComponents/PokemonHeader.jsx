import PropTypes from "prop-types";
import React from "react";
import { Badge, Modal } from "react-bootstrap";
import { typeColors } from "../badgeColor";

const PokemonHeader = ({ name, id, types }) => {
  return (
    <Modal.Header closeButton>
      <Modal.Title
        id="pokemon-modal-title"
        className="w-100 d-flex flex-column align-items-center"
      >
        <div className="d-flex flex-column align-items-center">
          <h1 className="mb-0 text-capitalize">{name}</h1>
          <small className="text-muted">#{id.toString().padStart(3, "0")}</small>
        </div>
        <div className="mt-2 d-flex justify-content-center align-items-center gap-2 text-capitalize">
          {types.map((type) => (
            <Badge
              key={type.type.name}
              pill
              bg={typeColors[type.type.name] || "danger"}
              className="mr-1"
            >
              {type.type.name}
            </Badge>
          ))}
        </div>
      </Modal.Title>
    </Modal.Header>
  );
};

PokemonHeader.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default PokemonHeader;
