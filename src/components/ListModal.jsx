import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";
import PokemonAbout from "./PokemonModalComponents/PokemonAbout";
import PokemonBaseStats from "./PokemonModalComponents/PokemonBaseStats";
import PokemonEncounters from "./PokemonModalComponents/PokemonEncounters";
import PokemonEvolutions from "./PokemonModalComponents/PokemonEvolutions";
import PokemonHeader from "./PokemonModalComponents/PokemonHeader";
import PokemonMoves from "./PokemonModalComponents/PokemonMoves";
import { getEncounters, getEvolutions, getMoveDetails } from "./helpers";

const ListModal = ({ show, onHide, pokemon }) => {
  const [encounters, setEncounters] = useState([]);
  const [moves, setMoves] = useState([]);
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    if (pokemon) {
      getEncounters(pokemon.id)
        .then((data) => setEncounters(data))
        .catch((error) => console.error("Error fetching encounters:", error));

      // Fetch move details
      const fetchMoveDetails = async () => {
        const moveDetails = await Promise.all(
          pokemon.moves.slice(0, 6).map((move) =>
            getMoveDetails(move.move.url).then((data) => ({
              name: move.move.name,
              power: data.power,
            }))
          )
        );
        setMoves(moveDetails);
      };
      fetchMoveDetails();

      // Fetch evolutions
      const fetchEvolutions = async () => {
        const evolutionData = await getEvolutions(pokemon.id);
        setEvolutions(evolutionData);
      };
      fetchEvolutions();
    }
  }, [pokemon]);

  if (!pokemon) return null;

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="pokemon-modal-title"
      centered
    >
      <PokemonHeader name={pokemon.name} id={pokemon.id} types={pokemon.types} />
      <Modal.Body className="text-start" scrollable>
        <Container>
          <Row>
            <Col
              sm={4}
              className="d-flex flex-column justify-content-start align-items-center mb-2"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                style={{ width: "200px", marginBottom: "20px" }}
                className="align-center"
              />
              <Button variant="light">
                <Heart />
              </Button>
            </Col>
            <Col sm={8}>
              <Tabs
                defaultActiveKey="about"
                id="pokemon-modal-tabs"
                className="mb-3"
                fill
              >
                <Tab eventKey="about" title="About">
                  <PokemonAbout height={pokemon.height} weight={pokemon.weight} />
                </Tab>
                <Tab eventKey="base-stats" title="Base Stats">
                  <PokemonBaseStats stats={pokemon.stats} />
                </Tab>
                <Tab eventKey="attacks" title="Attacks">
                  <PokemonMoves moves={moves} />
                </Tab>
                <Tab eventKey="evolutions" title="Evolutions">
                  <PokemonEvolutions evolutions={evolutions} />
                </Tab>
                <Tab eventKey="encounters" title="Encounters">
                  <PokemonEncounters encounters={encounters} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide} className="w-100">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ListModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        stat: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        base_stat: PropTypes.number.isRequired,
      })
    ).isRequired,
    moves: PropTypes.arrayOf(
      PropTypes.shape({
        move: PropTypes.shape({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }),
};

export default ListModal;
