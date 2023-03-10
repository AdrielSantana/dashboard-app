import { SearchIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

const SearchBar = () => {
  return (
    <InputGroup>
      <Input variant={"filled"} placeholder="Pesquisar" />
      <InputRightElement width="4.5rem">
        <Button
          colorScheme={"teal"}
          variant={"link"}
          size="lg"
          onClick={(e) => console.log("search")}
        >
          <SearchIcon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
export default SearchBar;
