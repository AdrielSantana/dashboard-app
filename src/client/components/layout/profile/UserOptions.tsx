import { HStack } from "@chakra-ui/react";
import Options from "./Options";
import Profile from "./Profile";
import ProfileMenu from "./ProfileMenu";

const UserOptions = () => {

  return (
    <>
      <Options/>
      <HStack>
        <Profile />
        <ProfileMenu />
      </HStack>
    </>
  );
};

export default UserOptions;
