import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

const ProfileMenu = () => {
  return (
    <>
      <Menu>
        <MenuButton
          colorScheme={"teal"}
          as={IconButton}
          variant="ghost"
          size={"lg"}
          icon={<ChevronDownIcon boxSize={7} />}
        />
        <MenuList>
          <MenuItem>Perfil</MenuItem>
          <MenuItem>Sair</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default ProfileMenu;
