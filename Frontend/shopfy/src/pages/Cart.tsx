import { Box, Button, Container, Image, Text } from "@chakra-ui/react";
import emptyCart from "../assets/empty_cart.png";
import { FaArrowRight } from "react-icons/fa6";

const Cart = () => {
  return (
    <Container maxW={"container.sm"}>
      <Image src={emptyCart}></Image>
      <Text fontSize={"3xl"} fontWeight={"semibold"}>
        Oops! Your Cart is empty
      </Text>
      <Box display={"flex"} justifyContent={"center"} mt={5} mb={6} pb={6} pt={6}>
        <Button
          rightIcon={<FaArrowRight />}
          variant={"outline"}
          colorScheme="teal"
          fontSize={"xl"}
        >
          Go to shop
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
