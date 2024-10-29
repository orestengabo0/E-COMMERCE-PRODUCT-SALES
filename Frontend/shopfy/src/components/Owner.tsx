import { Box, Flex, HStack, Icon, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { ElementType } from "react";
import owner1 from "../assets/owner1.png";
import { BsTwitterX, BsLinkedin, BsInstagram } from "react-icons/bs";

interface OwnerCardProps {
  ownerPhoto: string;
  ownerName: string;
  ownerTitle: string;
  ownerSocialMedia: Array<ElementType>;
}

const Owner = ({ ownerPhoto, ownerName, ownerTitle, ownerSocialMedia }: OwnerCardProps) => {
  return (
    <Box
      mb={9}
      width={{ base: "90%", md: "60%", lg: "50%" }}
      mx="4"
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
    >
      <Flex
        bg={useColorModeValue("gray.400", "whiteAlpha.400")}
        justifyContent={"center"}
        pt={6}
        borderTopRadius={"lg"}
      >
        <Image src={ownerPhoto}  />
      </Flex>
      <Box p={4} textAlign="center">
        <Text fontSize={{ base: "xl", md: "lg", lg: "md" }} fontWeight={"semibold"}>
          {ownerName}
        </Text>
        <Text fontSize={{ base: "sm", md: "xs", lg: "xs" }} color="gray.500">
          {ownerTitle}
        </Text>
        <HStack spacing={4} mt={4} justify="center">
          {ownerSocialMedia.map((IconComponent, index) => (
            <Icon key={index} as={IconComponent} boxSize={6} />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default Owner;
