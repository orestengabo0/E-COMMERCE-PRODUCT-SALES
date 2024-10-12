import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  HStack,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useProductStore, Product } from "../stores/product";

const ProductCard: React.FC = () => {
  const { products, fetchProducts, isLoading, error } = useProductStore();
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLikeClick = (productId: string) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  if (isLoading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <VStack spacing={5} align="stretch">
      {products.map((product: Product) => (
        <Box
          key={product.id}
          borderWidth={1}
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          _hover={{ boxShadow: "lg" }}
          width="100%"
        >
          {/* Product Image */}
          <Image
            src={product.images[0]?.url || "https://via.placeholder.com/300"}
            alt={product.images[0]?.altText || product.name}
            objectFit="cover"
            height="200px"
            width="100%"
          />

          {/* Icons on hover */}
          <Box
            position="absolute"
            top={0}
            right={0}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-start"
            backgroundColor="rgba(0, 0, 0, 0.3)"
            color="white"
            opacity={0}
            transition="opacity 0.3s"
            _hover={{ opacity: 1 }}
            width="100%"
            height="100%"
            key={product.id}
          >
            <VStack spacing={4} p={4}>
              {/* Like Icon */}
              <Box
                as={motion.div}
                whileHover={{ scale: 1.2 }}
                cursor="pointer"
                onClick={() => handleLikeClick(product.id)}
              >
                {likedProducts.has(product.id) ? (
                  <FaHeart color="red" size={25} />
                ) : (
                  <AiOutlineHeart size={30} />
                )}
              </Box>
              <Box
                as={motion.div}
                whileHover={{ scale: 1.2 }}
                cursor="pointer"
                onClick={() => console.log("Starred")}
              >
                <StarIcon boxSize={7} color="yellow.400" />
              </Box>
            </VStack>
          </Box>

          <VStack spacing={2} align="flex-start" p={4}>
            <HStack justifyContent="space-between" width="full">
              <Text fontWeight="bold" fontSize="lg">
                {product.name}
              </Text>
              <Text color="gray.500">
                {product.category ? product.category.name : "Unknown Category"}
              </Text>
            </HStack>
            <Text fontSize="xl" fontWeight="bold">
              ${product.price}
            </Text>
            <HStack spacing={1}>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  boxSize={5}
                  color={
                    index < Math.round(product.ratings.average)
                      ? "yellow.400"
                      : "gray.300"
                  }
                />
              ))}
            </HStack>
            <Button colorScheme="teal" size="md" width="full" mt={2}>
              Add to Cart
            </Button>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default ProductCard;
