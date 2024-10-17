import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Navigate, Route, Link as RouterLink, Routes } from "react-router-dom";
import AddressBook from "../components/AddressBook";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  return (
    <Container maxW={"container.lg"}>
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
          <Heading fontWeight={"semibold"} fontSize={"md"}>
            Manage my account
          </Heading>
          <VStack
            marginTop={1}
            alignItems={"flex-start"}
            marginLeft={3}
            spacing={0}
          >
            <Text as={RouterLink} to={"profile"} _hover={{ color: "red" }}>
              My Profile
            </Text>
            <Text as={RouterLink} to={"address-book"} _hover={{ color: "red" }}>
              Address book
            </Text>
          </VStack>
          <Heading fontWeight={"semibold"} fontSize={"md"} marginTop={3}>
            My Orders
          </Heading>
          <VStack
            marginTop={1}
            alignItems={"flex-start"}
            marginLeft={3}
            spacing={0}
          >
            <Text as={RouterLink} _hover={{ color: "red" }}>
              My Returns
            </Text>
            <Text as={RouterLink} _hover={{ color: "red" }}>
              Cancellations
            </Text>
          </VStack>
        </Box>
        <Box
          padding={2}
          w={"full"}
        >
          <Routes>
            <Route path="/" element={<Navigate to={"profile"} />}></Route>
            <Route path="profile" element={<ProfileForm />} />
            <Route path="address-book" element={<AddressBook />} />
          </Routes>
        </Box>
      </Flex>
    </Container>
  );
};

export default Profile;
