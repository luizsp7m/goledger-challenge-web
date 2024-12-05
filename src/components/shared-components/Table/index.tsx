import { ReactNode } from "react";
import { Container, PaginationContainer, PaginationItem } from "./styles";
import { useSearchParams } from "react-router-dom";

export interface TablePagination {
  currentPage: number;
  totalPages: number;
}

interface TableProps {
  isFetching?: boolean;
  children: ReactNode;
  pagination?: TablePagination;
}

export function Table({
  isFetching = false,
  pagination,
  children,
}: TableProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChangePage(page: number) {
    searchParams.set("page", `${page}`);
    setSearchParams(searchParams);
  }

  return (
    <Container $isFetching={isFetching}>
      <table>{children}</table>

      {pagination && (
        <PaginationContainer>
          {Array.from(Array(pagination.totalPages)).map((_, index) => (
            <PaginationItem
              key={index}
              type="button"
              onClick={() => handleChangePage(index + 1)}
              $isActive={index + 1 === pagination.currentPage}
            >
              {index + 1}
            </PaginationItem>
          ))}
        </PaginationContainer>
      )}
    </Container>
  );
}
