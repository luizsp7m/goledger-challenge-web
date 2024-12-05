import { useForm } from "react-hook-form";
import { InputSearch } from "../DataEntry/InputSearch";
import { Container } from "./styles";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "../DataEntry/Select";

type SortOption = {
  value: string;
  label: string;
};

const searchSchema = z.object({
  search: z.string().optional(),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface ToolbarProps {
  title: string;
  sortByOptions: SortOption[];
  handleOpenModalForm: () => void;
}

export function Toolbar({
  title,
  sortByOptions,
  handleOpenModalForm,
}: ToolbarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get("search") ?? "";
  const sortByParam = searchParams.get("sortBy") ?? "";

  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    values: {
      search: searchParam,
    },
  });

  function onSubmitSearch(data: SearchFormData) {
    const { search } = data;

    if (!search) {
      searchParams.delete("search");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("search", search);
    setSearchParams(searchParams);
  }

  function handleSelectSort(option: SortOption | null) {
    if (!option) {
      searchParams.delete("sortBy");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("sortBy", option.value);
    setSearchParams(searchParams);
  }

  return (
    <Container>
      <div className="header">
        <h3>{title}</h3>

        <button type="button" onClick={() => handleOpenModalForm()}>
          Adicionar
        </button>
      </div>

      <div className="operations">
        <form onSubmit={handleSubmit(onSubmitSearch)}>
          <InputSearch
            {...register("search")}
            buttonType="submit"
            placeholder={`Pesquisar por ${title.toLowerCase()}`}
          />
        </form>

        <div className="sort-by">
          <Select
            value={sortByOptions.find((option) => option.value === sortByParam)}
            isClearable
            placeholder="Ordenar por"
            onChange={(option) => handleSelectSort(option as SortOption | null)}
            options={sortByOptions}
          />
        </div>
      </div>
    </Container>
  );
}
