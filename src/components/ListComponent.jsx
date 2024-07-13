import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { getPokemons } from "../api";
import ListModal from "./ListModal";
import PaginationComponent from "./PaginationComponent";
import PokemonCard from "./PokemonCard";

const ListComponent = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        const data = await getPokemons();
        setPokemons(data.results);
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedPokemon(data);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch Pokémon details:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container className="mt-3 mb-3">
        <Form className="d-flex w-100">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-danger">Search</Button>
        </Form>
      </Container>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {currentItems.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            onClick={fetchPokemonDetails}
          />
        ))}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />

      <ListModal
        show={showModal}
        onHide={() => setShowModal(false)}
        pokemon={selectedPokemon}
      />
    </div>
  );
};

export default ListComponent;
