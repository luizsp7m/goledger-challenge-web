import { useForm } from "react-hook-form";
import { InputSearch } from "../DataEntry/InputSearch";
import { Container } from "./styles";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "../DataEntry/Select";

const perPageOptions = [
  { value: "10", label: "10 itens por página" },
  { value: "20", label: "20 itens por página" },
  { value: "30", label: "30 itens por página" },
];

type Option = {
  value: string;
  label: string;
};

const searchSchema = z.object({
  search: z.string().optional(),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface ToolbarProps {
  title: string;
  sortByOptions: Option[];
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
  const perPageParam = searchParams.get("perPage") ?? "";

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
    searchParams.set("page", "1");

    setSearchParams(searchParams);
  }

  function handleSelectSort(option: Option | null) {
    if (!option) {
      searchParams.delete("sortBy");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("sortBy", option.value);
    setSearchParams(searchParams);
  }

  function handleChangePerPage(option: Option | null) {
    if (!option) {
      searchParams.delete("perPage");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("perPage", option.value);
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
        <div className="left-side">
          <form onSubmit={handleSubmit(onSubmitSearch)}>
            <InputSearch
              {...register("search")}
              buttonType="submit"
              placeholder={`Pesquisar por ${title.toLowerCase()}`}
            />
          </form>
        </div>

        <div className="right-side">
          <Select
            value={sortByOptions.find((option) => option.value === sortByParam)}
            isClearable
            placeholder="Ordenar por"
            onChange={(option) => handleSelectSort(option as Option | null)}
            options={sortByOptions}
          />

          <Select
            value={perPageOptions.find(
              (option) => option.value === perPageParam
            )}
            isClearable
            placeholder="Itens por página"
            onChange={(option) => handleChangePerPage(option as Option | null)}
            options={perPageOptions}
          />
        </div>
      </div>
    </Container>
  );
}
