import {
  Container,
  Heading,
  VStack,
  Text,
  Box,
  useColorModeValue,
  HStack,
  Input,
  Textarea,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Contacts = () => {
  return (
    <Container maxW={"container.lg"} marginTop={10} marginBottom={10}>
      {/* Flex Direction changes based on screen size */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        lineHeight={2}
        direction={{ base: "column", md: "row" }} // Stacks vertically on smaller screens
      >
        {/* Contact Info Section */}
        <Box
          w={{ base: "100%", md: "300px" }} // Full width on mobile, fixed width on desktop
          height={"300px"}
          border={"2px solid gray.100"}
          shadow={"md"}
          padding={4}
          marginBottom={{ base: 5, md: 0 }} // Adds margin-bottom on mobile
        >
          <HStack marginBottom={2}>
            <Box
              bg={"red"}
              padding={2}
              borderRadius={"50%"}
              paddingLeft={2}
              paddingRight={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Icon as={FaPhoneAlt} boxSize={5} />
            </Box>
            <Text fontWeight={"semibold"}>Call To Us</Text>
          </HStack>
          <Text>We are available 24/7</Text>
          <Text>Phone: +250 738 049 975</Text>
          <Box
            borderTop={"2px solid"}
            borderColor={"gray.300"}
            w={"auto"}
            marginTop={2}
            marginBottom={3}
          />
          <HStack>
            <Box
              bg={"red"}
              padding={2}
              borderRadius={"50%"}
              paddingLeft={2}
              paddingRight={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Icon as={MdOutlineEmail} boxSize={6} />
            </Box>
            <Text fontWeight={"semibold"}>Write To Us</Text>
          </HStack>
          <Text>Email: orestengabo0@gmail.com</Text>
          <Text>Email: orestengabo3@gmail.com</Text>
        </Box>

        {/* Form Section */}
        <Box w={"full"} flex={1} marginLeft={{ base: 0, md: 5 }}>
          <VStack marginBottom={5} align={"flex-start"}>
            <Heading size={"lg"}>Want to connect with us?</Heading>
            <Text>Fill this form</Text>
          </VStack>
          <Box
            shadow={"md"}
            padding={6}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            w={"full"}
          >
            <VStack>
              <HStack w={"full"}>
                <Input placeholder="Your name*" />
                <Input placeholder="Your Email*" />
              </HStack>
              <Textarea placeholder="Your message here*" />
              <Button bg={"teal"} w={"full"}>
                Send Message
              </Button>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Contacts;
