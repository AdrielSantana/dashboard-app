import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import UserOptions from "./UserOptions";

type Props = {
  isNonMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isNonMobile, isOpen, onClose }: Props) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size={"lg"}>Dashboard App</Heading>
          </DrawerHeader>

          <DrawerBody>
            <Flex
              gap={5}
              justifyContent={"center"}
              alignItems={"center"}
              wrap={"wrap"}
            >
              {!isNonMobile && <UserOptions />}
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
