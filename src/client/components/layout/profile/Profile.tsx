"use client";
import useColors from "@/client/assets/useColors";
import { fetchUser } from "@/client/services/api";
import useUserStore from "@/client/state/useUserStore";
import { HStack, Icon, Text, Stack, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const { colors } = useColors();
  const { user } = useUserStore();
  const { data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(user!.id),
  });

  return (
    <HStack gap={2}>
      <Icon boxSize={12} as={CgProfile} color={colors.primary} />
      <Stack w={"5rem"} maxW={"10rem"} gap={3} spacing={0}>
        <Skeleton maxW={"10rem"} h={"15px"} isLoaded={isSuccess}>
          <Text fontSize={"lg"} fontWeight={400} noOfLines={1}>
            {data?.status == true && data?.user.name}
            {data?.status == false && <>Error</>}
          </Text>
        </Skeleton>

        <Skeleton w={"5rem"} maxW={"10rem"} h={"15px"} isLoaded={isSuccess}>
          <Text fontSize={"sm"} fontWeight={400} noOfLines={1}>
            {data?.status == true && data?.user.occupation}
            {data?.status == false && <>Error</>}
          </Text>
        </Skeleton>
      </Stack>
    </HStack>
  );
};
export default Profile;
