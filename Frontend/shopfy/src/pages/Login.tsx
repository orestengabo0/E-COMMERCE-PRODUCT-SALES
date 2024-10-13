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
  useToast,
  Flex,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useUserStore();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const handleViewPassword = () => {
    setViewPassword((state) => !state);
  };
  const toast = useToast();
  const handleLoginUser = async () => {
    const { success, message, role } = await loginUser(userData);
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
      console.log("User role: ", role)
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/user");
      }
    }
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
          <Input
            placeholder="Email"
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <InputGroup>
            <Input
              type={viewPassword ? "text" : "password"}
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
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
          <Button w={"full"} bg={"teal"} onClick={handleLoginUser}>
            Login
          </Button>
        </VStack>
        <Flex marginTop={5} justifyContent={"center"}>
          <Text marginRight={3}>Have no account?</Text>
          <Link as={RouterLink} to={"/register"}>
            Register
          </Link>
        </Flex>
      </Box>
    </Container>
  );
};

export default Login;
