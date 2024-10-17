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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useUserStore } from "../stores/user";
import emailjs from "@emailjs/browser";

const Contacts = () => {
  const { createMessage } = useUserStore();
  const [userMessage, setUserMessage] = useState({
    name: "",
    email: "",
    message: "",
  });
  const toast = useToast();
  const handleUserMessage = async () => {
    const serviceId = process.env.SERVICE_ID;
    const templateId = process.env.TEMPLATE_ID;
    const publicKey = process.env.SERVICE_ID;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing environment variables");
      toast({
        title: "Error",
        description: "Email configuration is missing.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const templateParams = {
      from_name: userMessage.name,
      from_email: userMessage.email,
      to_name: "orestengabo",
      message: userMessage.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });

    const { success, message } = await createMessage(userMessage);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setUserMessage({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <Container maxW={"container.lg"} marginTop={10} marginBottom={10}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        lineHeight={2}
        direction={{ base: "column", md: "row" }}
      >
        <Box
          w={{ base: "100%", md: "300px" }}
          height={"300px"}
          border={"2px solid gray.100"}
          shadow={"md"}
          padding={4}
          marginBottom={{ base: 5, md: 0 }}
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
                <Input
                  placeholder="Your name*"
                  value={userMessage.name}
                  onChange={(e) =>
                    setUserMessage({ ...userMessage, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Your Email*"
                  value={userMessage.email}
                  onChange={(e) =>
                    setUserMessage({ ...userMessage, email: e.target.value })
                  }
                />
              </HStack>
              <Textarea
                placeholder="Your message here*"
                value={userMessage.message}
                onChange={(e) =>
                  setUserMessage({ ...userMessage, message: e.target.value })
                }
              />
              <Button bg={"teal"} w={"full"} onClick={handleUserMessage}>
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
