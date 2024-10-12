import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Container,
  Heading,
  VStack,
  Text,
  Box,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
  HStack,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const handleViewPassword = () => {
    setViewPassword((state) => !state);
  };
  return (
    <Container maxW={"container.sm"} marginTop={10} marginBottom={10}>
      <VStack marginBottom={5} align={"flex-start"}>
        <Heading size={"lg"}>Create your account</Heading>
        <Text>Enter your details here</Text>
      </VStack>
      <Box
        shadow={"md"}
        rounded={"lg"}
        padding={6}
        w={"full"}
        bg={useColorModeValue("white", "gray.700")}
      >
        <VStack spacing={4}>
          <Input name="name" placeholder="Name" />
          <Input type="email" placeholder="Email" />
          <InputGroup>
            <Input
              type={viewPassword ? "text" : "password"}
              placeholder="Password"
            />
            <InputRightElement
              children={
                viewPassword ? (
                  <ViewIcon boxSize={5} onClick={handleViewPassword} />
                ) : (
                  <ViewOffIcon boxSize={5} onClick={handleViewPassword} />
                )
              }
            />
          </InputGroup>
          <Button w={"full"} bg={"teal"}>
            Create Account
          </Button>
        </VStack>
        <Flex marginTop={5} justifyContent={"center"}>
          <Text>Already have account?</Text>
          <Link as={RouterLink} to={"/login"}>Login</Link>
        </Flex>
      </Box>
    </Container>
  );
};

export default Register;
