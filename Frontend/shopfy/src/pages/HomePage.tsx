import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import AdvertiseCard from "../components/AdvertiseCard";
import SortSelector from "../components/SortSelector";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  return (
    <Container maxW={"container.xl"}>
      <Flex>
        <Box w="300px" p={4} display={{ base: "none", md: "block" }}>
          <SortSelector />
        </Box>
        <Box
          borderLeft="2px solid"
          borderColor="gray.300"
          height="270px"
          mx={4}
          display={{ base: "none", md: "block" }}
        />
        <Box flex="1" p={4} display={{ base: "none", md: "block" }}>
          <AdvertiseCard />
        </Box>
      </Flex>
      <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={10}>
        <ProductCard />
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
