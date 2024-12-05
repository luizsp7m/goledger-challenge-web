import { ReactNode } from "react";
import { Container, PaginationContainer, PaginationItem } from "./styles";
import { useSearchParams } from "react-router-dom";
import { TableEmpty } from "../Table/TableEmpty";

export interface TablePagination {
  currentPage: number;
  totalPages: number;
}

interface TableColumn<T> {
  key: string;
  title: string;
  width?: number;
  render?: (record: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isFetching?: boolean;
  pagination?: TablePagination;
}

export function Table<T>({
  data,
  columns,
  isFetching = false,
  pagination,
}: TableProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChangePage(page: number) {
    searchParams.set("page", `${page}`);
    setSearchParams(searchParams);
  }

  return (
    <Container $isFetching={isFetching}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                {...(column.width && {
                  style: {
                    width: column.width,
                  },
                })}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <TableEmpty colSpan={columns.length} />
          ) : (
            data.map((record, recordIndex) => (
              <tr key={recordIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>
                    {column.render ? column.render(record) : record[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={columns.length}>aaa</td>
          </tr>
        </tfoot>
      </table>

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
