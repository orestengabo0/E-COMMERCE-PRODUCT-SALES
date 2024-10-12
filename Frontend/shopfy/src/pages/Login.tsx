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
} from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const handleViewPassword = () => {
    setViewPassword((state) => !state);
  };
  return (
    <Container maxW={"container.sm"} marginTop={10} marginBottom={10}>
      <VStack marginBottom={5} align={"flex-start"}>
        <Heading size={"lg"}>Login to SHOPFY</Heading>
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
          <Input placeholder="Email" type="email" />
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
          <Button w={"full"} bg={"teal"}>Login</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
