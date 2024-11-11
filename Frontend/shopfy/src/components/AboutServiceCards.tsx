import { TbTruckDelivery } from "react-icons/tb";
import { FaHeadphonesAlt } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { Box, Stack, VStack } from "@chakra-ui/react";
import AboutServiceCard from "./AboutServiceCard";
import { BsBoxArrowDownLeft } from "react-icons/bs";

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
    <Box marginTop={10} marginBottom={12}>
      <Box display={{base: "block", md: "flex", lg: "flex"}} justifyContent={{base: "none", md: "space-around", lg: "space-around"}}>
        {aboutServiceData.map((serviceData) => (
          <AboutServiceCard
            key={serviceData.id}
            serviceIcon={serviceData.serviceIcon}
            serviceHeading={serviceData.serviceHeading}
            serviceDesc={serviceData.serviceDesc}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AboutServiceCards;
