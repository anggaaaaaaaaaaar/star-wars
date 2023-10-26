import React from 'react'
import styled from 'styled-components'

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const PageButton = styled.button<{ active: boolean }>`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: #6b6b6b;
  }

  ${(props) =>
    props.active &&
    `
    background-color: #4e4e4e;
    color: #fff;
    border: 1px solid #4e4e4e;
  `}
`

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

const Index: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <PaginationContainer>
      {pageNumbers.map((number) => (
        <PageButton
          key={number}
          active={number === currentPage}
          onClick={() => onPageChange(number)}>
          {number}
        </PageButton>
      ))}
    </PaginationContainer>
  )
}

export default Index
