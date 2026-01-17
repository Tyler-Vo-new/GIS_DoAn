import "../Styles/Components/Pagination.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "./Button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <Button
        variant="ghost"
        className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </Button>
      {pages.map((pageNumber) => (
        <Button
          key={`page-${pageNumber}`}
          variant="ghost"
          className={`pagination-btn ${currentPage === pageNumber ? "active" : ""}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        variant="ghost"
        className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
