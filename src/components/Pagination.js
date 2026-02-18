import { Pagination as BsPagination } from 'react-bootstrap';
import { memo, useMemo } from 'react';

export const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5
}) {
  const pageNumbers = useMemo(() => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  if (totalPages <= 1) return null;

  return (
    <BsPagination className="justify-content-center mb-0">
      <BsPagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
      <BsPagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {pageNumbers[0] > 1 && (
        <>
          <BsPagination.Item onClick={() => onPageChange(1)}>1</BsPagination.Item>
          {pageNumbers[0] > 2 && <BsPagination.Ellipsis disabled />}
        </>
      )}

      {pageNumbers.map(page => (
        <BsPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </BsPagination.Item>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <BsPagination.Ellipsis disabled />}
          <BsPagination.Item onClick={() => onPageChange(totalPages)}>{totalPages}</BsPagination.Item>
        </>
      )}

      <BsPagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <BsPagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </BsPagination>
  );
});
