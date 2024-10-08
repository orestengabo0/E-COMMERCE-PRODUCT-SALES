import {
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SortSelector = () => {
  return (
    <VStack alignItems={"start"} >
      <Menu>
        <MenuButton>Women's fashion</MenuButton>
        <MenuList>
          <MenuItem>Clothes</MenuItem>
          <MenuItem>Shoes</MenuItem>
          <MenuItem>Hand bags</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>Men's fashion</MenuButton>
        <MenuList>
          <MenuItem>Clothes</MenuItem>
          <MenuItem>Shoes</MenuItem>
          <MenuItem>Bags</MenuItem>
        </MenuList>
      </Menu>
      <Link as={RouterLink} to={"/"}>
        Electronics
      </Link>
      <Link as={RouterLink} to={"/"}>
        Home & lifestyle
      </Link>
      <Link as={RouterLink} to={"/"}>
        Sports and outdoor
      </Link>
      <Link as={RouterLink} to={"/"}>
        Groceries
      </Link>
      <Link as={RouterLink} to={"/"}>
        Health & Beauty
      </Link>
    </VStack>
  );
};

export default SortSelector;
