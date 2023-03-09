import { HStack, Icon, useColorModeValue, Text, Stack } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import ProfileMenu from "./ProfileMenu";

const Profile = () => {
  const color = useColorModeValue("teal.600", "teal.200");

  return (
    <HStack gap={2}>
      <Icon boxSize={12} as={CgProfile} color={color} />
      <Stack maxW={"10rem"} spacing={0}>
        <Text fontSize={"lg"}  fontWeight={400} noOfLines={1}>Nome</Text>
        <Text fontSize={"md"} fontWeight={400} noOfLines={1}>
          Profissão
        </Text>
      </Stack>
    </HStack>
  );
};
export default Profile;
