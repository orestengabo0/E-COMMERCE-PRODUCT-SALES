import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUserStore } from "../stores/user";

const ProfileForm = () => {
  const toast = useToast();
  const { updateUser, getCurrentUser, currentUser } = useUserStore();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  type PasswordField = "currentPassword" | "newPassword" | "confirmPassword";
  const [viewPassword, setViewPassword] = useState<{
    currentPassword: boolean;
    newPassword: boolean;
    confirmPassword: boolean;
  }>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const handleViewPassword = (field: PasswordField) => {
    setViewPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      getCurrentUser();
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        username: currentUser.username,
        email: currentUser.email,
      }));
    }
  }, [currentUser]);

  const handleUserUpdate = async () => {
    const { success, message } = await updateUser(userData);
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
      setUserData({
        username: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };
  return (
    <Box w={"full"} flex={1} marginLeft={{ base: 0, md: 5 }}>
      <Text fontSize={"xl"} mb={4} fontWeight={"semibold"}>
        Edit your profile
      </Text>
      <Box
        shadow={"md"}
        padding={6}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        w={"full"}
      >
        <VStack spacing={4} w={"full"}>
          <HStack w={"full"} spacing={4}>
            <Box w={"full"}>
              <label>Names</label>
              <Input
                placeholder="Your name*"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </Box>
            <Box w={"full"}>
              <label>Your email</label>
              <Input
                placeholder="Your Email*"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Box>
          </HStack>
          <Box w={"full"}>
            <label>Password changes</label>
            <VStack w={"full"} spacing={4}>
              <InputGroup>
                <Input
                  type={viewPassword.currentPassword ? "text" : "password"}
                  placeholder="Current password"
                  w={"full"}
                  value={userData.currentPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      currentPassword: e.target.value,
                    })
                  }
                />
                <InputRightElement
                  children={
                    viewPassword.currentPassword ? (
                      <ViewIcon
                        boxSize={5}
                        onClick={() => handleViewPassword("currentPassword")}
                        cursor={"pointer"}
                      />
                    ) : (
                      <ViewOffIcon
                        boxSize={5}
                        onClick={() => handleViewPassword("currentPassword")}
                        cursor={"pointer"}
                      />
                    )
                  }
                />
              </InputGroup>
              <InputGroup>
                <Input
                  type={viewPassword.newPassword ? "text" : "password"}
                  placeholder="New password"
                  w={"full"}
                  value={userData.newPassword}
                  onChange={(e) =>
                    setUserData({ ...userData, newPassword: e.target.value })
                  }
                />
                <InputRightElement
                  children={
                    viewPassword.newPassword ? (
                      <ViewIcon
                        boxSize={5}
                        onClick={() => handleViewPassword("newPassword")}
                        cursor={"pointer"}
                      />
                    ) : (
                      <ViewOffIcon
                        boxSize={5}
                        onClick={() => handleViewPassword("newPassword")}
                        cursor={"pointer"}
                      />
                    )
                  }
                />
              </InputGroup>
              <InputGroup>
                <Input
                  type={viewPassword.confirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  w={"full"}
                  value={userData.confirmPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <InputRightElement
                  children={
                    viewPassword.confirmPassword ? (
                      <ViewIcon
                        boxSize={5}
                        onClick={() => handleViewPassword("confirmPassword")}
                        cursor={"pointer"}
                      />
                    ) : (
                      <ViewOffIcon
                        boxSize={5}
                        onClick={() => handleViewPassword("confirmPassword")}
                        cursor={"pointer"}
                      />
                    )
                  }
                />
              </InputGroup>
              <Flex justify={"flex-end"} w={"full"}>
                <Button colorScheme="red" variant={"ghost"} mr={3}>
                  Cancel
                </Button>
                <Button
                  bg={"teal"}
                  variant={"solid"}
                  onClick={handleUserUpdate}
                >
                  Save Changes
                </Button>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileForm;
