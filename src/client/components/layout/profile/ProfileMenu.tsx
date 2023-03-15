import useAuth from "@/client/services/useAuth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

const ProfileMenu = () => {
  const { logout } = useAuth();

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
          <MenuItem onClick={(e) => logout()}>Sair</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default ProfileMenu;
