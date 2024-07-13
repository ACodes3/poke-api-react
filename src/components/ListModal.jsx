import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

const ListModal = ({ show, onHide, pokemon }) => {
  if (!pokemon) return null;

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg" className="text-capitalize">
          {pokemon.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-evenly align-items-center">
        <Container>
          <Row>
            <Col sm={5}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={pokemon.name}
                  style={{ width: "200px" }}
                />
              </div>
            </Col>
            <Col sm={7}>
              <div style={{ textAlign: "start", marginTop: "20px" }}>
                <h4>Details</h4>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                {/* Add more details as needed */}
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListModal;
