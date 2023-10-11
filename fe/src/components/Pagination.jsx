import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="mt-4 font-montserrat" aria-label="Pagination">
      <ul className="flex justify-center">
        <li
          className={`mx-1 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-purple-700 text-white cursor-pointer"
          } px-4 py-2 rounded-full`}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Previous
        </li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`mx-1 ${
              page === currentPage
                ? "bg-purple-700 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-purple-700 hover:text-white cursor-pointer"
            } px-4 py-2 rounded-full`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`mx-1 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-purple-700 text-white cursor-pointer"
          } px-4 py-2 rounded-full`}
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
