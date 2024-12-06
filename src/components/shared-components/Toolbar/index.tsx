import { useForm } from "react-hook-form";
import { InputSearch } from "../DataEntry/InputSearch";
import { Container } from "./styles";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "../DataEntry/Select";
import { SEARCH_PARAMS_KEYS } from "~/constants/SearchParmsKeys";

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

  const searchParam = searchParams.get(SEARCH_PARAMS_KEYS.SEARCH) ?? "";
  const sortByParam = searchParams.get(SEARCH_PARAMS_KEYS.SORT_BY) ?? "";
  const perPageParam = searchParams.get(SEARCH_PARAMS_KEYS.PER_PAGE) ?? "";

  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    values: {
      search: searchParam,
    },
  });

  function onSubmitSearch(data: SearchFormData) {
    const { search } = data;

    if (!search) {
      searchParams.delete(SEARCH_PARAMS_KEYS.SEARCH);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(SEARCH_PARAMS_KEYS.SEARCH, search);
    searchParams.set(SEARCH_PARAMS_KEYS.PAGE, "1");

    setSearchParams(searchParams);
  }

  function handleSelectSort(option: Option | null) {
    if (!option) {
      searchParams.delete(SEARCH_PARAMS_KEYS.SORT_BY);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(SEARCH_PARAMS_KEYS.SORT_BY, option.value);
    setSearchParams(searchParams);
  }

  function handleChangePerPage(option: Option | null) {
    if (!option) {
      searchParams.delete(SEARCH_PARAMS_KEYS.PER_PAGE);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(SEARCH_PARAMS_KEYS.PER_PAGE, option.value);
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
