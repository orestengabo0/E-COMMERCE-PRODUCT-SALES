import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Address {
  id: string;
  Name: string;
  Street: string;
  City: string;
  ZipCode: string;
  Country: string;
  isDefault: boolean;
}

const AddressBook = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  return (
    <Box w={"full"} flex={1} marginLeft={{ base: 0, md: 5 }}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>
            Address Book
          </Heading>
          <Button leftIcon={<AddIcon />} colorScheme="green" mb={4}>
            Add New Address
          </Button>
          <Table variant={"simple"}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Street</Th>
                <Th>City</Th>
                <Th>Zip Code</Th>
                <Th>Country</Th>
                <Th>Default</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {addresses.map((address) => (
                <Tr key={address.id}>
                  <Td>{address.Name}</Td>
                  <Td>{address.Street}</Td>
                  <Td>{address.City}</Td>
                  <Td>{address.ZipCode}</Td>
                  <Td>{address.Country}</Td>
                  <Td>
                    <Checkbox isChecked={address.isDefault}></Checkbox>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label={"Edit address"}
                      icon={<EditIcon />}
                      mr={2}
                    />
                    <IconButton
                      aria-label="Delete address"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

export default AddressBook;
