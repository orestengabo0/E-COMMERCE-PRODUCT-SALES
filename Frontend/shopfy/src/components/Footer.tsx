import {
  Box,
  Container,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import {
  FaApple,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { QRCodeSVG } from "qrcode.react";

const Footer = () => {
  return (
    <Box bg={"black"} color={"gray.100"} py={8} padding={5}>
      <Container maxW={"container.xl"}>
        <HStack
          justify={"space-between"}
          align={"flex-start"}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          spacing={{ base: 8, md: 16 }}
        >
          {/* Shopfy Section */}
          <Box>
            <Text
              fontSize={{ base: "26", sm: "28" }}
              fontWeight={"bold"}
              bgGradient={"linear(to-r, cyan.400, blue.500)"}
              bgClip={"text"}
            >
              🛒SHOPFY
            </Text>
            <Text marginTop={4}>Subscribe</Text>
            <Text>Get 10% off your first order.</Text>
            <Box marginTop={4}>
              <InputGroup maxW={{base: "245x", lg: "300px"}}>
                <Input placeholder="Enter your email" />
                <InputRightElement children={<AiOutlineSend size={20} />} />
              </InputGroup>
            </Box>
          </Box>

          {/* Support Section */}
          <Box>
            <Text fontSize={{ base: "15", sm: "20" }} fontWeight={"semibold"}>
              Support
            </Text>
            <Text marginTop={5}>254 Kigali, Rwanda</Text>
            <Text marginTop={2}>orestengabo0@gmail.com</Text>
            <Text marginTop={2}>+250 738 049 975</Text>
          </Box>

          {/* Account Section */}
          <Box>
            <Text fontWeight={"semibold"} fontSize={{ base: 15, sm: 20 }}>
              Account
            </Text>
            <VStack alignItems={"start"} spacing={2} marginTop={4}>
              <Link as={RouterLink} to={"/my-account"}>
                My Account
              </Link>
              <Link as={RouterLink} to={"/login"}>
                Login
              </Link>
              <Link as={RouterLink} to={"/register"}>
                Register
              </Link>
              <Link as={RouterLink} to={"/cart"}>
                Cart
              </Link>
              <Link as={RouterLink} to={"/products"}>
                Shop
              </Link>
            </VStack>
          </Box>
          {/*Quick links */}
          <Box>
            <Text fontWeight={"semibold"} fontSize={{ base: 15, sm: 20 }}>
              Quick Link
            </Text>
            <VStack alignItems={"start"} spacing={2} marginTop={4}>
              <Link as={RouterLink}>Privacy policy</Link>
              <Link as={RouterLink}>Terms of use</Link>
              <Link as={RouterLink}>FAQ</Link>
              <Link as={RouterLink}>Contacts</Link>
            </VStack>
          </Box>
          <Box>
            <VStack>
              <Text fontWeight={"semibold"} fontSize={{ base: 15, sm: 20 }}>
                Download our App
              </Text>
              <VStack alignItems={"start"} spacing={2} marginTop={4}>
                <Text color={"gray.400"} fontSize={{ base: 15, sm: 13 }}>
                  Save $3 with App New User Only.
                </Text>
                <HStack>
                  <Box border={"10px solid white"}>
                    <QRCodeSVG
                      value="https://google.com/image.png"
                      size={120}
                    />
                  </Box>
                  <VStack>
                    <Box
                      border={"1px solid white"}
                      padding={2}
                      borderRadius={7}
                    >
                      <HStack>
                        <FaGooglePlay size={27} />
                        <Box>
                          <Text fontSize={{ base: 10, sm: 10 }}>
                            Download it on
                          </Text>
                          <Text
                            fontSize={{ base: 14, sm: 12 }}
                            fontWeight={"bold"}
                          >
                            Google Play
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                    <Box
                      border={"1px solid white"}
                      padding={2}
                      borderRadius={7}
                    >
                      <HStack>
                        <FaApple size={30} />
                        <Box>
                          <Text fontSize={{ base: 10, sm: 10 }}>
                            Download it on
                          </Text>
                          <Text
                            fontSize={{ base: 14, sm: 12 }}
                            fontWeight={"bold"}
                          >
                            Apple Store
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
            <VStack marginTop={3}>
              <HStack spacing={10}>
                <Link
                  as={RouterLink}
                  target="blank"
                  to={"https://www.facebook.com/muneza.chris.31"}
                >
                  <FaFacebookF size={20} />
                </Link>
                <Link
                  as={RouterLink}
                  target="blank"
                  to={"https://www.facebook.com/muneza.chris.31"}
                >
                  <BsTwitterX size={20} />
                </Link>
                <Link
                  as={RouterLink}
                  target="blank"
                  to={"https://www.facebook.com/muneza.chris.31"}
                >
                  <FaInstagram size={20} />
                </Link>
                <Link
                  as={RouterLink}
                  target="blank"
                  to={"https://www.facebook.com/muneza.chris.31"}
                >
                  <FaLinkedinIn size={20} />
                </Link>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Container>
      <Text fontSize="sm" mt={4} textAlign={"center"}>
        © 2024 SHOPFY. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
