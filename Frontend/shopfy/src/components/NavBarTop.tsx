import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const NavBarTop = () => {
    const background = useColorModeValue("black","black")
    const textColor = useColorModeValue("white","white")
  return (
    <Box bg={background} display={{ base: "none", md: "block"}} paddingY={1}>
        <Text color={textColor} textAlign={'center'}>Summer sales for All Swim And Free Express Delivery - OFF 50%</Text>
    </Box>
  )
}

export default NavBarTop