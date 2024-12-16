import { useSearchParams } from "react-router-dom";
import { SEARCH_PARAMS_KEYS } from "~/constants/SearchParamsKeys";

interface UseFilterDataFromQuery<T> {
  records: T[];
  searchField: keyof T;
}

export function useFilterDataFromQuery<T>({
  records,
  searchField,
}: UseFilterDataFromQuery<T>) {
  const [searchParams] = useSearchParams();

  const search = searchParams.get(SEARCH_PARAMS_KEYS.SEARCH);
  const sortBy = searchParams.get(SEARCH_PARAMS_KEYS.SORT_BY);

  const pageSearchParamValue = searchParams.get(SEARCH_PARAMS_KEYS.PAGE);
  const perPageSearchParamValue = searchParams.get(SEARCH_PARAMS_KEYS.PER_PAGE);

  const page = pageSearchParamValue ? parseInt(pageSearchParamValue, 10) : 1;

  const perPage = perPageSearchParamValue
    ? parseInt(perPageSearchParamValue, 10)
    : 10;

  const filteredData = records.filter((record) => {
    if (!search) return true;

    const fieldValue = `${record[searchField]}`.toLowerCase();

    return fieldValue.includes(search.toLowerCase());
  });

  const sortedData = filteredData.sort((a, b) => {
    if (!sortBy) return 0;

    const [field, order] = sortBy.split(":");

    if (!Object.keys(a as object).includes(field)) return 0;

    const valueA = `${a[field as keyof T]}`.toLowerCase();
    const valueB = `${b[field as keyof T]}`.toLowerCase();

    if (order === "asc") return valueA.localeCompare(valueB);
    if (order === "desc") return valueB.localeCompare(valueA);

    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / perPage);
  const totalItems = filteredData.length;
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return {
    paginatedData,
    totalItems,
    totalPages,
    currentPage,
  };
}
