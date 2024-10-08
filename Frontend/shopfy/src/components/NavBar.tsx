import {
  Text,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spacer,
  useColorMode,
  useColorModeValue,
  InputRightElement,
  Kbd,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaBars, FaRegSun, FaShoppingCart } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useEffect, useRef } from "react";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key == "k") {
        event.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <Box>
      <Flex h={16} alignItems={"center"} justifyContent={"center"}>
        <Box marginRight={10}>
          <Text
            fontSize={{ base: "22", sm: "28" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            <Link as={RouterLink} to={"/"}>
              🛒Shopfy
            </Link>
          </Text>
        </Box>
        {/* Navigation links*/}
        <HStack spacing={7} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Link as={RouterLink} to={"/"} fontWeight={"semibold"}>
              Home
            </Link>
            <Link as={RouterLink} to={"/contacts"} fontWeight={"semibold"}>
              Contacts
            </Link>
            <Link as={RouterLink} to={"/about"} fontWeight={"semibold"}>
              About
            </Link>
            <Link as={RouterLink} to={"/signup"} fontWeight={"semibold"}>
              Signup
            </Link>
          </HStack>
          <Spacer />
          <Box display={{ base: "none", md: "block" }}>
            <InputGroup maxW={"300px"}>
              <InputLeftElement
                pointerEvents={"none"}
                children={<CiSearch size={25} color={"gray"} />}
              />
              <Input
                placeholder="Search product...."
                borderColor={"gray.300"}
                ref={searchInputRef}
              />
              <InputRightElement
                pointerEvents={"none"}
                marginRight={5}
                children={
                  <HStack>
                    <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
                  </HStack>
                }
              />
            </InputGroup>
          </Box>
        </HStack>
        <HStack spacing={3} marginLeft={5}>
          <IconButton
            aria-label="Favorites"
            icon={<FaRegHeart />}
            colorScheme="teal"
            variant="ghost"
            size="lg"
          />
          <IconButton
            aria-label="Cart"
            icon={<FaShoppingCart />}
            colorScheme="teal"
            variant="ghost"
            size="lg"
          />
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMdMoon color="teal" /> : <FaRegSun />}
          </Button>
          <Box display={{ base: "block", md: "none" }}>
            <IconButton
              aria-label="Open Menu"
              icon={<FaBars color="teal" />}
              variant="ghost"
              size="lg"
              onClick={onOpen}
            />

            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent maxWidth={"200px"}>
                <DrawerCloseButton />
                <DrawerBody>
                  <HStack
                    as={"nav"}
                    spacing={4}
                    flexDirection={"column"}
                    alignItems="flex-start"
                    padding={4}
                    paddingTop={7}
                  >
                    <Link
                      as={RouterLink}
                      to={"/"}
                      fontWeight={"semibold"}
                      onClick={onClose}
                    >
                      Home
                    </Link>
                    <Link
                      as={RouterLink}
                      to={"/contacts"}
                      fontWeight={"semibold"}
                      onClick={onClose}
                    >
                      Contacts
                    </Link>
                    <Link
                      as={RouterLink}
                      to={"/about"}
                      fontWeight={"semibold"}
                      onClick={onClose}
                    >
                      About
                    </Link>
                    <Link
                      as={RouterLink}
                      to={"/signup"}
                      fontWeight={"semibold"}
                      onClick={onClose}
                    >
                      Signup
                    </Link>
                  </HStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </HStack>
      </Flex>
      <Box borderTop={"2px solid"} borderColor={"gray.300"} width={"100%"} />
    </Box>
  );
};

export default NavBar;
