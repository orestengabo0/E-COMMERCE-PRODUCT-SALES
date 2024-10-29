import { Box, Container, Heading, Image, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import AnalyticCards from "../components/AnalyticCards";

const About = () => {
  return (
    <Container maxW="container.xl" mt={10} p={5}>
      <Heading mb={6} textAlign="center" fontSize="2xl">
        Our Story
      </Heading>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        gap={8}
      >
        <Box flex="1" mb={{ base: 4, md: 0 }}>
          <Text fontSize="lg" lineHeight="1.6" color={useColorModeValue("gray.700","gray.200")}>
            Launched in 2024, SHOPFY is a Rwandan online shopping marketplace with a strong presence
            in Rwanda. Supported by a wide range of tailored marketing, data, and service solutions,
            SHOPFY collaborates with over 10,500 sellers and 300 brands to serve 3 million customers
            across the region.
          </Text>
        </Box>
        <Box flex="1" w={{ base: "100%", md: "auto" }}> {/* Full width on small screens */}
          <Image
            borderRadius="md"
            w="100%"
            h="auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_-xRfWFkFtVxtnGCapwA2iqKn7uIvkvpAlg&s"
            alt="SHOPFY marketplace image"
          />
        </Box>
      </Flex>
      <AnalyticCards />
    </Container>
  );
};

export default About;
