import useSearchStore from "@/client/state/useSearchStore";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const SearchBar = () => {
  const { setSearch, setUsedSearch } = useSearchStore();
  const { register, handleSubmit } = useForm();

  const handleSubmitSearch = (data: any) => {
    setSearch(data.search);
    setUsedSearch(true);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitSearch)}>
      <InputGroup>
        <Input
          variant={"filled"}
          placeholder="Pesquisar"
          {...register("search")}
          type={"text"}
        />
        <InputRightElement width="4.5rem">
          <Button colorScheme={"teal"} variant={"link"} size="lg" type="submit">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
};
export default SearchBar;
