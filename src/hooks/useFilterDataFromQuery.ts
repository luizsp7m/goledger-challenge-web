import { useSearchParams } from "react-router-dom";

interface UseFilterDataFromQuery<T> {
  records: T[];
  field: keyof T
}

export function useFilterDataFromQuery<T>({ records, field }: UseFilterDataFromQuery<T>) {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");

  return records
    .filter((record: T) => {
      if (!search) return record;

      return `${record[field]}`.toLowerCase().includes(search.toLocaleLowerCase())
    })

    .sort((a: T, b: T) => {
      if (!sortBy) return 0;

      const [field, sort] = sortBy.split(":");

      if (!Object.keys(a).includes(field)) return 0;
      if (!["asc", "desc"].includes(sort)) return 0;

      if (sort === "asc") {
        return `${b[field]}`.localeCompare(`${a[field]}`);
      } else {
        return `${a[field]}`.localeCompare(`${b[field]}`);
      }
    });
}