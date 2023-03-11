import useDesktopMediaQuery from "@/client/assets/useDesktopMediaQuery";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Flex,
  Heading,
  Icon,
} from "@chakra-ui/react";

import { AiFillHome } from "react-icons/ai";
import {
  BsFillCartFill,
  BsPeopleFill,
  BsFillCalendarDateFill,
  BsFillCalendarMonthFill,
  BsGraphUpArrow,
  BsFillShieldLockFill,
  BsFillClipboard2DataFill,
} from "react-icons/bs";
import { FaGlobeAmericas, FaCashRegister } from "react-icons/fa";
import { RiFilePaperFill } from "react-icons/ri";

import UserOptions from "../profile/UserOptions";
import SidebarButton from "./SidebarButton";
import SidebarButtonGroup from "./SidebarButtonGroup";

const btnGroupClientFacing = [
  {
    label: "Produtos",
    tag: "products",
    leftIcon: <Icon boxSize={5} as={BsFillCartFill} />,
  },
  {
    label: "Clientes",
    tag: "customers",
    leftIcon: <Icon boxSize={5} as={BsPeopleFill} />,
  },
  {
    label: "Transações",
    tag: "transactions",
    leftIcon: <Icon boxSize={5} as={RiFilePaperFill} />,
  },
  {
    label: "Geografia",
    tag: "geography",
    leftIcon: <Icon boxSize={5} as={FaGlobeAmericas} />,
  },
];

const btnGroupSales = [
  {
    label: "Visão Geral",
    tag: "overview",
    leftIcon: <Icon boxSize={5} as={FaCashRegister} />,
  },
  {
    label: "Diário",
    tag: "daily",
    leftIcon: <Icon boxSize={5} as={BsFillCalendarDateFill} />,
  },
  {
    label: "Mensal",
    tag: "monthly",
    leftIcon: <Icon boxSize={5} as={BsFillCalendarMonthFill} />,
  },
  {
    label: "Resumo",
    tag: "breakdown",
    leftIcon: <Icon boxSize={5} as={BsFillClipboard2DataFill} />,
  },
];

const btnGroupManagement = [
  {
    label: "Admin",
    tag: "admin",
    leftIcon: <Icon boxSize={5} as={BsFillShieldLockFill} />,
  },
  {
    label: "Performance",
    tag: "performance",
    leftIcon: <Icon boxSize={5} as={BsGraphUpArrow} />,
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: Props) => {
  const { isNonMobile } = useDesktopMediaQuery();

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size={"lg"}>Dashboard App</Heading>
          </DrawerHeader>

          <DrawerBody px={7}>
            <Flex
              justifyContent={"flex-start"}
              gap={8}
              my={5}
              direction="column"
            >
              <SidebarButton
                tag=""
                label="Dashboard"
                leftIcon={<Icon boxSize={5} as={AiFillHome} />}
              />
              <SidebarButtonGroup
                label={"Dados do Cliente"}
                btnGroup={btnGroupClientFacing}
              />
              <SidebarButtonGroup label={"Vendas"} btnGroup={btnGroupSales} />
              <SidebarButtonGroup
                label={"Administração"}
                btnGroup={btnGroupManagement}
              />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Flex
              mb={5}
              gap={5}
              justifyContent={"center"}
              alignItems={"center"}
              wrap={"wrap-reverse"}
            >
              {!isNonMobile && <UserOptions />}
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
