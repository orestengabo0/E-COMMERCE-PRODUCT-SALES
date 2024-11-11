import { Box, Circle, Icon, VStack, Text } from "@chakra-ui/react";
import { ElementType } from "react";

interface AboutServiceCardProps {
  serviceIcon: ElementType;
  serviceHeading: string;
  serviceDesc: string;
}

const AboutServiceCard = ({
  serviceIcon,
  serviceHeading,
  serviceDesc,
}: AboutServiceCardProps) => {
  return (
    <Box>
      <VStack spacing={3}>
        <Circle size="70px" bg="gray.400">
          <Circle size="60px" bg="black" color="white">
            <Icon as={serviceIcon} boxSize={8} />
          </Circle>
        </Circle>
        <Text fontSize={{base: "2xl", md: "xl", lg: "xl"}} fontWeight="semibold">
          {serviceHeading}
        </Text>
        <Text fontSize="md" textAlign="center">
          {serviceDesc}
        </Text>
      </VStack>
      <Box w="full" h="1px" bg="gray.500" mt={4} mb={4} />
    </Box>
  );
};

export default AboutServiceCard;
