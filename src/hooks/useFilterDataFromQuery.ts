import { useSearchParams } from "react-router-dom";

interface UseFilterDataFromQuery<T> {
  records: T[];
  searchField: keyof T
}

export function useFilterDataFromQuery<T>({ records, searchField }: UseFilterDataFromQuery<T>) {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = parseInt(searchParams.get("perPage") ?? "10", 10);

  const filteredData = records.filter((record) => {
    if (!search) return true;

    const fieldValue = `${record[searchField]}`.toLowerCase();

    return fieldValue.includes(search.toLowerCase());
  });

  const sortedData = filteredData.sort((a, b) => {
    if (!sortBy) return 0;

    const [field, order] = sortBy.split(":");

    if (!Object.keys(a).includes(field)) return 0;

    const valueA = `${a[field]}`.toLowerCase();
    const valueB = `${b[field]}`.toLowerCase();

    if (order === "asc") return valueA.localeCompare(valueB);
    if (order === "desc") return valueB.localeCompare(valueA);

    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / perPage);

  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const paginatedData = sortedData.slice((currentPage - 1) * perPage, currentPage * perPage);

  return {
    paginatedData,
    totalPages,
    currentPage,
  };
}