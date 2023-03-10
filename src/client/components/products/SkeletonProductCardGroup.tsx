import SkeletonProductCard from "./SkeletonProductCard";
import { range } from "../../functions/range";
import { Flex } from "@chakra-ui/react";

type Props = {
  numberOfCards: number;
};

const SkeletonProductCardGroup = ({ numberOfCards }: Props) => {
  return (
    <Flex wrap={"wrap"} justifyContent={"space-evenly"} gap={8}>
      {range(1, numberOfCards).map((cardId) => {
        return <SkeletonProductCard key={cardId} />;
      })}
    </Flex>
  );
};

export default SkeletonProductCardGroup;
