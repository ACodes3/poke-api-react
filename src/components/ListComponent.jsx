import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { getPokemons } from "../api"; // Adjust the import path as needed

const ListComponent = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Change this to the number of items you want per page

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Create pagination items
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);
  const paginationItems = [];

  if (totalPages <= 7) {
    // If there are less than 7 total pages, show all pagination items
    for (let number = 1; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
  } else {
    // If there are more than 7 total pages, show first 3, last 3, and current page
    paginationItems.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => paginate(1)}
      >
        1
      </Pagination.Item>
    );
    if (currentPage > 3) {
      paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }
    for (
      let number = Math.max(2, currentPage - 1);
      number <= Math.min(currentPage + 1, totalPages - 1);
      number++
    ) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    if (currentPage < totalPages - 2) {
      paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }
    paginationItems.push(
      <Pagination.Item
        key={totalPages}
        active={currentPage === totalPages}
        onClick={() => paginate(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div>
        <Container className="mt-3 mb-3">
          <Form className="d-flex w-100">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {currentItems.map((pokemon, index) => (
          <Card key={index} style={{ width: "18rem", margin: "10px" }}>
            <Card.Img
              variant="top"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                pokemon.url.split("/")[6]
              }.png`}
              alt={pokemon.name}
            />
            <Card.Body>
              <Card.Title className="d-flex justify-content-center align-items-baseline align-self-center text-capitalize">
                {pokemon.name}
              </Card.Title>
              <Button
                className="d-flex justify-content-center aling-content-center align-self-center"
                variant="primary"
                href={pokemon.url}
                target="_blank"
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Pagination className="d-flex justify-content-center mt-3">
        <Pagination.First
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default ListComponent;
