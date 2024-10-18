import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUserStore } from "../stores/user";

const ProfileForm = () => {
  const toast = useToast();
  const { updateUser, getCurrentUser, currentUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    setIsLoading(true);

    if (userData.newPassword || userData.confirmPassword) {
      if (userData.newPassword !== userData.confirmPassword) {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "New password and confirm password do not match.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (!userData.currentPassword) {
        setIsLoading(false);
        toast({
          title: "Error",
          description:
            "Please provide your current password to update the password.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    const { success, message } = await updateUser(userData);
    setIsLoading(false);

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
      <VStack align="stretch">
        <Heading>User Profile</Heading>
        <Text fontSize={"lg"}>
          <strong>Username:</strong> {userData.username}
        </Text>
        <Text fontSize={"lg"}>
          <strong>Email:</strong> {userData.email}
        </Text>
        <Text fontSize={"lg"}>
          <strong>Password:</strong> {"*****************"}
        </Text>
        <Button onClick={onOpen} colorScheme="teal">
          Edit Profile
        </Button>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                name="username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
              <Input
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
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
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUserUpdate}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileForm;
