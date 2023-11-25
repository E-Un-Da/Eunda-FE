import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button`
  background-color: ${({ active }) => (active ? '#7f56d9' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
`;

const Ellipsis = styled.span`
  margin: 0 5px;
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // 보여줄 최대 페이지 수

    // 현재 페이지 중심으로 최대 보여줄 페이지 번호 계산
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 시작 페이지가 맨 앞 페이지와 겹치지 않도록 보정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
      pageNumbers.push(
        <PageNumber key="prev" onClick={() => onPageChange(currentPage - 1)}>
          Prev
        </PageNumber>
      );
    }

    if (startPage > 1) {
      pageNumbers.push(<Ellipsis key="startEllipsis">...</Ellipsis>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageNumber key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
          {i}
        </PageNumber>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(<Ellipsis key="endEllipsis">...</Ellipsis>);
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <PageNumber key="next" onClick={() => onPageChange(currentPage + 1)}>
          Next
        </PageNumber>
      );
    }

    return pageNumbers;
  };

  return <PaginationContainer>{renderPageNumbers()}</PaginationContainer>;
};

export default Pagination;