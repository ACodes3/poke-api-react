import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from 'react-bootstrap/Row';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Helper function to capitalize the first letter of a string
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Mock function to get evolutions (replace with actual API call if needed)
const getEvolutions = (pokemon) => {
  // This is a placeholder. You need to replace it with actual evolution data.
  // Assuming it returns an array of evolution objects with id and name.
  return [
    { id: 2, name: "Ivysaur" },
    { id: 3, name: "Venusaur" },
  ];
};

// function to get encounters
const getEncounters = async (pokemonId) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`
  );
  const data = await response.json();
  return data;
};

const ListModal = ({ show, onHide, pokemon }) => {
  const [encounters, setEncounters] = useState([]);
  useEffect(() => {
    if (pokemon) {
      getEncounters(pokemon.id)
        .then((data) => setEncounters(data))
        .catch((error) => console.error("Error fetching encounters:", error));
    }
  }, [pokemon]);

  if (!pokemon) return null;

  const evolutions = getEvolutions(pokemon);

  return (
    <Modal
    size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="pokemon-modal-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="pokemon-modal-title"
          className="w-100 d-flex flex-column align-items-center"
        >
          <div className="d-flex flex-column align-items-center">
            <h1 className="mb-0">{capitalize(pokemon.name)}</h1>
            <small className="text-muted">
              #{pokemon.id.toString().padStart(3, "0")}
            </small>
          </div>
          <div className="mt-2 d-flex justify-content-center align-items-center gap-2">
            {pokemon.types.map((type) => (
              <Badge key={type.type.name} pill bg="danger" className="mr-1">
                {capitalize(type.type.name)}
              </Badge>
            ))}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-start">
        <Container>
          <Row>
            <Col sm={4}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
          style={{ width: "200px", marginBottom: "20px" }}
          className="align-center"
        />
        </Col>
        <Col sm={8}>
        <Tabs
          defaultActiveKey="about"
          id="pokemon-modal-tabs"
          className="mb-3"
          fill
        >
          <Tab eventKey="about" title="About">
            <div className="text-start mt-3">
              <p>
                <strong>Height:</strong> {pokemon.height * 10} cm
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </p>
            </div>
          </Tab>
          <Tab eventKey="base-stats" title="Base Stats">
            <div className="mt-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <strong>{capitalize(stat.stat.name)}</strong>
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
          </Tab>
          <Tab eventKey="attacks" title="Attacks">
            <div className="mt-3">
              {pokemon.moves.slice(0, 6).map((move, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <strong>{capitalize(move.move.name)}</strong>
                    <span>{move.move.power || "-"}</span>
                  </div>
                  <ProgressBar
                    now={move.move.power || 50}
                    label={`${move.move.power || "-"}`}
                    className="mt-2"
                    variant="danger"
                  />
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="evolutions" title="Evolutions">
            <div className="mt-3">
              {evolutions.map((evolution, index) => (
                <div
                  key={index}
                  className="d-flex flex-column align-items-center mb-3"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                    alt={evolution.name}
                    style={{ width: "100px", marginBottom: "10px" }}
                  />
                  <strong>{capitalize(evolution.name)}</strong>
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="encounters" title="Encounters">
            <div className="mt-3">
              {encounters.length === 0 ? (
                <Card body>
                  <p>No encounters found for this Pokemon.</p>
                </Card>
              ) : (
                encounters.map((encounter, index) => (
                  <div key={index} className="mb-3">
                    <Card body>
                      <p>
                        <strong>Location:</strong>{" "}
                        {capitalize(encounter.location_area.name)}
                      </p>
                      <p>
                        <strong>Method:</strong>{" "}
                        {capitalize(
                          encounter.version_details[0].encounter_details[0]
                            .method.name
                        )}
                      </p>
                      <p>
                        <strong>Level Range:</strong>{" "}
                        {
                          encounter.version_details[0].encounter_details[0]
                            .min_level
                        }{" "}
                        -{" "}
                        {
                          encounter.version_details[0].encounter_details[0]
                            .max_level
                        }
                      </p>
                    </Card>
                  </div>
                ))
              )}
            </div>
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

export default ListModal;
