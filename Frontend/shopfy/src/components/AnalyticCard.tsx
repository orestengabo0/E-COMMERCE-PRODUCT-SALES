import { Box, Circle, Icon, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { ElementType } from "react";

interface AnalyticCardProps {
  cardIcon: ElementType;
  analyticNumber: string;
  cardDescription: string;
}

const AnalyticCard = ({ cardIcon, analyticNumber, cardDescription }: AnalyticCardProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="1px"
      borderColor="gray.500"
      borderRadius="lg"
      _hover={{boxShadow: "lg", borderColor: useColorModeValue("gray.800","white")}}
      minW={{ base: "180px", md: "220px", lg: "180px" }}
      maxW={{ base: "200px", lg: "190px" }}
      py={4}
      px={3}
    >
      <VStack spacing={3}>
        <Circle size="70px" bg="gray.400">
          <Circle size="60px" bg="black" color="white">
            <Icon as={cardIcon} boxSize={8} />
          </Circle>
        </Circle>
        <Text fontSize="2xl" fontWeight="semibold">
          {analyticNumber}
        </Text>
        <Text fontSize="sm" textAlign="center">
          {cardDescription}
        </Text>
      </VStack>
    </Box>
  );
};

export default AnalyticCard;
