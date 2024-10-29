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
  Kbd,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  InputRightElement,
  Switch,
} from "@chakra-ui/react";
import { LuUser2 } from "react-icons/lu";
import { Icon } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaBars, FaRegSun, FaShoppingCart } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useEffect, useRef } from "react";
import { useUserStore } from "../stores/user";

const NavBar = () => {
  const isLoggedIn = useUserStore((state) => state.isLogggedIn);
  const logoutUser = useUserStore((state) => state.logoutUser);
  const checkToken = useUserStore((state) => state.checkToken);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
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

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <Box
      zIndex={1}
      position={"sticky"}
      top={{ base: 0, sm: 0, lg: 8 }}
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"center"}>
        <Box marginRight={10}>
          <Text
            fontSize={{ base: 26, md: 30 }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            marginLeft={2}
          >
            <Link as={RouterLink} to={"/"}>
              🛒Shopfy
            </Link>
          </Text>
        </Box>
        {/* Navigation links */}
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
            <Link as={RouterLink} to={"/login"} fontWeight={"semibold"}>
              Login
            </Link>
            <Link as={RouterLink} to={"/register"} fontWeight={"semibold"}>
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
          <IconButton
            aria-label="Search"
            colorScheme="teal"
            variant={"ghost"}
            size={"lg"}
            icon={<Icon as={CiSearch} boxSize={7} />}
            display={{ base: "flex", md: "none" }}
            onClick={onSearchOpen}
          />
        </HStack>
        <HStack spacing={3} marginLeft={5}>
          <IconButton
            aria-label="Favorites"
            icon={<FaRegHeart />}
            colorScheme="teal"
            variant="ghost"
            size="lg"
            display={{ base: "none", md: "flex" }}
          />
          <IconButton
            aria-label="Cart"
            icon={<FaShoppingCart />}
            colorScheme="teal"
            variant="ghost"
            size="lg"
            display={{ base: "none", md: "flex" }}
          />
          <Button onClick={toggleColorMode} display={{base: "none", md: "flex"}}>
            {colorMode === "light" ? <IoMdMoon color="teal" /> : <FaRegSun />}
          </Button>
          {isLoggedIn && (
            <Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Profile options"
                  icon={<Avatar size={"sm"} />}
                  variant={"outline"}
                />
                <MenuList>
                  <MenuItem onClick={() => navigate("/profile")}>
                    View Profile
                  </MenuItem>
                  <MenuItem>My Orders</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
          <Box display={{ base: "block", md: "none" }}>
            <IconButton
              aria-label="Open Menu"
              icon={<FaBars color="teal" />}
              variant="ghost"
              size="lg"
              onClick={onOpen} // Open the drawer
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
                      to={"/login"}
                      fontWeight={"semibold"}
                      onClick={onClose}
                    >
                      Login
                    </Link>
                    <Link
                      as={RouterLink}
                      to={"/register"}
                      fontWeight={"semibold"}
                      onClick={onClose}
                    >
                      Signup
                    </Link>
                    <Link
                      as={RouterLink}
                      to={"/wishlist"}
                      fontWeight={"semibold"}
                      onClick={onClose}
                    >
                      Wishlist
                    </Link>
                    <Link
                      as={RouterLink}
                      to={"/cart"}
                      fontWeight={"semibold"}
                      onClick={onClose}
                    >
                      Cart
                    </Link>
                    <HStack>
                      <Text fontWeight={"semibold"}>Light</Text>
                      <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
                      <Text fontWeight={"semibold"}>Dark</Text>
                    </HStack>
                  </HStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>

            <Modal isOpen={isSearchOpen} onClose={onSearchClose}>
              <ModalContent margin={4}>
                <ModalBody p={1}>
                  <InputGroup>
                    <InputLeftElement
                      children={<Icon as={CiSearch} boxSize={8} />}
                      height="100%"
                    />
                    <Input
                      placeholder="Search product..."
                      ref={searchInputRef}
                      border={0}
                      py={4}
                      fontSize={20}
                      height="auto"
                    />
                  </InputGroup>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        </HStack>
      </Flex>
      <Box borderTop={"2px solid"} borderColor={"gray.300"} width={"100%"} />
    </Box>
  );
};

export default NavBar;
