import { Box, Container, Flex } from "@chakra-ui/react";
import AdvertiseCard from "../components/AdvertiseCard";
import SortSelector from "../components/SortSelector";

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
          height="auto"
          mx={4}
          display={{ base: "none", md: "block" }}
        />
        <Box flex="1" p={4} display={{ base: "none", md: "block" }}>
          <AdvertiseCard />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
