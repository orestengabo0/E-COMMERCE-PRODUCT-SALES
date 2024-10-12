import { Box, Image, Text, Button, HStack, VStack } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    images: { url: string; altText: string }[];
    category?: { name: string };
    price: number;
    ratings: { average: number };
  };
  isLiked: boolean;
  onLikeClick: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLiked, onLikeClick }) => {
  return (
    <Box
      key={product._id}
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
      >
        <VStack spacing={4} p={4}>
          {/* Like Icon */}
          <Box
            as={motion.div}
            whileHover={{ scale: 1.2 }}
            cursor="pointer"
            onClick={() => onLikeClick(product._id)}
          >
            {isLiked ? (
              <FaHeart color="red" size={20} />
            ) : (
              <AiOutlineHeart size={25} />
            )}
          </Box>
          <Box
            as={motion.div}
            whileHover={{ scale: 1.2 }}
            cursor="pointer"
            onClick={() => console.log("Starred")}
          >
            <StarIcon boxSize={5} color="yellow.400" />
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
  );
};

export default ProductCard;
