import { Box, HStack } from "@chakra-ui/react";
import AnalyticCard from "./AnalyticCard";
import { AiOutlineShop } from "react-icons/ai";
import { BiDollarCircle } from "react-icons/bi";
import { FaShopify } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";

const AnalyticCards = () => {
  const analyticData = [
    {
      id: 1,
      cardIcon: AiOutlineShop,
      analyticNumber: "17.5K",
      cardDescription: "Sellers active on our site",
    },
    {
      id: 2,
      cardIcon: BiDollarCircle,
      analyticNumber: "33K",
      cardDescription: "Monthly product sales",
    },
    {
      id: 3,
      cardIcon: FaShopify,
      analyticNumber: "45.5K",
      cardDescription: "Monthly orders",
    },
    {
      id: 4,
      cardIcon: FaSackDollar,
      analyticNumber: "100K+",
      cardDescription: "Annual gross sales",
    },
  ];

  return (
    <Box overflowX={{ base: "auto", lg: "hidden" }} px={4} py={2} marginTop={10}>
      <HStack
        spacing={{ base: 4, lg: 6 }}
        w={"full"}
        justifyContent={{ base: "start", lg: "center" }}
        display={{ base: "inline-flex", lg: "flex" }}
        flexWrap={{ lg: "wrap" }}
      >
        {analyticData.map((item) => (
          <AnalyticCard
            key={item.id}
            cardIcon={item.cardIcon}
            analyticNumber={item.analyticNumber}
            cardDescription={item.cardDescription}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default AnalyticCards;
