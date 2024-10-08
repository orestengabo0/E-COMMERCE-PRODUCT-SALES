import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import logo from "../assets/Logo.svg";
import { Link as RouterLink } from "react-router-dom";
import { FaRegSun, FaShoppingCart } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io"
import { FaRegHeart } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const logoBackground = useColorModeValue("white","gray.800")
  return (
    <Box>
      <Flex h={16} alignItems={"center"} justifyContent={"center"}>
        <Box marginRight={8}>
          <Image bg={logoBackground} src={logo} alt="Logo" boxSize={"100px"} />
        </Box>
        {/* Navigation links*/}
        <HStack spacing={8} alignItems={"center"}>
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
          {/* Search Bar */}
          <Box display={{ base: "none", md: "block" }}>
            <InputGroup maxW={"300px"}>
              <InputLeftElement
                pointerEvents={"none"}
                children={<CiSearch size={25} color={"gray"} />}
              />
              <Input
                placeholder="Search product...."
                borderColor={"gray.300"}
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
            { colorMode === "light" ? <IoMdMoon /> : <FaRegSun />}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
