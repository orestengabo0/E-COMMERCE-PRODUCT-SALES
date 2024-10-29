import { TbTruckDelivery } from "react-icons/tb";
import { FaHeadphonesAlt } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { Box, VStack } from "@chakra-ui/react";
import AboutServiceCard from "./AboutServiceCard";

const aboutServiceData = [
  {
    id: 1,
    serviceIcon: TbTruckDelivery,
    serviceHeading: "Free and fast Delivery",
    serviceDesc: "Free Delivery of all orders over $200",
  },
  {
    id: 2,
    serviceIcon: FaHeadphonesAlt,
    serviceHeading: "24/7 CUSTOMER SERVICE",
    serviceDesc: "Friendly 24/7 customer support",
  },
  {
    id: 3,
    serviceIcon: MdOutlineVerifiedUser,
    serviceHeading: "MONEY BACK GUARANTEE",
    serviceDesc: "We return money within 30 days",
  },
];

const AboutServiceCards = () => {
  return (
    <Box>
      <VStack spacing={10}>
        {aboutServiceData.map((serviceData) => (
          <AboutServiceCard
            key={serviceData.id}
            serviceIcon={serviceData.serviceIcon}
            serviceHeading={serviceData.serviceHeading}
            serviceDesc={serviceData.serviceDesc}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default AboutServiceCards;
