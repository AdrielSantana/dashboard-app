import usePageStore from "@/client/state/usePageStore";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

import React from "react";

type Props = {
  tag: string;
  label: string;
  leftIcon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

const SidebarButton = ({ label, leftIcon, tag }: Props) => {
  const { page, setPage } = usePageStore();
  const active = page == tag ? true : false;

  return (
    <Link href={`/dashboard/${tag}`}>
      <Button
        isActive={active}
        onClick={(e) => {
          setPage(tag);
        }}
        leftIcon={leftIcon}
        rightIcon={
          <ChevronRightIcon color={active ? "" : "transparent"} boxSize={5} />
        }
        colorScheme="teal"
        variant="ghost"
        w={"100%"}
        justifyContent={"space-between"}
      >
        {label}
      </Button>
    </Link>
  );
};

export default SidebarButton;
