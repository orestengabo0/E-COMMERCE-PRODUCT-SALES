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
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/user";

const Register = () => {
  const navigate = useNavigate()
  const { createUser } = useUserStore();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const handleViewPassword = () => {
    setViewPassword((state) => !state);
  };
  const toast = useToast();
  const handleCreateUser = async () => {
    const { success, message } = await createUser(newUser);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login")
    }
    setNewUser({
      username: "",
      email: "",
      password: "",
    });
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
          <Input
            name="name"
            placeholder="Name"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <Input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <InputGroup>
            <Input
              type={viewPassword ? "text" : "password"}
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
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
          <Button w={"full"} bg={"teal"} onClick={handleCreateUser}>
            Create Account
          </Button>
        </VStack>
        <Flex marginTop={5} justifyContent={"center"}>
          <Text marginRight={3}>Already have account?</Text>
          <Link as={RouterLink} to={"/login"}>
            Login
          </Link>
        </Flex>
      </Box>
    </Container>
  );
};

export default Register;
