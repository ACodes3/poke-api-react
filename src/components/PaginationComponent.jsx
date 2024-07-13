import PropTypes from "prop-types";
import React from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({ currentPage, totalPages, paginate }) => {
  const paginationItems = [];

  if (totalPages <= 7) {
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
    paginationItems.push(
      <Pagination.Item key={1} active={currentPage === 1} onClick={() => paginate(1)}>
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
    <Pagination className="justify-content-center mt-3">
      <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
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
  );
};

PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default PaginationComponent;
