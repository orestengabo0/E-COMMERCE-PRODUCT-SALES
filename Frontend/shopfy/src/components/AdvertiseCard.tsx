import {
  Box,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import apple from "../assets/1200px-Apple_gray_logo 1.svg";
import phone from "../assets/hero_endframe__cvklg0xk3w6e_large_2-removebg-preview.png";
import samsung from "../assets/hero_endframe__cvklg0xk3w6e_large_2-removebg-preview.png"; // example for second card logo
import samsungPhone from "../assets/hero_endframe__cvklg0xk3w6e_large_2-removebg-preview.png"; // example for second card image
import { Link as RouterLink } from "react-router-dom";

const AdvertiseCard = () => {
  const cardBackGround = useColorModeValue("black", "black");
  const textColor = useColorModeValue("white", "white");

  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      id: 1,
      logo: apple,
      title: "iPhone 14 Series",
      discount: "Up to 10% off Voucher",
      link: "/",
      productImage: phone,
    },
    {
      id: 2,
      logo: apple,
      title: "Samsung Galaxy Series",
      discount: "Up to 15% off Voucher",
      link: "/",
      productImage: samsungPhone,
    },
    {
      id: 3,
      logo: apple,
      title: "iPhone 14 Series",
      discount: "Up to 10% off Voucher",
      link: "/",
      productImage: phone,
    },
    {
      id: 4,
      logo: apple,
      title: "Samsung Galaxy Series",
      discount: "Up to 15% off Voucher",
      link: "/",
      productImage: samsungPhone,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prevCard) => (prevCard + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <Box>
      <Box
        overflow="hidden"
        w={{ lg: "750px", sm: "100%" }}
        h={{ lg: "300px", sm: "100px" }}
      >
        <HStack
          transform={`translateX(-${currentCard * 25}%)`}
          transition="transform 0.7s ease-in-out"
          width={`${cards.length * 100}%`}
        >
          {cards.map((card) => (
            <HStack
              key={card.id}
              bg={cardBackGround}
              paddingX={10}
              w="100%"
              h={{ lg: "250px", sm: "100px" }}
              justifyContent="space-between"
              paddingTop={10}
            >
              <Box>
                <HStack>
                  <Image src={card.logo} />
                  <Text color={textColor}>{card.title}</Text>
                </HStack>
                <Text fontSize={"25"} fontWeight={"bold"} color={textColor}>
                  {card.discount}
                </Text>
                <Link as={RouterLink} to={card.link} color={textColor}>
                  Shop Now
                </Link>
              </Box>
              <Box>
                <Image src={card.productImage} />
              </Box>
            </HStack>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default AdvertiseCard;
