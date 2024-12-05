import { ReactNode } from "react";
import { Container, PaginationContainer, PaginationItem } from "./styles";
import { useSearchParams } from "react-router-dom";
import { TableEmpty } from "../Table/TableEmpty";

export interface TablePagination {
  currentPage: number;
  totalPages: number;
}

interface TableColumn<T> {
  dataIndex?: keyof T;
  title: string;
  width?: number;
  render?: (record: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isFetching?: boolean;
  pagination?: TablePagination;
  onSelectRow?: (record: T) => void;
}

export function Table<T>({
  data,
  columns,
  isFetching = false,
  pagination,
  onSelectRow,
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
            {columns.map((column, columnIndex) => (
              <th
                key={columnIndex}
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
              <tr
                key={recordIndex}
                {...(onSelectRow && {
                  onClick: () => onSelectRow(record),
                  className: "row-selectable",
                })}
              >
                {columns.map((column, columnIndex) => {
                  if (column.render) {
                    return <td key={columnIndex}>{column.render(record)}</td>;
                  }

                  if (column.dataIndex && record[column.dataIndex]) {
                    return (
                      <td key={columnIndex}>
                        {record[column.dataIndex] as ReactNode}
                      </td>
                    );
                  }

                  return null;
                })}
              </tr>
            ))
          )}
        </tbody>

        {pagination && data.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan={columns.length}>
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
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </Container>
  );
}
