import { useEffect, useState } from "react";
import { Box, Container, Flex, SimpleGrid, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import AdvertiseCard from "../components/AdvertiseCard";
import SortSelector from "../components/SortSelector";
import ProductCard from "../components/ProductCard";
import { useProductStore, Product } from "../stores/product";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const HomePage = () => {
  const { products, fetchProducts, isLoading, error } = useProductStore();
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const skeletons = [1,2,3,4];


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLikeClick = (productId: string) => {
    console.log(`Clicked product with id: ${productId}`)
  };

  // if (isLoading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

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
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} w={"full"} spacing={5}>
        {isLoading && skeletons.map((skeleton) => (
          <ProductCardSkeleton key={skeleton} />
        ))}
        {products.map((product: Product) => (
          <ProductCard
            key={product._id}
            product={product}
            isLiked={likedProducts.has(product._id)}
            onLikeClick={handleLikeClick}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
