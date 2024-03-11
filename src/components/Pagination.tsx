import React from "react";
import "../assets/pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];
  const maxPageNumberVisible = 3;
  const pageBuffer = Math.floor(maxPageNumberVisible / 2);

  let lowerBound = Math.max(1, currentPage - pageBuffer);
  let upperBound = Math.min(totalPages, currentPage + pageBuffer);

  // Adjust bounds if near start or end
  if (currentPage <= pageBuffer) {
    upperBound = Math.min(maxPageNumberVisible, totalPages);
  }
  if (currentPage > totalPages - pageBuffer) {
    lowerBound = Math.max(totalPages - maxPageNumberVisible + 1, 1);
  }

  // Generate page numbers
  for (let i = lowerBound; i <= upperBound; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    paginate(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
            href="#!"
            className="page-link"
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </a>
        </li>
        <li className="page-item">
          <a
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(Math.max(1, currentPage - 1));
            }}
            href="#!"
            className="page-link"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </a>
        </li>
        {lowerBound > 1 && (
          <>
            <li className="page-item">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
                href="#!"
                className="page-link"
              >
                1
              </a>
            </li>
            {lowerBound > 2 && (
              <li className="page-item">
                <span className="pagination-ellipsis">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </span>
              </li>
            )}
          </>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(number);
              }}
              href="#!"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
        {upperBound < totalPages && (
          <>
            {upperBound < totalPages - 1 && (
              <li className="page-item">
                <span className="pagination-ellipsis">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </span>
              </li>
            )}
            <li className="page-item">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
                href="#!"
                className="page-link"
              >
                {totalPages}
              </a>
            </li>
          </>
        )}

        <li className="page-item">
          <a
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(Math.min(totalPages, currentPage + 1));
            }}
            href="#!"
            className="page-link"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </a>
        </li>
        <li className="page-item">
          <a
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
            href="#!"
            className="page-link"
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
