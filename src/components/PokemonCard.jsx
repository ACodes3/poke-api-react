import PropTypes from "prop-types";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img
        variant="top"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          pokemon.url.split("/")[6]
        }.png`}
        alt={pokemon.name}
      />
      <Card.Body>
        <Card.Title className="text-capitalize d-flex justify-content-center align-items-center align-self-center">
          {pokemon.name}
        </Card.Title>
        <Button
          className="w-100"
          variant="warning"
          onClick={() => onClick(pokemon.url)}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PokemonCard;
